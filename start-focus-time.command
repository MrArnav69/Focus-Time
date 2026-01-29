#!/bin/bash

# Focus Time - Startup Script
# Double-click this file to start the Focus Time app

echo "☕ Starting Focus Time..."
echo ""

# Change to the app directory
cd "$(dirname "$0")"

# Open the browser after a short delay (gives server time to start)
(sleep 2 && open "http://localhost:3000") &

# Start the server
echo "🚀 Server running at http://localhost:3000"
echo "📝 Press Ctrl+C to stop the server"
echo ""

npx -y serve . -p 3000
