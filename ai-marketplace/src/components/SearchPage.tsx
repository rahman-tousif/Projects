import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Zap } from 'lucide-react';

interface SearchPageProps {
  theme: 'light' | 'dark';
}

const SearchPage: React.FC<SearchPageProps> = ({ theme }) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/results?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800' 
        : 'bg-gradient-to-br from-slate-50 to-slate-100'
    }`}>
      <div className="max-w-2xl w-full space-y-6 sm:space-y-8 text-center">
        {/* Logo/Brand */}
        <div className="space-y-3 sm:space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-blue-600 rounded-2xl shadow-lg">
            <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className={`text-2xl sm:text-3xl lg:text-4xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-slate-900'
          }`}>
            Evalo
          </h1>
          <p className={`text-base sm:text-lg max-w-md mx-auto px-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
          }`}>
            Discover products from across the web with AI-powered search
          </p>
        </div>

        {/* Search Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div className="relative">
            <div className="relative">
              <Search className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4 sm:w-5 sm:h-5" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search any product or describe what you want…"
                className={`w-full pl-10 sm:pl-12 pr-3 sm:pr-4 py-3 sm:py-4 text-base sm:text-lg border rounded-2xl shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 backdrop-blur-sm ${
                  theme === 'dark'
                    ? 'bg-gray-800/80 border-gray-600 text-white placeholder-gray-400'
                    : 'bg-white/80 border-slate-200 text-gray-900 placeholder-gray-500'
                }`}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={!query.trim()}
            className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            Find Products
          </button>
        </form>

        {/* Sample Searches */}
        <div className="space-y-3 sm:space-y-4">
          <p className={`text-sm ${
            theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
          }`}>
            Try searching for:
          </p>
          <div className="flex flex-wrap gap-2 justify-center px-4">
            {['Wireless headphones', 'Gaming laptop', 'Running shoes', 'Coffee maker'].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => setQuery(suggestion)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm border rounded-full hover:shadow-md transition-all duration-200 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-600 hover:border-gray-500 text-gray-300'
                    : 'bg-white border-slate-200 hover:border-slate-300 text-slate-600'
                }`}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchPage;