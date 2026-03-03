import connectDB from '../config/db.js';

export const ensureDbConnection = async (req, res, next) => {
    try {
        await connectDB();
        next();
    } catch (error) {
        console.error(`⚠️  MongoDB unavailable during request: ${error.message}`);
        res.status(503).json({
            message: 'Database is temporarily unavailable. Please try again in a moment.',
        });
    }
};
