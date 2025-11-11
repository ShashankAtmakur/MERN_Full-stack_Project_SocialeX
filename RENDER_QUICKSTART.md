# Quick Start: Deploy to Render

This is a quick reference for deploying SocialeX to Render. For detailed instructions, see [DEPLOYMENT.md](./DEPLOYMENT.md).

## Prerequisites
- GitHub repository with this code
- Render account (free at https://render.com)
- MongoDB Atlas account (free at https://www.mongodb.com/cloud/atlas)

## Quick Steps

### 1. Set Up MongoDB
1. Create a free cluster at MongoDB Atlas
2. Get your connection string: `mongodb+srv://user:password@cluster.mongodb.net/socialeX`

### 2. Deploy to Render
1. Go to https://dashboard.render.com/
2. Click "New" → "Blueprint"
3. Connect your GitHub repository
4. Render will detect the `render.yaml` file

### 3. Configure Environment Variables

**Backend (socialex-api):**
```
MONGO_URL=mongodb+srv://user:password@cluster.mongodb.net/socialeX
CLIENT_URL=https://your-frontend-url.onrender.com
```

**Frontend (socialex-client):**
```
REACT_APP_API_URL=https://your-backend-url.onrender.com
```

### 4. Update URLs After First Deploy
1. Get backend URL from socialex-api service
2. Get frontend URL from socialex-client service
3. Update `CLIENT_URL` in backend with frontend URL
4. Update `REACT_APP_API_URL` in frontend with backend URL
5. Both services will automatically redeploy

### 5. Done!
Visit your frontend URL and test the application.

## Important Notes
- Free tier services spin down after 15 minutes of inactivity
- First request after idle time will be slow (~30 seconds)
- MongoDB Atlas: Add `0.0.0.0/0` to IP whitelist for Render access

## Need Help?
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed troubleshooting and instructions.
