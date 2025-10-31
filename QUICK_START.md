# Quick Start Guide

## Fast Setup (3 Steps)

### 1. Start Backend
```bash
cd backend
mvn spring-boot:run
```
Wait for: "Started BackendApplication" message

### 2. Start Frontend (New Terminal)
```bash
cd frontend
npm install
ng serve
```
Wait for: "Application bundle generation complete" message

### 3. Test
Open browser: **http://localhost:4200**
- Click "Test GET /api/test" button
- You should see a JSON response with `"message": "API is working!"`

## How API Testing Works

### Option 1: Proxy (Recommended - Already Configured)
- Angular requests go to `/api/*`
- Proxy forwards to `http://localhost:8080/api/*`
- No CORS issues ✅

### Option 2: Direct URL (CORS Enabled)
- Update `frontend/src/app/services/api.service.ts`:
  ```typescript
  private apiUrl = 'http://localhost:8080/api';
  ```
- CORS is already configured on backend ✅

## Troubleshooting

**"Failed to connect" error?**
1. Check backend is running: `curl http://localhost:8080/api/test`
2. Check frontend console (F12) for errors
3. Verify both services are running

**Port conflicts?**
- Backend: Change `server.port=8080` in `backend/src/main/resources/application.properties`
- Frontend: `ng serve --port 4201`

## Next Steps

See `README.md` for detailed documentation.

