from django.test import TestCase
from payments.models import Bill
from users.models import User
from projects.models import Project, Task, Milestone
from datetime import datetime, timedelta

class BillModelTestCase(TestCase):
    def setUp(self):
        # Crear un usuario para las pruebas
        self.user = User.objects.create_user(
            username="special_user",
            email="special_user@example.com",
            password="special_password"
        )

        # Crear un proyecto asociado al usuario
        self.project = Project.objects.create(
            user=self.user,
            title="Test Project",
            description="A project for testing."
        )

        # Crear un hito asociado al proyecto
        self.milestone = Milestone.objects.create(
            project=self.project,
            title="Test Milestone",
            description="A milestone for testing.",
            start_date=datetime.now(),
            end_date=datetime.now() + timedelta(days=10),
            status="por-iniciar"
        )

        # Crear una tarea asociada al hito
        self.task = Task.objects.create(
            milestone=self.milestone,
            title="Test Task",
            description="A task for testing.",
            start_date=datetime.now(),
            finish_date=datetime.now() + timedelta(days=5),
            priority="media",
            status="Pending",
            price=150.00
        )

        # Crear una factura asociada al proyecto
        self.bill = Bill.objects.create(
            name="Test Bill",
            project=self.project,
            milestone=self.milestone,
            task=self.task,
            task_price=150.00
        )

        # Añadir el usuario a la factura
        self.bill.users.add(self.user)

    def test_bill_creation(self):
        """Verifica que la factura se asocia correctamente."""
        self.assertEqual(self.bill.project, self.project)
        self.assertEqual(self.bill.milestone, self.milestone)
        self.assertEqual(self.bill.task, self.task)
        self.assertTrue(self.bill.users.filter(username="special_user").exists())

    def test_task_status_property(self):
        """Prueba la propiedad 'task_status'."""
        self.assertEqual(self.bill.task_status, self.task.status)
        self.task.status = "Completed"
        self.task.save()
        self.assertEqual(self.bill.task_status, "Completed")

    def test_bill_str_method(self):
        """Prueba el método __str__ del modelo."""
        self.assertEqual(str(self.bill), self.bill.name)

    def test_bill_status_changed_at(self):
        """Verifica que la fecha de cambio de estado se actualiza."""
        initial_status_changed_at = self.bill.status_changed_at
        self.bill.task_price = 200.50
        self.bill.save()
        self.assertNotEqual(self.bill.status_changed_at, initial_status_changed_at)
