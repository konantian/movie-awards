from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

from .models import User
from movie.serializers import MovieSerializer


class UserSerializer(serializers.ModelSerializer):
    favorite_movies = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ["username", "first_name", "last_name", "favorite_movies"]

    def get_favorite_movies(self, obj):
        favorite_movies = obj.favorite_movies.all()
        serializer = MovieSerializer(instance=favorite_movies, many=True)
        return serializer.data


class UserSerializerWithToken(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["token", "username", "password", "first_name", "last_name"]

    token = serializers.SerializerMethodField()
    password = serializers.CharField(write_only=True)

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
