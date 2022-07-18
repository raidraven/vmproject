from importlib.resources import contents
from django.db import models

class SampleModels(models.Model):
    title = models.CharField(max_length=100)
    number = models.IntegerField()

CATEGORY = (('business','ビジネス'),('life','生活'),('other','その他'))

class DataModel(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    postdate = models.DateField(auto_now_add=True)
    category = models.CharField(max_length=50,choices= CATEGORY)
    images = models.ImageField(null=True, blank=True)

    def __str__(self):
        return self.title
