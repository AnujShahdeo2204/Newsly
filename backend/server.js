import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import newsRoutes from './routes/newsRoutes.js';
import savedRoutes from './routes/savedRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
    origin: [
        'http://localhost:5173', 
        'http://localhost:3000',
        'https://anujshahdeo03-3097s-projects.vercel.app',
        /^https:\/\/newsly.*\.vercel\.app$/
    ],
    credentials: true,
}));
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/saved', savedRoutes);

// Health check
app.get('/', (req, res) => {
    res.json({ message: '🚀 Newsly API is running!', version: '1.0.0' });
});

// Global error handler
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Export for Vercel serverless
export default app;

// Only listen in development
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`\n🚀 Newsly Backend running at http://localhost:${PORT}`);
    });
}
