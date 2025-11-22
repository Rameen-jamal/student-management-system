from rest_framework import serializers
from accounts.serializers import UserSerializer
from .models import TAProfile
from core.models import Course
from accounts.models import User

class CourseMinimalSerializer(serializers.ModelSerializer):
    """Minimal course info for TA dashboard"""
    faculty_names = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = ['id', 'code', 'name', 'semester', 'credit_hours', 'faculty_names']
    
    def get_faculty_names(self, obj):
        faculty_list = obj.faculty.all()
        if faculty_list.exists():
            return ", ".join([f"{f.first_name} {f.last_name}" for f in faculty_list])
        return "No Faculty Assigned"

class TAProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    courses_assigned = serializers.PrimaryKeyRelatedField(
        queryset=Course.objects.all(), 
        many=True,
        required=False
    )
    courses_detail = CourseMinimalSerializer(source='courses_assigned', many=True, read_only=True)
    full_name = serializers.SerializerMethodField()

    class Meta:
        model = TAProfile
        fields = [
            'id', 'user', 'full_name', 'first_name', 'last_name', 
            'department', 'contact_number', 'ta_tasks',
            'courses_assigned', 'courses_detail'
        ]
    
    def get_full_name(self, obj):
        return f"{obj.first_name} {obj.last_name}"

    def create(self, validated_data):
        user_data = validated_data.pop('user')
        first_name = validated_data.get('first_name', '')
        last_name = validated_data.get('last_name', '')
        
        # Create user with hashed password and set role
        user = User.objects.create_user(
            username=user_data['username'],
            email=user_data.get('email', ''),
            password=user_data.get('password', 'defaultpassword'),
            role='ta',
            first_name=first_name,
            last_name=last_name
        )
        ta = TAProfile.objects.create(user=user, **validated_data)
        return ta

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
