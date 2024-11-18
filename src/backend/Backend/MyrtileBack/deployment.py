import os
from .settings import *
from .settings import BASE_DIR


ALLOWED_HOSTS = [os.environ['WEBSITE_HOSTNAME']]
CSRF_TRUSTED_ORIGINS = [os.environ['WEBSITE_HOSTNAME']]
DEBUG = False
SECRET_KEY = os.environ['MY_SECRET_KEY']

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    "corsheaders.middleware.CorsMiddleware",
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'allauth.account.middleware.AccountMiddleware',
]

# CORS_ALLOW_ALL_ORIGINS = []

STORAGES = {
    "default" : {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    " staticfiles " : {
        "BACKEND": "whiteenoise.storage.CompressedStaticFilesStorage",
    },
}

CONNECTION = os.environ['AZURE_POSTGRES_CONNECTIONSTRING']
CONNECTION_STR = { pairs.split('=')[0]: pairs.split('=')[1] for pairs in CONNECTION.split(' ') }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': CONNECTION_STR['dbname'],
        'HOST': CONNECTION_STR['host'],  # Or the IP address of your database server
        'USER': CONNECTION_STR['user'],
        'PASSWORD': CONNECTION_STR['password'],
    }
}

STATIC_ROOT = BASE_DIR / 'staticfiles'