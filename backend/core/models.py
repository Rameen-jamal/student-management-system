# # backend/core/models.py
# from django.db import models

# # class Course(models.Model):
# #     name = models.CharField(max_length=100)
# #     code = models.CharField(max_length=10, unique=True)
# #     description = models.TextField(blank=True)
# #     semester = models.IntegerField(default=1)
# #     credit_hours = models.IntegerField(default=3)

# #     # Use string reference to avoid circular imports
# #     faculty = models.ForeignKey(
# #         'faculty.FacultyProfile',
# #         on_delete=models.SET_NULL,
# #         null=True,
# #         blank=True,
# #         related_name='courses'
# #     )

# #     tas = models.ManyToManyField(
# #         'ta.TAProfile',
# #         blank=True,
# #         related_name='assigned_courses'
# #     )

# #     def __str__(self):
# #         return f"{self.code} - {self.name}"
# class Course(models.Model):
#     name = models.CharField(max_length=100)
#     code = models.CharField(max_length=10, unique=True)
#     description = models.TextField(blank=True)
#     semester = models.IntegerField(default=1)
#     credit_hours = models.IntegerField(default=3)
#     faculty = models.ForeignKey(
#         'faculty.FacultyProfile',
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True,
#         related_name='courses'
#     )
#     tas = models.ManyToManyField(
#         'ta.TAProfile',
#         blank=True,
#         related_name='assigned_courses'
#     )

#     # New fields
#     syllabus = models.FileField(upload_to='syllabus/', null=True, blank=True)
#     weekly_topics = models.TextField(blank=True)
#     learning_materials = models.FileField(upload_to='materials/', null=True, blank=True)
#     videos = models.URLField(blank=True, null=True)
#     slides = models.FileField(upload_to='slides/', null=True, blank=True)

#     def __str__(self):
#         return f"{self.code} - {self.name}"

# class CourseAnnouncement(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='announcements')
#     title = models.CharField(max_length=255)
#     content = models.TextField()
#     posted_by = models.ForeignKey('faculty.FacultyProfile', on_delete=models.SET_NULL, null=True)
#     posted_at = models.DateTimeField(auto_now_add=True)

#     def __str__(self):
#         return f"{self.course.code} - {self.title}"


# class Assignment(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField(blank=True)
#     course = models.ForeignKey(
#         'core.Course',
#         on_delete=models.CASCADE,
#         related_name='assignments'
#     )
#     uploaded_at = models.DateTimeField(auto_now_add=True)
#     due_date = models.DateTimeField(null=True, blank=True)
#     max_points = models.FloatField(default=100.0)
#     uploaded_by = models.ForeignKey(
#         'faculty.FacultyProfile',
#         on_delete=models.SET_NULL,
#         null=True,
#         blank=True,
#         related_name='uploaded_assignments'
#     )
#     file = models.FileField(upload_to='assignments/', null=True, blank=True)

#     def __str__(self):
#         return f"{self.title} ({self.course.code})"


# class Submission(models.Model):
#     assignment = models.ForeignKey(
#         'core.Assignment',
#         on_delete=models.CASCADE,
#         related_name='submissions'
#     )
#     student = models.ForeignKey(
#         'students.StudentProfile',
#         on_delete=models.CASCADE,
#         related_name='submissions'
#     )
#     submitted_at = models.DateTimeField(auto_now_add=True)
#     file = models.FileField(upload_to='submissions/', null=True, blank=True)
#     grade = models.FloatField(null=True, blank=True)
#     feedback = models.TextField(blank=True)

#     class Meta:
#         unique_together = ('assignment', 'student')

#     def __str__(self):
#         return f"{self.student.user.username} - {self.assignment.title}"


# # class Attendance(models.Model):
# #     student = models.ForeignKey(
# #         'students.StudentProfile',
# #         on_delete=models.CASCADE,
# #         related_name='attendance_records'
# #     )
# #     course = models.ForeignKey(
# #         'core.Course',
# #         on_delete=models.CASCADE,
# #         related_name='attendance_records'
# #     )
# #     date = models.DateField()
# #     present = models.BooleanField(default=True)

# #     class Meta:
# #         unique_together = ('student', 'course', 'date')

