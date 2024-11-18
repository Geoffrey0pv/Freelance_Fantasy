from django.db import models
from users.models import User
from projects.models import Project, Task, Milestone

class Bill(models.Model):
    name = models.CharField(max_length=100, unique=True, verbose_name='NameBill')
    users = models.ManyToManyField(User, related_name='bills_joined', blank=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='bills', verbose_name='LinkedProject')
    milestone = models.ForeignKey(Milestone, on_delete=models.CASCADE, related_name='bills', verbose_name='LinkedMilestone')
    task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name='bills', verbose_name='LinkedTask')
    task_price = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='TaskPrice')
    status_changed_at = models.DateTimeField(auto_now=True, verbose_name='ChangeStatusDate')

    def __str__(self):
        return self.name

    @property
    def task_status(self):
        return self.task.status
