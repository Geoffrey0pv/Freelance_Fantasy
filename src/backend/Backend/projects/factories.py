import random
import os
from decimal import Decimal
import factory
from factory.django import DjangoModelFactory
from django.utils import timezone
from projects.models import Project, Tag, Milestone, Task, Offer
from users.models import User
from faker import Faker

# Definir una ruta para las imágenes de muestra
RUTA_CARPETA_IMAGENES = os.path.join('media', 'sample_images')

# Fábrica para el modelo User
class UserFactory(DjangoModelFactory):
    class Meta:
        model = User
        django_get_or_create = ('email',)

    username = factory.Faker('user_name')
    email = factory.LazyAttribute(lambda o: f"{Faker().user_name()}@example.com")
    password = factory.PostGenerationMethodCall('set_password', 'password123')

# Fábrica para el modelo Tag
class TagFactory(DjangoModelFactory):
    class Meta:
        model = Tag

    name = factory.Faker('word')

# Fábrica para el modelo Project
class ProjectFactory(DjangoModelFactory):
    class Meta:
        model = Project

    title = factory.Faker('catch_phrase', locale='en_US')
    description = factory.Faker('text', max_nb_chars=200)
    requirements = factory.Faker('sentence', nb_words=10)
    date_publication = factory.LazyFunction(timezone.now)
    location = factory.Faker('city')
    active = factory.Faker('boolean')
    user = factory.SubFactory(UserFactory)
    worker = factory.SubFactory(UserFactory)
    budget = factory.LazyFunction(lambda: Decimal(random.uniform(500, 5000)).quantize(Decimal('0.00')))

    @factory.lazy_attribute
    def photo(self):
        imagenes = os.listdir(RUTA_CARPETA_IMAGENES)
        if imagenes:
            ruta_imagen = os.path.join(RUTA_CARPETA_IMAGENES, random.choice(imagenes))
            return f'/sample_images/{os.path.basename(ruta_imagen)}'
        return None

    @factory.post_generation
    def tags(self, create, extracted, **kwargs):
        if not create:
            return
        if extracted:
            for tag in extracted:
                self.tags.add(tag)
        else:
            for _ in range(2):
                tag = TagFactory()
                self.tags.add(tag)

# Fábrica para el modelo Milestone
class MilestoneFactory(DjangoModelFactory):
    class Meta:
        model = Milestone

    project = factory.SubFactory(ProjectFactory)
    title = factory.Faker('catch_phrase', locale='en_US')
    description = factory.Faker('text', max_nb_chars=100)
    start_date = factory.Faker('date_this_year')
    end_date = factory.Faker('date_this_year')
    status = factory.Iterator(['por-iniciar', 'en-proceso', 'terminado'])

# Fábrica para el modelo Task
class TaskFactory(DjangoModelFactory):
    class Meta:
        model = Task

    milestone = factory.SubFactory(MilestoneFactory)
    title = factory.Faker('sentence', nb_words=4)
    description = factory.Faker('text', max_nb_chars=150)
    start_date = factory.Faker('date_this_year')
    finish_date = factory.Faker('date_this_year')
    priority = factory.Iterator(['baja', 'media', 'alta'])
    status = factory.Iterator(['por-empezar', 'todo', 'en-proceso', 'finalizado', 'cancelado'])
    price = factory.LazyFunction(lambda: Decimal(random.uniform(100, 1000)).quantize(Decimal('0.00')))

# Fábrica para el modelo Offer
class OfferFactory(DjangoModelFactory):
    class Meta:
        model = Offer

    project = factory.SubFactory(ProjectFactory)
    user = factory.SubFactory(UserFactory)
    description = factory.Faker('text', max_nb_chars=200)
    budget_offer = factory.LazyFunction(lambda: Decimal(random.uniform(100, 3000)).quantize(Decimal('0.00')))
    date_submission = factory.LazyFunction(timezone.now)
