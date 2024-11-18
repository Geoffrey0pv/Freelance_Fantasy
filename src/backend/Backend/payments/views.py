from django.shortcuts import render
from rest_framework import viewsets
from django.http import JsonResponse
from .models import Bill
from .serializers import BillsSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated, AllowAny    


class BillsViewSet(viewsets.ModelViewSet):
    queryset = Bill.objects.all()
    serializer_class = BillsSerializer
    permission_classes = [AllowAny]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['project']
