import factory
from django.utils.timezone import now
from notifications.models import Notification
from users.models import User
from messaging.models import Room  # Si las notificaciones pueden estar relacionadas con salas de mensajes

class NotificationFactory(factory.django.DjangoModelFactory):
    class Meta:
        model = Notification

    to_user = factory.Iterator(User.objects.all())  # Asigna un usuario de la base de datos
    notification_type = factory.Iterator([1, 2, 3, 4, 5])  # Tipos de notificación
    created_at = factory.LazyFunction(now)  # Fecha de creación actual
    is_read = factory.Faker('boolean')  # Aleatorio entre True y False
    description = factory.Faker('sentence')  # Texto aleatorio para descripción
    url = factory.Faker('url')  # URL aleatoria
    related_room = factory.Iterator(Room.objects.all())  # Relacionar con una sala, si aplica (puedes omitirlo si no necesitas esto)
