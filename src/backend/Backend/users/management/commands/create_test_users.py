from django.core.management.base import BaseCommand
from users.models import User
from projects.models import Project, Tag
from projects.factories import ProjectFactory
import random

class Command(BaseCommand):
    help = 'Crea usuarios, proyectos y tags de prueba con datos de ejemplo.'

    def handle(self, *args, **kwargs):
        # Crear usuarios de prueba si no existen
        print("Creando usuarios de prueba...")
        users = []
        passwords = []  
        for i in range(5):
            email = f"user{i}@example.com"
            username = f"user{i}"
            password = f"test_password{i}"  # Contraseña predecible para pruebas
            user, created = User.objects.get_or_create(
                email=email,
                username=username,
                defaults={'is_freelancer': True}
            )
            if created:
                user.set_password(password) 
                user.save()
                print(f"Usuario {username} creado con contraseña: {password}.")
            else:
                print(f"Usuario {username} ya existe.")

            users.append(user)
            passwords.append(password)

        # Crear usuario adicional "user5"
        email = "user5@example.com"
        username = "user5"
        password = "contraseña_prueba"
        user, created = User.objects.get_or_create(
            email=email,
            username=username,
            defaults={'is_freelancer': True}
        )
        if created:
            user.set_password(password)  # Establecer la contraseña
            user.save()
            print(f"Usuario {username} creado con contraseña: {password}.")
        else:
            print(f"Usuario {username} ya existe.")
        users.append(user)
        passwords.append(password)

        print(f"{len(users)} usuarios procesados.\n")

        # Crear/verificar tags únicos
        print("Creando/verificando tags de prueba...")
        tag_names = ["summer", "winter", "autumn", "spring", "tech", "design", "web", "app", "marketing", "data", "network"]
        for name in tag_names:
            tag, created = Tag.objects.get_or_create(name=name)
            if created:
                print(f"Tag '{name}' creado.")
            else:
                print(f"Tag '{name}' ya existía.")

        print(f"{len(tag_names)} tags procesados.\n")

        # Crear proyectos de prueba
        print("Creando proyectos de prueba...")
        all_tags = list(Tag.objects.all())
        created_projects = 0

        for i in range(10):
            try:
                # Evitar duplicados de proyectos
                project = ProjectFactory(user=random.choice(users))

                # Asignar tags aleatorios sin duplicados
                tags = random.sample(all_tags, min(len(all_tags), 3))  # Garantiza que no supere el número de tags existentes
                project.tags.set(tags)
                project.save()

                created_projects += 1
                print(f"Proyecto '{project.title}' creado y guardado con éxito [{created_projects}/10]")

            except Exception as e:
                print(f"Error al crear el proyecto: {e}")

        print(f"\nProyectos de prueba creados exitosamente: {created_projects}/10.\n")

       
        print("=== Resumen de Usuarios Creados ===")
        for user, password in zip(users, passwords):
            print(f"Usuario: {user.username}, Contraseña: {password}")
