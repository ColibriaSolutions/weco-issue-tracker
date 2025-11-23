# Simplified File Upload Test Script
# Tests issue and comment creation with file uploads using Invoke-WebRequest

# Configuration
$API_KEY = $env:API_KEY
if (-not $API_KEY) {
    $API_KEY = "weco_live_5ce8e5719eb69662ca51bcc527283d8e9f72c26cfca6141d"
}
$BASE_URL = "http://localhost:3000"

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "File Upload Test" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Step 1: Create test image
Write-Host "1. Creating test image..." -ForegroundColor Yellow
$testImagePath = "$env:TEMP\test-screenshot-$(Get-Random).png"
# 1x1 red PNG
$pngBytes = [System.Convert]::FromBase64String("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==")
[System.IO.File]::WriteAllBytes($testImagePath, $pngBytes)
Write-Host "   âœ“ Created: $testImagePath" -ForegroundColor Green

# Step 2: Create project
Write-Host "`n2. Creating project..." -ForegroundColor Yellow
try {
    $projectName = "Upload Test $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
    $projectBody = @{
        name        = $projectName
        description = "Testing file uploads"
    } | ConvertTo-Json

    $projectResponse = Invoke-RestMethod -Uri "$BASE_URL/api/projects" `
        -Method POST `
        -Headers @{"Authorization" = "Bearer $API_KEY"; "Content-Type" = "application/json" } `
        -Body $projectBody

    $projectId = $projectResponse.data.id
    Write-Host "   âœ“ Project: $projectName" -ForegroundColor Green
    Write-Host "   ID: $projectId" -ForegroundColor Gray
}
catch {
    Write-Host "   âœ— Failed: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}

# Step 3: Create issue with screenshot (using Invoke-WebRequest for multipart)
Write-Host "`n3. Creating issue with screenshot..." -ForegroundColor Yellow
try {
    $form = @{
        title       = "Bug with Screenshot"
        description = "Testing screenshot upload via API"
        status      = "open"
        priority    = "high"
        screenshot  = Get-Item -Path $testImagePath
    }

    $issueResponse = Invoke-WebRequest -Uri "$BASE_URL/api/projects/$projectId/issues" `
        -Method POST `
        -Headers @{"Authorization" = "Bearer $API_KEY" } `
        -Form $form

    $issueData = ($issueResponse.Content | ConvertFrom-Json).data
    $issueId = $issueData.id
    
    Write-Host "   âœ“ Issue created" -ForegroundColor Green
    Write-Host "   ID: $issueId" -ForegroundColor Gray
    Write-Host "   Screenshot: $($issueData.screenshot_url)" -ForegroundColor Gray
}
catch {
    Write-Host "   âœ— Failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        Write-Host "   Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
    exit 1
}

# Step 4: Add comment with attachment
Write-Host "`n4. Adding comment with attachment..." -ForegroundColor Yellow
try {
    # Get first user from database as placeholder
    $userId = "00000000-0000-0000-0000-000000000000"
    
    $form2 = @{
        content    = "Additional context with attachment"
        user_id    = $userId
        attachment = Get-Item -Path $testImagePath
    }

    $commentResponse = Invoke-WebRequest -Uri "$BASE_URL/api/issues/$issueId/comments" `
        -Method POST `
        -Headers @{"Authorization" = "Bearer $API_KEY" } `
        -Form $form2

    $commentData = ($commentResponse.Content | ConvertFrom-Json).data
    
    Write-Host "   âœ“ Comment created" -ForegroundColor Green
    Write-Host "   Attachment: $($commentData.attachment_url)" -ForegroundColor Gray
    Write-Host "   Type: $($commentData.attachment_type)" -ForegroundColor Gray
}
catch {
    Write-Host "   âœ— Failed: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.ErrorDetails) {
        Write-Host "   Details: $($_.ErrorDetails.Message)" -ForegroundColor Red
    }
}

# Step 5: Verify
Write-Host "`n5. Verifying..." -ForegroundColor Yellow
try {
    $issue = Invoke-RestMethod -Uri "$BASE_URL/api/issues/$issueId" `
        -Headers @{"Authorization" = "Bearer $API_KEY" }
    
    $comments = Invoke-RestMethod -Uri "$BASE_URL/api/issues/$issueId/comments" `
        -Headers @{"Authorization" = "Bearer $API_KEY" }

    Write-Host "   âœ“ Issue has screenshot: $(if ($issue.data.screenshot_url) { 'Yes' } else { 'No' })" -ForegroundColor Green
    Write-Host "   âœ“ Comments: $($comments.data.Count)" -ForegroundColor Green
}
catch {
    Write-Host "   âœ— Verification failed" -ForegroundColor Red
}

# Cleanup
Remove-Item -Path $testImagePath -Force -ErrorAction SilentlyContinue

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "âœ“ Test Complete" -ForegroundColor Green
Write-Host "Project: $projectId" -ForegroundColor White
Write-Host "Issue: $issueId" -ForegroundColor White
Write-Host "========================================`n" -ForegroundColor Cyan

