from django.db import models
from django.conf import settings
from properties.models import Property #make sure property app is installed.

class TenantResource(models.Model):
    tenant_name = models.CharField(max_length=100)
    unit_number = models.CharField(max_length=50)
    lease_start = models.DateField()
    lease_end = models.DateField()
    rent_amount = models.DecimalField(max_digits=8, decimal_places=2)
    email = models.EmailField()
    description = models.TextField(blank=True)
    link = models.URLField(blank=True)

    def __str__(self):
        return self.tenant_name

class Tenant(models.Model):
    # Link to the *configured* user model, lazily
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        null=True, blank=True,
        related_name="tenant_profile",
    )
    property = models.ForeignKey(
        Property,
        on_delete=models.SET_NULL,
        null=True, blank=True,
        related_name="tenants",
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        if self.user_id:
            return self.user.get_full_name() or self.user.username
        return f"Tenant #{self.pk}"