from django.db import models
from users.models import User


class Room(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='Nombre')
    users = models.ManyToManyField(User, related_name='rooms_joined', blank=True)

    def __str__(self):
        return self.name

class Message(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, verbose_name='Usuario')
    room = models.ForeignKey(Room, on_delete=models.CASCADE, verbose_name='Sala')
    message = models.TextField(verbose_name='Mensaje', default='Mensaje vacío')
    timestamp = models.DateTimeField(auto_now_add=True, verbose_name='Enviado')

    def __str__(self):
        return self.message

# NotificationType Model
class NotificationType(models.Model):
    notification_type = models.CharField(max_length=255)

    def __str__(self):
        return self.notification_type

# Notification Model
class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    content = models.TextField()
    date_and_time_message = models.DateTimeField(auto_now_add=True)
    notification_type = models.ForeignKey(NotificationType, on_delete=models.CASCADE)

    def __str__(self):
        return f"Notification for {self.user.username}"


    