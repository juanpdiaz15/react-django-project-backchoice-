from django.contrib.auth.models import User
from rest_framework import serializers
from allauth.socialaccount.providers.oauth2.client import OAuth2Error
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError as DjangoValidationError
from django.db import IntegrityError
from django.http import HttpRequest, HttpResponseBadRequest
from django.urls.exceptions import NoReverseMatch
from django.utils.translation import gettext_lazy as _
from requests.exceptions import HTTPError
from rest_framework import serializers
from rest_framework.reverse import reverse

from .models import Dimension, Metric, Framework, Project
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class MetricSerializer(serializers.ModelSerializer):
    class Meta:
        model = Metric
        fields = '__all__'

class DimensionSerializer(serializers.ModelSerializer):
    metrics = MetricSerializer(many=True, read_only=True)
    metric_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Metric.objects.all(), write_only=True, source='metrics'
    )

    class Meta:
        model = Dimension
        fields = '__all__'

    def create(self, validated_data):
        metrics_data = validated_data.pop('metrics')
        dimension = Dimension.objects.create(**validated_data)
        dimension.metrics.set(metrics_data)
        return dimension

    def update(self, instance, validated_data):
        metrics_data = validated_data.pop('metrics')
        instance.name = validated_data.get('name', instance.name)
        instance.weight = validated_data.get('weight', instance.weight)
        instance.editable = validated_data.get('editable', instance.editable)
        instance.save()
        instance.metrics.set(metrics_data)
        return instance

class FrameworkSerializer(serializers.ModelSerializer):
    dimensions = DimensionSerializer(many=True, read_only=True)
    dimension_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Dimension.objects.all(), write_only=True, source='dimensions'
    )

    class Meta:
        model = Framework
        fields = '__all__'

    def create(self, validated_data):
        dimensions_data = validated_data.pop('dimensions')
        framework = Framework.objects.create(**validated_data)
        framework.dimensions.set(dimensions_data)
        return framework

    def update(self, instance, validated_data):
        dimensions_data = validated_data.pop('dimensions')
        instance.name = validated_data.get('name', instance.name)
        instance.save()
        instance.dimensions.set(dimensions_data)
        return instance

class ProjectSerializer(serializers.ModelSerializer):
    frameworks = FrameworkSerializer(many=True, read_only=True)
    framework_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=Framework.objects.all(), write_only=True, source='frameworks'
    )

    class Meta:
        model = Project
        fields = '__all__'

    def create(self, validated_data):
        frameworks_data = validated_data.pop('frameworks')
        project = Project.objects.create(**validated_data)
        project.frameworks.set(frameworks_data)
        return project

    def update(self, instance, validated_data):
        frameworks_data = validated_data.pop('frameworks')
        instance.name = validated_data.get('name', instance.name)
        instance.description = validated_data.get('description', instance.description)
        instance.save()
        instance.frameworks.set(frameworks_data)
        return instance