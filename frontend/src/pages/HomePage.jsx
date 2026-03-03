import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HeroCard from '../components/HeroCard';
import NewsCard from '../components/NewsCard';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { TrendingUp, Cpu, Briefcase, Trophy, Film, HeartPulse, FlaskConical } from 'lucide-react';

const SECTIONS = [
    { label: 'Technology', value: 'technology', icon: Cpu, color: 'text-blue-400' },
    { label: 'Business', value: 'business', icon: Briefcase, color: 'text-green-400' },
    { label: 'Sports', value: 'sports', icon: Trophy, color: 'text-orange-400' },
    { label: 'Entertainment', value: 'entertainment', icon: Film, color: 'text-purple-400' },
];

const SectionRow = ({ section }) => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);
    const Icon = section.icon;

    useEffect(() => {
        axios.get(`/api/news/headlines?category=${section.value}&pageSize=4`)
            .then(res => setArticles(res.data.articles?.slice(0, 4) || []))
            .catch(() => setArticles([]))
            .finally(() => setLoading(false));
    }, [section.value]);

    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                    <span className={`p-1.5 bg-dark-700 rounded-lg ${section.color}`}>
                        <Icon size={18} />
                    </span>
                    <h2 className="text-xl font-bold">{section.label}</h2>
                </div>
                <Link
                    to={`/category/${section.value}`}
                    className="text-sm text-brand-red hover:underline font-medium"
                >
                    View all →
                </Link>
            </div>
            {loading ? <Spinner /> : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {articles.map((a, i) => (
                        <NewsCard key={i} article={a} category={section.value} />
                    ))}
                </div>
            )}
        </section>
    );
};

const HomePage = () => {
    const [heroArticles, setHeroArticles] = useState([]);
    const [heroLoading, setHeroLoading] = useState(true);

    useEffect(() => {
        axios.get('/api/news/headlines?category=general&pageSize=5')
            .then(res => setHeroArticles(res.data.articles || []))
            .catch(() => { })
            .finally(() => setHeroLoading(false));
    }, []);

    const hero = heroArticles[0];
    const sideArticles = heroArticles.slice(1, 5);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Breaking Banner */}
            <div className="flex items-center gap-3 bg-brand-red/10 border border-brand-red/30 rounded-xl px-4 py-2.5 mb-8 overflow-hidden">
                <span className="flex items-center gap-1.5 bg-brand-red text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                    <TrendingUp size={12} /> LIVE
                </span>
                <p className="text-sm text-slate-300 truncate">
                    Stay updated with the latest news from around the world — powered by Newsly
                </p>
            </div>

            {/* Hero Section */}
            {heroLoading ? <Spinner /> : hero && (
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 mb-12">
                    <div className="lg:col-span-3">
                        <HeroCard article={hero} category="general" />
                    </div>
                    <div className="lg:col-span-2 flex flex-col gap-4">
                        {sideArticles.map((a, i) => (
                            <a
                                key={i}
                                href={a.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex gap-3 bg-dark-800 rounded-xl p-3 hover:bg-dark-700 transition group"
                            >
                                {a.urlToImage && (
                                    <img
                                        src={a.urlToImage}
                                        alt=""
                                        className="w-20 h-16 object-cover rounded-lg flex-shrink-0"
                                    />
                                )}
                                <div className="min-w-0">
                                    <p className="text-xs text-brand-red font-semibold mb-1">{a.source}</p>
                                    <p className="text-sm font-medium leading-snug line-clamp-2 group-hover:text-brand-red transition">
                                        {a.title}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            )}

            {/* Category Sections */}
            {SECTIONS.map((s) => <SectionRow key={s.value} section={s} />)}
        </div>
    );
};

export default HomePage;
