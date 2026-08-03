from django.db import models

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    code = models.CharField(max_length=2, default=0)
    class Meta:
        ordering = ["name"]

    def __str__(self):
        return self.name
