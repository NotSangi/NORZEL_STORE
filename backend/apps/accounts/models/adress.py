from django.db import models
from django.conf import settings
from .city import City

class Address(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="directions")
    
    name = models.CharField(max_length=100)
    city = models.ForeignKey(City, on_delete=models.PROTECT, related_name="directions")
    address = models.CharField(max_length=255)
    neighborhood = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=20, blank=True)
    additional_info = models.TextField(max_length=150, blank=True, null=True)
    is_default = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-is_default", "name"]
        verbose_name_plural = "Address"

    def __str__(self):
        return f"{self.name}: {self.address}"
