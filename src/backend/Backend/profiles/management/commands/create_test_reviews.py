from django.core.management.base import BaseCommand
from django.utils import timezone
from users.models import User
from profiles.models import Skill, Certification, Review, Education, Experience, Link, PortfolioProject
from faker import Faker
import random

fake = Faker()

class Command(BaseCommand):
    help = 'Crea freelancers con perfiles completos, excluyendo imágenes, e incluye al usuario especial.'

    def handle(self, *args, **kwargs):
        num_freelancers = 10  # Número de freelancers a crear
        freelancers_created = 0

        for _ in range(num_freelancers):
            # Crear un freelancer
            freelancer = User.objects.create_user(
                email=fake.unique.email(),
                username=fake.unique.user_name(),
                password='SecurePassword12345',
                account_type='natural_person',
                is_freelancer=True,
                description=fake.text(max_nb_chars=200),
                country=fake.country(),
                city=fake.city(),
                phone_number=fake.phone_number()[:20]
            )

            # Crear skills
            num_skills = random.randint(2, 5)
            for _ in range(num_skills):
                Skill.objects.create(
                    user=freelancer,
                    skill=fake.job()
                )

            # Crear certificaciones
            num_certifications = random.randint(1, 3)
            for _ in range(num_certifications):
                Certification.objects.create(
                    user=freelancer,
                    name=fake.catch_phrase(),
                    file=None  # No se asigna archivo
                )

            # Crear educación
            num_educations = random.randint(1, 2)
            for _ in range(num_educations):
                start_date = fake.date_this_century(before_today=True)
                end_date = start_date + timezone.timedelta(days=random.randint(365, 1825))
                Education.objects.create(
                    user=freelancer,
                    certification_name=fake.text(max_nb_chars=50),
                    certifying_institute_name=fake.company(),
                    start_date=start_date,
                    end_date=end_date,
                    country=fake.country()
                )

            # Crear experiencia
            num_experiences = random.randint(2, 4)
            for _ in range(num_experiences):
                start_date = fake.date_this_decade(before_today=True)
                end_date = start_date + timezone.timedelta(days=random.randint(365, 1095))
                Experience.objects.create(
                    user=freelancer,
                    job_title=fake.job(),
                    description=fake.text(max_nb_chars=200),
                    enterprise_name=fake.company(),
                    location=fake.city(),
                    start_date=start_date,
                    end_date=end_date
                )

            # Crear links
            Link.objects.create(
                user=freelancer,
                linkedin_url=fake.url(),
                github_url=fake.url(),
                portfolio_url=fake.url()
            )

            # Crear proyectos de portafolio
            num_projects = random.randint(1, 3)
            for _ in range(num_projects):
                PortfolioProject.objects.create(
                    user=freelancer,
                    title=fake.catch_phrase(),
                    description=fake.text(max_nb_chars=200),
                    project_url=fake.url(),
                    image=None  # No se asigna imagen
                )

            # Crear review
            Review.objects.create(
                user=freelancer,
                review=fake.text(max_nb_chars=200),
                rating=random.randint(1, 5)
            )

            freelancers_created += 1
            self.stdout.write(self.style.SUCCESS(f"Freelancer '{freelancer.username}' creado con datos relacionados."))

        # Manejar el usuario especial
        try:
            special_user, created = User.objects.get_or_create(
                username='special_user',
                defaults={
                    'email': 'special_user@example.com',
                    'password': 'special_password',
                    'account_type': 'natural_person',
                    'is_freelancer': True,
                    'description': 'Este es un usuario especial con datos relacionados.',
                    'country': fake.country(),
                    'city': fake.city(),
                    'phone_number': fake.phone_number()[:20]
                }
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f"Usuario especial 'special_user' creado."))
            else:
                self.stdout.write(self.style.WARNING(f"Usuario especial 'special_user' ya existía."))

            # Crear skills para el usuario especial
            num_skills = random.randint(2, 5)
            for _ in range(num_skills):
                Skill.objects.create(
                    user=special_user,
                    skill=fake.job()
                )

            # Crear certificaciones
            num_certifications = random.randint(1, 3)
            for _ in range(num_certifications):
                Certification.objects.create(
                    user=special_user,
                    name=fake.catch_phrase(),
                    file=None
                )

            # Crear educación
            num_educations = random.randint(1, 2)
            for _ in range(num_educations):
                start_date = fake.date_this_century(before_today=True)
                end_date = start_date + timezone.timedelta(days=random.randint(365, 1825))
                Education.objects.create(
                    user=special_user,
                    certification_name=fake.text(max_nb_chars=50),
                    certifying_institute_name=fake.company(),
                    start_date=start_date,
                    end_date=end_date,
                    country=fake.country()
                )

            # Crear experiencia
            num_experiences = random.randint(2, 4)
            for _ in range(num_experiences):
                start_date = fake.date_this_decade(before_today=True)
                end_date = start_date + timezone.timedelta(days=random.randint(365, 1095))
                Experience.objects.create(
                    user=special_user,
                    job_title=fake.job(),
                    description=fake.text(max_nb_chars=200),
                    enterprise_name=fake.company(),
                    location=fake.city(),
                    start_date=start_date,
                    end_date=end_date
                )

            # Crear links
            Link.objects.create(
                user=special_user,
                linkedin_url=fake.url(),
                github_url=fake.url(),
                portfolio_url=fake.url()
            )

            # Crear proyectos de portafolio
            num_projects = random.randint(1, 3)
            for _ in range(num_projects):
                PortfolioProject.objects.create(
                    user=special_user,
                    title=fake.catch_phrase(),
                    description=fake.text(max_nb_chars=200),
                    project_url=fake.url(),
                    image=None
                )

            # Crear review
            Review.objects.create(
                user=special_user,
                review=fake.text(max_nb_chars=200),
                rating=random.randint(1, 5)
            )

            self.stdout.write(self.style.SUCCESS(f"Datos relacionados creados para el usuario especial 'special_user'."))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Error al manejar el usuario especial: {e}"))

        self.stdout.write(self.style.SUCCESS(f"\nSe crearon {freelancers_created} freelancers con datos completos y se manejó al usuario especial."))