# #     def __str__(self):
# #         status = "Present" if self.present else "Absent"
# #         return f"{self.student.user.username} - {self.course.code} on {self.date}: {status}"
# class Attendance(models.Model):
#     course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='attendances')
#     date = models.DateField(auto_now_add=True)
#     students_present = models.ManyToManyField('students.StudentProfile', blank=True)
#     marked_by = models.ForeignKey('faculty.FacultyProfile', on_delete=models.SET_NULL, null=True)

#     ATTENDANCE_TYPE_CHOICES = [
#         ('manual', 'Manual'),
#         ('auto', 'Automatic'),
#     ]
#     attendance_type = models.CharField(max_length=10, choices=ATTENDANCE_TYPE_CHOICES, default='manual')

#     def __str__(self):
#         return f"{self.course.name} - {self.date}"


# class Quiz(models.Model):
#     title = models.CharField(max_length=100)
#     description = models.TextField(blank=True)
#     course = models.ForeignKey(
#         'core.Course',
#         on_delete=models.CASCADE,
#         related_name='quizzes'
#     )
#     date = models.DateTimeField()
#     max_marks = models.FloatField(default=10.0)
#     duration_minutes = models.IntegerField(default=30)

#     def __str__(self):
#         return f"{self.title} - {self.course.code}"


# class QuizGrade(models.Model):
#     quiz = models.ForeignKey(
#         'core.Quiz',
#         on_delete=models.CASCADE,
#         related_name='grades'
#     )
#     student = models.ForeignKey(
#         'students.StudentProfile',
#         on_delete=models.CASCADE,
#         related_name='quiz_grades'
#     )
#     marks_obtained = models.FloatField(default=0.0)
#     remarks = models.TextField(blank=True)

#     class Meta:
#         unique_together = ('quiz', 'student')

#     def __str__(self):
#         return f"{self.student.user.username} - {self.quiz.title}: {self.marks_obtained}"


# class TATask(models.Model):
#     STATUS_CHOICES = [
#         ('pending', 'Pending'),
#         ('in_progress', 'In Progress'),
#         ('completed', 'Completed'),
#     ]
    
#     ta = models.ForeignKey(
#         'ta.TAProfile',
#         on_delete=models.CASCADE,
#         related_name='tasks'
#     )
#     course = models.ForeignKey(
#         'core.Course',
#         on_delete=models.CASCADE,
#         related_name='ta_tasks'
#     )
#     assigned_by = models.ForeignKey(
#         'faculty.FacultyProfile',
#         on_delete=models.SET_NULL,
#         null=True,
#         related_name='assigned_tasks'
#     )
#     title = models.CharField(max_length=200)
#     description = models.TextField()
#     assigned_date = models.DateTimeField(auto_now_add=True)
#     due_date = models.DateTimeField(null=True, blank=True)
#     status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
#     completion_notes = models.TextField(blank=True)

#     def __str__(self):
#         return f"{self.title} - {self.ta.user.username}"
from django.db import models

# --- Course ---
class Course(models.Model):
    name = models.CharField(max_length=100)
    code = models.CharField(max_length=10, unique=True)
    description = models.TextField(blank=True)
    semester = models.IntegerField(default=1)
    credit_hours = models.IntegerField(default=3)
    faculty = models.ManyToManyField(
        'faculty.FacultyProfile',
        blank=True,
        related_name='courses'
    )
    tas = models.ManyToManyField(
        'ta.TAProfile',
        blank=True,
        related_name='assigned_courses'
    )

    # New fields
    syllabus = models.FileField(upload_to='syllabus/', null=True, blank=True)
    weekly_topics = models.TextField(blank=True)
    learning_materials = models.FileField(upload_to='materials/', null=True, blank=True)
    videos = models.URLField(blank=True, null=True)
    slides = models.FileField(upload_to='slides/', null=True, blank=True)
    students = models.ManyToManyField(
        'students.StudentProfile',
        blank=True,
        related_name='enrolled_courses'
    )

    def __str__(self):
        return f"{self.code} - {self.name}"


class CourseAnnouncement(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='announcements')
    title = models.CharField(max_length=255)
    content = models.TextField()
    posted_by = models.ForeignKey('faculty.FacultyProfile', on_delete=models.SET_NULL, null=True)
    posted_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.course.code} - {self.title}"


