import json
import requests
from rest_framework import status
import requests as RequestData
from rest_framework import viewsets, generics
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.views import APIView
from .models import Plant, DataPoint
from .serializers import *
from background_task import background


"""
    REST API to pull data from the monitoring service in a programmatic way.
    Periodic task to pull data from the monitoring service every day.
    pull data in every 24 hours and save it to postgesql database
"""
@background(schedule=60*60*24)  # function to be fired in every 24 hours 
def pull_from_monitoring_service(motoringEndPoint):
    try:
        request = requests.get(url=motoringEndPoint)
        response = request.json()
        if request.status_code ==  200 and len(response) > 0:
            convert_to_valid_data = []
            for data in response:
                _data = {
                    "datetime": data['datetime'],
                    "expected": json.dumps(data['expected']),
                    "observed": json.dumps(data['observed'])
                }
                convert_to_valid_data.append(_data)

            for create in convert_to_valid_data:
                serializer = DataPointSerializer(data=create)
                if serializer.is_valid(raise_exception=True):
                    obj = DataPoint.objects.create(
                        datetime = serializer['datetime'].value,
                        expected = serializer['expected'].value,
                        observed = serializer['observed'].value
                    )
                    obj.save()
                    print("Success Created: {}".format(obj.id))
                else:
                    print('error ', serializer.errors)
    except ConnectionError as Error:
        return "error: {}".format(Error)

"""
    REST API for managing solar panel plants (CRUD)
"""
class ManagingPlant(viewsets.ModelViewSet):
    queryset = Plant.objects.all()
    serializer_class = PlantSerializer
    

"""
    REST API to generate monitoring data reports
"""
class FilteredByDateFromToDateTo(generics.ListAPIView):
    serializer_class = DataPointSerializer

    def get_queryset(self):
        qs = DataPoint.objects.all()
        date_from = self.request.query_params.get("date_from", None)
        date_to = self.request.query_params.get("date_to", None)

        qs = qs.filter(
            Q(datetime__range=[date_from, date_to])
        )

        return qs

"""
  REST API for managing DataPoint (CRUD)
  Motonitoring Data
"""
class DataPointCrudOperations(viewsets.ModelViewSet):
    queryset = DataPoint.objects.all()
    serializer_class = DataPointSerializer

    def get_queryset(self):
        return DataPoint.objects.all()
 
    def create(self, request):
        serializer = DataPointSerializer(
            data = request.data,
            context = {
                'request': request
            }
        )
        if serializer.is_valid(raise_exception=True):
            createObject = DataPoint.objects.create(
                datetime = serializer['datetime'].value,
                expected = json.dumps(serializer['expected'].value),
                observed = json.dumps(serializer['observed'].value)
            )
            createObject.save()
            return Response(
                serializer.data, 
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors, 
            status=status.HTTP_400_BAD_REQUEST
        )

    def update(self, request, pk=None):
        getObject = DataPoint.objects.get(id=pk)
        serializer = DataPointSerializer(
            data = request.data,
            context = {
                'request': request
            }
        )
        if serializer.is_valid(raise_exception=True):
            plantInstance = Plant.objects.get(id=serializer["plant_id"].value)
            if getObject:
                getObject.datetime = serializer["datetime"].value
                getObject.plant_id = plantInstance
                getObject.save()
                return Response(
                    {"success updated": serializer.data}, 
                    status=status.HTTP_200_OK
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
  
    def destroy(self, info, **kwargs):
        try:
            if kwargs["pk"]:
                getObject = DataPoint.objects.get(id=kwargs["pk"])
                if getObject:
                    getObject.delete()
                    return Response({"success": "success deleted datapoint"}, status=status.HTTP_200_OK)
        except Products.DoesNotExist:
            raise Http404