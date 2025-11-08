from rest_framework.viewsets import ModelViewSet, permissions
from .models import Contact, Owner, Tenant
from .serializers import ContactSerializer, OwnerSerializer, TenantSerializer


class ContactViewSet(ModelViewSet):
    queryset = Contact.objects.all().order_by("-id")
    serializer_class = ContactSerializer
    permission_classes = [permissions.AllowAny]

class OwnerViewSet(ModelViewSet):
    queryset = Owner.objects.select_related("contact").all().order_by("-id")
    serializer_class = OwnerSerializer

class TenantViewSet(ModelViewSet):
    queryset = Tenant.objects.select_related("contact").all().order_by("-id")
    serializer_class = TenantSerializer