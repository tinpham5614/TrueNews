from django.urls import path, include
from api.profile.views import UserViewSet
from api.news.views import fetch_and_save_news, get_news
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


from .views import set_csrf_token

router = DefaultRouter()
router.register(r'user', UserViewSet, basename='user')

urlpatterns = [
    path('', include(router.urls)),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('get_news/', get_news, name='get_news'),
    path('fetch_and_save_news/', fetch_and_save_news, name='fetch_and_save_news'),
]
