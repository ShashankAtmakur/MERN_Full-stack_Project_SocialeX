# SocialeX Deployment Checklist

Use this checklist to ensure a successful deployment to Render.

## Pre-Deployment Checklist

### 1. Code Preparation
- [x] All code changes committed and pushed to GitHub
- [x] Environment variables configured (see .env.example files)
- [x] Build tested locally
- [x] No security vulnerabilities (CodeQL verified)

### 2. External Services Setup

#### MongoDB Atlas
- [ ] Create free MongoDB Atlas account at https://www.mongodb.com/cloud/atlas
- [ ] Create a new cluster (M0 free tier)
- [ ] Create database user with password
- [ ] Get connection string: `mongodb+srv://username:password@cluster.mongodb.net/socialeX`
- [ ] Add IP whitelist: `0.0.0.0/0` (allow from anywhere)
- [ ] Save connection string securely

#### Firebase (Already Configured)
- [ ] Verify Firebase project exists
- [ ] Verify storage rules allow uploads
- [ ] Storage credentials in `client/src/firebase.js`

### 3. Render Account
- [ ] Create Render account at https://render.com
- [ ] Connect GitHub account to Render
- [ ] Verify repository access

## Deployment Process

### Option A: Blueprint Deployment (Recommended)

#### Step 1: Deploy with Blueprint
- [ ] Go to Render Dashboard
- [ ] Click "New" → "Blueprint"
- [ ] Select your repository: `MERN_Full-stack_Project_SocialeX`
- [ ] Render detects `render.yaml`
- [ ] Review services to be created:
  - [ ] `socialex-api` (Backend Web Service)
  - [ ] `socialex-client` (Frontend Static Site)

#### Step 2: Configure Backend Environment Variables
- [ ] Add `MONGO_URL`: Your MongoDB connection string
- [ ] Leave `CLIENT_URL` empty for now
- [ ] `PORT` and `NODE_ENV` are pre-configured

#### Step 3: Configure Frontend Environment Variables
- [ ] Leave `REACT_APP_API_URL` empty for now

#### Step 4: Deploy
- [ ] Click "Apply"
- [ ] Wait for initial deployment (5-10 minutes)
- [ ] Both services should show "Live" status

#### Step 5: Update Cross-Service URLs
- [ ] Copy Backend URL (e.g., `https://socialex-api.onrender.com`)
- [ ] Copy Frontend URL (e.g., `https://socialex-client.onrender.com`)
- [ ] Update Backend environment:
  - [ ] Set `CLIENT_URL` to frontend URL
  - [ ] Save (triggers redeploy)
- [ ] Update Frontend environment:
  - [ ] Set `REACT_APP_API_URL` to backend URL
  - [ ] Save (triggers redeploy)
- [ ] Wait for redeployment (2-5 minutes)

### Option B: Manual Deployment

See DEPLOYMENT.md for detailed manual deployment steps.

## Post-Deployment Verification

### 1. Backend Health Check
- [ ] Visit backend URL: `https://your-backend.onrender.com`
- [ ] Should see API responding (not 404)
- [ ] Check Render logs for any errors

### 2. Frontend Verification
- [ ] Visit frontend URL: `https://your-frontend.onrender.com`
- [ ] Page loads without errors
- [ ] Check browser console (F12) for errors

### 3. Functionality Tests
- [ ] Register a new user account
- [ ] Login with the created account
- [ ] Create a post with image
- [ ] View posts feed
- [ ] Test profile page
- [ ] Test chat functionality
- [ ] Test logout

### 4. Database Verification
- [ ] Go to MongoDB Atlas dashboard
- [ ] Check `socialeX` database
- [ ] Verify collections created:
  - [ ] Users
  - [ ] Posts
  - [ ] Stories (if created)

## Troubleshooting

### Common Issues

#### Issue: "Error in db connection"
- [ ] Verify `MONGO_URL` is correct
- [ ] Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- [ ] Verify database user has correct permissions
- [ ] Check Render service logs for detailed error

#### Issue: CORS errors in browser console
- [ ] Verify `CLIENT_URL` in backend matches frontend URL exactly
- [ ] No trailing slashes in URLs
- [ ] Both services redeployed after URL updates

#### Issue: "Failed to fetch" or API errors
- [ ] Verify `REACT_APP_API_URL` in frontend is correct
- [ ] Frontend was redeployed after updating environment variable
- [ ] Backend is actually running (check Render dashboard)

#### Issue: Blank page on frontend
- [ ] Check browser console for errors
- [ ] Verify build completed successfully in Render logs
- [ ] Check if `REACT_APP_API_URL` is set

#### Issue: Services keep restarting
- [ ] Check Render service logs for crash details
- [ ] Verify all required environment variables are set
- [ ] Check MongoDB connection is valid

#### Issue: Slow initial response (30+ seconds)
- [ ] Normal for free tier - services spin down after 15 minutes
- [ ] First request wakes up the service
- [ ] Subsequent requests will be fast
- [ ] Upgrade to paid plan for always-on service

## Performance Notes

### Free Tier Limitations
- Services spin down after 15 minutes of inactivity
- 750 hours/month per service
- Limited bandwidth
- Shared resources

### Recommendations
- [ ] Monitor usage in Render dashboard
- [ ] Consider upgrading if traffic increases
- [ ] Enable auto-deploy for continuous deployment
- [ ] Set up custom domain (optional)

## Monitoring & Maintenance

### Regular Checks
- [ ] Monitor Render service logs weekly
- [ ] Check MongoDB Atlas metrics
- [ ] Review Firebase storage usage
- [ ] Test critical functionality monthly

### Update Process
- [ ] Make code changes locally
- [ ] Test locally
- [ ] Push to GitHub
- [ ] Render auto-deploys (if enabled)
- [ ] Verify deployment successful

## Security Checklist
- [x] All sensitive data in environment variables
- [x] No secrets in code repository
- [x] CORS properly configured
- [x] Helmet.js security headers enabled
- [x] JWT authentication for API
- [x] HTTPS enabled (Render default)
- [ ] Regular dependency updates
- [ ] Monitor for security advisories

## Support Resources

- **Render Documentation**: https://render.com/docs
- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com/
- **Firebase Docs**: https://firebase.google.com/docs
- **Project Documentation**:
  - RENDER_QUICKSTART.md - Quick start guide
  - DEPLOYMENT.md - Detailed deployment guide
  - ARCHITECTURE.md - System architecture
- **GitHub Issues**: Report problems in repository issues

## Success Criteria

Your deployment is successful when:
- [x] Both services show "Live" in Render dashboard
- [x] Frontend loads without errors
- [x] User can register and login
- [x] Posts can be created and viewed
- [x] Chat functionality works
- [x] No errors in browser console
- [x] No errors in Render service logs
- [x] Database connections are stable

## Next Steps After Deployment

1. [ ] Share application URL with users
2. [ ] Set up custom domain (optional)
3. [ ] Enable auto-deploy from GitHub
4. [ ] Set up monitoring and alerts
5. [ ] Plan for scaling if needed
6. [ ] Regular maintenance and updates

---

**Deployment Date**: _______________
**Backend URL**: _______________
**Frontend URL**: _______________
**MongoDB Cluster**: _______________

**Notes**:
