# from rest_framework import viewsets, permissions
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.parsers import MultiPartParser, FormParser
# from .models import Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask
# from .serializers import (
#     CourseSerializer, AssignmentSerializer, SubmissionSerializer,
#     AttendanceSerializer, QuizSerializer, QuizGradeSerializer, TATaskSerializer
# )


# class CourseViewSet(viewsets.ModelViewSet):
#     serializer_class = CourseSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # Only courses where current user is the faculty
#         return Course.objects.filter(faculty__user=self.request.user)


# class AssignmentViewSet(viewsets.ModelViewSet):
#     serializer_class = AssignmentSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]  # important for file uploads

#     def get_queryset(self):
#         # Only show assignments uploaded by current faculty
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Assignment.objects.filter(uploaded_by=faculty_profile)
#         return Assignment.objects.none()

#     def perform_create(self, serializer):
#         # Automatically assign current faculty as uploaded_by
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         serializer.save(uploaded_by=faculty_profile)


# class SubmissionViewSet(viewsets.ModelViewSet):
#     serializer_class = SubmissionSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def get_queryset(self):
#         # Only submissions for assignments uploaded by current faculty
#         return Submission.objects.filter(assignment__uploaded_by__user=self.request.user)


# class AttendanceViewSet(viewsets.ModelViewSet):
#     serializer_class = AttendanceSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Attendance.objects.filter(course__faculty__user=self.request.user)


# class QuizViewSet(viewsets.ModelViewSet):
#     serializer_class = QuizSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Quiz.objects.filter(course__faculty__user=self.request.user)


# class QuizGradeViewSet(viewsets.ModelViewSet):
#     serializer_class = QuizGradeSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return QuizGrade.objects.filter(quiz__course__faculty__user=self.request.user)


# class TATaskViewSet(viewsets.ModelViewSet):
#     serializer_class = TATaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return TATask.objects.filter(assigned_by__user=self.request.user)
# from rest_framework import viewsets, permissions
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.parsers import MultiPartParser, FormParser
# from .models import Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask
# from .serializers import (
#     CourseSerializer, AssignmentSerializer, SubmissionSerializer,
#     AttendanceSerializer, QuizSerializer, QuizGradeSerializer, TATaskSerializer
# )


# class CourseViewSet(viewsets.ModelViewSet):
#     queryset = Course.objects.all()  # Add this line
#     serializer_class = CourseSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         # Only courses where current user is the faculty
#         return Course.objects.filter(faculty__user=self.request.user)


# class AssignmentViewSet(viewsets.ModelViewSet):
#     queryset = Assignment.objects.all()  # Add this line
#     serializer_class = AssignmentSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]  # important for file uploads

#     def get_queryset(self):
#         # Only show assignments uploaded by current faculty
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Assignment.objects.filter(uploaded_by=faculty_profile)
#         return Assignment.objects.none()

#     def perform_create(self, serializer):
#         # Automatically assign current faculty as uploaded_by
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         serializer.save(uploaded_by=faculty_profile)


# class SubmissionViewSet(viewsets.ModelViewSet):
#     queryset = Submission.objects.all()  # Add this line
#     serializer_class = SubmissionSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def get_queryset(self):
#         # Only submissions for assignments uploaded by current faculty
#         return Submission.objects.filter(assignment__uploaded_by__user=self.request.user)


# class AttendanceViewSet(viewsets.ModelViewSet):
#     queryset = Attendance.objects.all()  # Add this line
#     serializer_class = AttendanceSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Attendance.objects.filter(course__faculty__user=self.request.user)


# class QuizViewSet(viewsets.ModelViewSet):
#     queryset = Quiz.objects.all()  # Add this line
#     serializer_class = QuizSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return Quiz.objects.filter(course__faculty__user=self.request.user)


