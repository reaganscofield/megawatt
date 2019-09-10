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
# uri = 'http://monitoring_service_api:5000/?plant-id=2&from=2019-01-01&to=2019-02-01'
# views.pull_from_monitoring_service(uri)