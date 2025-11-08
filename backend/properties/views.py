from django.shortcuts import render, get_object_or_404
from django.db.models import Q, Exists, OuterRef
from rest_framework import viewsets, generics, filters

from .models import Property, Unit
from .serializers import PropertySerializer, UnitSerializer

class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.select_related("owner__contact").all()
    serializer_class = PropertySerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["name", "city", "state", "address1"]
    ordering_fields = ["name", "city", "state", "created_at"]
    ordering = ["name"]

class UnitViewSet(viewsets.ModelViewSet):
    queryset = Unit.objects.select_related("property").all()
    serializer_class = UnitSerializer
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ["unit_number", "property__name", "property__city", "property__state"]
    ordering_fields = ["unit_number", "market_rent", "bedrooms", "bathrooms"]
    ordering = ["property__name", "unit_number"]

class PropertySearchAPIView(generics.ListAPIView):
    serializer_class = PropertySerializer

    def get_queryset(self):
        q = self.request.query_params.get("q", "").strip()
        qs = Property.objects.all()
        if q:
            qs = qs.filter(
                Q(name__icontains=q) |
                Q(city__icontains=q) |
                Q(state__icontains=q) |
                Q(address1__icontains=q)
            )
        return qs

class AvailableUnitsAPIView(generics.ListAPIView):
    serializer_class = UnitSerializer
    def get_queryset(self):
        return Unit.objects.select_related("property").filter(status="vacant")