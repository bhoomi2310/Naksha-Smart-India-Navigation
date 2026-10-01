import pkg from 'pg';
const { Pool } = pkg;
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// PostgreSQL connection pool configuration
const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL || '';
let pool = null;
let isPostgresConnected = false;

if (connectionString) {
  try {
    pool = new Pool({
      connectionString,
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false }
    });
  } catch (err) {
    console.warn('⚠️ Could not initialize PostgreSQL pool:', err.message);
  }
} else if (process.env.PGHOST) {
  try {
    pool = new Pool({
      user: process.env.PGUSER,
      host: process.env.PGHOST,
      database: process.env.PGDATABASE,
      password: process.env.PGPASSWORD,
      port: parseInt(process.env.PGPORT || '5432'),
      ssl: { rejectUnauthorized: false }
    });
  } catch (err) {
    console.warn('⚠️ Could not initialize PostgreSQL pool from env vars:', err.message);
  }
}

// In-memory / JSON fallback directory
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const HAZARDS_FILE = path.join(DATA_DIR, 'hazards.json');
const TRIPS_FILE = path.join(DATA_DIR, 'trips.json');

// Initialize Database (PostgreSQL or local fallback)
export async function initDatabase() {
  await fs.mkdir(DATA_DIR, { recursive: true }).catch(() => {});

  if (pool) {
    try {
      const client = await pool.connect();
      console.log('🐘 Connected to PostgreSQL Database successfully!');
      isPostgresConnected = true;

      // Run Schema Migrations
      await client.query(`
        CREATE TABLE IF NOT EXISTS users (
          id VARCHAR(64) PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          full_name VARCHAR(255) NOT NULL,
          phone VARCHAR(32),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS user_stats (
          user_id VARCHAR(64) PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
          routes_taken INTEGER DEFAULT 0,
          time_saved INTEGER DEFAULT 0,
          distance_traveled NUMERIC(10, 2) DEFAULT 0,
          eco_score INTEGER DEFAULT 80
        );

        CREATE TABLE IF NOT EXISTS trips (
          id VARCHAR(64) PRIMARY KEY,
          user_id VARCHAR(64) REFERENCES users(id) ON DELETE CASCADE,
          origin_name TEXT NOT NULL,
          destination_name TEXT NOT NULL,
          duration VARCHAR(32) NOT NULL,
          distance VARCHAR(32) NOT NULL,
          route_type VARCHAR(64) NOT NULL,
          saved_time VARCHAR(32),
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );

        CREATE TABLE IF NOT EXISTS road_hazards (
          id VARCHAR(64) PRIMARY KEY,
          hazard_type VARCHAR(64) NOT NULL,
          title TEXT NOT NULL,
          description TEXT,
          severity VARCHAR(32) NOT NULL,
          latitude NUMERIC(10, 6) NOT NULL,
          longitude NUMERIC(10, 6) NOT NULL,
          location_text TEXT,
          verification_count INTEGER DEFAULT 1,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `);

      // Seed Demo User in PostgreSQL
      const demoCheck = await client.query('SELECT * FROM users WHERE email = $1', ['demo@naksha.app']);
      if (demoCheck.rows.length === 0) {
        const hashedPassword = await bcrypt.hash('demo123', 10);
        await client.query(
          'INSERT INTO users (id, email, password, full_name, phone) VALUES ($1, $2, $3, $4, $5)',
          ['demo-user-001', 'demo@naksha.app', hashedPassword, 'Demo User', '+91 98765 43210']
        );
        await client.query(
          'INSERT INTO user_stats (user_id, routes_taken, time_saved, distance_traveled, eco_score) VALUES ($1, $2, $3, $4, $5)',
          ['demo-user-001', 28, 380, 342.5, 92]
        );
        console.log('✅ Demo user seeded in PostgreSQL');
      }

      client.release();
      return true;
    } catch (err) {
      console.warn('⚠️ PostgreSQL initialization failed, switching to local store:', err.message);
      isPostgresConnected = false;
    }
  }

  console.log('📁 Using local persistent JSON data store');
  await ensureLocalDemoUser();
  return false;
}

// Ensure demo user in local file
async function ensureLocalDemoUser() {
  try {
    let users = [];
    try {
      const data = await fs.readFile(USERS_FILE, 'utf-8');
      users = JSON.parse(data);
    } catch {
      users = [];
    }

    if (!users.find(u => u.email === 'demo@naksha.app')) {
      users.push({
        id: 'demo-user-001',
        email: 'demo@naksha.app',
        password: await bcrypt.hash('demo123', 10),
        fullName: 'Demo User',
        phone: '+91 98765 43210',
        stats: { routesTaken: 28, timeSaved: 380, distanceTraveled: 342.5, ecoScore: 92 },
        recentTrips: [
          { from: 'Connaught Place, Delhi', to: 'Cyber City, Gurgaon', date: 'Today, 8:45 AM', duration: '38 mins', type: 'Fastest Route', saved: '14 mins' },
          { from: 'BKC, Mumbai', to: 'Marine Drive, Mumbai', date: 'Yesterday', duration: '26 mins', type: 'Safest Route', saved: '8 mins' }
        ],
        achievements: [
          { title: 'Desi Navigator', description: 'Explored over 20 unique Indian arterial routes', icon: '🧭' },
          { title: 'Monsoon Survivor', description: 'Avoided 5 flooded underpasses with live hazard alerts', icon: '🌊' }
        ],
        createdAt: new Date().toISOString()
      });
      await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
      console.log('✅ Demo user seeded in local storage');
    }
  } catch (e) {
    console.error('Error ensuring local demo user:', e);
  }
}

