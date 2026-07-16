from rest_framework import serializers
from .models import Category, Product, Collection, Color, Size, ProductImage, Variants

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "parent", "created_at"]

class ProductVariantSerializer(serializers.ModelSerializer):
    color_name = serializers.CharField(source="color.name", read_only=True)
    size_name = serializers.CharField(source="size.name", read_only=True)

    class Meta:
        model = Variants
        fields = ["id", "name", "color", "color_name", "size", "size_name", "stock", "is_active"]

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    variants = ProductVariantSerializer(many=True, read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "description", "price", "stock",
            "category", "category_name", "image", "is_active",
            "variants", "created_at", "updated_at",
        ]

class ColorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Color
        fields = ["id", "name", "hex_code", "created_at", "updated_at"]

class SizeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Size
        fields = ["id", "name", "created_at", "updated_at"]

class ProductImageSerializer(serializers.ModelSerializer):
    color_name = serializers.CharField(source="color.name", read_only=True)

    class Meta:
        model = ProductImage
        fields = ["id", "name", "product", "color", "color_name", "image_url", "order", "created_at", "updated_at"]

class VariantsSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source="product.name", read_only=True)
    color_name = serializers.CharField(source="color.name", read_only=True)
    size_name = serializers.CharField(source="size.name", read_only=True)

    class Meta:
        model = Variants
        fields = [
            "id", "name", "product", "product_name",
            "color", "color_name", "size", "size_name",
            "stock", "is_active", "created_at", "updated_at",
        ]

class AddProductToCollectionSerializer(serializers.Serializer):
    product_id = serializers.IntegerField()

class ProductMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ["id", "name", "slug", "price", "image"]


class CollectionSerializer(serializers.ModelSerializer):
    products = ProductMiniSerializer(many=True, read_only=True)

    class Meta:
        model = Collection
        fields = ["id", "name", "slug", "description", "image", "is_active", "products", "created_at", "updated_at"]
