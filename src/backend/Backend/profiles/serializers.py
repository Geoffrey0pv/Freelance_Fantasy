from rest_framework import serializers
from .models import Skill, Certification, Review, Education, Experience, Link, Image, PortfolioProject

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'skill', 'user']
        read_only_fields = ['user']  # Marcar user como solo lectura

class CertificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certification
        fields = ['id', 'name', 'file', 'user']
        read_only_fields = ['user']

class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'review', 'rating', 'user']
        read_only_fields = ['user']

class EducationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Education
        fields = [
            'id', 'certification_name', 'certifying_institute_name', 
            'start_date', 'end_date', 'country', 'user'
        ]
        read_only_fields = ['user']

class ExperienceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Experience
        fields = [
            'id', 'job_title', 'description', 'enterprise_name', 'location', 
            'start_date', 'end_date', 'user'
        ]
        read_only_fields = ['user']

class LinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Link
        fields = ['id', 'linkedin_url', 'github_url', 'portfolio_url', 'user']
        read_only_fields = ['user']

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'profile_image', 'cover_image', 'user']
        read_only_fields = ['user']

class PortfolioProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioProject
        fields = ['id', 'title', 'description', 'project_url', 'image', 'user']
        read_only_fields = ['user']
