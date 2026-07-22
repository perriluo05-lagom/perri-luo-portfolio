@echo off
chcp 65001 >nul
title Perri Luo Portfolio - Development Server
echo Starting Perri Luo Portfolio...
echo ========================================
echo.

cd /d "d:\Trae CN\program\Portfolio"

echo Cleaning build cache...
if exist ".next" (
    rmdir /s /q ".next"
    echo Cache cleaned.
)

echo.
echo Starting development server...
echo.

npm run dev

pause