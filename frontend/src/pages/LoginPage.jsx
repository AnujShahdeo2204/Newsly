import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => { if (user) navigate('/'); }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const result = await login(email, password);
        setLoading(false);
        if (!result.success) setError(result.error);
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 justify-center">
                        <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
                            <rect x="8" y="12" width="84" height="76" rx="14" stroke="#E53935" strokeWidth="9" fill="none" />
                            <polygon points="38,8 22,50 38,50 28,92 62,38 44,38 58,8" fill="#1565C0" />
                        </svg>
                        <span className="text-2xl font-black tracking-wider">NEWS<span className="text-brand-red">LY</span></span>
                    </Link>
                    <p className="text-slate-400 mt-3 text-sm">Welcome back! Sign in to continue</p>
                </div>

                <div className="bg-dark-800 border border-dark-700 rounded-2xl p-8">
                    <h1 className="text-xl font-bold mb-6">Sign In</h1>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-lg mb-5">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Email Address</label>
                            <input
                                type="email" required
                                placeholder="you@example.com"
                                value={email}
                                onChange={e => { setEmail(e.target.value); setError(''); }}
                                className="input"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                            <div className="relative">
                                <input
                                    type={showPass ? 'text' : 'password'} required
                                    placeholder="Your password"
                                    value={password}
                                    onChange={e => { setPassword(e.target.value); setError(''); }}
                                    className="input pr-10"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200"
                                >
                                    {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>
                        <button type="submit" disabled={loading} className="btn-primary w-full py-2.5 mt-2 disabled:opacity-60">
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    <p className="text-center text-sm text-slate-400 mt-6">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-brand-red hover:underline font-medium">Create one free</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
