from django.contrib import admin
from .models import Property, Amenity, Lease, Unit

class UnitInline(admin.TabularInline):
    model = Unit
    extra = 0

@admin.register(Property)
class PropertyAdmin(admin.ModelAdmin):
    llist_display = ("id","name","city","state","type","owner","is_active")
    search_fields = ("name","city","state")
    inlines = [UnitInline]

admin.site.register(Unit)

