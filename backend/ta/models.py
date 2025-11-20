from django.db import models
from accounts.models import User
from core.models import Course

class TAProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=100, default='Unknown')  # default added
    last_name = models.CharField(max_length=100, default='Unknown')   # default added
    department = models.CharField(max_length=50)
    contact_number = models.CharField(max_length=15, blank=True)
    courses_assigned = models.ManyToManyField(Course, blank=True, related_name='assigned_tas')
    ta_tasks = models.TextField(blank=True)  # previously tasks, renamed

    def __str__(self):
        return f"{self.first_name} {self.last_name} - TA"
