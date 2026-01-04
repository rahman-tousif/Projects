'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, DollarSign, MessageCircle, Video, Phone, Star, Users, MapPin, Heart, Share2, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

// Sample talent data - in a real app, this would come from an API
const sampleTalents = {
  'tonyhawk': {
    handle: 'tonyhawk',
    name: 'Tony Hawk',
    verified: true,
    bio: 'Professional skateboarder, entrepreneur, and philanthropist. Helping people achieve their dreams through skateboarding.',
    profileImage: '/api/placeholder/200/200',
    coverImage: '/api/placeholder/800/400',
    location: 'San Diego, CA',
    followers: '12.5M',
    rating: 4.9,
    reviews: 2847,
    category: 'Athlete',
    socialLinks: [
      { platform: 'Instagram', url: 'https://instagram.com/tonyhawk', icon: '📷' },
      { platform: 'Twitter', url: 'https://twitter.com/tonyhawk', icon: '🐦' },
      { platform: 'YouTube', url: 'https://youtube.com/tonyhawk', icon: '▶️' }
    ],
    services: [
      {
        type: 'Video Calls',
        description: 'Face-to-face video conversations about skateboarding, business, or life advice',
        minAmount: 200,
        duration: '30 min',
        available: true
      },
      {
        type: 'Audio Calls',
        description: 'Voice conversations for quick advice or motivation',
        minAmount: 150,
        duration: '20 min',
        available: true
      },
      {
        type: 'Personalized Messages',
        description: 'Custom video messages for special occasions',
        minAmount: 100,
        duration: '2-3 min',
        available: true
      }
    ],
    availability: {
      monday: ['9:00 AM', '2:00 PM', '7:00 PM'],
      tuesday: ['10:00 AM', '3:00 PM', '8:00 PM'],
      wednesday: ['9:00 AM', '2:00 PM', '7:00 PM'],
      thursday: ['10:00 AM', '3:00 PM', '8:00 PM'],
      friday: ['9:00 AM', '2:00 PM'],
      saturday: ['11:00 AM', '4:00 PM'],
      sunday: ['12:00 PM', '5:00 PM']
    },
    customLinks: [
      { title: 'Vert Alert - July 18/19 in SLC', url: 'https://vertalert.com', icon: '🛹' },
      { title: 'WAR CRY video', url: 'https://warcry.com', icon: '🎬' },
      { title: 'Bones Brigade Experience - NYC May 3, 2025', url: 'https://bonesbrigade.com', icon: '💀' },
      { title: 'New Birdhouse shirts & hoodies', url: 'https://birdhouse.com', icon: '👕' },
      { title: 'Birdhouse completes', url: 'https://birdhouse.com/completes', icon: '🛹' }
    ]
  },
  'demo-talent': {
    handle: 'demo-talent',
    name: 'Demo Talent',
    verified: false,
    bio: 'Tell your story...',
    profileImage: '',
    coverImage: '',
    location: '',
    followers: '0',
    rating: 0,
    reviews: 0,
    category: 'Other',
    socialLinks: [],
    services: [
      {
        type: 'Video Calls',
        description: 'Face-to-face video conversations',
        minAmount: 100,
        duration: '30 min',
        available: true
      },
      {
        type: 'Audio Calls',
        description: 'Voice conversations',
        minAmount: 75,
        duration: '20 min',
        available: true
      },
      {
        type: 'Personalized Messages',
        description: 'Custom video or audio messages',
        minAmount: 50,
        duration: '2-3 min',
        available: true
      }
    ],
    availability: {
      monday: [],
      tuesday: [],
      wednesday: [],
      thursday: [],
      friday: [],
      saturday: [],
      sunday: []
    },
    customLinks: []
  }
}

