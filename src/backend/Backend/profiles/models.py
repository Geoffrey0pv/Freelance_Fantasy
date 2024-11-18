from django.db import models
from users.models import User  # Importamos el modelo de User

class Skill(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='skills')
    skill = models.CharField(max_length=255)

    def __str__(self):
        return self.skill

class Certification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certifications')
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='certifications/')

    def __str__(self):
        return self.name

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    review = models.TextField()
    rating = models.IntegerField()

    def __str__(self):
        return f"Review by {self.user.username} - Rating: {self.rating}"

class Education(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='educations')
    certification_name = models.CharField(max_length=255)
    certifying_institute_name = models.CharField(max_length=255)
    start_date = models.DateField(null=True, blank=True)  # Permitir valores nulos
    end_date = models.DateField(null=True, blank=True)
    country = models.CharField(max_length=100)

    def __str__(self):
        return self.certification_name

class Experience(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='experiences')
    job_title = models.CharField(max_length=255)
    description = models.TextField()
    enterprise_name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    start_date = models.DateField(null=True, blank=True)  # Permitir valores nulos
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.job_title

class Link(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='links')
    linkedin_url = models.URLField(blank=True, null=True)
    github_url = models.URLField(blank=True, null=True)
    portfolio_url = models.URLField(blank=True, null=True)

    def __str__(self):
        return f"Links for {self.user.username}"

class Image(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='images')
    profile_image = models.ImageField(upload_to='users/profile_images/', null=True, blank=True)
    cover_image = models.ImageField(upload_to='users/cover_images/', null=True, blank=True)

    def __str__(self):
        return f"Images for {self.user.username}"

# Nuevo modelo para proyectos de portafolio
class PortfolioProject(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='portfolio_projects')
    title = models.CharField(max_length=255)
    description = models.TextField()
    project_url = models.URLField(blank=True, null=True)
    image = models.ImageField(upload_to='portfolio/projects/', null=True, blank=True)

    def __str__(self):
        return self.title
