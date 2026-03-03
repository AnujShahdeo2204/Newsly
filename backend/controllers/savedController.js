import asyncHandler from 'express-async-handler';
import SavedArticle from '../models/SavedArticle.js';

// @desc  Get all saved articles for logged-in user
// @route GET /api/saved
// @access Private
export const getSavedArticles = asyncHandler(async (req, res) => {
    const articles = await SavedArticle.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(articles);
});

// @desc  Save an article
// @route POST /api/saved
// @access Private
export const saveArticle = asyncHandler(async (req, res) => {
    const { title, description, url, urlToImage, source, publishedAt, category } = req.body;

    if (!title || !url) {
        res.status(400);
        throw new Error('Title and URL are required');
    }

    // Check if already saved
    const exists = await SavedArticle.findOne({ user: req.user._id, url });
    if (exists) {
        res.status(400);
        throw new Error('Article already saved');
    }

    const article = await SavedArticle.create({
        user: req.user._id,
        title,
        description,
        url,
        urlToImage,
        source,
        publishedAt,
        category,
    });

    res.status(201).json(article);
});

// @desc  Remove a saved article
// @route DELETE /api/saved/:id
// @access Private
export const removeSavedArticle = asyncHandler(async (req, res) => {
    const article = await SavedArticle.findById(req.params.id);

    if (!article) {
        res.status(404);
        throw new Error('Article not found');
    }

    if (article.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error('Not authorized');
    }

    await article.deleteOne();
    res.json({ message: 'Article removed' });
});

// @desc  Check if a URL is saved by current user
// @route GET /api/saved/check?url=...
// @access Private
export const checkSaved = asyncHandler(async (req, res) => {
    const { url } = req.query;
    const article = await SavedArticle.findOne({ user: req.user._id, url });
    res.json({ saved: !!article, id: article?._id || null });
});
