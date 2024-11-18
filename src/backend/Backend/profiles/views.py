from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, AllowAny 
from .models import Skill, Certification, Review, Education, Experience, Link, Image, PortfolioProject
from .serializers import SkillSerializer, CertificationSerializer, ReviewSerializer, EducationSerializer, ExperienceSerializer, LinkSerializer, ImageSerializer, PortfolioProjectSerializer
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
from notifications.models import Notification
from notifications.serializers import NotificationSerializer



class SkillViewSet(viewsets.ModelViewSet):
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Skill.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class CertificationViewSet(viewsets.ModelViewSet):
    serializer_class = CertificationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Certification.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ReviewViewSet(viewsets.ModelViewSet):
    serializer_class = ReviewSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Review.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class EducationViewSet(viewsets.ModelViewSet):
    serializer_class = EducationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Education.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ExperienceViewSet(viewsets.ModelViewSet):
    serializer_class = ExperienceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Experience.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class LinkViewSet(viewsets.ModelViewSet):
    serializer_class = LinkSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Link.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class ProfileImageView(generics.GenericAPIView):
    serializer_class = ImageSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def get_queryset(self):
        return Image.objects.filter(user=self.request.user)

    def get(self, request, *args, **kwargs):
        images = self.get_queryset().first()
        serializer = self.get_serializer(images)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, *args, **kwargs):
        images = self.get_queryset().first()
        data = request.data.copy()
        data.update(request.FILES)
        serializer = self.get_serializer(images, data=data, partial=True)
        
        if serializer.is_valid():
            serializer.save()

            Notification.objects.create(
                to_user=request.user,
                notification_type=1,  # Tipo: Cambio en el perfil
                description="Tu foto de perfil ha sido actualizada.",
                url="/profile/"
            )

            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class PortfolioProjectViewSet(viewsets.ModelViewSet):
    serializer_class = PortfolioProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PortfolioProject.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        project = serializer.save(user=self.request.user)

        # Crear notificación
        Notification.objects.create(
            to_user=self.request.user,
            description=f"Se ha añadido el proyecto '{project.title}' a tu portafolio."
        )

class PublicImageView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'detail': 'Falta user_id'}, status=status.HTTP_400_BAD_REQUEST)
        
        images = Image.objects.filter(user_id=user_id).first()
        if images:
            serializer = ImageSerializer(images)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'No se encontraron imágenes.'}, status=status.HTTP_404_NOT_FOUND)
    
class PublicReviewView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        user_id = request.query_params.get('user_id')
        if not user_id:
            return Response({'detail': 'Falta user_id'}, status=status.HTTP_400_BAD_REQUEST)

        reviews = Review.objects.filter(user_id=user_id)
        if reviews.exists():
            serializer = ReviewSerializer(reviews, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'detail': 'No se encontraron reviews.'}, status=status.HTTP_200_OK)
    
    
class PublicUserDataView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, freelancer_id, *args, **kwargs):
        # Utilizar freelancer_id directamente
        user_id = freelancer_id
        
        # Recuperar datos asociados al usuario
        data = {
            "skills": SkillSerializer(Skill.objects.filter(user_id=user_id), many=True).data,
            "certifications": CertificationSerializer(Certification.objects.filter(user_id=user_id), many=True).data,
            "reviews": ReviewSerializer(Review.objects.filter(user_id=user_id), many=True).data,
            "education": EducationSerializer(Education.objects.filter(user_id=user_id), many=True).data,
            "experience": ExperienceSerializer(Experience.objects.filter(user_id=user_id), many=True).data,
            "links": LinkSerializer(Link.objects.filter(user_id=user_id), many=True).data,
            "images": ImageSerializer(Image.objects.filter(user_id=user_id), many=True).data,
            "portfolio_projects": PortfolioProjectSerializer(PortfolioProject.objects.filter(user_id=user_id), many=True).data,
        }

        if not any(data.values()):
            return Response({'detail': 'No se encontraron datos para este usuario.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response(data, status=status.HTTP_200_OK)
