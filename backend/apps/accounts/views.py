from rest_framework import viewsets, status, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from .models import Role, User
from .serializers import RoleSerializer, UserSerializer, RegisterSerializer


class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def perform_update(self, serializer):
        if not self.request.user.is_superuser and self.request.user != serializer.instance:
            raise PermissionDenied("No puedes modificar otros usuarios")
        serializer.save()

    def perform_destroy(self, instance):
        if not self.request.user.is_superuser and self.request.user != instance:
            raise PermissionDenied("No puedes eliminar otros usuarios")
        instance.is_active = False
        instance.save()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response(
            {"detail": "Usuario creado exitosamente", "user_id": user.id},
            status=status.HTTP_201_CREATED,
        )
