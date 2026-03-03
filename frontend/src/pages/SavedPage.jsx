import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NewsCard from '../components/NewsCard';
import Spinner from '../components/Spinner';
import { Bookmark } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const SavedPage = () => {
    const { user } = useAuth();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchSaved = () => {
        axios.get('/api/saved')
            .then(res => setArticles(res.data || []))
            .catch(() => setArticles([]))
            .finally(() => setLoading(false));
    };

    useEffect(() => { fetchSaved(); }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="mb-8">
                <div className="flex items-center gap-2 mb-2">
                    <Bookmark size={22} className="text-brand-red" />
                    <h1 className="text-3xl font-bold">Saved Articles</h1>
                </div>
                <p className="text-slate-400">
                    {articles.length > 0
                        ? `You have ${articles.length} saved article${articles.length !== 1 ? 's' : ''}`
                        : 'Articles you save will appear here'}
                </p>
                <div className="w-16 h-1 bg-brand-red rounded-full mt-3" />
            </div>

            {loading ? <Spinner /> : articles.length === 0 ? (
                <div className="text-center py-20">
                    <Bookmark size={56} className="mx-auto text-dark-600 mb-4" />
                    <p className="text-slate-400 text-lg font-medium">No saved articles yet</p>
                    <p className="text-slate-500 text-sm mt-1 mb-6">Click the bookmark icon on any article to save it</p>
                    <Link to="/" className="btn-primary">Browse News</Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {articles.map((a) => (
                        <NewsCard
                            key={a._id}
                            article={{
                                title: a.title,
                                description: a.description,
                                url: a.url,
                                urlToImage: a.urlToImage,
                                source: a.source,
                                publishedAt: a.publishedAt,
                            }}
                            category={a.category}
                            savedId={a._id}
                            onUnsave={fetchSaved}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SavedPage;
