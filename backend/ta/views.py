# ta/views.py
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q, Count
from ta.models import TAProfile
from ta.serializers import TAProfileSerializer
from core.models import Course, Assignment, Submission, TATask
from students.models import StudentProfile

class TAProfileViewSet(viewsets.ModelViewSet):
    serializer_class = TAProfileSerializer
    permission_classes = [IsAuthenticated]
    queryset = TAProfile.objects.none()

    def get_queryset(self):
        user = self.request.user
        
        # Admin can see all TAs
        if user.role == 'admin':
            return TAProfile.objects.all()
        
        # TAs can see their own profile
        if user.role == 'ta':
            return TAProfile.objects.filter(user=user)
        
        # Faculty can see all TAs (to be able to assign them)
        if user.role == 'faculty':
            return TAProfile.objects.all()
        
        return TAProfile.objects.none()

    @action(detail=False, methods=['get'])
    def me(self, request):
        """Get current TA's profile with detailed information"""
        try:
            ta_profile = TAProfile.objects.get(user=request.user)
            serializer = self.get_serializer(ta_profile)
            return Response(serializer.data)
        except TAProfile.DoesNotExist:
            return Response(
                {'error': 'TA profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )

    @action(detail=False, methods=['get'])
    def dashboard_stats(self, request):
        """Get statistics for TA dashboard"""
        try:
            ta_profile = TAProfile.objects.get(user=request.user)
            
            # Get assigned courses
            courses = ta_profile.courses_assigned.all()
            
            # Get pending tasks
            pending_tasks = TATask.objects.filter(
                ta=ta_profile,
                status='pending'
            ).count()
            
            # Get submissions to grade (across all assigned courses)
            submissions_to_grade = Submission.objects.filter(
                assignment__course__in=courses,
                grade__isnull=True
            ).count()
            
            # Get total students in assigned courses
            total_students = StudentProfile.objects.filter(
                enrolled_courses__in=courses
            ).distinct().count()
            
            stats = {
                'assigned_courses_count': courses.count(),
                'pending_tasks': pending_tasks,
                'submissions_to_grade': submissions_to_grade,
                'total_students': total_students
            }
            
            return Response(stats)
        except TAProfile.DoesNotExist:
            return Response(
                {'error': 'TA profile not found'},
                status=status.HTTP_404_NOT_FOUND
            )
