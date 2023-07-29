from rest_framework import viewsets, status, permissions
from rest_framework.response import Response

from .models import User
from .serializers import UserSerializer, UserSerializerWithToken


class UserViewSet(viewsets.ModelViewSet):
    lookup_field = "username"
    queryset = User.objects.all()

    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, format=None):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
