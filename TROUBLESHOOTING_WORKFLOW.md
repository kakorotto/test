# GitHub Actions Workflow Troubleshooting

If the workflow is still failing, here are common issues and solutions:

## Common Build Errors

### 1. TypeScript Compilation Errors

**Error**: `TS2307: Cannot find module...`

**Solution**: Ensure all dependencies are installed:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

### 2. Angular CLI Not Found

**Error**: `ng: command not found`

**Solution**: The workflow should install Angular CLI globally. Check that step completes.

### 3. Missing Files

**Error**: `Cannot find module './app.component.html'`

**Solution**: Ensure all component files exist:
- `src/app/app.component.ts`
- `src/app/app.component.html`
- `src/app/app.component.css`
- `src/app/services/api.service.ts`
- `src/environments/environment.ts`
- `src/environments/environment.prod.ts`

### 4. Build Output Not Found

**Error**: `publish_dir` doesn't exist

**Solution**: 
1. Check `angular.json` - `outputPath` should be `dist/angular-frontend`
2. Verify build completes successfully
3. Check the build logs in Actions tab

### 5. TypeScript Strict Mode Errors

**Solution**: If strict mode is causing issues, temporarily disable in `tsconfig.json`:
```json
{
  "compilerOptions": {
    "strict": false,
    ...
  }
}
```

## Debug Steps

1. **Check the Actions Tab**:
   - Go to: https://github.com/kakorotto/test/actions
   - Click on the failed workflow run
   - Expand each step to see error messages

2. **Test Build Locally**:
   ```bash
   cd frontend
   npm install --legacy-peer-deps
   ng build --configuration production --base-href /test/
   ```
   This will show you the actual error

3. **Check Angular Version Compatibility**:
   - Angular 17 requires Node.js 18+
   - Ensure dependencies are compatible

## Workflow Files

- **Main Workflow**: `.github/workflows/deploy.yml` (uses GitHub Pages v4 actions)
- **Backup Workflow**: `.github/workflows/deploy-backup.yml` (uses older but more reliable action)

If the main workflow fails, you can manually trigger the backup workflow:
1. Go to Actions tab
2. Select "Deploy Angular Frontend to GitHub Pages (Backup)"
3. Click "Run workflow"

## Next Steps If Still Failing

If the workflow still fails after these fixes:

1. **Share the exact error message** from the Actions tab
2. **Try building locally** and share any errors
3. **Check Angular CLI version compatibility**

## Alternative: Simpler Setup

If Angular 17 is causing issues, we can downgrade to Angular 15 which is more stable:

```json
{
  "dependencies": {
    "@angular/core": "^15.2.0",
    ...
  }
}
```

But let's try to fix the current setup first!

