# 🚀 FAST FLEX - Complete Setup Guide

## ✅ Step 1: Install Prerequisites

### Install Python (3.8 or higher)
1. Download Python from https://www.python.org/downloads/
2. **IMPORTANT:** During installation, check "Add Python to PATH"
3. Verify installation:
   ```bash
   python --version
   ```

### Install Node.js (14 or higher)
1. Download Node.js from https://nodejs.org/
2. Install with default settings
3. Verify installation:
   ```bash
   node --version
   npm --version
   ```

---

## ✅ Step 2: Backend Setup

### 1. Open Terminal/Command Prompt
Navigate to the backend directory:
```bash
cd "d:\Rameen Project\student-management-system\backend"
```

### 2. Create Virtual Environment (Recommended)
```bash
python -m venv venv
```

### 3. Activate Virtual Environment

**Windows (PowerShell):**
```bash
venv\Scripts\Activate.ps1
```

**Windows (Command Prompt):**
```bash
venv\Scripts\activate.bat
```

**Mac/Linux:**
```bash
source venv/bin/activate
```

### 4. Install Dependencies
```bash
pip install -r requirements.txt
```

This will install:
- Django==5.2.7
- djangorestframework==3.15.2
- djangorestframework-simplejwt==5.4.0
- django-cors-headers==4.6.0
- python-dotenv==1.0.1

### 5. Apply Database Migrations
```bash
python manage.py makemigrations
python manage.py migrate
```

### 6. Create Superuser (Admin Account)
```bash
python manage.py createsuperuser
```

Follow the prompts:
- Username: admin
- Email: admin@fastflex.com
- Password: (choose a strong password)

### 7. Run Backend Server
```bash
python manage.py runserver
```

✅ **Backend is now running on:** http://127.0.0.1:8000

Leave this terminal open!

---

## ✅ Step 3: Frontend Setup

### 1. Open NEW Terminal/Command Prompt
Navigate to the frontend directory:
```bash
cd "d:\Rameen Project\student-management-system\frontend"
```

### 2. Install Dependencies
```bash
npm install
```

This will install all React dependencies including:
- React 19.2.0
- React Router DOM 7.9.5
- Axios 1.13.2

### 3. Run Frontend Server
```bash
npm start
```

✅ **Frontend is now running on:** http://localhost:3000

The browser should open automatically!

---

## ✅ Step 4: Create Test Users

### Using Django Admin Panel

1. Open browser: http://127.0.0.1:8000/admin/
2. Login with superuser credentials (created in Step 2.6)

### Create Student User:
1. Click **Users** → **Add User**
2. Username: `student1`
3. Password: `Student@123`
4. Click **Save and continue editing**
5. Set **Role**: `student`
6. Set **First name**: `John`
7. Set **Last name**: `Doe`
8. Set **Email**: `student1@test.com`
9. Click **Save**

10. Go to **Students** → **Add Student Profile**
11. Select **User**: `student1`
12. Fill in:
    - First name: John
    - Last name: Doe
    - Enrollment number: 23k-0001
    - Department: Computer Science
    - Year: 3
    - Semester: 5
13. Click **Save**

### Create Faculty User:
1. Click **Users** → **Add User**
2. Username: `faculty1`
3. Password: `Faculty@123`
4. Set **Role**: `faculty`
5. Set **First name**: `Dr. Sarah`
6. Set **Last name**: `Smith`
7. Set **Email**: `faculty1@test.com`
8. Click **Save**

9. Go to **Faculty Profiles** → **Add Faculty Profile**
10. Select **User**: `faculty1`
11. Fill in:
    - First name: Sarah
    - Last name: Smith
    - Designation: professor
    - Department: Computer Science
    - Office: Room 301
12. Click **Save**

### Create TA User:
1. Click **Users** → **Add User**
2. Username: `ta1`
3. Password: `TA@123`
4. Set **Role**: `ta`
5. Set **First name**: `Ali`
6. Set **Last name**: `Ahmed`
7. Set **Email**: `ta1@test.com`
8. Click **Save**

9. Go to **TA Profiles** → **Add TA Profile**
10. Select **User**: `ta1`
11. Fill in:
    - First name: Ali
    - Last name: Ahmed
    - Department: Computer Science
