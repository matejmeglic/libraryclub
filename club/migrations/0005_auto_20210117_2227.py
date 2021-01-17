# Generated by Django 3.1.5 on 2021-01-17 21:27

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club', '0004_auto_20210117_2225'),
    ]

    operations = [
        migrations.AlterField(
            model_name='season',
            name='goal_per_month_nu',
            field=models.IntegerField(blank=True, default=0, help_text='1', null=True, validators=[django.core.validators.MaxValueValidator(120)], verbose_name='Številko knjig na mesec'),
        ),
        migrations.AlterField(
            model_name='season',
            name='goal_per_season_nu',
            field=models.PositiveIntegerField(blank=True, default=0, help_text='100', null=True, validators=[django.core.validators.MaxValueValidator(10)], verbose_name='Število knjig na sezono'),
        ),
    ]
