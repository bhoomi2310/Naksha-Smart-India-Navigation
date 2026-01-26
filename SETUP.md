# Naksha Setup Guide

## 🚀 Quick Start

### Frontend Setup

1. **Install dependencies:**
```bash
npm install
```

2. **Create `.env` file** (optional - defaults to `http://localhost:3001/api`):
```bash
cp .env.example .env
```

3. **Start development server:**
```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port Vite assigns)

### Backend Setup

1. **Navigate to server directory:**
```bash
cd server
```

2. **Install dependencies:**
```bash
npm install
```

3. **Create `.env` file:**
```bash
cp .env.example .env
```

4. **Get your free API keys** (see below)

5. **Start the backend server:**
```bash
npm run dev
```

The backend will run on `http://localhost:3001`

## 🔑 Free API Keys Required

### 1. OpenRouteService API Key (Recommended)

**What it's for:** Route calculation between two points

**How to get it:**
1. Visit https://openrouteservice.org/dev/#/signup
2. Sign up for a free account
3. Go to your dashboard
4. Copy your API key
5. Add it to `server/.env`:
   ```
   OPENROUTESERVICE_API_KEY=your_key_here
   ```

**Free Tier Limits:**
- 2,000 requests per day
- Perfect for development and small projects

**Note:** If you don't set this API key, the app will use mock route data (still functional for testing).

### 2. Nominatim (OpenStreetMap) - No API Key Needed! ✅

**What it's for:** Converting addresses to coordinates (geocoding)

**Setup:** Nothing needed! This service is completely free and doesn't require an API key.

**Rate Limits:** 
- Be respectful: 1 request per second
- For production, consider using a paid geocoding service

## 📁 Project Structure

```
Naksha-Smart-India-Navigation/
├── src/                    # Frontend React app
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── lib/               # Utilities (API client)
│   └── ...
├── server/                # Backend Express.js server
│   ├── server.js          # Main server file
│   ├── data/              # JSON file storage (auto-created)
│   └── ...
└── ...
```

## 🎨 Design Changes

The frontend has been redesigned with:
- **Orange-yellow color scheme** (saffron inspired)
- **Cleaner, more modern UI**
- **Removed repetitive information**
- **Simplified components**

## 🔧 Features

### Authentication
- User registration and login
- JWT token-based authentication
- User profiles

### Navigation
- Address geocoding (address → coordinates)
- Route calculation between two points
- Multiple route types (fastest, safest, eco-friendly, etc.)
- ML model predictions for road conditions

## 🗄️ Data Storage

Currently uses JSON files for user data (stored in `server/data/users.json`). 

**For production:** Replace with a proper database:
- PostgreSQL
- MongoDB
- MySQL
- etc.

## 🚨 Important Notes

1. **JWT Secret:** Change the `JWT_SECRET` in `server/.env` for production!

2. **CORS:** The backend allows all origins in development. Restrict this in production.

3. **Rate Limits:** Be mindful of API rate limits, especially for Nominatim.

4. **Security:** 
   - Never commit `.env` files
   - Use strong JWT secrets in production
   - Implement proper password validation
   - Add rate limiting for production

## 🐛 Troubleshooting

### Backend won't start
- Check if port 3001 is available
- Ensure all dependencies are installed (`npm install` in server folder)
- Check `.env` file exists

### Frontend can't connect to backend
- Ensure backend is running on port 3001
- Check `VITE_API_URL` in frontend `.env` matches backend URL
- Check CORS settings in backend

### API errors
- Verify OpenRouteService API key is correct
- Check API rate limits haven't been exceeded
- Check network connectivity

## 📝 Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001/api
```

### Backend (server/.env)
```
PORT=3001
JWT_SECRET=your-super-secret-jwt-key
OPENROUTESERVICE_API_KEY=your_openrouteservice_key
```

## 🎯 Next Steps

1. Get your OpenRouteService API key
2. Start both frontend and backend
3. Test registration and login
4. Try searching for routes
5. Customize the ML model predictions endpoint with your actual model

## 📚 API Documentation

See `server/README.md` for detailed API endpoint documentation.
