from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from .role import Role


class UserManager(BaseUserManager):
    def create_user(self, email, name, last_name, password=None, **extra_fields):
        if not email:
            raise ValueError("El email es obligatorio")
        email = self.normalize_email(email)
        user = self.model(email=email, name=name, last_name=last_name, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, name, last_name, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        return self.create_user(email, name, last_name, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    class IdType(models.TextChoices):
        CC = "CC", "Cédula de Ciudadanía"
        CE = "CE", "Cédula de Extranjería"
        NIT = "NIT", "NIT"
        PASS = "PASSPORT", "Pasaporte"

    email = models.EmailField(unique=True, max_length=255)
    name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    id_type = models.CharField(max_length=10, choices=IdType.choices, blank=True)
    id_num = models.CharField(max_length=30, blank=True)
    phone = models.CharField(max_length=20, blank=True)
    birth_date = models.DateField(null=True, blank=True)
    role = models.ForeignKey(Role, on_delete=models.SET_NULL, null=True, blank=True, related_name="users")
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    date_joined = models.DateTimeField(auto_now_add=True)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["name", "last_name"]

    class Meta:
        ordering = ["-date_joined"]

    def __str__(self):
        return self.email
