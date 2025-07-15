import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logoutUser();
      dispatch(logout());
      navigate({ to: '/' });
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if API call fails, clear local state
      dispatch(logout());
      navigate({ to: '/' });
    }
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-blue-600 to-teal-600 shadow-lg border-b-4 border-white/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - App Name */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-white hover:text-yellow-300 transition-colors duration-300 flex items-center">
              <span className="mr-2">🔗</span>
              URL Shortener
            </Link>
          </div>
          
          {/* Right side - Auth buttons */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              // Show user info and logout when authenticated
              <div className="flex items-center space-x-2 sm:space-x-4">
                <span className="text-white font-medium flex items-center text-sm sm:text-base">
                  <span className="mr-1 sm:mr-2">👋</span>
                  <span className="hidden sm:inline">Welcome, </span>
                  <span className="sm:hidden">Hi, </span>
                  {user?.name || 'User'}!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700
                   text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium cursor-pointer
                   transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center">
                    <span className="mr-1 sm:mr-2"></span>
                    <span className="hidden sm:inline">Logout</span>
                    <span className="sm:hidden">Out</span>
                  </span>
                </button>
              </div>
            ) : (
              // Show login and register when not authenticated
              <>
                <Link
                  to="/auth"
                  search={{ mode: 'login' }}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  search={{ mode: 'register' }}
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 sm:px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;