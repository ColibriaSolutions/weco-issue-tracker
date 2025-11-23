# Quick API Test Script
# Save this as test-api.ps1

# Step 1: Set your API key (replace with the actual key from the dialog)
$API_KEY = $env:API_KEY
if (-not $API_KEY) {
    $API_KEY = "weco_live_5ce8e5719eb69662ca51bcc527283d8e9f72c26cfca6141d"
}
$BASE_URL = "http://localhost:3000"

Write-Host "Testing WECO Issue Tracker API..." -ForegroundColor Cyan
Write-Host ""

# Test 1: List Projects
Write-Host "1. Testing GET /api/projects..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "$BASE_URL/api/projects" `
        -Method GET `
        -Headers @{
        "Authorization" = "Bearer $API_KEY"
        "Content-Type"  = "application/json"
    }
    Write-Host "Success! Found $($response.data.Count) projects" -ForegroundColor Green
    $response | ConvertTo-Json -Depth 5
}
catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""

# Test 2: Create a Project
Write-Host "2. Testing POST /api/projects..." -ForegroundColor Yellow
try {
    $body = @{
        name        = "API Test Project"
        description = "Created via PowerShell script"
    } | ConvertTo-Json

    $response = Invoke-RestMethod -Uri "$BASE_URL/api/projects" `
        -Method POST `
        -Headers @{
        "Authorization" = "Bearer $API_KEY"
        "Content-Type"  = "application/json"
    } `
        -Body $body

    Write-Host "Success! Created project with ID: $($response.data.id)" -ForegroundColor Green
    $PROJECT_ID = $response.data.id
    $response | ConvertTo-Json -Depth 5
}
catch {
    Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Write-Host "----------------------------------------" -ForegroundColor Gray
Write-Host ""

# Test 3: Get Single Project (if we created one)
if ($PROJECT_ID) {
    Write-Host "3. Testing GET /api/projects/$PROJECT_ID..." -ForegroundColor Yellow
    try {
        $response = Invoke-RestMethod -Uri "$BASE_URL/api/projects/$PROJECT_ID" `
            -Method GET `
            -Headers @{
            "Authorization" = "Bearer $API_KEY"
            "Content-Type"  = "application/json"
        }
        Write-Host "Success! Retrieved project: $($response.data.name)" -ForegroundColor Green
        $response | ConvertTo-Json -Depth 5
    }
    catch {
        Write-Host "Failed: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "API Test Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
