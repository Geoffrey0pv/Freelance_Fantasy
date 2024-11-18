from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
import django_filters
from rest_framework.pagination import PageNumberPagination
from rest_framework.decorators import api_view
from .models import Project, Offer, Milestone, Task,Comment
from .serializers import (
    ProjectDetailSerializer,
    OfferSerializer,
    ProjectSerializer, MilestoneSerializer,TaskSerializer,CommentSerializer
)



class ProjectDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectDetailSerializer
    lookup_field = 'id'
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticatedOrReadOnly]

    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['request'] = self.request
        return context

class ProjectListByWorkerView(generics.ListAPIView):
    serializer_class = ProjectDetailSerializer

    def get_queryset(self):
        worker_id = self.kwargs['worker_id']
        return Project.objects.filter(worker_id=worker_id)  # Filtra los proyectos por worker_id

class ProjectListByOwnerView(generics.ListAPIView):
    serializer_class = ProjectDetailSerializer

    def get_queryset(self):
        owner_id = self.kwargs['owner_id']  # Cambia 'worker_id' a 'owner_id'
        return Project.objects.filter(user_id=owner_id)

class CreateOfferView(generics.CreateAPIView):
    serializer_class = OfferSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        project_id = kwargs.get('project_id')
        project = get_object_or_404(Project, id=project_id)

        serializer = OfferSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, project=project)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProjectFilter(django_filters.FilterSet):
    tags = django_filters.CharFilter(field_name='tags__name', lookup_expr='icontains')
    type_project = django_filters.CharFilter(field_name='type_project__name', lookup_expr='icontains')

    class Meta:
        model = Project
        fields = ['tags', 'type_project']


class ProjectPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100


class ProjectListView(generics.ListAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        latest_projects = Project.objects.order_by('-date_publication')[:5]
        latest_projects_serializer = ProjectSerializer(latest_projects, many=True)
        response.data['latest_projects'] = latest_projects_serializer.data
        return response


class CreateProjectView(generics.CreateAPIView):
    serializer_class = ProjectSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        print("Datos recibidos:", request.data)
        print("Archivos recibidos:", request.FILES)
        data = request.data.copy()
        data.update(request.FILES)
        serializer = self.get_serializer(data=data)

        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AcceptOfferView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, project_id, offer_id):
        # Verificar que el proyecto existe y pertenece al usuario autenticado.
        project = get_object_or_404(Project, id=project_id, user=request.user)

        # Obtener la oferta y asegurarse de que pertenece al proyecto.
        offer = get_object_or_404(Offer, id=offer_id, project=project)

        # Asignar el trabajador del proyecto y actualizar su estado.
        project.worker = offer.user
        project.active = False  # Puedes cambiar este valor según la lógica de tu negocio.
        project.save()

        # Marcar la oferta como aceptada (debes tener un campo 'status' en el modelo Offer).
        offer.status = "accepted"
        offer.save()

        # Retornar una respuesta indicando que la oferta fue aceptada.
        return Response({
            'message': 'Offer accepted. Worker assigned to the project.',
            'project_id': project.id,
            'worker': offer.user.username
        }, status=status.HTTP_200_OK)
class OwnedProjectsView(generics.ListAPIView):
    """
    Vista para obtener los proyectos creados por el usuario autenticado
    """
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        # Filtrar los proyectos por el usuario autenticado como creador
        return Project.objects.filter(user=self.request.user)

class WorkedProjectsView(generics.ListAPIView):
    """
    Vista para obtener los proyectos en los que el usuario autenticado trabaja
    """
    serializer_class = ProjectSerializer
    pagination_class = ProjectPagination
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]

    def get_queryset(self):
        # Filtrar los proyectos donde el usuario autenticado está asignado como trabajador
        return Project.objects.filter(worker=self.request.user)



class TaskListView(generics.ListAPIView):
    serializer_class = TaskSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        return Task.objects.filter(milestone__project_id=project_id)

class MilestoneListView(generics.ListAPIView):
    serializer_class = MilestoneSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        project_id = self.kwargs['project_id']
        project = get_object_or_404(Project, id=project_id)
        return project.milestones.all()

    # Puedes añadir un método adicional para verificar la salida
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class TaskUpdateView(generics.UpdateAPIView):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

class ProjectCostView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, project_id):
        project = get_object_or_404(Project, id=project_id)
        data = {
            "budget": project.budget,
            "actual_cost": project.actual_cost,
        }
        return Response(data)


@api_view(['GET', 'POST'])
def project_comments(request, project_id):
    if request.method == 'GET':
        comments = Comment.objects.filter(project_id=project_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        comment = Comment.objects.create(
            user=request.user,
            text=request.data['text'],
            project_id=project_id
        )
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def milestone_comments(request, milestone_id):
    if request.method == 'GET':
        comments = Comment.objects.filter(milestone_id=milestone_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        comment = Comment.objects.create(
            user=request.user,
            text=request.data['text'],
            milestone_id=milestone_id
        )
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET', 'POST'])
def task_comments(request, task_id):
    if request.method == 'GET':
        comments = Comment.objects.filter(task_id=task_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':
        comment = Comment.objects.create(
            user=request.user,
            text=request.data['text'],
            task_id=task_id
        )
        serializer = CommentSerializer(comment)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

# Filtro personalizado para proyectos
class ProjectFilter(django_filters.FilterSet):
    tags = django_filters.CharFilter(field_name='tags__name', lookup_expr='icontains')
    location = django_filters.CharFilter(field_name='location', lookup_expr='icontains')

    class Meta:
        model = Project
        fields = ['tags', 'location']

# Vista pública adaptada
class PublicProjectListView(generics.ListAPIView):
    """
    Vista para listar todos los proyectos sin necesidad de autenticación, con filtros de tag y location.
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    pagination_class = PageNumberPagination
    filter_backends = [DjangoFilterBackend]
    filterset_class = ProjectFilter  # Se especifica el filtro personalizado

    def list(self, request, *args, **kwargs):
        response = super().list(request, *args, **kwargs)
        return Response({
            'results': response.data
        }, status=status.HTTP_200_OK)

class MilestoneCreateView(generics.CreateAPIView):
    serializer_class = MilestoneSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        project_id = kwargs.get('project_id')
        project = get_object_or_404(Project, id=project_id)

        data = request.data.copy()
        data['project'] = project.id

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateTaskView(generics.CreateAPIView):
    serializer_class = TaskSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        milestone_id = kwargs.get('milestone_id')
        milestone = get_object_or_404(Milestone, id=milestone_id)

        data = request.data.copy()
        data['milestone'] = milestone.id

        serializer = self.get_serializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)