import React from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../store/slice/authSlice';
import { logoutUser } from '../api/user.api';
import DarkModeToggle from './DarkModeToggle';

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
    <nav className="bg-secondary shadow-lg border-b-4 border-accent">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 sm:h-16">
          {/* Left side - App Name */}
          <div className="flex items-center flex-shrink-0">
            <Link to="/" className="text-lg sm:text-xl font-bold text-accent hover:text-blue-800 transition-colors duration-300 flex items-center">
              <span className="mr-1 sm:mr-2">🔗</span>
              <span className="hidden xs:inline">URL Shortener</span>
              <span className="xs:hidden">Shortener</span>
            </Link>
          </div>

          {/* Right side - Dark mode toggle and Auth buttons */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <DarkModeToggle />
            {isAuthenticated ? (
              // Show user info and logout when authenticated
              <div className="flex items-center space-x-1 sm:space-x-4">
                <span className="text-secondary font-medium flex items-center text-xs sm:text-base">
                  <span className="mr-1">👋</span>
                  <span className="hidden md:inline">Welcome, </span>
                  <span className="md:hidden">Hi, </span>
                  <span className="max-w-20 sm:max-w-none truncate">{user?.name || 'User'}</span>!
                </span>
                <button
                  onClick={handleLogout}
                  className="bg-red-500 hover:bg-red-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium cursor-pointer
                   transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <span className="flex items-center">
                    <span className="hidden sm:inline">Logout</span>
                    <span className="sm:hidden">Out</span>
                  </span>
                </button>
              </div>
            ) : (
              // Show login and register when not authenticated
              <div className="flex items-center space-x-1 sm:space-x-3">
                <Link
                  to="/auth"
                  search={{ mode: 'login' }}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  Login
                </Link>
                <Link
                  to="/auth"
                  search={{ mode: 'register' }}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl whitespace-nowrap"
                >
                  <span className="hidden xs:inline">Register</span>
                  <span className="xs:hidden">Sign Up</span>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;