# SocialeX Deployment Guide for Render

This guide provides step-by-step instructions for deploying the SocialeX MERN application on Render.

## Prerequisites

- GitHub account with your SocialeX repository
- Render account (free tier available at https://render.com)
- MongoDB Atlas account (free tier available) OR use Render's managed database

## Architecture Overview

The deployment consists of three main components:
1. **Backend API** (Node.js/Express) - Web Service
2. **Frontend Client** (React) - Static Site
3. **Database** (MongoDB) - MongoDB Atlas or Render PostgreSQL

## Deployment Steps

### Step 1: Prepare MongoDB Database

#### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" on your cluster
4. Choose "Connect your application"
5. Copy the connection string (should look like: `mongodb+srv://username:password@cluster.mongodb.net/socialeX`)
6. Replace `<password>` with your database user password
7. Save this connection string - you'll need it for the backend configuration

#### Option B: Use Render's Database

1. In Render Dashboard, create a new PostgreSQL database
2. Note: You'll need to modify the application to use PostgreSQL instead of MongoDB

### Step 2: Deploy Using Render Blueprint

1. **Push your code to GitHub** (if not already done)

2. **Go to Render Dashboard**
   - Navigate to https://dashboard.render.com/

3. **Create a New Blueprint**
   - Click "New +" button
   - Select "Blueprint"
   - Connect your GitHub account if not already connected
   - Select your SocialeX repository

4. **Render will detect the `render.yaml` file**
   - Review the services that will be created:
     - `socialex-api` (Backend)
     - `socialex-client` (Frontend)

5. **Configure Environment Variables**
   
   Before clicking "Apply", you need to set up environment variables:

   **For socialex-api (Backend):**
   - `MONGO_URL`: Paste your MongoDB connection string from Step 1
   - `CLIENT_URL`: Leave empty for now (will update after deployment)
   - `PORT`: 10000 (pre-configured)
   - `NODE_ENV`: production (pre-configured)

   **For socialex-client (Frontend):**
   - `REACT_APP_API_URL`: Leave empty for now (will update after deployment)

6. **Apply the Blueprint**
   - Click "Apply" to start the deployment
   - Render will create both services and start deploying them

### Step 3: Update Cross-Service URLs

After the initial deployment completes:

1. **Get the Backend URL**
   - Go to your `socialex-api` service
   - Copy the service URL (e.g., `https://socialex-api.onrender.com`)

2. **Get the Frontend URL**
   - Go to your `socialex-client` service
   - Copy the service URL (e.g., `https://socialex-client.onrender.com`)

3. **Update Backend Environment Variables**
   - Go to `socialex-api` service → Environment
   - Update `CLIENT_URL` with your frontend URL
   - Save changes (this will trigger a redeploy)

4. **Update Frontend Environment Variables**
   - Go to `socialex-client` service → Environment
   - Update `REACT_APP_API_URL` with your backend URL
   - Save changes (this will trigger a redeploy)

### Step 4: Verify Deployment

1. **Wait for both services to finish redeploying** (usually 2-5 minutes)

2. **Test the Backend**
   - Visit: `https://your-backend-url.onrender.com`
   - You should see the API responding

3. **Test the Frontend**
   - Visit: `https://your-frontend-url.onrender.com`
   - The application should load
   - Try registering a new user and logging in

### Step 5: Configure Firebase (If Used)

If your application uses Firebase for file storage:

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create/select your project
3. Get your Firebase configuration
4. Add Firebase config to your client environment variables if needed

## Troubleshooting

### Backend Issues

**Problem**: "Error in db connection"
- **Solution**: Check that `MONGO_URL` is correctly set and your MongoDB Atlas cluster allows connections from anywhere (0.0.0.0/0)

**Problem**: CORS errors
- **Solution**: Ensure `CLIENT_URL` in backend matches your frontend URL exactly

### Frontend Issues

**Problem**: "Failed to fetch" or API errors
- **Solution**: Verify `REACT_APP_API_URL` is correctly set to your backend URL

**Problem**: Blank page
- **Solution**: Check the browser console for errors. Ensure the build completed successfully.

### General Issues

**Problem**: Services keep restarting
- **Solution**: Check the service logs in Render dashboard for error messages

**Problem**: Slow response times (free tier)
- **Solution**: Render's free tier spins down after 15 minutes of inactivity. First request after idle time will be slow.

## Manual Deployment (Alternative)

If you prefer to deploy services individually without the blueprint:

### Deploy Backend Manually

1. Render Dashboard → New + → Web Service
2. Connect repository
3. Configure:
   - **Name**: socialex-api
   - **Environment**: Node
   - **Build Command**: `cd server && npm install`
   - **Start Command**: `cd server && npm start`
   - **Environment Variables**: (as described above)

### Deploy Frontend Manually

1. Render Dashboard → New + → Static Site
2. Connect repository
3. Configure:
   - **Name**: socialex-client
   - **Build Command**: `cd client && npm install && npm run build`
   - **Publish Directory**: `client/build`
   - **Environment Variables**: (as described above)

## Monitoring and Maintenance

- **View Logs**: Click on any service → Logs tab
- **Check Metrics**: Monitor service health and performance in the Metrics tab
- **Auto-Deploy**: Enable auto-deploy to automatically deploy when you push to your GitHub branch
- **Custom Domains**: You can add custom domains in the Settings tab of each service

## Cost Considerations

- **Free Tier Limits**:
  - 750 hours/month for web services
  - Services spin down after 15 minutes of inactivity
  - Limited bandwidth

- **Upgrade Options**:
  - Paid plans start at $7/month per service
  - Keep services running 24/7
  - More resources and bandwidth

## Support

- [Render Documentation](https://render.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [SocialeX GitHub Issues](https://github.com/ShashankAtmakur/MERN_Full-stack_Project_SocialeX/issues)

## Quick Reference: Environment Variables

### Backend (.env)
```bash
PORT=10000
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/socialeX
CLIENT_URL=https://your-frontend.onrender.com
NODE_ENV=production
```

### Frontend (.env)
```bash
REACT_APP_API_URL=https://your-backend.onrender.com
```
