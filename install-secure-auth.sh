#!/bin/bash

# Secure Authentication Installation Script
# This script automates the setup process for the secure authentication feature

echo "🔐 Installing Secure Authentication Middleware..."
echo "================================================"

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 16+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js found: $(node --version)${NC}"

# Install backend dependencies
echo ""
echo "📦 Installing backend dependencies..."
cd backend
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

# Install frontend dependencies
echo ""
echo "📦 Installing frontend dependencies..."
cd ../client
npm install
if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Frontend dependencies installed${NC}"
else
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

# Create models directory
echo ""
echo "📁 Creating face-api.js models directory..."
mkdir -p public/models
echo -e "${GREEN}✅ Models directory created at client/public/models/${NC}"

# Check environment files
echo ""
echo "🔍 Checking environment configuration..."

cd ..
if [ ! -f "backend/.env" ]; then
    echo -e "${YELLOW}⚠️  backend/.env not found${NC}"
else
    echo -e "${GREEN}✅ backend/.env exists${NC}"
fi

if [ ! -f "client/.env.local" ]; then
    echo -e "${YELLOW}⚠️  client/.env.local not found${NC}"
else
    echo -e "${GREEN}✅ client/.env.local exists${NC}"
fi

# Summary
echo ""
echo "================================================"
echo -e "${GREEN}✅ Installation Complete!${NC}"
echo ""
echo "📋 Next Steps:"
echo "1. Configure API keys in backend/.env and client/.env.local"
echo "2. Download face-api.js models to client/public/models/"
echo "3. Review SECURE_AUTH_SETUP.md for detailed instructions"
echo ""
echo "🚀 To start the application:"
echo "   Backend:  cd backend && npm run dev"
echo "   Frontend: cd client && npm run dev"
echo ""
echo "📚 Documentation:"
echo "   - Setup Guide: SECURE_AUTH_SETUP.md"
echo "   - Feature README: SECURE_AUTH_README.md"
echo ""
