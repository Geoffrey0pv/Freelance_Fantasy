from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BillsViewSet

router = DefaultRouter()
router.register(r'bills', BillsViewSet, basename='bills')

urlpatterns = [
    path('', include(router.urls)),
]