# class QuizGradeViewSet(viewsets.ModelViewSet):
#     queryset = QuizGrade.objects.all()  # Add this line
#     serializer_class = QuizGradeSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return QuizGrade.objects.filter(quiz__course__faculty__user=self.request.user)


# class TATaskViewSet(viewsets.ModelViewSet):
#     queryset = TATask.objects.all()  # Add this line
#     serializer_class = TATaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         return TATask.objects.filter(assigned_by__user=self.request.user)
# from django.shortcuts import render
# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.parsers import MultiPartParser, FormParser

# from .models import Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask
# from .serializers import (
#     CourseSerializer, AssignmentSerializer, SubmissionSerializer,
#     AttendanceSerializer, QuizSerializer, QuizGradeSerializer, TATaskSerializer
# )
# from faculty.models import FacultyProfile


# # ------------------ DRF ViewSets ------------------

# class CourseViewSet(viewsets.ModelViewSet):
#     serializer_class = CourseSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return faculty_profile.courses_teaching.all()
#         return Course.objects.none()


# class AssignmentViewSet(viewsets.ModelViewSet):
#     serializer_class = AssignmentSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Assignment.objects.filter(uploaded_by=faculty_profile)
#         return Assignment.objects.none()

#     def perform_create(self, serializer):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         serializer.save(uploaded_by=faculty_profile)


# class SubmissionViewSet(viewsets.ModelViewSet):
#     serializer_class = SubmissionSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]

#     def get_queryset(self):
#         return Submission.objects.filter(assignment__uploaded_by__user=self.request.user)


# class AttendanceViewSet(viewsets.ModelViewSet):
#     serializer_class = AttendanceSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Attendance.objects.filter(course__in=faculty_profile.courses_teaching.all())
#         return Attendance.objects.none()


# class QuizViewSet(viewsets.ModelViewSet):
#     serializer_class = QuizSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Quiz.objects.filter(course__in=faculty_profile.courses_teaching.all())
#         return Quiz.objects.none()


# class QuizGradeViewSet(viewsets.ModelViewSet):
#     serializer_class = QuizGradeSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return QuizGrade.objects.filter(quiz__course__in=faculty_profile.courses_teaching.all())
#         return QuizGrade.objects.none()


# class TATaskViewSet(viewsets.ModelViewSet):
#     serializer_class = TATaskSerializer
#     permission_classes = [IsAuthenticated]

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return TATask.objects.filter(assigned_by=faculty_profile)
#         return TATask.objects.none()
# from django.shortcuts import render
# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.parsers import MultiPartParser, FormParser

# from .models import Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask
# from .serializers import (
#     CourseSerializer, AssignmentSerializer, SubmissionSerializer,
#     AttendanceSerializer, QuizSerializer, QuizGradeSerializer, TATaskSerializer
# )
# from faculty.models import FacultyProfile


# # ------------------ DRF ViewSets ------------------

# # class CourseViewSet(viewsets.ModelViewSet):
# #     serializer_class = CourseSerializer
# #     permission_classes = [IsAuthenticated]

# #     def get_queryset(self):
# #         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
# #         if faculty_profile:
# #             return faculty_profile.courses_teaching.all()
# #         return Course.objects.none()
# class CourseViewSet(viewsets.ModelViewSet):
#     serializer_class = CourseSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = Course.objects.all()  # Add this line

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return faculty_profile.courses_teaching.all()
#         return Course.objects.none()


# class AssignmentViewSet(viewsets.ModelViewSet):
#     serializer_class = AssignmentSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]
#     queryset = Assignment.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Assignment.objects.filter(uploaded_by=faculty_profile)
#         return Assignment.objects.none()

#     def perform_create(self, serializer):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         serializer.save(uploaded_by=faculty_profile)


# class SubmissionViewSet(viewsets.ModelViewSet):
#     serializer_class = SubmissionSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]
#     queryset = Submission.objects.all()

#     def get_queryset(self):
#         return Submission.objects.filter(assignment__uploaded_by__user=self.request.user)


