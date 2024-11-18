"""
ASGI config for MyrtileBack project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/5.1/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack

# Importar las rutas para WebSockets
import messaging.routing
import notifications.routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'MyrtileBack.settings')

application = ProtocolTypeRouter({
    'http': get_asgi_application(),  # Para manejar solicitudes HTTP normales
    'websocket': AuthMiddlewareStack(  # Para manejar WebSockets
        URLRouter(
            messaging.routing.websocket_urlpatterns +  # Rutas de WebSocket para 'messaging'
            notifications.routing.websocket_urlpatterns  # Rutas de WebSocket para 'notifications'
        )
    ),
})
