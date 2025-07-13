import React, { useState } from 'react';
import { loginUser } from '../api/user.api';
import {useDispatch, useSelector} from 'react-redux';
import { login } from '../store/slice/authSlice.js';
import { useNavigate } from '@tanstack/react-router';

const LoginForm = ({ state }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const auth = useSelector((state) => state.auth)
    console.log(auth)

    const handleSubmit = async () => {
        setLoading(true);
        setError('');

        try {
            const data = await loginUser(password, email);
            dispatch(login(data.user))
            navigate({to:"/dashboard"})
            setLoading(false);
            console.log("signin success")
        } catch (err) {
            setLoading(false);
            setError(err.message || 'Login failed. Please check your credentials.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto">
            <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl px-8 pt-8 pb-8 mb-4 border border-white/20">
                <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        🔐 Welcome Back!
                    </h2>
                    <p className="text-gray-600 mt-2">Sign in to your account</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-gradient-to-r from-red-100 to-pink-100 text-red-700 rounded-xl border-l-4 border-red-500 shadow-md">
                        <div className="flex items-center">
                            <span className="mr-2">❌</span>
                            <span className="font-medium">{error}</span>
                        </div>
                    </div>
                )}

                <div className="mb-6">
                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-2" htmlFor="email">
                        <span className="mr-2">📧</span>
                        Email
                    </label>
                    <input
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400"
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-8">
                    <label className="flex items-center text-sm font-semibold text-gray-800 mb-2" htmlFor="password">
                        <span className="mr-2">🔒</span>
                        Password
                    </label>
                    <input
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 hover:bg-white text-gray-800 placeholder-gray-400"
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-6">
                    <button
                        className={`w-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-purple-300 ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        type="submit"
                        onClick={handleSubmit}
                        disabled={loading}
                    >
                        <span className="flex items-center justify-center">
                            <span className="mr-2">{loading ? '⏳' : '🚀'}</span>
                            {loading ? 'Signing in...' : 'Sign In'}
                        </span>
                    </button>
                </div>

                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?
                        <span
                            onClick={() => state(false)}
                            className="ml-1 text-blue-600 hover:text-purple-600 font-semibold cursor-pointer transition-colors duration-300"
                        >
                            Register here! ✨
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;