from django.shortcuts import render

from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import FeeRecord, Payment
from .serializers import FeeRecordSerializer, PaymentSerializer


class FeeRecordViewSet(viewsets.ModelViewSet):
    queryset = FeeRecord.objects.all()
    serializer_class = FeeRecordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = FeeRecord.objects.all()
        user = self.request.user
        
        # Students see only their fee records
        if user.role == 'student':
            queryset = queryset.filter(student__user=user)
        
        return queryset

    @action(detail=True, methods=['post'])
    def pay(self, request, pk=None):
        """Record a payment for this fee record"""
        fee_record = self.get_object()
        serializer = PaymentSerializer(data=request.data)
        
        if serializer.is_valid():
            serializer.save(fee_record=fee_record)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PaymentViewSet(viewsets.ModelViewSet):
    queryset = Payment.objects.all()
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Payment.objects.all()
        user = self.request.user
        
        # Students see only their payments
        if user.role == 'student':
            queryset = queryset.filter(fee_record__student__user=user)
        
        return queryset

