@echo off
echo Starting Meeting Assistant Application...
start cmd /k "start-server.bat"
timeout /t 5
start cmd /k "start-frontend.bat"
echo Application started in separate windows.
