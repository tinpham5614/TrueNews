import json
import logging
from rest_framework import viewsets
from ..models import Match
from ..serializers import MatchSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

logger = logging.getLogger(__name__)


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    
# def get_team(request):
#     try:
#         team = request.GET.get()
    
#     except requests.exceptions.Timeout:
#         # Handle timeout
#         logger.error(f"Failed to fetch data from The Sport DB API timed out.")
#         return JsonResponse({"error": "Request to The Sport DB API timed out."})
    
#     except requests.exceptions.RequestException as e:
#         # Catch any request-related exceptions
#         logger.error(f"RequestException: {str(e)}")
#         return JsonResponse({"error": str(e)}, status=500)
        
    


@csrf_exempt  # Only use this if you're not handling CSRF tokens; it's better to handle them correctly
def predict_match(request):
    if request.method == 'POST':
        try:
            # Parse JSON body
            data = json.loads(request.body)
            team_1 = data.get('team_1')
            team_2 = data.get('team_2')

            if not team_1 or not team_2:
                return JsonResponse({'error': 'Both teams must be provided'}, status=400)

            # Simple prediction logic (replace with real ML model later)
            prediction = ""
            if len(team_1) > len(team_2): 
                prediction = f"{team_1} wins!"  
            else:
                prediction = f"{team_2} wins! 🎆🎆"
            return JsonResponse({'prediction': prediction})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
    
    # If it's not a POST request, return a method not allowed response
    return JsonResponse({'error': 'Only POST requests are allowed'}, status=405) 