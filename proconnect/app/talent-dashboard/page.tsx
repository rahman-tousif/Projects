'use client'

import { useState, useEffect } from 'react'
import { Plus, Edit, Save, Clock, DollarSign, MessageCircle, Image, Link as LinkIcon, Calendar, Settings } from 'lucide-react'
import Link from 'next/link'
import { TalentProfile, saveTalentProfile, createTalentProfile, getTalentByHandle } from '../../lib/data'

export default function TalentDashboardPage() {
  const [profileData, setProfileData] = useState<TalentProfile | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [isLoading, setIsLoading] = useState(true)

  // Load profile data on component mount
  useEffect(() => {
    // For demo purposes, we'll create a new profile if none exists
    // In a real app, this would check if the user is logged in and load their profile
    const existingProfile = getTalentByHandle('demo-talent')
    if (existingProfile) {
      setProfileData(existingProfile)
    } else {
      // Create a new demo profile
      const newProfile = createTalentProfile('demo-talent', 'Demo Talent')
      setProfileData(newProfile)
    }
    setIsLoading(false)
  }, [])

  const handleSave = () => {
    if (profileData) {
      saveTalentProfile(profileData)
      setIsEditing(false)
      alert('Profile saved successfully!')
    }
  }

  const addCustomLink = () => {
    if (profileData) {
      setProfileData(prev => prev ? ({
        ...prev,
        customLinks: [...prev.customLinks, { title: 'New Link', url: '', icon: '🔗' }]
      }) : null)
    }
  }

  const updateCustomLink = (index: number, field: string, value: string) => {
    if (profileData) {
      setProfileData(prev => prev ? ({
        ...prev,
        customLinks: prev.customLinks.map((link, i) => 
          i === index ? { ...link, [field]: value } : link
        )
      }) : null)
    }
  }

  const removeCustomLink = (index: number) => {
    if (profileData) {
      setProfileData(prev => prev ? ({
        ...prev,
        customLinks: prev.customLinks.filter((_, i) => i !== index)
      }) : null)
    }
  }

  const updateAvailability = (day: string, timeSlots: string[]) => {
    if (profileData) {
      setProfileData(prev => prev ? ({
        ...prev,
        availability: { ...prev.availability, [day]: timeSlots }
      }) : null)
    }
  }

  if (isLoading || !profileData) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
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
              <button
                onClick={handleSave}
                className="btn-primary flex items-center"
              >
                <Save className="w-4 h-4 mr-2" />
                Save Profile
              </button>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="btn-secondary flex items-center"
              >
                <Edit className="w-4 h-4 mr-2" />
                {isEditing ? 'Cancel Edit' : 'Edit Profile'}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Talent Dashboard</h1>
          <p className="text-xl text-gray-600">Customize your profile page and manage your services</p>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-white p-1 rounded-lg shadow-sm mb-8">
          {[
            { id: 'profile', label: 'Profile', icon: Image },
            { id: 'services', label: 'Services & Pricing', icon: DollarSign },
            { id: 'availability', label: 'Availability', icon: Clock },
            { id: 'links', label: 'Custom Links', icon: LinkIcon },
            { id: 'chat', label: 'Chat Settings', icon: MessageCircle }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <tab.icon className="w-4 h-4 mr-2" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Profile Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => prev ? ({ ...prev, name: e.target.value }) : null)}
                    disabled={!isEditing}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Handle</label>
                  <input
                    type="text"
                    value={profileData.handle}
                    onChange={(e) => setProfileData(prev => prev ? ({ ...prev, handle: e.target.value }) : null)}
                    disabled={!isEditing}
                    className="input-field"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    rows={4}
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => prev ? ({ ...prev, bio: e.target.value }) : null)}
                    disabled={!isEditing}
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    value={profileData.location}
                    onChange={(e) => setProfileData(prev => prev ? ({ ...prev, location: e.target.value }) : null)}
                    disabled={!isEditing}
                    className="input-field"
                    placeholder="e.g., San Diego, CA"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Followers</label>
                  <input
                    type="text"
                    value={profileData.followers}
                    onChange={(e) => setProfileData(prev => prev ? ({ ...prev, followers: e.target.value }) : null)}
                    disabled={!isEditing}
                    className="input-field"
                    placeholder="e.g., 1.2M"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Profile Image</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      {profileData.profileImage ? '✓' : <Image className="w-8 h-8 text-gray-400" />}
                    </div>
                    {isEditing && (
                      <button className="btn-secondary">Upload Image</button>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Cover Image</label>
                  <div className="flex items-center space-x-4">
                    <div className="w-32 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                      {profileData.coverImage ? '✓' : <Image className="w-8 h-8 text-gray-400" />}
                    </div>
                    {isEditing && (
                      <button className="btn-secondary">Upload Image</button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Services Tab */}
          {activeTab === 'services' && (
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Services & Pricing</h2>
              
              <div className="space-y-6">
                {profileData.services.map((service, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                        <input
                          type="text"
                          value={service.type}
                          onChange={(e) => {
                            const newServices = [...profileData.services]
                            newServices[index].type = e.target.value
                            setProfileData(prev => prev ? ({ ...prev, services: newServices }) : null)
                          }}
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Min Amount ($)</label>
                        <input
                          type="number"
                          value={service.minAmount}
                          onChange={(e) => {
                            const newServices = [...profileData.services]
                            newServices[index].minAmount = parseInt(e.target.value)
                            setProfileData(prev => prev ? ({ ...prev, services: newServices }) : null)
                          }}
                          disabled={!isEditing}
                          className="input-field"
                          min="1"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                        <input
                          type="text"
                          value={service.duration}
                          onChange={(e) => {
                            const newServices = [...profileData.services]
                            newServices[index].duration = e.target.value
                            setProfileData(prev => prev ? ({ ...prev, services: newServices }) : null)
                          }}
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                      
                      <div className="flex items-end">
                        <label className="flex items-center">
                          <input
                            type="checkbox"
                            checked={service.available}
                            onChange={(e) => {
                              const newServices = [...profileData.services]
                              newServices[index].available = e.target.checked
                              setProfileData(prev => prev ? ({ ...prev, services: newServices }) : null)
                            }}
                            disabled={!isEditing}
                            className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                          />
                          <span className="ml-2 text-sm text-gray-700">Available</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                      <textarea
                        rows={2}
                        value={service.description}
                        onChange={(e) => {
                          const newServices = [...profileData.services]
                          newServices[index].description = e.target.value
                          setProfileData(prev => prev ? ({ ...prev, services: newServices }) : null)
                        }}
                        disabled={!isEditing}
                        className="input-field"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Availability Tab */}
          {activeTab === 'availability' && (
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Availability & Time Slots</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-4">
                {Object.entries(profileData.availability).map(([day, timeSlots]) => (
                  <div key={day} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-gray-900 mb-3 capitalize">{day}</h3>
                    
                    {isEditing ? (
                      <div className="space-y-2">
                        {timeSlots.map((time, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <input
                              type="time"
                              value={time}
                              onChange={(e) => {
                                const newSlots = [...timeSlots]
                                newSlots[index] = e.target.value
                                updateAvailability(day, newSlots)
                              }}
                              className="input-field text-sm"
                            />
                            <button
                              onClick={() => {
                                const newSlots = timeSlots.filter((_, i) => i !== index)
                                updateAvailability(day, newSlots)
                              }}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newSlots = [...timeSlots, '12:00']
                            updateAvailability(day, newSlots)
                          }}
                          className="text-primary-600 hover:text-primary-700 text-sm"
                        >
                          + Add Time
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-1">
                        {timeSlots.map((time, index) => (
                          <div key={index} className="text-sm text-gray-600">{time}</div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Custom Links Tab */}
          {activeTab === 'links' && (
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900">Custom Links</h2>
                {isEditing && (
                  <button
                    onClick={addCustomLink}
                    className="btn-primary flex items-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Link
                  </button>
                )}
              </div>
              
              <div className="space-y-4">
                {profileData.customLinks.map((link, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                        <input
                          type="text"
                          value={link.icon}
                          onChange={(e) => updateCustomLink(index, 'icon', e.target.value)}
                          disabled={!isEditing}
                          className="input-field"
                          placeholder="🛹"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                        <input
                          type="text"
                          value={link.title}
                          onChange={(e) => updateCustomLink(index, 'title', e.target.value)}
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">URL</label>
                        <input
                          type="url"
                          value={link.url}
                          onChange={(e) => updateCustomLink(index, 'url', e.target.value)}
                          disabled={!isEditing}
                          className="input-field"
                        />
                      </div>
                    </div>
                    
                    {isEditing && (
                      <div className="mt-4 flex justify-end">
                        <button
                          onClick={() => removeCustomLink(index)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          Remove Link
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Chat Settings Tab */}
          {activeTab === 'chat' && (
            <div className="card">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Chat & Communication Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Auto-Reply Messages</label>
                  <textarea
                    rows={4}
                    placeholder="Set automatic replies for common questions..."
                    className="input-field"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Response Time</label>
                  <select className="input-field">
                    <option>Within 1 hour</option>
                    <option>Within 4 hours</option>
                    <option>Within 24 hours</option>
                    <option>Within 48 hours</option>
                  </select>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="auto-approve"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                  />
                  <label htmlFor="auto-approve" className="ml-2 text-sm text-gray-700">
                    Auto-approve chat requests from verified users
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Preview Button */}
        <div className="mt-12 text-center">
          <Link
            href={`/profile/${profileData.handle}`}
            className="btn-primary text-lg px-8 py-4"
          >
            Preview My Profile Page
          </Link>
        </div>
      </div>
    </div>
  )
}
