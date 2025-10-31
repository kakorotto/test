# Deployment Guide

## GitHub Pages Setup

### Before Pushing

1. **Update Base Href**: 
   - In `.github/workflows/deploy.yml`, line 35, update `/test/` with your repository name
   - For repositories named `username.github.io`, change to `--base-href /`
   - For other repositories, use `--base-href /repository-name/`

2. **Update Backend URL**:
   - In `frontend/src/environments/environment.prod.ts`, update `apiUrl` with your backend URL
   - If backend is deployed elsewhere, use that URL (e.g., `https://your-backend.herokuapp.com/api`)
   - For testing with local backend, you'll need to configure CORS to allow your GitHub Pages domain

### Pushing to GitHub

1. **Initialize Git (if not done)**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Spring Boot + Angular app"
   ```

2. **Add Remote Repository**:
   ```bash
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   ```

3. **Push to GitHub**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

4. **Enable GitHub Pages**:
   - Go to your repository on GitHub
   - Settings → Pages
   - Source: Deploy from a branch
   - Branch: `gh-pages` (created automatically by the workflow)
   - Click Save

### After Deployment

1. **Check Deployment**:
   - Your site will be available at: `https://YOUR_USERNAME.github.io/test/`
   - Replace `test` with your repository name

2. **Update API URL**:
   - If your backend is not deployed, the API calls will fail
   - Options:
     a. Deploy backend to a hosting service (Heroku, Railway, AWS, etc.)
     b. Use a backend-as-a-service
     c. Configure CORS on your local backend for testing

## Backend Deployment Options

Since Spring Boot is a server application, it cannot be deployed to GitHub Pages. Options:

### Option 1: Heroku (Free Tier Available)
```bash
cd backend
# Install Heroku CLI, then:
heroku create your-app-name
git subtree push --prefix backend heroku main
```

### Option 2: Railway
- Connect your GitHub repo
- Set root directory to `backend`
- Railway will auto-detect Spring Boot

### Option 3: AWS/Google Cloud/Azure
- Use App Engine, Elastic Beanstalk, or similar services
- Update environment.prod.ts with the backend URL

### Option 4: Keep Backend Local
- Run backend locally
- Configure CORS to allow your GitHub Pages domain
- Update environment.prod.ts to point to your local backend (requires tunneling for external access)

## Important Notes

1. **CORS Configuration**: Update `backend/src/main/java/com/example/backend/config/CorsConfig.java` to allow your GitHub Pages domain:
   ```java
   config.addAllowedOrigin("https://YOUR_USERNAME.github.io");
   ```

2. **API URL**: Always update `environment.prod.ts` with the correct backend URL before building.

3. **Base Href**: Must match your repository structure for GitHub Pages to work correctly.

4. **Manual Deployment**: You can trigger the workflow manually from GitHub Actions tab if needed.

