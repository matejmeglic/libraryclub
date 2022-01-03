# Generated by Django 3.1.5 on 2022-01-03 21:37

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('club', '0017_auto_20220103_1925'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='reader',
            name='started_reading',
        ),
        migrations.AddField(
            model_name='book',
            name='genre',
            field=models.CharField(choices=[('notspecified', 'Not-specified'), ('romantic', 'Romantic'), ('comedy', 'Comedy'), ('biography', 'Biography'), ('fantasy', 'Fantasy'), ('fiction', 'Fiction'), ('crime', 'Crime'), ('detective', 'Detective/Mysery'), ('thriller', 'Thriller'), ('historica', 'Historical'), ('politics', 'Politics'), ('selfimprovement', 'Self-improvement'), ('business', 'Business'), ('poetry', 'Poetry'), ('philosophy', 'Philosophy'), ('social', 'Social'), ('studymaterial', 'Study materials'), ('cookbook', 'Cook-book')], default='notspecified', max_length=20),
        ),
    ]
