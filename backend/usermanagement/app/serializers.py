from rest_framework import serializers
import re
from .models import UserProfile

class UserProfileSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8, max_length=32)
    confirm_password = serializers.CharField(write_only=True, min_length=8, max_length=32)

    class Meta:
        model = UserProfile
        fields = ['id', 'username', 'email', 'is_staff','is_superuser', 'is_active', 'password', 'confirm_password']
        extra_kwargs = {
            'is_staff': {'read_only': True},
            'is_superuser': {'read_only': True},
            'is_active': {'read_only': True},
        }
        
    def validate_username(self, value):
        if not (3 <= len(value) <= 32):
            raise serializers.ValidationError("Username must be between 3 and 32 characters.")
        if not re.match(r'^[A-Za-z ]+$', value):
            raise serializers.ValidationError("Username can only contain alphabets and spaces.")
        return value

    def validate_email(self, value):
        email_regex = r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$'
        if not re.match(email_regex, value):
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    def validate_password(self, value):
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
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match.")
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password')
        password = validated_data.pop('password')
        user = UserProfile.objects.create_user(password=password, **validated_data)
        return user



class AdminUserCreateSerializer(serializers.ModelSerializer):
    # Make password optional; remove min_length/max_length constraints from the field
    # and handle validation in the method only if a value is provided.
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = UserProfile
        fields = ['username', 'email', 'password', 'is_staff', 'is_active']
        extra_kwargs = {
            'password': {'write_only': True},
            'is_staff': {'read_only': False},
            'is_active': {'read_only': False},
            'is_superuser': {'read_only': False},
        }   
    
    def validate_username(self, value):
        if not (3 <= len(value) <= 32):
            raise serializers.ValidationError("Username must be between 3 and 32 characters.")
        if not re.match(r'^[A-Za-z ]+$', value):
            raise serializers.ValidationError("Username can only contain alphabets and spaces.")
        return value

    def validate_email(self, value):
        email_regex = r'^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{2,6}$'
        if not re.match(email_regex, value):
            raise serializers.ValidationError("Enter a valid email address.")
        return value

    def validate_password(self, value):
        # If no value is provided, allow it (i.e. no password change)
        if not value:
            return value
        # Otherwise, perform validations.
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
    
    def create(self, validated_data):
        password = validated_data.pop('password', None)
        user = UserProfile.objects.create(**validated_data)
        if password:
            user.set_password(password)
        user.save()
        return user

    def update(self, instance, validated_data):
        # Pop password if provided; if not, don't update the password.
        password = validated_data.pop('password', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        if password:
            instance.set_password(password)
        instance.save()
        return instance