from django.contrib import admin

# Register your models here.
# administration/admin.py
from django.contrib import admin
from .models import FeeRecord, Payment

admin.site.register(FeeRecord)
admin.site.register(Payment)
