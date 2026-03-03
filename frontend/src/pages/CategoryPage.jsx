import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import Spinner from '../components/Spinner';
import { ChevronDown } from 'lucide-react';

const CATEGORY_META = {
    technology: { label: 'Technology', emoji: '💻' },
    business: { label: 'Business', emoji: '📈' },
    sports: { label: 'Sports', emoji: '🏆' },
    entertainment: { label: 'Entertainment', emoji: '🎬' },
    health: { label: 'Health', emoji: '❤️' },
    science: { label: 'Science', emoji: '🔬' },
    general: { label: 'Top News', emoji: '📰' },
};

const CategoryPage = () => {
    const { category } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    const meta = CATEGORY_META[category] || { label: category, emoji: '📰' };

    const fetchArticles = async (pageNum = 1, append = false) => {
        try {
            const { data } = await axios.get(`/api/news/headlines?category=${category}&page=${pageNum}&pageSize=12`);
            const newArticles = data.articles || [];
            setArticles(prev => append ? [...prev, ...newArticles] : newArticles);
            setHasMore(newArticles.length === 12);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        setLoading(true);
        setPage(1);
        setArticles([]);
        fetchArticles(1).finally(() => setLoading(false));
    }, [category]);

    const loadMore = async () => {
        const nextPage = page + 1;
        setLoadingMore(true);
        await fetchArticles(nextPage, true);
        setPage(nextPage);
        setLoadingMore(false);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <h1 className="text-3xl font-bold">
                    {meta.emoji} {meta.label}
                </h1>
                <p className="text-slate-400 mt-1">Latest {meta.label.toLowerCase()} news from around the world</p>
                <div className="w-16 h-1 bg-brand-red rounded-full mt-3" />
            </div>

            {loading ? <Spinner /> : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                        {articles.map((a, i) => (
                            <NewsCard key={i} article={a} category={category} />
                        ))}
                    </div>
                    {articles.length === 0 && (
                        <p className="text-center text-slate-400 py-12">No articles found.</p>
                    )}
                    {hasMore && articles.length > 0 && (
                        <div className="text-center mt-8">
                            <button
                                onClick={loadMore}
                                disabled={loadingMore}
                                className="btn-outline inline-flex items-center gap-2"
                            >
                                {loadingMore ? 'Loading...' : <><ChevronDown size={16} /> Load More</>}
                            </button>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default CategoryPage;
