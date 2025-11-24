$API_KEY = "weco_live_5ce8e5719eb69662ca51bcc527283d8e9f72c26cfca6141d"
$BASE_URL = "http://localhost:3000"

Write-Host "Checking API Key Role..."

try {
    # 1. Get User ID
    $me = Invoke-RestMethod -Uri "$BASE_URL/api/me" -Headers @{ Authorization = "Bearer $API_KEY" }
    $userId = $me.data.id
    Write-Host "Raw ID: '$userId'" -ForegroundColor Green
    Write-Host "Length: $($userId.Length)" -ForegroundColor Gray
    Write-Host "Full Response: $($me | ConvertTo-Json -Depth 5)" -ForegroundColor Gray

    # 2. Try to list users (will fail if not admin)
    $users = Invoke-RestMethod -Uri "$BASE_URL/api/users?limit=1" -Headers @{ Authorization = "Bearer $API_KEY" }
    Write-Host "Success! Can list users. Role is likely Admin." -ForegroundColor Green
}
catch {
    Write-Host "Error: $($_.Exception.Message)" -ForegroundColor Red
    if ($_.Exception.Response) {
        $stream = $_.Exception.Response.GetResponseStream()
        $reader = [System.IO.StreamReader]::new($stream)
        Write-Host "Body: $($reader.ReadToEnd())" -ForegroundColor Red
    }
}
