from django.db import models
from .product import Product

class Collection(models.Model):
    name = models.CharField(max_length=200, unique=True)
    slug = models.SlugField(max_length=200, unique=True)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="collections/", blank=True, null=True)
    is_active = models.BooleanField(default=True)
    products = models.ManyToManyField(Product, related_name="collections", blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["name"]
        verbose_name_plural = "collections"

    def __str__(self):
        return self.name