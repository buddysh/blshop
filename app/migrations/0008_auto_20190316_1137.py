# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2019-03-16 03:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_order_money'),
    ]

    operations = [
        migrations.AlterField(
            model_name='order',
            name='money',
            field=models.DecimalField(decimal_places=2, max_digits=10),
        ),
    ]
