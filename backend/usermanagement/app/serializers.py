from rest_framework import serializers
import re
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, max_length=32)
    confirm_password = serializers.CharField(write_only=True, min_length=8, max_length=32)

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'password', 'confirm_password']

    def validate_username(self, value):
        # Ensure username length is between 3 and 32 and only contains letters and spaces
        if not (3 <= len(value) <= 32):
            raise serializers.ValidationError("Username must be between 3 and 32 characters.")
        if not re.match(r'^[A-Za-z ]+$', value):
            raise serializers.ValidationError("Username can only contain alphabets and spaces.")
        return value

    def validate_email(self, value):
        # Email regex validation
        email_regex = r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$'
        if not re.match(email_regex, value):
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    def validate_password(self, value):
        # Password must contain at least one lowercase, one uppercase, one digit, one symbol, and be 8-32 characters
        if not re.search(r'[a-z]', value):
            raise serializers.ValidationError("Password must contain at least one lowercase letter.")
        if not re.search(r'[A-Z]', value):
            raise serializers.ValidationError("Password must contain at least one uppercase letter.")
        if not re.search(r'\d', value):
            raise serializers.ValidationError("Password must contain at least one digit.")
        if not re.search(r'[!@#$%^&*(),.?":{}|<>]', value):
            raise serializers.ValidationError("Password must contain at least one special character.")
        if not (8 <= len(value) <= 32):
            raise serializers.ValidationError("Password length must be between 8 and 32 characters.")
        return value

    def validate(self, data):
        # Check if passwords match
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = UserProfile.objects.create_user(password=password, **validated_data)
        return user
