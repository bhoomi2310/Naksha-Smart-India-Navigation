# Script to copy images to src/assets folder
$basePath = "C:\Users\imbho\.cursor\projects\c-Users-imbho-OneDrive-Desktop-Cursor-Naksha-Smart-India-Navigation"
$assetsFolder = Join-Path $basePath "assets" "c__Users_imbho_AppData_Roaming_Cursor_User_workspaceStorage_5d884c7857827834c969d31e71b92956_images_"
$destFolder = Join-Path $PSScriptRoot "src\assets"

# Create destination folder if it doesn't exist
if (-not (Test-Path $destFolder)) {
    New-Item -ItemType Directory -Path $destFolder -Force | Out-Null
}

# Image mappings
$imageMap = @{
    "image-aa8b5bbc-8690-4ae9-b17e-c704aef20aa6.png" = "taj-mahal.png"
    "image-5b47518e-7279-4c58-aad7-ba3bbb3e4ec1.png" = "hampi.png"
    "image-c6dbd2b5-a0e1-4b81-80fc-1c85d901b881.png" = "qutub-minar.png"
    "image-9dba694d-3ace-4775-807f-65af1bebb980.png" = "gateway-india.png"
    "image-a39290e7-cbca-44e2-90d6-1a7201ee2c96.png" = "goddess.png"
    "image-397ba648-5e64-4dda-b031-2e9ee0077921.png" = "auto-rickshaw.png"
}

Write-Host "Copying images..."
foreach ($item in $imageMap.GetEnumerator()) {
    $srcFile = Join-Path $assetsFolder $item.Key
    $destFile = Join-Path $destFolder $item.Value
    
    if (Test-Path $srcFile) {
        Copy-Item $srcFile $destFile -Force
        Write-Host "✓ Copied: $($item.Value)"
    } else {
        Write-Host "✗ Not found: $($item.Key)"
    }
}

Write-Host ""
Write-Host "Done! Images copied to src\assets\"
