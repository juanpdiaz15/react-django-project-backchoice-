from django.db import models
from django.contrib.auth.models import User
from django import forms
from django.core.validators import MinValueValidator, MaxValueValidator
# Create your models here.

class Metric(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    where_to_find = models.TextField()
    measurement = models.CharField(max_length=100)
    value = models.FloatField(default=0.0)
    editable = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class Dimension(models.Model):
    name = models.CharField(max_length=100)
    weight = models.FloatField(default=0.0)
    editable = models.BooleanField(default=True)
    metrics = models.ManyToManyField(Metric)

    def __str__(self):
        return self.name

class Framework(models.Model):
    name = models.CharField(max_length=100)
    dimensions = models.ManyToManyField(Dimension)

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    frameworks = models.ManyToManyField(Framework)

    def __str__(self):
        return self.name