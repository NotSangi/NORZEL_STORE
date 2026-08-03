import django_filters
from .models import Department, City

class CityFilter(django_filters.FilterSet):
    department = django_filters.ModelChoiceFilter(
        field_name="department",
        queryset=Department.objects.all(),
        to_field_name="code",
    )

    class Meta:
        model = City
        fields = []