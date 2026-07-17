from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import Role, User


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    list_display = ["email", "name", "last_name", "id_type", "id_num", "is_active"]
    readonly_fields = ["last_login", "date_joined"]
    fieldsets = [
        (None, {"fields": ["email", "password"]}),
        ("Información personal", {"fields": ["name", "last_name", "id_type", "id_num", "phone", "birth_date"]}),
        ("Permisos", {"fields": ["is_active", "is_staff", "is_superuser", "groups", "user_permissions"]}),
    ]
    add_fieldsets = [
        (None, {
            "classes": ["wide"],
            "fields": ["email", "name", "last_name", "password1", "password2"],
        }),
    ]
    search_fields = ["email", "name", "last_name", "id_num"]
    ordering = ["email"]

admin.site.register(Role)
