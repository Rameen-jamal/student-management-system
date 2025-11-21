# from rest_framework import serializers
# from .models import Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask
# from students.models import StudentProfile
# from faculty.models import FacultyProfile
# from students.serializers import StudentProfileSerializer

# # Mini serializer to avoid circular imports
# class FacultyMiniSerializer(serializers.ModelSerializer):
#     full_name = serializers.SerializerMethodField()

#     class Meta:
#         model = FacultyProfile
#         fields = ['id', 'full_name']

#     def get_full_name(self, obj):
#         return f"{obj.first_name} {obj.last_name}"

# # Course Serializer
# class CourseSerializer(serializers.ModelSerializer):
#     faculty = FacultyMiniSerializer(read_only=True)

#     class Meta:
#         model = Course
#         fields = ['id', 'name', 'code', 'description', 'credit_hours', 'semester', 'faculty']

# # Assignment Serializer
# class AssignmentSerializer(serializers.ModelSerializer):
#     course_name = serializers.CharField(source='course.name', read_only=True)
#     course_code = serializers.CharField(source='course.code', read_only=True)
#     uploaded_by_name = serializers.SerializerMethodField(read_only=True)

#     class Meta:
#         model = Assignment
#         fields = '__all__'
#         read_only_fields = ['uploaded_at', 'uploaded_by']

#     def get_uploaded_by_name(self, obj):
#         if obj.uploaded_by:
#             return f"{obj.uploaded_by.first_name} {obj.uploaded_by.last_name}"
#         return None

# # Submission Serializer
# class SubmissionSerializer(serializers.ModelSerializer):
#     student_name = serializers.SerializerMethodField()
#     assignment_title = serializers.CharField(source='assignment.title', read_only=True)

#     class Meta:
#         model = Submission
#         fields = '__all__'
#         read_only_fields = ['submitted_at']

#     def get_student_name(self, obj):
#         return f"{obj.student.first_name} {obj.student.last_name}"

# # # Attendance Serializer
# # class AttendanceSerializer(serializers.ModelSerializer):
# #     student_name = serializers.SerializerMethodField()
# #     course_name = serializers.CharField(source='course.name', read_only=True)

# #     class Meta:
# #         model = Attendance
# #         fields = '__all__'

# #     def get_student_name(self, obj):
# #         return f"{obj.student.first_name} {obj.student.last_name}"
# class AttendanceSerializer(serializers.ModelSerializer):
#     students_present_detail = StudentProfileSerializer(source='students_present', many=True, read_only=True)
#     course_name = serializers.CharField(source='course.name', read_only=True)
#     marked_by_name = serializers.SerializerMethodField()

#     class Meta:
#         model = Attendance
#         fields = ['id', 'course', 'course_name', 'date', 'students_present', 'students_present_detail', 'marked_by', 'marked_by_name', 'attendance_type']

#     def get_marked_by_name(self, obj):
#         if obj.marked_by:
#             return f"{obj.marked_by.user.first_name} {obj.marked_by.user.last_name}"
#         return None

# # Quiz Serializer
# class QuizSerializer(serializers.ModelSerializer):
#     course_name = serializers.CharField(source='course.name', read_only=True)

#     class Meta:
#         model = Quiz
#         fields = '__all__'

# # QuizGrade Serializer
# class QuizGradeSerializer(serializers.ModelSerializer):
#     student_name = serializers.SerializerMethodField()
#     quiz_title = serializers.CharField(source='quiz.title', read_only=True)

#     class Meta:
#         model = QuizGrade
#         fields = '__all__'

#     def get_student_name(self, obj):
#         return f"{obj.student.first_name} {obj.student.last_name}"

# # TA Task Serializer
# class TATaskSerializer(serializers.ModelSerializer):
#     ta_name = serializers.SerializerMethodField()
#     course_name = serializers.CharField(source='course.name', read_only=True)
#     assigned_by_name = serializers.SerializerMethodField()

#     class Meta:
#         model = TATask
#         fields = '__all__'

#     def get_ta_name(self, obj):
#         return f"{obj.ta.first_name} {obj.ta.last_name}"

#     def get_assigned_by_name(self, obj):
#         if obj.assigned_by:
#             return f"{obj.assigned_by.first_name} {obj.assigned_by.last_name}"
#         return None
# from rest_framework import serializers
# from .models import Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask, CourseAnnouncement
# from students.models import StudentProfile
# from faculty.models import FacultyProfile
# from students.serializers import StudentProfileSerializer

# # Mini serializer to avoid circular imports
# class FacultyMiniSerializer(serializers.ModelSerializer):
#     full_name = serializers.SerializerMethodField()

#     class Meta:
#         model = FacultyProfile
#         fields = ['id', 'full_name']

#     def get_full_name(self, obj):
#         return f"{obj.first_name} {obj.last_name}"
from rest_framework import serializers
from .models import (
    Course, Assignment, Submission, Attendance, Quiz, QuizGrade, TATask,
    CourseAnnouncement, StudentMessage
)
from students.models import StudentProfile
from faculty.models import FacultyProfile
from students.serializers import StudentProfileSerializer

# Mini serializer to avoid circular imports
class FacultyMiniSerializer(serializers.ModelSerializer):
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = FacultyProfile
        fields = ['id', 'full_name']

    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"


