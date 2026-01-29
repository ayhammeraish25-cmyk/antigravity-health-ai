# Deployment Handoff Guide

## 1. Prerequisites (Git)
It appears **Git** is not currently installed or recognized on your system path.
To proceed with deployment, you'll need to install it:

1.  **Download Git**: Go to [git-scm.com/download/win](https://git-scm.com/download/win).
2.  **Install**: Run the installer. **Important**: When asked about "Adjusting your PATH environment", select "Git from the command line and also from 3rd-party software".
3.  **Verify**: Open a new terminal (CMD or PowerShell) and run `git --version`.

## 2. Initialize Repository
Once Git is installed, open your project folder (`c:\Users\ayham\OneDrive\Desktop\Antigravity`) in a terminal and run:

```bash
# Initialize a new Git repository
git init

# Add all project files
git add .

# Save the first version
git commit -m "Initial commit: SOP v1.2 Complete"
```

## 3. GitHub Setup (Remote)
1.  Go to [GitHub.com](https://github.com) and create a **New Repository**.
2.  Name it `antigravity-fitness` (or verified-fitness-app).
3.  Copy the commands shown under "…or push an existing repository from the command line".
4.  Run them in your terminal:

```bash
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

## 4. Deployment (Vercel)
This is the recommended hosting as it's optimized for Vite/React SPA.

1.  Go to [Vercel.com](https://vercel.com) and **Sign Up/Login**.
2.  Click **"Add New..."** -> **"Project"**.
3.  Select your GitHub repository (`antigravity-fitness`).
4.  **Configure**:
    *   **Framework Preset**: Vite (should detect automatically)
    *   **Root Directory**: `./`
    *   **Build Command**: `npm run build`
    *   **Output Directory**: `dist`
5.  Click **Deploy**.

## 5. Deployment (Netlify Alternative)
1.  Go to [Netlify.com](https://netlify.com).
2.  **"Add new site"** -> **"Import from existing project"**.
3.  Connect GitHub and select your repository.
4.  Ensure **Publish directory** is set to `dist`.
5.  Click **Deploy site**.

_Note: We have already included `vercel.json` and `_redirects` files in your project to ensure routing works perfectly on both platforms._
