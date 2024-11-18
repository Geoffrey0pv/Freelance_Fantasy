from django.core.management.base import BaseCommand
from projects.models import Project, Milestone
from datetime import date, timedelta
import random

class Command(BaseCommand):
    help = "Crea hitos de prueba basados en proyectos existentes."

    def handle(self, *args, **kwargs):
        try:
            projects = Project.objects.all()
            if not projects:
                self.stdout.write(self.style.ERROR("No se encontraron proyectos en la base de datos."))
                return

            created_milestones = 0

            for project in projects:
                num_milestones = random.randint(1, 3)  # Crear entre 1 y 3 hitos por proyecto
                for i in range(num_milestones):
                    start_date = date.today() + timedelta(days=random.randint(1, 30))
                    end_date = start_date + timedelta(days=random.randint(5, 15))

                    milestone = Milestone.objects.create(
                        project=project,
                        title=f"Hito {i + 1} para {project.title}",
                        description=f"Descripción del hito {i + 1} del proyecto {project.title}.",
                        start_date=start_date,
                        end_date=end_date,
                        status=random.choice(['por-iniciar', 'en-proceso', 'terminado'])
                    )
                    created_milestones += 1
                    self.stdout.write(self.style.SUCCESS(f"Hito '{milestone.title}' creado con éxito."))

            self.stdout.write(self.style.SUCCESS(f"\nSe crearon {created_milestones} hitos en total."))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Ocurrió un error: {e}"))
