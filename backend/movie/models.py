import uuid

from django.db import models


class Movie(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=200)
    year = models.CharField(max_length=4)
    rated = models.CharField(max_length=50)
    released = models.CharField(max_length=20, null=True, blank=True)
    runtime = models.CharField(max_length=50)
    genre = models.CharField(max_length=200)
    director = models.CharField(max_length=200)
    writer = models.CharField(max_length=200)
    actors = models.CharField(max_length=500)
    plot = models.TextField()
    language = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    awards = models.TextField()
    poster = models.CharField(max_length=200, null=True, blank=True)
    ratings = models.JSONField()
    metascore = models.CharField(max_length=3, blank=True, null=True)
    imdb_rating = models.CharField(max_length=3, blank=True, null=True)
    imdb_votes = models.CharField(max_length=50, blank=True, null=True)
    imdb_id = models.CharField(max_length=20)
    type = models.CharField(max_length=50)
    dvd = models.CharField(max_length=20, null=True, blank=True)
    box_office = models.CharField(max_length=100, null=True, blank=True)
    production = models.CharField(max_length=200, null=True, blank=True)
    website = models.CharField(max_length=200, null=True, blank=True)
    response = models.CharField(max_length=5, null=True, blank=True)

    def __str__(self):
        return self.title

