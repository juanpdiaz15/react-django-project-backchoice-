# Generated by Django 5.0.4 on 2024-06-06 01:26

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_framework_remove_measurementscale_framework_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='dimension',
            name='framework',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.framework'),
        ),
    ]
