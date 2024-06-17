# Generated by Django 5.0.4 on 2024-06-06 00:13

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0008_remove_dimension_description_remove_metric_project_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='Framework',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.RemoveField(
            model_name='measurementscale',
            name='framework',
        ),
        migrations.RemoveField(
            model_name='evaluation',
            name='framework',
        ),
        migrations.RemoveField(
            model_name='evaluation',
            name='metric',
        ),
        migrations.RemoveField(
            model_name='evaluation',
            name='user',
        ),
        migrations.RemoveField(
            model_name='measurementscale',
            name='metric',
        ),
        migrations.AddField(
            model_name='dimension',
            name='weighted_score',
            field=models.FloatField(default=0),
        ),
        migrations.CreateModel(
            name='MetricScore',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.FloatField()),
                ('framework', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.framework')),
                ('metric', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scores', to='api.metric')),
            ],
        ),
        migrations.CreateModel(
            name='Score',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('score', models.FloatField()),
                ('dimension', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.dimension')),
                ('framework', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='scores', to='api.framework')),
            ],
        ),
        migrations.DeleteModel(
            name='BackEndFramework',
        ),
        migrations.DeleteModel(
            name='Evaluation',
        ),
        migrations.DeleteModel(
            name='MeasurementScale',
        ),
    ]
