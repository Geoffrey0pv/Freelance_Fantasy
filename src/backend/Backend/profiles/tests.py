from django.test import TestCase
from profiles.models import Skill, Certification, Review, Education, Experience, Link, Image, PortfolioProject
from users.models import User
from datetime import datetime, timedelta

class ProfilesModelTestCase(TestCase):
    def setUp(self):
        # Crear un usuario de prueba
        self.user = User.objects.create_user(
            username="testuser",
            email="testuser@example.com",
            password="password123"
        )

        # Crear instancias de los modelos
        self.skill = Skill.objects.create(user=self.user, skill="Python")
        self.certification = Certification.objects.create(user=self.user, name="Django Certification")
        self.review = Review.objects.create(user=self.user, review="Great work!", rating=5)
        self.education = Education.objects.create(
            user=self.user,
            certification_name="Computer Science",
            certifying_institute_name="Tech University",
            start_date=datetime.now() - timedelta(days=365 * 4),
            end_date=datetime.now(),
            country="USA"
        )
        self.experience = Experience.objects.create(
            user=self.user,
            job_title="Software Engineer",
            description="Developed various web applications.",
            enterprise_name="TechCorp",
            location="New York",
            start_date=datetime.now() - timedelta(days=365 * 2),
            end_date=datetime.now()
        )
        self.link = Link.objects.create(
            user=self.user,
            linkedin_url="https://www.linkedin.com/in/testuser",
            github_url="https://github.com/testuser",
            portfolio_url="https://testuserportfolio.com"
        )
        self.image = Image.objects.create(
            user=self.user,
            profile_image="users/profile_images/testuser.jpg",
            cover_image="users/cover_images/testuser_cover.jpg"
        )
        self.portfolio_project = PortfolioProject.objects.create(
            user=self.user,
            title="Portfolio Project 1",
            description="A sample project.",
            project_url="https://github.com/testuser/project",
            image="portfolio/projects/testuser_project.jpg"
        )

    def test_skill_creation(self):
        """Verifica que las habilidades se crean correctamente."""
        self.assertEqual(self.skill.user, self.user)
        self.assertEqual(str(self.skill), "Python")

    def test_certification_creation(self):
        """Verifica que las certificaciones se crean correctamente."""
        self.assertEqual(self.certification.user, self.user)
        self.assertEqual(str(self.certification), "Django Certification")

    def test_review_creation(self):
        """Verifica que las reviews se crean correctamente."""
        self.assertEqual(self.review.user, self.user)
        self.assertEqual(str(self.review), f"Review by {self.user.username} - Rating: 5")

    def test_education_creation(self):
        """Verifica que las educaciones se crean correctamente."""
        self.assertEqual(self.education.user, self.user)
        self.assertEqual(str(self.education), "Computer Science")

    def test_experience_creation(self):
        """Verifica que las experiencias se crean correctamente."""
        self.assertEqual(self.experience.user, self.user)
        self.assertEqual(str(self.experience), "Software Engineer")

    def test_link_creation(self):
        """Verifica que los enlaces se crean correctamente."""
        self.assertEqual(self.link.user, self.user)
        self.assertEqual(str(self.link), f"Links for {self.user.username}")

    def test_image_creation(self):
        """Verifica que las imágenes se crean correctamente."""
        self.assertEqual(self.image.user, self.user)
        self.assertEqual(str(self.image), f"Images for {self.user.username}")

    def test_portfolio_project_creation(self):
        """Verifica que los proyectos de portafolio se crean correctamente."""
        self.assertEqual(self.portfolio_project.user, self.user)
        self.assertEqual(str(self.portfolio_project), "Portfolio Project 1")
