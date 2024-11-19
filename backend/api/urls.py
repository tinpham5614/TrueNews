from django.urls import path, include
from api.profile.views import UserViewSet
from api.articles.views import fetch_and_save_articles, get_articles, increment_dislike, increment_like, undo_dislike, undo_like
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
    path('increment_like/<int:article_id>/', increment_like, name='increment_like'),
    path('increment_dislike/<int:article_id>/', increment_dislike, name='increment_dislike'),
    path('undo_like/<int:article_id>/', undo_like, name='undo_like'),
    path('undo_dislike/<int:article_id>/', undo_dislike, name='undo_dislike'),
]
