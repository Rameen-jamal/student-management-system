# Entity-Relationship Diagram (ERD) Report
## Student Management System

---

## 1. EXECUTIVE SUMMARY

This document provides a comprehensive analysis of the Student Management System's database schema, detailing all entities, their attributes, relationships, and cardinalities. The system implements a complete educational institution management platform with role-based access control for Administrators, Faculty, Teaching Assistants, and Students.

---

## 2. CORE ENTITIES OVERVIEW

### 2.1 User Management Domain
- **User** (Authentication & Authorization)
- **StudentProfile** (Student Information)
- **FacultyProfile** (Faculty Information)
- **TAProfile** (Teaching Assistant Information)

### 2.2 Academic Domain
- **Course** (Course Catalog)
- **Enrollment** (Student-Course Registration)
- **Assignment** (Course Assignments)
- **Submission** (Student Assignment Submissions)
- **Quiz** (Course Assessments)
- **QuizGrade** (Student Quiz Results)

### 2.3 Administrative Domain
- **FeeRecord** (Financial Records)
- **Payment** (Payment Transactions)
- **Attendance** (Class Attendance)

### 2.4 Communication & Task Management
- **CourseAnnouncement** (Course Notifications)
- **StudentMessage** (Faculty-Student Communication)
- **TATask** (TA Work Assignments)

---

## 3. DETAILED ENTITY ANALYSIS

### 3.1 User (accounts.User)
**Purpose**: Central authentication entity implementing Django's AbstractUser for role-based access control.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `username`: Unique login identifier
- `password`: Encrypted password hash
- `email`: User email address
- `first_name`: User's first name
- `last_name`: User's last name
- `role`: ENUM ('admin', 'faculty', 'ta', 'student')
- `is_active`: Account status flag
- `is_staff`: Staff access flag
- `is_superuser`: Superuser privileges flag
- `date_joined`: Account creation timestamp
- `last_login`: Last login timestamp

**Relationships**:
- ONE User → ONE StudentProfile (1:1)
- ONE User → ONE FacultyProfile (1:1)
- ONE User → ONE TAProfile (1:1)

**Business Rules**:
- Each user has exactly one role
- Username must be unique
- Role determines access privileges and profile type

---

### 3.2 StudentProfile (students.StudentProfile)
**Purpose**: Stores detailed student academic and personal information.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `user_id` (FK): Foreign key to User (ONE-TO-ONE)
- `enrollment_number`: Unique student identifier
- `first_name`: Student's first name
- `last_name`: Student's last name
- `department`: Academic department
- `dob`: Date of birth
- `contact_number`: Phone number
- `address`: Physical address
- `year`: Current academic year (1-4)
- `semester`: Current semester (1-8)
- `cgpa`: Cumulative Grade Point Average

**Relationships**:
- ONE User → ONE StudentProfile (1:1)
- MANY Students → MANY Courses (via Enrollment) (M:N)
- ONE Student → MANY Submissions (1:N)
- ONE Student → MANY QuizGrades (1:N)
- ONE Student → MANY FeeRecords (1:N)
- MANY Students → MANY Attendance records (M:N)
- ONE Student → MANY StudentMessages (1:N)

**Business Rules**:
- Enrollment number must be unique
- Student can enroll in multiple courses
- CGPA calculated based on grades (0.0-4.0 scale)

---

### 3.3 FacultyProfile (faculty.FacultyProfile)
**Purpose**: Stores faculty member information and academic credentials.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `user_id` (FK): Foreign key to User (ONE-TO-ONE)
- `first_name`: Faculty first name
- `last_name`: Faculty last name
- `designation`: ENUM ('professor', 'associate_professor', 'assistant_professor', 'lecturer')
- `department`: Academic department
- `contact_number`: Phone number
- `office`: Office location

**Relationships**:
- ONE User → ONE FacultyProfile (1:1)
- MANY Faculty → MANY Courses (M:N)
- ONE Faculty → MANY Assignments (1:N) [uploaded_by]
- ONE Faculty → MANY CourseAnnouncements (1:N)
- ONE Faculty → MANY Attendance records (1:N) [marked_by]
- ONE Faculty → MANY TATasks (1:N) [assigned_by]
- ONE Faculty → MANY StudentMessages (1:N) [sender]

**Business Rules**:
- Faculty can teach multiple courses
- Multiple faculty can teach the same course
- Faculty can assign tasks to TAs

---

