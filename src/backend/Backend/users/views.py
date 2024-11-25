from rest_framework import status, viewsets
from rest_framework.response import Response
from rest_framework.views import APIView
from users.models import User  # Importa el modelo de usuario personalizado
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework_simplejwt.tokens import RefreshToken
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.password_validation import validate_password
from .serializers import UserUpdateSerializer
from rest_framework.permissions import IsAuthenticated
from .serializers import UserSerializer
from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from dj_rest_auth.registration.views import SocialLoginView
from rest_framework.generics import ListAPIView, UpdateAPIView
import uuid
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
from rest_framework.pagination import PageNumberPagination

class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        # Datos recibidos desde el frontend
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        account_type = request.data.get('account_type')  # Nuevo campo para tipo de cuenta

        # Validar si los campos están presentes
        if not username or not password or not email or not account_type:
            return Response(
                {'error': 'Todos los campos (nombre de usuario, correo, contraseña y tipo de cuenta) son obligatorios.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Validar el formato del correo
        try:
            validate_email(email)
        except ValidationError:
            return Response({'error': 'El correo electrónico no es válido.'}, status=status.HTTP_400_BAD_REQUEST)

        # Validar si el nombre de usuario o correo ya están en uso
        if User.objects.filter(username=username).exists():
            return Response({'error': 'El nombre de usuario ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)
        if User.objects.filter(email=email).exists():
            return Response({'error': 'El correo electrónico ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)

        # Validar la fortaleza de la contraseña
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({'error': 'Esta contraseña es demasiado corta o es demasiado común. '}, status=status.HTTP_400_BAD_REQUEST)

        # Validar el tipo de cuenta (empresa o persona natural)
        if account_type not in ['empresa', 'persona']:
            return Response({'error': 'El tipo de cuenta no es válido. Debe ser "empresa" o "persona".'}, status=status.HTTP_400_BAD_REQUEST)

        # Crear el usuario si todo es válido (la descripción no se incluye aquí, se modifica desde el perfil)
        user = User.objects.create_user(
            username=username,
            password=password,
            email=email,
            account_type=account_type
        )
        
        # Generar el token JWT para el nuevo usuario
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'message': 'Registro exitoso. ¡Bienvenido!',
            'account_type': account_type
        }, status=status.HTTP_201_CREATED)

class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response(
                {'error': 'El nombre de usuario y la contraseña son obligatorios.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        user = authenticate(username=username, password=password)

        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'username': user.username,
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'message': f'Bienvenido {user.username}, has iniciado sesión exitosamente.'
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Credenciales inválidas, verifica tu nombre de usuario o contraseña.'}, status=status.HTTP_401_UNAUTHORIZED)


class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter


class GoogleLoginView(SocialLoginView):
    permission_classes = [AllowAny]
    adapter_class = GoogleOAuth2Adapter

    def post(self, request):
        token = request.data.get('access_token')
        try:
            adapter = GoogleOAuth2Adapter()
            app = adapter.get_provider().get_app(request)
            token = adapter.parse_token({'access_token': token})
            token.app = app
            login = adapter.complete_login(request, app, token, response=None)
            login.token = token
            login.state = SocialLoginView.State.SUCCEEDED
            login.save(request, connect=True)
            user = login.user
            user.backend = 'django.contrib.auth.backends.ModelBackend'

            # Aquí se genera el token de autenticación y se devuelve junto con los datos del usuario
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'username': user.username,
                    'email': user.email,
                }
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        return User.objects.filter(id=self.request.user.id)


# Endpoint para actualizar el username
class UpdateUsernameView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        new_username = request.data.get('username')

        # Validar que el nombre de usuario no esté en uso
        if User.objects.filter(username=new_username).exists():
            return Response({'error': 'Este nombre de usuario ya está en uso.'}, status=status.HTTP_400_BAD_REQUEST)

        # Actualizar el username
        user.username = new_username
        user.save()
        return Response({'message': 'Nombre de usuario actualizado exitosamente.'}, status=status.HTTP_200_OK)


# Endpoint para actualizar la contraseña
class UpdatePasswordView(APIView):
    permission_classes = [AllowAny]  

    def put(self, request):
        token = request.data.get('token')
        new_password = request.data.get('password')

        if not token or not new_password:
            return Response({'error': 'El token y la nueva contraseña son obligatorios.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(reset_password_token=token)

            if user.reset_token_expiration < timezone.now():
                return Response({'error': 'El token ha expirado.'}, status=status.HTTP_400_BAD_REQUEST)

            try:
                validate_password(new_password, user=user)
            except ValidationError as e:
                return Response({'error': ' '.join(e.messages)}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(new_password)

            user.reset_password_token = None
            user.reset_token_expiration = None
            user.save()

            return Response({'message': 'Contraseña actualizada exitosamente.'}, status=status.HTTP_200_OK)

        except User.DoesNotExist:
            return Response({'error': 'Token inválido o usuario no encontrado.'}, status=status.HTTP_404_NOT_FOUND)



# Endpoint para actualizar la información básica del perfil
class UpdateUserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        serializer = UserUpdateSerializer(user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'Perfil actualizado exitosamente.'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUserProfileView(APIView):

    def get(self, request):
        user = request.user
        serializer = UserSerializer(user)  # Utilizamos el UserSerializer para excluir la contraseña
        return Response(serializer.data, status=200)
    
class FreelancerPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

class BasicFreelancerListView(ListAPIView):
    queryset = User.objects.filter(is_freelancer=True)
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    pagination_class = FreelancerPagination

class UpdateUserRolesView(UpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        user = request.user
        is_freelancer = request.data.get('is_freelancer', user.is_freelancer)
        is_client = request.data.get('is_client', user.is_client)

        user.is_freelancer = is_freelancer
        user.is_client = is_client
        user.save()

        return Response({'message': 'Roles actualizados correctamente'}, status=200)
    
class SendPasswordResetView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')

        # Validar que el email fue proporcionado
        if not email:
            return Response({'error': 'El correo es obligatorio.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response({'error': 'No se encontró un usuario con este correo.'}, status=status.HTTP_404_NOT_FOUND)

        # Generar un token único y establecer una expiración
        token = uuid.uuid4().hex
        user.reset_password_token = token
        user.reset_token_expiration = timezone.now() + timedelta(hours=1)  # Aquí usamos timezone.now()
        user.save()

        # Enviar el correo con el enlace para restablecer la contraseña
        reset_url = f"{settings.FRONTEND_URL}{token}/"
        send_mail(
            subject='Restablecimiento de contraseña',
            message=f"Hola {user.username},\n\nHaz clic en el siguiente enlace para restablecer tu contraseña:\n{reset_url}\n\nEste enlace expirará en 1 hora.",
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[user.email],
        )

        return Response({'message': 'Correo enviado. Revisa tu bandeja de entrada.'}, status=status.HTTP_200_OK)
    

class GetUserByIdView(APIView):
    permission_classes = [AllowAny]  

    def get(self, request, user_id):
        try:
            user = User.objects.get(id=user_id)
            serializer = UserSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response(
                {"error": "Usuario no encontrado."},
                status=status.HTTP_404_NOT_FOUND
            )

