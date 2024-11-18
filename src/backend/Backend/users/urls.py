from django.urls import path, include
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import UpdateUsernameView, UpdatePasswordView, UpdateUserProfileView, GetUserProfileView, SendPasswordResetView
from rest_framework.routers import DefaultRouter
from .views import *

router = DefaultRouter()
router.register(r'users', UserViewSet, basename="users")

urlpatterns = [
    # Rutas para login y registro
    path('login/', views.LoginView.as_view(), name='login'),
    path('register/', views.RegisterView.as_view(), name='register'),
    path('login/google/', views.GoogleLoginView.as_view(), name='google-login'),
    path('', include(router.urls)),

    # Rutas para actualizar datos
    path('update-username/', UpdateUsernameView.as_view(), name='update_username'),
    path('update-password/', UpdatePasswordView.as_view(), name='update_password'),
    path('update-profile/', UpdateUserProfileView.as_view(), name='update_profile'),
    path('profile/', GetUserProfileView.as_view(), name='get_user_profile'),  # Nueva ruta para obtener el perfil del usuario
    path('reset-password/', SendPasswordResetView.as_view(), name='password_reset_confirm'),


    # Rutas para freelancers y actualización de roles
    path('freelancers/all/', BasicFreelancerListView.as_view(), name='freelancers_list'),
    path('update-roles/', UpdateUserRolesView.as_view(), name='update_roles'),

    # Rutas para JWT (Login con tokens)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    path('<int:user_id>/', GetUserByIdView.as_view(), name='get_user_by_id'),

]


