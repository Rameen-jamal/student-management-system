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

### 👥 Users (16 total)
- **1 Admin User**
- **3 Faculty Members**
- **3 Teaching Assistants**
- **10 Students** (comprehensive enrollment across all semesters)

### 📚 Academic Data
- **8 Courses** (CS-302, CS-303, SE-301, CS-201, CS-401, CS-304, CS-202, CS-402)
- **30+ Course Enrollments** (students enrolled in 2-4 courses each)
- **10 Assignments** with due dates across all courses
- **12+ Assignment Submissions** with grades and feedback
- **10 Quizzes** with dates across all courses
- **25+ Quiz Grades** with detailed feedback
- **69+ Attendance Records** across all courses (realistic attendance patterns)
- **3 TA Tasks** (pending and completed)

### 💰 Financial Data
- **10 Fee Records** (for all students)
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
| Username | Password | Enrollment # | Department | Semester | CGPA |
|----------|----------|--------------|------------|----------|------|
| student1 | Student@123 | 23k-0001 | Computer Science | 5 | 3.5 |
| student2 | Student@123 | 23k-0002 | Computer Science | 5 | 3.8 |
| student3 | Student@123 | 23k-0003 | Computer Science | 3 | 3.2 |
| student4 | Student@123 | 23k-0004 | Software Engineering | 7 | 3.9 |
| student5 | Student@123 | 23k-0005 | Computer Science | 5 | 3.6 |
| student6 | Student@123 | 23k-0006 | Computer Science | 5 | 3.7 |
| student7 | Student@123 | 23k-0007 | Computer Science | 3 | 3.4 |
| student8 | Student@123 | 23k-0008 | Software Engineering | 7 | 3.85 |
| student9 | Student@123 | 23k-0009 | Computer Science | 5 | 3.3 |
| student10 | Student@123 | 23k-0010 | Computer Science | 3 | 3.65 |

---

## 📋 Sample Data Details

### Courses
1. **CS-302** - Database Management Systems (Faculty: Sarah Smith)
2. **CS-303** - Operating Systems (Faculty: Michael Johnson)
3. **SE-301** - Software Engineering (Faculty: Emily Davis)
4. **CS-201** - Data Structures (Faculty: Sarah Smith)
5. **CS-401** - Web Development (Faculty: Emily Davis)
6. **CS-304** - Computer Networks (Faculty: Michael Johnson)
7. **CS-202** - Object Oriented Programming (Faculty: Sarah Smith)
8. **CS-402** - Artificial Intelligence (Faculty: Emily Davis)

### Enrollments
- **Semester 5 Students** (1, 2, 5, 6, 9) → Enrolled in 4 courses each (CS-302, CS-303, SE-301, CS-304)
- **Semester 3 Students** (3, 7, 10) → Enrolled in 2 courses each (CS-201, CS-202)
- **Semester 7 Students** (4, 8) → Enrolled in 2 courses each (CS-401, CS-402)

### Assignments (10 Total)
**Database Management (CS-302):**
1. ER Diagrams - Due in 7 days
2. SQL Queries - Due in 14 days
3. Database Normalization - Due in 21 days

**Operating Systems (CS-303):**
4. Process Scheduling - Due in 10 days
5. Memory Management - Due in 18 days

**Software Engineering (SE-301):**
6. Software Requirements - Due in 21 days
7. Use Case Diagrams - Due in 12 days

**Data Structures (CS-201):**
8. Linked Lists - Due in 8 days
9. Trees and Graphs - Due in 15 days

**Computer Networks (CS-304):**
10. Network Protocols - Due in 16 days

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
2. View enrolled courses (CS-302, CS-303, SE-301, CS-304) - 4 courses
3. Check 10 assignments across all courses
4. View multiple submissions with grades and feedback
5. See quiz grades from completed quizzes
6. View comprehensive attendance records (69+ records across courses)
7. Check attendance percentage and performance metrics

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
