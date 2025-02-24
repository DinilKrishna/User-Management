from django.shortcuts import render
from django.contrib.auth import authenticate
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import UserProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import IsAdminUser, AllowAny
from .models import UserProfile

class UserSignupView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = UserProfileSerializer(data=request.data)
        print(request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User created successfully."}, status=status.HTTP_201_CREATED)
        print(serializer.errors)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")
        
        user = authenticate(email=email, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                "access": str(refresh.access_token),
                "refresh": str(refresh),
                "user": {
                    "username": user.username,
                    "email": user.email
                }
            }, status=status.HTTP_200_OK)
        
        return Response({"error": "Invalid email or password"}, status=status.HTTP_401_UNAUTHORIZED)


class AdminLoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        print('asjdkfhlsajdfhjkl')
        email = request.data.get("email")
        password = request.data.get("password")
        user = authenticate(email=email, password=password)
        
        
        if user is not None:
            # Check if the user is an admin or staff
            if user.is_staff or user.is_superuser:
                refresh = RefreshToken.for_user(user)
                return Response({
                    "access": str(refresh.access_token),
                    "refresh": str(refresh),
                    "user": {
                        "username": user.username,
                        "email": user.email,
                        "isAdmin": True,
                    }
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "User is not authorized as an admin"}, status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({"error": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)
        
    
class UserListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        users = UserProfile.objects.all()
        serializer = UserProfileSerializer(users, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)