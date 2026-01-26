# API Keys Setup Guide

## Required vs Optional API Keys

### ⚠️ Required: OpenRouteService API Key
**Real routing data requires an API key.** Without it, route requests will fail.

**Don't worry - it's FREE and takes 2 minutes!** See [GET_API_KEY.md](./GET_API_KEY.md) for quick setup.

### 🔑 Optional: OpenRouteService API Key

**What it does:** Provides real routing data instead of mock routes.

**Free Tier:** 2,000 requests per day (plenty for development/testing)

**How to Get It:**

1. **Visit:** https://openrouteservice.org/dev/#/signup

2. **Sign Up:**
   - Click "Sign Up" or "Get Started"
   - Fill in your email and password
   - Verify your email (check spam folder if needed)

3. **Get Your API Key:**
   - Log in to your dashboard
   - Navigate to "API Keys" or "Dashboard"
   - Copy your API key (it looks like: `5b3ce3597851110001cf6248...`)

4. **Add to Backend:**
   - Open `server/.env` file
   - Find the line: `OPENROUTESERVICE_API_KEY=`
   - Add your key: `OPENROUTESERVICE_API_KEY=5b3ce3597851110001cf6248...`
   - Save the file

5. **Restart Backend:**
   - Stop the backend server (Ctrl+C)
   - Start it again: `npm run dev`

## How It Works

### Without API Key (Default):
- ✅ Authentication works (login/register)
- ✅ User profiles work
- ✅ Mock routing data is returned
- ✅ All features function normally

### With API Key:
- ✅ Everything above, PLUS
- ✅ Real routing calculations
- ✅ Actual distance and time estimates
- ✅ Real-world route geometry

## Other APIs Used (No Keys Required)

### Nominatim (OpenStreetMap)
- **Purpose:** Geocoding (address → coordinates)
- **API Key:** Not required
- **Rate Limit:** None for reasonable use
- **Status:** ✅ Already configured, works automatically

## ⚠️ Important: API Key Required

**Route requests require an API key.** Without it, you'll get errors when trying to calculate routes.

**Quick Setup:** See [GET_API_KEY.md](./GET_API_KEY.md) - takes 2 minutes and it's free!

You can still test:
- ✅ User registration and login
- ✅ Location search (geocoding)
- ✅ All UI features
- ❌ But route calculations will fail without the key

## Production Considerations

For production deployment:

1. **Get OpenRouteService API Key** (recommended)
   - Free tier: 2,000 requests/day
   - Paid tiers available for higher usage

2. **Consider Alternatives:**
   - Google Maps API (paid, more features)
   - Mapbox (paid, good for production)
   - Here Maps API (paid, enterprise)

3. **Rate Limiting:**
   - Implement rate limiting on your backend
   - Cache route results
   - Monitor API usage

## Security Notes

⚠️ **Never commit API keys to Git!**

- ✅ `.env` files are in `.gitignore`
- ✅ Use `.env.example` for documentation
- ✅ Keep keys secret
- ✅ Rotate keys if exposed

---

**Need Help?** Check SETUP_GUIDE.md for detailed instructions.
