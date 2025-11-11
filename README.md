# SocialeX

SocialeX is a simple social-media style application with a React frontend (client/) and an Express + MongoDB backend (server/). This repository contains both the client and server code so you can run and develop them locally.

--

## Quick overview
- Root: orchestration notes and high-level information.
- `client/`: React app created with Create React App.
- `server/`: Node/Express API with MongoDB (Mongoose).

## Prerequisites
- Node.js (>= 18 recommended)
- npm (or yarn)
- MongoDB running locally (default connection uses `mongodb://localhost:27017/socialeX`)

## Quick start (development)
1. Start MongoDB (e.g., via `mongod` or your OS service).
2. Start the server:

```powershell
cd server
npm install
npm run start
```

3. Start the client in a separate terminal:

```powershell
cd client
npm install
npm start
```

4. Open the app at http://localhost:3000 (CRA default). The API listens on port 6001 by default.

## Structure
- `client/` — React application (see `client/README.md` for more).
- `server/` — Express API and Mongoose models (see `server/README.md`).

## Notes about authentication & recent fixes
If you experienced a 400 response when logging in (example log: `POST /login HTTP/1.1" 400`), the most common causes are:

- Email casing/leading-trailing spaces mismatch between stored record and login input. This project now normalizes emails on both register and login (trim + lowercase) to avoid the issue.
- Missing request body or wrong `Content-Type` header. Both client and server expect JSON.

If you still see a 400 on login, open the browser DevTools Network tab and inspect the POST `/login` request payload and response body — the server returns a helpful message (`User does not exist` or `Invalid credentials`) that explains why it failed.

## Troubleshooting
- Ensure MongoDB is running and the connection string in `server/index.js` matches your environment.
- If ports conflict, update the server port in `server/index.js` (default `6001`) and the client calls (in `client/src/context/*`).

## Deployment on Render

This project is configured for easy deployment on Render using the included `render.yaml` blueprint file.

### Option 1: Deploy with Render Blueprint (Recommended)

1. Push your code to a GitHub repository
2. Go to [Render Dashboard](https://dashboard.render.com/)
3. Click "New" → "Blueprint"
4. Connect your GitHub repository
5. Render will automatically detect the `render.yaml` file
6. Configure the following environment variables:
   
   **For the API service (socialex-api):**
   - `MONGO_URL`: Your MongoDB connection string (use Render's MongoDB or external service like MongoDB Atlas)
   - `CLIENT_URL`: Your frontend URL (will be provided after client deployment, e.g., `https://socialex-client.onrender.com`)
   
   **For the client service (socialex-client):**
   - `REACT_APP_API_URL`: Your backend API URL (will be provided after API deployment, e.g., `https://socialex-api.onrender.com`)

7. Click "Apply" to deploy both services

### Option 2: Deploy Services Individually

#### Backend (API) Deployment:
1. Create a new Web Service on Render
2. Connect your repository
3. Configure:
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment Variables**:
     - `PORT`: 10000 (Render default)
     - `MONGO_URL`: Your MongoDB connection string
     - `CLIENT_URL`: Your frontend URL
     - `NODE_ENV`: production

#### Frontend (Client) Deployment:
1. Create a new Static Site on Render
2. Connect your repository
3. Configure:
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`
   - **Environment Variables**:
     - `REACT_APP_API_URL`: Your backend API URL

### Setting Up MongoDB

You can use either:
- **Render's PostgreSQL** (if you want to migrate to PostgreSQL)
- **MongoDB Atlas** (recommended for MongoDB):
  1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
  2. Get your connection string
  3. Add it to your Render service as `MONGO_URL`

### Environment Variables Reference

Create `.env` files based on the `.env.example` files provided:

**Server (.env)**:
```bash
PORT=6001
MONGO_URL=mongodb://localhost:27017/socialeX
CLIENT_URL=http://localhost:3000
```

**Client (.env)**:
```bash
REACT_APP_API_URL=http://localhost:6001
```

### Post-Deployment Steps

1. After both services are deployed, update the environment variables with the correct URLs
2. Restart both services for the changes to take effect
3. Test the deployment by accessing your frontend URL

## Contributing
Small project — open a PR for fixes. Keep it simple: run both client and server locally and include reproduction steps in the PR.