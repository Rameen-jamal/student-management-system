from django.db import models
from students.models import StudentProfile

class FeeRecord(models.Model):
    student = models.ForeignKey(StudentProfile, on_delete=models.CASCADE, related_name='fee_records')
    semester = models.IntegerField(default=1)  # default added
    year = models.IntegerField(default=1)      # default added
    total_fee = models.DecimalField(max_digits=10, decimal_places=2)
    paid_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    last_payment_date = models.DateField(blank=True, null=True)

    @property
    def due_amount(self):
        return self.total_fee - self.paid_amount

    def __str__(self):
        return f"{self.student} - Semester {self.semester} Year {self.year}"


class Payment(models.Model):
    PAYMENT_METHOD_CHOICES = [
        ('cash', 'Cash'),
        ('bank_transfer', 'Bank Transfer'),
        ('credit_card', 'Credit Card'),
        ('online', 'Online Payment'),
    ]
    
    fee_record = models.ForeignKey(FeeRecord, on_delete=models.CASCADE, related_name='payments')
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_date = models.DateField(auto_now_add=True)
    payment_method = models.CharField(max_length=20, choices=PAYMENT_METHOD_CHOICES)
    transaction_id = models.CharField(max_length=100, blank=True)
    remarks = models.TextField(blank=True)

    def __str__(self):
        return f"Payment of {self.amount} on {self.payment_date}"

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Update fee record
        self.fee_record.paid_amount += self.amount
        self.fee_record.last_payment_date = self.payment_date
        self.fee_record.save()
