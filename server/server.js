import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { 
  initDatabase, 
  findUserByEmail, 
  findUserById, 
  createUser, 
  updateUserProfile, 
  saveTripLog, 
  saveRoadHazard,
  isDbPostgres 
} from './db.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'naksha-jwt-secret-key-prod-2026';
const OPENROUTESERVICE_API_KEY = process.env.OPENROUTESERVICE_API_KEY || '';

// Middleware
app.use(cors());
app.use(express.json());

// Authentication middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// ==========================================
// ROUTES
// ==========================================

// Root route
app.get('/', (req, res) => {
  res.json({
    name: 'Naksha Smart India Navigation API',
    tagline: 'Built for India',
    status: 'online',
    database: isDbPostgres() ? 'PostgreSQL' : 'Local Persistent Storage',
    frontendUrl: 'http://localhost:8080',
    endpoints: {
      health: '/api/health',
      auth: {
        login: 'POST /api/auth/login',
        register: 'POST /api/auth/register',
        profile: 'GET /api/user/profile'
      },
      hazards: {
        list: 'GET /api/hazards',
        report: 'POST /api/hazards/report'
      },
      trips: {
        save: 'POST /api/trips/save'
      }
    }
  });
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    service: 'Naksha Smart India Navigation API',
    database: isDbPostgres() ? 'PostgreSQL' : 'Local Persistent Storage',
    nodeVersion: process.version,
    timestamp: new Date().toISOString()
  });
});

// User Registration (PostgreSQL)
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Email, password, and full name are required' });
    }

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser({
      id: `usr-${Date.now()}`,
      email,
      password: hashedPassword,
      fullName,
      phone: phone || ''
    });

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '14d' });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName,
        phone: newUser.phone
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Login (PostgreSQL)
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '14d' });
    console.log(`✅ Login successful: ${email}`);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.full_name || user.fullName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get User Profile (PostgreSQL)
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const profile = await findUserById(req.user.id);
    if (!profile) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    res.json(profile);
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update User Profile (PostgreSQL)
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { fullName, phone } = req.body;
    const updated = await updateUserProfile(req.user.id, { fullName, phone });
    if (!updated) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(updated);
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Geocoding Endpoint
app.post('/api/geocode', async (req, res) => {
  try {
    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1,
        countrycodes: 'in'
      },
      headers: {
        'User-Agent': 'Naksha-Smart-India-Navigation/1.0'
      }
    });

    if (response.data && response.data.length > 0) {
      const result = response.data[0];
      res.json({
        lat: parseFloat(result.lat),
        lon: parseFloat(result.lon),
        display_name: result.display_name
      });
    } else {
      res.status(404).json({ error: 'Indian location not found' });
    }
  } catch (error) {
    console.error('Geocoding error:', error.message);
    res.status(500).json({ error: 'Geocoding service error' });
  }
});

// Route Calculation (Public OSRM & OpenRouteService)
app.post('/api/routes', async (req, res) => {
  try {
    const { from, to, routeType = 'fastest' } = req.body;

    if (!from || !to) {
      return res.status(400).json({ error: 'Origin and destination are required' });
    }

    // Geocode both locations
    const [fromGeo, toGeo] = await Promise.all([
      axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: from, format: 'json', limit: 1, countrycodes: 'in' },
        headers: { 'User-Agent': 'Naksha-Navigation/1.0' }
      }),
      axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: to, format: 'json', limit: 1, countrycodes: 'in' },
        headers: { 'User-Agent': 'Naksha-Navigation/1.0' }
      })
    ]);

    if (!fromGeo.data?.[0] || !toGeo.data?.[0]) {
      return res.status(404).json({ error: 'Could not resolve one or both locations in India' });
    }

    const startLng = parseFloat(fromGeo.data[0].lon);
    const startLat = parseFloat(fromGeo.data[0].lat);
    const endLng = parseFloat(toGeo.data[0].lon);
    const endLat = parseFloat(toGeo.data[0].lat);

    // Call Public OSRM routing engine
    const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${startLng},${startLat};${endLng},${endLat}?overview=full&geometries=geojson&steps=true`;
    const osrmRes = await axios.get(osrmUrl);

    if (!osrmRes.data?.routes?.[0]) {
      return res.status(404).json({ error: 'No route found between specified points' });
    }

    const route = osrmRes.data.routes[0];
    const totalDistance = (route.distance || 8000) / 1000;
    const totalDuration = (route.duration || 1200) / 60;

    const routeData = {
      type: routeType,
      distance: `${totalDistance.toFixed(1)} km`,
      duration: `${Math.round(totalDuration)} mins`,
      summary: {
        distance: totalDistance,
        duration: totalDuration
      },
      geometry: route.geometry,
      from,
      to,
      timestamp: new Date().toISOString()
    };

    // Log trip for authenticated user in PostgreSQL
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET);
        await saveTripLog(decoded.id, {
          from,
          to,
          duration: `${Math.round(totalDuration)} mins`,
          distance: `${totalDistance.toFixed(1)} km`,
          type: routeType
        });
      } catch (e) {
        // Token verify fail, ignore logging
      }
    }

    res.json({ routes: [routeData] });
  } catch (error) {
    console.error('Route calculation error:', error.message);
    res.status(500).json({ error: 'Route calculation failed' });
  }
});

// Report Road Hazard (PostgreSQL)
app.post('/api/hazards/report', async (req, res) => {
  try {
    const { type, title, description, severity, lat, lng, locationText } = req.body;
    await saveRoadHazard({
      id: `hz-${Date.now()}`,
      type,
      title,
      description,
      severity,
      lat: parseFloat(lat) || 28.6139,
      lng: parseFloat(lng) || 77.2090,
      locationText
    });
    res.status(201).json({ success: true, message: 'Hazard reported successfully to Naksha database' });
  } catch (error) {
    console.error('Hazard report error:', error);
    res.status(500).json({ error: 'Failed to record road hazard' });
  }
});

// Start Server & Initialize PostgreSQL
initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 Naksha Backend Server running on http://localhost:${PORT}`);
    console.log(`📦 Tech Stack: Node.js (Express) + PostgreSQL (pg) + React`);
    console.log(`🔑 Demo Account: demo@naksha.app / demo123`);
    console.log(`📍 Geocoding: OpenStreetMap Nominatim`);
    console.log(`🛣️ Routing: OpenStreetMap OSRM Public Engine\n`);
  });
});
