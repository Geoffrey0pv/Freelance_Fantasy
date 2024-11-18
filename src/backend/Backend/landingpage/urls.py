from django.urls import path


from .views import LandingPageDataView

urlpatterns = [
    path('', LandingPageDataView.as_view(), name='landing-page-projects'),  # Reutilizamos ProjectListView
]