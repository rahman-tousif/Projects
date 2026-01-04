import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'ProConnect - Connect with Social Talent',
  description: 'Book video calls, audio calls, and personalized messages from your favorite social media personalities and influencers.',
  keywords: 'social talent, video calls, audio calls, influencer booking, cameo alternative',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  )
}

