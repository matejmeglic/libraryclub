# Generated by Django 3.1.5 on 2021-02-13 20:47

from django.conf import settings
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('club', '0011_auto_20210213_2142'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='MyUser',
            new_name='TeamUser',
        ),
    ]
