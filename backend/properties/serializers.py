from rest_framework import serializers
from .models import Property, Unit

class UnitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Unit
        fields = "__all__"

class PropertySerializer(serializers.ModelSerializer):
    units = UnitSerializer(many=True, read_only=True)
    class Meta:
        model = Property
        fields = "__all__"