# --- Student Message Serializer ---
class StudentMessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.SerializerMethodField()
    recipient_name = serializers.SerializerMethodField()
    course_name = serializers.CharField(source='course.name', read_only=True)

    class Meta:
        model = StudentMessage
        fields = ['id', 'sender', 'sender_name', 'recipient', 'recipient_name', 'course', 'course_name',
                  'subject', 'message', 'sent_at', 'read']

    def get_sender_name(self, obj):
        if obj.sender:
            return f"{obj.sender.first_name} {obj.sender.last_name}"
        return None

    def get_recipient_name(self, obj):
        if obj.recipient:
            return f"{obj.recipient.first_name} {obj.recipient.last_name}"
        return None


# Course Serializer (FIXED)
class CourseSerializer(serializers.ModelSerializer):
    faculty = FacultyMiniSerializer(read_only=True)
    tas_detail = serializers.SerializerMethodField()
    announcements_detail = serializers.SerializerMethodField()
    attendance_detail = serializers.SerializerMethodField()

    class Meta:
        model = Course
        fields = [
            'id', 'name', 'code', 'description', 'credit_hours', 'semester', 
            'faculty', 'tas', 'tas_detail', 
            'syllabus', 'weekly_topics', 'learning_materials', 'slides', 'videos',
            'announcements_detail', 'attendance_detail'
        ]

    def get_tas_detail(self, obj):
        return [{"id": ta.id, "full_name": f"{ta.first_name} {ta.last_name}"} for ta in obj.tas.all()]

    def get_announcements_detail(self, obj):
        announcements = obj.announcements.all().order_by('-posted_at')
        return [{"id": a.id, "title": a.title, "content": a.content, "posted_at": a.posted_at.strftime("%Y-%m-%d %H:%M")} for a in announcements]

    def get_attendance_detail(self, obj):
        # FIX: Changed attendance_set to attendances based on related_name in models.py
        attendance_qs = obj.attendances.all().order_by('-date') 
        return [
            {
                "id": att.id,
                "date": att.date,
                "attendance_type": att.attendance_type,
                # Safe access: Check if marked_by exists AND if marked_by is linked to a user
                "marked_by": (
                    f"{att.marked_by.user.first_name} {att.marked_by.user.last_name}" 
                    if att.marked_by and getattr(att.marked_by, 'user', None) 
                    else None
                ),
                "students_present_count": att.students_present.count()
            }
            for att in attendance_qs
        ]

# Assignment Serializer
class AssignmentSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)
    course_code = serializers.CharField(source='course.code', read_only=True)
    uploaded_by_name = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Assignment
        fields = '__all__'
        read_only_fields = ['uploaded_at', 'uploaded_by']

    def get_uploaded_by_name(self, obj):
        if obj.uploaded_by:
            return f"{obj.uploaded_by.first_name} {obj.uploaded_by.last_name}"
        return None

# Submission Serializer
class SubmissionSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    assignment_title = serializers.CharField(source='assignment.title', read_only=True)

    class Meta:
        model = Submission
        fields = '__all__'
        read_only_fields = ['submitted_at']

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"

# Attendance Serializer
class AttendanceSerializer(serializers.ModelSerializer):
    students_present_detail = StudentProfileSerializer(source='students_present', many=True, read_only=True)
    course_name = serializers.CharField(source='course.name', read_only=True)
    marked_by_name = serializers.SerializerMethodField()

    class Meta:
        model = Attendance
        fields = [
            'id', 'course', 'course_name', 'date', 
            'students_present', 'students_present_detail', 
            'marked_by', 'marked_by_name', 'attendance_type'
        ]

    def get_marked_by_name(self, obj):
        if obj.marked_by and getattr(obj.marked_by, 'user', None):
            return f"{obj.marked_by.user.first_name} {obj.marked_by.user.last_name}"
        return None

# Quiz Serializer
class QuizSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)

    class Meta:
        model = Quiz
        fields = '__all__'

# QuizGrade Serializer
class QuizGradeSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    quiz_name = serializers.CharField(source='quiz.title', read_only=True)
    course_code = serializers.CharField(source='quiz.course.code', read_only=True)
    score = serializers.FloatField(source='marks_obtained', read_only=True)
    max = serializers.FloatField(source='quiz.max_marks', read_only=True)

    class Meta:
        model = QuizGrade
        fields = '__all__'

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"

# TA Task Serializer
class TATaskSerializer(serializers.ModelSerializer):
    ta_name = serializers.SerializerMethodField()
    course_name = serializers.CharField(source='course.name', read_only=True)
    assigned_by_name = serializers.SerializerMethodField()

    class Meta:
        model = TATask
        fields = '__all__'

    def get_ta_name(self, obj):
        return f"{obj.ta.first_name} {obj.ta.last_name}"

    def get_assigned_by_name(self, obj):
        if obj.assigned_by:
            return f"{obj.assigned_by.first_name} {obj.assigned_by.last_name}"
        return None

# Course Announcement Serializer
class CourseAnnouncementSerializer(serializers.ModelSerializer):
    posted_by_name = serializers.SerializerMethodField()
    course_name = serializers.CharField(source='course.name', read_only=True)

    class Meta:
        model = CourseAnnouncement
        fields = ['id', 'course', 'course_name', 'title', 'content', 'posted_by', 'posted_by_name', 'posted_at']

    def get_posted_by_name(self, obj):
        if obj.posted_by:
            return f"{obj.posted_by.first_name} {obj.posted_by.last_name}"
        return None