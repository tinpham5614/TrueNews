import json
from rest_framework import viewsets
from django.http import JsonResponse
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_exempt

@ensure_csrf_cookie
def set_csrf_token(request):
    return JsonResponse({"detail": "CSRF cookie set."})