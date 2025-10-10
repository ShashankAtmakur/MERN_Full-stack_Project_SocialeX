# SocialeX — Server

This is the Express + MongoDB backend for SocialeX. The API provides endpoints for register, login, posts and stories. The server entry point is `index.js` and uses Mongoose to connect to a local MongoDB instance by default.

## Requirements
- Node.js
- npm
- MongoDB running locally (or a connection string provided via environment variables)

## Install & Run

```powershell
cd server
npm install
npm run start
```

By default the server listens on port `6001` and connects to `mongodb://localhost:27017/socialeX` (see `server/index.js`).

## Scripts
- `npm start` — start the server using node.

## Endpoints (high level)
- `POST /register` — register a new user (expects JSON {username, email, password, profilePic}).
- `POST /login` — login (expects JSON {email, password}).
- `POST /createPost` — create a new post.
- `GET /fetchAllPosts` — get all posts.
- `GET /fetchAllStories` — get all stories.

## Authentication notes and common login 400 issue
If you saw a log like: `POST /login HTTP/1.1" 400`, typical causes are:

- The request body is missing required fields (`email` or `password`). The login handler now returns 400 with `{msg: 'Email and password are required'}` in that case.
- Email case/whitespace mismatch: to avoid this, the server now normalizes incoming email values (trim + lowercase) for both register and login.

Debugging suggestions:
- Check server console for logged errors.
- Temporarily add `console.log('LOGIN BODY', req.body)` in `server/controllers/Auth.js` to see exactly what the server receives.
- Inspect the client's POST /login request in browser DevTools → Network to verify the request payload and headers.

## Environment & secrets
- This project currently stores the JWT secret inline in `server/controllers/Auth.js` for simplicity. For production or collaboration, move secrets to environment variables and load them with `dotenv`.

## Next improvements
- Add environment configuration (use `.env` with `dotenv`).
- Add tests for auth endpoints.
- Add a Postman collection or small test script for quickly reproducing registration/login flows.
