from django.db import models
from properties.models import Property

class Testimonial(models.Model):
    property     = models.ForeignKey(Property, on_delete=models.SET_NULL, null=True, blank=True, related_name="testimonials")
    author_name  = models.CharField(max_length=120)
    author_email = models.EmailField(blank=True)
    rating       = models.PositiveSmallIntegerField(default=5)  # 1-5
    content      = models.TextField()
    is_approved  = models.BooleanField(default=False)
    published_at = models.DateTimeField(null=True, blank=True)
    created_at   = models.DateTimeField(auto_now_add=True)

    class Meta:
        indexes = [models.Index(fields=["is_approved","rating"])]

    def __str__(self):
        return f"{self.author_name} ({self.rating}/5)"