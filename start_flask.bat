@echo off
echo Starting Flask server...
cd python
pip install -r flask_requirements.txt
python flask_app.py
