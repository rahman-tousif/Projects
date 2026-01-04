'use client'

import { useState } from 'react'
import { Star, Users, MapPin, Calendar, Clock, Video, Phone, MessageCircle, Heart, Share2, Check } from 'lucide-react'
import Link from 'next/link'

export default function TalentProfilePage({ params }: { params: { id: string } }) {
  const [selectedService, setSelectedService] = useState('Video Calls')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isFavorite, setIsFavorite] = useState(false)

  // Mock talent data - in a real app, this would come from an API
  const talent = {
    id: params.id,
    name: 'Alex Chen',
    handle: '@alexchen',
    followers: '2.1M',
    category: 'Tech Influencer',
    location: 'San Francisco, CA',
    avatar: '/api/placeholder/200/200',
    coverImage: '/api/placeholder/800/400',
    bio: 'Tech entrepreneur and content creator helping people build successful online businesses. I\'ve helped over 10,000 people start their online journey and I\'m passionate about sharing knowledge and experiences.',
    rating: 4.9,
    reviews: 127,
    verified: true,
    services: [
      {
        type: 'Video Calls',
        price: 150,
        duration: '30 min',
        description: 'Face-to-face video conversations where we can discuss your tech questions, business strategy, or just have a casual chat about entrepreneurship.'
      },
      {
        type: 'Audio Calls',
        price: 100,
        duration: '30 min',
        description: 'Voice conversations perfect for quick advice, brainstorming sessions, or when you prefer audio over video.'
      },
      {
        type: 'Personalized Messages',
        price: 75,
        duration: '2-3 min',
        description: 'Custom video or audio messages for special occasions, motivation, or personalized advice.'
      }
    ],
    availability: [
      { day: 'Monday', slots: ['9:00 AM', '2:00 PM', '7:00 PM'] },
      { day: 'Tuesday', slots: ['10:00 AM', '3:00 PM', '8:00 PM'] },
      { day: 'Wednesday', slots: ['9:00 AM', '2:00 PM', '7:00 PM'] },
      { day: 'Thursday', slots: ['10:00 AM', '3:00 PM', '8:00 PM'] },
      { day: 'Friday', slots: ['9:00 AM', '2:00 PM'] },
      { day: 'Saturday', slots: ['11:00 AM', '4:00 PM'] },
      { day: 'Sunday', slots: ['12:00 PM', '5:00 PM'] }
    ],
    recentReviews: [
      {
        id: 1,
        user: 'Sarah M.',
        rating: 5,
        comment: 'Alex was incredibly helpful! His advice on starting my tech business was invaluable. Highly recommend!',
        date: '2 days ago'
      },
      {
        id: 2,
        user: 'Mike R.',
        rating: 5,
        comment: 'Great conversation about scaling my startup. Alex really knows his stuff and is very approachable.',
        date: '1 week ago'
      },
      {
        id: 3,
        user: 'Emma L.',
        rating: 4,
        comment: 'Very knowledgeable and friendly. The video call was exactly what I needed to get unstuck.',
        date: '2 weeks ago'
      }
    ]
  }

  const selectedServiceData = talent.services.find(s => s.type === selectedService)

  const handleBooking = () => {
    // Handle booking logic here
    console.log('Booking:', {
      talentId: talent.id,
      service: selectedService,
      date: selectedDate,
      time: selectedTime
    })
  }

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
              <Link href="/talents" className="text-gray-600 hover:text-primary-600 transition-colors">
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

      {/* Cover Image */}
      <div className="relative h-64 md:h-96 bg-gradient-to-r from-primary-600 to-secondary-600">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{talent.name}</h1>
            <p className="text-xl md:text-2xl opacity-90">{talent.handle}</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Header */}
            <div className="card">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mr-6"></div>
                  <div>
                    <div className="flex items-center mb-2">
                      <h2 className="text-2xl font-bold text-gray-900 mr-3">{talent.name}</h2>
                      {talent.verified && (
                        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                    <p className="text-gray-600 text-lg">{talent.handle}</p>
                    <p className="text-gray-500">{talent.category}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className={`p-3 rounded-full border-2 transition-colors ${
                      isFavorite 
                        ? 'border-red-500 bg-red-50 text-red-500' 
                        : 'border-gray-300 text-gray-400 hover:border-red-300 hover:text-red-400'
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-3 rounded-full border-2 border-gray-300 text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Users className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-2xl font-bold text-gray-900">{talent.followers}</span>
                  </div>
                  <p className="text-gray-500">Followers</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
                    <span className="text-2xl font-bold text-gray-900">{talent.rating}</span>
                  </div>
                  <p className="text-gray-500">{talent.reviews} Reviews</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-2">
                    <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                    <span className="text-lg font-medium text-gray-900">{talent.location}</span>
                  </div>
                  <p className="text-gray-500">Location</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">About</h3>
                <p className="text-gray-600 leading-relaxed">{talent.bio}</p>
              </div>
            </div>

            {/* Services */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Services & Pricing</h3>
              <div className="space-y-4">
                {talent.services.map((service) => (
                  <div
                    key={service.type}
                    onClick={() => setSelectedService(service.type)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedService === service.type
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                          {service.type === 'Video Calls' && <Video className="w-6 h-6 text-primary-600" />}
                          {service.type === 'Audio Calls' && <Phone className="w-6 h-6 text-primary-600" />}
                          {service.type === 'Personalized Messages' && <MessageCircle className="w-6 h-6 text-primary-600" />}
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{service.type}</h4>
                          <p className="text-sm text-gray-500">{service.duration}</p>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-primary-600">${service.price}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-900">Reviews</h3>
                <Link href="#" className="text-primary-600 hover:text-primary-700 font-medium">
                  View all {talent.reviews} reviews
                </Link>
              </div>
              <div className="space-y-6">
                {talent.recentReviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gray-200 rounded-full mr-3"></div>
                        <div>
                          <p className="font-medium text-gray-900">{review.user}</p>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <span className="text-sm text-gray-500">{review.date}</span>
                    </div>
                    <p className="text-gray-600">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="card sticky top-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Book a Session</h3>
              
              {selectedServiceData && (
                <div className="mb-6 p-4 bg-primary-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900">{selectedServiceData.type}</h4>
                    <span className="text-2xl font-bold text-primary-600">${selectedServiceData.price}</span>
                  </div>
                  <p className="text-sm text-gray-600">{selectedServiceData.duration}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Date</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Select Time</label>
                  <select
                    value={selectedTime}
                    onChange={(e) => setSelectedTime(e.target.value)}
                    className="input-field"
                  >
                    <option value="">Choose a time</option>
                    {selectedDate && talent.availability
                      .find(day => day.day === new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long' }))
                      ?.slots.map(slot => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                  </select>
                </div>

                <button
                  onClick={handleBooking}
                  disabled={!selectedDate || !selectedTime}
                  className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Book Now - ${selectedServiceData?.price || 0}
                </button>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">What's included:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Secure payment processing</li>
                  <li>• 24/7 customer support</li>
                  <li>• Money-back guarantee</li>
                  <li>• Instant confirmation</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

