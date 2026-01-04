'use client'

import { useState } from 'react'
import { Search, Video, Phone, MessageCircle, Star, Users, TrendingUp, Shield, Link as LinkIcon, DollarSign } from 'lucide-react'
import Link from 'next/link'

export default function HomePage() {
  const [socialLink, setSocialLink] = useState('')
  const [amount, setAmount] = useState('')
  const [generatedLink, setGeneratedLink] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)

  // Sample talent data for featured talents
  const featuredTalents = [
    {
      id: '1',
      handle: 'tonyhawk',
      name: 'Tony Hawk',
      followers: '12.5M',
      category: 'Athlete',
      rating: 4.9,
      reviews: 2847,
      services: [
        { type: 'Video Calls', minAmount: 200 },
        { type: 'Audio Calls', minAmount: 150 },
        { type: 'Personalized Messages', minAmount: 100 }
      ]
    },
    {
      id: '2',
      handle: 'demo-talent',
      name: 'Demo Talent',
      followers: '0',
      category: 'Other',
      rating: 0,
      reviews: 0,
      services: [
        { type: 'Video Calls', minAmount: 100 },
        { type: 'Audio Calls', minAmount: 75 },
        { type: 'Personalized Messages', minAmount: 50 }
      ]
    }
  ]

  const services = [
    {
      icon: Video,
      title: 'Video Calls',
      description: 'Face-to-face conversations with your favorite personalities',
      price: 'From $50'
    },
    {
      icon: Phone,
      title: 'Audio Calls',
      description: 'Voice conversations for a more personal touch',
      price: 'From $30'
    },
    {
      icon: MessageCircle,
      title: 'Personalized Messages',
      description: 'Custom video or audio messages just for you',
      price: 'From $25'
    }
  ]

  const handleGenerateLink = async (e: React.FormEvent) => {
    e.preventDefault()
    
    console.log('Form submitted!')
    console.log('Social Link:', socialLink)
    console.log('Amount:', amount)
    
    if (!socialLink || !amount) {
      alert('Please fill in both the social media link and amount')
      return
    }

    setIsGenerating(true)
    console.log('Starting link generation...')
    
    // Simulate API call delay
    setTimeout(() => {
      // Generate a unique booking link
      const bookingId = Math.random().toString(36).substr(2, 9)
      const generatedUrl = `${window.location.origin}/booking/${bookingId}?link=${encodeURIComponent(socialLink)}&amount=${amount}`
      
      console.log('Generated URL:', generatedUrl)
      setGeneratedLink(generatedUrl)
      setIsGenerating(false)
      console.log('Link generation complete!')
    }, 1500)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink)
    alert('Link copied to clipboard!')
  }

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">ProConnect</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#how-it-works" className="text-gray-600 hover:text-primary-600 transition-colors">
                How it Works
              </Link>
              <Link href="#talents" className="text-gray-600 hover:text-primary-600 transition-colors">
                Browse Talents
              </Link>
              <Link href="/login" className="text-gray-600 hover:text-primary-600 transition-colors">
                Login
              </Link>
              <Link href="/talent-dashboard" className="btn-primary">
                Become a Talent
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Connect with
            <span className="text-primary-600"> Social Talent</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Paste a social media profile link, set your budget, and get a personalized booking link instantly. 
            Connect with your favorite influencers, celebrities, and social media personalities.
          </p>
          
          {/* Link Generation Form */}
          <div className="max-w-2xl mx-auto mb-8">
            <form onSubmit={handleGenerateLink} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <LinkIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="url"
                    placeholder="Paste social media profile link..."
                    value={socialLink}
                    onChange={(e) => setSocialLink(e.target.value)}
                    className="input-field pl-12 text-lg"
                    required
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="number"
                    placeholder="Amount ($)"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="input-field pl-10 text-lg w-32"
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
              </div>
              
              <button
                type="submit"
                disabled={isGenerating}
                className="btn-primary text-lg px-8 py-4 w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? 'Generating Link...' : 'Generate Booking Link'}
              </button>
            </form>
          </div>

          {/* Generated Link Display */}
          {generatedLink && (
            <div className="max-w-2xl mx-auto mb-8">
              <div className="bg-white rounded-lg border-2 border-primary-200 p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Your Booking Link Generated! 🎉</h3>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={generatedLink}
                    readOnly
                    className="input-field flex-1 text-sm"
                  />
                  <button
                    onClick={copyToClipboard}
                    className="btn-secondary px-4 py-2 text-sm whitespace-nowrap"
                  >
                    Copy Link
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Share this link with the talent or use it to complete your booking
                </p>
              </div>
            </div>
          )}
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/talents" className="btn-secondary text-lg px-8 py-4">
              Browse All Talents
            </Link>
            <Link href="/talent-dashboard" className="btn-primary text-lg px-8 py-4">
              Become a Talent
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary-600">10,000+</div>
              <div className="text-gray-600">Verified Talents</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary-600">50,000+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary-600">$2M+</div>
              <div className="text-gray-600">Paid to Talents</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Experience
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Multiple ways to connect with your favorite personalities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="card text-center hover:shadow-xl transition-shadow duration-300">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <service.icon className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="text-2xl font-bold text-primary-600">{service.price}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Talents */}
      <section id="talents" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Featured Talents
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover amazing personalities ready to connect with you
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredTalents.map((talent) => (
              <div key={talent.id} className="card hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-full mr-4"></div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{talent.name}</h3>
                    <p className="text-gray-500">@{talent.handle}</p>
                    <p className="text-sm text-gray-400">{talent.followers} followers</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <span className="inline-block bg-primary-100 text-primary-800 text-sm px-3 py-1 rounded-full">
                    {talent.category}
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-gray-700">{talent.rating}</span>
                    <span className="text-gray-500 ml-1">({talent.reviews})</span>
                  </div>
                  <div className="text-2xl font-bold text-primary-600">
                    ${Math.min(...talent.services.map(s => s.minAmount))}
                  </div>
                </div>
                
                <Link href={`/profile/${talent.handle}`} className="btn-primary w-full block text-center">
                  View Profile
                </Link>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/talents" className="btn-secondary">
              View All Talents
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started in just three simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Paste Link & Set Amount</h3>
              <p className="text-gray-600">
                Paste any social media profile link and specify how much you want to pay
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Generate Booking Link</h3>
              <p className="text-gray-600">
                We'll instantly create a personalized booking link for you to share
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Connect & Book</h3>
              <p className="text-gray-600">
                Share the link with the talent and complete your booking when they're ready
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Connect?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Generate your first booking link and start connecting with your favorite social media personalities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/talent-dashboard" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Get Started Free
            </Link>
            <Link href="/talents" className="border-2 border-white text-white hover:bg-white hover:text-primary-600 font-medium py-3 px-8 rounded-lg transition-colors duration-200">
              Browse Talents
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-primary-400 mb-4">ProConnect</h3>
              <p className="text-gray-400">
                Connecting fans with their favorite social media personalities through personalized experiences.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/talents" className="hover:text-white transition-colors">Browse Talents</Link></li>
                <li><Link href="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
                <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
                <li><Link href="/safety" className="hover:text-white transition-colors">Safety</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white transition-colors">Help Center</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
                <li><Link href="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
                <li><Link href="/trust" className="hover:text-white transition-colors">Trust & Safety</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2024 ProConnect. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
