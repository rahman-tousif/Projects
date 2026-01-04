import React from 'react';
import { Star, ExternalLink } from 'lucide-react';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  theme: 'light' | 'dark';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, theme }) => {
  return (
    <div className={`rounded-lg shadow-sm border hover:shadow-md transition-shadow duration-200 ${
      theme === 'dark'
        ? 'bg-gray-800 border-gray-700'
        : 'bg-white border-slate-200'
    }`}>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          {/* Product Image */}
          <div className="flex-shrink-0 self-center sm:self-start">
            <img
              src={product.image}
              alt={product.title}
              className="w-32 h-32 sm:w-24 sm:h-24 object-cover rounded-lg border border-slate-200"
            />
          </div>

          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className={`text-base sm:text-lg font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-slate-900'
                }`}>
                  {product.title}
                </h3>
                
                <p className={`text-sm mb-3 line-clamp-3 sm:line-clamp-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-slate-600'
                }`}>
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-1 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 sm:w-4 sm:h-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-slate-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className={`text-xs sm:text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-slate-600'
                  }`}>
                    {product.rating} ({product.reviews} reviews)
                  </span>
                </div>

                {/* Price and Source */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-2 sm:space-y-0">
                  <div>
                    <span className={`text-xl sm:text-2xl font-bold ${
                      theme === 'dark' ? 'text-white' : 'text-slate-900'
                    }`}>
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className={`ml-2 text-sm line-through ${
                        theme === 'dark' ? 'text-gray-500' : 'text-slate-500'
                      }`}>
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className={`text-sm ${
                      theme === 'dark' ? 'text-gray-400' : 'text-slate-500'
                    }`}>from</span>
                    <span className={`text-sm font-medium px-2 py-1 rounded ${
                      theme === 'dark'
                        ? 'text-gray-300 bg-gray-700'
                        : 'text-slate-700 bg-slate-100'
                    }`}>
                      {product.source}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="mt-4 flex justify-center sm:justify-end">
              <button className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
                <span>View Details</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;