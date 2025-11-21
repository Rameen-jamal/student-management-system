from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from students.models import StudentProfile, Enrollment
from students.serializers import StudentProfileSerializer, EnrollmentSerializer
from core.models import Course

class StudentProfileViewSet(viewsets.ModelViewSet):
    serializer_class = StudentProfileSerializer
    permission_classes = [IsAuthenticated]

    # Add this line
    queryset = StudentProfile.objects.none()

    def get_queryset(self):
        user = self.request.user
        
        # Admin can see all students
        if user.is_superuser:
            return StudentProfile.objects.all()
        
        # Faculty can see students enrolled in their courses
        if hasattr(user, 'facultyprofile'):
            faculty_profile = user.facultyprofile
            # Get all courses taught by this faculty
            faculty_courses = faculty_profile.courses.all()
            # Get students enrolled in those courses
            return StudentProfile.objects.filter(
                enrollments__course__in=faculty_courses
            ).distinct()
        
        # Students can only see their own profile
        if hasattr(user, 'student_profile'):
            return StudentProfile.objects.filter(user=user)
        
        # Default: no access
        return StudentProfile.objects.none()


class EnrollmentViewSet(viewsets.ModelViewSet):
    """Manage student course enrollments"""
    serializer_class = EnrollmentSerializer
    permission_classes = [IsAuthenticated]
    queryset = Enrollment.objects.all()

    def get_queryset(self):
        user = self.request.user
        
        # Admin can see all enrollments
        if user.role == 'admin' or user.is_superuser:
            return Enrollment.objects.all().select_related('student', 'course')
        
        # Faculty can see enrollments for their courses
        if hasattr(user, 'facultyprofile'):
            faculty_courses = user.facultyprofile.courses.all()
            return Enrollment.objects.filter(course__in=faculty_courses).select_related('student', 'course')
        
        # Students can see only their own enrollments
        if hasattr(user, 'student_profile'):
            return Enrollment.objects.filter(student=user.student_profile).select_related('course')
        
        return Enrollment.objects.none()

    @action(detail=False, methods=['post'], url_path='enroll')
    def enroll_student(self, request):
        """Enroll a student in a course"""
        if request.user.role != 'admin' and not request.user.is_superuser:
            return Response(
                {'error': 'Only admins can enroll students'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        student_id = request.data.get('student_id')
        course_id = request.data.get('course_id')
        
        if not student_id or not course_id:
            return Response(
                {'error': 'student_id and course_id are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            student = StudentProfile.objects.get(id=student_id)
            course = Course.objects.get(id=course_id)
            
            # Check if already enrolled
            if Enrollment.objects.filter(student=student, course=course).exists():
                return Response(
                    {'error': 'Student is already enrolled in this course'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            enrollment = Enrollment.objects.create(
                student=student,
                course=course,
                status='active'
            )
            
            serializer = self.get_serializer(enrollment)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
            
        except StudentProfile.DoesNotExist:
            return Response(
                {'error': 'Student not found'},
                status=status.HTTP_404_NOT_FOUND
            )
        except Course.DoesNotExist:
            return Response(
                {'error': 'Course not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['post'], url_path='bulk-enroll')
    def bulk_enroll(self, request):
        """Enroll multiple students in a course"""
        if request.user.role != 'admin' and not request.user.is_superuser:
            return Response(
                {'error': 'Only admins can perform bulk enrollment'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        student_ids = request.data.get('student_ids', [])
        course_id = request.data.get('course_id')
        
        if not student_ids or not course_id:
            return Response(
                {'error': 'student_ids and course_id are required'},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            course = Course.objects.get(id=course_id)
            students = StudentProfile.objects.filter(id__in=student_ids)
            
            created_count = 0
            skipped_count = 0
            
            for student in students:
                if not Enrollment.objects.filter(student=student, course=course).exists():
                    Enrollment.objects.create(
                        student=student,
                        course=course,
                        status='active'
                    )
                    created_count += 1
                else:
                    skipped_count += 1
            
            return Response({
                'success': True,
                'created': created_count,
                'skipped': skipped_count,
                'message': f'Enrolled {created_count} students. {skipped_count} already enrolled.'
            }, status=status.HTTP_200_OK)
            
        except Course.DoesNotExist:
            return Response(
                {'error': 'Course not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=True, methods=['post'], url_path='drop')
    def drop_enrollment(self, request, pk=None):
        """Drop a student from a course"""
        if request.user.role != 'admin' and not request.user.is_superuser:
            return Response(
                {'error': 'Only admins can drop enrollments'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        enrollment = self.get_object()
        enrollment.status = 'dropped'
        enrollment.save()
        
        serializer = self.get_serializer(enrollment)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=True, methods=['delete'], url_path='remove')
    def remove_enrollment(self, request, pk=None):
        """Permanently remove an enrollment"""
        if request.user.role != 'admin' and not request.user.is_superuser:
            return Response(
                {'error': 'Only admins can remove enrollments'},
                status=status.HTTP_403_FORBIDDEN
            )
        
        enrollment = self.get_object()
        enrollment.delete()
        
        return Response(
            {'message': 'Enrollment removed successfully'},
            status=status.HTTP_204_NO_CONTENT
        )
