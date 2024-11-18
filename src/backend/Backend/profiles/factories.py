import factory
from factory.django import DjangoModelFactory
from django.utils import timezone
from users.models import User
from profiles.models import (
    Skill, Certification, Review, Education, Experience, Link, Image, PortfolioProject
)
from faker import Faker
import random

fake = Faker()

# Factory para User
class UserFactory(DjangoModelFactory):
    class Meta:
        model = User

    email = factory.LazyAttribute(lambda _: fake.unique.email())
    username = factory.LazyAttribute(lambda _: fake.unique.user_name())
    country = factory.LazyAttribute(lambda _: fake.country()[:100])
    city = factory.LazyAttribute(lambda _: fake.city()[:100])
    phone_number = factory.LazyAttribute(lambda _: fake.phone_number()[:20])
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=200))
    account_type = factory.Iterator(['natural_person', 'legal_entity'])
    data_joined = factory.LazyFunction(timezone.now)
    is_active = True
    is_staff = False
    is_freelancer = factory.LazyAttribute(lambda obj: obj.account_type == 'natural_person')
    is_client = factory.LazyAttribute(lambda obj: obj.account_type == 'legal_entity')
    password = factory.PostGenerationMethodCall('set_password', 'password123')

# Factory para Skill
class SkillFactory(DjangoModelFactory):
    class Meta:
        model = Skill

    user = factory.SubFactory(UserFactory, is_freelancer=True)
    skill = factory.LazyAttribute(lambda _: fake.job())

# Factory para Certification
class CertificationFactory(DjangoModelFactory):
    class Meta:
        model = Certification

    user = factory.SubFactory(UserFactory, is_freelancer=True)
    name = factory.LazyAttribute(lambda _: fake.catch_phrase())
    file = None  # Archivos dummy pueden ser agregados

# Factory para Review
class ReviewFactory(DjangoModelFactory):
    class Meta:
        model = Review

    user = factory.SubFactory(UserFactory, is_freelancer=True)
    review = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=200))
    rating = factory.LazyAttribute(lambda _: random.randint(1, 5))

# Factory para Education
class EducationFactory(DjangoModelFactory):
    class Meta:
        model = Education

    user = factory.SubFactory(UserFactory, is_freelancer=True)
    certification_name = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=50))
    certifying_institute_name = factory.LazyAttribute(lambda _: fake.company())
    start_date = factory.LazyAttribute(lambda _: fake.date_this_century(before_today=True))
    end_date = factory.LazyAttribute(lambda obj: obj.start_date + timezone.timedelta(days=random.randint(365, 1825)))
    country = factory.LazyAttribute(lambda _: fake.country())

# Factory para Experience
class ExperienceFactory(DjangoModelFactory):
    class Meta:
        model = Experience

    user = factory.SubFactory(UserFactory, is_freelancer=True)
    job_title = factory.LazyAttribute(lambda _: fake.job())
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=200))
    enterprise_name = factory.LazyAttribute(lambda _: fake.company())
    location = factory.LazyAttribute(lambda _: fake.city())
    start_date = factory.LazyAttribute(lambda _: fake.date_this_decade(before_today=True))
    end_date = factory.LazyAttribute(lambda obj: obj.start_date + timezone.timedelta(days=random.randint(365, 1095)))

# Factory para Link
class LinkFactory(DjangoModelFactory):
    class Meta:
        model = Link

    user = factory.SubFactory(UserFactory, is_freelancer=True)
    linkedin_url = factory.LazyAttribute(lambda _: fake.url())
    github_url = factory.LazyAttribute(lambda _: fake.url())
    portfolio_url = factory.LazyAttribute(lambda _: fake.url())

# Factory para Image
class ImageFactory(DjangoModelFactory):
    class Meta:
        model = Image

    user = factory.SubFactory(UserFactory, is_freelancer=True)
    profile_image = None  # Archivos dummy pueden ser agregados
    cover_image = None

# Factory para PortfolioProject
class PortfolioProjectFactory(DjangoModelFactory):
    class Meta:
        model = PortfolioProject

    user = factory.SubFactory(UserFactory, is_freelancer=True)
    title = factory.LazyAttribute(lambda _: fake.catch_phrase())
    description = factory.LazyAttribute(lambda _: fake.text(max_nb_chars=200))
    project_url = factory.LazyAttribute(lambda _: fake.url())
    image = None  # Archivos dummy pueden ser agregados
