#!/bin/bash
# Render start script

echo "🚀 Starting server..."

# Navigate to server directory
cd server || exit 1

# Verify dist folder exists
if [ ! -d "dist" ]; then
    echo "❌ ERROR: dist/ folder not found! Build may have failed."
    exit 1
fi

# Verify index.js exists
if [ ! -f "dist/index.js" ]; then
    echo "❌ ERROR: dist/index.js not found! Build may have failed."
    exit 1
fi

echo "✅ Build artifacts verified"
echo "🌐 Starting Node.js server..."

# Start the server
node dist/index.js