# class AttendanceViewSet(viewsets.ModelViewSet):
#     serializer_class = AttendanceSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = Attendance.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Attendance.objects.filter(course__in=faculty_profile.courses_teaching.all())
#         return Attendance.objects.none()


# class QuizViewSet(viewsets.ModelViewSet):
#     serializer_class = QuizSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = Quiz.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Quiz.objects.filter(course__in=faculty_profile.courses_teaching.all())
#         return Quiz.objects.none()


# class QuizGradeViewSet(viewsets.ModelViewSet):
#     serializer_class = QuizGradeSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = QuizGrade.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return QuizGrade.objects.filter(quiz__course__in=faculty_profile.courses_teaching.all())
#         return QuizGrade.objects.none()


# class TATaskViewSet(viewsets.ModelViewSet):
#     serializer_class = TATaskSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = TATask.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return TATask.objects.filter(assigned_by=faculty_profile)
#         return TATask.objects.none()



# from rest_framework import viewsets, status
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.parsers import MultiPartParser, FormParser

# from .models import (
#     Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask, CourseAnnouncement
# )
# from .serializers import (
#     CourseSerializer, AssignmentSerializer, SubmissionSerializer,
#     AttendanceSerializer, QuizSerializer, QuizGradeSerializer, TATaskSerializer,
#     CourseAnnouncementSerializer
# )
# from faculty.models import FacultyProfile
# from students.models import StudentProfile

# # ------------------ Course ------------------
# class CourseViewSet(viewsets.ModelViewSet):
#     serializer_class = CourseSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]
#     queryset = Course.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return faculty_profile.courses_teaching.all()
#         return Course.objects.none()

#     # Students list for a course
#     @action(detail=True, methods=['get'])
#     def students(self, request, pk=None):
#         course = self.get_object()
#         students = course.students.all()  # Assuming you have a M2M for enrolled students
#         data = [{"id": s.id, "name": f"{s.first_name} {s.last_name}", "email": s.user.email} for s in students]
#         return Response(data)

#     # Post course announcement
#     @action(detail=True, methods=['post'])
#     def post_announcement(self, request, pk=None):
#         course = self.get_object()
#         serializer = CourseAnnouncementSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(course=course, posted_by=getattr(request.user, 'facultyprofile', None))
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
# from rest_framework import viewsets, status
# from rest_framework.decorators import action
# from rest_framework.response import Response
# from rest_framework.permissions import IsAuthenticated
# from rest_framework.parsers import MultiPartParser, FormParser

# from .models import (
#     Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask,
#     CourseAnnouncement, StudentMessage
# )
# from .serializers import (
#     CourseSerializer, AssignmentSerializer, SubmissionSerializer,
#     AttendanceSerializer, QuizSerializer, QuizGradeSerializer, TATaskSerializer,
#     CourseAnnouncementSerializer, StudentMessageSerializer
# )
# from faculty.models import FacultyProfile
# from students.models import StudentProfile

# # --- CourseViewSet ---
# class CourseViewSet(viewsets.ModelViewSet):
#     serializer_class = CourseSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]
#     queryset = Course.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return faculty_profile.courses.all()
#         return Course.objects.none()

#     # List students in a course
#     @action(detail=True, methods=['get'])
#     def students(self, request, pk=None):
#         course = self.get_object()
#         students = courses.students.all()
#         data = [{"id": s.id, "name": f"{s.first_name} {s.last_name}", "email": s.user.email} for s in students]
#         return Response(data)

#     # Post course announcement
#     @action(detail=True, methods=['post'])
#     def post_announcement(self, request, pk=None):
#         course = self.get_object()
#         serializer = CourseAnnouncementSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save(course=course, posted_by=getattr(request.user, 'facultyprofile', None))
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     # Send message to a student
#     @action(detail=True, methods=['post'])
#     def message_student(self, request, pk=None):
#         course = self.get_object()
#         student_id = request.data.get('student_id')
#         subject = request.data.get('subject')
#         message_text = request.data.get('message')
#         try:
#             student = StudentProfile.objects.get(id=student_id)
#         except StudentProfile.DoesNotExist:
#             return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

