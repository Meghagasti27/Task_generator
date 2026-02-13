# Backend route verification

## Step-by-step verification

### 1. Working directory
- Open a terminal and go to the **backend** folder:
  ```powershell
  cd d:\Task_generator\backend
  ```
- Confirm you are in the backend folder (you should see `package.json`, `src/`, `prisma/`).

### 2. Start the server
- Run:
  ```powershell
  npm run dev
  ```
  (This runs `node src/server.js` from `backend/`.)

### 3. Check debug output
- In the terminal you should see something like:
  ```
  [DEBUG] Routes directory: d:\Task_generator\backend\src\routes
  [DEBUG] specs route module loaded, type: function
  [DEBUG] status route module loaded
  [DEBUG] Mounted /api -> specs and /api -> status
  Server running on port 5000
  http://localhost:5000
  [DEBUG] GET http://localhost:5000/api/specs should be available
  ```
- If you see an error instead (e.g. "Cannot find module"), the path to a route file is wrong or the file is missing.

### 4. Test the root URL
- In a browser or with curl:
  ```powershell
  curl http://localhost:5000/
  ```
- Expected: `{"message":"Server is running"}`.

### 5. Test GET /api/specs
- In a browser open: **http://localhost:5000/api/specs**
- Or in PowerShell:
  ```powershell
  curl http://localhost:5000/api/specs
  ```
- Expected: `{"message":"Specs route OK","count":0,"specs":[]}`.

### 6. If it still fails
- Ensure no other process is using port 5000 (e.g. another Node server).
- Confirm only one `server.js` exists: `backend\src\server.js`.
- Remove any `server.js` in `backend/` root (there should be none).
- Restart the server after any code change.

### 7. Restore full specs (optional)
- The current `specs.js` is minimal (no Prisma). To restore the full version with DB and other routes:
  ```powershell
  git checkout backend/src/routes/specs.js
  ```
- Then ensure Prisma is generated and `.env` is set:
  ```powershell
  npx prisma generate
  ```
