from rest_framework import serializers
from accounts.serializers import UserSerializer
from accounts.models import User
from .models import FacultyProfile

class FacultyProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    # Use read_only for displaying courses
    courses_teaching = serializers.PrimaryKeyRelatedField(many=True, read_only=True)

    class Meta:
        model = FacultyProfile
        fields = '__all__'

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        courses = validated_data.pop('courses_teaching', [])

        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data.get('email', ''),
            password=user_data.get('password', 'defaultpassword'),
            role='faculty',
            first_name=user_data.get('first_name', ''),
            last_name=user_data.get('last_name', '')
        )

        faculty = FacultyProfile.objects.create(user=user, **validated_data)
        if courses:
            faculty.courses_teaching.set(courses)

        return faculty

    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', None)
        courses = validated_data.pop('courses_teaching', None)

        if user_data:
            for attr, value in user_data.items():
                if attr == "password":
                    instance.user.set_password(value)
                else:
                    setattr(instance.user, attr, value)
            instance.user.save()

        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        if courses is not None:
            instance.courses_teaching.set(courses)

        return instance