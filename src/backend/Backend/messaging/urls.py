from django.urls import path
from .views import *

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import MessagingViewSet

router = DefaultRouter()
router.register(r'messages', MessagingViewSet, basename='messaging')
router.register(r'rooms', RoomViewSet, basename='rooms')


urlpatterns = [
    path('', include(router.urls)),
]
