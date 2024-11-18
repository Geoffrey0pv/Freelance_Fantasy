from django.core.management.base import BaseCommand

class Command(BaseCommand):
    help = 'Prueba si el comando personalizado se detecta correctamente'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS("¡El comando de prueba se ejecutó correctamente!"))
