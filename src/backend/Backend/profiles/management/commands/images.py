from django.core.management.base import BaseCommand
from profiles.models import Image
from users.models import User
import os


class Command(BaseCommand):
    help = 'Asigna fotos de perfil y de portada únicas a cada freelancer y al usuario especial, sin duplicar archivos ni carpetas.'

    def handle(self, *args, **kwargs):
        # Directorios de imágenes
        profile_images_dir = os.path.join('media', 'users', 'profile_images')
        cover_images_dir = os.path.join('media', 'users', 'cover_images2')

        # Validar directorios
        if not os.path.exists(profile_images_dir) or not os.path.exists(cover_images_dir):
            self.stdout.write(self.style.ERROR("Los directorios de imágenes no existen."))
            return

        # Obtener listas de imágenes ordenadas
        profile_images = sorted([f for f in os.listdir(profile_images_dir) if os.path.isfile(os.path.join(profile_images_dir, f))])
        cover_images = sorted([f for f in os.listdir(cover_images_dir) if os.path.isfile(os.path.join(cover_images_dir, f))])

        # Verificar si hay suficientes imágenes disponibles
        total_images = min(len(profile_images), len(cover_images))
        freelancers = User.objects.filter(is_freelancer=True).order_by('id')
        if len(freelancers) + 1 > total_images:  # +1 para el usuario especial
            self.stdout.write(self.style.ERROR("No hay suficientes imágenes para todos los usuarios."))
            return

        # Asignar imágenes a freelancers
        for freelancer, profile_image, cover_image in zip(freelancers, profile_images, cover_images):
            try:
                Image.objects.update_or_create(
                    user=freelancer,
                    defaults={
                        'profile_image': f'users/profile_images/{profile_image}',
                        'cover_image': f'users/cover_images2/{cover_image}',
                    }
                )
                self.stdout.write(self.style.SUCCESS(f"Imágenes asignadas al freelancer '{freelancer.username}' (ID: {freelancer.id})."))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f"Error al asignar imágenes al freelancer '{freelancer.username}': {e}"))

        # Manejar el usuario especial
        try:
            special_user, created = User.objects.get_or_create(
                username='special_user',
                defaults={
                    'email': 'special_user@example.com',
                    'password': 'special_password',
                    'is_freelancer': True,
                    'account_type': 'natural_person',
                    'description': 'Este es un usuario especial con imágenes asignadas.',
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Usuario especial 'special_user' creado."))

            # Asignar imágenes al usuario especial
            special_profile_image = profile_images[len(freelancers)]
            special_cover_image = cover_images[len(freelancers)]

            Image.objects.update_or_create(
                user=special_user,
                defaults={
                    'profile_image': f'users/profile_images/{special_profile_image}',
                    'cover_image': f'users/cover_images2/{special_cover_image}',
                }
            )
            self.stdout.write(self.style.SUCCESS(f"Imágenes asignadas al usuario especial 'special_user'."))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error al manejar al usuario especial: {e}"))

        self.stdout.write(self.style.SUCCESS("Asignación de imágenes completada."))
