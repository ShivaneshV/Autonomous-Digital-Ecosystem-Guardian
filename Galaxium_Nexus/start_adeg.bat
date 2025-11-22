@echo off
echo ==================================================
echo      ADEG V2.0 | AUTONOMOUS GUARDIAN SYSTEM
echo ==================================================
echo.
echo [INFO] Initializing Quantum Core...
echo [INFO] Launching Dashboard Interface...
echo.
echo Access the dashboard at: http://localhost:8000
echo.
python -m http.server 8000 --directory adeg_system/web
pause
