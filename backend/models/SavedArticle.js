import mongoose from 'mongoose';

const savedArticleSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
        title: { type: String, required: true },
        description: { type: String, default: '' },
        url: { type: String, required: true },
        urlToImage: { type: String, default: '' },
        source: { type: String, default: '' },
        publishedAt: { type: String, default: '' },
        category: { type: String, default: 'general' },
    },
    { timestamps: true }
);

// Prevent saving same article twice for same user
savedArticleSchema.index({ user: 1, url: 1 }, { unique: true });

const SavedArticle = mongoose.model('SavedArticle', savedArticleSchema);
export default SavedArticle;
