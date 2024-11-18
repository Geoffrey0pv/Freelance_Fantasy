from django.core.management.base import BaseCommand
from django.db import connection, transaction

class Command(BaseCommand):
    help = 'Limpia toda la base de datos eliminando los datos de todas las tablas.'

    def handle(self, *args, **kwargs):
        try:
            with connection.cursor() as cursor:
                # Deshabilitar restricciones de claves foráneas temporalmente
                cursor.execute("SET session_replication_role = 'replica';")
                self.stdout.write(self.style.WARNING("Restricciones de claves foráneas deshabilitadas."))

                # Obtener el listado de tablas
                cursor.execute("""
                    SELECT table_name 
                    FROM information_schema.tables 
                    WHERE table_schema = 'public' AND table_type = 'BASE TABLE';
                """)
                tables = cursor.fetchall()

                # Limpiar cada tabla
                for table in tables:
                    table_name = table[0]
                    try:
                        cursor.execute(f"TRUNCATE TABLE {table_name} CASCADE;")
                        self.stdout.write(self.style.SUCCESS(f"Tabla '{table_name}' truncada con éxito."))
                    except Exception as e:
                        self.stdout.write(self.style.ERROR(f"Error truncando la tabla '{table_name}': {e}"))

                # Restaurar las restricciones de claves foráneas
                cursor.execute("SET session_replication_role = 'origin';")
                self.stdout.write(self.style.SUCCESS("Restricciones de claves foráneas restauradas."))

        except Exception as e:
            self.stdout.write(self.style.ERROR(f"Ocurrió un error al limpiar la base de datos: {e}"))
