# 🌱 Database Seeding Guide

## Quick Start

Instead of manually creating users through the admin panel, you can now seed the entire database with sample data using a single command!

## How to Use

### Run the Seed Command

```bash
# Navigate to backend directory
cd backend

# Activate virtual environment
venv\Scripts\Activate.ps1

# Run the seeding command
python manage.py seed_data
```

## What Gets Created

The seeding script automatically creates:

### 👥 Users (11 total)
- **1 Admin User**
- **3 Faculty Members**
- **3 Teaching Assistants**
- **5 Students**

### 📚 Academic Data
- **5 Courses** (CS-302, CS-303, SE-301, CS-201, CS-401)
- **10 Course Enrollments**
- **4 Assignments** with due dates
- **3 Assignment Submissions** with grades
- **3 Quizzes** with dates
- **3 Quiz Grades**
- **10 Attendance Records**
- **3 TA Tasks** (pending and completed)

### 💰 Financial Data
- **5 Fee Records** (for all students)
- **3 Payment Records** (with different payment methods)

---

## 🔐 Login Credentials

All passwords follow the pattern: `RoleType@123`

### Admin
- Username: `admin`
- Password: `Admin@123`
- Access: Full system control + Django admin panel

### Faculty
| Username | Password | Department |
|----------|----------|------------|
| faculty1 | Faculty@123 | Computer Science |
| faculty2 | Faculty@123 | Computer Science |
| faculty3 | Faculty@123 | Software Engineering |

### Teaching Assistants
| Username | Password | Department |
|----------|----------|------------|
| ta1 | TA@123 | Computer Science |
| ta2 | TA@123 | Computer Science |
| ta3 | TA@123 | Software Engineering |

### Students
| Username | Password | Enrollment # | Department | Semester |
|----------|----------|--------------|------------|----------|
| student1 | Student@123 | 23k-0001 | Computer Science | 5 |
| student2 | Student@123 | 23k-0002 | Computer Science | 5 |
| student3 | Student@123 | 23k-0003 | Computer Science | 3 |
| student4 | Student@123 | 23k-0004 | Software Engineering | 7 |
| student5 | Student@123 | 23k-0005 | Computer Science | 5 |

---

## 📋 Sample Data Details

### Courses
1. **CS-302** - Database Management Systems (Faculty: Sarah Smith)
2. **CS-303** - Operating Systems (Faculty: Michael Johnson)
3. **SE-301** - Software Engineering (Faculty: Emily Davis)
4. **CS-201** - Data Structures (Faculty: Sarah Smith)
5. **CS-401** - Web Development (Faculty: Emily Davis)

### Enrollments
- Students 1, 2, 5 → Enrolled in semester 5 courses
- Student 3 → Enrolled in semester 3 courses
- Student 4 → Enrolled in semester 7 courses

### Assignments
1. **ER Diagrams** (CS-302) - Due in 7 days
2. **SQL Queries** (CS-302) - Due in 14 days
3. **Process Scheduling** (CS-303) - Due in 10 days
4. **Software Requirements** (SE-301) - Due in 21 days

### TA Tasks
1. Grade Assignment 1 (assigned to ta1)
2. Prepare Quiz Questions (assigned to ta2)
3. Lab Session Preparation (assigned to ta1) - **COMPLETED**

---

## 🔄 Re-running the Seed Command

**⚠️ WARNING**: Running `python manage.py seed_data` again will:
- Delete all existing data (except superuser)
- Create fresh sample data

This is useful for:
- Resetting to a clean state
- Testing from scratch
- Demonstration purposes

---

## 🎯 Testing Scenarios

### Test Student Dashboard
1. Login as `student1` / `Student@123`
2. View enrolled courses (CS-302, CS-303, SE-301)
3. Check assignments and submissions
4. View attendance records

### Test Faculty Dashboard
1. Login as `faculty1` / `Faculty@123`
2. View teaching courses (CS-302, CS-201)
3. Check assignment submissions
4. Review attendance records

### Test TA Dashboard
1. Login as `ta1` / `TA@123`
2. View assigned tasks
3. Mark tasks as complete
4. Access course materials

### Test Admin Panel
1. Navigate to `http://127.0.0.1:8000/admin/`
2. Login as `admin` / `Admin@123`
3. View all users, courses, enrollments
4. Manage system data

---

## 🛠️ Customization

To modify the seeded data, edit:
```
backend/accounts/management/commands/seed_data.py
```

You can customize:
- Number of users
- Course details
- Assignment content
- Fee amounts
- Any other data

---

## 📞 Support

If you encounter any issues:
1. Ensure virtual environment is activated
2. Check that all migrations are applied: `python manage.py migrate`
3. Verify Django is installed: `pip install -r requirements.txt`

---

**Happy Testing! 🚀**
