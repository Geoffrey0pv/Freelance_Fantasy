from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'skills', SkillViewSet, basename='skills')
router.register(r'experiences', ExperienceViewSet, basename='experiences')
router.register(r'educations', EducationViewSet, basename='educations')
router.register(r'links', LinkViewSet, basename='links')
router.register(r'certifications', CertificationViewSet, basename='certifications')
router.register(r'reviews', ReviewViewSet, basename='reviews')
router.register(r'portfolios', PortfolioProjectViewSet, basename='portfolios')  # Cambia de PortfolioProject a PortfolioProjectViewSet

urlpatterns = [
    path('', include(router.urls)),
    path('images/', ProfileImageView.as_view(), name='image'),
    path('public/images/', PublicImageView.as_view(), name='public_image'),
    path('public/reviews/', PublicReviewView.as_view(), name='public_review'),
    path('public/<int:freelancer_id>/', PublicUserDataView.as_view(), name='public_user_data'),
]
