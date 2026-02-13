# API Call Debugging Guide

**Vite proxy**: Restart `npm run dev` after changing `vite.config.ts` (proxy config is not hot-reloaded).

## Root Cause Checklist

| # | Check | How to Verify |
|---|-------|---------------|
| 1 | Backend running on port 5000 | `curl http://localhost:5000/` |
| 2 | Backend status endpoint works | `curl http://localhost:5000/api/status` |
| 3 | Backend specs endpoint works | `curl "http://localhost:5000/api/specs?limit=5"` |
| 4 | CORS allows frontend origin | Check browser Network tab → Request/Response headers |
| 5 | Frontend baseURL matches backend | api.js uses `http://localhost:5000/api` |
| 6 | Database/Prisma connected | Backend console shows no Prisma errors; `/api/status` returns 200 |
| 7 | No browser extension blocking | Test in Incognito or disable ad-blockers |
| 8 | Firewall/antivirus | Temporarily disable to rule out blocking localhost |

---

## Exact Debugging Steps

### Step 1: Verify backend is running
```bash
cd backend
npm run dev
```
Expected: `Server running on port 5000`

### Step 2: Test endpoints in terminal (no browser)
```bash
# Root health
curl http://localhost:5000/

# Status (what frontend calls)
curl http://localhost:5000/api/status

# Specs (what frontend calls)
curl "http://localhost:5000/api/specs?limit=5"
```

- If these fail → backend or routing issue.
- If these succeed → likely CORS or frontend config.

### Step 3: Check browser DevTools
1. Open DevTools → Network tab
2. Visit History or Status page
3. Find the failed request (`status` or `specs`)
4. Inspect:
   - **Status code**: 0 = network/CORS; 404 = wrong path; 500 = server error
   - **Headers**: `Access-Control-Allow-Origin` present?
   - **Console**: Any CORS or blocked-request errors?

### Step 4: Inspect actual error in console
Add temporary logging in browser console:
```javascript
// In DevTools console while on History/Status page
fetch('http://localhost:5000/api/status')
  .then(r => r.json())
  .then(console.log)
  .catch(e => console.error('Error:', e));
```

---

## Common Vite + Backend Issues

| Issue | Symptom | Fix |
|-------|---------|-----|
| **Backend not running** | Status 0, "Failed to load" | Start backend: `cd backend && npm run dev` |
| **Wrong port** | Connection refused | Ensure backend on 5000; frontend baseURL `http://localhost:5000/api` |
| **CORS** | CORS error in console, status 0 | Backend must have `app.use(cors())` before routes |
| **Path mismatch** | 404 on API call | Frontend: `/status` + baseURL `/api` = `.../api/status` ✓ |
| **Mixed content** | Blocked if frontend is HTTPS | Use same scheme (both http in dev) |
| **Prisma/DB error** | 500 on /specs | Check DATABASE_URL in .env; run `npx prisma generate` |
| **Proxy not used** | CORS works but you prefer same-origin | Add Vite proxy (see below) |

---

## Code Fixes

### Fix 1: Add Vite proxy (avoids CORS in dev)

In `vite.config.ts`:
```ts
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
});
```

Then in `api.js`, use relative URL:
```js
baseURL: "/api",  // proxied to http://localhost:5000/api
```

### Fix 2: Surface real error in frontend (temporary debug)

In History.jsx and Status.jsx, change `.catch()` to log the error:
```js
.catch((err) => {
  console.error('API error:', err?.response?.status, err?.message);
  setError("Failed to load specs");
});
```

### Fix 3: Ensure backend CORS and route order

In server.js, CORS must be before any routes. Current order is correct. If using credentials or custom headers, you may need:
```js
app.use(cors({ origin: true, credentials: true }));
```

---

## Quick Verification Commands

```bash
# From project root
cd backend && npm run dev   # Terminal 1
cd .. && npm run dev        # Terminal 2 (frontend)

# In new terminal
curl http://localhost:5000/api/status
curl "http://localhost:5000/api/specs?limit=5"
```

If both curls return JSON, the backend is fine. The issue is then CORS or frontend baseURL.
