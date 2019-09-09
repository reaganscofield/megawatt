from django.db import models
import uuid
from django.contrib.postgres.fields import JSONField
from django.contrib.postgres.fields.jsonb import KeyTextTransform
from django.db.models import Count, Sum
from django.db.models.functions import Cast
from django.db.models import FloatField
from django.db.models.functions import TruncDay       
from django.db.models import Q
from django.db.models.expressions import RawSQL


class Manager(models.Manager):
    def counts_and_sums(self, date_from, date_to):
        return (
            DataPoint.objects
                .annotate(day=TruncDay('datetime')).values('day')
                .annotate(count=Count('datetime'))
                .annotate(observed_irradiation_total = Sum(Cast(KeyTextTransform('irradiation', 'observed'), FloatField())) )
                .annotate(observed_energy_total = Sum(Cast(KeyTextTransform("energy", 'observed'), FloatField())))
                .annotate(expected_irradiation_total = Sum(Cast(KeyTextTransform('irradiation', 'expected'), FloatField())) )
                .annotate(expected_energy_total = Sum(Cast(KeyTextTransform('energy', 'expected'), FloatField())) )
                .values('day', 'count', 'observed_irradiation_total', 'observed_energy_total', 'expected_irradiation_total', 'expected_energy_total')
                .filter(Q(datetime__range=[date_from, date_to]))
        )

class Plant(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=250, blank=True, null=True, default=None)

    def __str__(self):
        return self.name
  
class DataPoint(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    plant_id = models.ForeignKey(Plant, blank=True, null=True, on_delete=models.CASCADE)

    datetime = models.DateTimeField()
    expected = JSONField(blank=True, null=True)
    observed = JSONField(blank=True, null=True)
    objects = Manager()

    def __str__(self):
        return f"{self.datetime}"