#!/bin/bash

echo "========================================"
echo "  HACKATHON MODE - INSTANT SETUP"
echo "========================================"
echo ""

echo "Step 1: Installing dependencies..."
cd backend && npm install
cd ../client && npm install
cd ..
echo "[OK] Dependencies installed"
echo ""

echo "Step 2: Downloading face models..."
node download-face-models.js
echo ""

echo "Step 3: Starting servers..."
echo ""
echo "Opening 2 terminals..."
echo "Terminal 1: Backend (port 5000)"
echo "Terminal 2: Frontend (port 3001)"
echo ""

# Start backend in new terminal
gnome-terminal -- bash -c "cd backend && npm run dev; exec bash" 2>/dev/null || \
xterm -e "cd backend && npm run dev" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/backend && npm run dev"' 2>/dev/null &

sleep 3

# Start frontend in new terminal
gnome-terminal -- bash -c "cd client && npm run dev; exec bash" 2>/dev/null || \
xterm -e "cd client && npm run dev" 2>/dev/null || \
osascript -e 'tell app "Terminal" to do script "cd '$(pwd)'/client && npm run dev"' 2>/dev/null &

echo ""
echo "========================================"
echo "  SERVERS STARTING..."
echo "========================================"
echo ""
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:3001"
echo ""
echo "Test login at: http://localhost:3001/login"
echo ""
echo "Use any 12-digit Aadhaar number (e.g., 123456789012)"
echo ""
