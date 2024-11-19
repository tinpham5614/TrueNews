from django.contrib import admin

from api.models import Articles, UserInteraction

# Register your models here.
admin.site.register(Articles)
admin.site.register(UserInteraction)