# Fix: Port 3001 Already in Use

## Quick Fix

Port 3001 is already being used by another process. Here's how to fix it:

## Option 1: Kill the Process (Windows PowerShell as Admin)

1. **Open PowerShell as Administrator:**
   - Right-click Start menu
   - Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Kill the process:**
   ```powershell
   taskkill /F /PID 10168
   ```

3. **If that doesn't work, kill all Node processes:**
   ```powershell
   taskkill /F /IM node.exe
   ```

## Option 2: Find and Kill Manually

1. **Find what's using port 3001:**
   ```powershell
   netstat -ano | findstr :3001
   ```

2. **Note the PID (Process ID)** - in your case it's `10168`

3. **Kill it:**
   ```powershell
   taskkill /F /PID 10168
   ```

## Option 3: If Running in WSL

If you're using WSL (Windows Subsystem for Linux):

1. **In WSL terminal, find the process:**
   ```bash
   lsof -i :3001
   ```

2. **Kill it:**
   ```bash
   kill -9 <PID>
   ```

   Or kill all node processes:
   ```bash
   pkill -f node
   ```

## Option 4: Change Port (Quick Workaround)

If you can't kill the process, change the port:

1. **Edit `server/.env`:**
   ```env
   PORT=3002
   ```

2. **Edit root `.env`:**
   ```env
   VITE_API_URL=http://localhost:3002/api
   ```

3. **Restart backend**

## After Fixing

Once the port is free:

1. **Navigate to server folder:**
   ```bash
   cd server
   ```

2. **Start the server:**
   ```bash
   npm run dev
   ```

You should see:
```
🚀 Naksha Backend running on http://localhost:3001
```

## Verify Port is Free

Check if port 3001 is now free:
```powershell
netstat -ano | findstr :3001
```

If nothing shows up, the port is free!
