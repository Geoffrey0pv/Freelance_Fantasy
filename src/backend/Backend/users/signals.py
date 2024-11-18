from django.db.models.signals import post_save
from django.dispatch import receiver
from users.models import User  # Importa tu modelo de usuario personalizado
from profiles.models import Image, Skill, Education, Experience, PortfolioProject

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # Crear una entrada única de imágenes asociada al usuario
        Image.objects.create(user=instance)