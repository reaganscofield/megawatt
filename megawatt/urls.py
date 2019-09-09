from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from backend_app import views

urlpatterns = [
    
    path('admin/', admin.site.urls),
    path('api/', include('backend_app.urls'), name='backend_app'),

    url(r'^api/filtered_datapoint/', 
        views.FilteredByDateFromToDateTo.as_view(), 
        name="filtered-by-date-from-to-date-to"
    )
]

# periodic function to be fired in every 24 hours 
views.pull_from_monitoring_service()