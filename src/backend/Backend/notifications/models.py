from django.conf import settings  # Importar AUTH_USER_MODEL
from django.db import models
from messaging.models import Room  # Relacionar con salas de mensajes

class Notification(models.Model):
    NOTIFICATION_TYPES = (
        (1, 'Cambio en el perfil'),
        (2, 'Cambio de tipo de usuario'),
        (3, 'Tarea terminada'),
        (4, 'Nueva postulación'),
        (5, 'Pago recibido'),
        (5, 'Proyecto terminado'),
    )

    to_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='notifications_to_user'
    )
    notification_type = models.IntegerField(choices=NOTIFICATION_TYPES)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    description = models.TextField(null=True, blank=True)  # Mensaje adicional
    url = models.URLField(blank=True, null=True)  # Campo para redirigir al enlace
    related_room = models.ForeignKey(
        Room, on_delete=models.CASCADE, null=True, blank=True, related_name='notifications'
    )  # Relacionar con una sala de mensajes, si aplica

    def __str__(self):
        return f"Notificación para {self.to_user.username} - Tipo: {self.get_notification_type_display()}"
