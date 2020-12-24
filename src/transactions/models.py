from django.db import models

# Create your models here.
class Transaction(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True, null=True)
    amount = models.DecimalField(max_digits=6, decimal_places=2)
    type = models.CharField(max_length=1)
