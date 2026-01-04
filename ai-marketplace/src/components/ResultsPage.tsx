import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, MessageCircle, Search } from 'lucide-react';
import FilterSidebar from './FilterSidebar';
import ProductCard from './ProductCard';
import ChatSidebar from './ChatSidebar';
import { mockProducts } from '../data/mockProducts';
import type { Product, Filters } from '../types';

interface ResultsPageProps {
  theme: 'light' | 'dark';
}

const ResultsPage: React.FC<ResultsPageProps> = ({ theme }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = useState(query);
  
  const [filters, setFilters] = useState<Filters>({
    category: '',
    priceRange: [0, 1000],
    brand: '',
    sortBy: 'popularity'
  });
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/results?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  useEffect(() => {
    // Apply filters
    let filtered = mockProducts.filter(product => {
      const matchesCategory = !filters.category || product.category === filters.category;
      const matchesPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
      const matchesBrand = !filters.brand || product.brand === filters.brand;
      
      return matchesCategory && matchesPrice && matchesBrand;
    });

    // Apply sorting
    switch (filters.sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'popularity':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }

    setFilteredProducts(filtered);
  }, [filters]);

  return (
    <div className={`min-h-screen ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-slate-50'
    }`}>
      {/* Header */}
      <header className={`shadow-sm border-b sticky top-0 z-40 ${
        theme === 'dark' 
          ? 'bg-gray-800 border-gray-700' 
          : 'bg-white border-slate-200'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between space-x-4">
            {/* Back button and results info */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/')}
                className={`p-2 rounded-lg transition-colors ${
                  theme === 'dark' 
                    ? 'hover:bg-gray-700' 
                    : 'hover:bg-slate-100'
                }`}
              >
                <ArrowLeft className={`w-5 h-5 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                }`} />
              </button>
              <div>
                <h1 className={`text-xl font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  Results for "{query}"
                </h1>
                <p className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                }`}>
                  {filteredProducts.length} products found
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-md">
              <form onSubmit={handleSearch} className="relative">
                <div className="relative">
                  <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search products..."
                    className={`w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors ${
                      theme === 'dark'
                        ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
                        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                    }`}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Filter Sidebar */}
          <div className="lg:col-span-3">
            <FilterSidebar filters={filters} onFiltersChange={setFilters} theme={theme} />
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-6">
            <div className="space-y-4">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} theme={theme} />
              ))}
            </div>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-3">
            <ChatSidebar query={query} theme={theme} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;