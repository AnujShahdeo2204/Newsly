import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => (
    <footer className="bg-dark-800 border-t border-dark-700 mt-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <Link to="/" className="flex items-center gap-2">
                    <svg width="32" height="32" viewBox="0 0 100 100" fill="none">
                        <rect x="8" y="12" width="84" height="76" rx="14" stroke="#E53935" strokeWidth="9" fill="none" />
                        <polygon points="38,8 22,50 38,50 28,92 62,38 44,38 58,8" fill="#1565C0" />
                    </svg>
                    <span className="text-lg font-black tracking-wider">NEWS<span className="text-brand-red">LY</span></span>
                </Link>
                <div className="flex gap-6 text-sm text-slate-400">
                    <Link to="/category/technology" className="hover:text-white transition">Technology</Link>
                    <Link to="/category/business" className="hover:text-white transition">Business</Link>
                    <Link to="/category/sports" className="hover:text-white transition">Sports</Link>
                    <Link to="/category/science" className="hover:text-white transition">Science</Link>
                </div>
                <p className="text-xs text-slate-500">
                    © 2025 Newsly · Powered by NewsAPI
                </p>
            </div>
        </div>
    </footer>
);

export default Footer;
