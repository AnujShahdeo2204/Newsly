import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import Spinner from '../components/Spinner';
import { Search } from 'lucide-react';

const SearchPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q') || '';
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        if (!query) return;
        setLoading(true);
        axios.get(`/api/news/search?q=${encodeURIComponent(query)}&pageSize=20`)
            .then(res => {
                setArticles(res.data.articles || []);
                setTotal(res.data.totalResults || 0);
            })
            .catch(() => setArticles([]))
            .finally(() => setLoading(false));
    }, [query]);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center gap-2 text-slate-400 text-sm mb-2">
                    <Search size={14} /> Search results
                </div>
                <h1 className="text-3xl font-bold">
                    "{query}"
                </h1>
                {!loading && (
                    <p className="text-slate-400 mt-1">
                        {total > 0 ? `About ${total.toLocaleString()} results` : 'No results found'}
                    </p>
                )}
                <div className="w-16 h-1 bg-brand-red rounded-full mt-3" />
            </div>

            {loading ? <Spinner /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {articles.map((a, i) => (
                        <NewsCard key={i} article={a} category="general" />
                    ))}
                </div>
            )}

            {!loading && articles.length === 0 && query && (
                <div className="text-center py-20">
                    <Search size={48} className="mx-auto text-dark-600 mb-4" />
                    <p className="text-slate-400">No articles found for "{query}"</p>
                    <p className="text-slate-500 text-sm mt-1">Try a different search term</p>
                </div>
            )}
        </div>
    );
};

export default SearchPage;
