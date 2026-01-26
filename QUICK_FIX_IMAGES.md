# Quick Fix: Copy Images Manually

The code is ready but needs the image files. Here's the fastest way to fix it:

## Option 1: Manual Copy (Fastest)

1. Open File Explorer
2. Navigate to: `C:\Users\imbho\.cursor\projects\c-Users-imbho-OneDrive-Desktop-Cursor-Naksha-Smart-India-Navigation\assets\c__Users_imbho_AppData_Roaming_Cursor_User_workspaceStorage_5d884c7857827834c969d31e71b92956_images_`
3. Copy these 6 files to `src\assets\` folder in your project:
   - `image-aa8b5bbc-8690-4ae9-b17e-c704aef20aa6.png` → rename to `taj-mahal.png`
   - `image-5b47518e-7279-4c58-aad7-ba3bbb3e4ec1.png` → rename to `hampi.png`
   - `image-c6dbd2b5-a0e1-4b81-80fc-1c85d901b881.png` → rename to `qutub-minar.png`
   - `image-9dba694d-3ace-4775-807f-65af1bebb980.png` → rename to `gateway-india.png`
   - `image-a39290e7-cbca-44e2-90d6-1a7201ee2c96.png` → rename to `goddess.png`
   - `image-397ba648-5e64-4dda-b031-2e9ee0077921.png` → rename to `auto-rickshaw.png`

## Option 2: Run PowerShell Script

Run this in PowerShell from your project root:

```powershell
$src = "C:\Users\imbho\.cursor\projects\c-Users-imbho-OneDrive-Desktop-Cursor-Naksha-Smart-India-Navigation\assets\c__Users_imbho_AppData_Roaming_Cursor_User_workspaceStorage_5d884c7857827834c969d31e71b92956_images_"
$dest = "src\assets\"

Copy-Item "$src\image-aa8b5bbc-8690-4ae9-b17e-c704aef20aa6.png" "$dest\taj-mahal.png"
Copy-Item "$src\image-5b47518e-7279-4c58-aad7-ba3bbb3e4ec1.png" "$dest\hampi.png"
Copy-Item "$src\image-c6dbd2b5-a0e1-4b81-80fc-1c85d901b881.png" "$dest\qutub-minar.png"
Copy-Item "$src\image-9dba694d-3ace-4775-807f-65af1bebb980.png" "$dest\gateway-india.png"
Copy-Item "$src\image-a39290e7-cbca-44e2-90d6-1a7201ee2c96.png" "$dest\goddess.png"
Copy-Item "$src\image-397ba648-5e64-4dda-b031-2e9ee0077921.png" "$dest\auto-rickshaw.png"
```

After copying, restart your dev server.
