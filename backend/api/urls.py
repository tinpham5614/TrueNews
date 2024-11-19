from django.urls import path, include
from api.profile.views import UserViewSet
from api.articles.views import fetch_and_save_articles, get_articles, increment_dislike_count, increment_like_count
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
    path('get_articles/', get_articles, name='get_articles'),
    path('fetch_and_save_articles/', fetch_and_save_articles, name='fetch_and_save_articles'),
    path('increment_like_count/<int:article_id>/', increment_like_count, name='increment_like_count'),
    path('increment_dislike_count/<int:article_id>/', increment_dislike_count, name='increment_dislike_count'),
]
