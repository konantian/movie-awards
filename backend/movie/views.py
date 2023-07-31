from rest_framework import viewsets, permissions
from rest_framework.permissions import IsAuthenticated

from .models import Movie
from .serializers import MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    lookup_field = "imdb_id"
    queryset = Movie.objects.all()

    serializer_class = MovieSerializer
    permission_classes = (IsAuthenticated,)
