## MERN ThinkBoard — Local Development Guide

### Prerequisites
- **Node.js**: v18 or newer
- **npm**: comes with Node
- **MongoDB**: MongoDB Atlas connection string or local MongoDB instance

### Project structure
- `backend/`: Express + Mongoose API (serves frontend in production)
- `frontend/`: React + Vite UI

### 1) Configure environment variables
Create a `.env` file in `backend/` with your MongoDB connection string:

```
backend/.env
-----------------
MONGO_URI=<your-mongodb-connection-string>
```

You do NOT need to set `PORT`; the server defaults to 5000 and will use `process.env.PORT` in hosting environments.

### 2) Install dependencies
Run from the project root:

```bash
npm install --prefix backend
npm install --prefix frontend
```

### 3) Run in development (two terminals)
- Backend (Port 5000)
  - PowerShell:
    ```powershell
    cd backend
    $env:MONGO_URI="<your-mongodb-connection-string>"
    npm run dev
    ```
  - cmd:
    ```cmd
    cd backend
    set MONGO_URI=<your-mongodb-connection-string> && npm run dev
    ```

- Frontend (Port 5173, proxies API to 5000 via absolute URL in dev)
  ```bash
  cd frontend
  npm run dev
  ```

Open `http://localhost:5173` for the UI. API runs at `http://localhost:5000/api`.

### 4) Run production-like (single port)
This builds the frontend and serves it from the backend at the same origin.

```bash
# Build the frontend
cd frontend
npm run build
cd ..

# Start the backend in production mode
cd backend
# PowerShell
$env:NODE_ENV="production"; $env:MONGO_URI="<your-mongodb-connection-string>"; npm start
# cmd
set NODE_ENV=production && set MONGO_URI=<your-mongodb-connection-string> && npm start
```
Open `http://localhost:5000`. The UI and API share the same origin.

Alternatively, from the repository root you can use:
```bash
npm run build   # installs and builds frontend
npm run start   # starts backend (which serves the built frontend)
```
(Ensure `backend/.env` has `MONGO_URI`.)

### Windows shell differences
- PowerShell: `$env:VAR="value"; command`
- cmd: `set VAR=value && command`
- POSIX shells (Git Bash/WSL): `VAR=value command`

To avoid shell differences inside npm scripts, you can use `cross-env`.

### API endpoints
- `GET /api/notes` — list notes
- `GET /api/notes/:id` — get a note
- `POST /api/notes` — create a note `{ title, content }`
- `PUT /api/notes/:id` — update a note `{ title, content }`
- `DELETE /api/notes/:id` — delete a note

### Troubleshooting
- "Failed to create note" or 500s:
  - Check backend logs. Ensure `MONGO_URI` is set and valid.
  - Confirm the controller imports `Note` from `../models/note.js` and uses it consistently.
- CORS errors in development:
  - Backend enables CORS for `http://localhost:5173` in non-production.
  - Frontend dev calls `http://localhost:5000/api`.
- Blank page in production deep links:
  - Backend serves `frontend/dist/index.html` via a catch‑all route in production.

### Deploy (Render) — Single port
- Build command: `npm run build`
- Start command: `npm run start`
- Environment variables: set `MONGO_URI` (and optionally `NODE_ENV=production`)
- The backend serves `frontend/dist` and exposes the API at `/api`.