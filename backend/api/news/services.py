# fetch news api


from datetime import timedelta
from django.utils import timezone
import os
import requests
import json
from application_db import settings
from api.models import News
import logging

logger = logging.getLogger(__name__)      

def fetch_news_from_source():
    url = os.getenv('NEWS_API_URL', 'Invalid URL')

    get_params = {
        'q': 'technology',
        'language': 'en',
        'from': timezone.now().date() - timedelta(days=7),
        'to': timezone.now().date(),
        # 'sortBy': 'publishedAt',
        'pageSize': 50,
        'apiKey': os.getenv('NEWS_API_KEY', 'Invalid key'),
    }
    
    headers = {
        'Content-Type': 'application/json'
    }
    
    try:
        response = requests.get(url, params=get_params, headers=headers)
        response.raise_for_status()
        news_data = response.json()
        articles = news_data.get("articles", [])
        
        logger.info(f"Fetched {len(articles)} articles from the API")
        return articles
    except requests.exceptions.RequestException as e:
        logger.error(f"Failed to fetch news: {e}")
        return []
    
def save_news_to_db(articles):
    saved_articles = []
    for article in articles:
        if article.get("source", {}).get("name") == "[Removed]":
            continue
        
        if News.objects.filter(title=article.get("title")).exists():
            continue                
        
        news = News(
            source=article.get("source", {}).get("name", "No source"),
            author=article.get("author", "No author"),
            title=article.get("title", "No title"),
            description=article.get("description", "No description"),
            url=article.get("url", "No URL"),
            url_to_image=article.get("urlToImage", "No image"),
            published_at=article.get("publishedAt", "No date"),
            content=article.get("content", "No content")                
        )
        news.save()
        saved_articles.append(news)
                
    logger.info(f"Saved {len(saved_articles)} new articles to the database")
    return saved_articles
