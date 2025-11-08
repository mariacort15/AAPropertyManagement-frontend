from django.db import models
from django.contrib.auth import get_user_model
from django.conf import settings

User = get_user_model

class Amenity(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name

class Property(models.Model):
    PROPERTY_TYPE_CHOICES = [("House", "House"), ("Apartment", "Apartment"), ("Condo", "Condo"), ("Townhouse", "Townhouse"),]
    STATUS = [("Available", "Available"), ("Occupied", "Occupied"), ("Rented", "Rented"),]
    owner = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    name = models.CharField(max_length=200)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=100)
    state = models.CharField(max_length=50, default="California")
    zip_code = models.CharField(max_length=10, blank=True, null=True)
    rent = models.DecimalField(max_digits=9, decimal_places=2)
    bedrooms = models.IntegerField(default=1)
    bathrooms = models.DecimalField(max_digits=3, decimal_places=1, default=1.0)
    square_feet = models.IntegerField(blank=True, null=True)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPE_CHOICES, blank=True, null=True)
    pets_allowed = models.BooleanField(default=False)
    status = models.CharField(max_length=20, choices=[ ("Available", "Available"), ("Rented", "Rented")], default="Available")
    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)
    notes = models.TextField(blank=True)
    image = models.ImageField(upload_to="property_images/", default="property_images/default.jpg", blank=True, null=True)
    available = models.BooleanField(default=True)
    description = models.TextField(blank=True, null=True)
    amenities = models.ManyToManyField(Amenity, blank=True)

    class Meta:
        unique_together = [("owner", "name")]
        indexes = [models.Index(fields=["city","state"])]

    def __str__(self):
        return f"{self.name} ({self.city})"
   
class Lease(models.Model):
    tenant = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    start_date = models.DateField()
    end_date = models.DateField()
    rent = models.DecimalField(max_digits=8, decimal_places=2)

    def __str__(self):
        return f"Lease: {self.tenant.username} - {self.property.title}"
    
class PropertyType(models.TextChoices):
    SINGLE_FAMILY = "single_family", "Single Family"
    MULTI_FAMILY  = "multi_family", "Multi-Family"
    CONDO         = "condo", "Condo"
    TOWNHOME      = "townhome", "Townhome"
    COMMERCIAL    = "commercial", "Commercial"
    OTHER         = "other", "Other"

class UnitStatus(models.TextChoices):
    VACANT       = "vacant", "Vacant"
    OCCUPIED     = "occupied", "Occupied"
    MAINTENANCE  = "maintenance", "Maintenance"

class Unit(models.Model):
    property    = models.ForeignKey(Property, on_delete=models.CASCADE, related_name="units")
    unit_number = models.CharField(max_length=50)
    bedrooms    = models.PositiveIntegerField(default=0)
    bathrooms   = models.DecimalField(max_digits=3, decimal_places=1, default=1.0)
    sqft        = models.PositiveIntegerField(default=0)
    market_rent = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    status      = models.CharField(max_length=20, choices=UnitStatus.choices, default=UnitStatus.VACANT)
    created_at  = models.DateTimeField(auto_now_add=True)
    updated_at  = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = [("property","unit_number")]
        indexes = [models.Index(fields=["status"])]

    def __str__(self):
        return f"{self.property.name} #{self.unit_number}"


