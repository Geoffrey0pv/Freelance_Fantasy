from django.test import TestCase
from notifications.models import Notification
from users.models import User
from messaging.models import Room

class NotificationModelTestCase(TestCase):
    def setUp(self):
        # Crear un usuario para las notificaciones
        self.user = User.objects.create(username="testuser", email="testuser@example.com")
        
        self.room = Room.objects.create(name="Test Room")

        # Crear una notificación de ejemplo
        self.notification = Notification.objects.create(
            to_user=self.user,
            notification_type=1,
            description="Cambio en el perfil",
            url="http://example.com",
            related_room=self.room,
        )

    def test_notification_creation(self):
        """Verificar que la notificación se crea correctamente."""
        self.assertEqual(self.notification.to_user.username, "testuser")
        self.assertEqual(self.notification.notification_type, 1)
        self.assertEqual(self.notification.description, "Cambio en el perfil")
        self.assertEqual(self.notification.url, "http://example.com")
        self.assertFalse(self.notification.is_read) 

    def test_mark_notification_as_read(self):
        """Probar que se puede marcar una notificación como leída."""
        self.notification.is_read = True
        self.notification.save()
        self.assertTrue(self.notification.is_read)

    def test_related_room(self):
        """Probar que la notificación está asociada con la sala correcta."""
        self.assertEqual(self.notification.related_room, self.room)
        self.assertEqual(self.notification.related_room.name, "Test Room")

    def test_str_method(self):
        """Probar que el método __str__ devuelve el formato correcto."""
        expected_str = f"Notificación para {self.user.username} - Tipo: {self.notification.get_notification_type_display()}"
        self.assertEqual(str(self.notification), expected_str)

    def test_notification_type_display(self):
        """Probar que el método get_notification_type_display funciona correctamente."""
        self.assertEqual(self.notification.get_notification_type_display(), "Cambio en el perfil")

    def test_filter_unread_notifications(self):
        """Probar que se pueden filtrar notificaciones no leídas."""
        Notification.objects.create(
            to_user=self.user,
            notification_type=2,
            description="Cambio de tipo de usuario",
            is_read=True,
        )
        unread_notifications = Notification.objects.filter(to_user=self.user, is_read=False)
        self.assertEqual(unread_notifications.count(), 1)  #
