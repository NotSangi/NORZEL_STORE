from rest_framework import serializers
from .models import Role, User


class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ["id", "name", "description", "created_at"]


class UserSerializer(serializers.ModelSerializer):
    role_name = serializers.CharField(source="role.name", read_only=True)

    class Meta:
        model = User
        fields = [
            "id", "email", "name", "last_name",
            "id_type", "id_num", "phone", "birth_date",
            "role", "role_name", "is_active", "date_joined",
        ]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = User
        fields = ["email", "name", "last_name", "id_type", "id_num", "phone", "birth_date", "password"]

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
