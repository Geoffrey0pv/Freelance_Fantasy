from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Elimina todos los datos de prueba, incluyendo referencias en tablas con claves foráneas.'

    def handle(self, *args, **kwargs):
        try:
            with connection.cursor() as cursor:
                # Eliminar datos de tablas dependientes en orden
                try:
                    cursor.execute("DELETE FROM projects_task")
                    self.stdout.write(self.style.SUCCESS("Tareas eliminadas correctamente."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar las tareas: {e}"))

                try:
                    cursor.execute("DELETE FROM projects_milestone")
                    self.stdout.write(self.style.SUCCESS("Milestones eliminados correctamente."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar los milestones: {e}"))

                try:
                    cursor.execute("DELETE FROM projects_project_tags")
                    self.stdout.write(self.style.SUCCESS("Relaciones de proyectos y tags eliminadas correctamente."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar las relaciones de proyectos y tags: {e}"))

                try:
                    cursor.execute("DELETE FROM projects_offer")
                    self.stdout.write(self.style.SUCCESS("Ofertas eliminadas correctamente."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar las ofertas: {e}"))

                # Eliminar proyectos y tags
                try:
                    cursor.execute("DELETE FROM projects_project")
                    self.stdout.write(self.style.SUCCESS("Proyectos eliminados correctamente."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar los proyectos: {e}"))

                try:
                    cursor.execute("DELETE FROM projects_tag")
                    self.stdout.write(self.style.SUCCESS("Tags eliminados correctamente."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar los tags: {e}"))

            self.stdout.write(self.style.SUCCESS("Todos los datos de prueba han sido eliminados con éxito."))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Ocurrió un error al eliminar los datos: {e}"))
