# Spring Boot + Angular Application

A full-stack application with Spring Boot REST API backend and Angular frontend.

## Project Structure

```
.
├── backend/          # Spring Boot backend application
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/backend/
│   │   │   │   ├── BackendApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   └── controller/
│   │   │   │       └── TestController.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   │   └── pom.xml
│   └── pom.xml
└── frontend/         # Angular frontend application
    ├── src/
    │   ├── app/
    │   │   ├── app.component.*
    │   │   └── services/
    │   │       └── api.service.ts
    │   ├── index.html
    │   ├── main.ts
    │   └── styles.css
    ├── angular.json
    ├── package.json
    └── proxy.conf.json
```

## Prerequisites

- **Java 17+** (for Spring Boot)
- **Maven 3.6+** (for building Spring Boot)
- **Node.js 18+** and **npm** (for Angular)
- **Angular CLI 17+** (`npm install -g @angular/cli`)

## Setup Instructions

### Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Build the project (Maven will download dependencies):
   ```bash
   mvn clean install
   ```

3. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```
   
   Or if you have an IDE like IntelliJ IDEA or Eclipse, you can run the `BackendApplication` class directly.

4. The backend will start on **http://localhost:8080**

5. Test the API endpoints directly:
   - GET http://localhost:8080/api/test
   - GET http://localhost:8080/api/hello/John
   - POST http://localhost:8080/api/data (with JSON body)

### Frontend Setup (Angular)

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Angular development server:
   ```bash
   ng serve
   ```
   
   Or if Angular CLI is not installed globally:
   ```bash
   npx ng serve
   ```

4. The frontend will start on **http://localhost:4200**

5. Open your browser and navigate to **http://localhost:4200**

## Testing APIs with Angular

### Method 1: Using Proxy (Recommended for Development)

The Angular app is configured with a proxy (`proxy.conf.json`) that automatically forwards `/api/*` requests to `http://localhost:8080/api/*`.

**How it works:**
- Angular makes requests to `/api/test`
- The proxy intercepts and forwards to `http://localhost:8080/api/test`
- This avoids CORS issues during development

**To use:**
1. Make sure both backend (port 8080) and frontend (port 4200) are running
2. The proxy is already configured in `angular.json`
3. Use relative URLs in your Angular services: `/api/test` instead of `http://localhost:8080/api/test`

### Method 2: Using CORS (Already Configured)

The Spring Boot backend is configured with CORS to allow requests from `http://localhost:4200`.

**Current configuration:**
- CORS is enabled in `CorsConfig.java`
- Allows all methods (GET, POST, PUT, DELETE, etc.)
- Allows all headers
- Allows credentials

**If you want to use full URLs instead of proxy:**
Update `frontend/src/app/services/api.service.ts`:
```typescript
private apiUrl = 'http://localhost:8080/api'; // Full URL
```

### Available API Endpoints

1. **GET /api/test**
   - Simple test endpoint
   - Returns: `{"message": "API is working!", "status": "success"}`

2. **GET /api/hello/{name}**
   - Personalized greeting
   - Example: `/api/hello/John`
   - Returns: `{"message": "Hello, John!", "status": "success"}`

3. **POST /api/data**
   - Receives JSON data
   - Body example: `{"name": "Test User", "message": "Hello"}`
   - Returns: `{"message": "Data received successfully", "receivedData": {...}, "status": "success"}`

### Testing in Angular UI

The Angular application includes a testing interface with three buttons:
1. **Test GET /api/test** - Tests the basic connection
2. **Test GET /api/hello/John** - Tests parameterized endpoint
3. **Test POST /api/data** - Tests POST request with JSON body

Results are displayed in the UI showing:
- Success responses with JSON data
- Error messages if connection fails
- Loading states during requests

## Troubleshooting

### Backend Issues

**Port 8080 already in use:**
- Change port in `backend/src/main/resources/application.properties`:
  ```
  server.port=8081
  ```
- Update proxy in `frontend/proxy.conf.json` and CORS config accordingly

**Maven build fails:**
- Check Java version: `java -version` (should be 17+)
- Try: `mvn clean install -U` (force update dependencies)

### Frontend Issues

**Angular CLI not found:**
- Install globally: `npm install -g @angular/cli`
- Or use npx: `npx ng serve`

**Proxy not working:**
- Make sure `proxy.conf.json` exists in the frontend root
- Verify `angular.json` has `proxyConfig: "proxy.conf.json"` in serve options
- Restart the Angular dev server after changes

**CORS errors:**
- Make sure backend is running
- Check `CorsConfig.java` allows `http://localhost:4200`
- For production, update CORS origins appropriately

**npm install fails:**
- Try: `npm cache clean --force`
- Delete `node_modules` and `package-lock.json`, then run `npm install` again

### Connection Issues

**"Failed to connect to API" error:**
1. Verify backend is running on port 8080
2. Test backend directly: `curl http://localhost:8080/api/test`
3. Check browser console for specific errors
4. Verify proxy configuration is correct

**Network errors:**
- Check firewall settings
- Ensure both services are on the same machine
- Verify no antivirus is blocking connections

## Development Workflow

1. **Start Backend First:**
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Start Frontend (in a new terminal):**
   ```bash
   cd frontend
   ng serve
   ```

3. **Make Changes:**
   - Backend changes require restart
   - Frontend changes hot-reload automatically

4. **Test:**
   - Use the Angular UI buttons to test endpoints
   - Check browser console (F12) for errors
   - Check backend console for request logs

## Production Deployment

### Building for Production

**Backend:**
```bash
cd backend
mvn clean package
java -jar target/backend-1.0.0.jar
```

**Frontend:**
```bash
cd frontend
ng build --configuration production
```
Output will be in `frontend/dist/angular-frontend/`

### Important Notes for Production

1. **CORS Configuration:** Update `CorsConfig.java` with production frontend URL
2. **API URL:** Update `api.service.ts` with production backend URL
3. **Environment Variables:** Use Angular environments for different configs
4. **Security:** Enable proper authentication and HTTPS in production

## Git Setup

Add these to `.gitignore` in root:

```
# Backend
backend/target/
backend/.idea/
backend/*.iml

# Frontend
frontend/node_modules/
frontend/dist/
frontend/.angular/

# IDE
.idea/
.vscode/
*.iml
```

## Additional Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [Angular Documentation](https://angular.io/docs)
- [Angular HTTP Client](https://angular.io/guide/http)
- [Spring Boot CORS](https://spring.io/guides/gs/rest-service-cors/)

## Support

If you encounter issues:
1. Check both backend and frontend console logs
2. Verify all prerequisites are installed correctly
3. Ensure ports 8080 and 4200 are available
4. Review the troubleshooting section above
