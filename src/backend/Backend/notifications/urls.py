from django.urls import path
from .views import NotificationsAPIView, MarkAsReadAPIView

urlpatterns = [
    path('notifications/', NotificationsAPIView.as_view(), name='notifications'),
    path('notifications/<int:pk>/mark-as-read/', MarkAsReadAPIView.as_view(), name='mark-as-read'),
]

