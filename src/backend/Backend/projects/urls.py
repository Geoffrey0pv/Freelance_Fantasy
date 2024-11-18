# urls.py
from django.urls import path
from .views import (
    ProjectDetailView,
    CreateOfferView,
    ProjectListView,
    CreateProjectView,
    AcceptOfferView,
    ProjectListByWorkerView,
    ProjectListByOwnerView,
    PublicProjectListView,
    OwnedProjectsView,
    WorkedProjectsView,
    MilestoneListView,
    TaskListView,
    CreateTaskView,
    TaskUpdateView,
    ProjectCostView,
    project_comments,
    milestone_comments,
    task_comments, MilestoneCreateView


)

urlpatterns = [
    path('project/<int:id>/', ProjectDetailView.as_view(), name='project-detail'),
    path('project/<int:project_id>/offer/', CreateOfferView.as_view(), name='create-offer'),
    path('projects/', ProjectListView.as_view(), name='project-list'),
    path('projects/create/', CreateProjectView.as_view(), name='create-project'),
    path('project/<int:project_id>/offers/<int:offer_id>/accept/', AcceptOfferView.as_view(), name='accept-offer'),
    path('projects/worker/<int:worker_id>/', ProjectListByWorkerView.as_view(), name='project-list-by-worker'),
    path('projects/owner/<int:owner_id>/', ProjectListByOwnerView.as_view(), name='project-list-by-owner'),
    path('projects/public/', PublicProjectListView.as_view(), name='public-project-list'),  # Nueva ruta pública
    path('projects/owned/', OwnedProjectsView.as_view(), name='owned-projects'),
    path('projects/worked/', WorkedProjectsView.as_view(), name='worked-projects'),
    path('project/<int:project_id>/milestones/', MilestoneListView.as_view(), name='milestone-list'),
    path('project/<int:project_id>/tasks/', TaskListView.as_view(), name='project-tasks'),
    path('milestone/<int:milestone_id>/tasks/', CreateTaskView.as_view(), name='create-task'),
    path('project/tasks/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),
    path('project/<int:project_id>/cost/', ProjectCostView.as_view(), name='project-cost'),
    path('project/<int:project_id>/comments/', project_comments, name='project_comments'),
    path('milestone/<int:milestone_id>/comments/', milestone_comments, name='milestone_comments'),
    path('task/<int:task_id>/comments/', task_comments, name='task_comments'),
path('project/<int:project_id>/milestones/create/', MilestoneCreateView.as_view(), name='milestone-create'),



]

