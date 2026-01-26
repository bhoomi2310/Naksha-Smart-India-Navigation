# Image Setup Instructions

The code is now configured to use your custom images. You need to copy the 6 images to the `src/assets/` folder with these exact names:

## Required Images

1. **taj-mahal.png** (Image 1 - Taj Mahal) → Used in Dashboard
2. **hampi.png** (Image 2 - Hampi Stone Chariot) → Used in Routes page
3. **qutub-minar.png** (Image 3 - Qutub Minar) → Used in Settings page
4. **gateway-india.png** (Image 4 - Gateway of India) → Used in Profile page
5. **goddess.png** (Image 5 - Stylized Goddess) → Used in Login/Register pages
6. **auto-rickshaw.png** (Image 6 - Auto-rickshaw) → Used in Landing page

## How to Copy Images

Your images are located at:
```
C:\Users\imbho\.cursor\projects\c-Users-imbho-OneDrive-Desktop-Cursor-Naksha-Smart-India-Navigation\assets\c__Users_imbho_AppData_Roaming_Cursor_User_workspaceStorage_5d884c7857827834c969d31e71b92956_images_\
```

Copy them to `src/assets/` with these names:

1. `image-aa8b5bbc-8690-4ae9-b17e-c704aef20aa6.png` → `taj-mahal.png`
2. `image-5b47518e-7279-4c58-aad7-ba3bbb3e4ec1.png` → `hampi.png`
3. `image-c6dbd2b5-a0e1-4b81-80fc-1c85d901b881.png` → `qutub-minar.png`
4. `image-9dba694d-3ace-4775-807f-65af1bebb980.png` → `gateway-india.png`
5. `image-a39290e7-cbca-44e2-90d6-1a7201ee2c96.png` → `goddess.png`
6. `image-397ba648-5e64-4dda-b031-2e9ee0077921.png` → `auto-rickshaw.png`

## Quick Copy Command (PowerShell)

Run this in PowerShell from the project root:

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

After copying, restart your dev server to see the images.
