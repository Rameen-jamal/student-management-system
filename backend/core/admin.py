# core/admin.py
from django.contrib import admin
from .models import Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask
from students.models import Enrollment  # <-- import from students

admin.site.register(Course)
admin.site.register(Assignment)
admin.site.register(Submission)
admin.site.register(Attendance)
admin.site.register(Enrollment)
admin.site.register(Quiz)
admin.site.register(QuizGrade)
admin.site.register(TATask)
