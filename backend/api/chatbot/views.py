import requests
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from urllib.parse import urljoin

# Define the Ollama server URL
OLLAMA_API_BASE = "http://host.docker.internal:11434"  # No trailing slash

@api_view(['POST'])
# @permission_classes([IsAuthenticated])  # Uncomment if authentication is required
def chatbot(request):
    try:
        # Extract user message from the POST request
        user_message = request.data.get('message')
        if not user_message:
            return Response({"error": "Message is required"}, status=400)

        # Prepare the payload for Ollama API
        payload = {
            "model": "llama3.2",  # Specify the model name
            "messages": [
                {"role": "system", "content": "I'm a chatbot. How can I help you today?"},
                {"role": "user", "content": user_message}
            ],
            "stream": False
        }

        # Send the request to Ollama
        OLLAMA_CHAT_URL = urljoin(OLLAMA_API_BASE, "/api/chat")
        headers = {
            "Content-Type": "application/json",
        }
        response = requests.post(OLLAMA_CHAT_URL, json=payload, headers=headers, timeout=10)
        response.raise_for_status()
        
        # Extract the assistant's response content
        response_data = response.json()
        assistant_message = response_data.get("message", {}).get("content", "No response generated.")

        # Return the chatbot response content to the user
        return Response({"systemResponse": assistant_message}, status=200)

    except requests.exceptions.RequestException as e:
        # Handle network or server errors
        return Response({"error": f"Failed to connect to Ollama: {str(e)}"}, status=500)
    except Exception as e:
        # Handle other exceptions
        return Response({"error": str(e)}, status=500)
