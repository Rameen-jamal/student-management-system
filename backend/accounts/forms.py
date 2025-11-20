# backend/accounts/forms.py
from django import forms
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm.Meta):
        model = User
        fields = ('username', 'email', 'role', 'first_name', 'last_name')

class CustomUserChangeForm(UserChangeForm):
    password = forms.CharField(
        label="Password",
        required=False,
        help_text="Leave blank to keep the current password. Enter a new raw password to change it."
    )

    class Meta:
        model = User
        fields = ('username', 'email', 'role', 'first_name', 'last_name', 'is_active', 'is_staff', 'is_superuser')
