// Simple in-memory data store for now
// In a real app, this would be replaced with Firebase, database, etc.

export interface TalentProfile {
  id: string
  handle: string
  name: string
  verified: boolean
  bio: string
  profileImage: string
  coverImage: string
  location: string
  followers: string
  rating: number
  reviews: number
  category: string
  socialLinks: Array<{
    platform: string
    url: string
    icon: string
  }>
  services: Array<{
    type: string
    description: string
    minAmount: number
    duration: string
    available: boolean
  }>
  availability: {
    [key: string]: string[]
  }
  customLinks: Array<{
    title: string
    url: string
    icon: string
  }>
}

// Sample data
const sampleTalent: TalentProfile = {
  id: '1',
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
}

const demoTalent: TalentProfile = {
  id: '2',
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

// Initialize data store
let talentProfiles: TalentProfile[] = []

// Initialize data on both server and client
if (typeof window === 'undefined') {
  // Server-side: initialize with sample data
  talentProfiles = [sampleTalent, demoTalent]
} else {
  // Client-side: try to load from localStorage or initialize with sample data
  try {
    const stored = localStorage.getItem('proconnect-talents')
    if (stored) {
      talentProfiles = JSON.parse(stored)
    } else {
      talentProfiles = [sampleTalent, demoTalent]
      localStorage.setItem('proconnect-talents', JSON.stringify(talentProfiles))
    }
  } catch (error) {
    console.error('Error loading talents from localStorage:', error)
    talentProfiles = [sampleTalent, demoTalent]
  }
}

// Data management functions
export const getTalentByHandle = (handle: string): TalentProfile | null => {
  return talentProfiles.find(talent => talent.handle === handle) || null
}

export const getAllTalents = (): TalentProfile[] => {
  return talentProfiles
}

export const saveTalentProfile = (profile: TalentProfile): void => {
  const existingIndex = talentProfiles.findIndex(t => t.id === profile.id)
  if (existingIndex >= 0) {
    talentProfiles[existingIndex] = profile
  } else {
    talentProfiles.push(profile)
  }
  
  // Save to localStorage on client-side
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('proconnect-talents', JSON.stringify(talentProfiles))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
  
  console.log('Profile saved:', profile)
}

export const createTalentProfile = (handle: string, name: string): TalentProfile => {
  const newProfile: TalentProfile = {
    id: Math.random().toString(36).substr(2, 9),
    handle,
    name,
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
  
  talentProfiles.push(newProfile)
  
  // Save to localStorage on client-side
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('proconnect-talents', JSON.stringify(talentProfiles))
    } catch (error) {
      console.error('Error saving to localStorage:', error)
    }
  }
  
  return newProfile
}
