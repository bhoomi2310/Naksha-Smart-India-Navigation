# 🔑 Get Your Free OpenRouteService API Key

## Why You Need It

**Real routing data requires an API key.** Without it, route requests will fail.

**Good news:** It's completely FREE and takes 2 minutes to set up!

## 🚀 Quick Setup (2 Minutes)

### Step 1: Sign Up
1. Visit: **https://openrouteservice.org/dev/#/signup**
2. Click "Sign Up" or "Get Started"
3. Fill in:
   - Email address
   - Password
   - Accept terms
4. Click "Create Account"

### Step 2: Verify Email
- Check your email inbox
- Click the verification link
- (Check spam folder if you don't see it)

### Step 3: Get Your API Key
1. Log in to your dashboard: **https://openrouteservice.org/dev/#/home**
2. Navigate to "API Keys" or "Dashboard"
3. You'll see your API key (looks like: `5b3ce3597851110001cf6248...`)
4. **Copy the entire key**

### Step 4: Add to Your Project
1. Open `server/.env` file
2. Find the line: `OPENROUTESERVICE_API_KEY=`
3. Paste your key: `OPENROUTESERVICE_API_KEY=5b3ce3597851110001cf6248...`
4. **Save the file**

### Step 5: Restart Backend
1. Stop the backend server (Ctrl+C in terminal)
2. Start it again: `npm run dev`
3. You should see: `✅ OpenRouteService API Key: Configured`

## ✅ Verify It's Working

1. Start your backend server
2. Look for: `✅ OpenRouteService API Key: Configured`
3. Try searching for a route in the app
4. You should get real distance and time data!

## 📊 Free Tier Limits

- **2,000 requests per day** (plenty for development!)
- **No credit card required**
- **Completely free forever**

## 🎯 What You Get

With the API key, you'll get:
- ✅ Real route calculations
- ✅ Accurate distances
- ✅ Actual travel times
- ✅ Real route geometry
- ✅ Multiple route options

## ❌ Troubleshooting

### "Invalid API key" error?
- Make sure you copied the **entire** key (it's long!)
- Check there are no extra spaces
- Verify the key is in `server/.env` (not root `.env`)
- Restart the backend server after adding the key

### "Rate limit exceeded"?
- Free tier: 2,000 requests/day
- Wait until tomorrow, or upgrade to paid tier
- Check your dashboard for usage stats

### Can't find the API key?
- Log in to: https://openrouteservice.org/dev/#/home
- Look for "API Keys" in the menu
- Or check "Dashboard" section

### Still having issues?
1. Make sure you verified your email
2. Check that the key is in `server/.env` (not root)
3. Restart the backend server
4. Check backend terminal for error messages

## 🔒 Security Note

⚠️ **Never commit your API key to Git!**
- ✅ `.env` files are in `.gitignore` (safe)
- ✅ Keep your key secret
- ✅ Don't share it publicly

## 🎉 That's It!

Once you add the API key and restart the server, you'll have real routing data!

---

**Need help?** Check the main setup guides or the backend terminal for error messages.
