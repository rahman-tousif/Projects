#!/bin/bash

echo "🚀 Starting ProConnect Development Server..."

# Kill any existing processes
echo "🔄 Stopping existing processes..."
pkill -f "npm run dev" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

# Start the development server
echo "🚀 Starting server..."
npm run dev

