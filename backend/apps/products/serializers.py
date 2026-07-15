from rest_framework import serializers
from .models import Category, Product, Collection

class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)

    class Meta:
        model = Product
        fields = [
            "id", "name", "slug", "description", "price", "stock", "category", "category_name", "image", "is_active", "created_at", "updated_at"]

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ["id", "name", "slug", "description", "parent", "created_at"]
        

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