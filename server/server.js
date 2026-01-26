import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';
const OPENROUTESERVICE_API_KEY = process.env.OPENROUTESERVICE_API_KEY || '';

// Middleware
app.use(cors());
app.use(express.json());

// Data storage (using JSON files - replace with database in production)
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');

// Ensure data directory exists
fs.mkdir(DATA_DIR, { recursive: true }).catch(console.error);

// Helper functions
async function readUsers() {
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(data);
    // Ensure demo user exists
    const demoExists = users.find(u => u.email === 'demo@naksha.app');
    if (!demoExists) {
      const demoUser = {
        id: 'demo-user-001',
        email: 'demo@naksha.app',
        password: await bcrypt.hash('demo123', 10),
        fullName: 'Demo User',
        createdAt: new Date().toISOString()
      };
      users.push(demoUser);
      await writeUsers(users);
      console.log('✅ Demo user created/updated');
      return users;
    }
    return users;
  } catch (error) {
    // Initialize with demo user if file doesn't exist
    console.log('📝 Creating initial users file with demo user...');
    const demoUser = {
      id: 'demo-user-001',
      email: 'demo@naksha.app',
      password: await bcrypt.hash('demo123', 10),
      fullName: 'Demo User',
      createdAt: new Date().toISOString()
    };
    await writeUsers([demoUser]);
    console.log('✅ Demo user initialized');
    return [demoUser];
  }
}

// Ensure demo user exists on startup
async function ensureDemoUser() {
  try {
    await readUsers();
  } catch (error) {
    console.error('❌ Error ensuring demo user:', error);
  }
}

async function writeUsers(users) {
  await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
}

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

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Naksha API is running' });
});

