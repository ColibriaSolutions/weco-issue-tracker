# End-to-End API Test Script
# Tests the full user journey including project assignment and RLS enforcement

# Configuration
$BASE_URL = "http://localhost:3000"
# Replace with your actual Admin API Key
$ADMIN_API_KEY = $env:API_KEY
if (-not $ADMIN_API_KEY) {
    $ADMIN_API_KEY = "weco_live_5ce8e5719eb69662ca51bcc527283d8e9f72c26cfca6141d"
}

# Helper function for API requests
function Invoke-ApiRequest {
    param (
        [string]$Uri,
        [string]$Method = "GET",
        [hashtable]$Body = @{},
        [string]$Token = $ADMIN_API_KEY
    )

    $headers = @{
        "Authorization" = "Bearer $Token"
        "Content-Type"  = "application/json"
    }

    try {
        $params = @{
            Uri     = "$BASE_URL$Uri"
            Method  = $Method
            Headers = $headers
        }

        if ($Method -ne "GET" -and $Body.Count -gt 0) {
            $params.Body = ($Body | ConvertTo-Json -Depth 10)
        }

        $response = Invoke-RestMethod @params
        return $response
    }
    catch {
        Write-Host "Error calling $Uri : $($_.Exception.Message)" -ForegroundColor Red
        if ($_.Exception.Response) {
            $stream = $_.Exception.Response.GetResponseStream()
            $reader = [System.IO.StreamReader]::new($stream)
            $body = $reader.ReadToEnd()
            Write-Host "Response Body: $body" -ForegroundColor Red
        }
        return $null
    }
}

Write-Host "Starting End-to-End Test..." -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

# ----------------------------------------------------------------
# 1. Setup Users
# ----------------------------------------------------------------
Write-Host "1. Creating Test Users..." -ForegroundColor Yellow

$users = @()
for ($i = 1; $i -le 4; $i++) {
    $email = "user$i-$(Get-Random)@example.com"
    $response = Invoke-ApiRequest -Uri "/api/users" -Method "POST" -Body @{
        email      = $email
        password   = "password123"
        full_name  = "Test User $i"
        role       = "user"
        department = "Engineering"
        region     = "CA"
    }
    
    if ($response) {
        $user = $response.data
        Write-Host "Created $email (ID: $($user.id))" -ForegroundColor Green
        
        # Generate API Key for this user
        $keyResponse = Invoke-ApiRequest -Uri "/api/admin/api-keys" -Method "POST" -Body @{
            userId    = $user.id
            name      = "Test Key for User $i"
            expiresIn = "1d"
        }
        
        if ($keyResponse) {
            $user | Add-Member -MemberType NoteProperty -Name "ApiKey" -Value $keyResponse.data.key
            $users += $user
            Write-Host "  Generated API Key for User $i" -ForegroundColor Gray
        }
    }
}

$User1 = $users[0]
$User2 = $users[1]
$User3 = $users[2]
$User4 = $users[3]

if ($users.Count -lt 4) {
    Write-Host "Failed to create all users. Exiting." -ForegroundColor Red
    exit
}

Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray

# ----------------------------------------------------------------
# 2. Create Projects (User 1 & User 2)
# ----------------------------------------------------------------
Write-Host "2. Creating Projects..." -ForegroundColor Yellow

# User 1 creates Project A
$projectA = Invoke-ApiRequest -Uri "/api/projects" -Method "POST" -Body @{
    name        = "Project A (User 1)"
    description = "Project owned by User 1"
} -Token $User1.ApiKey

if ($projectA) {
    Write-Host "User 1 created 'Project A' (ID: $($projectA.data.id))" -ForegroundColor Green
}

# User 2 creates Project B
$projectB = Invoke-ApiRequest -Uri "/api/projects" -Method "POST" -Body @{
    name        = "Project B (User 2)"
    description = "Project owned by User 2"
} -Token $User2.ApiKey

