#!/bin/bash

echo "🚀 Starting ProConnect Build Process..."

# Kill any existing processes
echo "🔄 Stopping existing processes..."
pkill -f "npm run dev" 2>/dev/null
pkill -f "next dev" 2>/dev/null
sleep 2

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf .next 2>/dev/null
rm -rf node_modules/.cache 2>/dev/null

# Install dependencies if needed
echo "📦 Checking dependencies..."
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Build the application
echo "🔨 Building application..."
npm run build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "✅ Build successful!"
    
    # Start the development server
    echo "🚀 Starting development server..."
    npm run dev &
    
    # Wait for server to start
    echo "⏳ Waiting for server to start..."
    sleep 5
    
    # Check if server is running
    if curl -s http://localhost:3000 > /dev/null 2>&1; then
        echo "🎉 Server is running on http://localhost:3000"
        echo "📱 Profile pages:"
        echo "   - Tony Hawk: http://localhost:3000/profile/tonyhawk"
        echo "   - Demo Talent: http://localhost:3000/profile/demo-talent"
        echo "🎭 Talent Dashboard: http://localhost:3000/talent-dashboard"
        echo "🔗 Homepage: http://localhost:3000"
        
        # Keep the script running
        echo "🔄 Server is running. Press Ctrl+C to stop."
        wait
    else
        echo "❌ Server failed to start"
        exit 1
    fi
else
    echo "❌ Build failed!"
    exit 1
fi

