import React, { useState } from 'react';
import { ExternalLink, Bookmark, BookmarkCheck, Clock, Globe } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const CATEGORY_COLORS = {
    technology: 'bg-blue-500/20 text-blue-400',
    business: 'bg-green-500/20 text-green-400',
    sports: 'bg-orange-500/20 text-orange-400',
    entertainment: 'bg-purple-500/20 text-purple-400',
    health: 'bg-pink-500/20 text-pink-400',
    science: 'bg-cyan-500/20 text-cyan-400',
    general: 'bg-slate-500/20 text-slate-300',
};

const NewsCard = ({ article, category = 'general', savedId = null, onUnsave }) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [saved, setSaved] = useState(!!savedId);
    const [savedIdState, setSavedIdState] = useState(savedId);
    const [loadingSave, setLoadingSave] = useState(false);

    const timeAgo = (dateStr) => {
        const diff = (Date.now() - new Date(dateStr)) / 1000;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (!user) { navigate('/login'); return; }
        setLoadingSave(true);
        try {
            if (saved) {
                await axios.delete(`/api/saved/${savedIdState}`);
                setSaved(false);
                setSavedIdState(null);
                onUnsave?.();
            } else {
                const { data } = await axios.post('/api/saved', {
                    title: article.title,
                    description: article.description,
                    url: article.url,
                    urlToImage: article.urlToImage,
                    source: article.source,
                    publishedAt: article.publishedAt,
                    category,
                });
                setSaved(true);
                setSavedIdState(data._id);
            }
        } catch (err) {
            console.error(err);
        }
        setLoadingSave(false);
    };

    return (
        <div className="card flex flex-col group">
            {/* Image */}
            <div className="relative overflow-hidden aspect-video bg-dark-700">
                {article.urlToImage ? (
                    <img
                        src={article.urlToImage}
                        alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => { e.target.style.display = 'none'; }}
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Globe size={40} className="text-dark-600" />
                    </div>
                )}
                {/* Save button */}
                <button
                    onClick={handleSave}
                    disabled={loadingSave}
                    className="absolute top-2 right-2 p-2 bg-dark-900/80 backdrop-blur-sm rounded-lg hover:bg-dark-800 transition"
                    title={saved ? 'Remove bookmark' : 'Save article'}
                >
                    {saved
                        ? <BookmarkCheck size={16} className="text-brand-red" />
                        : <Bookmark size={16} className="text-slate-300" />
                    }
                </button>
                {/* Category badge */}
                <span className={`absolute bottom-2 left-2 badge ${CATEGORY_COLORS[category] || CATEGORY_COLORS.general}`}>
                    {category}
                </span>
            </div>

            {/* Content */}
            <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-slate-100 leading-snug mb-2 line-clamp-2 group-hover:text-brand-red transition-colors">
                    {article.title}
                </h3>
                {article.description && (
                    <p className="text-sm text-slate-400 line-clamp-2 mb-3">{article.description}</p>
                )}
                <div className="mt-auto flex items-center justify-between text-xs text-slate-500">
                    <span className="flex items-center gap-1">
                        <Globe size={11} /> {article.source}
                    </span>
                    <span className="flex items-center gap-1">
                        <Clock size={11} /> {article.publishedAt ? timeAgo(article.publishedAt) : ''}
                    </span>
                </div>
                <a
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 flex items-center gap-1 text-xs font-medium text-brand-blue hover:text-brand-red transition"
                >
                    Read Full Article <ExternalLink size={11} />
                </a>
            </div>
        </div>
    );
};

export default NewsCard;
