# Newsly — Database

This folder documents the MongoDB database structure used by Newsly.

## Setup

1. Install MongoDB Community Edition: https://www.mongodb.com/try/download/community
2. Start MongoDB:
   ```bash
   mongod --dbpath C:\data\db
   ```
3. The backend will auto-create the `newsly` database and collections on first run.
4. Connection string (in `backend/.env`):
   ```
   MONGO_URI=mongodb://localhost:27017/newsly
   ```

## Collections

| Collection | Description |
|---|---|
| `users` | Registered user accounts |
| `savedarticles` | Articles bookmarked by users |

## Seed Demo Data

```bash
cd database/seeds
node seedUsers.js
```
