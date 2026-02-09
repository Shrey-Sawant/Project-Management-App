#!/bin/bash
# Render build script

echo "🔨 Starting build process..."

# Navigate to server directory
cd server || exit 1

echo "📦 Installing dependencies..."
npm install

echo "🏗️  Building TypeScript..."
npm run build

echo "✅ Build complete!"
echo "📁 Compiled files are in: server/dist/"

# Verify dist folder exists
if [ -d "dist" ]; then
    echo "✅ dist/ folder created successfully"
    ls -la dist/
else
    echo "❌ ERROR: dist/ folder not found!"
    exit 1
fi
