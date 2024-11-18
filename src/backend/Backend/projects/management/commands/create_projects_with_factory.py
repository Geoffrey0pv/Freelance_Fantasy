import os
from django.core.files import File
from django.core.management.base import BaseCommand
from users.models import User
from projects.models import Project, Tag
from projects.factories import ProjectFactory
import random

class Command(BaseCommand):
    help = 'Crea proyectos de prueba con datos de ejemplo, incluyendo usuarios, un usuario especial y tags únicos.'

    def handle(self, *args, **kwargs):
        # Crear usuarios de prueba si no existen
        print("Creando usuarios de prueba...")
        users = []
        for i in range(5):
            email = f"user_project{i}@example.com"
            username = f"test_user{i}"
            user, created = User.objects.get_or_create(
                email=email,
                username=username,
                defaults={'password': 'password_123'}
            )
            if created:
                user.set_password('password_123')  # Asegura que la contraseña sea válida
                user.save()
                print(f"Usuario {username} creado.")
            else:
                print(f"Usuario {username} ya existe.")
            users.append(user)

        print(f"{len(users)} usuarios procesados.\n")

        # Crear un usuario adicional para pruebas manuales
        special_user_email = "special_user@example.com"
        special_user_username = "special_user"
        special_user, created = User.objects.get_or_create(
            email=special_user_email,
            username=special_user_username,
            defaults={'is_staff': True, 'is_superuser': True}
        )
        if created:
            special_user.set_password('special_password')  # Establece la contraseña
            special_user.save()
            print(f"Usuario especial '{special_user_username}' creado con éxito. Email: {special_user_email}, Contraseña: 'special_password'")
        else:
            print(f"Usuario especial '{special_user_username}' ya existe. Email: {special_user_email}")

        # Asignar imagen de perfil al usuario especial
        image_path = os.path.join("/media/users/profile_images/Gato_traje_eapMCEx.jpg")  # Ruta de la imagen
        if os.path.exists(image_path):
            with open(image_path, 'rb') as image_file:
                special_user.profile_image.save(
                    os.path.basename(image_path),
                    File(image_file),
                    save=True
                )
            print(f"Imagen de perfil asignada al usuario especial '{special_user_username}'.")
        else:
            print(f"Error: La imagen en la ruta '{image_path}' no existe.")

        # Crear/verificar tags únicos
        print("\nCreando/verificando tags de prueba...")
        tag_names = ["summer", "winter", "autumn", "spring", "tech", "design", "web", "app", "marketing", "data"]
        for name in tag_names:
            _, created = Tag.objects.get_or_create(name=name)
            if created:
                print(f"Tag '{name}' creado.")
            else:
                print(f"Tag '{name}' ya existía.")

        print(f"{len(tag_names)} tags procesados.\n")

        # Crear proyectos de prueba
        print("Creando proyectos de prueba...")
        all_tags = list(Tag.objects.all())
        for i in range(10):
            try:
                project = ProjectFactory(user=random.choice(users))

                # Asignar tags aleatorios sin duplicados
                tags = random.sample(all_tags, 3)
                project.tags.set(tags)
                project.save()

                print(f"Proyecto '{project.title}' creado y guardado con éxito [{i+1}/10]")
            except Exception as e:
                print(f"Error al crear el proyecto {i+1}: {e}")

        # Asignar un proyecto al special_user
        print("\nAsignando un proyecto al usuario especial...")
        try:
            special_project = ProjectFactory(user=special_user)
            special_tags = random.sample(all_tags, 3)
            special_project.tags.set(special_tags)
            special_project.save()

            print(f"Proyecto especial '{special_project.title}' creado y asignado al usuario especial '{special_user_username}'.")
        except Exception as e:
            print(f"Error al asignar un proyecto al usuario especial: {e}")

        print("\nProyectos de prueba creados exitosamente.")
