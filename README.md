# Agent Playbook Prototype

This is a small Vite + React prototype built from `agent_playbook_training_site_prototype.jsx`.

Quick start (Windows PowerShell):

```powershell
cd 'C:\Users\Nivron\Documents\BLUEREDTECH'
npm install
npm run dev
```

Build for production:

```powershell
npm run build
npm run preview
```

Deploy to Vercel (recommended):

1. Sign in to https://vercel.com and connect your Git provider or use 'Import Project' -> 'Link Git Repository'.
2. Push this project to a Git repository (GitHub/GitLab). Example:

```powershell
cd 'C:\Users\Nivron\Documents\BLUEREDTECH'
git init
git add .
git commit -m "initial commit"
git branch -M main
# then push to GitHub remote
```

3. In Vercel, select the repository. Vercel auto-detects Vite. Click Deploy. Your site will get a public URL.

Alternative: Serve the `dist` folder from any static host (Netlify, S3+CloudFront, etc.).

If you want, I can:
- Convert the UI to use the original component library (requires installing or porting those components).
- Add CI or a Vercel configuration file.
- Customize the domain and environment variables for deployment.
