from rest_framework import serializers
from django.contrib.auth.password_validation import validate_password
from .models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'username', 'country', 'city', 'phone_number', 'description', 'account_type', 'data_joined', 'is_active', 'is_staff',  'is_freelancer', 'is_client']


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['email', 'username', 'password', 'account_type', 'country', 'city', 'phone_number', 'description']

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)
        user.save()
        return user


class UserUpdateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=False)

    class Meta:
        model = User
        fields = ['email', 'username', 'country', 'city', 'phone_number', 'description', 'photo', 'password']

    def update(self, instance, validated_data):
        # Si se proporciona una nueva contraseña, validarla
        password = validated_data.pop('password', None)
        if password:
            validate_password(password)
            instance.set_password(password)

        # Actualizar otros campos
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
            
        instance.save()
        return instance
