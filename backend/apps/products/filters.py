import django_filters
from .models import Product, Category, Collection

class ProductFilter(django_filters.FilterSet):
    category = django_filters.ModelChoiceFilter(
        field_name="category",
        queryset=Category.objects.all(),
        to_field_name="slug",
    )
    
    collection = django_filters.ModelChoiceFilter(
        field_name="collections",
        queryset=Collection.objects.all(),
        to_field_name="slug",
    )

    class Meta:
        model = Product
        fields = []
