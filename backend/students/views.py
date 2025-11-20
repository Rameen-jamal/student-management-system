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
        # Only return the student profile of the logged-in user
        return StudentProfile.objects.filter(user=self.request.user)
