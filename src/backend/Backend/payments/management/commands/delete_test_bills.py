from django.core.management.base import BaseCommand
from payments.models import Bill

class Command(BaseCommand):
    help = 'Elimina todas las facturas de prueba.'

    def handle(self, *args, **kwargs):
        try:
            # Eliminar todas las facturas
            count = Bill.objects.count()
            Bill.objects.all().delete()
            self.stdout.write(self.style.SUCCESS(f'Se eliminaron {count} facturas de prueba.'))
        except Exception as e:
            self.stdout.write(self.style.ERROR(f'Ocurrió un error al eliminar las facturas: {e}'))
