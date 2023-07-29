import uuid

from django.db import models
from user.models import User
from movie.models import Movie


class UserMovieLikes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'movie',)

    def __str__(self):
        return f"{self.user.username} likes {self.movie.title}"
