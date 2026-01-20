
import React from 'react';
import { useAuth } from '../hooks/useAuth';

interface HeaderProps {
  onLogin: () => void;
  onSignup: () => void;
  onAddToolClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogin, onSignup, onAddToolClick }) => {
  const { user, logout } = useAuth();

  return (
    <header className="flex flex-col sm:flex-row justify-between items-center mb-12">
      <div className="text-center sm:text-left mb-6 sm:mb-0">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-2">
          100 Digital Tools
        </h1>
        <p className="max-w-2xl text-lg text-gray-400">
          A curated collection of essential online tools.
        </p>
      </div>
      <div className="flex items-center space-x-4">
        {user ? (
          <>
            <button
              onClick={onAddToolClick}
              className="px-4 py-2 text-sm font-semibold text-white bg-green-500 rounded-full hover:bg-green-600 transition-colors"
              aria-label="Add new tool"
            >
              Add Tool
            </button>
            <span className="text-gray-300">Welcome, {user.username}!</span>
            <button
              onClick={logout}
              className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-full hover:bg-red-600 transition-colors"
              aria-label="Logout"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onLogin}
              className="px-4 py-2 text-sm font-semibold text-white bg-transparent border border-purple-500 rounded-full hover:bg-purple-500 transition-colors"
            >
              Login
            </button>
            <button
              onClick={onSignup}
              className="px-4 py-2 text-sm font-semibold text-white bg-purple-500 rounded-full hover:bg-purple-600 transition-colors"
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