# --- Assignment & Submission ---
class Assignment(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    course = models.ForeignKey(
        'core.Course',
        on_delete=models.CASCADE,
        related_name='assignments'
    )
    uploaded_at = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)
    max_points = models.FloatField(default=100.0)
    uploaded_by = models.ForeignKey(
        'faculty.FacultyProfile',
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='uploaded_assignments'
    )
    file = models.FileField(upload_to='assignments/', null=True, blank=True)

    def __str__(self):
        return f"{self.title} ({self.course.code})"


class Submission(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected')
    ]

    assignment = models.ForeignKey(
        'core.Assignment',
        on_delete=models.CASCADE,
        related_name='submissions'
    )
    student = models.ForeignKey(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='submissions'
    )
    submitted_at = models.DateTimeField(auto_now_add=True)
    file = models.FileField(upload_to='submissions/', null=True, blank=True)
    grade = models.FloatField(null=True, blank=True)
    feedback = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    class Meta:
        unique_together = ('assignment', 'student')

    def __str__(self):
        return f"{self.student.user.username} - {self.assignment.title}"


# --- Attendance ---
class Attendance(models.Model):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='attendances')
    date = models.DateField(auto_now_add=True)
    students_present = models.ManyToManyField('students.StudentProfile', blank=True)
    marked_by = models.ForeignKey('faculty.FacultyProfile', on_delete=models.SET_NULL, null=True)

    ATTENDANCE_TYPE_CHOICES = [
        ('manual', 'Manual'),
        ('auto', 'Automatic'),
    ]
    attendance_type = models.CharField(max_length=10, choices=ATTENDANCE_TYPE_CHOICES, default='manual')

    def __str__(self):
        return f"{self.course.name} - {self.date}"


# --- Quiz & Grades ---
class Quiz(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    course = models.ForeignKey(
        'core.Course',
        on_delete=models.CASCADE,
        related_name='quizzes'
    )
    date = models.DateTimeField()
    max_marks = models.FloatField(default=10.0)
    duration_minutes = models.IntegerField(default=30)

    def __str__(self):
        return f"{self.title} - {self.course.code}"


class QuizGrade(models.Model):
    quiz = models.ForeignKey(
        'core.Quiz',
        on_delete=models.CASCADE,
        related_name='grades'
    )
    student = models.ForeignKey(
        'students.StudentProfile',
        on_delete=models.CASCADE,
        related_name='quiz_grades'
    )
    marks_obtained = models.FloatField(default=0.0)
    remarks = models.TextField(blank=True)

    class Meta:
        unique_together = ('quiz', 'student')

    def __str__(self):
        return f"{self.student.user.username} - {self.quiz.title}: {self.marks_obtained}"


# --- TA Task ---
class TATask(models.Model):
    STATUS_CHOICES = [
        ('pending', 'Pending'),
        ('in_progress', 'In Progress'),
        ('completed', 'Completed'),
    ]
    
    ta = models.ForeignKey(
        'ta.TAProfile',
        on_delete=models.CASCADE,
        related_name='tasks'
    )
    course = models.ForeignKey(
        'core.Course',
        on_delete=models.CASCADE,
        related_name='ta_tasks'
    )
    assigned_by = models.ForeignKey(
        'faculty.FacultyProfile',
        on_delete=models.SET_NULL,
        null=True,
        related_name='assigned_tasks'
    )
    title = models.CharField(max_length=200)
    description = models.TextField()
    assigned_date = models.DateTimeField(auto_now_add=True)
    due_date = models.DateTimeField(null=True, blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    completion_notes = models.TextField(blank=True)

    def __str__(self):
        return f"{self.title} - {self.ta.user.username}"


# --- Faculty to Student Messages ---
class StudentMessage(models.Model):
    sender = models.ForeignKey('faculty.FacultyProfile', on_delete=models.CASCADE)
    recipient = models.ForeignKey('students.StudentProfile', on_delete=models.CASCADE)
    course = models.ForeignKey(Course, on_delete=models.CASCADE, null=True, blank=True)
    subject = models.CharField(max_length=255)
    message = models.TextField()
    sent_at = models.DateTimeField(auto_now_add=True)
    read = models.BooleanField(default=False)

    def __str__(self):
        return f"Message from {self.sender.user.username} to {self.recipient.user.username}"
