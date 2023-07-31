from django.db import models


class Movie(models.Model):
    imdb_id = models.CharField(primary_key=True, max_length=20)
    title = models.CharField(max_length=200)
    year = models.CharField(max_length=4)
    poster = models.CharField(max_length=200, null=True, blank=True)

    def __str__(self):
        return self.title

