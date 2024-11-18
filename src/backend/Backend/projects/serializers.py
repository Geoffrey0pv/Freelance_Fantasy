from rest_framework import serializers

from .models import Project,  Milestone, Task, Offer, Tag, Comment
from users.models import User
from users.serializers import UserSerializer
from rest_framework.parsers import MultiPartParser, FormParser


# Tag Serializer
class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']


# Task Serializer
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'start_date', 'finish_date', 'priority', 'status']

# Milestone Serializer
class MilestoneSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)


    class Meta:
        model = Milestone
        fields = ['id', 'title', 'description', 'start_date', 'end_date', 'tasks', 'is_completed','status']

# Offer Serializer
class OfferSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Offer
        fields = ['id', 'description', 'budget_offer', 'date_submission','user','is_reviewed','status']

# Project Serializer
class ProjectSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    worker = UserSerializer(read_only=True)
    milestones = MilestoneSerializer(many=True, read_only=True)
    offers = OfferSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'budget', 'date_publication', 'location', 'photo',
            'user', 'worker', 'milestones', 'offers', 'tags', 'requirements', 'active'
        ]

# Modified ProjectDetailSerializer to include tags, worker, and is_owner field
class ProjectDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    worker = UserSerializer(read_only=True)  # Añadir la información del trabajador asignado
    offers = OfferSerializer(many=True, read_only=True)
    milestones = MilestoneSerializer(many=True, read_only=True)
    tags = TagSerializer(many=True, read_only=True)
    is_owner = serializers.SerializerMethodField()  # Indicador de propiedad del proyecto

    class Meta:
        model = Project
        fields = [
            'id', 'title', 'description', 'location', 'budget', 'date_publication', 'photo',
            'user', 'worker', 'offers', 'milestones', 'tags', 'is_owner', 'requirements', 'active'
        ]  # Incluimos el campo 'worker' para mostrar el trabajador asignado

    def get_is_owner(self, obj):
        # Obtener el usuario actual desde el contexto de la solicitud
        request = self.context.get('request')

        # Verificar que el request y request.user estén definidos y que el usuario esté autenticado
        if request and hasattr(request, 'user'):
            return obj.user == request.user

        # Devolver False si el usuario no está autenticado o la solicitud no es válida
        return False
class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Mostrar el nombre de usuario

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'date', 'project', 'milestone', 'task']