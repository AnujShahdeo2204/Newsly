# Newsly 📰

> A full-stack news web app built as a 3rd year college project.

## 🚀 Live Demo

**🌐 [View Live Project](https://newsly-beta.vercel.app)** - Fully deployed and working!

- **Frontend:** https://newsly-beta.vercel.app
- **Backend API:** https://newsly-backend.vercel.app
- **GitHub Repository:** https://github.com/AnujShahdeo2204/Newsly

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | MongoDB Atlas |
| **News Data** | NewsAPI.org |
| **Deployment** | Vercel (Frontend + Backend) |

## Project Structure

```
Newsly/
├── frontend/     ← React app (Vercel deployment)
├── backend/      ← Express API (Vercel serverless)
└── database/     ← Schemas, seeds, and docs
```

## 🎯 Features
- 🔴 **Live news** from 6 categories (Technology, Business, Sports, Entertainment, Health, Science)
- 🔍 **Full-text search** across all news sources
- 👤 **User authentication** (register/login with JWT)
- 🔖 **Bookmark articles** and save for later
- 📱 **Fully responsive** dark-themed UI
- ☁️ **Cloud deployed** on Vercel with MongoDB Atlas

## Getting Started (Local Development)

### 1. Get a NewsAPI Key
Register at https://newsapi.org/register and paste the key into `backend/.env`:
```
NEWS_API_KEY=your_key_here
```

### 2. Start MongoDB
```bash
mongod --dbpath C:\data\db
```

### 3. Start Backend
```bash
cd backend
npm install
npm run dev
```

### 4. Start Frontend
```bash
cd frontend
npm install
npm run dev
```

### 5. Open App
http://localhost:5173

## 📦 Deployment

**Frontend & Backend are deployed on Vercel:**

```bash
# Deploy frontend
cd frontend
vercel --prod

# Deploy backend  
cd backend
vercel --prod
```

Environment variables are configured in Vercel dashboard.

## 📚 Database Setup

For local development:
```bash
# Seed demo users
cd database/seeds
node seedUsers.js
```

**Demo Credentials:**
- Email: `admin@newsly.com` | Password: `admin123`
- Email: `demo@newsly.com` | Password: `demo123`

## 🔗 Quick Links

- **Live App:** https://newsly-beta.vercel.app
- **API Endpoint:** https://newsly-backend.vercel.app/api/news/headlines
- **Source Code:** https://github.com/AnujShahdeo2204/Newsly
- **News API Docs:** https://newsapi.org/docs

---

**Status:** ✅ Fully deployed and production-ready!
