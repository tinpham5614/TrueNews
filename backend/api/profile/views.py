# views.py
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserProfileSerializer, UserRegistrationSerializer
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserProfileSerializer
    # permission_classes = [IsAuthenticated]

    def get_object(self):
        # Override to always return the authenticated user
        return self.request.user

@api_view(['POST'])
def register_user(request):
    """
    API endpoint to register a new user.
    Accepts POST requests with user details.
    """
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(
            {"message": "User registered successfully.", "data": serializer.data},
            status=status.HTTP_201_CREATED,
        )
    return Response(
        {"message": "Registration failed.", "errors": serializer.errors},
        status=status.HTTP_400_BAD_REQUEST,
    )