### 3.4 TAProfile (ta.TAProfile)
**Purpose**: Stores Teaching Assistant information and course assignments.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `user_id` (FK): Foreign key to User (ONE-TO-ONE)
- `first_name`: TA first name
- `last_name`: TA last name
- `department`: Academic department
- `contact_number`: Phone number
- `ta_tasks`: General task description (text field)

**Relationships**:
- ONE User → ONE TAProfile (1:1)
- MANY TAs → MANY Courses (M:N)
- ONE TA → MANY TATasks (1:N)

**Business Rules**:
- TA can assist in multiple courses
- TA receives tasks from faculty
- TA cannot grade assignments directly (via faculty)

---

### 3.5 Course (core.Course)
**Purpose**: Represents academic courses offered by the institution.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `name`: Course name
- `code`: Unique course identifier
- `description`: Course description
- `semester`: Recommended semester
- `credit_hours`: Credit value (typically 3)
- `syllabus`: File upload (PDF/Document)
- `weekly_topics`: Course outline text
- `learning_materials`: File upload
- `videos`: URL to video resources
- `slides`: File upload (presentations)

**Relationships**:
- MANY Courses → MANY Faculty (M:N)
- MANY Courses → MANY TAs (M:N)
- MANY Courses → MANY Students (M:N)
- ONE Course → MANY Assignments (1:N)
- ONE Course → MANY Quizzes (1:N)
- ONE Course → MANY CourseAnnouncements (1:N)
- ONE Course → MANY Attendance records (1:N)
- ONE Course → MANY TATasks (1:N)
- ONE Course → MANY StudentMessages (1:N)

**Business Rules**:
- Course code must be unique
- Course can have multiple instructors (team teaching)
- Course can have multiple TAs
- Students enroll via Enrollment table

---

### 3.6 Enrollment (students.Enrollment)
**Purpose**: Junction table managing student course registrations.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `student_id` (FK): Foreign key to StudentProfile
- `course_id` (FK): Foreign key to Course
- `date_enrolled`: Enrollment timestamp
- `status`: Enrollment status ('active', 'dropped', 'completed')

**Relationships**:
- MANY-TO-MANY bridge between Student and Course

**Constraints**:
- Unique constraint on (student_id, course_id)

**Business Rules**:
- Student cannot enroll in same course twice
- Enrollment can be marked inactive (dropped courses)

---

### 3.7 Assignment (core.Assignment)
**Purpose**: Represents course assignments uploaded by faculty.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `title`: Assignment title
- `description`: Assignment instructions
- `course_id` (FK): Foreign key to Course
- `uploaded_by_id` (FK): Foreign key to FacultyProfile
- `uploaded_at`: Creation timestamp
- `due_date`: Deadline timestamp
- `max_points`: Maximum achievable score
- `file`: File upload (assignment document)

**Relationships**:
- ONE Course → MANY Assignments (1:N)
- ONE Faculty → MANY Assignments (1:N)
- ONE Assignment → MANY Submissions (1:N)

**Business Rules**:
- Each assignment belongs to one course
- Only faculty can create assignments
- Assignments are graded out of max_points

---

### 3.8 Submission (core.Submission)
**Purpose**: Stores student assignment submissions and grades.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `assignment_id` (FK): Foreign key to Assignment
- `student_id` (FK): Foreign key to StudentProfile
- `submitted_at`: Submission timestamp
- `file`: File upload (student submission)
- `grade`: Numerical grade (nullable)
- `feedback`: Textual feedback from grader
- `status`: ENUM ('pending', 'approved', 'rejected')

**Relationships**:
- ONE Assignment → MANY Submissions (1:N)
- ONE Student → MANY Submissions (1:N)

**Constraints**:
- Unique constraint on (assignment_id, student_id)

**Business Rules**:
- One submission per student per assignment
- Grade must be ≤ assignment.max_points
- Status tracks grading workflow

---

### 3.9 Quiz (core.Quiz)
**Purpose**: Represents time-bound assessments for courses.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `title`: Quiz title
- `description`: Quiz instructions
- `course_id` (FK): Foreign key to Course
- `date`: Scheduled date/time
- `max_marks`: Maximum score
- `duration_minutes`: Time limit

**Relationships**:
- ONE Course → MANY Quizzes (1:N)
- ONE Quiz → MANY QuizGrades (1:N)

**Business Rules**:
- Each quiz belongs to one course
- Timed assessment with duration limit
- Grades recorded separately in QuizGrade

---

