# serializers.py
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')  # Adjust fields as needed

class UserProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False, validators=[validate_password])

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password']  # Specify fields you want to allow updates for

    def update(self, instance, validated_data):
        # Update fields normally
        instance.email = validated_data.get('email', instance.email)
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        
        # Handle password update
        password = validated_data.get('password', None)
        if password:
            instance.set_password(password)  # Hashes the password

        instance.save()
        return instance
