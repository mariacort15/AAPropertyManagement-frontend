from django.contrib import admin
from .models import Contact, Owner, Tenant

@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("id","first_name","last_name","email","phone")
    search_fields = ("first_name","last_name","email")

admin.site.register(Owner)
admin.site.register(Tenant)