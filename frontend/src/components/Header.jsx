import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Search, Bookmark, LogOut, User, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const CATEGORIES = [
    { name: 'Top News', value: 'general', path: '/' },
    { name: 'Technology', value: 'technology', path: '/category/technology' },
    { name: 'Business', value: 'business', path: '/category/business' },
    { name: 'Sports', value: 'sports', path: '/category/sports' },
    { name: 'Entertainment', value: 'entertainment', path: '/category/entertainment' },
    { name: 'Health', value: 'health', path: '/category/health' },
    { name: 'Science', value: 'science', path: '/category/science' },
];

const NewslyLogo = () => (
    <Link to="/" className="flex items-center gap-2 flex-shrink-0">
        <svg width="44" height="44" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="8" y="12" width="84" height="76" rx="14" ry="14"
                stroke="#E53935" strokeWidth="9" fill="none" />
            <polygon points="38,8 22,50 38,50 28,92 62,38 44,38 58,8"
                fill="#1565C0" />
        </svg>
        <span className="text-2xl font-black tracking-wider text-white">
            NEWS<span className="text-brand-red">LY</span>
        </span>
    </Link>
);

const Header = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [mobileOpen, setMobileOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery('');
        }
    };

    const isActive = (path) => location.pathname === path;

    return (
        <header className="bg-dark-800 border-b border-dark-700 sticky top-0 z-50">
            {/* Top bar */}
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                <NewslyLogo />

                {/* Search */}
                <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md">
                    <div className="relative w-full">
                        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search news..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input pl-9 py-2 text-sm"
                        />
                    </div>
                </form>

                {/* User area */}
                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-2 bg-dark-700 hover:bg-dark-600 px-3 py-2 rounded-lg transition"
                            >
                                <div className="w-7 h-7 rounded-full bg-brand-red flex items-center justify-center text-xs font-bold">
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <span className="text-sm font-medium hidden sm:block">{user.name}</span>
                                <ChevronDown size={14} className="text-slate-400" />
                            </button>
                            {userMenuOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-dark-700 border border-dark-600 rounded-xl shadow-xl overflow-hidden z-50">
                                    <Link
                                        to="/saved"
                                        onClick={() => setUserMenuOpen(false)}
                                        className="flex items-center gap-2 px-4 py-3 hover:bg-dark-600 transition text-sm"
                                    >
                                        <Bookmark size={15} /> Saved Articles
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setUserMenuOpen(false); }}
                                        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-dark-600 transition text-sm text-brand-red"
                                    >
                                        <LogOut size={15} /> Sign Out
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="flex items-center gap-2">
                            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition px-3 py-2">
                                Sign In
                            </Link>
                            <Link to="/register" className="btn-primary text-sm py-2">
                                Join Now
                            </Link>
                        </div>
                    )}
                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileOpen(!mobileOpen)}
                        className="md:hidden p-2 rounded-lg hover:bg-dark-700 transition"
                    >
                        {mobileOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>
            </div>

            {/* Category nav */}
            <div className="border-t border-dark-700 hidden md:block">
                <div className="max-w-7xl mx-auto px-4">
                    <nav className="flex gap-1">
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat.value}
                                to={cat.path}
                                className={`px-4 py-3 text-sm font-medium transition-all border-b-2 ${isActive(cat.path)
                                        ? 'border-brand-red text-brand-red'
                                        : 'border-transparent text-slate-400 hover:text-white hover:border-slate-500'
                                    }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileOpen && (
                <div className="md:hidden border-t border-dark-700 bg-dark-800 pb-4">
                    <form onSubmit={handleSearch} className="px-4 pt-4 pb-2">
                        <div className="relative">
                            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search news..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="input pl-9 py-2 text-sm"
                            />
                        </div>
                    </form>
                    <nav className="flex flex-col px-4 gap-1">
                        {CATEGORIES.map((cat) => (
                            <Link
                                key={cat.value}
                                to={cat.path}
                                onClick={() => setMobileOpen(false)}
                                className={`py-2.5 px-3 text-sm font-medium rounded-lg ${isActive(cat.path)
                                        ? 'bg-brand-red/20 text-brand-red'
                                        : 'text-slate-300 hover:bg-dark-700'
                                    }`}
                            >
                                {cat.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