12. Click **Save**

---

## ✅ Step 5: Test the Application

### Test Student Login:
1. Open http://localhost:3000
2. Username: `student1`
3. Password: `Student@123`
4. Role: Student
5. Click **Login**

✅ You should see the Student Dashboard!

### Test Faculty Login:
1. Logout
2. Username: `faculty1`
3. Password: `Faculty@123`
4. Role: Faculty
5. Click **Login**

✅ You should see the Faculty Dashboard!

### Test TA Login:
1. Logout
2. Username: `ta1`
3. Password: `TA@123`
4. Role: Teaching Assistant
5. Click **Login**

✅ You should see the TA Dashboard!

---

## ✅ Step 6: Create Sample Data

### Create a Course:
1. Login to Admin Panel
2. Go to **Courses** → **Add Course**
3. Fill in:
   - Name: Database Management System
   - Code: CS-302
   - Description: Learn about databases
   - Semester: 5
   - Credit Hours: 3
   - Faculty: Select `faculty1`
4. Click **Save**

### Enroll Student in Course:
1. Go to **Enrollments** → **Add Enrollment**
2. Student: Select `student1`
3. Course: Select `CS-302`
4. Status: active
5. Click **Save**

### Create Assignment:
1. Go to **Assignments** → **Add Assignment**
2. Title: Assignment 1 - ER Diagrams
3. Description: Create an ER diagram
4. Course: CS-302
5. Due date: (choose a future date)
6. Max points: 100
7. Uploaded by: Select `faculty1`
8. Click **Save**

### Assign Task to TA:
1. Go to **TA Tasks** → **Add TA Task**
2. TA: Select `ta1`
3. Course: CS-302
4. Assigned by: Select `faculty1`
5. Title: Grade Assignment 1
6. Description: Grade all submissions
7. Due date: (choose a future date)
8. Status: pending
9. Click **Save**

---

## ✅ Step 7: Verify Everything Works

### Student Dashboard Should Show:
- ✅ Personal information
- ✅ Enrolled courses (CS-302)
- ✅ CGPA and semester info
- ✅ Logout button

### Faculty Dashboard Should Show:
- ✅ Profile information
- ✅ Courses teaching (CS-302)
- ✅ Assignments posted
- ✅ Student statistics

### TA Dashboard Should Show:
- ✅ Profile information
- ✅ Pending tasks (1)
- ✅ Assigned courses (CS-302)
- ✅ Mark complete button

---

## 🔧 Troubleshooting

### Backend Issues:

**Error: "No module named..."**
```bash
pip install -r requirements.txt
```

**Error: "python is not recognized"**
- Reinstall Python and check "Add to PATH"
- Or use full path: `C:\Python39\python.exe`

**Error: "Port 8000 already in use"**
```bash
# Find and kill the process
netstat -ano | findstr :8000
taskkill /PID <PID> /F
```

### Frontend Issues:

**Error: "npm is not recognized"**
- Reinstall Node.js
- Restart terminal

**Error: "Port 3000 already in use"**
- Change port: Set `PORT=3001` in frontend/.env
- Or kill process on port 3000

**Error: "Network Error" or "Failed to fetch"**
- Make sure backend is running
- Check backend URL in frontend/.env
- Check CORS settings

---

## 📝 Important Commands Reference

### Backend:
```bash
# Activate virtual environment
venv\Scripts\activate

# Run server
python manage.py runserver

# Make migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Access Python shell
python manage.py shell
```

### Frontend:
```bash
# Install dependencies
npm install

# Run development server
npm start

# Build for production
npm run build

# Run tests
npm test
```

---

## ✅ You're All Set!

Your FAST Flex Student Management System is now fully configured and running!

**Next Steps:**
1. Explore all three dashboards (Student, Faculty, TA)
2. Create more users and test different features
3. Add more courses, assignments, and quizzes
4. Test the complete workflow
5. Customize as needed for your requirements

---

**Need Help?**
- Check README.md for detailed documentation
- Review the project proposal for feature requirements
- Contact team members for support

**Happy Coding! 🚀**
