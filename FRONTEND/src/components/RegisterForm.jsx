import React, { useState } from 'react';
import { registerUser } from '../api/user.api';
import { useDispatch } from 'react-redux';
import { login } from '../store/slice/authSlice';
import { useNavigate } from '@tanstack/react-router';

const RegisterForm = ({state}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();    
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const data = await registerUser(name, password, email);
      setLoading(false);
      dispatch(login(data.user))
      navigate({to:"/dashboard"})
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl px-8 pt-8 pb-8 mb-4 border border-blue-200">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-blue-600">
            🎉 Join Us Today!
          </h2>
          <p className="text-blue-600 mt-2">Create your account to get started</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl border-l-4 border-red-500 shadow-md">
            <div className="flex items-center">
              <span className="mr-2">❌</span>
              <span className="font-medium">{error}</span>
            </div>
          </div>
        )}

        <div className="mb-6">
          <label className="flex items-center text-sm font-semibold text-blue-800 mb-2" htmlFor="name">
            <span className="mr-2">👤</span>
            Full Name
          </label>
          <input
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50 hover:bg-white text-blue-900 placeholder-blue-400"
            id="name"
            type="text"
            placeholder="Enter your full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-6">
          <label className="flex items-center text-sm font-semibold text-blue-800 mb-2" htmlFor="email">
            <span className="mr-2">📧</span>
            Email
          </label>
          <input
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50 hover:bg-white text-blue-900 placeholder-blue-400"
            id="email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-8">
          <label className="flex items-center text-sm font-semibold text-blue-800 mb-2" htmlFor="password">
            <span className="mr-2">🔒</span>
            Password
          </label>
          <input
            className="w-full px-4 py-3 border-2 border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 bg-blue-50 hover:bg-white text-blue-900 placeholder-blue-400"
            id="password"
            type="password"
            placeholder="Create a secure password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            minLength={6}
          />
          <p className="text-xs text-blue-500 mt-1">Password must be at least 6 characters long</p>
        </div>


        <div className="mb-6">
          <button
            className={`w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 ${loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
            type="submit"
            onClick={handleSubmit}
            disabled={loading}
          >
            <span className="flex items-center justify-center">
              {loading ? 'Creating...' : 'Create Account'}
            </span>
          </button>
        </div>

        <div className="text-center">
          <p className="text-sm text-blue-600">
            Already have an account?
            <span
              onClick={()=>state(true)}
              className="ml-1 text-blue-700 hover:text-blue-800 font-semibold cursor-pointer transition-colors duration-300"
            >
              Sign In here!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;