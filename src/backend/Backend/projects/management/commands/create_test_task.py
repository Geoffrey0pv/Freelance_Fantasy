from django.core.management.base import BaseCommand
from projects.models import Milestone, Task
from datetime import date, timedelta
import random

class Command(BaseCommand):
    help = "Crea tareas de prueba basadas en hitos existentes."

    def handle(self, *args, **kwargs):
        try:
            milestones = Milestone.objects.all()
            if not milestones:
                self.stdout.write(self.style.ERROR("No se encontraron hitos en la base de datos."))
                return

            created_tasks = 0

            for milestone in milestones:
                num_tasks = random.randint(2, 3)  # Crear entre 2 y 3 tareas por hito
                for i in range(num_tasks):
                    start_date = milestone.start_date + timedelta(days=random.randint(0, 5))
                    finish_date = start_date + timedelta(days=random.randint(1, 5))

                    task = Task.objects.create(
                        milestone=milestone,
                        title=f"Tarea {i + 1} para {milestone.title}",
                        description=f"Descripción de la tarea {i + 1} del hito {milestone.title}.",
                        start_date=start_date,
                        finish_date=finish_date,
                        priority=random.choice(['baja', 'media', 'alta']),
                        status=random.choice(['por-empezar', 'en-proceso', 'finalizado']),
                        price=round(random.uniform(100.00, 1000.00), 2)
                    )
                    created_tasks += 1
                    self.stdout.write(self.style.SUCCESS(f"Tarea '{task.title}' creada con éxito."))

            self.stdout.write(self.style.SUCCESS(f"\nSe crearon {created_tasks} tareas en total."))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Ocurrió un error: {e}"))
