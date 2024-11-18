from django.core.management.base import BaseCommand
from payments.factories import BillFactory
from projects.models import Task

class Command(BaseCommand):
    help = 'Crea facturas de prueba basadas en proyectos, hitos y tareas existentes.'

    def handle(self, *args, **kwargs):
        try:
            tasks = Task.objects.all()

            if not tasks.exists():
                self.stdout.write(self.style.ERROR('No hay tareas suficientes para generar facturas.'))
                return

            # Crear facturas basadas en las tareas existentes
            for task in tasks:
                unique_name = f"Factura_{task.id}_{task.title.replace(' ', '_')}"  # Nombre único basado en el ID y título de la tarea
                try:
                    BillFactory(
                        name=unique_name,
                        project=task.milestone.project,
                        milestone=task.milestone,
                        task=task,
                        task_price=task.price,
                        users=[task.milestone.project.user]  # Relacionar el dueño del proyecto
                    )
                    self.stdout.write(self.style.SUCCESS(f'Factura creada para la tarea "{task.title}".'))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f'No se pudo crear la factura para la tarea "{task.title}": {e}'))

            self.stdout.write(self.style.SUCCESS('Facturas de prueba creadas con éxito.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Ocurrió un error: {e}'))
