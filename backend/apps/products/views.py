from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django.db.models import Sum, Value
from django.db.models.functions import Coalesce
from .models import Category, Product, Collection, Color, Size, ProductImage, Variants
from .filters import ProductFilter, CategoryFilter
from .serializers import (
    CategorySerializer,
    ProductSerializer,
    CollectionSerializer,
    ColorSerializer,
    SizeSerializer,
    ProductImageSerializer,
    VariantsSerializer,
    AddProductToCollectionSerializer,
)
from apps.accounts.permissions import IsContentAdminOrReadOnly

CONTENT_PERMISSIONS = [IsContentAdminOrReadOnly]

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    filterset_class = CategoryFilter
    permission_classes = CONTENT_PERMISSIONS

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.filter(is_active=True).annotate(stock=Coalesce(Sum("variants__stock"), Value(0)))
    serializer_class = ProductSerializer
    filterset_class = ProductFilter
    permission_classes = CONTENT_PERMISSIONS

    def perform_destroy(self, instance):
        instance.is_active = False
        instance.save()

class ColorViewSet(viewsets.ModelViewSet):
    queryset = Color.objects.all()
    serializer_class = ColorSerializer
    permission_classes = CONTENT_PERMISSIONS

class SizeViewSet(viewsets.ModelViewSet):
    queryset = Size.objects.all()
    serializer_class = SizeSerializer
    permission_classes = CONTENT_PERMISSIONS

class ProductImageViewSet(viewsets.ModelViewSet):
    queryset = ProductImage.objects.all()
    serializer_class = ProductImageSerializer
    permission_classes = CONTENT_PERMISSIONS

class VariantsViewSet(viewsets.ModelViewSet):
    queryset = Variants.objects.all()
    serializer_class = VariantsSerializer
    permission_classes = CONTENT_PERMISSIONS

class CollectionViewSet(viewsets.ModelViewSet):
    queryset = Collection.objects.filter(is_active=True)
    serializer_class = CollectionSerializer
    permission_classes = CONTENT_PERMISSIONS

    @action(detail=True, methods=["post"])
    def agregar_producto(self, request, pk=None):
        collection = self.get_object()
        serializer = AddProductToCollectionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = get_object_or_404(Product, pk=serializer.validated_data["product_id"])
        collection.products.add(product)
        return Response({"detail": f"Producto {product.id} agregado a la colección"}, status=status.HTTP_200_OK)

    @action(detail=True, methods=["post"])
    def remover_producto(self, request, pk=None):
        collection = self.get_object()
        serializer = AddProductToCollectionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        product = get_object_or_404(Product, pk=serializer.validated_data["product_id"])
        collection.products.remove(product)
        return Response({"detail": f"Producto {product.id} eliminado de la colección"}, status=status.HTTP_200_OK)
