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

## Contributing
Small project — open a PR for fixes. Keep it simple: run both client and server locally and include reproduction steps in the PR.