from django.core.management.base import BaseCommand
from django.db import connection

class Command(BaseCommand):
    help = 'Elimina todos los datos de prueba, incluyendo referencias en tablas relacionadas con claves foráneas.'

    def handle(self, *args, **kwargs):
        try:
            with connection.cursor() as cursor:
                # Eliminar relaciones en tablas dependientes
                try:
                    cursor.execute("DELETE FROM token_blacklist_outstandingtoken")
                    self.stdout.write(self.style.SUCCESS("Tokens eliminados de la tabla token_blacklist_outstandingtoken."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar de token_blacklist_outstandingtoken: {e}"))

                try:
                    cursor.execute("DELETE FROM profiles_image")
                    self.stdout.write(self.style.SUCCESS("Imágenes eliminadas de la tabla profiles_image."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar de profiles_image: {e}"))

                try:
                    cursor.execute("DELETE FROM profiles_review")
                    self.stdout.write(self.style.SUCCESS("Reseñas eliminadas de la tabla profiles_review."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar de profiles_review: {e}"))

                try:
                    cursor.execute("DELETE FROM profiles_certification")
                    self.stdout.write(self.style.SUCCESS("Certificaciones eliminadas de la tabla profiles_certification."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar de profiles_certification: {e}"))

                try:
                    cursor.execute("DELETE FROM profiles_skill")
                    self.stdout.write(self.style.SUCCESS("Habilidades eliminadas de la tabla profiles_skill."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar de profiles_skill: {e}"))

                # Eliminar relaciones de tags de proyectos
                try:
                    cursor.execute("DELETE FROM projects_project_tags")
                    self.stdout.write(self.style.SUCCESS("Referencias eliminadas de la tabla projects_project_tags."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar de projects_project_tags: {e}"))

                # Eliminar proyectos
                try:
                    cursor.execute("DELETE FROM projects_project")
                    self.stdout.write(self.style.SUCCESS("Proyectos eliminados de la tabla projects_project."))
                except Exception as e:
                    self.stdout.write(self.style.WARNING(f"No se pudo eliminar de projects_project: {e}"))

                # Eliminar usuarios
                try:
                    cursor.execute("DELETE FROM users_user")
                    self.stdout.write(self.style.SUCCESS("Usuarios eliminados de la tabla users_user."))
                except Exception as e:
                    self.stdout.write(self.style.ERROR(f"Ocurrió un error al eliminar los usuarios: {e}"))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Ocurrió un error inesperado: {e}"))
