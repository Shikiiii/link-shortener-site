from django.db import models
import base64
import os
from dotenv import load_dotenv
from django.core.exceptions import ValidationError
import requests
from django.conf import settings # User settings
from django.contrib.auth.models import AbstractUser

# This currently acts as a placeholder for blacklisted domains.
BLACKLISTED_DOMAINS = {"example.com", "spam.com", "malicious-site.com"}

load_dotenv()

class UUser(AbstractUser):
    username = models.CharField(max_length=150, blank=True, null=True, unique=False)  # Remove uniqueness
    email = models.EmailField(unique=True)  # Ensure emails remain unique

    USERNAME_FIELD = "email"  # Make email the primary identifier
    REQUIRED_FIELDS = []  # Remove username from required fields

class ShortenedURL(models.Model):
    id = models.BigAutoField(primary_key=True)
    original_url = models.URLField()
    short_code = models.CharField(max_length=10, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    clicks = models.BigIntegerField(default=0)

    # Link to user (this is now optional)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name="short_urls", null=True, blank=True)

    # This function will perform certain things on the original URL
    # to ensure all is good.
    def clean(self):
        domain = self.original_url.split('/')[2] if '//' in self.original_url else ''

        if domain in BLACKLISTED_DOMAINS:
            raise ValidationError('This domain is not allowed.')
        
        try:
            # Attempt to send a HEAD request to the original URL
            # to check if it A) exists and B) is reachable.
            # This is done to prevent abuse by spamming random URLs.
            response = requests.head(self.original_url, allow_redirects=True, timeout=3)
            if response.status_code >= 400:
                raise ValidationError('URL is not reachable.')
        except:
            raise ValidationError('Invalid or unreachable URL.')


    def save(self, *args, **kwargs):
        if not self.short_code:  # Only generate short_code if it's not already set
            super().save(*args, **kwargs)  # Save first to get an ID

            # Base64 encoded Integer (starting from 100000) for the short code
            # of each URL. This assures easy management and avoids duplicates.
            self.short_code = base64.urlsafe_b64encode(str(self.id + 100000).encode()).decode().rstrip("=")
            # Save the short code.
            ShortenedURL.objects.filter(id=self.id).update(short_code=self.short_code)
        else:
            super().save(*args, **kwargs)

    def __str__(self):
        https = 'https' if bool(os.getenv('DJANGO_API_SECURE_DOMAIN', False)) else 'http'

        return f"{https}://{os.getenv('DJANGO_API_URL')}/api/{self.short_code}"