#         msg = StudentMessage.objects.create(
#             sender=getattr(request.user, 'facultyprofile', None),
#             recipient=student,
#             course=course,
#             subject=subject,
#             message=message_text
#         )
#         serializer = StudentMessageSerializer(msg)
#         return Response(serializer.data, status=status.HTTP_201_CREATED)


# # --- SubmissionViewSet ---
# class SubmissionViewSet(viewsets.ModelViewSet):
#     serializer_class = SubmissionSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]
#     queryset = Submission.objects.all()

#     def get_queryset(self):
#         return Submission.objects.filter(assignment__uploaded_by__user=self.request.user)

#     # Approve/reject late submission
#     @action(detail=True, methods=['post'])
#     def update_status(self, request, pk=None):
#         submission = self.get_object()
#         status_choice = request.data.get('status')
#         feedback = request.data.get('feedback', submission.feedback)
#         grade = request.data.get('grade', submission.grade)

#         if status_choice not in ['pending', 'approved', 'rejected']:
#             return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

#         submission.status = status_choice
#         submission.feedback = feedback
#         submission.grade = grade
#         submission.save()
#         return Response({"status": f"Submission {status_choice}"})


# # ------------------ Assignment ------------------
# class AssignmentViewSet(viewsets.ModelViewSet):
#     serializer_class = AssignmentSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]
#     queryset = Assignment.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Assignment.objects.filter(uploaded_by=faculty_profile)
#         return Assignment.objects.none()

#     def perform_create(self, serializer):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         serializer.save(uploaded_by=faculty_profile)

# # ------------------ Submission ------------------
# # class SubmissionViewSet(viewsets.ModelViewSet):
# #     serializer_class = SubmissionSerializer
# #     permission_classes = [IsAuthenticated]
# #     parser_classes = [MultiPartParser, FormParser]
# #     queryset = Submission.objects.all()

# #     def get_queryset(self):
# #         return Submission.objects.filter(assignment__uploaded_by__user=self.request.user)

# #     # Approve or reject late submission
# #     @action(detail=True, methods=['post'])
# #     def approve_late(self, request, pk=None):
# #         submission = self.get_object()
# #         submission.feedback = request.data.get('feedback', submission.feedback)
# #         submission.grade = request.data.get('grade', submission.grade)
# #         submission.save()
# #         return Response({"status": "Late submission updated"})

# # ------------------ Attendance ------------------
# class AttendanceViewSet(viewsets.ModelViewSet):
#     serializer_class = AttendanceSerializer
#     permission_classes = [IsAuthenticated]
#     parser_classes = [MultiPartParser, FormParser]
#     queryset = Attendance.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Attendance.objects.filter(course__in=faculty_profile.courses.all())
#         return Attendance.objects.none()

#     # Mark attendance manually
#     @action(detail=True, methods=['post'])
#     def mark_attendance(self, request, pk=None):
#         attendance = self.get_object()
#         student_ids = request.data.get('student_ids', [])
#         students = StudentProfile.objects.filter(id__in=student_ids)
#         attendance.students_present.set(students)
#         attendance.marked_by = getattr(request.user, 'facultyprofile', None)
#         attendance.save()
#         return Response({"status": "Attendance marked"})

# # ------------------ Quiz ------------------
# class QuizViewSet(viewsets.ModelViewSet):
#     serializer_class = QuizSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = Quiz.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return Quiz.objects.filter(course__in=faculty_profile.courses.all())
#         return Quiz.objects.none()

# # ------------------ Quiz Grades ------------------
# class QuizGradeViewSet(viewsets.ModelViewSet):
#     serializer_class = QuizGradeSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = QuizGrade.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return QuizGrade.objects.filter(quiz__course__in=faculty_profile.courses.all())
#         return QuizGrade.objects.none()

