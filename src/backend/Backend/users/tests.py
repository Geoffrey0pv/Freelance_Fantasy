from django.test import TestCase
from django.urls import reverse
from django.contrib.auth import get_user_model

User = get_user_model()


class UserAuthTests(TestCase):

    def setUp(self):
        # Crear un usuario de prueba
        self.user = User.objects.create_user(
            email='testuser@example.com',
            username='testuser',
            password='SecurePassword12345',
            account_type='natural_person'
        )
        self.login_url = reverse('login')
        self.register_url = reverse('register')


    def test_register_failure_missing_account_type(self):
        """Prueba de fallo de registro por falta de tipo de cuenta"""
        response = self.client.post(self.register_url, {
            'email': 'newuser@example.com',
            'username': 'newuser',
            'password': 'SecurePassword12345',
        })
        self.assertEqual(response.status_code, 400, response.content)
        response_data = response.json()
        self.assertEqual(response_data['error'], 'Todos los campos (nombre de usuario, correo, contraseña y tipo de cuenta) son obligatorios.')

    def test_register_failure_invalid_account_type(self):
        """Prueba de fallo de registro por tipo de cuenta inválido"""
        response = self.client.post(self.register_url, {
            'email': 'newuser@example.com',
            'username': 'newuser',
            'password': 'SecurePassword12345',
            'account_type': 'invalid_type'  # Tipo de cuenta no permitido
        })
        self.assertEqual(response.status_code, 400, response.content)
        response_data = response.json()
        self.assertEqual(response_data['error'], 'El tipo de cuenta no es válido. Debe ser "empresa" o "persona".')

    def test_register_failure_username_taken(self):
        """Prueba de fallo de registro por nombre de usuario ya en uso"""
        response = self.client.post(self.register_url, {
            'email': 'newuser@example.com',
            'username': 'testuser',  # Nombre de usuario ya existente
            'password': 'SecurePassword12345',
            'account_type': 'natural_person'
        })
        self.assertEqual(response.status_code, 400, response.content)
        response_data = response.json()
        self.assertIn('error', response_data)

    def test_register_email_taken(self):
        """Prueba de fallo de registro por email ya en uso"""
        response = self.client.post(self.register_url, {
            'email': 'testuser@example.com',  # Email ya existente
            'username': 'newuser',
            'password': 'SecurePassword12345',
            'account_type': 'natural_person'
        })
        self.assertEqual(response.status_code, 400, response.content)
        response_data = response.json()
        self.assertIn('error', response_data)

    def test_register_weak_password(self):
        """Prueba de fallo de registro por contraseña débil"""
        response = self.client.post(self.register_url, {
            'email': 'newuser@example.com',
            'username': 'newuser',
            'password': '123',  # Contraseña demasiado débil
            'account_type': 'natural_person'
        })
        self.assertEqual(response.status_code, 400, response.content)
        response_data = response.json()
        self.assertIn('error', response_data)

    def test_login_success(self):
        """Prueba de login exitoso"""
        response = self.client.post(self.login_url, {
            'username': 'testuser',
            'password': 'SecurePassword12345'
        })
        self.assertEqual(response.status_code, 200, response.content)
        response_data = response.json()
        self.assertEqual(response_data['message'], 'Bienvenido testuser, has iniciado sesión exitosamente.')

    def test_login_failure(self):
        """Prueba de fallo de login por contraseña incorrecta"""
        response = self.client.post(self.login_url, {
            'username': 'testuser',
            'password': 'wrongpassword'
        })
        self.assertEqual(response.status_code, 401, response.content)
        response_data = response.json()
        self.assertEqual(response_data['error'], 'Credenciales inválidas, verifica tu nombre de usuario o contraseña.')

    def test_login_user_not_exist(self):
        """Prueba de fallo de login por usuario inexistente"""
        response = self.client.post(self.login_url, {
            'username': 'nonexistentuser',
            'password': 'password123'
        })
        self.assertEqual(response.status_code, 401, response.content)
        response_data = response.json()
        self.assertEqual(response_data['error'], 'Credenciales inválidas, verifica tu nombre de usuario o contraseña.')

    def test_login_missing_fields(self):
        """Prueba de fallo de login por campos faltantes"""
        response = self.client.post(self.login_url, {
            'username': 'testuser'
        })
        self.assertEqual(response.status_code, 400, response.content)
        response_data = response.json()
        self.assertIn('error', response_data)
