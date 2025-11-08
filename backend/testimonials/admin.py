from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("id","author_name","rating","is_approved","property","published_at")
    list_filter  = ("is_approved","rating")
    search_fields = ("author_name","content")