import random, string
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ShortenedURL
from .serializers import ShortenedURLSerializer, CustomTokenObtainSerializer, UserShortenedURLSerializer
from django_ratelimit.decorators import ratelimit
from django.utils.decorators import method_decorator
from rest_framework_simplejwt.views import TokenObtainPairView
from .utils import validate_name, validate_email, validate_passwords
from .models import UUser
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
import jwt
from django.conf import settings
from rest_framework.exceptions import ValidationError
from django.db.models import Sum


class ShortenURLView(APIView):
    # Apply rate limiting (60 requests per minute, based on IP address)
    @method_decorator(ratelimit(key='ip', rate='60/m', method='POST', block=True))
    def post(self, request):
        original_url = request.data.get('original_url')
        short_code = request.data.get('custom_code')
        token = request.headers.get("Authorization")

        # Url is a required parameter, raise BAD REQUEST.
        if not original_url:
            return Response({"error": "URL is required"}, status=status.HTTP_400_BAD_REQUEST)
        
        if token is not None:
            try:
                token = token.split(" ")[1] if token.startswith("Bearer ") else token
                decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
                user_id = decoded_token.get("user_id")  # Extract user ID from the token

                if not user_id:
                    return Response({"error": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)

                user = UUser.objects.get(id=user_id)  # Fetch user from DB

                if short_code:
                    # Check if the shortcode is already taken
                    if ShortenedURL.objects.filter(short_code=short_code).exists():
                        return Response({"error": "This short code is already taken."}, status=status.HTTP_400_BAD_REQUEST)


                # Create the new shortened URL, only parameter needed is original_url.
                try:
                    if short_code:
                        url_entry = ShortenedURL.objects.create(original_url=original_url, short_code=short_code, user=user)
                    else:
                        url_entry = ShortenedURL.objects.create(original_url=original_url, user=user)
                    # Save the new shortened URL entry
                    url_entry.save()
                except ValidationError as e:
                    return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

                return Response(ShortenedURLSerializer(url_entry).data, status=status.HTTP_201_CREATED)

            except jwt.ExpiredSignatureError:
                return Response({"error": "Token has expired."}, status=status.HTTP_401_UNAUTHORIZED)
            except jwt.InvalidTokenError:
                return Response({"error": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)
            except UUser.DoesNotExist:
                return Response({"error": "User not found."}, status=status.HTTP_401_UNAUTHORIZED)


        # Create the new shortened URL, only parameter needed is original_url.
        url_entry = ShortenedURL.objects.create(original_url=original_url)
        url_entry.save()

        return Response(ShortenedURLSerializer(url_entry).data, status=status.HTTP_201_CREATED)
    
class CheckShortCodeAvailabilityView(APIView):
    def post(self, request):
        short_code = request.data.get('shortCode')
        # Check if the short code is already taken
        if ShortenedURL.objects.filter(short_code=short_code).exists():
            return Response({"available": False, "message": "This short code is already taken."}, status=status.HTTP_200_OK)
        else:
            return Response({"available": True, "message": "This short code is available."}, status=status.HTTP_200_OK)

class DeleteShortURL(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    @method_decorator(ratelimit(key='ip', rate='30/m', method='DELETE', block=True), name='dispatch')
    def delete(self, request):
        token = request.headers.get("Authorization")  # Get token from headers
        short_code = request.data.get("shortCode")

        if not token or not short_code:
            return Response({"error": "Missing required parameters."}, status=status.HTTP_400_BAD_REQUEST)

        # Extract token without "Bearer " prefix
        token = token.split(" ")[1] if token.startswith("Bearer ") else token

        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = decoded_token.get("user_id")  # Extract user ID from the token

            if not user_id:
                return Response({"error": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)

            user = UUser.objects.get(id=user_id)  # Fetch user from DB

            # Ensure the short URL exists and belongs to the authenticated user
            try:
                short_url = ShortenedURL.objects.get(short_code=short_code, user=user)
                short_url.delete()
                return Response({"message": "Short URL deleted successfully."}, status=status.HTTP_200_OK)
            except ShortenedURL.DoesNotExist:
                return Response({"error": "Short URL not found or unauthorized."}, status=status.HTTP_404_NOT_FOUND)

        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired."}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError:
            return Response({"error": "Invalid token."}, status=status.HTTP_401_UNAUTHORIZED)
        except UUser.DoesNotExist:
            return Response({"error": "User not found."}, status=status.HTTP_401_UNAUTHORIZED)
    


class UserShortURLsView(APIView):
    permission_classes = [IsAuthenticated]  # Ensure the user is authenticated

    def get(self, request):
        # Get all the shortened URLs associated with the authenticated user
        short_urls = ShortenedURL.objects.filter(user=request.user)
        serializer = UserShortenedURLSerializer(short_urls, many=True)  # Use the new serializer
        return Response({"data": serializer.data, "name": request.user.username})
    

class RedirectURLView(APIView):
    def get(self, request, short_code):
        try:
            url_entry = ShortenedURL.objects.get(short_code=short_code)

            # Increase the 'clicks' field by 1
            url_entry.clicks += 1
            url_entry.save()

            return Response({"original_url": url_entry.original_url}, status=status.HTTP_200_OK)
        except ShortenedURL.DoesNotExist:
            return Response({"error": "URL not found"}, status=status.HTTP_404_NOT_FOUND)
        

class HomepageStatsView(APIView):
    def get(self, request):
        # build the statistics: registered users, short links, total link clicks

        registered_users = UUser.objects.count()
        short_links = ShortenedURL.objects.count()
        total_link_clicks = ShortenedURL.objects.aggregate(total_clicks=Sum('clicks'))['total_clicks'] or 0

        return Response({
            "registered users": registered_users,
            "short links": short_links,
            "total link clicks": total_link_clicks
        }, status=status.HTTP_200_OK)


# Authentication using simpleJWT tokens.
class RegisterView(APIView):
    def post(self, request):
        name = request.data.get('name')
        email = request.data.get('email')
        password = request.data.get('password')
        passwordConfirmation = request.data.get('passwordConfirmation')

        name_check, email_check, password_check = validate_name(name), validate_email(email), validate_passwords(password, passwordConfirmation)

        if (not name_check['success'] or not email_check['success'] or not password_check['success']):
            errors = ""
            if 'error' in name_check:
                errors += name_check['error'] + "\n"
            if 'error' in email_check:
                errors += email_check['error'] + "\n"
            if 'error' in password_check:
                errors += password_check['error'] + "\n"

            return Response({"success": False, "error": errors}, status=status.HTTP_400_BAD_REQUEST)
        
        # before registering the user, we should first check in case the email is already in use
        if UUser.objects.filter(email=email).exists():
            return Response({"success": False, "error": "Email is already in use."}, status=status.HTTP_400_BAD_REQUEST)

        # if everything is 👍 register the user
        user = UUser.objects.create_user(name, email, password)

        if not user:
            return Response({"success": False, "error": "Something went wrong. Try again later."}, status=status.HTTP_400_BAD_REQUEST)
        
        refresh = RefreshToken.for_user(user)
        return Response({
            "success": True,
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    

class LoginView(APIView):
    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')

        # Authenticate the user
        user = authenticate(request, email=email, password=password)

        short_urls = ShortenedURL.objects.filter(user=user) if user else []
        serializer = UserShortenedURLSerializer(short_urls, many=True)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            access_token = str(refresh.access_token)
            return Response({
                "success": True,
                "access": str(access_token),
                "refresh": str(refresh),
                "user": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            return Response({"success": False, "error": "Invalid email/password."}, status=status.HTTP_400_BAD_REQUEST)



class CustomTokenObtainView(TokenObtainPairView):
    serializer_class = CustomTokenObtainSerializer