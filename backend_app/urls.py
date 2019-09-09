from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()

# Register Urls Pattern 
router.register('data_point', views.DataPointCrudOperations)
router.register('plant', views.ManagingPlant)

urlpatterns = [
    path('', include(router.urls))
]

