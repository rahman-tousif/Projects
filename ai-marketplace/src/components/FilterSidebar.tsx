import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Filter } from 'lucide-react';
import type { Filters } from '../types';

interface FilterSidebarProps {
  filters: Filters;
  onFiltersChange: (filters: Filters) => void;
  theme: 'light' | 'dark';
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFiltersChange, theme }) => {
  const [expandedSections, setExpandedSections] = useState({
    category: true,
    price: true,
    brand: true,
    sort: true
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const updateFilters = (key: keyof Filters, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value
    });
  };

  const categories = ['Electronics', 'Clothing', 'Home & Garden', 'Sports', 'Books'];
  const brands = ['Apple', 'Samsung', 'Nike', 'Amazon', 'Sony', 'Dell'];
  const sortOptions = [
    { value: 'popularity', label: 'Most Popular' },
    { value: 'price-low-high', label: 'Price: Low to High' },
    { value: 'price-high-low', label: 'Price: High to Low' }
  ];

  return (
    <div className={`rounded-lg shadow-sm border p-4 sm:p-6 lg:sticky lg:top-24 ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-slate-200'
    }`}>
      <div className="flex items-center space-x-2 mb-6">
        <Filter className="w-5 h-5 text-slate-600" />
        <h2 className={`text-lg font-semibold ${
          theme === 'dark' ? 'text-white' : 'text-slate-900'
        }`}>Filters</h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {/* Category Filter */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left py-2"
          >
            <h3 className={`font-medium ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>Category</h3>
            {expandedSections.category ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>
          
          {expandedSections.category && (
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              {categories.map((category) => (
                <label key={category} className="flex items-center">
                  <input
                    type="radio"
                    name="category"
                    value={category}
                    checked={filters.category === category}
                    onChange={(e) => updateFilters('category', e.target.value)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                  }`}>{category}</span>
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="category"
                  value=""
                  checked={filters.category === ''}
                  onChange={(e) => updateFilters('category', e.target.value)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className={`text-sm ${
                  theme === 'dark' ? 'text-gray-300' : 'text-slate-700'
                }`}>All Categories</span>
              </label>
            </div>
          )}
        </div>

        {/* Price Range Filter */}
        <div>
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full text-left py-2"
          >
            <h3 className={`font-medium ${
              theme === 'dark' ? 'text-white' : 'text-slate-900'
            }`}>Price Range</h3>
            {expandedSections.price ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>
          
          {expandedSections.price && (
            <div className="mt-2 space-y-3">
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  placeholder="Min"
                  value={filters.priceRange[0]}
                  onChange={(e) => updateFilters('priceRange', [Number(e.target.value), filters.priceRange[1]])}
                  className="flex-1 px-2 py-1 text-sm border border-slate-200 rounded focus:ring-1 focus:ring-blue-500"
                />
                <span className="text-slate-500">to</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={filters.priceRange[1]}
                  onChange={(e) => updateFilters('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                  className="flex-1 px-2 py-1 text-sm border border-slate-200 rounded focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <input
                type="range"
                min="0"
                max="1000"
                value={filters.priceRange[1]}
                onChange={(e) => updateFilters('priceRange', [filters.priceRange[0], Number(e.target.value)])}
                className="w-full accent-blue-600"
              />
            </div>
          )}
        </div>

        {/* Brand Filter */}
        <div>
          <button
            onClick={() => toggleSection('brand')}
            className="flex items-center justify-between w-full text-left py-2"
          >
            <h3 className="font-medium text-slate-900">Brand</h3>
            {expandedSections.brand ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>
          
          {expandedSections.brand && (
            <div className="mt-2 space-y-2 max-h-48 overflow-y-auto">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center">
                  <input
                    type="radio"
                    name="brand"
                    value={brand}
                    checked={filters.brand === brand}
                    onChange={(e) => updateFilters('brand', e.target.value)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{brand}</span>
                </label>
              ))}
              <label className="flex items-center">
                <input
                  type="radio"
                  name="brand"
                  value=""
                  checked={filters.brand === ''}
                  onChange={(e) => updateFilters('brand', e.target.value)}
                  className="mr-2 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-slate-700">All Brands</span>
              </label>
            </div>
          )}
        </div>

        {/* Sort Options */}
        <div>
          <button
            onClick={() => toggleSection('sort')}
            className="flex items-center justify-between w-full text-left py-2"
          >
            <h3 className="font-medium text-slate-900">Sort By</h3>
            {expandedSections.sort ? (
              <ChevronUp className="w-4 h-4 text-slate-500" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-500" />
            )}
          </button>
          
          {expandedSections.sort && (
            <div className="mt-2 space-y-2">
              {sortOptions.map((option) => (
                <label key={option.value} className="flex items-center">
                  <input
                    type="radio"
                    name="sort"
                    value={option.value}
                    checked={filters.sortBy === option.value}
                    onChange={(e) => updateFilters('sortBy', e.target.value)}
                    className="mr-2 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-slate-700">{option.label}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilterSidebar;