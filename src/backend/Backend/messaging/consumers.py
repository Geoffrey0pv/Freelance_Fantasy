import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync
from django.utils import timezone
from .models import Message

class ChatConsumer(WebsocketConsumer):
    connected_users = set()

    def connect(self):
        self.id = self.scope['url_route']['kwargs']['room_id']
        self.room_group_name = 'sala_chat_%s' % self.id
        self.user = self.scope['user']

        print('Conexión establecida al room_group_name ' + self.room_group_name)
        print('Conexión establecida channel_name ' + self.channel_name)

        async_to_sync(self.channel_layer.group_add)(self.room_group_name, self.channel_name)
        self.accept()

        self.connected_users.add(self.user.username)
        self.send_user_list()
        self.load_messages()

    def disconnect(self, close_code):
        print('Se ha desconectado')
        async_to_sync(self.channel_layer.group_discard)(self.room_group_name, self.channel_name)
        self.connected_users.remove(self.user.username)
        self.send_user_list()

    def load_messages(self):
        messages = Message.objects.filter(room_id=self.id).order_by('timestamp')  
        messages_data = [
            {
                'message': message.message,
                'username': message.user.username,
                'datetime': message.timestamp.strftime('%Y-%m-%d %H:%M:%S'),
            } for message in messages
        ]
        self.send(text_data=json.dumps({
            'messages': messages_data
        }))

    def receive(self, text_data):
        print('Mensaje recibido')

        try:
            text_data_json = json.loads(text_data)
            message = text_data_json['message']

            # Obtenemos el ID del usuario que envia el mensaje
            if self.scope['user'].is_authenticated:
                sender_id = self.scope['user'].id
            else:
                None


            if sender_id:
                # Grabamos el mensaje en la base de datos
                message_save = Message.objects.create(user_id=sender_id, room_id=self.id, message=message)
                message_save.save()
                                                      
                # Sincronizamos y enviamos el mensaje a la sala de chat
                async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
                    'type': 'chat_message',
                    'message': message,
                    'username': self.user.username,
                    'datetime': timezone.localtime(timezone.now()).strftime('%Y-%m-%d %H:%M:%S'),
                    'sender_id': sender_id
                })
            else:
                print('Usuario no autenticado. Ignorando el mensaje')

        except json.JSONDecodeError as e:
            print('Hubo un error al decodificar el JSON: ', e)
        except KeyError as e:
            print('Clave faltante en el JSON: ', e)
        except Exception as e:
            print('Error desconocido: ', e)

    def chat_message(self, event):
        message = event['message']
        username = event['username']
        datetime = event['datetime']
        sender_id = event['sender_id']

        current_user_id = self.scope['user'].id
        if sender_id != current_user_id:
            self.send(text_data=json.dumps({
                'message':message,
                'username': username,
                'datetime': datetime
            }))

    def send_user_list(self):
        async_to_sync(self.channel_layer.group_send)(self.room_group_name, {
            'type': 'update_user_list',
            'connected_users': list(ChatConsumer.connected_users)
        })

    def update_user_list(self, event):
        connected_users = event['connected_users']
        self.send(text_data=json.dumps({
            'connected_users': connected_users
        }))

    
