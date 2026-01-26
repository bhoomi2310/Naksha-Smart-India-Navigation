# 🚀 START HERE - Complete Setup Guide

Welcome to Naksha! Follow these steps to get everything running.

## 📋 What You Need

- Node.js (v18+) installed
- Two terminal windows
- 5-10 minutes

## ⚡ Quick Start (Recommended)

**See [QUICK_START.md](./QUICK_START.md) for the fastest setup!**

## 📚 Full Documentation

1. **[QUICK_START.md](./QUICK_START.md)** - Get running in 5 minutes
2. **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Detailed setup with troubleshooting
3. **[API_KEYS_GUIDE.md](./API_KEYS_GUIDE.md)** - How to get and use API keys

## 🎯 Step-by-Step Setup

### Step 1: Install Frontend Dependencies

Open terminal in **root directory**:
```bash
npm install
```

### Step 2: Install Backend Dependencies

Open **new terminal**, go to server folder:
```bash
cd server
npm install
```

### Step 3: Create Environment Files

**Backend:**
```bash
# In server folder
copy .env.example .env
```

Edit `server/.env`:
```env
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
OPENROUTESERVICE_API_KEY=
```

**Frontend:**
```bash
# In root directory
copy .env.example .env
```

The `.env` file should have:
```env
VITE_API_URL=http://localhost:3001/api
```

### Step 4: Start Backend Server

In terminal (server folder):
```bash
npm run dev
```

✅ You should see: `🚀 Naksha Backend running on http://localhost:3001`

**Keep this terminal open!**

### Step 5: Start Frontend Server

In **new terminal** (root directory):
```bash
npm run dev
```

✅ You should see: `Local: http://localhost:8081/`

### Step 6: Open the App

Open browser → http://localhost:8081

## 🎮 Test the App

### Option 1: Demo Login (Easiest)
1. Click **"Sign In with Demo"** on landing page
2. You'll be automatically logged in!

### Option 2: Manual Demo Login
1. Click **"Sign In"**
2. Click **"Use Demo Account"** button
3. Auto-login happens!

**Demo Credentials:**
- Email: `demo@naksha.app`
- Password: `demo123`

### Create New Account
1. Click **"Get Started Free"** or **"Sign Up"**
2. Fill in your details
3. Accept terms
4. Click **"Create Account"**

## 🔑 API Key Required for Routing

**⚠️ Route requests require an OpenRouteService API key!**

**Don't worry - it's FREE and takes 2 minutes:**
1. Get free OpenRouteService key: https://openrouteservice.org/dev/#/signup
2. Add to `server/.env`: `OPENROUTESERVICE_API_KEY=your-key`
3. Restart backend

**See [GET_API_KEY.md](./GET_API_KEY.md) for step-by-step instructions!**

**Free Tier:** 2,000 requests/day (plenty for development)

## ❌ Troubleshooting

### Backend won't start?
- ✅ Check port 3001 is free
- ✅ Make sure you're in `server` folder
- ✅ Run `npm install` in `server` folder again

### Frontend won't start?
- ✅ Check port 8081 is free
- ✅ Make sure you're in root directory
- ✅ Run `npm install` again

### Can't login?
- ✅ Make sure backend is running (check terminal)
- ✅ Check browser console (F12) for errors
- ✅ Verify `.env` files exist and are correct

### Still having issues?
- ✅ Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed troubleshooting
- ✅ Make sure both terminals show servers running
- ✅ Check browser console (F12) for error messages

## 📁 Project Structure

```
Naksha-Smart-India-Navigation/
├── src/              # Frontend React code
├── server/           # Backend Express server
├── .env             # Frontend environment (create this)
└── server/.env   # Backend environment (create this)
```

## ✅ Success Checklist

- [ ] Frontend dependencies installed (`npm install`)
- [ ] Backend dependencies installed (`cd server && npm install`)
- [ ] `server/.env` file created and configured
- [ ] `.env` file created in root with `VITE_API_URL`
- [ ] Backend server running on port 3001
- [ ] Frontend server running on port 8081
- [ ] Can access http://localhost:8081
- [ ] Can login with demo credentials

## 🎉 You're All Set!

Once everything is running:
- ✅ Test login/register
- ✅ Try searching for routes
- ✅ Explore all features
- ✅ Get API key for real routing (optional)

**Need help?** Check the other guide files or look at the troubleshooting section above.

---

**Happy Navigating! 🗺️**
