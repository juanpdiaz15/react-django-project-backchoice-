# Generated by Django 5.0.4 on 2024-05-01 23:34

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_alter_backendframework_description'),
    ]

    operations = [
        migrations.RenameField(
            model_name='evaluation',
            old_name='puntaje',
            new_name='score',
        ),
        migrations.RemoveField(
            model_name='measurementscale',
            name='fully',
        ),
        migrations.RemoveField(
            model_name='measurementscale',
            name='not_at_all',
        ),
        migrations.RemoveField(
            model_name='measurementscale',
            name='partially',
        ),
        migrations.RemoveField(
            model_name='metric',
            name='measurement_scale',
        ),
        migrations.AddField(
            model_name='dimension',
            name='description',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='measurementscale',
            name='metric',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.metric'),
        ),
        migrations.AddField(
            model_name='measurementscale',
            name='scale',
            field=models.JSONField(default=''),
        ),
        migrations.AddField(
            model_name='metric',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AddField(
            model_name='metric',
            name='dimension',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.dimension'),
        ),
    ]
