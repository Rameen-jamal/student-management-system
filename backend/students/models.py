# backend/students/models.py
from django.db import models
from django.conf import settings

class StudentProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='student_profile')
    enrollment_number = models.CharField(max_length=20, unique=True)
    first_name = models.CharField(max_length=50, default='Unknown')
    last_name = models.CharField(max_length=50, default='Unknown')
    department = models.CharField(max_length=50)
    dob = models.DateField(null=True, blank=True)
    contact_number = models.CharField(max_length=15, blank=True)
    address = models.TextField(blank=True)
    year = models.IntegerField(default=1)
    semester = models.IntegerField(default=1)
    cgpa = models.FloatField(null=True, blank=True)
    courses_enrolled = models.ManyToManyField(
        'core.Course', through='Enrollment', related_name='students_enrolled'
    )

    def __str__(self):
        return f"{self.user.username} - {self.enrollment_number}"


class Enrollment(models.Model):
    student = models.ForeignKey(
        StudentProfile, on_delete=models.CASCADE, related_name='enrollments'
    )
    course = models.ForeignKey(
        'core.Course', on_delete=models.CASCADE, related_name='enrollments'
    )
    date_enrolled = models.DateField(auto_now_add=True)
    status = models.CharField(max_length=20, default='active')  # optional

    class Meta:
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student.user.username} -> {self.course.name}"
