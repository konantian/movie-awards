from rest_framework import viewsets, permissions
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

from .models import Movie
from .serializers import MovieSerializer


class MovieViewSet(viewsets.ModelViewSet):
    lookup_field = "imdb_id"
    queryset = Movie.objects.all()

    serializer_class = MovieSerializer
    authentication_classes = (JSONWebTokenAuthentication, )
    permission_classes = (permissions.AllowAny,)
