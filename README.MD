# Naksha - Smart India Navigation

A modern navigation app designed specifically for Indian roads, featuring intelligent routing based on real road conditions.

## ✨ Features

- 🗺️ **Smart Route Planning** - Multiple route types (fastest, safest, eco-friendly, scenic, cheapest, popular)
- 🧠 **ML-Powered Predictions** - Road condition analysis using machine learning
- 📍 **Indian Context** - Built with understanding of Indian road conditions
- 🎨 **Modern UI** - Clean, orange-yellow color scheme inspired by Indian saffron
- 🔐 **User Authentication** - Secure registration and login
- 🚀 **Fast & Responsive** - Built with React and Express.js

## 🔑 Demo Credentials

Try the app instantly with demo credentials:

**Email:** `demo@naksha.app`  
**Password:** `demo123`

Click "Use Demo Account" button on the login page to auto-fill credentials.

## 🚀 Quick Start

**For fastest setup, see [QUICK_START.md](./QUICK_START.md)**

**For detailed instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)**

**For API keys setup, see [API_KEYS_GUIDE.md](./API_KEYS_GUIDE.md)**

### Quick Setup (5 minutes)

1. **Install Frontend Dependencies:**
```bash
npm install
```

2. **Install Backend Dependencies:**
```bash
cd server
npm install
```

3. **Set Up Environment Files:**
   - Backend: `server/.env` (copy from `server/.env.example`)
   - Frontend: `.env` (copy from `.env.example`)

4. **Start Backend (Terminal 1):**
```bash
cd server
npm run dev
```

5. **Start Frontend (Terminal 2):**
```bash
npm run dev
```

6. **Open Browser:** http://localhost:8081

## 🔑 Required API Keys (All Free!)

### 1. OpenRouteService (Recommended)
- **Purpose:** Route calculation
- **Get it:** https://openrouteservice.org/dev/#/signup
- **Free tier:** 2,000 requests/day
- **Add to:** `server/.env` as `OPENROUTESERVICE_API_KEY`

### 2. Nominatim (No API Key Needed!)
- **Purpose:** Address geocoding
- **Setup:** None required - completely free
- **Note:** Be respectful with rate limits (1 req/sec)

## 📁 Project Structure

- `src/` - React frontend
- `server/` - Express.js backend
- See [SETUP.md](./SETUP.md) for details

## 🎨 Design

- Modern, clean interface
- Orange-yellow color scheme
- Responsive design
- Optimized for Indian road navigation

## 🛠️ Tech Stack

**Frontend:**
- React + TypeScript
- Tailwind CSS
- shadcn/ui components

**Backend:**
- Node.js + Express
- JWT authentication
- OpenRouteService API
- Nominatim (OpenStreetMap)

## 📝 License

MIT

## 🤝 Contributing

Contributions welcome! Please read the setup guide first.
