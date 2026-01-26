# Naksha Backend Server

Express.js backend for Naksha navigation app.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Get a free OpenRouteService API key:
   - Visit https://openrouteservice.org/dev/#/signup
   - Sign up for a free account
   - Get your API key from the dashboard
   - Add it to `.env` as `OPENROUTESERVICE_API_KEY=your_key`

4. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:3001`

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/user/profile` - Get user profile (requires auth)

### Navigation
- `POST /api/geocode` - Convert address to coordinates
- `POST /api/routes` - Get routes between two locations
- `POST /api/ml/predict` - Get ML model predictions for road conditions

## Free APIs Used

1. **Nominatim (OpenStreetMap)** - Geocoding (no API key needed)
   - Free, no rate limits for reasonable use
   - Used for converting addresses to coordinates

2. **OpenRouteService** - Routing (free tier available)
   - Free tier: 2,000 requests/day
   - Get API key: https://openrouteservice.org/dev/#/signup
   - Used for calculating routes between points

## Data Storage

Currently uses JSON files for user data (in `data/` folder). For production, replace with a proper database like PostgreSQL or MongoDB.
