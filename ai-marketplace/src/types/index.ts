export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  source: string;
  category: string;
  brand: string;
}

export interface Filters {
  category: string;
  priceRange: [number, number];
  brand: string;
  sortBy: 'popularity' | 'price-low-high' | 'price-high-low';
}