from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from students.views import StudentProfileViewSet
from faculty.views import FacultyProfileViewSet
from ta.views import TAProfileViewSet
from core.views import (
    CourseViewSet, AssignmentViewSet, SubmissionViewSet,
    AttendanceViewSet, QuizViewSet, QuizGradeViewSet, TATaskViewSet
)
from administration.views import FeeRecordViewSet, PaymentViewSet
from accounts.views import UserRegistrationView, current_user, update_profile, change_password
from accounts.views import login_view
from django.conf import settings
from django.conf.urls.static import static
router = routers.DefaultRouter()
router.register(r'students', StudentProfileViewSet)
# router.register(r'faculty', FacultyProfileViewSet)
router.register(r'tas', TAProfileViewSet)
router.register(r'courses', CourseViewSet)
router.register(r'assignments', AssignmentViewSet)
router.register(r'submissions', SubmissionViewSet)
router.register(r'attendance', AttendanceViewSet)
router.register(r'quizzes', QuizViewSet)
router.register(r'quiz-grades', QuizGradeViewSet)
router.register(r'ta-tasks', TATaskViewSet)
router.register(r'fee-records', FeeRecordViewSet)
router.register(r'payments', PaymentViewSet)
router.register(r'faculty', FacultyProfileViewSet, basename='faculty')


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    # User management endpoints
    path('api/register/', UserRegistrationView.as_view(), name='register'),
    path('api/users/me/', current_user, name='current_user'),
    path('api/users/me/update/', update_profile, name='update_profile'),
    path('api/users/change-password/', change_password, name='change_password'),
]



urlpatterns += [
    path('api/login/', login_view, name='login'),  # <-- new login endpoint
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


