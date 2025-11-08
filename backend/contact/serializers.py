from rest_framework import serializers
from .models import Contact, Owner, Tenant

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = "__all__"

class OwnerSerializer(serializers.ModelSerializer):
    contact = ContactSerializer()
    class Meta:
        model = Owner
        fields = "__all__"

    def create(self, validated):
        contact_data = validated.pop("contact")
        contact = Contact.objects.create(**contact_data)
        return Owner.objects.create(contact=contact, **validated)

class TenantSerializer(serializers.ModelSerializer):
    contact = ContactSerializer()
    class Meta:
        model = Tenant
        fields = "__all__"

    def create(self, validated):
        contact_data = validated.pop("contact")
        contact = Contact.objects.create(**contact_data)
        return Tenant.objects.create(contact=contact, **validated)