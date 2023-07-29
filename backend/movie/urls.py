from django.urls import path
from .views import MovieViewSet

urlpatterns = [
    path("movies", MovieViewSet.as_view({"get": "list", "post": "create", "patch": "partial_update"})),
    path(
        "movies/<imdb_id>",
        MovieViewSet.as_view(
            {
                "get": "retrieve",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
]