if ($projectB) {
    Write-Host "User 2 created 'Project B' (ID: $($projectB.data.id))" -ForegroundColor Green
}

Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray

# ----------------------------------------------------------------
# 3. Assign Members (Admin)
# ----------------------------------------------------------------
Write-Host "3. Assigning Members..." -ForegroundColor Yellow

# Assign User 3 to Project A
$assign1 = Invoke-ApiRequest -Uri "/api/projects/$($projectA.data.id)/members" -Method "POST" -Body @{
    userId = $User3.id
    role   = "member"
}
if ($assign1) { Write-Host "Admin assigned User 3 to Project A" -ForegroundColor Green }

# Assign User 4 to Project B
$assign2 = Invoke-ApiRequest -Uri "/api/projects/$($projectB.data.id)/members" -Method "POST" -Body @{
    userId = $User4.id
    role   = "member"
}
if ($assign2) { Write-Host "Admin assigned User 4 to Project B" -ForegroundColor Green }

Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray

# ----------------------------------------------------------------
# 4. Verify Access & Create Content
# ----------------------------------------------------------------
Write-Host "4. Verifying Access & Creating Content..." -ForegroundColor Yellow

# Test A: User 3 creates issue on Project A (Should Succeed)
Write-Host "Test A: User 3 creating issue on Project A (Assigned)..." -NoNewline
$issueA = Invoke-ApiRequest -Uri "/api/projects/$($projectA.data.id)/issues" -Method "POST" -Body @{
    title       = "Issue by User 3"
    description = "This should work"
    priority    = "medium"
} -Token $User3.ApiKey

if ($issueA) {
    Write-Host " SUCCESS" -ForegroundColor Green
}
else {
    Write-Host " FAILED" -ForegroundColor Red
}

# Test B: User 3 tries to create issue on Project B (Should Fail)
Write-Host "Test B: User 3 creating issue on Project B (Not Assigned)..." -NoNewline
$issueB_Fail = Invoke-ApiRequest -Uri "/api/projects/$($projectB.data.id)/issues" -Method "POST" -Body @{
    title       = "Exploit Attempt"
    description = "This should fail"
    priority    = "high"
} -Token $User3.ApiKey

if ($issueB_Fail) {
    Write-Host " FAILED (Request Succeeded but should have failed)" -ForegroundColor Red
}
else {
    Write-Host " SUCCESS (Request Failed as expected)" -ForegroundColor Green
}

# Test C: User 4 creates comment on Project B (Should Succeed)
# First User 2 creates an issue on Project B
$issueB = Invoke-ApiRequest -Uri "/api/projects/$($projectB.data.id)/issues" -Method "POST" -Body @{
    title       = "Issue by User 2"
    description = "Setup for comment test"
    priority    = "low"
} -Token $User2.ApiKey

if ($issueB) {
    Write-Host "Test C: User 4 commenting on Project B (Assigned)..." -NoNewline
    $commentB = Invoke-ApiRequest -Uri "/api/issues/$($issueB.data.id)/comments" -Method "POST" -Body @{
        content = "Comment by User 4"
    } -Token $User4.ApiKey

    if ($commentB) {
        Write-Host " SUCCESS" -ForegroundColor Green
    }
    else {
        Write-Host " FAILED" -ForegroundColor Red
    }
}

# Test D: User 4 tries to comment on Project A (Should Fail)
if ($issueA) {
    Write-Host "Test D: User 4 commenting on Project A (Not Assigned)..." -NoNewline
    $commentA_Fail = Invoke-ApiRequest -Uri "/api/issues/$($issueA.data.id)/comments" -Method "POST" -Body @{
        content = "Exploit Comment"
    } -Token $User4.ApiKey

    if ($commentA_Fail) {
        Write-Host " FAILED (Request Succeeded but should have failed)" -ForegroundColor Red
    }
    else {
        Write-Host " SUCCESS (Request Failed as expected)" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "End-to-End Test Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
