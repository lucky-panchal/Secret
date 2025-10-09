@echo off
echo Testing if server is running...
curl http://localhost:5000/api/health
echo.
echo.
pause
