# views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserProfileSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Override to always return the authenticated user
        return self.request.user
