from django.http import JsonResponse
from .services import fetch_news_from_source, save_news_to_db
from api.models import News
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_news(request):
    try:
        articles = News.objects.all().order_by('-published_at')
        articles_data = []
        for article in articles:
            if not article.url_to_image:
                article.url_to_image = " https://fakeimg.pl/300x170?text=No+Image "
            articles_data.append({
                "source": article.source,
                "author": article.author,
                "title": article.title,
                "description": article.description,
                "url": article.url,
                "urlToImage": article.url_to_image,
                "publishedAt": article.published_at,
                "content": article.content
            })
                        
        return JsonResponse({"articles": articles_data, "totalResults": len(articles)}, status=200)
    except Exception as e:
        logger.error(f"Error in get_news: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)

@api_view(['POST'])
def fetch_and_save_news(request):
    try:
        articles = fetch_news_from_source()
        if articles:
            saved_articles = save_news_to_db(articles)
            return JsonResponse({"message": f"Fetched and saved {len(saved_articles)} articles"}, status=200)
        return JsonResponse({"error": "Failed to fetch news"}, status=500)
    except Exception as e:
        logger.error(f"Error in fetch_and_save_news: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)