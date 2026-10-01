# 🚀 Naksha Backend & Database Hosting Guide

This guide details how to host the **Naksha Backend API** and connect a **PostgreSQL / Supabase Database** so your live Vercel web app (`https://naksha-smart-india-navigation.vercel.app`) communicates with a live cloud API.

---

## ⚡ Option 1: Deploy Backend on Render (100% Free - Recommended)

Render provides a free web service tier that hosts your Node.js/Express backend 24/7.

### Steps:
1. **Push your repository** to GitHub.
2. Sign in to **[Render.com](https://render.com/)** with your GitHub account.
3. Click **"New +" ➔ "Web Service"**.
4. Select your GitHub repository (`Naksha-Smart-India-Navigation`).
5. Configure the deployment settings:
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start` (or `node server.js`)
   - **Plan**: `Free`
6. Add Environment Variables in the Render dashboard:
   - `PORT`: `10000` (or leave default)
   - `JWT_SECRET`: `your_random_secure_jwt_secret_key`
   - `OPENROUTESERVICE_API_KEY`: *(Optional) Your ORS key if you have one*
7. Click **"Create Web Service"**.
8. Render will provide a live URL (e.g., `https://naksha-backend.onrender.com`).

---

## ⚡ Option 2: Deploy Backend on Railway.app

1. Go to **[Railway.app](https://railway.app/)**.
2. Click **"New Project" ➔ "Deploy from GitHub repo"**.
3. Select this repo and set Root Directory to `/server`.
4. Add environment variables and click **Deploy**.
5. Copy your generated public domain URL.

---

## 🔗 Connect Your Vercel Frontend to the Hosted Backend

Once your backend is deployed:

1. Open your project on **[Vercel Dashboard](https://vercel.com/dashboard)**.
2. Navigate to **Project Settings ➔ Environment Variables**.
3. Add a new variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend-app.onrender.com/api` (replace with your live backend URL)
4. Go to the **Deployments** tab on Vercel and click **"Redeploy"**.
5. Done! Your live Vercel site now communicates with your cloud backend end-to-end.

---

## 🗄️ Database Setup (Supabase PostgreSQL)

1. Create a free project at **[Supabase.com](https://supabase.com/)**.
2. Open the **SQL Editor** in Supabase.
3. Copy and paste the entire script from `supabase/schema.sql` and click **"Run"**.
4. This creates tables for users, saved commute telemetry, and crowdsourced road hazards.
