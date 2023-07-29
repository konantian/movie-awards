from rest_framework import viewsets, status, permissions
from rest_framework.response import Response

from .models import User
from movie.models import Movie
from .serializers import UserSerializer, UserSerializerWithToken
from movie.serializers import MovieSerializer


class UserViewSet(viewsets.ModelViewSet):
    lookup_field = "username"
    queryset = User.objects.all()

    serializer_class = UserSerializer
    permission_classes = (permissions.AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        movie_data = request.data.get('movie')
        movie_imdb_id = movie_data['imdb_id']
        existing_movie = Movie.objects.get(imdb_id=movie_imdb_id)
        if not existing_movie:
            movie_serializer = MovieSerializer(data=movie_data)
            if movie_serializer.is_valid():
                movie = movie_serializer.save()
            else:
                return Response(movie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        else:
            movie = existing_movie

        instance.favorite_movies.add(movie)
        instance.save()

        return Response(UserSerializer(instance).data, status=status.HTTP_200_OK)
