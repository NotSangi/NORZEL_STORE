from django.core.management.base import BaseCommand
from apps.accounts.models import Role, Department, City 
from pathlib import Path
import json

class Command(BaseCommand):
    def handle(self, *args, **options):
        self.create_roles()
        self.create_locations()

        self.stdout.write(
            self.style.SUCCESS(
                "Datos iniciales creados correctamente."
            )
        )
    
    def create_roles(self):
        roles = {
            "Cliente": "Usuario común: navega productos y gestiona su perfil y direcciones.",
            "Admin de Contenido": "Administra productos, variantes, colores, tallas, colecciones y categorías.",
            "Admin General": "Administrador general con acceso total (superuser).",
        }
                
        for name, description in roles.items():
            role, created = Role.objects.get_or_create(
                name=name,
                defaults={"description": description},
            )
        
            if created:
                self.stdout.write(
                    self.style.SUCCESS(f"Rol creado: {name}")
                )
            else:
                self.stdout.write(
                    f"Rol ya existente: {name}"
                )
                    
    def create_locations(self):
        file_path = (Path(__file__).resolve().parent.parent.parent/"data"/"locations.json")
                
        with open(file_path, "r", encoding="utf-8") as file:
            locations = json.load(file)
                    
        for item in locations:
            department, _ = Department.objects.get_or_create(
                code=item['cod_dpto'],
                defaults={
                    "name": item['dpto']
                }
            )
                    
            City.objects.get_or_create(
                code=item['cod_mpio'],
                defaults={
                    "name": item['nom_mpio'],
                    "department": department
                }
            )
            
        self.stdout.write(
            self.style.SUCCESS(
                f"{len(locations)} municipios procesados."
            )
        )