export default function TalentProfilePage() {
  const [talent, setTalent] = useState<any>(null)
  const [showChat, setShowChat] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    // Get handle from URL path - more reliable method
    const getHandleFromUrl = () => {
      const path = window.location.pathname
      const parts = path.split('/')
      return parts[parts.length - 1]
    }
    
    const handle = getHandleFromUrl()
    console.log('Current handle:', handle) // Debug log
    
    if (handle) {
      // Load talent data based on handle
      const talentData = sampleTalents[handle as keyof typeof sampleTalents]
      console.log('Found talent data:', talentData) // Debug log
      if (talentData) {
        setTalent(talentData)
      }
    }
  }, [])

  const handleBooking = (service: any) => {
    // In a real app, this would redirect to the booking page
    console.log('Booking service:', service)
    alert(`Booking ${service.type} for $${service.minAmount}`)
  }

  const handleChat = () => {
    setShowChat(true)
  }

  // If no talent found, show error
  if (!talent) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h1>
          <p className="text-gray-600 mb-6">This talent profile doesn't exist yet.</p>
          <Link href="/" className="btn-primary">
            Go Back Home
          </Link>
        </div>
      </div>
    )
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
            <div className="flex items-center space-x-4">
              <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors flex items-center">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Cover Image */}
      <div className="relative h-64 md:h-96 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        
        {/* Profile Picture Overlay */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
          <div className="w-24 h-24 md:w-32 md:h-32 bg-white rounded-full border-4 border-white shadow-lg">
            <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center text-4xl">
              🛹
            </div>
          </div>
        </div>
      </div>

      {/* Profile Info */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
        <div className="flex items-center justify-center mb-2">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mr-3">{talent.name}</h1>
          {talent.verified && (
            <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        <p className="text-xl text-gray-600 mb-4">@{talent.handle}</p>
        <p className="text-gray-700 mb-6 leading-relaxed">{talent.bio}</p>
        
        {/* Stats */}
        <div className="flex items-center justify-center space-x-8 mb-6">
          <div className="text-center">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-lg font-semibold text-gray-900">{talent.followers}</span>
            </div>
            <p className="text-sm text-gray-500">Followers</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center">
              <Star className="w-5 h-5 text-yellow-400 fill-current mr-2" />
              <span className="text-lg font-semibold text-gray-900">{talent.rating}</span>
            </div>
            <p className="text-sm text-gray-500">{talent.reviews} Reviews</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-lg font-semibold text-gray-900">{talent.location}</span>
            </div>
            <p className="text-sm text-gray-500">Location</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-center space-x-4 mb-8">
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

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        {/* Services Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Book a Session</h2>
          
          <div className="space-y-4">
            {talent.services.filter((service: any) => service.available).map((service: any, index: number) => (
              <div key={index} className="card hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4">
                      {service.type === 'Video Calls' && <Video className="w-6 h-6 text-primary-600" />}
                      {service.type === 'Audio Calls' && <Phone className="w-6 h-6 text-primary-600" />}
                      {service.type === 'Personalized Messages' && <MessageCircle className="w-6 h-6 text-primary-600" />}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{service.type}</h3>
                      <p className="text-sm text-gray-500">{service.duration}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary-600">${service.minAmount}</div>
                    <div className="text-sm text-gray-500">Minimum</div>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <button
                  onClick={() => handleBooking(service)}
                  className="btn-primary w-full"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Links Section */}
        {talent.customLinks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Links & Events</h2>
            
            <div className="space-y-3">
              {talent.customLinks.map((link: any, index: number) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow text-left"
                >
                  <div className="flex items-center">
                    <span className="text-2xl mr-4">{link.icon}</span>
                    <span className="text-gray-900 font-medium">{link.title}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Social Links */}
        {talent.socialLinks.length > 0 && (
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Follow Me</h2>
            
            <div className="grid grid-cols-3 gap-4">
              {talent.socialLinks.map((social: any, index: number) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-shadow text-center"
                >
                  <div className="text-2xl mb-2">{social.icon}</div>
                  <div className="text-sm text-gray-700">{social.platform}</div>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Chat Section */}
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center">Get in Touch</h2>
          <p className="text-gray-600 text-center mb-6">
            Have a question? Want to discuss a custom project? Send me a message!
          </p>
          
          <button
            onClick={handleChat}
            className="btn-primary w-full"
          >
            <MessageCircle className="w-5 h-5 mr-2" />
            Start Chat
          </button>
        </div>
      </div>

      {/* Chat Modal */}
      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Chat with {talent.name}</h3>
              <button
                onClick={() => setShowChat(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            
            <div className="p-4">
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <p className="text-sm text-gray-600">
                  💬 Hi! I'm interested in connecting with you. What would you like to discuss?
                </p>
              </div>
              
              <textarea
                placeholder="Type your message..."
                rows={3}
                className="input-field w-full mb-4"
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowChat(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
                <button className="btn-primary flex-1">
                  Send Message
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
