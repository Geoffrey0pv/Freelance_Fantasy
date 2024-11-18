from rest_framework import serializers
from .models import Bill
from projects.serializers import ProjectSerializer, MilestoneSerializer, TaskSerializer  # Importa serializadores existentes
from users.serializers import UserSerializer

class BillsSerializer(serializers.ModelSerializer):
    project = ProjectSerializer()
    milestone = MilestoneSerializer()
    task = TaskSerializer()
    users = UserSerializer(many=True)

    class Meta:
        model = Bill
        fields = [
            'id',
            'name',
            'users',
            'project',
            'milestone',
            'task',
            'task_price',
            'status_changed_at',
        ]
