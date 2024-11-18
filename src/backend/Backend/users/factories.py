import factory
from factory.django import DjangoModelFactory
from django.utils import timezone
from users.models import User
from profiles.models import Review
from faker import Faker

# Crear una instancia de Faker
fake = Faker()

class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    email = factory.LazyAttribute(lambda _: fake.email())
    username = factory.LazyAttribute(lambda o: o.email.split('@')[0][:50])  # Limita el username a 50 caracteres
    country = factory.LazyAttribute(lambda _: fake.country()[:100])  # Limita a 100 caracteres
    city = factory.LazyAttribute(lambda _: fake.city()[:100])  # Limita a 100 caracteres
    phone_number = factory.LazyAttribute(lambda _: fake.phone_number()[:20])  # Limita a 20 caracteres
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=200))
    account_type = factory.Iterator(['natural_person', 'legal_entity'])
    data_joined = factory.LazyFunction(timezone.now)
    is_active = True
    is_staff = False
    password = factory.PostGenerationMethodCall('set_password', 'password123')

    is_freelancer = False
    is_client = False

    @classmethod
    def create_freelancers(cls, count=5):
        """Create multiple freelancers with reviews."""
        freelancers = cls.create_batch(count, is_freelancer=True, account_type='natural_person')
        for freelancer in freelancers:
            ReviewFactory.create(user=freelancer)
        return freelancers

    @classmethod
    def create_clients(cls, count=5):
        """Create multiple clients without reviews."""
        return cls.create_batch(count, is_client=True, account_type='legal_entity')


class ReviewFactory(DjangoModelFactory):
    class Meta:
        model = Review

    user = factory.SubFactory(UserFactory)
    review = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=100))
    rating = factory.LazyAttribute(lambda _: fake.random_int(min=1, max=5))