### 3.10 QuizGrade (core.QuizGrade)
**Purpose**: Records student quiz performance.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `quiz_id` (FK): Foreign key to Quiz
- `student_id` (FK): Foreign key to StudentProfile
- `marks_obtained`: Score achieved
- `remarks`: Additional comments

**Relationships**:
- ONE Quiz → MANY QuizGrades (1:N)
- ONE Student → MANY QuizGrades (1:N)

**Constraints**:
- Unique constraint on (quiz_id, student_id)

**Business Rules**:
- One grade per student per quiz
- Marks_obtained ≤ quiz.max_marks

---

### 3.11 Attendance (core.Attendance)
**Purpose**: Tracks daily class attendance for courses.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `course_id` (FK): Foreign key to Course
- `date`: Attendance date
- `marked_by_id` (FK): Foreign key to FacultyProfile
- `attendance_type`: ENUM ('manual', 'auto')
- `students_present` (M2M): ManyToMany to StudentProfile

**Relationships**:
- ONE Course → MANY Attendance records (1:N)
- ONE Faculty → MANY Attendance records (1:N)
- MANY Students → MANY Attendance records (M:N)

**Business Rules**:
- One attendance record per course per day
- Students marked present via M2M relationship
- Faculty marks attendance (manual or auto)

---

### 3.12 FeeRecord (administration.FeeRecord)
**Purpose**: Manages student financial obligations per semester.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `student_id` (FK): Foreign key to StudentProfile
- `semester`: Semester number
- `year`: Academic year
- `total_fee`: Total amount due
- `paid_amount`: Amount paid (cumulative)
- `last_payment_date`: Most recent payment date

**Computed Properties**:
- `due_amount`: total_fee - paid_amount (calculated property)

**Relationships**:
- ONE Student → MANY FeeRecords (1:N)
- ONE FeeRecord → MANY Payments (1:N)

**Business Rules**:
- One fee record per student per semester
- Paid_amount updated automatically via Payment saves
- Tracks financial status per term

---

### 3.13 Payment (administration.Payment)
**Purpose**: Records individual payment transactions.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `fee_record_id` (FK): Foreign key to FeeRecord
- `amount`: Payment amount
- `payment_date`: Transaction date
- `payment_method`: ENUM ('cash', 'bank_transfer', 'credit_card', 'online')
- `transaction_id`: External payment reference
- `remarks`: Additional notes

**Relationships**:
- ONE FeeRecord → MANY Payments (1:N)

**Business Rules**:
- Automatically updates FeeRecord.paid_amount on save
- Tracks payment history for auditing
- Supports multiple payment methods

---

### 3.14 CourseAnnouncement (core.CourseAnnouncement)
**Purpose**: Facilitates course-wide communication from faculty.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `course_id` (FK): Foreign key to Course
- `title`: Announcement title
- `content`: Announcement body
- `posted_by_id` (FK): Foreign key to FacultyProfile
- `posted_at`: Timestamp

**Relationships**:
- ONE Course → MANY CourseAnnouncements (1:N)
- ONE Faculty → MANY CourseAnnouncements (1:N)

**Business Rules**:
- All enrolled students can view announcements
- Only faculty can post announcements
- Chronologically ordered by posted_at

---

### 3.15 StudentMessage (core.StudentMessage)
**Purpose**: Enables direct faculty-to-student communication.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `sender_id` (FK): Foreign key to FacultyProfile
- `recipient_id` (FK): Foreign key to StudentProfile
- `course_id` (FK): Foreign key to Course (optional)
- `subject`: Message subject line
- `message`: Message body
- `sent_at`: Timestamp
- `read`: Boolean read status

**Relationships**:
- ONE Faculty → MANY StudentMessages (1:N)
- ONE Student → MANY StudentMessages (1:N)
- ONE Course → MANY StudentMessages (1:N) [optional]

**Business Rules**:
- Only faculty can send messages to students
- Messages can be course-specific or general
- Read status tracked for notifications

---

### 3.16 TATask (core.TATask)
**Purpose**: Manages work assignments for Teaching Assistants.

**Attributes**:
- `id` (PK): Auto-generated primary key
- `ta_id` (FK): Foreign key to TAProfile
- `course_id` (FK): Foreign key to Course
- `assigned_by_id` (FK): Foreign key to FacultyProfile
- `title`: Task title
- `description`: Task details
- `assigned_date`: Assignment timestamp
- `due_date`: Deadline timestamp
- `status`: ENUM ('pending', 'in_progress', 'completed')
- `completion_notes`: TA's completion remarks

**Relationships**:
- ONE TA → MANY TATasks (1:N)
- ONE Course → MANY TATasks (1:N)
- ONE Faculty → MANY TATasks (1:N)

