import uuid

from django.db import models


class Movie(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    title = models.CharField(max_length=200)
    year = models.CharField(max_length=4)
    rated = models.CharField(max_length=50)
    released = models.DateField()
    runtime = models.CharField(max_length=50)
    genre = models.CharField(max_length=200)
    director = models.CharField(max_length=200)
    writer = models.CharField(max_length=200)
    actors = models.CharField(max_length=500)
    plot = models.TextField()
    language = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    awards = models.TextField()
    poster = models.URLField()
    ratings = models.JSONField()
    metascore = models.IntegerField()
    imdb_rating = models.DecimalField(max_digits=3, decimal_places=1)
    imdb_votes = models.IntegerField()
    imdb_id = models.CharField(max_length=20)
    movie_type = models.CharField(max_length=50)
    dvd = models.DateField(null=True, blank=True)
    box_office = models.CharField(max_length=100, null=True, blank=True)
    production = models.CharField(max_length=200, null=True, blank=True)
    website = models.URLField(null=True, blank=True)
    response = models.BooleanField(default=False)

    def __str__(self):
        return self.title

