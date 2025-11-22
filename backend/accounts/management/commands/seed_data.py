from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model
from django.utils import timezone
from datetime import timedelta
from students.models import StudentProfile, Enrollment
from faculty.models import FacultyProfile
from ta.models import TAProfile
from core.models import Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask
from administration.models import FeeRecord, Payment

User = get_user_model()


class Command(BaseCommand):
    help = 'Seeds the database with sample data for testing'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Starting database seeding...'))

        # Clear existing data (optional - comment out if you want to keep existing data)
        self.stdout.write('Clearing existing data...')
        Payment.objects.all().delete()
        FeeRecord.objects.all().delete()
        TATask.objects.all().delete()
        QuizGrade.objects.all().delete()
        Quiz.objects.all().delete()
        Attendance.objects.all().delete()
        Submission.objects.all().delete()
        Assignment.objects.all().delete()
        Enrollment.objects.all().delete()
        Course.objects.all().delete()
        TAProfile.objects.all().delete()
        FacultyProfile.objects.all().delete()
        StudentProfile.objects.all().delete()
        User.objects.filter(is_superuser=False).delete()  # Keep superuser

        # Create Admin User
        self.stdout.write('Creating admin user...')
        if not User.objects.filter(username='admin').exists():
            admin = User.objects.create_superuser(
                username='admin',
                email='admin@fastflex.com',
                password='Admin@123',
                first_name='System',
                last_name='Administrator'
            )
            admin.role = 'admin'  # Ensure role is set to admin
            admin.save()
            self.stdout.write(self.style.SUCCESS(f'✓ Admin created: admin / Admin@123'))

        # Create Faculty Users
        self.stdout.write('Creating faculty users...')
        faculty_data = [
            {
                'username': 'faculty1',
                'email': 'faculty1@fastflex.com',
                'password': 'Faculty@123',
                'first_name': 'Sarah',
                'last_name': 'Smith',
                'designation': 'professor',
                'department': 'Computer Science',
                'office': 'Room 301'
            },
            {
                'username': 'faculty2',
                'email': 'faculty2@fastflex.com',
                'password': 'Faculty@123',
                'first_name': 'Michael',
                'last_name': 'Johnson',
                'designation': 'associate_professor',
                'department': 'Computer Science',
                'office': 'Room 302'
            },
            {
                'username': 'faculty3',
                'email': 'faculty3@fastflex.com',
                'password': 'Faculty@123',
                'first_name': 'Emily',
                'last_name': 'Davis',
                'designation': 'assistant_professor',
                'department': 'Software Engineering',
                'office': 'Room 303'
            }
        ]

        faculty_profiles = []
        for data in faculty_data:
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                role='faculty'
            )
            profile = FacultyProfile.objects.create(
                user=user,
                first_name=data['first_name'],
                last_name=data['last_name'],
                designation=data['designation'],
                department=data['department'],
                office=data['office']
            )
            faculty_profiles.append(profile)
            self.stdout.write(self.style.SUCCESS(f'✓ Faculty created: {data["username"]} / Faculty@123'))

        # Create TA Users
        self.stdout.write('Creating TA users...')
        ta_data = [
            {
                'username': 'ta1',
                'email': 'ta1@fastflex.com',
                'password': 'TA@123',
                'first_name': 'Ali',
                'last_name': 'Ahmed',
                'department': 'Computer Science'
            },
            {
                'username': 'ta2',
                'email': 'ta2@fastflex.com',
                'password': 'TA@123',
                'first_name': 'Fatima',
                'last_name': 'Khan',
                'department': 'Computer Science'
            },
            {
                'username': 'ta3',
                'email': 'ta3@fastflex.com',
                'password': 'TA@123',
                'first_name': 'Hassan',
                'last_name': 'Ali',
                'department': 'Software Engineering'
            }
        ]

        ta_profiles = []
        for data in ta_data:
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                role='ta'
            )
            profile = TAProfile.objects.create(
                user=user,
                first_name=data['first_name'],
                last_name=data['last_name'],
                department=data['department']
            )
            ta_profiles.append(profile)
            self.stdout.write(self.style.SUCCESS(f'✓ TA created: {data["username"]} / TA@123'))

        # Create Student Users
        self.stdout.write('Creating student users...')
        student_data = [
            {
                'username': 'student1',
                'email': 'student1@fastflex.com',
                'password': 'Student@123',
                'first_name': 'John',
                'last_name': 'Doe',
                'enrollment_number': '23k-0001',
                'department': 'Computer Science',
                'year': 3,
                'semester': 5,
                'cgpa': 3.5
            },
            {
                'username': 'student2',
                'email': 'student2@fastflex.com',
                'password': 'Student@123',
                'first_name': 'Jane',
                'last_name': 'Smith',
                'enrollment_number': '23k-0002',
                'department': 'Computer Science',
                'year': 3,
                'semester': 5,
                'cgpa': 3.8
            },
            {
                'username': 'student3',
                'email': 'student3@fastflex.com',
                'password': 'Student@123',
                'first_name': 'Ahmed',
                'last_name': 'Raza',
                'enrollment_number': '23k-0003',
                'department': 'Computer Science',
                'year': 2,
                'semester': 3,
                'cgpa': 3.2
            },
            {
                'username': 'student4',
                'email': 'student4@fastflex.com',
                'password': 'Student@123',
                'first_name': 'Ayesha',
                'last_name': 'Malik',
                'enrollment_number': '23k-0004',
                'department': 'Software Engineering',
                'year': 4,
                'semester': 7,
                'cgpa': 3.9
            },
            {
                'username': 'student5',
                'email': 'student5@fastflex.com',
                'password': 'Student@123',
                'first_name': 'Usman',
                'last_name': 'Khan',
                'enrollment_number': '23k-0005',
                'department': 'Computer Science',
                'year': 3,
                'semester': 5,
                'cgpa': 3.6
            },
            {
                'username': 'student6',
                'email': 'student6@fastflex.com',
                'password': 'Student@123',
                'first_name': 'Sara',
                'last_name': 'Ali',
                'enrollment_number': '23k-0006',
                'department': 'Computer Science',
                'year': 3,
                'semester': 5,
                'cgpa': 3.7
            },
            {
                'username': 'student7',
                'email': 'student7@fastflex.com',
                'password': 'Student@123',
                'first_name': 'Hassan',
                'last_name': 'Raza',
                'enrollment_number': '23k-0007',
                'department': 'Computer Science',
                'year': 2,
                'semester': 3,
                'cgpa': 3.4
            },
            {
                'username': 'student8',
                'email': 'student8@fastflex.com',
                'password': 'Student@123',
                'first_name': 'Mariam',
                'last_name': 'Sheikh',
                'enrollment_number': '23k-0008',
                'department': 'Software Engineering',
                'year': 4,
                'semester': 7,
                'cgpa': 3.85
            },
            {
                'username': 'student9',
                'email': 'student9@fastflex.com',
                'password': 'Student@123',
                'first_name': 'Omar',
                'last_name': 'Farooq',
                'enrollment_number': '23k-0009',
                'department': 'Computer Science',
                'year': 3,
                'semester': 5,
                'cgpa': 3.3
            },
            {
                'username': 'student10',
                'email': 'student10@fastflex.com',
                'password': 'Student@123',
                'first_name': 'Zainab',
                'last_name': 'Hussain',
                'enrollment_number': '23k-0010',
                'department': 'Computer Science',
                'year': 2,
                'semester': 3,
                'cgpa': 3.65
            }
        ]

        student_profiles = []
        for data in student_data:
            user = User.objects.create_user(
                username=data['username'],
                email=data['email'],
                password=data['password'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                role='student'
            )
            profile = StudentProfile.objects.create(
                user=user,
                first_name=data['first_name'],
                last_name=data['last_name'],
                enrollment_number=data['enrollment_number'],
                department=data['department'],
                year=data['year'],
                semester=data['semester'],
                cgpa=data['cgpa']
            )
            student_profiles.append(profile)
            self.stdout.write(self.style.SUCCESS(f'✓ Student created: {data["username"]} / Student@123'))

        # Create Courses
        self.stdout.write('Creating courses...')
        courses_data = [
            {
                'name': 'Database Management Systems',
                'code': 'CS-302',
                'description': 'Learn about relational databases, SQL, and database design',
                'semester': 5,
                'credit_hours': 3,
                'faculty': faculty_profiles[0]
            },
            {
                'name': 'Operating Systems',
                'code': 'CS-303',
                'description': 'Study of OS concepts including processes, memory management, and file systems',
                'semester': 5,
                'credit_hours': 4,
                'faculty': faculty_profiles[1]
            },
            {
                'name': 'Software Engineering',
                'code': 'SE-301',
                'description': 'Software development methodologies, testing, and project management',
                'semester': 5,
                'credit_hours': 3,
                'faculty': faculty_profiles[2]
            },
            {
                'name': 'Data Structures',
                'code': 'CS-201',
                'description': 'Arrays, linked lists, trees, graphs, and algorithm analysis',
                'semester': 3,
                'credit_hours': 4,
                'faculty': faculty_profiles[0]
            },
            {
                'name': 'Web Development',
                'code': 'CS-401',
                'description': 'Full-stack web development with modern frameworks',
                'semester': 7,
                'credit_hours': 3,
                'faculty': faculty_profiles[2]
            },
            {
                'name': 'Computer Networks',
                'code': 'CS-304',
                'description': 'Network protocols, TCP/IP, and network security',
                'semester': 5,
                'credit_hours': 3,
                'faculty': faculty_profiles[1]
            },
            {
                'name': 'Object Oriented Programming',
                'code': 'CS-202',
                'description': 'OOP concepts with Java and design patterns',
                'semester': 3,
                'credit_hours': 4,
                'faculty': faculty_profiles[0]
            },
            {
                'name': 'Artificial Intelligence',
                'code': 'CS-402',
                'description': 'Machine learning, neural networks, and AI algorithms',
                'semester': 7,
                'credit_hours': 4,
                'faculty': faculty_profiles[2]
            }
        ]

        courses = []
        for data in courses_data:
            course = Course.objects.create(
                name=data['name'],
                code=data['code'],
                description=data['description'],
                semester=data['semester'],
                credit_hours=data['credit_hours'],
                faculty=data['faculty']
            )
            courses.append(course)
            self.stdout.write(self.style.SUCCESS(f'✓ Course created: {data["code"]} - {data["name"]}'))

        # Create Enrollments
        self.stdout.write('Creating enrollments...')
        enrollments = []
        
        # Semester 5 students (students 0,1,4,5,8) - 4 courses each
        semester_5_courses = [courses[0], courses[1], courses[2], courses[5]]  # CS-302, CS-303, SE-301, CS-304
        for student in [student_profiles[0], student_profiles[1], student_profiles[4], student_profiles[5], student_profiles[8]]:
            for course in semester_5_courses:
                enrollments.append(Enrollment.objects.create(student=student, course=course, status='active'))
        
        # Semester 3 students (students 2,6,9) - 3 courses each
        semester_3_courses = [courses[3], courses[6]]  # CS-201, CS-202
        for student in [student_profiles[2], student_profiles[6], student_profiles[9]]:
            for course in semester_3_courses:
                enrollments.append(Enrollment.objects.create(student=student, course=course, status='active'))
        
        # Semester 7 students (students 3,7) - 3 courses each
        semester_7_courses = [courses[4], courses[7]]  # CS-401, CS-402
        for student in [student_profiles[3], student_profiles[7]]:
            for course in semester_7_courses:
                enrollments.append(Enrollment.objects.create(student=student, course=course, status='active'))
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(enrollments)} enrollments'))

        # Create Assignments
        self.stdout.write('Creating assignments...')
        assignments = [
            # Database Management Systems (CS-302)
            Assignment.objects.create(
                title='Assignment 1 - ER Diagrams',
                description='Create an Entity-Relationship diagram for a library management system',
                course=courses[0],
                due_date=timezone.now() + timedelta(days=7),
                max_points=100,
                uploaded_by=faculty_profiles[0]
            ),
            Assignment.objects.create(
                title='Assignment 2 - SQL Queries',
                description='Write complex SQL queries for the given database schema',
                course=courses[0],
                due_date=timezone.now() + timedelta(days=14),
                max_points=100,
                uploaded_by=faculty_profiles[0]
            ),
            Assignment.objects.create(
                title='Assignment 3 - Database Normalization',
                description='Normalize the given database to 3NF',
                course=courses[0],
                due_date=timezone.now() + timedelta(days=21),
                max_points=80,
                uploaded_by=faculty_profiles[0]
            ),
            # Operating Systems (CS-303)
            Assignment.objects.create(
                title='Assignment 1 - Process Scheduling',
                description='Implement different CPU scheduling algorithms',
                course=courses[1],
                due_date=timezone.now() + timedelta(days=10),
                max_points=100,
                uploaded_by=faculty_profiles[1]
            ),
            Assignment.objects.create(
                title='Assignment 2 - Memory Management',
                description='Simulate page replacement algorithms',
                course=courses[1],
                due_date=timezone.now() + timedelta(days=18),
                max_points=100,
                uploaded_by=faculty_profiles[1]
            ),
            # Software Engineering (SE-301)
            Assignment.objects.create(
                title='Project - Software Requirements',
                description='Document complete SRS for your project',
                course=courses[2],
                due_date=timezone.now() + timedelta(days=21),
                max_points=150,
                uploaded_by=faculty_profiles[2]
            ),
            Assignment.objects.create(
                title='Assignment - Use Case Diagrams',
                description='Create use case diagrams for a banking system',
                course=courses[2],
                due_date=timezone.now() + timedelta(days=12),
                max_points=80,
                uploaded_by=faculty_profiles[2]
            ),
            # Data Structures (CS-201)
            Assignment.objects.create(
                title='Assignment 1 - Linked Lists',
                description='Implement singly and doubly linked lists with all operations',
                course=courses[3],
                due_date=timezone.now() + timedelta(days=8),
                max_points=100,
                uploaded_by=faculty_profiles[0]
            ),
            Assignment.objects.create(
                title='Assignment 2 - Trees and Graphs',
                description='Implement BST and graph traversal algorithms',
                course=courses[3],
                due_date=timezone.now() + timedelta(days=15),
                max_points=120,
                uploaded_by=faculty_profiles[0]
            ),
            # Computer Networks (CS-304)
            Assignment.objects.create(
                title='Assignment - Network Protocols',
                description='Analyze TCP/IP packet structure and implement basic socket programming',
                course=courses[5],
                due_date=timezone.now() + timedelta(days=16),
                max_points=100,
                uploaded_by=faculty_profiles[1]
            ),
        ]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(assignments)} assignments'))

        # Create Submissions
        self.stdout.write('Creating submissions...')
        submissions = []
        
        # Assignment 1 (ER Diagrams) - CS-302 - Submissions from semester 5 students
        submissions.extend([
            Submission.objects.create(assignment=assignments[0], student=student_profiles[0], grade=85, feedback='Good work, but needs more detail in relationships'),
            Submission.objects.create(assignment=assignments[0], student=student_profiles[1], grade=95, feedback='Excellent ER diagram with proper normalization'),
            Submission.objects.create(assignment=assignments[0], student=student_profiles[4], grade=78, feedback='Missing some important entities'),
            Submission.objects.create(assignment=assignments[0], student=student_profiles[5], grade=88, feedback='Well structured diagram'),
            Submission.objects.create(assignment=assignments[0], student=student_profiles[8], grade=72, feedback='Needs improvement in cardinality'),
        ])
        
        # Assignment 4 (Process Scheduling) - CS-303 - Submissions from semester 5 students
        submissions.extend([
            Submission.objects.create(assignment=assignments[3], student=student_profiles[0], grade=90, feedback='Excellent implementation of all algorithms'),
            Submission.objects.create(assignment=assignments[3], student=student_profiles[1], grade=92, feedback='Perfect code with detailed comments'),
            Submission.objects.create(assignment=assignments[3], student=student_profiles[4], grade=82, feedback='Good but missing FCFS implementation'),
            Submission.objects.create(assignment=assignments[3], student=student_profiles[5], grade=86, feedback='Well done, minor bugs in Round Robin'),
        ])
        
        # Assignment 7 (Linked Lists) - CS-201 - Submissions from semester 3 students
        submissions.extend([
            Submission.objects.create(assignment=assignments[7], student=student_profiles[2], grade=88, feedback='Good implementation'),
            Submission.objects.create(assignment=assignments[7], student=student_profiles[6], grade=91, feedback='Excellent work with all edge cases handled'),
            Submission.objects.create(assignment=assignments[7], student=student_profiles[9], grade=84, feedback='Good effort, minor memory leak issues'),
        ])
        
        # Add some UNGRADED submissions for TA to grade
        submissions.extend([
            Submission.objects.create(assignment=assignments[0], student=student_profiles[2], status='pending'),  # ER Diagram - needs grading
            Submission.objects.create(assignment=assignments[0], student=student_profiles[3], status='pending'),  # ER Diagram - needs grading
            Submission.objects.create(assignment=assignments[1], student=student_profiles[0], status='pending'),  # Normalization - needs grading
            Submission.objects.create(assignment=assignments[3], student=student_profiles[2], status='pending'),  # Process Scheduling - needs grading
            Submission.objects.create(assignment=assignments[7], student=student_profiles[3], status='pending'),  # Linked Lists - needs grading
        ])
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(submissions)} submissions (including {5} ungraded)'))

        # Create Quizzes
        self.stdout.write('Creating quizzes...')
        quizzes = [
            # Database Management Systems (CS-302)
            Quiz.objects.create(title='Quiz 1 - Database Basics', course=courses[0], date=timezone.now() - timedelta(days=10), max_marks=50, duration_minutes=30),
            Quiz.objects.create(title='Quiz 2 - SQL Fundamentals', course=courses[0], date=timezone.now() - timedelta(days=3), max_marks=50, duration_minutes=30),
            Quiz.objects.create(title='Quiz 3 - Normalization', course=courses[0], date=timezone.now() + timedelta(days=7), max_marks=50, duration_minutes=30),
            
            # Operating Systems (CS-303)
            Quiz.objects.create(title='Quiz 1 - OS Basics', course=courses[1], date=timezone.now() - timedelta(days=8), max_marks=40, duration_minutes=25),
            Quiz.objects.create(title='Midterm Quiz - Process Management', course=courses[1], date=timezone.now() + timedelta(days=3), max_marks=100, duration_minutes=60),
            
            # Software Engineering (SE-301)
            Quiz.objects.create(title='Quiz 1 - SDLC Models', course=courses[2], date=timezone.now() - timedelta(days=6), max_marks=40, duration_minutes=25),
            Quiz.objects.create(title='Quiz 2 - Requirements Engineering', course=courses[2], date=timezone.now() + timedelta(days=10), max_marks=50, duration_minutes=30),
            
            # Data Structures (CS-201)
            Quiz.objects.create(title='Quiz 1 - Arrays and Complexity', course=courses[3], date=timezone.now() - timedelta(days=5), max_marks=40, duration_minutes=25),
            Quiz.objects.create(title='Quiz 2 - Linked Lists', course=courses[3], date=timezone.now() + timedelta(days=5), max_marks=50, duration_minutes=30),
            
            # Computer Networks (CS-304)
            Quiz.objects.create(title='Quiz 1 - Network Fundamentals', course=courses[5], date=timezone.now() - timedelta(days=4), max_marks=45, duration_minutes=30),
        ]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(quizzes)} quizzes'))

        # Create Quiz Grades
        self.stdout.write('Creating quiz grades...')
        quiz_grades = []
        
        # Quiz 1 - Database Basics (all semester 5 students)
        quiz_grades.extend([
            QuizGrade.objects.create(quiz=quizzes[0], student=student_profiles[0], marks_obtained=42, remarks='Good effort'),
            QuizGrade.objects.create(quiz=quizzes[0], student=student_profiles[1], marks_obtained=48, remarks='Excellent performance'),
            QuizGrade.objects.create(quiz=quizzes[0], student=student_profiles[4], marks_obtained=38, remarks='Need more practice'),
            QuizGrade.objects.create(quiz=quizzes[0], student=student_profiles[5], marks_obtained=44, remarks='Well done'),
            QuizGrade.objects.create(quiz=quizzes[0], student=student_profiles[8], marks_obtained=35, remarks='Improve on SQL'),
        ])
        
        # Quiz 2 - SQL Fundamentals (semester 5 students)
        quiz_grades.extend([
            QuizGrade.objects.create(quiz=quizzes[1], student=student_profiles[0], marks_obtained=45, remarks='Much improved'),
            QuizGrade.objects.create(quiz=quizzes[1], student=student_profiles[1], marks_obtained=50, remarks='Perfect score'),
            QuizGrade.objects.create(quiz=quizzes[1], student=student_profiles[4], marks_obtained=40, remarks='Good progress'),
            QuizGrade.objects.create(quiz=quizzes[1], student=student_profiles[5], marks_obtained=46, remarks='Excellent'),
        ])
        
        # Quiz 1 - OS Basics (semester 5 students)
        quiz_grades.extend([
            QuizGrade.objects.create(quiz=quizzes[3], student=student_profiles[0], marks_obtained=36, remarks='Good understanding'),
            QuizGrade.objects.create(quiz=quizzes[3], student=student_profiles[1], marks_obtained=38, remarks='Very good'),
            QuizGrade.objects.create(quiz=quizzes[3], student=student_profiles[4], marks_obtained=32, remarks='Average'),
            QuizGrade.objects.create(quiz=quizzes[3], student=student_profiles[8], marks_obtained=30, remarks='Need improvement'),
        ])
        
        # Quiz 1 - SDLC Models (semester 5 students)
        quiz_grades.extend([
            QuizGrade.objects.create(quiz=quizzes[5], student=student_profiles[0], marks_obtained=35, remarks='Good'),
            QuizGrade.objects.create(quiz=quizzes[5], student=student_profiles[1], marks_obtained=38, remarks='Excellent'),
            QuizGrade.objects.create(quiz=quizzes[5], student=student_profiles[4], marks_obtained=33, remarks='Fair'),
            QuizGrade.objects.create(quiz=quizzes[5], student=student_profiles[5], marks_obtained=37, remarks='Very good'),
        ])
        
        # Quiz 1 - Arrays and Complexity (semester 3 students)
        quiz_grades.extend([
            QuizGrade.objects.create(quiz=quizzes[7], student=student_profiles[2], marks_obtained=34, remarks='Good work'),
            QuizGrade.objects.create(quiz=quizzes[7], student=student_profiles[6], marks_obtained=38, remarks='Excellent'),
            QuizGrade.objects.create(quiz=quizzes[7], student=student_profiles[9], marks_obtained=36, remarks='Well done'),
        ])
        
        # Quiz 1 - Network Fundamentals (semester 5 students)
        quiz_grades.extend([
            QuizGrade.objects.create(quiz=quizzes[9], student=student_profiles[0], marks_obtained=40, remarks='Good understanding'),
            QuizGrade.objects.create(quiz=quizzes[9], student=student_profiles[1], marks_obtained=43, remarks='Excellent'),
            QuizGrade.objects.create(quiz=quizzes[9], student=student_profiles[5], marks_obtained=39, remarks='Well done'),
        ])
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(quiz_grades)} quiz grades'))

        # Create Attendance Records
        self.stdout.write('Creating attendance records...')
        attendance_count = 0
        
        # CS-302 (Database) - 15 days of attendance
        for i in range(15):
            attendance = Attendance.objects.create(
                course=courses[0],
                marked_by=faculty_profiles[0],
                date=timezone.now() - timedelta(days=15-i)
            )
            # Regular attendees
            attendance.students_present.add(student_profiles[0], student_profiles[1], student_profiles[5])
            # Student 4 - 80% attendance (absent every 5th class)
            if i % 5 != 0:
                attendance.students_present.add(student_profiles[4])
            # Student 8 - 70% attendance (absent every 3rd class)
            if i % 3 != 0:
                attendance.students_present.add(student_profiles[8])
            attendance_count += 1
        
        # CS-303 (Operating Systems) - 12 days of attendance
        for i in range(12):
            attendance = Attendance.objects.create(
                course=courses[1],
                marked_by=faculty_profiles[1],
                date=timezone.now() - timedelta(days=12-i)
            )
            attendance.students_present.add(student_profiles[0], student_profiles[1], student_profiles[4], student_profiles[5])
            if i % 4 != 0:  # Student 8 absent every 4th class
                attendance.students_present.add(student_profiles[8])
            attendance_count += 1
        
        # SE-301 (Software Engineering) - 10 days of attendance
        for i in range(10):
            attendance = Attendance.objects.create(
                course=courses[2],
                marked_by=faculty_profiles[2],
                date=timezone.now() - timedelta(days=10-i)
            )
            attendance.students_present.add(student_profiles[0], student_profiles[1], student_profiles[4], student_profiles[5])
            if i % 5 != 0:
                attendance.students_present.add(student_profiles[8])
            attendance_count += 1
        
        # CS-201 (Data Structures) - 12 days of attendance for semester 3
        for i in range(12):
            attendance = Attendance.objects.create(
                course=courses[3],
                marked_by=faculty_profiles[0],
                date=timezone.now() - timedelta(days=12-i)
            )
            attendance.students_present.add(student_profiles[2], student_profiles[6], student_profiles[9])
            attendance_count += 1
        
        # CS-304 (Computer Networks) - 10 days of attendance
        for i in range(10):
            attendance = Attendance.objects.create(
                course=courses[5],
                marked_by=faculty_profiles[1],
                date=timezone.now() - timedelta(days=10-i)
            )
            attendance.students_present.add(student_profiles[0], student_profiles[1], student_profiles[5])
            if i % 3 != 0:
                attendance.students_present.add(student_profiles[4], student_profiles[8])
            attendance_count += 1
        
        # CS-202 (OOP) - 10 days of attendance for semester 3
        for i in range(10):
            attendance = Attendance.objects.create(
                course=courses[6],
                marked_by=faculty_profiles[0],
                date=timezone.now() - timedelta(days=10-i)
            )
            attendance.students_present.add(student_profiles[2], student_profiles[9])
            if i % 4 != 0:  # Student 6 occasionally absent
                attendance.students_present.add(student_profiles[6])
            attendance_count += 1
        
        self.stdout.write(self.style.SUCCESS(f'✓ Created {attendance_count} attendance records'))

        # Assign TAs to Courses (Max 2 per TA)
        self.stdout.write('Assigning TAs to courses...')
        # TA1 - Computer Science courses (2 courses max)
        ta_profiles[0].courses_assigned.add(courses[0], courses[1])  # CS-302, CS-303
        # TA2 - More CS courses (2 courses max)
        ta_profiles[1].courses_assigned.add(courses[0], courses[5])  # CS-302, CS-304
        # TA3 - SE and advanced CS courses (2 courses max)
        ta_profiles[2].courses_assigned.add(courses[2], courses[4])  # SE-301, CS-401
        self.stdout.write(self.style.SUCCESS(f'✓ Assigned TAs to courses (max 2 per TA)'))

        # Create TA Tasks
        self.stdout.write('Creating TA tasks...')
        ta_tasks = [
            TATask.objects.create(
                ta=ta_profiles[0],
                course=courses[0],
                assigned_by=faculty_profiles[0],
                title='Grade Assignment 1',
                description='Grade all submissions for ER Diagram assignment',
                due_date=timezone.now() + timedelta(days=3),
                status='pending'
            ),
            TATask.objects.create(
                ta=ta_profiles[1],
                course=courses[0],
                assigned_by=faculty_profiles[0],
                title='Prepare Quiz Questions',
                description='Create 20 MCQs for Quiz 2',
                due_date=timezone.now() + timedelta(days=5),
                status='pending'
            ),
            TATask.objects.create(
                ta=ta_profiles[0],
                course=courses[1],
                assigned_by=faculty_profiles[1],
                title='Lab Session Preparation',
                description='Setup lab environment for process scheduling practical',
                due_date=timezone.now() + timedelta(days=2),
                status='completed'
            ),
        ]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(ta_tasks)} TA tasks'))

        # Create Fee Records
        self.stdout.write('Creating fee records...')
        fee_records = []
        for student in student_profiles:
            fee = FeeRecord.objects.create(
                student=student,
                semester=student.semester,
                year=student.year,
                total_fee=50000,
                paid_amount=0  # Will be updated by payments
            )
            fee_records.append(fee)
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(fee_records)} fee records'))

        # Create Payments
        self.stdout.write('Creating payments...')
        payments = [
            Payment.objects.create(
                fee_record=fee_records[0],
                amount=30000,
                payment_method='bank_transfer',
                transaction_id='TXN001'
            ),
            Payment.objects.create(
                fee_record=fee_records[1],
                amount=30000,
                payment_method='credit_card',
                transaction_id='TXN002'
            ),
            Payment.objects.create(
                fee_record=fee_records[2],
                amount=30000,
                payment_method='cash',
                transaction_id='TXN003'
            ),
        ]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(payments)} payments'))

        # Summary
        self.stdout.write(self.style.SUCCESS('\n' + '='*50))
        self.stdout.write(self.style.SUCCESS('✅ DATABASE SEEDING COMPLETED!'))
        self.stdout.write(self.style.SUCCESS('='*50))
        self.stdout.write(self.style.SUCCESS('\n📊 SUMMARY:'))
        self.stdout.write(f'• Admin Users: 1')
        self.stdout.write(f'• Faculty: {len(faculty_profiles)}')
        self.stdout.write(f'• TAs: {len(ta_profiles)}')
        self.stdout.write(f'• Students: {len(student_profiles)}')
        self.stdout.write(f'• Courses: {len(courses)}')
        self.stdout.write(f'• Enrollments: {len(enrollments)}')
        self.stdout.write(f'• Assignments: {len(assignments)}')
        self.stdout.write(f'• Submissions: {len(submissions)}')
        self.stdout.write(f'• Quizzes: {len(quizzes)}')
        self.stdout.write(f'• Attendance Records: {attendance_count}')
        self.stdout.write(f'• TA Tasks: {len(ta_tasks)}')
        self.stdout.write(f'• Fee Records: {len(fee_records)}')
        self.stdout.write(f'• Payments: {len(payments)}')
        
        self.stdout.write(self.style.SUCCESS('\n🔐 LOGIN CREDENTIALS:'))
        self.stdout.write('─' * 50)
        self.stdout.write('Admin:    admin     / Admin@123')
        self.stdout.write('Faculty:  faculty1  / Faculty@123')
        self.stdout.write('          faculty2  / Faculty@123')
        self.stdout.write('          faculty3  / Faculty@123')
        self.stdout.write('TA:       ta1       / TA@123')
        self.stdout.write('          ta2       / TA@123')
        self.stdout.write('          ta3       / TA@123')
        self.stdout.write('Student:  student1  / Student@123')
        self.stdout.write('          student2  / Student@123')
        self.stdout.write('          student3  / Student@123')
        self.stdout.write('          student4  / Student@123')
        self.stdout.write('          student5  / Student@123')
        self.stdout.write('─' * 50)
        self.stdout.write(self.style.SUCCESS('\n✨ You can now login at http://localhost:3000'))
        self.stdout.write(self.style.SUCCESS('✨ Admin panel: http://127.0.0.1:8000/admin/\n'))
