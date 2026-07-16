from django.contrib import admin
from .models import Product, Category, Collection, Variants, Color, Size, ProductImage

admin.site.register(Product)
admin.site.register(Category)
admin.site.register(Collection)
admin.site.register(Variants)
admin.site.register(Color)
admin.site.register(Size)
admin.site.register(ProductImage)