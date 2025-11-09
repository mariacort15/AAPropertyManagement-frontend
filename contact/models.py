from django.db import models
from django.db.models.functions import Lower
from django.conf import settings

class Contact(models.Model):
    first_name = models.CharField(max_length=100)
    last_name  = models.CharField(max_length=100)
    email      = models.EmailField(blank=True, null=True)
    phone      = models.CharField(max_length=30, blank=True)
    notes      = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                Lower("email"),
                name="uniq_contact_email_ci",
                condition=~models.Q(email=None)
            )
        ]
        indexes = [
            models.Index(Lower("last_name"), name="idx_contact_last_ci")
        ]

    def __str__(self):
        return f"{self.first_name} {self.last_name}".strip()

class Owner(models.Model):
    contact   = models.OneToOneField(Contact, on_delete=models.CASCADE, related_name="owner_profile")
    user      = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="owner_profile")
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at= models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Owner: {self.contact}"

class Tenant(models.Model):
    contact   = models.OneToOneField(Contact, on_delete=models.CASCADE, related_name="tenant_profile")
    user      = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name="tenant_profile")
    created_at= models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Tenant: {self.contact}"