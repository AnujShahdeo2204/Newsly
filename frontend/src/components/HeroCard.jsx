import React from 'react';
import { ExternalLink, Clock, Globe } from 'lucide-react';

const HeroCard = ({ article, category = 'general' }) => {
    if (!article) return null;

    const timeAgo = (dateStr) => {
        const diff = (Date.now() - new Date(dateStr)) / 1000;
        if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
        if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
        return `${Math.floor(diff / 86400)}d ago`;
    };

    return (
        <div className="relative rounded-2xl overflow-hidden bg-dark-800 group h-[420px] md:h-[480px]">
            {article.urlToImage && (
                <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { e.target.style.display = 'none'; }}
                />
            )}
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <span className="badge bg-brand-red text-white mb-3 inline-block capitalize">{category}</span>
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-3 line-clamp-3">
                    {article.title}
                </h2>
                {article.description && (
                    <p className="text-slate-300 text-sm md:text-base line-clamp-2 mb-4">{article.description}</p>
                )}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span className="flex items-center gap-1"><Globe size={12} /> {article.source}</span>
                        <span className="flex items-center gap-1"><Clock size={12} /> {article.publishedAt ? timeAgo(article.publishedAt) : ''}</span>
                    </div>
                    <a
                        href={article.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-brand-red hover:bg-brand-red-dark text-white text-sm font-semibold px-4 py-2 rounded-lg transition"
                    >
                        Read Story <ExternalLink size={14} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default HeroCard;
