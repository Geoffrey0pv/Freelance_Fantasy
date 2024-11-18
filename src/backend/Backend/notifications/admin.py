from django.contrib import admin
from .models import Notification

@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ('to_user', 'notification_type', 'created_at', 'is_read')
    list_filter = ('is_read', 'notification_type')
    search_fields = ('to_user__username', 'description')
