from django.db import models
from django.contrib.auth.models import AbstractUser
from movie.models import Movie


class User(AbstractUser):
    # Unused
    last_login = None
    date_joined = None
    groups = None
    user_permissions = None
    is_superuser = None
    is_staff = None
    is_active = True
    email = None
    username = models.CharField(max_length=150, primary_key=True)
    favorite_movies = models.ManyToManyField(Movie, related_name='favorite_movies', blank=True)

    def __str__(self):
        return self.username
