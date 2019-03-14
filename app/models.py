from django.db import models

# Create your models here.

class User(models.Model):
    name=models.CharField(max_length=40,unique=True)
    password=models.CharField(max_length=60)
    email=models.CharField(max_length=20,unique=True)
