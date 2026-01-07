#!/bin/bash

# SkyGuide Testing Setup Script
# This script installs all dependencies needed for testing

echo "🚀 SkyGuide Testing Setup"
echo "=========================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed!"
    echo ""
    echo "Please install Node.js from: https://nodejs.org/"
    echo "Download the LTS (Long Term Support) version."
    echo ""
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Install npm dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo "✅ Dependencies installed"
echo ""

# Install Playwright browsers
echo "🌐 Installing Playwright browsers..."
npx playwright install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install Playwright browsers"
    exit 1
fi

echo "✅ Playwright browsers installed"
echo ""

# Run a quick test to verify everything works
echo "🧪 Running quick test..."
npm test -- --passWithNoTests

if [ $? -ne 0 ]; then
    echo "⚠️  Test setup complete but tests failed"
    echo "   This might be okay - check the output above"
else
    echo "✅ Tests are working!"
fi

echo ""
echo "=========================="
echo "✅ Setup Complete!"
echo "=========================="
echo ""
echo "You can now run tests:"
echo "  npm test                  # Unit tests"
echo "  npm run test:e2e         # E2E tests"
echo "  npm run test:all         # All tests"
echo ""
echo "See QUICKSTART.md for more commands"
echo ""
