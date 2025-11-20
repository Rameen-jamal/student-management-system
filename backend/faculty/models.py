# backend/faculty/models.py
from django.db import models
from accounts.models import User

class FacultyProfile(models.Model):
    DESIGNATION_CHOICES = [
        ('professor', 'Professor'),
        ('associate_professor', 'Associate Professor'),
        ('assistant_professor', 'Assistant Professor'),
        ('lecturer', 'Lecturer'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, default='Unknown')
    last_name = models.CharField(max_length=100, default='Unknown')
    designation = models.CharField(max_length=50, choices=DESIGNATION_CHOICES, default='lecturer')
    department = models.CharField(max_length=50, default='Unknown')
    contact_number = models.CharField(max_length=15, blank=True)
    office = models.CharField(max_length=50, blank=True)

    # Use a string reference to the Course model to avoid circular imports
    courses_teaching = models.ManyToManyField(
        'core.Course',  # string reference instead of direct import
        blank=True,
        related_name='faculty_members'
    )

    def __str__(self):
        return f"{self.first_name} {self.last_name} - {self.department}"
