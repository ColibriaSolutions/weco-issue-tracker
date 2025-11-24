# Data Seeding Script
# Populates the system with Users, Projects, Memberships, Issues, and Comments
# Uses the Admin API Key to perform all actions

# Configuration
$BASE_URL = "http://localhost:3000"
# Replace with your actual Admin API Key
$script:ADMIN_API_KEY = $env:API_KEY
if (-not $script:ADMIN_API_KEY) {
    $script:ADMIN_API_KEY = "weco_live_5ce8e5719eb69662ca51bcc527283d8e9f72c26cfca6141d"
}

Write-Host "Using API Key: $($script:ADMIN_API_KEY.Substring(0, 10))..." -ForegroundColor Gray

# Helper function for API requests
function Invoke-ApiRequest {
    param (
        [string]$Uri,
        [string]$Method = "GET",
        [hashtable]$Body = @{}
    )

    $headers = @{
        "Authorization" = "Bearer $script:ADMIN_API_KEY"
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

Write-Host "Starting Data Seeding..." -ForegroundColor Cyan
Write-Host "----------------------------------------" -ForegroundColor Gray

# ----------------------------------------------------------------
# 1. Create Users
# ----------------------------------------------------------------
Write-Host "1. Creating Users..." -ForegroundColor Yellow

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
        $users += $user
        Write-Host "Created $email (ID: $($user.id))" -ForegroundColor Green
    }
}

if ($users.Count -lt 4) {
    Write-Host "Failed to create all users. Exiting." -ForegroundColor Red
    exit
}

$User1 = $users[0]
$User2 = $users[1]
$User3 = $users[2]
$User4 = $users[3]

Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray

# ----------------------------------------------------------------
# 2. Create Projects
# ----------------------------------------------------------------
Write-Host "2. Creating Projects..." -ForegroundColor Yellow

# Project A (Owner: User 1)
$projectA = Invoke-ApiRequest -Uri "/api/projects" -Method "POST" -Body @{
    name        = "Project A (User 1)"
    description = "Project owned by User 1"
}

if ($projectA) {
    Write-Host "Created 'Project A' (ID: $($projectA.data.id))" -ForegroundColor Green
    # Assign User 1 as Owner
    Invoke-ApiRequest -Uri "/api/projects/$($projectA.data.id)/members" -Method "POST" -Body @{
        userId = $User1.id
        role   = "owner"
    } | Out-Null
    Write-Host "  Assigned User 1 as Owner" -ForegroundColor Gray
}

# Project B (Owner: User 2)
$projectB = Invoke-ApiRequest -Uri "/api/projects" -Method "POST" -Body @{
    name        = "Project B (User 2)"
    description = "Project owned by User 2"
}

if ($projectB) {
    Write-Host "Created 'Project B' (ID: $($projectB.data.id))" -ForegroundColor Green
    # Assign User 2 as Owner
    Invoke-ApiRequest -Uri "/api/projects/$($projectB.data.id)/members" -Method "POST" -Body @{
        userId = $User2.id
        role   = "owner"
    } | Out-Null
    Write-Host "  Assigned User 2 as Owner" -ForegroundColor Gray
}

Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray

# ----------------------------------------------------------------
# 3. Assign Members
# ----------------------------------------------------------------
Write-Host "3. Assigning Members..." -ForegroundColor Yellow

# Assign User 3 to Project A
$assign1 = Invoke-ApiRequest -Uri "/api/projects/$($projectA.data.id)/members" -Method "POST" -Body @{
    userId = $User3.id
    role   = "member"
}
if ($assign1) { Write-Host "Assigned User 3 to Project A" -ForegroundColor Green }

# Assign User 4 to Project B
$assign2 = Invoke-ApiRequest -Uri "/api/projects/$($projectB.data.id)/members" -Method "POST" -Body @{
    userId = $User4.id
    role   = "member"
}
if ($assign2) { Write-Host "Assigned User 4 to Project B" -ForegroundColor Green }

Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray

# ----------------------------------------------------------------
# 4. Create Issues & Comments (Impersonation)
# ----------------------------------------------------------------
Write-Host "4. Creating Issues & Comments..." -ForegroundColor Yellow

# User 3 creates issue on Project A
$issueA = Invoke-ApiRequest -Uri "/api/projects/$($projectA.data.id)/issues" -Method "POST" -Body @{
    title       = "Issue by User 3"
    description = "Created via seeding script"
    priority    = "medium"
    created_by  = $User3.id # Admin impersonation
}

if ($issueA) {
    Write-Host "User 3 created issue on Project A (ID: $($issueA.data.id))" -ForegroundColor Green
    
    # User 1 comments on it
    $commentA = Invoke-ApiRequest -Uri "/api/issues/$($issueA.data.id)/comments" -Method "POST" -Body @{
        content = "Ack by User 1"
        user_id = $User1.id # Admin impersonation
    }
    if ($commentA) { Write-Host "  User 1 commented on it" -ForegroundColor Green }
}

# User 4 creates issue on Project B
$issueB = Invoke-ApiRequest -Uri "/api/projects/$($projectB.data.id)/issues" -Method "POST" -Body @{
    title       = "Issue by User 4"
    description = "Created via seeding script"
    priority    = "high"
    created_by  = $User4.id # Admin impersonation
}

if ($issueB) {
    Write-Host "User 4 created issue on Project B (ID: $($issueB.data.id))" -ForegroundColor Green
    
    # User 2 comments on it
    $commentB = Invoke-ApiRequest -Uri "/api/issues/$($issueB.data.id)/comments" -Method "POST" -Body @{
        content = "Ack by User 2"
        user_id = $User2.id # Admin impersonation
    }
    if ($commentB) { Write-Host "  User 2 commented on it" -ForegroundColor Green }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Data Seeding Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "You can now log in as these users to verify permissions:" -ForegroundColor Yellow
Write-Host "User 3: $($User3.email) (Password: password123) -> Should see Project A only" -ForegroundColor White
Write-Host "User 4: $($User4.email) (Password: password123) -> Should see Project B only" -ForegroundColor White
