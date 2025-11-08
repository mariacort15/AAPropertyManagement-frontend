# backend/users.py
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required


@api_view(['POST'])
def register_user(request):
    data = request.data
    if data['password'] != data['confirm_password']:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)

    if User.objects.filter(username=data['username']).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(
        username=data['username'],
        email=data.get('email', ''),
        password=data['password'],
        first_name=data.get('first_name', ''),
        last_name=data.get('last_name', '')
    )

    return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
def list_users(request):
    users = User.objects.all().values('id', 'username', 'email', 'first_name', 'last_name')
    return Response(list(users))

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,
    })

@login_required
def current_user(request):
    user = request.user
    return JsonResponse({
        "id": user.id,
        "username": user.username,
        "email": user.email,
    })