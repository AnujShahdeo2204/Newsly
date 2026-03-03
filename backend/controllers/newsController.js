import asyncHandler from 'express-async-handler';
import axios from 'axios';

const NEWS_API_BASE = 'https://newsapi.org/v2';

// Helper: build clean article objects
const formatArticles = (articles) =>
    articles
        .filter((a) => a.title && a.title !== '[Removed]' && a.urlToImage)
        .map((a) => ({
            title: a.title,
            description: a.description || '',
            url: a.url,
            urlToImage: a.urlToImage,
            source: a.source?.name || 'Unknown',
            publishedAt: a.publishedAt,
            author: a.author || '',
        }));

// @desc  Get top headlines (optionally by category)
// @route GET /api/news/headlines?category=technology&page=1
// @access Public
export const getHeadlines = asyncHandler(async (req, res) => {
    const { category = 'general', page = 1, pageSize = 20 } = req.query;

    const response = await axios.get(`${NEWS_API_BASE}/top-headlines`, {
        params: {
            country: 'us',
            category,
            page,
            pageSize,
            apiKey: process.env.NEWS_API_KEY,
        },
    });

    const articles = formatArticles(response.data.articles || []);
    res.json({
        totalResults: response.data.totalResults,
        articles,
    });
});

// @desc  Search news by keyword
// @route GET /api/news/search?q=bitcoin&page=1
// @access Public
export const searchNews = asyncHandler(async (req, res) => {
    const { q, page = 1, pageSize = 20 } = req.query;

    if (!q) {
        res.status(400);
        throw new Error('Search query (q) is required');
    }

    const response = await axios.get(`${NEWS_API_BASE}/everything`, {
        params: {
            q,
            page,
            pageSize,
            sortBy: 'publishedAt',
            language: 'en',
            apiKey: process.env.NEWS_API_KEY,
        },
    });

    const articles = formatArticles(response.data.articles || []);
    res.json({
        totalResults: response.data.totalResults,
        articles,
    });
});
