import express from 'express';
import {
    getSavedArticles,
    saveArticle,
    removeSavedArticle,
    checkSaved,
} from '../controllers/savedController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect); // All saved routes require auth

router.get('/', getSavedArticles);
router.get('/check', checkSaved);
router.post('/', saveArticle);
router.delete('/:id', removeSavedArticle);

export default router;
