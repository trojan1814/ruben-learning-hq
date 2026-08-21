@echo off
title Ruben's Learning HQ
cd /d "%~dp0"
echo.
echo   Starting Ruben's Learning HQ...
echo.
start "" http://localhost:4173
node local-server.js
pause
