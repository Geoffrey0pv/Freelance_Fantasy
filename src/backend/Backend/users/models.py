from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Definimos las opciones para el tipo de cuenta
ACCOUNT_TYPE_CHOICES = (
    ('natural_person', 'Persona Natural'),
    ('legal_entity', 'Empresa'),
)

class UserManager(BaseUserManager):
    def create_user(self, email, username, password=None, **extra_fields):
        if not email:
            raise ValueError('An email is required')
        if not username:
            raise ValueError('The Username is required')
        if not password:
            raise ValueError('A password is required')

        email = self.normalize_email(email)
        user = self.model(email=email, username=username, **extra_fields)
        user.set_password(password)  # Hashear la contraseña
        user.save(using=self._db)
        return user

    def create_superuser(self, email, username, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self.create_user(email, username, password, **extra_fields)

class User(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50, unique=True)
    country = models.CharField(max_length=100, blank=True, default='')
    city = models.CharField(max_length=100, blank=True, default='')
    phone_number = models.CharField(max_length=20, blank=True, default='')
    description = models.TextField(blank=True, default='')  # Descripción añadida aquí
    account_type = models.CharField(max_length=20, choices=ACCOUNT_TYPE_CHOICES, default='persona')  # Tipo de cuenta
    data_joined = models.DateTimeField(auto_now_add=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    # Nuevos campos
    is_freelancer = models.BooleanField(default=False)
    is_client = models.BooleanField(default=False)
    reset_password_token = models.CharField(max_length=100, blank=True, null=True)
    reset_token_expiration = models.DateTimeField(blank=True, null=True)


    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    objects = UserManager()
    

    def __str__(self):
        return self.username
