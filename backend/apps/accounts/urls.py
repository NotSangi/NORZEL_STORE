from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"usuarios", views.UserViewSet)
router.register(r"roles", views.RoleViewSet)
router.register(r"departamentos", views.DepartmentViewSet)
router.register(r"ciudades", views.CityViewSet)
router.register(r"direcciones", views.AdressViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path("perfil/", views.ProfileViewSet.as_view(), name="profile"),
    path("registro/", views.RegisterView.as_view(), name="register"),
]
