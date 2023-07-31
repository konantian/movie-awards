from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from .models import User
from movie.models import Movie
from .serializers import UserSerializer, UserSerializerWithToken
from movie.serializers import MovieSerializer


class UserViewSet(viewsets.ModelViewSet):
    lookup_field = "username"
    queryset = User.objects.all()

    serializer_class = UserSerializer
    permission_classes = (AllowAny,)

    def create(self, request, *args, **kwargs):
        serializer = UserSerializerWithToken(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        action = request.data.get('action')
        if action == 'add':
            if instance.favorite_movies.count() < 5:
                movie_data = request.data.get('movie')
                movie_imdb_id = movie_data['imdb_id']
                existing_movie = Movie.objects.filter(imdb_id=movie_imdb_id).first()
                if not existing_movie:
                    movie_serializer = MovieSerializer(data=movie_data)
                    if movie_serializer.is_valid():
                        new_movie = movie_serializer.save()
                        instance.favorite_movies.add(new_movie)
                    else:
                        return Response(movie_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
                else:
                    if existing_movie not in instance.favorite_movies.all():
                        instance.favorite_movies.add(existing_movie)
                    else:
                        return Response({"Error": "This movie is already in your favorite list"},
                                        status=status.HTTP_304_NOT_MODIFIED)
            else:
                return Response({"Error": "You can add up to 5 movies to your favorite list"},
                                status=status.HTTP_304_NOT_MODIFIED)
        elif action == 'remove':
            movie_imdb_id = request.data.get('imdb_id')
            existing_movie = Movie.objects.get(imdb_id=movie_imdb_id)
            instance.favorite_movies.remove(existing_movie)
            existing_movie.delete()
        instance.save()

        return Response(UserSerializer(instance).data, status=status.HTTP_200_OK)
