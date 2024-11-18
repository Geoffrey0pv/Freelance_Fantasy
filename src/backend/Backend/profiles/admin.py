from django.contrib import admin
from .models import Skill, Certification, Review, Education, Experience, Link, Image, PortfolioProject

@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('user', 'skill')
    search_fields = ('user__username', 'skill')
    list_filter = ('user',)

@admin.register(Certification)
class CertificationAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'file')
    search_fields = ('user__username', 'name')
    list_filter = ('user',)

@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('user', 'review', 'rating')
    search_fields = ('user__username', 'review')
    list_filter = ('user', 'rating')

@admin.register(Education)
class EducationAdmin(admin.ModelAdmin):
    list_display = ('user', 'certification_name', 'certifying_institute_name', 'start_date', 'end_date', 'country')
    search_fields = ('user__username', 'certification_name', 'certifying_institute_name', 'country')
    list_filter = ('user', 'start_date', 'end_date', 'country')

@admin.register(Experience)
class ExperienceAdmin(admin.ModelAdmin):
    list_display = ('user', 'job_title', 'enterprise_name', 'location', 'start_date', 'end_date')
    search_fields = ('user__username', 'job_title', 'enterprise_name', 'location')
    list_filter = ('user', 'start_date', 'end_date', 'location')

@admin.register(Link)
class LinkAdmin(admin.ModelAdmin):
    list_display = ('user', 'linkedin_url', 'github_url', 'portfolio_url')
    search_fields = ('user__username', 'linkedin_url', 'github_url', 'portfolio_url')
    list_filter = ('user',)

@admin.register(Image)
class ImageAdmin(admin.ModelAdmin):
    list_display = ('user', 'profile_image', 'cover_image')
    search_fields = ('user__username',)
    list_filter = ('user',)

@admin.register(PortfolioProject)
class PortfolioProjectAdmin(admin.ModelAdmin):
    list_display = ('user', 'title', 'description', 'project_url', 'image')
    search_fields = ('user__username', 'title', 'description')
    list_filter = ('user',)