// Database query helpers
export async function findUserByEmail(email) {
  if (isPostgresConnected && pool) {
    const res = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return res.rows[0] || null;
  }

  // Local JSON fallback
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(data);
    return users.find(u => u.email === email) || null;
  } catch {
    return null;
  }
}

export async function findUserById(id) {
  if (isPostgresConnected && pool) {
    const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    if (userRes.rows.length === 0) return null;

    const user = userRes.rows[0];
    const statsRes = await pool.query('SELECT * FROM user_stats WHERE user_id = $1', [id]);
    const stats = statsRes.rows[0] || { routes_taken: 0, time_saved: 0, distance_traveled: 0, eco_score: 80 };

    const tripsRes = await pool.query('SELECT * FROM trips WHERE user_id = $1 ORDER BY created_at DESC LIMIT 10', [id]);

    return {
      id: user.id,
      email: user.email,
      fullName: user.full_name,
      phone: user.phone,
      createdAt: user.created_at,
      stats: {
        routesTaken: stats.routes_taken || 0,
        timeSaved: stats.time_saved || 0,
        distanceTraveled: parseFloat(stats.distance_traveled || 0),
        ecoScore: stats.eco_score || 80
      },
      recentTrips: tripsRes.rows.map(t => ({
        from: t.origin_name,
        to: t.destination_name,
        duration: t.duration,
        type: t.route_type,
        saved: t.saved_time,
        date: new Date(t.created_at).toLocaleDateString()
      })),
      achievements: [
        { title: 'Desi Navigator', description: 'Explored over 20 unique Indian arterial routes', icon: '🧭' },
        { title: 'Monsoon Survivor', description: 'Avoided 5 flooded underpasses with live hazard alerts', icon: '🌊' }
      ]
    };
  }

  // Local JSON fallback
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(data);
    return users.find(u => u.id === id) || null;
  } catch {
    return null;
  }
}

export async function createUser({ id, email, password, fullName, phone = '' }) {
  if (isPostgresConnected && pool) {
    await pool.query(
      'INSERT INTO users (id, email, password, full_name, phone) VALUES ($1, $2, $3, $4, $5)',
      [id, email, password, fullName, phone]
    );
    await pool.query(
      'INSERT INTO user_stats (user_id, routes_taken, time_saved, distance_traveled, eco_score) VALUES ($1, $2, $3, $4, $5)',
      [id, 0, 0, 0, 80]
    );
    return { id, email, fullName, phone };
  }

  // Local JSON fallback
  try {
    let users = [];
    try {
      const data = await fs.readFile(USERS_FILE, 'utf-8');
      users = JSON.parse(data);
    } catch {
      users = [];
    }

    const newUser = {
      id,
      email,
      password,
      fullName,
      phone,
      stats: { routesTaken: 0, timeSaved: 0, distanceTraveled: 0, ecoScore: 80 },
      recentTrips: [],
      achievements: [{ title: 'First Journey', description: 'Joined Naksha Smart India Navigation', icon: '🚀' }],
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
    return newUser;
  } catch (err) {
    throw err;
  }
}

export async function updateUserProfile(id, { fullName, phone }) {
  if (isPostgresConnected && pool) {
    await pool.query(
      'UPDATE users SET full_name = COALESCE($1, full_name), phone = COALESCE($2, phone) WHERE id = $3',
      [fullName, phone, id]
    );
    return findUserById(id);
  }

  // Local JSON fallback
  try {
    const data = await fs.readFile(USERS_FILE, 'utf-8');
    const users = JSON.parse(data);
    const userIndex = users.findIndex(u => u.id === id);
    if (userIndex !== -1) {
      if (fullName !== undefined) users[userIndex].fullName = fullName;
      if (phone !== undefined) users[userIndex].phone = phone;
      await fs.writeFile(USERS_FILE, JSON.stringify(users, null, 2));
      return users[userIndex];
    }
    return null;
  } catch {
    return null;
  }
}

export async function saveTripLog(userId, trip) {
  if (isPostgresConnected && pool && userId) {
    try {
      await pool.query(
        'INSERT INTO trips (id, user_id, origin_name, destination_name, duration, distance, route_type, saved_time) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)',
        [`trip-${Date.now()}`, userId, trip.from, trip.to, trip.duration, trip.distance, trip.type, trip.saved || '0 mins']
      );
      await pool.query(
        'UPDATE user_stats SET routes_taken = routes_taken + 1, distance_traveled = distance_traveled + $1 WHERE user_id = $2',
        [parseFloat(trip.distance) || 5.0, userId]
      );
    } catch (e) {
      console.warn('Error logging trip in PostgreSQL:', e.message);
    }
  }
}

export async function saveRoadHazard(hazard) {
  if (isPostgresConnected && pool) {
    try {
      await pool.query(
        'INSERT INTO road_hazards (id, hazard_type, title, description, severity, latitude, longitude, location_text, verification_count) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
        [
          hazard.id || `hz-${Date.now()}`,
          hazard.type,
          hazard.title,
          hazard.description || '',
          hazard.severity || 'medium',
          hazard.lat,
          hazard.lng,
          hazard.locationText || '',
          1
        ]
      );
      return true;
    } catch (e) {
      console.warn('Error saving hazard in PostgreSQL:', e.message);
    }
  }
  return true;
}

export function isDbPostgres() {
  return isPostgresConnected;
}