// User Registration
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'Email, password, and full name are required' });
    }

    const users = await readUsers();
    
    if (users.find(u => u.email === email)) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = {
      id: Date.now().toString(),
      email,
      password: hashedPassword,
      fullName,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    await writeUsers(users);

    const token = jwt.sign({ id: newUser.id, email: newUser.email }, JWT_SECRET, { expiresIn: '7d' });

    res.status(201).json({
      token,
      user: {
        id: newUser.id,
        email: newUser.email,
        fullName: newUser.fullName
      }
    });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// User Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const users = await readUsers();
    const user = users.find(u => u.email === email);

    if (!user) {
      console.log(`❌ Login attempt: User not found - ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      console.log(`❌ Login attempt: Invalid password for ${email}`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    console.log(`✅ Login successful: ${email}`);

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile
app.get('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const users = await readUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Return full profile with all data
    res.json({
      id: user.id,
      email: user.email,
      fullName: user.fullName || user.name || 'User',
      phone: user.phone || '',
      createdAt: user.createdAt,
      onboardingCompleted: user.onboardingCompleted || false,
      // Stats
      stats: user.stats || {
        routesTaken: 0,
        timeSaved: 0, // in minutes
        distanceTraveled: 0, // in km
        ecoScore: 0 // percentage
      },
      // Recent trips
      recentTrips: user.recentTrips || [],
      // Achievements
      achievements: user.achievements || []
    });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile (for onboarding and profile edits)
app.put('/api/user/profile', authenticateToken, async (req, res) => {
  try {
    const { phone, fullName, onboardingCompleted } = req.body;
    const users = await readUsers();
    const userIndex = users.findIndex(u => u.id === req.user.id);

    if (userIndex === -1) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Update user data
    if (phone !== undefined) users[userIndex].phone = phone;
    if (fullName !== undefined) users[userIndex].fullName = fullName;
    if (onboardingCompleted !== undefined) users[userIndex].onboardingCompleted = onboardingCompleted;

    // Initialize stats if not present
    if (!users[userIndex].stats) {
      users[userIndex].stats = {
        routesTaken: 0,
        timeSaved: 0,
        distanceTraveled: 0,
        ecoScore: 0
      };
    }

    // Initialize arrays if not present
    if (!users[userIndex].recentTrips) {
      users[userIndex].recentTrips = [];
    }
    if (!users[userIndex].achievements) {
      users[userIndex].achievements = [];
    }

    await writeUsers(users);

    res.json({
      id: users[userIndex].id,
      email: users[userIndex].email,
      fullName: users[userIndex].fullName,
      phone: users[userIndex].phone,
      onboardingCompleted: users[userIndex].onboardingCompleted,
      stats: users[userIndex].stats,
      recentTrips: users[userIndex].recentTrips,
      achievements: users[userIndex].achievements
    });
  } catch (error) {
    console.error('Profile update error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Geocoding - Convert address to coordinates
app.post('/api/geocode', async (req, res) => {
  try {
    const { address } = req.body;

    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    // Using Nominatim (OpenStreetMap) - free, no API key needed
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: address,
        format: 'json',
        limit: 1,
        countrycodes: 'in' // Limit to India
      },
      headers: {
        'User-Agent': 'Naksha Navigation App'
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
      res.status(404).json({ error: 'Location not found' });
    }
  } catch (error) {
    console.error('Geocoding error:', error);
    res.status(500).json({ error: 'Geocoding service error' });
  }
});

// Get routes between two points
app.post('/api/routes', async (req, res) => {
  try {
    const { from, to, routeType = 'fastest' } = req.body;

    if (!from || !to) {
      return res.status(400).json({ error: 'From and to locations are required' });
    }

    // First, geocode both addresses
    const [fromGeo, toGeo] = await Promise.all([
      axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: from, format: 'json', limit: 1, countrycodes: 'in' },
        headers: { 'User-Agent': 'Naksha Navigation App' }
      }),
      axios.get('https://nominatim.openstreetmap.org/search', {
        params: { q: to, format: 'json', limit: 1, countrycodes: 'in' },
        headers: { 'User-Agent': 'Naksha Navigation App' }
      })
    ]);

    if (!fromGeo.data?.[0] || !toGeo.data?.[0]) {
      return res.status(404).json({ error: 'Could not find one or both locations' });
    }

    const start = [parseFloat(fromGeo.data[0].lon), parseFloat(fromGeo.data[0].lat)];
    const end = [parseFloat(toGeo.data[0].lon), parseFloat(toGeo.data[0].lat)];

    // Require OpenRouteService API key for real routing
    if (!OPENROUTESERVICE_API_KEY || OPENROUTESERVICE_API_KEY.trim() === '') {
      return res.status(400).json({ 
        error: 'OpenRouteService API key is required for real routing data. Please add OPENROUTESERVICE_API_KEY to your .env file. Get a free key at: https://openrouteservice.org/dev/#/signup' 
      });
    }

    try {
      // Map route types to OpenRouteService profile types
      const profileMap = {
        'fastest': 'driving-car',
        'safest': 'driving-car', // Use driving-car, we'll filter by road conditions
        'eco': 'driving-car', // Use driving-car, we'll optimize for fuel
        'scenic': 'driving-car', // Use driving-car, we'll prefer scenic routes
        'cheapest': 'driving-car', // Use driving-car for now
        'popular': 'driving-car'
      };

      const profile = profileMap[routeType] || 'driving-car';

      // Call OpenRouteService API for real routing data
      const routeResponse = await axios.get(
        `https://api.openrouteservice.org/v2/directions/${profile}`,
        {
          params: {
            api_key: OPENROUTESERVICE_API_KEY,
            start: `${start[0]},${start[1]}`,
            end: `${end[0]},${end[1]}`
          },
          headers: {
            'Accept': 'application/json'
          }
        }
      );

      if (!routeResponse.data || !routeResponse.data.features || routeResponse.data.features.length === 0) {
        throw new Error('No route found');
      }

      const route = routeResponse.data.features[0];
      const properties = route.properties;
      const segments = properties.segments || [];
      
      // Calculate total distance and duration
      const totalDistance = (properties.summary?.distance || segments.reduce((sum, seg) => sum + (seg.distance || 0), 0)) / 1000; // km
      const totalDuration = (properties.summary?.duration || segments.reduce((sum, seg) => sum + (seg.duration || 0), 0)) / 60; // minutes

      const routeData = {
        type: routeType,
        distance: `${totalDistance.toFixed(1)} km`,
        duration: `${Math.round(totalDuration)} mins`,
        geometry: route.geometry,
        summary: {
          distance: totalDistance,
          duration: totalDuration
        },
        waypoints: route.properties.way_points || [],
        bbox: route.bbox,
        from: from,
        to: to,
        timestamp: new Date().toISOString()
      };

      // Save trip to user's history if authenticated
      const authHeader = req.headers['authorization'];
      const token = authHeader && authHeader.split(' ')[1];
      if (token) {
        try {
          jwt.verify(token, JWT_SECRET, async (err, user) => {
            if (!err && user) {
              const users = await readUsers();
              const userIndex = users.findIndex(u => u.id === user.id);
              if (userIndex !== -1) {
                // Add trip to recent trips (keep last 10)
                if (!users[userIndex].recentTrips) {
                  users[userIndex].recentTrips = [];
                }
                users[userIndex].recentTrips.unshift({
                  from: from,
                  to: to,
                  date: new Date().toISOString().split('T')[0],
                  duration: `${Math.round(totalDuration)} mins`,
                  distance: `${totalDistance.toFixed(1)} km`,
                  type: routeType.charAt(0).toUpperCase() + routeType.slice(1) + ' Route',
                  saved: '0 mins' // Could calculate based on comparison
                });
                users[userIndex].recentTrips = users[userIndex].recentTrips.slice(0, 10);

                // Update stats
                if (!users[userIndex].stats) {
                  users[userIndex].stats = {
                    routesTaken: 0,
                    timeSaved: 0,
                    distanceTraveled: 0,
                    ecoScore: 0
                  };
                }
                users[userIndex].stats.routesTaken += 1;
                users[userIndex].stats.distanceTraveled += totalDistance;
                users[userIndex].stats.timeSaved += Math.max(0, Math.round(totalDuration * 0.1)); // Assume 10% time saved
                users[userIndex].stats.ecoScore = Math.min(100, Math.round(
                  (users[userIndex].stats.ecoScore * (users[userIndex].stats.routesTaken - 1) + 
                   (routeType === 'eco' ? 90 : routeType === 'fastest' ? 70 : 80)) / 
                  users[userIndex].stats.routesTaken
                ));

                await writeUsers(users);
              }
            }
          });
        } catch (tokenError) {
          // Ignore token errors, just don't save trip
        }
      }

      res.json({
        routes: [routeData]
      });
    } catch (orsError) {
      console.error('OpenRouteService API error:', orsError.response?.data || orsError.message);
      
      // Provide helpful error messages
      if (orsError.response?.status === 401 || orsError.response?.status === 403) {
        return res.status(401).json({ 
          error: 'Invalid OpenRouteService API key. Please check your API key in the .env file.' 
        });
      }
      
      if (orsError.response?.status === 429) {
        return res.status(429).json({ 
          error: 'OpenRouteService rate limit exceeded. Free tier allows 2,000 requests/day. Please try again later.' 
        });
      }

      if (orsError.response?.status === 400) {
        return res.status(400).json({ 
          error: 'Invalid route request. Please check your start and end locations.' 
        });
      }

      return res.status(500).json({ 
        error: `Route calculation failed: ${orsError.response?.data?.error?.message || orsError.message}. Please check your API key and try again.` 
      });
    }
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ error: 'Route calculation error' });
  }
});

