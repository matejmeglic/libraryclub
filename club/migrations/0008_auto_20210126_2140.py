# Generated by Django 3.1.5 on 2021-01-26 20:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club', '0007_auto_20210126_2102'),
    ]

    operations = [
        migrations.AlterField(
            model_name='book',
            name='pages',
            field=models.IntegerField(default=0, help_text='298', verbose_name='Število strani'),
        ),
    ]
