from rest_framework.viewsets import ModelViewSet
from .models import Testimonial
from .serializers import TestimonialSerializer

class TestimonialViewSet(ModelViewSet):
    queryset = Testimonial.objects.all().order_by("-id")
    serializer_class = TestimonialSerializer