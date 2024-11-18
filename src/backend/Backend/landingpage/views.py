from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from users.serializers import UserSerializer
from projects.serializers import ProjectSerializer
from projects.models import Project
from users.models import User

class LandingPageDataView(APIView):

    def get(self, request):
        # Get active users and projects
        active_users = User.objects.filter(is_active=True)
        projects = Project.objects.all()

        user_serializer = UserSerializer(active_users, many=True)
        project_serializer = ProjectSerializer(projects, many=True)

        # Combine and return the data
        data = {
            'users': user_serializer.data,
            'projects': project_serializer.data
        }
        return Response(data, status=status.HTTP_200_OK)
