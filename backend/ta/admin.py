from django.contrib import admin
from django.conf import settings
from django.core.exceptions import ValidationError
from .models import TAProfile

class TAProfileAdmin(admin.ModelAdmin):
    list_display = ['user', 'first_name', 'last_name', 'department', 'get_courses_count']
    filter_horizontal = ['courses_assigned']
    
    def get_courses_count(self, obj):
        return obj.courses_assigned.count()
    get_courses_count.short_description = 'Courses Assigned'
    
    def save_model(self, request, obj, form, change):
        """Validate course limit before saving"""
        super().save_model(request, obj, form, change)
    
    def save_related(self, request, form, formsets, change):
        """Validate when courses are added via M2M widget"""
        super().save_related(request, form, formsets, change)
        
        # Check if TA has exceeded course limit
        obj = form.instance
        max_courses = getattr(settings, 'MAX_COURSES_PER_TA', 2)
        current_count = obj.courses_assigned.count()
        
        if current_count > max_courses:
            # Remove the excess courses that were just added
            courses = list(obj.courses_assigned.all())
            # Keep only the first 'max_courses' courses
            for course in courses[max_courses:]:
                obj.courses_assigned.remove(course)
            
            from django.contrib import messages
            messages.error(
                request, 
                f'TA can only be assigned to maximum {max_courses} courses. Excess courses were not saved.'
            )

admin.site.register(TAProfile, TAProfileAdmin)
