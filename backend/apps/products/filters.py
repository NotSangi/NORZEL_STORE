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
        
class CategoryFilter(django_filters.FilterSet):
    parent = django_filters.ModelChoiceFilter(
        field_name="parent",
        queryset=Category.objects.all(),
        to_field_name="slug",
    )

    is_parent = django_filters.BooleanFilter(
        field_name="parent",
        lookup_expr="isnull"
    )

    class Meta:
        model = Category
        fields = []
