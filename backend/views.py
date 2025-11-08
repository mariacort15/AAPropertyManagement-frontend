from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from django.contrib.auth.models import User
from rest_framework import status
from django.http import JsonResponse
from django.contrib.auth.models import User
from rest_framework import permissions

@api_view(['POST'])
def register_user(request):
    data = request.data
    if data['password'] != data['confirm_password']:
        return Response({'error': 'Passwords do not match'}, status=status.HTTP_400_BAD_REQUEST)
    user = User.objects.create_user(
        username=data['username'],
        email=data['email'],
        password=data['password'],
        first_name=data['first_name'],
        last_name=data['last_name']
    )
    return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([permissions.IsAuthenticated])
def current_user(request):
    user = request.user
    return Response({
        "id": user.id,
        "username": user.username, 
        "email": user.email,
        "first_name": user.first_name,
        "last_name": user.last_name,

    })

@api_view(['GET'])
@permission_classes([permissions.IsAdminUser])
def list_users(request):
    users = User.objects.all()
    user_list = [
        {"id": u.id, "username": u.username, "email": u.email}
        for u in users
    ]
    return JsonResponse(user_list, safe=False)