# ═══════════════════════════════════════════════════════════════
# dev.ps1 — Lịch Học 2022KTT
# Development server cho Windows
# Cách dùng: .\scripts\dev.ps1 [-Port 8080] [-Open]
# ═══════════════════════════════════════════════════════════════

param(
    [int]$Port = 3000,
    [switch]$Open,
    [switch]$Build
)

$ErrorActionPreference = 'Stop'
$Root = Split-Path -Parent $PSScriptRoot

Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host "  🖥  Dev Server — Lịch Học 2022KTT" -ForegroundColor Cyan
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
Write-Host ""

# ── Check files ────────────────────────────────────────────────
$requiredFiles = @('index.html', 'index.mobile.html', 'styles.css', 'app.js', 'sw.js', 'manifest.json')
foreach ($f in $requiredFiles) {
    $path = Join-Path $Root $f
    if (Test-Path $path) {
        $size = (Get-Item $path).Length
        Write-Host "  ✓ $f ($size bytes)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ $f — THIẾU!" -ForegroundColor Red
        exit 1
    }
}

# ── Check data ─────────────────────────────────────────────────
$dataPath = Join-Path $Root "data\schedule.json"
if (Test-Path $dataPath) {
    try {
        Get-Content $dataPath -Raw | ConvertFrom-Json | Out-Null
        Write-Host "  ✓ data/schedule.json (valid JSON)" -ForegroundColor Green
    } catch {
        Write-Host "  ⚠ data/schedule.json — JSON không hợp lệ!" -ForegroundColor Yellow
    }
} else {
    Write-Host "  ⚠ data/schedule.json — chưa có (tùy chọn)" -ForegroundColor Yellow
}

Write-Host ""

# ── Start server ───────────────────────────────────────────────
$url = "http://localhost:$Port"

# Try Python http.server first
if (Get-Command python -ErrorAction SilentlyContinue) {
    Write-Host "  🌐 Server: $url" -ForegroundColor Cyan
    Write-Host "  📁 Root: $Root" -ForegroundColor Gray
    Write-Host "  ⌨  Nhấn Ctrl+C để dừng" -ForegroundColor Gray
    Write-Host ""
    
    if ($Open) {
        Start-Process $url
    }
    
    Push-Location $Root
    python -m http.server $Port
    Pop-Location
}
# Try Node.js http-server
elseif (Get-Command npx -ErrorAction SilentlyContinue) {
    Write-Host "  🌐 Server: $url" -ForegroundColor Cyan
    Write-Host "  📁 Root: $Root" -ForegroundColor Gray
    Write-Host "  ⌨  Nhấn Ctrl+C để dừng" -ForegroundColor Gray
    Write-Host ""
    
    if ($Open) {
        Start-Process $url
    }
    
    Push-Location $Root
    npx -y http-server -p $Port -c-1
    Pop-Location
}
# Fallback: PowerShell HttpListener
else {
    Write-Host "  ⚠ Python/Node not found, using PowerShell HttpListener" -ForegroundColor Yellow
    Write-Host "  🌐 Server: $url" -ForegroundColor Cyan
    Write-Host ""
    
    $listener = New-Object System.Net.HttpListener
    $listener.Prefixes.Add("$url/")
    $listener.Start()
    
    if ($Open) {
        Start-Process $url
    }
    
    Write-Host "  ✓ Server running. Press Ctrl+C to stop." -ForegroundColor Green
    
    try {
        while ($listener.IsListening) {
            $context = $listener.GetContext()
            $request = $context.Request
            $response = $context.Response
            
            $localPath = $request.Url.LocalPath
            if ($localPath -eq '/') { $localPath = '/index.html' }
            
            $filePath = Join-Path $Root $localPath.TrimStart('/')
            
            if (Test-Path $filePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($filePath).ToLower()
                $contentType = switch ($ext) {
                    '.html' { 'text/html; charset=utf-8' }
                    '.css'  { 'text/css; charset=utf-8' }
                    '.js'   { 'application/javascript; charset=utf-8' }
                    '.json' { 'application/json; charset=utf-8' }
                    '.svg'  { 'image/svg+xml' }
                    '.png'  { 'image/png' }
                    '.ico'  { 'image/x-icon' }
                    '.ics'  { 'text/calendar' }
                    default { 'application/octet-stream' }
                }
                
                $response.ContentType = $contentType
                $buffer = [System.IO.File]::ReadAllBytes($filePath)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
                
                Write-Host "  200 $localPath" -ForegroundColor Green
            } else {
                $response.StatusCode = 404
                $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found")
                $response.OutputStream.Write($msg, 0, $msg.Length)
                
                Write-Host "  404 $localPath" -ForegroundColor Red
            }
            
            $response.Close()
        }
    } finally {
        $listener.Stop()
        $listener.Close()
        Write-Host "`n  Server stopped." -ForegroundColor Yellow
    }
}
