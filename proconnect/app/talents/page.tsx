'use client'

import { useState } from 'react'
import { Search, Filter, Star, MapPin, Users, Video, Phone, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import { getAllTalents } from '@/lib/data'

export default function TalentsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedService, setSelectedService] = useState('all')
  const [priceRange, setPriceRange] = useState([0, 1000])

  const categories = [
    'All Categories',
    'Tech Influencer',
    'Fitness Coach',
    'Comedian',
    'Musician',
    'Artist',
    'Business Coach',
    'Lifestyle',
    'Gaming',
    'Education'
  ]

  const services = [
    'All Services',
    'Video Calls',
    'Audio Calls',
    'Personalized Messages'
  ]

  const talents = getAllTalents()

  const filteredTalents = talents.filter(talent => {
    const matchesSearch = talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         talent.handle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         talent.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = selectedCategory === 'all' || talent.category === selectedCategory
    
    const matchesService = selectedService === 'all' || talent.services.some(s => s.type === selectedService)
    
    const minPrice = Math.min(...talent.services.map(s => s.minAmount))
    const matchesPrice = minPrice >= priceRange[0] && minPrice <= priceRange[1]
    
    return matchesSearch && matchesCategory && matchesService && matchesPrice
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">ProConnect</Link>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">
                Home
              </Link>
              <Link href="/talents" className="text-primary-600 font-medium">
                Browse Talents
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                Login
              </Link>
              <Link href="/signup" className="btn-primary">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Browse Talents</h1>
          <p className="text-xl text-gray-600">Discover amazing personalities ready to connect with you</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Filters</h3>
              
              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search talents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-10 text-sm"
                  />
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="input-field text-sm"
                >
                  {categories.map((category) => (
                    <option key={category} value={category === 'All Categories' ? 'all' : category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* Service Filter */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                <select
                  value={selectedService}
                  onChange={(e) => setSelectedService(e.target.value)}
                  className="input-field text-sm"
                >
                  {services.map((service) => (
                    <option key={service} value={service === 'All Services' ? 'all' : service}>
                      {service}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>

              {/* Clear Filters */}
              <button
                onClick={() => {
                  setSearchQuery('')
                  setSelectedCategory('all')
                  setSelectedService('all')
                  setPriceRange([0, 1000])
                }}
                className="w-full text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                Clear All Filters
              </button>
            </div>
          </div>

          {/* Talents Grid */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                Showing {filteredTalents.length} of {talents.length} talents
              </p>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-500">Sort by:</span>
                <select className="text-sm border border-gray-300 rounded-lg px-3 py-1">
                  <option>Most Popular</option>
                  <option>Highest Rated</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredTalents.map((talent) => (
                <div key={talent.id} className="card hover:shadow-xl transition-shadow duration-300">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gray-200 rounded-full mr-3"></div>
                      <div>
                        <div className="flex items-center">
                          <h3 className="text-lg font-semibold text-gray-900">{talent.name}</h3>
                          {talent.verified && (
                            <div className="ml-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        <p className="text-gray-500 text-sm">{talent.handle}</p>
                      </div>
                    </div>
                  </div>

                  {/* Bio */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{talent.bio}</p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="w-4 h-4 mr-1" />
                      {talent.followers}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      {talent.location}
                    </div>
                  </div>

                  {/* Services */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {talent.services.map((service) => (
                        <span key={service.type} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                          {service.type === 'Video Calls' && <Video className="w-3 h-3 mr-1" />}
                          {service.type === 'Audio Calls' && <Phone className="w-3 h-3 mr-1" />}
                          {service.type === 'Personalized Messages' && <MessageCircle className="w-3 h-3 mr-1" />}
                          {service.type}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Rating and Price */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="ml-1 text-gray-700 font-medium">{talent.rating}</span>
                      <span className="text-gray-500 ml-1">({talent.reviews})</span>
                    </div>
                    <div className="text-2xl font-bold text-primary-600">${Math.min(...talent.services.map(s => s.minAmount))}</div>
                  </div>

                  {/* Action Button */}
                  <button className="btn-primary w-full">
                    Book Now
                  </button>
                </div>
              ))}
            </div>

            {filteredTalents.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No talents found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={() => {
                    setSearchQuery('')
                    setSelectedCategory('all')
                    setSelectedService('all')
                    setPriceRange([0, 1000])
                  }}
                  className="btn-secondary"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
