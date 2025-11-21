from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from students.models import StudentProfile
from students.serializers import StudentProfileSerializer

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
