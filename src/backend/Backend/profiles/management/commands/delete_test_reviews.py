from django.core.management.base import BaseCommand
from profiles.models import Review
from users.models import User

class Command(BaseCommand):
    help = 'Elimina todas las reseñas de prueba asociadas a los freelancers en la base de datos.'

    def handle(self, *args, **kwargs):
        # Obtener usuarios freelancers
        freelancers = User.objects.filter(is_freelancer=True)
        if not freelancers.exists():
            self.stdout.write(self.style.WARNING("No hay freelancers en la base de datos."))
            return

        # Filtrar reseñas que pertenecen a freelancers y eliminarlas
        reviews_deleted_count, _ = Review.objects.filter(user__in=freelancers).delete()

        self.stdout.write(self.style.SUCCESS(f'Se han eliminado {reviews_deleted_count} reseñas de freelancers.'))
