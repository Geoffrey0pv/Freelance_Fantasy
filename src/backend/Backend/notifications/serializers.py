from rest_framework import serializers
from .models import Notification
from messaging.models import Room  # Modelo Room

class NotificationSerializer(serializers.ModelSerializer):
    related_room = serializers.PrimaryKeyRelatedField(queryset=Room.objects.all(), required=False)

    class Meta:
        model = Notification
        fields = ['id', 'to_user', 'notification_type', 'description', 'created_at', 'is_read', 'related_room', 'url']


