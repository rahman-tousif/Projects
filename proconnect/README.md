# ProConnect - Social Talent Booking Platform

A modern web application that connects fans with their favorite social media personalities, influencers, and celebrities through video calls, audio calls, and personalized messages.

## 🚀 Features

- **Homepage**: Beautiful landing page with hero section, features, and featured talents
- **Talent Discovery**: Browse and search for available social media personalities
- **User Authentication**: Sign up and login system for both fans and talents
- **Talent Profiles**: Detailed profiles with services, pricing, and reviews
- **Booking System**: Easy scheduling and booking of services
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Built with Tailwind CSS for a beautiful, professional look

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React for beautiful, consistent icons
- **TypeScript**: Full type safety and better development experience
- **Responsive**: Mobile-first design approach

## 📁 Project Structure

```
proconnect/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   ├── page.tsx           # Homepage
│   ├── talents/           # Talents listing and profiles
│   │   ├── page.tsx       # Browse talents page
│   │   └── [id]/          # Dynamic talent profile pages
│   │       └── page.tsx   # Individual talent profile
│   ├── signup/            # User registration
│   │   └── page.tsx       # Signup form
│   └── login/             # User authentication
│       └── page.tsx       # Login form
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd proconnect
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (#0ea5e9 to #0369a1)
- **Secondary**: Purple gradient (#d946ef to #a21caf)
- **Neutral**: Gray scale for text and backgrounds

### Components
- **Buttons**: Primary and secondary button styles
- **Cards**: Consistent card layouts with shadows
- **Forms**: Styled input fields and form elements
- **Navigation**: Clean navigation with hover effects

## 📱 Pages Overview

### 1. Homepage (`/`)
- Hero section with search functionality
- Featured talents showcase
- Services overview (Video calls, Audio calls, Messages)
- How it works section
- Statistics and social proof

### 2. Talents Listing (`/talents`)
- Grid view of available talents
- Advanced filtering (category, service type, price range)
- Search functionality
- Sorting options

### 3. Talent Profile (`/talents/[id]`)
- Detailed talent information
- Service selection and pricing
- Booking calendar and time slots
- Reviews and ratings
- Social media integration

### 4. User Authentication
- **Signup** (`/signup`): Account creation for fans and talents
- **Login** (`/login`): User authentication with social login options

## 🔮 Future Enhancements

### Backend Integration
- Firebase Authentication
- Firestore database for user profiles and bookings
- Real-time chat and video calling
- Payment processing with Stripe

### Additional Features
- User dashboard for managing bookings
- Talent dashboard for managing services
- Review and rating system
- Notification system
- Analytics and insights

### Mobile App
- React Native mobile application
- Push notifications
- Offline support

## 🎯 Key User Flows

### For Fans
1. Browse available talents
2. View talent profiles and services
3. Select service type and schedule
4. Complete payment
5. Receive confirmation and join session

### For Talents
1. Create profile and set services
2. Set availability and pricing
3. Receive booking requests
4. Conduct sessions
5. Earn money through platform

## 🚧 Development Notes

- The current implementation is frontend-only with mock data
- All forms include proper validation and error handling
- Responsive design works on all screen sizes
- TypeScript provides full type safety
- Tailwind CSS classes are organized and consistent

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support and questions, please open an issue in the GitHub repository or contact the development team.

---

**ProConnect** - Connecting fans with their favorite social media personalities through meaningful experiences.

