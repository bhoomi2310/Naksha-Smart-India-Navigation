# Quick Start Guide

## 🚀 Get Running in 5 Minutes

### Step 1: Install Dependencies

**Terminal 1 - Frontend:**
```bash
npm install
```

**Terminal 2 - Backend:**
```bash
cd server
npm install
```

### Step 2: Set Up Environment Files

**Backend (.env file in `server/` folder):**
```bash
cd server
copy .env.example .env
```

Then edit `server/.env` and add:
```env
PORT=3001
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
OPENROUTESERVICE_API_KEY=
```

**Frontend (.env file in root folder):**
```bash
# In root directory
copy .env.example .env
```

The `.env` file should have:
```env
VITE_API_URL=http://localhost:3001/api
```

### Step 3: Start Backend (Terminal 1)

```bash
cd server
npm run dev
```

✅ You should see: `🚀 Naksha Backend running on http://localhost:3001`

### Step 4: Start Frontend (Terminal 2)

```bash
# In root directory
npm run dev
```

✅ You should see: `Local: http://localhost:8081/`

### Step 5: Open Browser

Go to: **http://localhost:8081**

## 🎯 Test Login

1. Click **"Sign In with Demo"** on the landing page
2. OR click **"Sign In"** → **"Use Demo Account"**

**Demo Credentials:**
- Email: `demo@naksha.app`
- Password: `demo123`

## 🔑 Required: Get API Key for Real Routing

**Route requests require an API key!** Get it now (free, 2 minutes):

1. Visit: https://openrouteservice.org/dev/#/signup
2. Sign up (free, no credit card)
3. Verify your email
4. Get your API key from dashboard
5. Add to `server/.env`: `OPENROUTESERVICE_API_KEY=your-key-here`
6. Restart backend server

**See [GET_API_KEY.md](./GET_API_KEY.md) for detailed step-by-step instructions!**

**Free Tier:** 2,000 requests/day (plenty for development)

## ❌ Troubleshooting

**Backend won't start?**
- Check if port 3001 is free
- Make sure you're in the `server` folder
- Run `npm install` again in `server` folder

**Frontend won't start?**
- Check if port 8081 is free
- Make sure you're in root directory
- Run `npm install` again

**Can't login?**
- Make sure backend is running (check Terminal 1)
- Check browser console (F12) for errors
- Verify `.env` files are set up correctly

---

For detailed setup, see **SETUP_GUIDE.md**
