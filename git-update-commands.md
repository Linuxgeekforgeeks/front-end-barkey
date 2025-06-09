# Git Commands to Update Your Repository

## Step 1: Check Current Status
```bash
git status
```

## Step 2: Add All Changes
```bash
git add .
```

## Step 3: Commit Changes
```bash
git commit -m "Improve landing page navbar and welcome section

- Enhanced navbar with glassmorphism design and better UX
- Added mobile-first responsive navigation
- Improved welcome section with trust indicators
- Added smooth animations and micro-interactions
- Enhanced accessibility with proper ARIA labels
- Updated typography and color scheme
- Added cart integration and better mobile menu"
```

## Step 4: Push to GitHub
```bash
git push origin main
```

## Alternative: If you're on a different branch
```bash
git push origin your-branch-name
```

## If you need to set up remote origin (first time)
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

## To check your remote repository
```bash
git remote -v
```

## Files that were updated:
- components/shared/commons/header/Header.jsx
- components/shared/commons/header/Header.css
- components/landing/WelcomeSection.jsx
- components/landing/WelcomeSection.css