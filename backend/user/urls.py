from django.urls import path
from .views import UserViewSet

urlpatterns = [
    path("users", UserViewSet.as_view({"get": "list", "post": "create", "patch": "partial_update"})),
    path(
        "users/<username>",
        UserViewSet.as_view(
            {
                "get": "retrieve",
                "patch": "partial_update",
                "delete": "destroy",
            }
        ),
    ),
]
