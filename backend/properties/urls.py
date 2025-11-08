from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PropertyViewSet
from properties.urls import router
from . import views

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')

urlpatterns = [
    path('', include(router.urls)),
    path('search/', views.PropertySearchAPIView.as_view(), name='property-search'),
    path('available/', views.AvailablePropertiesView.as_view(), name='property-available'),
]