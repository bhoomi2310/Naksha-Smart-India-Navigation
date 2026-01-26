# Complete Setup Guide for Naksha

This guide will help you set up and run the entire Naksha application with frontend and backend.

## Prerequisites

- Node.js (v18 or higher)
- npm (comes with Node.js)
- A code editor (VS Code recommended)

## Step 1: Install Frontend Dependencies

Open a terminal in the **root directory** of the project and run:

```bash
npm install
```

## Step 2: Install Backend Dependencies

Open a **new terminal** and navigate to the `server` folder:

```bash
cd server
npm install
```

## Step 3: Set Up Environment Variables

### Backend Environment Variables

1. Navigate to the `server` folder
2. Copy the example environment file:
   ```bash
   copy .env.example .env
   ```
   (On Mac/Linux: `cp .env.example .env`)

3. Open the `.env` file and configure it:

```env
# Server Configuration
PORT=3001

# JWT Secret (change this to a random string in production)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production

# OpenRouteService API Key (Optional - for real routing)
# Get your free API key at: https://openrouteservice.org/dev/#/signup
OPENROUTESERVICE_API_KEY=your-api-key-here
```

### Frontend Environment Variables

1. In the **root directory**, create a `.env` file:
   ```bash
   copy .env.example .env
   ```

2. Open the `.env` file and set:

```env
# Backend API URL
VITE_API_URL=http://localhost:3001/api
```

## Step 4: Get Free API Keys (Optional but Recommended)

### OpenRouteService API Key (for Real Routing)

1. Visit: https://openrouteservice.org/dev/#/signup
2. Sign up for a free account
3. Go to your dashboard
4. Copy your API key
5. Paste it in `server/.env` as `OPENROUTESERVICE_API_KEY=your-key-here`

**Note:** The app works without this key (uses mock data), but real routing requires it.

## Step 5: Start the Backend Server

1. Open a terminal in the `server` folder
2. Run:
   ```bash
   npm run dev
   ```

You should see:
```
🚀 Naksha Backend running on http://localhost:3001
🔑 Demo Credentials:
   Email: demo@naksha.app
   Password: demo123
```

**Keep this terminal open!**

## Step 6: Start the Frontend Development Server

1. Open a **new terminal** in the **root directory**
2. Run:
   ```bash
   npm run dev
   ```

You should see:
```
  VITE v7.x.x  ready in xxx ms

  ➜  Local:   http://localhost:8081/
  ➜  Network: use --host to expose
```

## Step 7: Access the Application

1. Open your browser
2. Navigate to: `http://localhost:8081`
3. You should see the landing page!

## Testing the Application

### Demo Account Login

1. Click "Sign In with Demo" on the landing page, OR
2. Click "Sign In" → Click "Use Demo Account" button
3. You should be automatically logged in and redirected to the dashboard

**Demo Credentials:**
- Email: `demo@naksha.app`
- Password: `demo123`

### Create a New Account

1. Click "Get Started Free" or "Sign Up"
2. Fill in your details
3. Accept terms and conditions
4. Click "Create Account"
5. You'll be automatically logged in

## Troubleshooting

### Backend won't start

**Error: "Port 3001 already in use"**
- Another process is using port 3001
- Solution: Change `PORT=3002` in `server/.env` and update `VITE_API_URL` in root `.env` to match

**Error: "Cannot find module"**
- Run `npm install` in the `server` folder again

### Frontend won't start

**Error: "Port 8081 already in use"**
- Change the port in `vite.config.ts` or kill the process using port 8081

**Error: "Failed to resolve import"**
- Make sure all dependencies are installed: `npm install`
- Check that image files exist in `src/assets/`

### Can't login / Authentication errors

1. Make sure the backend server is running on port 3001
2. Check that `VITE_API_URL` in root `.env` matches your backend URL
3. Check browser console for errors (F12)
4. Verify the backend terminal shows the server is running

### API Key Issues

- The app works without OpenRouteService API key (uses mock routing data)
- For real routing, get a free key from https://openrouteservice.org/dev/#/signup
- Add it to `server/.env` as `OPENROUTESERVICE_API_KEY=your-key`

## Project Structure

```
Naksha-Smart-India-Navigation/
├── src/                    # Frontend React code
│   ├── pages/             # Page components
│   ├── components/        # Reusable components
│   ├── lib/              # API and utilities
│   └── assets/           # Images and static files
├── server/               # Backend Express server
│   ├── server.js        # Main server file
│   ├── data/            # JSON data storage (auto-created)
│   └── .env            # Backend environment variables
├── .env                 # Frontend environment variables
└── package.json         # Frontend dependencies
```

## Production Deployment

For production:

1. **Change JWT_SECRET** to a strong random string
2. **Use a real database** instead of JSON files
3. **Set up proper CORS** for your domain
4. **Use environment variables** for all sensitive data
5. **Build the frontend**: `npm run build`
6. **Deploy backend** to a service like Railway, Render, or Heroku
7. **Deploy frontend** to Vercel, Netlify, or similar

## Support

If you encounter issues:
1. Check both terminal windows for error messages
2. Check browser console (F12) for frontend errors
3. Verify all environment variables are set correctly
4. Make sure both servers are running

---

**Happy Navigating! 🗺️**
