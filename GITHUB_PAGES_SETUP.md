# GitHub Pages Setup - Next Steps

## ✅ What's Done

1. ✅ Code pushed to GitHub: `https://github.com/kakorotto/test`
2. ✅ GitHub Actions workflow configured (`.github/workflows/deploy.yml`)
3. ✅ Angular frontend configured for GitHub Pages
4. ✅ Base href set to `/test/` (matches your repository name)

## 🚀 Enable GitHub Pages

### Step 1: Enable GitHub Pages in Repository Settings

1. Go to your repository: https://github.com/kakorotto/test
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` (will be created by the workflow)
   - **Folder**: `/ (root)`
5. Click **Save**

### Step 2: Wait for GitHub Actions to Complete

1. Go to **Actions** tab in your repository
2. You should see the workflow "Deploy Angular Frontend to GitHub Pages" running
3. Wait for it to complete (first run may take 3-5 minutes)
4. You'll see a green checkmark when done

### Step 3: Access Your Site

After the workflow completes, your site will be available at:
- **https://kakorotto.github.io/test/**

Note: It may take a few minutes after the workflow completes for the site to be available.

## 📝 Important: Backend Configuration

### Current Status
- ✅ Frontend is configured and will deploy
- ⚠️ **Backend URL needs to be configured**

The Angular app currently points to `http://localhost:8080/api` in production mode.

### To Make APIs Work:

**Option 1: Deploy Backend Separately**
1. Deploy Spring Boot backend to Heroku, Railway, AWS, etc.
2. Update `frontend/src/environments/environment.prod.ts`:
   ```typescript
   apiUrl: 'https://your-backend-url.com/api'
   ```
3. Update CORS in `backend/src/main/java/com/example/backend/config/CorsConfig.java`:
   ```java
   config.addAllowedOrigin("https://kakorotto.github.io");
   ```
4. Commit and push changes:
   ```bash
   git add frontend/src/environments/environment.prod.ts
   git commit -m "Update production backend URL"
   git push
   ```

**Option 2: Use Local Backend for Testing**
- Run backend locally: `cd backend && mvn spring-boot:run`
- Update environment.prod.ts temporarily for testing
- Note: This only works if both are on same network

## 🔧 Troubleshooting

### GitHub Pages Shows 404
- Wait 5-10 minutes after workflow completes
- Check Actions tab for errors
- Verify base-href matches repository name (`/test/`)

### Workflow Fails
- Check Actions tab for error messages
- Common issues:
  - Node.js version mismatch (should be 18+)
  - Angular CLI installation failure
  - Build errors

### API Calls Don't Work
- Backend must be deployed and accessible
- Update CORS configuration
- Update environment.prod.ts with correct URL
- Check browser console (F12) for errors

## 📚 Additional Resources

- **GitHub Actions**: Check `.github/workflows/deploy.yml` for workflow details
- **Deployment Guide**: See `DEPLOYMENT.md` for detailed deployment options
- **Local Testing**: See `README.md` for local development setup

## 🎉 Success!

Once GitHub Pages is enabled and the workflow completes, your Angular frontend will be live at:
**https://kakorotto.github.io/test/**

Remember to deploy your backend separately and update the API URL for full functionality!

