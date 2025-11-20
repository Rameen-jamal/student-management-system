# ta/views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from ta.models import TAProfile
from ta.serializers import TAProfileSerializer

class TAProfileViewSet(viewsets.ModelViewSet):
    serializer_class = TAProfileSerializer
    permission_classes = [IsAuthenticated]

    queryset = TAProfile.objects.none()  # Fix router error

    def get_queryset(self):
        return TAProfile.objects.filter(user=self.request.user)
