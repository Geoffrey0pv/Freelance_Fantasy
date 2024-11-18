

from django.db import models
from users.models import User
from django.core.exceptions import ValidationError
from django.db.models import Sum
from django.utils import timezone


# Tag Model
class Tag(models.Model):
    name = models.CharField(max_length=50, unique=True)  # Un tag con nombre único

    def __str__(self):
        return self.name

# Project Model
class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    requirements = models.TextField(default="")
    date_publication = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255)
    active = models.BooleanField(default=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    worker = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True, related_name='assigned_projects')
    photo = models.ImageField(upload_to='projects/images/', blank=True, null=True)
    tags = models.ManyToManyField('Tag', related_name='projects', blank=True)
    budget = models.DecimalField(max_digits=10, decimal_places=2, null=True)  # Presupuesto total
    @property
    def actual_cost(self):
        return self.milestones.aggregate(total_cost=Sum('tasks__price'))['total_cost'] or 0.0  # Costo actual
    def __str__(self):
        return self.title

# Milestone Model
class Milestone(models.Model):
    STATUS_CHOICES = [
        ('por-iniciar', 'Por Iniciar'),
        ('en-proceso', 'En Proceso'),
        ('terminado', 'Terminado'),
    ]
    project = models.ForeignKey('Project', on_delete=models.CASCADE, related_name='milestones')
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='por-iniciar')

    def is_completed(self):
        return all(task.status == 'finalizado' for task in self.tasks.all())

    def update_status_based_on_tasks(self):
        if all(task.status == 'finalizado' for task in self.tasks.all()):
            self.status = 'terminado'
        elif any(task.status == 'en-proceso' for task in self.tasks.all()):
            self.status = 'en-proceso'
        else:
            self.status = 'por-iniciar'
        self.save()

    @property
    def cost(self):
        return self.tasks.aggregate(total_cost=Sum('price'))['total_cost'] or 0.0  # Sumatoria del precio de las tareas

    def __str__(self):
        return self.title

# Task Model
class Task(models.Model):
    PRIORITY_CHOICES = [
        ('baja', 'Baja'),
        ('media', 'Media'),
        ('alta', 'Alta'),
    ]

    STATUS_CHOICES = [
        ('por-empezar', 'Por Empezar'),
        ('todo', 'TODO'),
        ('en-proceso', 'En Proceso'),
        ('finalizado', 'Finalizado'),
        ('cancelado', 'Cancelado'),
    ]

    milestone = models.ForeignKey('Milestone', on_delete=models.CASCADE, related_name='tasks')
    title = models.CharField(max_length=255)
    description = models.TextField()
    start_date = models.DateField()
    finish_date = models.DateField()
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES, default='media')
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='por-empezar')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.0)  # Nuevo campo de precio

    def clean(self):
        if self.start_date > self.finish_date:
            raise ValidationError("La fecha de inicio no puede ser posterior a la fecha de finalización.")

    def __str__(self):
        return self.title

# State Model (For milestones)
class State(models.Model):
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name='states')
    state = models.CharField(max_length=50)

    def __str__(self):
        return self.state

# StateTask Model
class StateTask(models.Model):
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='states')
    state = models.CharField(max_length=50)

    def __str__(self):
        return self.state

# Nuevo modelo de Comment
class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    text = models.TextField()
    date = models.DateTimeField(default=timezone.now)
    project = models.ForeignKey('Project', null=True, blank=True, on_delete=models.CASCADE, related_name='comments')
    milestone = models.ForeignKey('Milestone', null=True, blank=True, on_delete=models.CASCADE, related_name='comments')
    task = models.ForeignKey('Task', null=True, blank=True, on_delete=models.CASCADE, related_name='comments')

    def __str__(self):
        return f'Comment by {self.user} on {self.date}'

# Offer Model
class Offer(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='offers')
    user = models.ForeignKey(User, on_delete=models.CASCADE, default="")  # Agregada la relacion con el user
    description = models.TextField()
    budget_offer = models.DecimalField(max_digits=10, decimal_places=2)
    date_submission = models.DateTimeField(auto_now_add=True)
    is_reviewed = models.BooleanField(default=False) 
    status = models.BooleanField(null=True)  

    def __str__(self):
        return f"Offer by {self.user.username} for {self.project.title}"
# StateOffer Model
class StateOffer(models.Model):
    offer = models.ForeignKey(Offer, on_delete=models.CASCADE, related_name='state')
    state = models.CharField(max_length=50)

    def __str__(self):
        return self.state

