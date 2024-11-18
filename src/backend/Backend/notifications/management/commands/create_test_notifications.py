from django.core.management.base import BaseCommand
from notifications.models import Notification
from users.models import User

class Command(BaseCommand):
    help = "Carga notificaciones de prueba para el usuario especial."

    def handle(self, *args, **kwargs):
        try:
            # Verificar si el usuario especial existe
            special_user = User.objects.filter(username="special_user").first()
            if not special_user:
                self.stdout.write(self.style.ERROR("El usuario 'special_user' no existe."))
                return

           
            notification_types = [
                (1, "Cambio en el perfil"),
                (2, "Cambio de tipo de usuario"),
                (3, "Tarea terminada"),
                (4, "Nueva postulación"),
                (5, "Pago recibido"),
                (5, "Proyecto terminado"),
            ]

            # Crear notificaciones para cada tipo
            for notification_type, description in notification_types:
                Notification.objects.create(
                    to_user=special_user,
                    notification_type=notification_type,
                    description=f"Ejemplo de notificación: {description}",
                    url=f"http://localhost:5173/profile/notifications/{notification_type}",
                )
                self.stdout.write(self.style.SUCCESS(f"Notificación de tipo '{description}' creada."))

            self.stdout.write(self.style.SUCCESS("Todas las notificaciones de prueba fueron creadas con éxito."))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Ocurrió un error: {e}"))
