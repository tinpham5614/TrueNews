from datetime import timedelta
import math
from django.db import models
from django.contrib.auth.models import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
from django.contrib.auth.models import User

class Articles(models.Model):
    source = models.CharField(max_length=500, null=True, blank=True)
    author = models.CharField(max_length=500, null=True, blank=True)
    title = models.TextField(null=True, blank=True)  # Changed to TextField
    description = models.TextField(null=True, blank=True)
    url = models.URLField(max_length=500, null=True, blank=True)  # Increased max_length
    url_to_image = models.URLField(max_length=500, null=True, blank=True)  # Increased max_length
    published_at = models.DateTimeField(null=True, blank=True)
    content = models.TextField(null=True, blank=True)
    like_count = models.PositiveIntegerField(default=0)
    dislike_count = models.PositiveIntegerField(default=0)

    class Meta:
        db_table = 'articles'
        
    def __str__(self):
        return self.title if self.title else "No Title"
    
class UserInteraction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    articles = models.ForeignKey(Articles, on_delete=models.CASCADE)
    interaction_type = models.CharField(max_length=10)  # 'like' or 'dislike'

    class Meta:
        unique_together = ('user', 'articles', 'interaction_type')