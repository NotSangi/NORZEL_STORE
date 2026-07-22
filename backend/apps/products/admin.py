from django.contrib import admin

from .models import Product, Category, Collection, Variants, Color, Size, ProductImage

admin.site.register(Product)

class CategoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'slug', 'description', 'parent', 'created_at', 'updated_at')
    
admin.site.register(Category, CategoryAdmin)
admin.site.register(Collection)
admin.site.register(Variants)
admin.site.register(Color)
admin.site.register(Size)
admin.site.register(ProductImage)