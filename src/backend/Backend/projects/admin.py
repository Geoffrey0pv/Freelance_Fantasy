from django.contrib import admin
from django.utils.html import format_html
from .models import Project, Offer, Milestone, Task, State, Tag

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'location', 'date_publication', 'photo_preview')
    list_filter = ('location', 'date_publication', 'user', 'tags')
    search_fields = ('title', 'description', 'location', 'user__username', 'tags__name')
    ordering = ('-date_publication',)
    filter_horizontal = ('tags',)

    def photo_preview(self, obj):
        if obj.photo:
            return format_html('<img src="{}" style="width: 100px; height: auto;" />', obj.photo.url)
        return "(No image)"
    photo_preview.short_description = "Image Preview"

@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('name',)
    search_fields = ('name',)

class OfferAdmin(admin.ModelAdmin):
    list_display = ('project', 'budget_offer', 'date_submission')
    search_fields = ('project__title', 'description')
    list_filter = ('date_submission',)
    ordering = ('-date_submission',)

class MilestoneAdmin(admin.ModelAdmin):
    list_display = ('title', 'project', 'start_date', 'end_date')
    search_fields = ('title', 'project__title')
    list_filter = ('start_date', 'end_date')
    ordering = ('-start_date',)

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'milestone', 'start_date', 'finish_date')
    search_fields = ('title', 'milestone__title')
    list_filter = ('start_date', 'finish_date')
    ordering = ('-start_date',)

class StateAdmin(admin.ModelAdmin):
    list_display = ('milestone', 'state')
    search_fields = ('milestone__title', 'state')
    list_filter = ('state',)

# Registrar los modelos restantes
admin.site.register(Project, ProjectAdmin)
admin.site.register(Offer, OfferAdmin)
admin.site.register(Milestone, MilestoneAdmin)
admin.site.register(Task, TaskAdmin)
admin.site.register(State, StateAdmin)
