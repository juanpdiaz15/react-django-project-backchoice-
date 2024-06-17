# Generated by Django 5.0.4 on 2024-05-02 11:32

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_rename_puntaje_evaluation_score_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='measurementscale',
            name='framework',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.backendframework'),
        ),
        migrations.AlterField(
            model_name='backendframework',
            name='description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='dimension',
            name='weight',
            field=models.FloatField(null=True),
        ),
        migrations.AlterField(
            model_name='measurementscale',
            name='scale',
            field=models.FloatField(choices=[(0, '0'), (0.5, '0.5'), (1, '1')], validators=[django.core.validators.MinValueValidator(0), django.core.validators.MaxValueValidator(0.5)]),
        ),
        migrations.AlterField(
            model_name='metric',
            name='dimension',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.dimension'),
        ),
    ]