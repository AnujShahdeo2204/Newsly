# Newsly 📰

> A full-stack news web app built as a 3rd year college project.

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React + Vite + Tailwind CSS |
| **Backend** | Node.js + Express |
| **Database** | MongoDB + Mongoose |
| **News Data** | NewsAPI.org |

## Project Structure

```
Newsly/
├── frontend/     ← React app (runs on :5173)
├── backend/      ← Express API (runs on :5000)
└── database/     ← Schemas, seeds, and docs
```

## Getting Started

### 1. Get a NewsAPI Key
Register at https://newsapi.org/register and paste the key into `backend/.env`:
```
NEWS_API_KEY=your_key_here
```

### 2. Start MongoDB
```bash
mongod
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

## Features
- 🔴 Live news from 6 categories (Technology, Business, Sports, Entertainment, Health, Science)
- 🔍 Full-text search across all news sources
- 👤 User authentication (register/login with JWT)
- 🔖 Bookmark and save articles
- 📱 Fully responsive dark-themed UI
