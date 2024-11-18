from rest_framework import serializers
from .models import Message, Room  # Importa el modelo Message
from users.serializers import UserSerializer

class MessageSerializer(serializers.ModelSerializer):
    user = UserSerializer()     

    class Meta:
        model = Message
        fields = ['id', 'user', 'room', 'message', 'timestamp']  # Especifica los campos que quieres serializar

class RoomSerializer(serializers.ModelSerializer):
    users = UserSerializer(many=True)

    class Meta:
        model = Room
        fields = ['id','name', 'users']  # Especifica los campos que quieres serializar
