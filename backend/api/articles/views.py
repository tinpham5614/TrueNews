from django.http import JsonResponse
from .services import fetch_articles_from_source, save_articles_to_db
from api.models import Articles, UserInteraction
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes, api_view
import logging

logger = logging.getLogger(__name__)

@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def get_articles(request):
    try:
        articles = Articles.objects.all().order_by('-published_at')
        articles_data = []
        for article in articles:
            if not article.url_to_image:
                article.url_to_image = " https://fakeimg.pl/300x170?text=No+Image "
            articles_data.append({
                "id": article.id,
                "source": article.source,
                "author": article.author,
                "title": article.title,
                "description": article.description,
                "url": article.url,
                "urlToImage": article.url_to_image,
                "publishedAt": article.published_at,
                "content": article.content
            })
            
            if article.like_count is None:
                article.like_count = 0
            if article.dislike_count is None:
                article.dislike_count = 0
            articles_data[-1]["likeCount"] = article.like_count
            articles_data[-1]["dislikeCount"] = article.dislike_count
            
            # if article dislike count is greate than the like count, then remove the article
            if article.dislike_count - article.like_count > 0.5:
                article.delete()
                articles_data.pop()        
                        
        return JsonResponse({"articles": articles_data, "totalResults": len(articles)}, status=200)
    except Exception as e:
        logger.error(f"Error in get_articles: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)

@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def fetch_and_save_articles(request):
    try:
        articles = fetch_articles_from_source()
        if articles:
            saved_articles = save_articles_to_db(articles)
            return JsonResponse({"message": f"Fetched and saved {len(saved_articles)} articles"}, status=200)
        return JsonResponse({"error": "Failed to fetch articles"}, status=500)
    except Exception as e:
        logger.error(f"Error in fetch_and_save_articles: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)
    
@api_view(['POST'])
# @permission_classes([IsAuthenticated])
def increment_like_count(request, article_id):
    try:
        user = request.user
        articles = Articles.objects.get(id=article_id)
        
        # Check if the user has already liked the article
        if UserInteraction.objects.filter(user=user, articles=articles, interaction_type='like').exists():
            return JsonResponse({"error": "You have already liked this article"}, status=400)
        
        # Check if the user has disliked the article before
        if UserInteraction.objects.filter(user=user, articles=articles, interaction_type='dislike').exists():
            # Remove the dislike
            UserInteraction.objects.filter(user=user, articles=articles, interaction_type='dislike').delete()
            articles.dislike_count -= 1
        
        articles.like_count += 1
        articles.save()
        
        # Record the like interaction
        UserInteraction.objects.create(user=user, articles=articles, interaction_type='like')
        
        return JsonResponse({"message": "Like count incremented", "like_count": articles.like_count}, status=200)
    except Articles.DoesNotExist:
        return JsonResponse({"error": "Articles article not found"}, status=404)
    except Exception as e:
        logger.error(f"Error in increment_like: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)
    
@api_view(['POST'])
def increment_dislike_count(request, article_id):
    try:
        article = Articles.objects.get(id=article_id)
        article.dislike_count += 1
        article.save()
        return JsonResponse({"message": "Dislike count incremented"}, status=200)
    except Exception as e:
        logger.error(f"Error in increment_dislike_count: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)
    
        