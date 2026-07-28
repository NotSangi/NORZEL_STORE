from rest_framework import serializers
from .models import Role, User, Department, City, Adress


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

class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = ["id", "name"]

class CitySerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source="department.name", read_only=True)

    class Meta:
        model = City
        fields = ["id", "name", "department", "department_name"]

class AdressSerializer(serializers.ModelSerializer):
    city_name = serializers.CharField(source="city.name", read_only=True)
    department_name = serializers.CharField(source="city.department.name", read_only=True)

    class Meta:
        model = Adress
        fields = [
            "id", "name", "city", "city_name",
            "department_name", "address", 
            "neighborhood", "zip_code", "additional_info",
            "is_default", "created_at", "updated_at",
        ]
        read_only_fields = ["user"]