# # ------------------ TA Task ------------------
# class TATaskViewSet(viewsets.ModelViewSet):
#     serializer_class = TATaskSerializer
#     permission_classes = [IsAuthenticated]
#     queryset = TATask.objects.all()

#     def get_queryset(self):
#         faculty_profile = getattr(self.request.user, 'facultyprofile', None)
#         if faculty_profile:
#             return TATask.objects.filter(assigned_by=faculty_profile)
#         return TATask.objects.none()

from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.parsers import JSONParser

from .models import (
    Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask,
    CourseAnnouncement, StudentMessage
)
from .serializers import (
    CourseSerializer, AssignmentSerializer, SubmissionSerializer,
    AttendanceSerializer, QuizSerializer, QuizGradeSerializer, TATaskSerializer,
    CourseAnnouncementSerializer, StudentMessageSerializer
)
from faculty.models import FacultyProfile
from students.models import StudentProfile

# --- CourseViewSet (FIXED: students action) ---
class CourseViewSet(viewsets.ModelViewSet):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    queryset = Course.objects.all()

    def get_queryset(self):
        user = self.request.user
        
        # Faculty: see courses they teach
        if hasattr(user, 'facultyprofile'):
            return user.facultyprofile.courses.all()
        
        # TAs: see courses they're assigned to
        elif hasattr(user, 'taprofile'):
            return user.taprofile.courses_assigned.all()
        
        # Students: see courses they're enrolled in
        elif hasattr(user, 'student_profile'):
            return user.student_profile.courses_enrolled.all()
        
        return Course.objects.none()

    # List students in a course 
    @action(detail=True, methods=['get'])
    def students(self, request, pk=None):
        course = self.get_object()
        # FIX: Changed 'courses' to 'course'
        students = course.students.all() 
        data = [{"id": s.id, "name": f"{s.first_name} {s.last_name}", "email": s.user.email} for s in students]
        return Response(data)

    # Post course announcement
    @action(detail=True, methods=['post'], parser_classes=[JSONParser]) # <--- ADDED JSONPARSER
    def post_announcement(self, request, pk=None):
        course = self.get_object()
        faculty_profile = getattr(request.user, 'facultyprofile', None)

        if not faculty_profile:
            return Response(
                {"detail": "User is not linked to a Faculty Profile. Please check your data setup in the Admin panel."}, 
                status=status.HTTP_403_FORBIDDEN
            )
        
        # Create the announcement
        announcement = CourseAnnouncement.objects.create(
            course=course,
            title=request.data.get('title', ''),
            content=request.data.get('content', ''),
            posted_by=faculty_profile
        )
        
        serializer = CourseAnnouncementSerializer(announcement)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    # Get attendance history for a course
    @action(detail=True, methods=['get'], url_path='attendance_history')
    def attendance_history(self, request, pk=None):
        course = self.get_object()
        attendances = Attendance.objects.filter(course=course).order_by('-date')
        serializer = AttendanceSerializer(attendances, many=True)
        return Response(serializer.data)
    
    # Mark attendance for the specific course
    @action(detail=True, methods=['post'], url_path='mark_attendance', parser_classes=[JSONParser])
    def mark_attendance(self, request, pk=None):
        course = self.get_object() 
        student_ids = request.data.get('student_ids', [])
        
        marked_by = getattr(request.user, 'facultyprofile', None)
        
        # Create a new Attendance object
        attendance = Attendance.objects.create(
            course=course, 
            marked_by=marked_by, 
            attendance_type='manual' 
        )
        
        # Link the present students
        students_to_set = StudentProfile.objects.filter(id__in=student_ids)
        attendance.students_present.set(students_to_set) 
        
        serializer = AttendanceSerializer(attendance) 
        return Response(serializer.data, status=status.HTTP_201_CREATED)


    # Assign TA to course
    @action(detail=True, methods=['post'], parser_classes=[JSONParser])
    def assign_ta(self, request, pk=None):
        course = self.get_object()
        faculty_profile = getattr(request.user, 'facultyprofile', None)
        
        # Check if user is faculty and owns this course
        if not faculty_profile:
            return Response(
                {"error": "Only faculty can assign TAs"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if course not in faculty_profile.courses.all():
            return Response(
                {"error": "You can only assign TAs to your own courses"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        ta_id = request.data.get('ta_id')
        if not ta_id:
            return Response({"error": "TA ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            from ta.models import TAProfile
            ta_profile = TAProfile.objects.get(id=ta_id)
            
            # Add course to TA's assigned courses
            ta_profile.courses_assigned.add(course)
            
            return Response(
                {"message": f"TA {ta_profile.first_name} {ta_profile.last_name} assigned to {course.code} successfully"},
                status=status.HTTP_200_OK
            )
        except TAProfile.DoesNotExist:
            return Response({"error": "TA not found"}, status=status.HTTP_404_NOT_FOUND)

    # Remove TA from course
    @action(detail=True, methods=['post'], parser_classes=[JSONParser])
    def remove_ta(self, request, pk=None):
        course = self.get_object()
        faculty_profile = getattr(request.user, 'facultyprofile', None)
        
        # Check if user is faculty and owns this course
        if not faculty_profile:
            return Response(
                {"error": "Only faculty can remove TAs"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        if course not in faculty_profile.courses.all():
            return Response(
                {"error": "You can only remove TAs from your own courses"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        ta_id = request.data.get('ta_id')
        if not ta_id:
            return Response({"error": "TA ID is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            from ta.models import TAProfile
            ta_profile = TAProfile.objects.get(id=ta_id)
            
            # Check if TA is actually assigned to this course
            if course not in ta_profile.courses_assigned.all():
                return Response(
                    {"error": "TA is not assigned to this course"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Remove course from TA's assigned courses
            ta_profile.courses_assigned.remove(course)
            
            return Response(
                {"message": f"TA {ta_profile.first_name} {ta_profile.last_name} removed from {course.code} successfully"},
                status=status.HTTP_200_OK
            )
        except TAProfile.DoesNotExist:
            return Response({"error": "TA not found"}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response(
                {"error": f"Failed to remove TA: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    # Send message to a student
    @action(detail=True, methods=['post'], parser_classes=[JSONParser])
    def message_student(self, request, pk=None):
        course = self.get_object()
        student_id = request.data.get('student_id')
        subject = request.data.get('subject')
        message_text = request.data.get('message')
        try:
            student = StudentProfile.objects.get(id=student_id)
        except StudentProfile.DoesNotExist:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)

        msg = StudentMessage.objects.create(
            sender=getattr(request.user, 'facultyprofile', None),
            recipient=student,
            course=course,
            subject=subject,
            message=message_text
        )
        serializer = StudentMessageSerializer(msg)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# ------------------ SubmissionViewSet ------------------
class SubmissionViewSet(viewsets.ModelViewSet):
    serializer_class = SubmissionSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    queryset = Submission.objects.all()

    def get_queryset(self):
        user = self.request.user
        
        # Faculty: see submissions for their assignments
        if hasattr(user, 'facultyprofile'):
            return Submission.objects.filter(assignment__uploaded_by=user.facultyprofile)
        
        # TAs: see submissions for assignments in courses they're assigned to
        elif hasattr(user, 'taprofile'):
            ta_courses = user.taprofile.courses_assigned.all()
            return Submission.objects.filter(assignment__course__in=ta_courses)
        
        # Students: see their own submissions
        elif hasattr(user, 'student_profile'):
            return Submission.objects.filter(student=user.student_profile)
        
        return Submission.objects.none()

    # Grade submission (for TAs and Faculty)
    @action(detail=True, methods=['patch'], parser_classes=[JSONParser])
    def grade(self, request, pk=None):
        submission = self.get_object()
        user = request.user
        
        # Only faculty and TAs can grade
        if not (hasattr(user, 'facultyprofile') or hasattr(user, 'taprofile')):
            return Response(
                {"error": "Only faculty and TAs can grade submissions"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        grade = request.data.get('grade')
        feedback = request.data.get('feedback', '')
        
        if grade is None:
            return Response({"error": "Grade is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        try:
            grade = float(grade)
            max_points = submission.assignment.max_points or 100
            if grade < 0 or grade > max_points:
                return Response(
                    {"error": f"Grade must be between 0 and {max_points}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
        except ValueError:
            return Response({"error": "Invalid grade value"}, status=status.HTTP_400_BAD_REQUEST)
        
        submission.grade = grade
        submission.feedback = feedback
        submission.status = 'graded'
        submission.save()
        
        serializer = self.get_serializer(submission)
        return Response(serializer.data)

    # Approve/reject late submission and grade
    @action(detail=True, methods=['post', 'patch'], parser_classes=[JSONParser, MultiPartParser, FormParser])
    def update_status(self, request, pk=None):
        submission = self.get_object()
        status_choice = request.data.get('status')
        feedback = request.data.get('feedback', submission.feedback)
        grade = request.data.get('grade', submission.grade)

        if status_choice and status_choice not in ['pending', 'approved', 'rejected', 'graded']:
            return Response({"error": "Invalid status"}, status=status.HTTP_400_BAD_REQUEST)

        if status_choice:
            submission.status = status_choice
        submission.feedback = feedback
        submission.grade = grade
        submission.save()
        
        serializer = self.get_serializer(submission)
        return Response(serializer.data)


# ------------------ AssignmentViewSet ------------------
class AssignmentViewSet(viewsets.ModelViewSet):
    serializer_class = AssignmentSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    queryset = Assignment.objects.all()

    def get_queryset(self):
        user = self.request.user
        
        # Faculty: see assignments they uploaded
        if hasattr(user, 'facultyprofile'):
            return Assignment.objects.filter(uploaded_by=user.facultyprofile)
        
        # TAs: see assignments for courses they're assigned to
        elif hasattr(user, 'taprofile'):
            ta_courses = user.taprofile.courses_assigned.all()
            return Assignment.objects.filter(course__in=ta_courses)
        
        # Students: see assignments for their enrolled courses
        elif hasattr(user, 'student_profile'):
            enrolled_courses = user.student_profile.courses_enrolled.all()
            return Assignment.objects.filter(course__in=enrolled_courses)
        
        return Assignment.objects.none()

    def perform_create(self, serializer):
        faculty_profile = getattr(self.request.user, 'facultyprofile', None)
        serializer.save(uploaded_by=faculty_profile)


# ------------------ AttendanceViewSet ------------------
class AttendanceViewSet(viewsets.ModelViewSet):
    serializer_class = AttendanceSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]
    queryset = Attendance.objects.all()

    def get_queryset(self):
        user = self.request.user
        
        # Faculty: see attendance for their courses
        if hasattr(user, 'facultyprofile'):
            return Attendance.objects.filter(course__in=user.facultyprofile.courses.all())
        
        # Students: see attendance records where they are present
        elif hasattr(user, 'student_profile'):
            return Attendance.objects.filter(students_present=user.student_profile)
        
        return Attendance.objects.none()

# ------------------ QuizViewSet ------------------
class QuizViewSet(viewsets.ModelViewSet):
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]
    queryset = Quiz.objects.all()

    def get_queryset(self):
        user = self.request.user
        
        # Faculty: see quizzes for their courses
        if hasattr(user, 'facultyprofile'):
            return Quiz.objects.filter(course__in=user.facultyprofile.courses.all())
        
        # Students: see quizzes for their enrolled courses
        elif hasattr(user, 'student_profile'):
            enrolled_courses = user.student_profile.courses_enrolled.all()
            return Quiz.objects.filter(course__in=enrolled_courses)
        
        return Quiz.objects.none()

# ------------------ QuizGradeViewSet ------------------
class QuizGradeViewSet(viewsets.ModelViewSet):
    serializer_class = QuizGradeSerializer
    permission_classes = [IsAuthenticated]
    queryset = QuizGrade.objects.all()

    def get_queryset(self):
        user = self.request.user
        
        # Faculty: see all quiz grades for their courses
        if hasattr(user, 'facultyprofile'):
            return QuizGrade.objects.filter(quiz__course__in=user.facultyprofile.courses.all())
        
        # Students: see only their own quiz grades
        elif hasattr(user, 'student_profile'):
            return QuizGrade.objects.filter(student=user.student_profile)
        
        return QuizGrade.objects.none()

# ------------------ TA TaskViewSet ------------------
class TATaskViewSet(viewsets.ModelViewSet):
    serializer_class = TATaskSerializer
    permission_classes = [IsAuthenticated]
    queryset = TATask.objects.all()

    def get_queryset(self):
        user = self.request.user
        
        # Faculty: see tasks they assigned
        if hasattr(user, 'facultyprofile'):
            return TATask.objects.filter(assigned_by=user.facultyprofile)
        
        # TAs: see tasks assigned to them
        elif hasattr(user, 'taprofile'):
            return TATask.objects.filter(ta=user.taprofile)
        
        return TATask.objects.none()
    
    @action(detail=True, methods=['patch'], parser_classes=[JSONParser])
    def update_status(self, request, pk=None):
        """Allow TAs to update task status and completion notes"""
        task = self.get_object()
        
        # Only TAs can update their own tasks
        if hasattr(request.user, 'taprofile') and task.ta == request.user.taprofile:
            status_val = request.data.get('status')
            completion_notes = request.data.get('completion_notes')
            
            if status_val and status_val in ['pending', 'in_progress', 'completed']:
                task.status = status_val
            
            if completion_notes is not None:
                task.completion_notes = completion_notes
            
            task.save()
            serializer = self.get_serializer(task)
            return Response(serializer.data)
        
        return Response(
            {'error': 'You can only update your own tasks'},
            status=status.HTTP_403_FORBIDDEN
        )


# ------------------ Admin Course ViewSet ------------------
class AdminCourseViewSet(viewsets.ModelViewSet):
    """Admin endpoint for managing all courses"""
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [JSONParser, MultiPartParser, FormParser]
    queryset = Course.objects.all()

    def get_queryset(self):
        # Only admins can access all courses
        if self.request.user.role != 'admin':
            return Course.objects.none()
        return Course.objects.all().order_by('code')

    @action(detail=True, methods=['post'], url_path='assign_faculty', parser_classes=[JSONParser])
    def assign_faculty(self, request, pk=None):
        """Assign a faculty member to a course"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can assign faculty'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        course = self.get_object()
        faculty_id = request.data.get('faculty_id')
        
        if not faculty_id:
            return Response(
                {'error': 'faculty_id is required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            faculty = FacultyProfile.objects.get(id=faculty_id)
            course.faculty = faculty
            course.save()
            
            serializer = self.get_serializer(course)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except FacultyProfile.DoesNotExist:
            return Response(
                {'error': 'Faculty not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['post'], url_path='unassign_faculty', parser_classes=[JSONParser])
    def unassign_faculty(self, request, pk=None):
        """Remove faculty assignment from a course"""
        if request.user.role != 'admin':
            return Response(
                {'error': 'Only admins can unassign faculty'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        course = self.get_object()
        course.faculty = None
        course.save()
        
        serializer = self.get_serializer(course)
        return Response(serializer.data, status=status.HTTP_200_OK)