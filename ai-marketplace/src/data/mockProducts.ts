import type { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    title: 'Apple iPhone 15 Pro Max',
    description: 'The most advanced iPhone ever with titanium design and 48MP camera system for stunning photos and videos.',
    price: 1199,
    originalPrice: 1299,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.8,
    reviews: 1247,
    source: 'Apple Store',
    category: 'Electronics',
    brand: 'Apple'
  },
  {
    id: '2',
    title: 'Samsung Galaxy S24 Ultra',
    description: 'Premium Android smartphone with S Pen, 200MP camera, and AI-powered features for enhanced productivity.',
    price: 1099,
    image: 'https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.7,
    reviews: 892,
    source: 'Samsung',
    category: 'Electronics',
    brand: 'Samsung'
  },
  {
    id: '3',
    title: 'Sony WH-1000XM5 Headphones',
    description: 'Industry-leading noise canceling wireless headphones with 30-hour battery life and premium sound quality.',
    price: 349,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.9,
    reviews: 2156,
    source: 'Amazon',
    category: 'Electronics',
    brand: 'Sony'
  },
  {
    id: '4',
    title: 'Nike Air Max 270',
    description: 'Comfortable running shoes with Max Air unit for exceptional cushioning and modern athletic style.',
    price: 150,
    image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.5,
    reviews: 743,
    source: 'Nike',
    category: 'Sports',
    brand: 'Nike'
  },
  {
    id: '5',
    title: 'Dell XPS 13 Laptop',
    description: 'Ultra-portable laptop with 13.4" InfinityEdge display, Intel Core i7 processor, and all-day battery life.',
    price: 1299,
    originalPrice: 1499,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.6,
    reviews: 654,
    source: 'Dell',
    category: 'Electronics',
    brand: 'Dell'
  },
  {
    id: '6',
    title: 'Amazon Echo Dot (5th Gen)',
    description: 'Smart speaker with improved audio, built-in hub, and Alexa voice assistant for smart home control.',
    price: 49,
    originalPrice: 59,
    image: 'https://images.pexels.com/photos/8005456/pexels-photo-8005456.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.4,
    reviews: 3421,
    source: 'Amazon',
    category: 'Electronics',
    brand: 'Amazon'
  },
  {
    id: '7',
    title: 'The Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness. A fascinating exploration of how psychology affects financial decisions.',
    price: 16,
    originalPrice: 20,
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.7,
    reviews: 1876,
    source: 'Amazon',
    category: 'Books',
    brand: 'Amazon'
  },
  {
    id: '8',
    title: 'Indoor Plant Collection',
    description: 'Set of 3 low-maintenance houseplants perfect for beginners. Includes snake plant, pothos, and spider plant.',
    price: 89,
    image: 'https://images.pexels.com/photos/1974927/pexels-photo-1974927.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.3,
    reviews: 234,
    source: 'Home Depot',
    category: 'Home & Garden',
    brand: 'Home Depot'
  }
];