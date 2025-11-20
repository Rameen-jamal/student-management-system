# # faculty/views.py
# from rest_framework import viewsets
# from rest_framework.permissions import IsAuthenticated
# from faculty.models import FacultyProfile
# from faculty.serializers import FacultyProfileSerializer

# class FacultyProfileViewSet(viewsets.ModelViewSet):
#     serializer_class = FacultyProfileSerializer
#     permission_classes = [IsAuthenticated]

#     queryset = FacultyProfile.objects.none()  # Fix router error

#     def get_queryset(self):
#         return FacultyProfile.objects.filter(user=self.request.user)
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from faculty.models import FacultyProfile
from faculty.serializers import FacultyProfileSerializer

class FacultyProfileViewSet(viewsets.ModelViewSet):
    serializer_class = FacultyProfileSerializer
    permission_classes = [IsAuthenticated]

    queryset = FacultyProfile.objects.none()  # Required for router

    def get_queryset(self):
        # Admin can see all faculty profiles
        if self.request.user.is_superuser:
            return FacultyProfile.objects.all()
        # Faculty sees only their own profile
        return FacultyProfile.objects.filter(user=self.request.user)
