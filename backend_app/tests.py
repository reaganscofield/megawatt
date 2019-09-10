from rest_framework.test import APITestCase
from .models import Plant, DataPoint
import json
import datetime


"""
    Sorry I did not wrote tests for everything
"""
class TestAPITestCase(APITestCase):
    def setUp(self):
       createPlant = Plant.objects.create(
           name = "Pyhton"
       )
       createPlant.save()

       createDataPoint = DataPoint.objects.create(
           plant_id = createPlant,
           datetime = datetime.datetime.now(),
           expected = json.dumps({"energy": 10.450189905047512, "irradiation": 38.5014941086517}),
           observed = json.dumps({"energy": 178.450189565047512, "irradiation": 81.5034086517})
       )
       createDataPoint.save()


    def test(self):
        plant = Plant.objects.count()
        self.assertEqual(plant, 1)

    def test_data_point(self):
        data_point = DataPoint.objects.count()
        self.assertEqual(data_point, 1)
