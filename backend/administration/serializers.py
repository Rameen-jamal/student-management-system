from rest_framework import serializers
from .models import FeeRecord, Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = '__all__'


class FeeRecordSerializer(serializers.ModelSerializer):
    student_name = serializers.SerializerMethodField()
    due_amount = serializers.ReadOnlyField()
    payments = PaymentSerializer(many=True, read_only=True)

    class Meta:
        model = FeeRecord
        fields = '__all__'

    def get_student_name(self, obj):
        return f"{obj.student.first_name} {obj.student.last_name}"