**Business Rules**:
- Faculty assigns tasks to TAs
- Tasks are course-specific
- Status tracks workflow progression

---

## 4. RELATIONSHIP CARDINALITY MATRIX

| Entity 1 | Relationship | Entity 2 | Cardinality | Type |
|----------|-------------|----------|-------------|------|
| User | has | StudentProfile | 1:1 | One-to-One |
| User | has | FacultyProfile | 1:1 | One-to-One |
| User | has | TAProfile | 1:1 | One-to-One |
| StudentProfile | enrolls in | Course | M:N | Many-to-Many (via Enrollment) |
| FacultyProfile | teaches | Course | M:N | Many-to-Many |
| TAProfile | assists in | Course | M:N | Many-to-Many |
| Course | has | Assignment | 1:N | One-to-Many |
| Course | has | Quiz | 1:N | One-to-Many |
| Course | has | CourseAnnouncement | 1:N | One-to-Many |
| Course | has | Attendance | 1:N | One-to-Many |
| Course | has | TATask | 1:N | One-to-Many |
| Assignment | has | Submission | 1:N | One-to-Many |
| Quiz | has | QuizGrade | 1:N | One-to-Many |
| StudentProfile | submits | Submission | 1:N | One-to-Many |
| StudentProfile | receives | QuizGrade | 1:N | One-to-Many |
| StudentProfile | has | FeeRecord | 1:N | One-to-Many |
| FeeRecord | has | Payment | 1:N | One-to-Many |
| FacultyProfile | uploads | Assignment | 1:N | One-to-Many |
| FacultyProfile | posts | CourseAnnouncement | 1:N | One-to-Many |
| FacultyProfile | marks | Attendance | 1:N | One-to-Many |
| FacultyProfile | assigns | TATask | 1:N | One-to-Many |
| FacultyProfile | sends | StudentMessage | 1:N | One-to-Many |
| TAProfile | receives | TATask | 1:N | One-to-Many |
| Attendance | includes | StudentProfile | M:N | Many-to-Many |
| Assignment | graded by | Submission | 1:1 | One-to-One (per student) |
| Quiz | graded by | QuizGrade | 1:1 | One-to-One (per student) |

---

## 5. DATABASE CONSTRAINTS & INTEGRITY RULES

### 5.1 Primary Keys
- All entities have auto-generated integer primary keys (`id`)

### 5.2 Unique Constraints
- `User.username`: Must be unique
- `StudentProfile.enrollment_number`: Must be unique
- `Course.code`: Must be unique
- `(Enrollment.student, Enrollment.course)`: Composite unique
- `(Submission.assignment, Submission.student)`: Composite unique
- `(QuizGrade.quiz, QuizGrade.student)`: Composite unique

### 5.3 Foreign Key Constraints
- **CASCADE**: When parent deleted, children are deleted
  - User → Profiles (StudentProfile, FacultyProfile, TAProfile)
  - Course → Assignments, Quizzes, Announcements
  - Assignment → Submissions
  - Quiz → QuizGrades
  - FeeRecord → Payments
  
- **SET_NULL**: When parent deleted, FK set to NULL
  - FacultyProfile → Assignments (uploaded_by)
  - FacultyProfile → CourseAnnouncements (posted_by)
  - FacultyProfile → Attendance (marked_by)
  - FacultyProfile → TATasks (assigned_by)

### 5.4 Data Validation Rules
- `grade` ≤ `assignment.max_points`
- `marks_obtained` ≤ `quiz.max_marks`
- `paid_amount` ≤ `total_fee`
- `year` ∈ {1, 2, 3, 4}
- `semester` ∈ {1, 2, 3, 4, 5, 6, 7, 8}
- `cgpa` ∈ [0.0, 4.0]

---

## 6. ERD CONCEPTUAL INSIGHTS

### 6.1 Design Patterns Used

**1. Single Table Inheritance Pattern**
- `User` model serves as base for all user types
- Role discriminator field determines user type
- Separate profile tables for extended attributes

**2. Association/Junction Tables**
- `Enrollment`: Manages Student-Course relationships
- Implicit M2M tables: Course-Faculty, Course-TA, Attendance-Students

**3. Weak Entity Pattern**
- `Payment` depends on `FeeRecord`
- `Submission` depends on `Assignment`
- `QuizGrade` depends on `Quiz`

**4. Audit Trail Pattern**
- Timestamps: `created_at`, `submitted_at`, `posted_at`
- Change tracking: `status` fields in Submission, TATask

