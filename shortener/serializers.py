from rest_framework import serializers
from shortener.models import ShortenedURL
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from shortener.models import UUser  # For the user serialization

class ShortenedURLSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShortenedURL
        fields = '__all__'


class CustomTokenObtainSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        # Add custom claims
        token["email"] = user.email
        token["username"] = user.username
        return token

    def validate(self, attrs):
        username_or_email = attrs.get("username")
        password = attrs.get("password")

        # Check if the user exists with username or email
        user = User.objects.filter(username=username_or_email).first() or \
               User.objects.filter(email=username_or_email).first()

        if user and user.check_password(password):
            return super().validate({"username": user.username, "password": password})
        
        raise serializers.ValidationError("Invalid credentials")


# User serializer to return user details
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UUser
        fields = ('id', 'email', 'username')  # Return relevant user fields

# Renamed serializer for user-specific short URLs
class UserShortenedURLSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)  # Include user info (or change to just 'user = serializers.PrimaryKeyRelatedField()' if you prefer user ID)

    class Meta:
        model = ShortenedURL
        fields = ('id', 'original_url', 'short_code', 'created_at', 'clicks', 'user')