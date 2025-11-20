# 📝 MIGRATION CHECKLIST

## ⚠️ IMPORTANT: Run These Commands to Complete Setup

### Step 1: Navigate to Backend Directory
```bash
cd "d:\Rameen Project\student-management-system\backend"
```

### Step 2: Install Dependencies
```bash
pip install -r requirements.txt
```

Expected output:
```
Successfully installed Django-5.2.7 djangorestframework-3.15.2 djangorestframework-simplejwt-5.4.0 django-cors-headers-4.6.0 python-dotenv-1.0.1
```

### Step 3: Create Migrations for All Apps
```bash
python manage.py makemigrations accounts
python manage.py makemigrations students
python manage.py makemigrations faculty
python manage.py makemigrations ta
python manage.py makemigrations core
python manage.py makemigrations administration
```

### Step 4: Apply All Migrations
```bash
python manage.py migrate
```

### Step 5: Create Superuser
```bash
python manage.py createsuperuser
```

Suggested credentials:
- Username: `admin`
- Email: `admin@fastflex.com`
- Password: `Admin@123` (or your choice)

### Step 6: Run Backend Server
```bash
python manage.py runserver
```

✅ Backend should now be running on http://127.0.0.1:8000

---

## Frontend Setup

### Step 1: Open NEW Terminal
Navigate to frontend directory:
```bash
cd "d:\Rameen Project\student-management-system\frontend"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Run Frontend Server
```bash
npm start
```

✅ Frontend should now be running on http://localhost:3000

---

## Verify Installation

### Check Backend:
- Visit: http://127.0.0.1:8000/admin/
- Login with superuser credentials
- You should see all models registered

### Check Frontend:
- Visit: http://localhost:3000
- You should see the login page

### Check API:
- Visit: http://127.0.0.1:8000/api/
- You should see the API root with all endpoints

---

## If You Encounter Errors:

### "python is not recognized"
- Install Python from python.org
- Make sure to check "Add Python to PATH"

### "npm is not recognized"  
- Install Node.js from nodejs.org
- Restart terminal

### "No module named..."
```bash
pip install -r requirements.txt
```

### "Migrations not applied"
```bash
python manage.py migrate
```

### "CORS error"
- Check backend/.env file
- Make sure CORS_ALLOWED_ORIGINS includes http://localhost:3000

---

## ✅ Completion Checklist

- [ ] Python installed
- [ ] Node.js installed
- [ ] Backend dependencies installed (pip install)
- [ ] Frontend dependencies installed (npm install)
- [ ] Migrations created (makemigrations)
- [ ] Migrations applied (migrate)
- [ ] Superuser created
- [ ] Backend running (port 8000)
- [ ] Frontend running (port 3000)
- [ ] Can access admin panel
- [ ] Can access login page
- [ ] Created test users (student, faculty, TA)
- [ ] Tested all three dashboards

---

## 🎉 Once All Checked, You're Ready!

Your FAST Flex Student Management System is fully operational!
