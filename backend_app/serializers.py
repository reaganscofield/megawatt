from rest_framework import serializers
from .models import Plant, DataPoint
invalid = serializers.ValidationError()

class DataPointSerializer(serializers.ModelSerializer):
    class Meta:
        model = DataPoint
        fields = ["id", "datetime", "expected", "observed", "plant_id"]
        read_only_fields = ["id"]

    def validate(self, values):
        if values["datetime"] == None:
            raise invalid("datetime is required")
        if values["expected"] == None:
            raise invalid("expected is required")
        if values["observed"] == None:
            raise invalid("observed is required")
        return values

class PlantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plant
        fields = ["id", "name"]
        read_only_fields = ["id"]

    def validate(self, name):
        if name["name"] == None:
            raise invalid(
                "plant name is required"
            )
        return name

class Repport(serializers.Serializer):
    total = serializers.IntegerField()
    day = serializers.DateTimeField()

