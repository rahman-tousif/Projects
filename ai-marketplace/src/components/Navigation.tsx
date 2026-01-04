import React, { useState, useEffect } from 'react';
import { Sun, Moon, User, LogIn } from 'lucide-react';

interface NavigationProps {
  theme: 'light' | 'dark';
  onThemeToggle: () => void;
  onSignIn: () => void;
  isSignedIn: boolean;
  userName?: string;
}

const Navigation: React.FC<NavigationProps> = ({ 
  theme, 
  onThemeToggle, 
  onSignIn, 
  isSignedIn, 
  userName 
}) => {
  return (
    <nav className={`sticky top-0 z-50 transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900 border-gray-700' 
        : 'bg-white border-gray-200'
    } border-b shadow-sm`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <h1 className={`text-2xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Evalo
            </h1>
          </div>

          {/* Right side controls */}
          <div className="flex items-center space-x-4">
            {/* Theme Toggle */}
            <button
              onClick={onThemeToggle}
              className={`p-2 rounded-lg transition-colors duration-200 ${
                theme === 'dark'
                  ? 'hover:bg-gray-800 text-yellow-400'
                  : 'hover:bg-gray-100 text-gray-600'
              }`}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </button>

            {/* Sign In / User Profile */}
            {isSignedIn ? (
              <div className="flex items-center space-x-2">
                <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${
                  theme === 'dark' 
                    ? 'bg-gray-800 text-white' 
                    : 'bg-gray-100 text-gray-700'
                }`}>
                  <User className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {userName || 'User'}
                  </span>
                </div>
              </div>
            ) : (
              <button
                onClick={onSignIn}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'bg-blue-600 hover:bg-blue-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                <LogIn className="h-4 w-4" />
                <span className="text-sm font-medium">Sign In</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
