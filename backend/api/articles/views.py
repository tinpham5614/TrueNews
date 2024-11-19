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
                "content": article.content,
                "likeCount": article.like_count,
                "dislikeCount": article.dislike_count,
            })
            if request.user.is_authenticated:
                user_interaction = UserInteraction.objects.filter(user=request.user, articles=article).first()
                if user_interaction:
                    user_interaction = user_interaction.interaction_type
                else:
                    user_interaction = None
                articles_data[-1]["userInteraction"] = user_interaction
                                    
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
@permission_classes([IsAuthenticated])
def increment_like(request, article_id):
    try:
        user = request.user
        article = Articles.objects.get(id=article_id)
        
        # Check if the user has already interacted with the article
        interaction = UserInteraction.objects.filter(user=user, articles=article).first()
        if interaction:
            if interaction.interaction_type == 'like':
                return JsonResponse({"error": "You have already liked this article"}, status=400)
            elif interaction.interaction_type == 'dislike':
                # Remove the dislike
                interaction.delete()
                article.dislike_count -= 1
        
        article.like_count += 1
        article.save()
        
        # Record the like interaction
        UserInteraction.objects.create(user=user, articles=article, interaction_type='like')
        
        return JsonResponse({"message": "Like count incremented", "like_count": article.like_count}, status=200)
    except Articles.DoesNotExist:
        return JsonResponse({"error": "Articles article not found"}, status=404)
    except Exception as e:
        logger.error(f"Error in increment_like: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def increment_dislike(request, article_id):
    try:
        user = request.user
        article = Articles.objects.get(id=article_id)
        
        # Check if the user has already interacted with the article
        interaction = UserInteraction.objects.filter(user=user, articles=article).first()
        if interaction:
            if interaction.interaction_type == 'dislike':
                return JsonResponse({"error": "You have already disliked this article"}, status=400)
            elif interaction.interaction_type == 'like':
                # Remove the like
                interaction.delete()
                article.like_count -= 1
        
        article.dislike_count += 1
        article.save()
        
        # Record the like interaction
        UserInteraction.objects.create(user=user, articles=article, interaction_type='dislike')

        return JsonResponse({"message": "Dislike count incremented"}, status=200)
    except Articles.DoesNotExist:
        return JsonResponse({"error": "Article not found"}, status=404)
    except Exception as e:
        logger.error(f"Error in increment_dislike_count: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def undo_like(request, article_id):
    try:
        user = request.user
        article = Articles.objects.get(id=article_id)
        
        # Check if the user has liked the article
        interaction = UserInteraction.objects.filter(user=user, articles=article, interaction_type='like').first()
        if not interaction:
            return JsonResponse({"error": "You have not liked this article"}, status=400)
        
        article.like_count -= 1
        article.save()
        
        # Remove the like interaction
        interaction.delete()
        
        return JsonResponse({"message": "Like count decremented"}, status=200)
    except Articles.DoesNotExist:
        return JsonResponse({"error": "Article not found"}, status=404)
    except Exception as e:
        logger.error(f"Error in undo_like: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def undo_dislike(request, article_id):
    try:
        user = request.user
        article = Articles.objects.get(id=article_id)
        
        # Check if the user has disliked the article
        interaction = UserInteraction.objects.filter(user=user, articles=article, interaction_type='dislike').first()
        if not interaction:
            return JsonResponse({"error": "You have not disliked this article"}, status=400)
        
        article.dislike_count -= 1
        article.save()
        
        # Remove the dislike interaction
        interaction.delete()
        
        return JsonResponse({"message": "Dislike count decremented"}, status=200)
    except Articles.DoesNotExist:
        return JsonResponse({"error": "Article not found"}, status=404)
    except Exception as e:
        logger.error(f"Error in undo_dislike: {e}")
        return JsonResponse({"error": "An error occurred"}, status=500)
    
        