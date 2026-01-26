@echo off
echo Copying images to src\assets\...
echo.

set "SRC=C:\Users\imbho\.cursor\projects\c-Users-imbho-OneDrive-Desktop-Cursor-Naksha-Smart-India-Navigation\assets\c__Users_imbho_AppData_Roaming_Cursor_User_workspaceStorage_5d884c7857827834c969d31e71b92956_images_"
set "DEST=src\assets\"

if not exist "%DEST%" mkdir "%DEST%"

copy "%SRC%image-aa8b5bbc-8690-4ae9-b17e-c704aef20aa6.png" "%DEST%taj-mahal.png" >nul 2>&1
copy "%SRC%image-5b47518e-7279-4c58-aad7-ba3bbb3e4ec1.png" "%DEST%hampi.png" >nul 2>&1
copy "%SRC%image-c6dbd2b5-a0e1-4b81-80fc-1c85d901b881.png" "%DEST%qutub-minar.png" >nul 2>&1
copy "%SRC%image-9dba694d-3ace-4775-807f-65af1bebb980.png" "%DEST%gateway-india.png" >nul 2>&1
copy "%SRC%image-a39290e7-cbca-44e2-90d6-1a7201ee2c96.png" "%DEST%goddess.png" >nul 2>&1
copy "%SRC%image-397ba648-5e64-4dda-b031-2e9ee0077921.png" "%DEST%auto-rickshaw.png" >nul 2>&1

if exist "%DEST%goddess.png" (
    echo Images copied successfully!
) else (
    echo.
    echo ERROR: Images not found at expected location.
    echo Please manually copy the 6 images to src\assets\ folder.
    echo See QUICK_FIX_IMAGES.md for instructions.
)

pause
