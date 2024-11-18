from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from .models import Message, Room
from .serializers import MessageSerializer, RoomSerializer
from django.contrib.auth.decorators import login_required
from .consumers import ChatConsumer
from django_filters.rest_framework import DjangoFilterBackend

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny

class MessagingViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['room']
    def perform_create(self, serializer):
        room = Room.objects.get(id=self.request.data.get('room'))
        serializer.save(user=self.request.user, room=room)
        


class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [AllowAny]
    




def home(request):
    rooms = Room.objects.all()  
    rooms_info = []  

    
    for room in rooms:
        room_info = {
            'id': room.id,
            'name': room.name,
            'users': [user.username for user in room.users.all()] 
        }
        rooms_info.append(room_info)

    return JsonResponse(rooms_info, safe=False) 



@login_required
def room(request, room_id):
    try:
        # Obtiene la sala a la que el usuario está unido
        room = request.user.rooms_joined.get(id=room_id)
    except Room.DoesNotExist:
        return JsonResponse({'error': 'No tiene permisos de acceso a este Chat.'}, status=403)

    # Filtra los mensajes correspondientes a la sala y los ordena por la marca de tiempo
    messages = Message.objects.filter(room=room).order_by('timestamp')

    # Serializa los mensajes usando MessageSerializer
    serializer = MessageSerializer(messages, many=True)  # many=True porque es una lista de mensajes
    
    return JsonResponse({'messages': serializer.data}, status=200)
