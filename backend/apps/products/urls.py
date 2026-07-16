from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r"items", views.ProductViewSet, basename="producto")
router.register(r"categorias", views.CategoryViewSet)
router.register(r"colecciones", views.CollectionViewSet)
router.register(r"colores", views.ColorViewSet)
router.register(r"tallas", views.SizeViewSet)
router.register(r"imagenes", views.ProductImageViewSet)
router.register(r"variantes", views.VariantsViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
