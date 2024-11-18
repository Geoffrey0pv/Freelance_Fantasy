from django.test import TestCase

# Create your tests here.

from django.core.exceptions import ValidationError
from projects.models import Project, Milestone, Task, Tag, Comment, Offer, State, StateTask
from users.models import User
from datetime import date

class ProjectModelTest(TestCase):

    def setUp(self):
        # Crear un usuario de prueba
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='password123'
        )

        # Crear un tag de prueba
        self.tag = Tag.objects.create(name='Django')

        # Crear un proyecto de prueba
        self.project = Project.objects.create(
            title='Test Project',
            description='A sample project',
            requirements='Python, Django',
            location='Remote',
            user=self.user,
            budget=1000.00
        )
        self.project.tags.add(self.tag)

    def test_project_creation(self):
        self.assertEqual(self.project.title, 'Test Project')
        self.assertEqual(self.project.user, self.user)
        self.assertIn(self.tag, self.project.tags.all())
        self.assertEqual(self.project.budget, 1000.00)
        self.assertTrue(self.project.active)

    def test_project_actual_cost(self):
        milestone = Milestone.objects.create(
            project=self.project,
            title='Milestone 1',
            description='First milestone',
            start_date=date(2024, 1, 1),
            end_date=date(2024, 2, 1)
        )
        Task.objects.create(
            milestone=milestone,
            title='Task 1',
            description='First task',
            start_date=date(2024, 1, 1),
            finish_date=date(2024, 1, 10),
            price=500.00,
            status='finalizado'
        )
        self.assertEqual(self.project.actual_cost, 500.00)

class MilestoneModelTest(TestCase):

    def setUp(self):
        # Crear un usuario y un proyecto de prueba
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='password123'
        )
        self.project = Project.objects.create(
            title='Test Project',
            description='A sample project',
            user=self.user
        )

    def test_milestone_creation(self):
        milestone = Milestone.objects.create(
            project=self.project,
            title='Milestone 1',
            description='First milestone',
            start_date=date(2024, 1, 1),
            end_date=date(2024, 2, 1)
        )
        self.assertEqual(milestone.title, 'Milestone 1')
        self.assertEqual(milestone.project, self.project)

    def test_milestone_is_completed(self):
        milestone = Milestone.objects.create(
            project=self.project,
            title='Milestone 1',
            description='First milestone',
            start_date=date(2024, 1, 1),
            end_date=date(2024, 2, 1)
        )
        Task.objects.create(
            milestone=milestone,
            title='Task 1',
            description='First task',
            start_date=date(2024, 1, 1),
            finish_date=date(2024, 1, 10),
            price=500.00,
            status='finalizado'
        )
        self.assertTrue(milestone.is_completed())

class TaskModelTest(TestCase):

    def setUp(self):
        # Crear un usuario, proyecto y milestone de prueba
        self.user = User.objects.create_user(
            username='testuser',
            email='testuser@example.com',
            password='password123'
        )
        self.project = Project.objects.create(
            title='Test Project',
            description='A sample project',
            user=self.user
        )
        self.milestone = Milestone.objects.create(
            project=self.project,
            title='Milestone 1',
            description='First milestone',
            start_date=date(2024, 1, 1),
            end_date=date(2024, 2, 1)
        )

    def test_task_creation(self):
        task = Task.objects.create(
            milestone=self.milestone,
            title='Task 1',
            description='First task',
            start_date=date(2024, 1, 1),
            finish_date=date(2024, 1, 10),
            price=500.00,
            status='por-empezar'
        )
        self.assertEqual(task.title, 'Task 1')
        self.assertEqual(task.milestone, self.milestone)
        self.assertEqual(task.price, 500.00)
        self.assertEqual(task.status, 'por-empezar')

   

