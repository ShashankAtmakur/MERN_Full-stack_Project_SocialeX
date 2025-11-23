# SocialeX Deployment Architecture

## Overview

SocialeX is deployed as a modern MERN stack application on Render with the following architecture:

```
┌─────────────────────────────────────────────────────────────┐
│                         User's Browser                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Render Static Site (Frontend)                   │
│  ┌────────────────────────────────────────────────────┐     │
│  │  React Application (Create React App)              │     │
│  │  - Authentication UI                               │     │
│  │  - Social Feed                                     │     │
│  │  - Chat Interface                                  │     │
│  │  - Profile Management                              │     │
│  └────────────────────────────────────────────────────┘     │
│             Built with: npm run build                        │
│             Served from: ./client/build                      │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ REST API + WebSocket
                         │ (REACT_APP_API_URL)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Render Web Service (Backend)                    │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Express.js Server                                 │     │
│  │  - REST API Endpoints                              │     │
│  │  - Socket.io for Real-time Chat                    │     │
│  │  - Authentication (JWT)                            │     │
│  │  - File Upload Handler                             │     │
│  └────────────────────────────────────────────────────┘     │
│             Port: 10000 (Render default)                     │
│             Node.js with ES Modules                          │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ MongoDB Connection
                         │ (MONGO_URL)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    MongoDB Atlas                             │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Database: socialeX                                │     │
│  │  - Users Collection                                │     │
│  │  - Posts Collection                                │     │
│  │  - Stories Collection                              │     │
│  │  - Chat Messages                                   │     │
│  └────────────────────────────────────────────────────┘     │
│             Free Tier M0 Cluster                             │
└─────────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Firebase Storage                          │
│  ┌────────────────────────────────────────────────────┐     │
│  │  Media Storage                                     │     │
│  │  - User Profile Pictures                           │     │
│  │  - Post Images/Videos                              │     │
│  │  - Story Media Files                               │     │
│  └────────────────────────────────────────────────────┘     │
└─────────────────────────────────────────────────────────────┘
```

## Components

### Frontend (Static Site)
- **Technology**: React with Create React App
- **Deployment**: Render Static Site
- **Build Command**: `cd client && npm install && CI=false npm run build`
- **Publish Directory**: `./client/build`
- **Environment Variables**:
  - `REACT_APP_API_URL`: Backend API endpoint

### Backend (Web Service)
- **Technology**: Node.js with Express.js
- **Deployment**: Render Web Service
- **Build Command**: `cd server && npm install`
- **Start Command**: `cd server && npm start`
- **Environment Variables**:
  - `PORT`: Server port (default: 10000)
  - `MONGO_URL`: MongoDB connection string
  - `CLIENT_URL`: Frontend URL for CORS
  - `NODE_ENV`: Environment mode (production)

### Database
- **Technology**: MongoDB
- **Hosting**: MongoDB Atlas (or Render PostgreSQL if migrated)
- **Database Name**: socialeX
- **Collections**: Users, Posts, Stories, Messages

### File Storage
- **Technology**: Firebase Storage
- **Purpose**: Media file storage (images, videos)
- **Configuration**: Defined in `client/src/firebase.js`

## Data Flow

### User Registration/Login
```
Browser → Frontend → Backend API (/register or /login)
                  ↓
            MongoDB Atlas (User Authentication)
                  ↓
            JWT Token Generated
                  ↓
            Frontend (Store in localStorage)
```

### Creating a Post
```
Browser → Frontend → Firebase Storage (Upload Media)
                  ↓
            Get Download URL
                  ↓
            Backend API (/createPost)
                  ↓
            MongoDB Atlas (Save Post)
                  ↓
            Socket.io Broadcast
                  ↓
            All Connected Clients Updated
```

### Real-time Chat
```
Browser → Frontend → Socket.io Connection
                  ↓
            Backend WebSocket Handler
                  ↓
            MongoDB Atlas (Store Message)
                  ↓
            Broadcast to Recipient
                  ↓
            Frontend Updates Chat UI
```

## Environment Configuration

### Local Development
```bash
# Server
PORT=6001
MONGO_URL=mongodb://localhost:27017/socialeX
CLIENT_URL=http://localhost:3000

# Client
REACT_APP_API_URL=http://localhost:6001
```

### Production (Render)
```bash
# Server
PORT=10000
MONGO_URL=mongodb+srv://user:pass@cluster.mongodb.net/socialeX
CLIENT_URL=https://socialex-client.onrender.com

# Client
REACT_APP_API_URL=https://socialex-api.onrender.com
```

## Security Considerations

1. **Environment Variables**: All sensitive configuration stored as environment variables
2. **CORS**: Configured to only allow requests from the frontend URL
3. **Helmet.js**: Security headers enabled on the backend
4. **MongoDB Atlas**: IP whitelist configured for access control
5. **JWT Authentication**: Token-based authentication for API endpoints
6. **HTTPS**: All Render services use HTTPS by default

## Scaling Considerations

### Current Setup (Free Tier)
- Backend: Single instance, spins down after 15 minutes
- Frontend: Global CDN, always available
- Database: MongoDB Atlas M0 (512 MB storage)

### Upgrade Path
1. **Backend**: Upgrade to paid plan ($7/month) for always-on service
2. **Database**: Upgrade MongoDB Atlas tier for more storage/connections
3. **CDN**: Enable custom domains and CDN for better performance
4. **Load Balancing**: Add multiple backend instances behind load balancer
5. **Caching**: Implement Redis for session management and caching

## Monitoring

- **Render Logs**: Real-time logs for both frontend and backend
- **Render Metrics**: CPU, memory, and bandwidth usage
- **MongoDB Atlas Metrics**: Database performance and connection monitoring
- **Error Tracking**: Console errors visible in browser DevTools and server logs

## Cost Breakdown (Free Tier)

- **Render Static Site**: Free (750 hours/month)
- **Render Web Service**: Free (750 hours/month)
- **MongoDB Atlas**: Free (M0 cluster, 512 MB)
- **Firebase Storage**: Free tier (5 GB storage, 1 GB/day downloads)

**Total Monthly Cost**: $0 (with limitations)

## Upgrade Recommendations

For production use with consistent traffic:
- Render Static Site: $0/month (always free)
- Render Web Service: $7/month (always-on)
- MongoDB Atlas: $0-9/month (M0-M2 cluster)
- Firebase Storage: Pay-as-you-go

**Estimated Monthly Cost for Small Production**: ~$7-16/month
