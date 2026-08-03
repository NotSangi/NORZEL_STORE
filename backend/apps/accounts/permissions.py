from rest_framework.permissions import BasePermission, SAFE_METHODS

CLIENT_ROLE = "Cliente"
CONTENT_ADMIN_ROLE = "Content Admin"
GENERAL_ADMIN_ROLE = "General Admin"

class IsContentAdminOrReadOnly(BasePermission):
    """Read for everyone. Write only for Content Admin or General Admin."""

    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        user = request.user
        if not user.is_authenticated:
            return False
        if user.is_superuser:
            return True
        return bool(user.role and user.role.name.lower() == CONTENT_ADMIN_ROLE.lower())

class IsGeneralAdmin(BasePermission):
    """Only superuser (General Admin)."""

    def has_permission(self, request, view):
        return bool(
            request.user
            and request.user.is_authenticated
            and request.user.is_superuser
        )
