from django.core.management.base import BaseCommand
from projects.models import Project, Offer
from users.models import User
import random
from faker import Faker
from decimal import Decimal

faker = Faker()

class Command(BaseCommand):
    help = "Crea ofertas de prueba para todos los proyectos en la base de datos."

    def handle(self, *args, **kwargs):
        try:
            # Obtener todos los proyectos en la base de datos (activos o no)
            projects = Project.objects.all()
            if not projects.exists():
                self.stdout.write(self.style.ERROR("No se encontraron proyectos en la base de datos."))
                return
            
            # Obtener todos los usuarios
            users = User.objects.all()
            if not users.exists():
                self.stdout.write(self.style.ERROR("No se encontraron usuarios en la base de datos."))
                return

            created_offers = 0

            # Crear ofertas para cada proyecto
            for project in projects:
                num_offers = random.randint(1, 5)  # Crear entre 1 y 5 ofertas por proyecto
                for _ in range(num_offers):
                    user = random.choice(users)
                    description = faker.paragraph(nb_sentences=3)

                    # Generar presupuesto como Decimal
                    max_budget = project.budget or Decimal('1000.00')
                    budget_offer = Decimal(random.uniform(100.00, float(max_budget))).quantize(Decimal('0.01'))

                    # Crear la oferta
                    Offer.objects.create(
                        project=project,
                        user=user,
                        description=description,
                        budget_offer=budget_offer,
                        is_reviewed=random.choice([True, False]),
                        status=random.choice([True, False, None])
                    )

                    created_offers += 1
                    self.stdout.write(self.style.SUCCESS(
                        f"Oferta creada para el proyecto '{project.title}' por el usuario '{user.username}'."
                    ))

            self.stdout.write(self.style.SUCCESS(f"\nSe crearon {created_offers} ofertas en total."))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Ocurrió un error: {e}"))
