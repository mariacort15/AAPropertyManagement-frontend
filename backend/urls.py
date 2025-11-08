from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.http import HttpResponse
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from . import users
from rest_framework.routers import DefaultRouter
from contact.views import ContactViewSet, OwnerViewSet, TenantViewSet
from testimonials.views import TestimonialViewSet
from django.http import HttpResponse
from owners.views import OwnerViewSet
from tenants.views import TenantViewSet
from properties.views import (
    PropertyViewSet,
    UnitViewSet,
    PropertySearchAPIView,
    AvailableUnitsAPIView,
)
from users import views as users_views
from rest_framework_simplejwt.views import TokenBlacklistView

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r"contact", ContactViewSet)
router.register(r"owners", OwnerViewSet)
router.register(r"tenants", TenantViewSet)
router.register(r"units", UnitViewSet)
router.register(r"testimonials", TestimonialViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),

    path('api/', include(router.urls)),

    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    #path('api/properties/', include('properties.urls')),

    #path('api/contact/', include('contact.urls')),

    #path('api/users/', include('users.urls')),
    #path('api/auth/', include('users.urls')),

    #path('api/tenants/', include('tenants.urls')),

    path('', lambda request: HttpResponse("AA Property Management")),

    path('api/users/me/', users.current_user, name='current_user'),
    
    path("api/properties/search/", PropertySearchAPIView.as_view(), name="properties-search"),

    path("api/units/available/", AvailableUnitsAPIView.as_view(), name="units-available"),

    path("api/token/blacklist/", TokenBlacklistView.as_view(), name="token_blacklist"),

    #path('api/testimonials', include('testimonials.urls')),
]


if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)