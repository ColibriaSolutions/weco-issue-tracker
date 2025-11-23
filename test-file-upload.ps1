# File Upload Test Script using a local public image and curl.exe
# Simplified structure to avoid parser issues.

$ErrorActionPreference = "Stop"

# Configuration
$API_KEY = $env:API_KEY
if (-not $API_KEY) {
    $API_KEY = "weco_live_5ce8e5719eb69662ca51bcc527283d8e9f72c26cfca6141d"
}
$BASE_URL = "http://localhost:3000"

Write-Host "`n=== File Upload Test ===" -ForegroundColor Cyan

# Step 1: Copy a local public image to a temp file
Write-Host "1. Copying local test image..." -ForegroundColor Yellow
$publicImagePath = "g:/SourceCode/WECORelated/weco-issue-tracker/public/placeholder-logo.png"
$tempImagePath = Join-Path $env:TEMP "test-upload-$(Get-Random).png"
$tempJsonPath = Join-Path $env:TEMP "test-body-$(Get-Random).json"

Copy-Item -Path $publicImagePath -Destination $tempImagePath -Force
Write-Host "   - Image copied to $tempImagePath" -ForegroundColor Green

# Step 1.5: Get current authenticated user ID
Write-Host "`n1.5. Fetching current user ID..." -ForegroundColor Yellow
$meArgs = @(
    "-sS",
    "-X", "GET",
    "-H", "Authorization: Bearer $API_KEY",
    "$BASE_URL/api/me"
)
$meJson = & curl.exe $meArgs
$meJson = $meJson -join ""
$meResponse = $meJson | ConvertFrom-Json

if (-not $meResponse.data) {
    Write-Host "   x Failed to fetch current user" -ForegroundColor Red
    exit 1
}
$userId = $meResponse.data.id
Write-Host "   - Current User ID: $userId" -ForegroundColor Green

# Step 2: Create a project
Write-Host "`n2. Creating project..." -ForegroundColor Yellow
$projectName = "Upload Test $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')"
$projectBody = @{ name = $projectName; description = "Testing file uploads" } | ConvertTo-Json
Set-Content -Path $tempJsonPath -Value $projectBody

$projectArgs = @(
    "-sS",
    "-X", "POST",
    "-H", "Authorization: Bearer $API_KEY",
    "-H", "Content-Type: application/json",
    "-d", "@$tempJsonPath",
    "$BASE_URL/api/projects"
)
Write-Host "Executing curl with args: $($projectArgs -join ' ')" -ForegroundColor Gray
$projectJson = & curl.exe $projectArgs
$projectJson = $projectJson -join ""
Write-Host "Response: $projectJson" -ForegroundColor Gray

if (-not $projectJson) {
    Write-Host "   x Curl returned empty response" -ForegroundColor Red
    exit 1
}

$projectResponse = $projectJson | ConvertFrom-Json
if (-not $projectResponse.data) {
    Write-Host "   x Project creation failed - missing data field" -ForegroundColor Red
    exit 1
}
$projectId = $projectResponse.data.id
Write-Host "   - Project created: $projectName (ID: $projectId)" -ForegroundColor Green

# Step 3: Create issue with screenshot
Write-Host "`n3. Creating issue with screenshot..." -ForegroundColor Yellow
$issueArgs = @(
    "-sS",
    "-X", "POST",
    "-H", "Authorization: Bearer $API_KEY",
    "-F", "title=Bug with Screenshot",
    "-F", "description=Testing screenshot upload via API",
    "-F", "status=open",
    "-F", "priority=high",
    "-F", "screenshot=@$tempImagePath",
    "$BASE_URL/api/projects/$projectId/issues"
)
Write-Host "Executing curl with args: $($issueArgs -join ' ')" -ForegroundColor Gray
$issueJson = & curl.exe $issueArgs
$issueJson = $issueJson -join ""
Write-Host "Response: $issueJson" -ForegroundColor Gray

$issueData = $issueJson | ConvertFrom-Json
if (-not $issueData.data) {
    Write-Host "   x Issue creation failed - missing data field" -ForegroundColor Red
    exit 1
}
$issueId = $issueData.data.id
Write-Host "   - Issue created (ID: $issueId)" -ForegroundColor Green
Write-Host "   - Screenshot URL: $($issueData.data.screenshot_url)" -ForegroundColor Gray

# Step 4: Add comment with attachment
Write-Host "`n4. Adding comment with attachment..." -ForegroundColor Yellow
$commentArgs = @(
    "-sS",
    "-X", "POST",
    "-H", "Authorization: Bearer $API_KEY",
    "-F", "content=Additional context with attachment",
    "-F", "user_id=$userId",
    "-F", "attachment=@$tempImagePath",
    "$BASE_URL/api/issues/$issueId/comments"
)
Write-Host "Executing curl with args: $($commentArgs -join ' ')" -ForegroundColor Gray
$commentJson = & curl.exe $commentArgs
$commentJson = $commentJson -join ""
Write-Host "Response: $commentJson" -ForegroundColor Gray

$commentData = $commentJson | ConvertFrom-Json
if (-not $commentData.data) {
    Write-Host "   x Comment creation failed - missing data field" -ForegroundColor Red
    exit 1
}
Write-Host "   - Comment created" -ForegroundColor Green
Write-Host "   - Attachment URL: $($commentData.data.attachment_url)" -ForegroundColor Gray
Write-Host "   - Attachment Type: $($commentData.data.attachment_type)" -ForegroundColor Gray

# Step 5: Verify uploads
Write-Host "`n5. Verifying uploads..." -ForegroundColor Yellow
$issueCheck = Invoke-RestMethod -Uri "$BASE_URL/api/issues/$issueId" -Headers @{ Authorization = "Bearer $API_KEY" }
$commentsCheck = Invoke-RestMethod -Uri "$BASE_URL/api/issues/$issueId/comments" -Headers @{ Authorization = "Bearer $API_KEY" }
Write-Host "   - Issue screenshot present: $(if ($issueCheck.data.screenshot_url) { 'Yes' } else { 'No' })" -ForegroundColor Green
Write-Host "   - Number of comments: $($commentsCheck.data.Count)" -ForegroundColor Green

# Cleanup
Remove-Item -Path $tempImagePath -Force -ErrorAction SilentlyContinue
Remove-Item -Path $tempJsonPath -Force -ErrorAction SilentlyContinue

Write-Host "`n=== Test Complete ===" -ForegroundColor Cyan
