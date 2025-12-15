# WireVault - Deployment Guide

## 🚀 Quick Deploy to Vercel

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will auto-detect Vite settings
   - Click Deploy

## 📦 Project Structure

```
WireVault/
├── assets/              # Static assets (images, logos)
├── components/          # Reusable React components
│   ├── LiquidChrome.jsx
│   └── LiquidChrome.css
├── src/                 # Source files
│   ├── WireVaultApp.jsx # Main application
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html           # HTML template
├── package.json         # Dependencies
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS config
└── .gitignore           # Git ignore rules
```

## 🛠️ Local Development

```bash
npm install
npm run dev
```

## 📝 Features

- ✅ Static landing page (no backend required)
- ✅ Liquid Chrome background effects
- ✅ Live cryptocurrency charts
- ✅ Responsive design
- ✅ Toast notifications
- ✅ LocalStorage for waitlist (demo)

## 🔧 Environment

No environment variables needed for static deployment.

## 📄 License

MIT

