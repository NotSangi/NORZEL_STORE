from django.contrib import admin
from django.db.models import Sum, Value
from django.db.models.functions import Coalesce

from .models import Product, Category, Collection, Variants, Color, Size, ProductImage

class ProductAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'get_stock', 'price', 'is_active', 'created_at')

    def get_queryset(self, request):
        qs = super().get_queryset(request)
        return qs.annotate(stock_total=Coalesce(Sum("variants__stock"), Value(0)))

    def get_stock(self, obj):
        return obj.stock_total
    get_stock.short_description = 'Stock'
    get_stock.admin_order_field = 'stock_total'

    readonly_fields = ('created_at', 'updated_at')
    
admin.site.register(Product, ProductAdmin)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description', 'parent', 'created_at', 'updated_at')

    def formfield_for_foreignkey(self, db_field, request, **kwargs):
        if db_field.name == "parent":
            kwargs["queryset"] = Category.objects.filter(parent__isnull=True)
        return super().formfield_for_foreignkey(db_field, request, **kwargs)
    
admin.site.register(Category, CategoryAdmin)
admin.site.register(Collection)
admin.site.register(Variants)
admin.site.register(Color)
admin.site.register(Size)
admin.site.register(ProductImage)