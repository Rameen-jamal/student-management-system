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
        enrollments = [
            # Student 1 (semester 5)
            Enrollment.objects.create(student=student_profiles[0], course=courses[0], status='active'),
            Enrollment.objects.create(student=student_profiles[0], course=courses[1], status='active'),
            Enrollment.objects.create(student=student_profiles[0], course=courses[2], status='active'),
            
            # Student 2 (semester 5)
            Enrollment.objects.create(student=student_profiles[1], course=courses[0], status='active'),
            Enrollment.objects.create(student=student_profiles[1], course=courses[1], status='active'),
            Enrollment.objects.create(student=student_profiles[1], course=courses[2], status='active'),
            
            # Student 3 (semester 3)
            Enrollment.objects.create(student=student_profiles[2], course=courses[3], status='active'),
            
            # Student 4 (semester 7)
            Enrollment.objects.create(student=student_profiles[3], course=courses[4], status='active'),
            
            # Student 5 (semester 5)
            Enrollment.objects.create(student=student_profiles[4], course=courses[0], status='active'),
            Enrollment.objects.create(student=student_profiles[4], course=courses[2], status='active'),
        ]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(enrollments)} enrollments'))

        # Create Assignments
        self.stdout.write('Creating assignments...')
        assignments = [
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
                title='Assignment 1 - Process Scheduling',
                description='Implement different CPU scheduling algorithms',
                course=courses[1],
                due_date=timezone.now() + timedelta(days=10),
                max_points=100,
                uploaded_by=faculty_profiles[1]
            ),
            Assignment.objects.create(
                title='Project - Software Requirements',
                description='Document complete SRS for your project',
                course=courses[2],
                due_date=timezone.now() + timedelta(days=21),
                max_points=150,
                uploaded_by=faculty_profiles[2]
            ),
        ]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(assignments)} assignments'))

        # Create Submissions
        self.stdout.write('Creating submissions...')
        submissions = [
            Submission.objects.create(
                assignment=assignments[0],
                student=student_profiles[0],
                grade=85,
                feedback='Good work, but needs more detail in relationships'
            ),
            Submission.objects.create(
                assignment=assignments[0],
                student=student_profiles[1],
                grade=95,
                feedback='Excellent ER diagram with proper normalization'
            ),
            Submission.objects.create(
                assignment=assignments[0],
                student=student_profiles[4],
                grade=78,
                feedback='Missing some important entities'
            ),
        ]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(submissions)} submissions'))

        # Create Quizzes
        self.stdout.write('Creating quizzes...')
        quizzes = [
            Quiz.objects.create(
                title='Quiz 1 - Database Basics',
                course=courses[0],
                date=timezone.now() - timedelta(days=5),
                max_marks=50
            ),
            Quiz.objects.create(
                title='Quiz 2 - Normalization',
                course=courses[0],
                date=timezone.now() + timedelta(days=7),
                max_marks=50
            ),
            Quiz.objects.create(
                title='Midterm Quiz - OS Concepts',
                course=courses[1],
                date=timezone.now() + timedelta(days=3),
                max_marks=100
            ),
        ]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(quizzes)} quizzes'))

        # Create Quiz Grades
        self.stdout.write('Creating quiz grades...')
        quiz_grades = [
            QuizGrade.objects.create(quiz=quizzes[0], student=student_profiles[0], marks_obtained=42),
            QuizGrade.objects.create(quiz=quizzes[0], student=student_profiles[1], marks_obtained=48),
            QuizGrade.objects.create(quiz=quizzes[0], student=student_profiles[4], marks_obtained=38),
        ]
        self.stdout.write(self.style.SUCCESS(f'✓ Created {len(quiz_grades)} quiz grades'))

        # Create Attendance Records
        self.stdout.write('Creating attendance records...')
        attendance_count = 0
        for i in range(10):  # 10 days of attendance
            attendance = Attendance.objects.create(
                course=courses[0],
                marked_by=faculty_profiles[0]
            )
            # Add students present (student 1 and 2 always present, student 5 sometimes absent)
            attendance.students_present.add(student_profiles[0])
            attendance.students_present.add(student_profiles[1])
            if i % 3 != 0:  # Student 5 absent every 3rd day
                attendance.students_present.add(student_profiles[4])
            attendance_count += 1
        self.stdout.write(self.style.SUCCESS(f'✓ Created {attendance_count} attendance records'))

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
