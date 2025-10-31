# Git Setup and Push Instructions

## Quick Setup

### 1. Initialize Git Repository

```bash
git init
```

### 2. Add All Files

```bash
git add .
```

### 3. Create Initial Commit

```bash
git commit -m "Initial commit: Spring Boot + Angular application"
```

### 4. Create GitHub Repository

1. Go to https://github.com/new
2. Create a new repository (you can name it anything, e.g., "test" or "spring-angular-app")
3. **Don't** initialize with README, .gitignore, or license (we already have these)

### 5. Add Remote and Push

```bash
# Replace YOUR_USERNAME and YOUR_REPO_NAME with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### 6. Enable GitHub Pages

After pushing:
1. Go to your repository on GitHub
2. Click **Settings** → **Pages**
3. Under **Source**, select: **Deploy from a branch**
4. Select branch: **gh-pages** (will be created by the workflow)
5. Select folder: **/ (root)**
6. Click **Save**

### 7. Update Workflow (Important!)

Before the first deployment, update `.github/workflows/deploy.yml`:
- Line 35: Change `/test/` to match your repository name
  - If repository is `username.github.io`, use `--base-href /`
  - Otherwise, use `--base-href /YOUR_REPO_NAME/`

Example:
```yaml
run: ng build --configuration production --base-href /my-app/
```

### 8. Update Backend URL (Important!)

Before deployment works with APIs:
1. Edit `frontend/src/environments/environment.prod.ts`
2. Update `apiUrl` to your backend URL
   - If backend is not deployed yet, APIs won't work on GitHub Pages
   - You need to deploy backend separately or use a backend service

### 9. Push Again (if you made changes)

```bash
git add .
git commit -m "Update deployment configuration"
git push
```

## Troubleshooting

**"Repository not found" error:**
- Check repository name and username
- Verify you have access to the repository
- Try using SSH: `git remote set-url origin git@github.com:USERNAME/REPO.git`

**Workflow fails:**
- Check if Node.js version is correct
- Verify Angular CLI is installed in workflow
- Check the build logs in GitHub Actions

**GitHub Pages 404:**
- Verify base-href matches repository name
- Check if gh-pages branch exists
- Wait a few minutes for GitHub Pages to build

**API calls fail:**
- Backend must be deployed separately
- Update CORS configuration to allow GitHub Pages domain
- Update environment.prod.ts with correct backend URL

## Next Steps

1. Deploy backend to a hosting service (Heroku, Railway, etc.)
2. Update environment.prod.ts with backend URL
3. Update CORS configuration in backend
4. Test the deployed application

