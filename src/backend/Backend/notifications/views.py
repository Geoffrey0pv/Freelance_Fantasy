from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

class NotificationsAPIView(APIView):
    def get(self, request):
        try:
            notifications = Notification.objects.all().order_by('-created_at')  # Trae todas las notificaciones
            serializer = NotificationSerializer(notifications, many=True)
            return Response(serializer.data, status=200)
        except Exception as e:
            return Response({"error": "Error fetching notifications"}, status=500)


class MarkAsReadAPIView(APIView):
    permission_classes = [AllowAny]

    def patch(self, request, pk):
        try:
            notification = Notification.objects.get(pk=pk)
            notification.is_read = True
            notification.save()
            return Response({'message': 'Notification marked as read'}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({'error': 'Notification not found'}, status=status.HTTP_404_NOT_FOUND)