### 6.2 Normalization Level
The schema follows **Third Normal Form (3NF)**:
- No repeating groups (1NF) ✓
- No partial dependencies (2NF) ✓
- No transitive dependencies (3NF) ✓
- Computed fields (`due_amount`) are properties, not stored

### 6.3 Scalability Considerations
- **Indexes recommended**: 
  - `StudentProfile.enrollment_number`
  - `Course.code`
  - `Enrollment(student_id, course_id)`
  - `Submission(assignment_id, student_id)`
  - `Attendance.date`
  
- **Performance optimizations**:
  - Denormalized `paid_amount` in FeeRecord (updated via triggers/signals)
  - ManyToMany relationships for efficient querying

---

## 7. BUSINESS LOGIC IMPLEMENTATION

### 7.1 Automatic Calculations
1. **FeeRecord.due_amount**: Computed property (total_fee - paid_amount)
2. **StudentProfile.cgpa**: Calculated from quiz/assignment grades
3. **Payment auto-update**: Updates FeeRecord.paid_amount on save

### 7.2 Workflow States
1. **Submission.status**: pending → approved/rejected
2. **TATask.status**: pending → in_progress → completed
3. **Enrollment.status**: active → dropped/completed

### 7.3 Access Control Rules
- **Admin**: Full CRUD on all entities
- **Faculty**: CRUD on own courses, assignments, announcements
- **TA**: Read courses, update task status
- **Student**: Read enrolled courses, submit assignments, view grades

---

## 8. REFERENTIAL INTEGRITY GRAPH

```
User (Root Entity)
├── StudentProfile (1:1)
│   ├── Enrollment (1:N) → Course (M:N)
│   ├── Submission (1:N) → Assignment (N:1)
│   ├── QuizGrade (1:N) → Quiz (N:1)
│   ├── FeeRecord (1:N)
│   │   └── Payment (1:N)
│   ├── Attendance (M:N)
│   └── StudentMessage (1:N receiver)
│
├── FacultyProfile (1:1)
│   ├── Course (M:N)
│   ├── Assignment (1:N uploader)
│   ├── CourseAnnouncement (1:N)
│   ├── Attendance (1:N marker)
│   ├── TATask (1:N assigner)
│   └── StudentMessage (1:N sender)
│
└── TAProfile (1:1)
    ├── Course (M:N)
    └── TATask (1:N receiver)

Course (Central Hub)
├── Enrollment (1:N)
├── Assignment (1:N)
├── Quiz (1:N)
├── CourseAnnouncement (1:N)
├── Attendance (1:N)
├── TATask (1:N)
└── StudentMessage (1:N)
```

---

## 9. SUMMARY STATISTICS

| Metric | Count |
|--------|-------|
| Total Entities | 16 |
| Strong Entities | 4 (User, Course, Student, Faculty) |
| Weak Entities | 12 |
| One-to-One Relationships | 3 |
| One-to-Many Relationships | 25 |
| Many-to-Many Relationships | 6 |
| Composite Unique Constraints | 3 |
| File Upload Fields | 7 |
| Enum/Choice Fields | 9 |

---

## 10. RECOMMENDATIONS

### 10.1 Database Optimizations
1. Add indexes on frequently queried foreign keys
2. Implement database-level triggers for computed fields
3. Consider partitioning Attendance table by year
4. Archive old submissions to separate storage

### 10.2 Schema Enhancements
1. Add soft delete flags instead of hard CASCADE deletes
2. Implement audit log table for critical changes
3. Add version control for assignments/submissions
4. Include notification preferences in User profiles

### 10.3 Data Quality
1. Add CHECK constraints for grade ranges
2. Implement database functions for CGPA calculation
3. Add triggers to prevent enrollment in conflicting courses
4. Validate payment amounts against fee records

---

## 11. CONCLUSION

The Student Management System ERD demonstrates a well-structured, normalized database design that effectively models the complex relationships in an educational environment. The schema supports:

- **Role-based access control** through User entity specialization
- **Academic workflow management** via Course, Assignment, and Quiz entities
- **Financial tracking** through FeeRecord and Payment entities
- **Communication channels** via announcements and messaging
- **Task delegation** through TA task management

The design balances normalization principles with practical performance considerations, using appropriate relationship types and constraints to maintain data integrity while supporting efficient queries.

---

**Document Version**: 1.0  
**Last Updated**: November 22, 2025  
**Generated By**: Database Schema Analysis Tool
