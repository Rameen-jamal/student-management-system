from rest_framework import serializers
from .models import StudentProfile, Enrollment
from accounts.models import User
from core.models import Course

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']

class EnrollmentSerializer(serializers.ModelSerializer):
    course_name = serializers.CharField(source='course.name', read_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'course', 'course_name', 'date_enrolled', 'status']

class StudentProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    courses_enrolled = EnrollmentSerializer(source='enrollments', many=True, read_only=True)

    class Meta:
        model = StudentProfile
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        # Create user with hashed password and set role
        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data.get('email', ''),
            password=user_data.get('password', 'defaultpassword'),
            role='student'
        )
        student = StudentProfile.objects.create(user=user, **validated_data)
        return student

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        if user_data:
            for attr, value in user_data.items():
                setattr(instance.user, attr, value)
            instance.user.save()
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
