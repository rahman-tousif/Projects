'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Link as LinkIcon, DollarSign, Calendar, Clock, Video, Phone, MessageCircle, Check, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function BookingPage({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams()
  const [selectedService, setSelectedService] = useState('Video Calls')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  
  const socialLink = searchParams.get('link')
  const amount = searchParams.get('amount')

  const services = [
    {
      type: 'Video Calls',
      icon: Video,
      description: 'Face-to-face video conversations',
      priceMultiplier: 1.0
    },
    {
      type: 'Audio Calls',
      icon: Phone,
      description: 'Voice conversations',
      priceMultiplier: 0.7
    },
    {
      type: 'Personalized Messages',
      icon: MessageCircle,
      description: 'Custom video or audio messages',
      priceMultiplier: 0.5
    }
  ]

  const selectedServiceData = services.find(s => s.type === selectedService)
  const calculatedPrice = selectedServiceData ? parseFloat(amount || '0') * selectedServiceData.priceMultiplier : 0

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM',
    '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'
  ]

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!selectedDate || !selectedTime) {
      alert('Please select both date and time')
      return
    }

    setIsProcessing(true)
    
    // Simulate booking processing
    setTimeout(() => {
      alert('Booking submitted successfully! The talent will be notified and can accept your request.')
      setIsProcessing(false)
    }, 2000)
  }

  if (!socialLink || !amount) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Booking Link</h1>
          <p className="text-gray-600 mb-6">This booking link is missing required information.</p>
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Complete Your Booking</h1>
          <p className="text-xl text-gray-600">You're one step away from connecting with your favorite personality</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Booking Details</h2>
              
              <form onSubmit={handleBooking} className="space-y-6">
                {/* Service Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">Select Service Type</label>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {services.map((service) => (
                      <div
                        key={service.type}
                        onClick={() => setSelectedService(service.type)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          selectedService === service.type
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-center">
                          <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <service.icon className="w-6 h-6 text-primary-600" />
                          </div>
                          <h3 className="font-semibold text-gray-900">{service.type}</h3>
                          <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                          <p className="text-sm text-primary-600 font-medium mt-2">
                            {service.priceMultiplier === 1.0 ? 'Full Price' : 
                             service.priceMultiplier === 0.7 ? '70% of Amount' : '50% of Amount'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Date and Time Selection */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Select Date
                    </label>
                    <input
                      id="date"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="input-field"
                      min={new Date().toISOString().split('T')[0]}
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Select Time
                    </label>
                    <select
                      id="time"
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      className="input-field"
                      required
                    >
                      <option value="">Choose a time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot} value={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message to Talent (Optional)
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="input-field"
                    placeholder="Tell the talent what you'd like to discuss or any special requests..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing Booking...' : 'Complete Booking'}
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Profile Information */}
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Profile Information</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <LinkIcon className="w-5 h-5 text-gray-400 mr-3" />
                  <div className="flex-1">
                    <p className="text-sm text-gray-500">Social Profile</p>
                    <a 
                      href={socialLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-primary-600 hover:text-primary-700 text-sm break-all"
                    >
                      {socialLink}
                    </a>
                  </div>
                </div>
                <div className="flex items-center">
                  <DollarSign className="w-5 h-5 text-gray-400 mr-3" />
                  <div>
                    <p className="text-sm text-gray-500">Your Budget</p>
                    <p className="font-semibold text-gray-900">${amount}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="card mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Type:</span>
                  <span className="font-medium">{selectedService}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Your Budget:</span>
                  <span className="font-medium">${amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Price:</span>
                  <span className="font-medium">${calculatedPrice.toFixed(2)}</span>
                </div>
                <hr className="my-3" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span className="text-primary-600">${calculatedPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* What's Included */}
            <div className="card">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What's Included</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Secure payment processing
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  24/7 customer support
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Money-back guarantee
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Instant confirmation
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  Talent verification
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

