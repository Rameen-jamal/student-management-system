#!/usr/bin/env bash
# Render build script
set -o errexit
 
pip install -r requirements.txt
 
python manage.py collectstatic --no-input
python manage.py migrate
 
# One-time database seeding (creates admin, faculty, TA, students, courses, etc.)
# Remove this block after the first successful deploy to avoid re-seeding on every push.
python manage.py seed_data