// Generate mock routes for different route types
function generateMockRoutes(start, end, routeType) {
  const baseDistance = 7.5;
  const baseDuration = 20;
  
  const routeTypes = {
    fastest: { distance: baseDistance, duration: baseDuration, multiplier: 0.9 },
    safest: { distance: baseDistance * 1.1, duration: baseDuration * 1.2, multiplier: 1.0 },
    eco: { distance: baseDistance * 1.05, duration: baseDuration * 1.25, multiplier: 0.95 },
    scenic: { distance: baseDistance * 1.3, duration: baseDuration * 1.4, multiplier: 1.1 },
    cheapest: { distance: baseDistance * 1.6, duration: baseDuration * 1.75, multiplier: 1.2 },
    popular: { distance: baseDistance, duration: baseDuration * 1.05, multiplier: 1.0 }
  };

  const config = routeTypes[routeType] || routeTypes.fastest;
  
  return {
    routes: [{
      type: routeType,
      distance: `${config.distance.toFixed(1)} km`,
      duration: `${Math.round(config.duration)} mins`,
      summary: {
        distance: config.distance,
        duration: config.duration
      },
      geometry: {
        type: 'LineString',
        coordinates: [start, end]
      }
    }]
  };
}

// ML Model prediction endpoint (mock for now)
app.post('/api/ml/predict', async (req, res) => {
  try {
    const { coordinates } = req.body;

    // Mock ML predictions
    // In production, this would call your actual ML model
    const prediction = {
      potholes_per_km: (Math.random() * 3 + 1).toFixed(1),
      travel_time_per_km: Math.round(Math.random() * 50 + 120),
      road_condition_score: (Math.random() * 3 + 6).toFixed(1),
      safety_rating: (Math.random() * 2 + 7).toFixed(1),
      traffic_density: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)],
      surface_type: 'asphalt',
      lighting_quality: ['poor', 'fair', 'good'][Math.floor(Math.random() * 3)],
      drainage_issue: Math.random() > 0.7,
      model_confidence: (Math.random() * 0.2 + 0.8).toFixed(2)
    };

    res.json(prediction);
  } catch (error) {
    console.error('ML prediction error:', error);
    res.status(500).json({ error: 'ML prediction error' });
  }
});


// Initialize demo user on startup
ensureDemoUser().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Naksha Backend running on http://localhost:${PORT}`);
    
    // Check API key status
    if (!OPENROUTESERVICE_API_KEY || OPENROUTESERVICE_API_KEY.trim() === '') {
      console.log(`\n⚠️  WARNING: OpenRouteService API Key is NOT set!`);
      console.log(`   Real routing data requires an API key.`);
      console.log(`   Route requests will fail without it.`);
      console.log(`\n📝 To get a FREE API key (2,000 requests/day):`);
      console.log(`   1. Visit: https://openrouteservice.org/dev/#/signup`);
      console.log(`   2. Sign up for a free account`);
      console.log(`   3. Get your API key from the dashboard`);
      console.log(`   4. Add to server/.env: OPENROUTESERVICE_API_KEY=your_key_here`);
      console.log(`   5. Restart this server`);
    } else {
      console.log(`✅ OpenRouteService API Key: Configured`);
      console.log(`   Using REAL routing data from OpenRouteService`);
    }
    
    console.log(`\n🔑 Demo Credentials:`);
    console.log(`   Email: demo@naksha.app`);
    console.log(`   Password: demo123`);
    console.log(`\n📍 Geocoding: Using Nominatim (OpenStreetMap) - No API key needed`);
  });
});
