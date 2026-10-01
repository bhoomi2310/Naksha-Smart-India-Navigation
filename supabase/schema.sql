-- =========================================================
-- Naksha (Smart India Navigation) - Supabase PostgreSQL Schema
-- =========================================================

-- Enable PostGIS extension for spatial queries
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis";

-- 1. USERS TABLE
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL,
    phone TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. USER COMMUTE STATS TABLE
CREATE TABLE IF NOT EXISTS user_stats (
    user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    routes_taken INTEGER DEFAULT 0,
    time_saved_minutes INTEGER DEFAULT 0,
    distance_traveled_km NUMERIC(10, 2) DEFAULT 0,
    eco_score INTEGER DEFAULT 80,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SAVED TRIPS & TELEMETRY LOG
CREATE TABLE IF NOT EXISTS trips (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    origin_name TEXT NOT NULL,
    destination_name TEXT NOT NULL,
    origin_lat NUMERIC(9, 6) NOT NULL,
    origin_lng NUMERIC(9, 6) NOT NULL,
    dest_lat NUMERIC(9, 6) NOT NULL,
    dest_lng NUMERIC(9, 6) NOT NULL,
    route_type TEXT NOT NULL, -- fastest, safest, eco, scenic, cheapest, popular
    distance_km NUMERIC(6, 2) NOT NULL,
    duration_mins INTEGER NOT NULL,
    saved_mins INTEGER DEFAULT 0,
    road_quality_index INTEGER DEFAULT 85,
    auto_fare_inr NUMERIC(6, 2),
    transit_fare_inr NUMERIC(6, 2),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CROWDSOURCED ROAD HAZARDS TABLE
CREATE TABLE IF NOT EXISTS road_hazards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reported_by UUID REFERENCES users(id) ON DELETE SET NULL,
    hazard_type TEXT NOT NULL, -- pothole, waterlogging, dark_stretch, construction, police_check
    title TEXT NOT NULL,
    description TEXT,
    severity TEXT NOT NULL DEFAULT 'medium', -- low, medium, high, critical
    latitude NUMERIC(9, 6) NOT NULL,
    longitude NUMERIC(9, 6) NOT NULL,
    location_text TEXT,
    verification_count INTEGER DEFAULT 1,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. INITIAL DEMO USER SEED
INSERT INTO users (id, email, password_hash, full_name, phone)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'demo@naksha.app',
    '$2a$10$7qN2hH4fH4mZ1iK2l8n.O.WfN5X4Y1q7Y8r0s3u2v1w0x9y8z7a6b', -- 'demo123'
    'Demo User',
    '+91 98765 43210'
) ON CONFLICT (email) DO NOTHING;

INSERT INTO user_stats (user_id, routes_taken, time_saved_minutes, distance_traveled_km, eco_score)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    28,
    380,
    342.5,
    92
) ON CONFLICT (user_id) DO NOTHING;
