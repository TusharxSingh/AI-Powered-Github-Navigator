import os
import requests
from dotenv import load_dotenv  # Import dotenv to load environment variables
from rest_framework.response import Response
from rest_framework.decorators import api_view

# Load environment variables from .env file
load_dotenv()

GITHUB_API_URL = "https://api.github.com/search/repositories"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")  # Read the token from environment variables

@api_view(['GET'])
def get_repositories(request):
    language = request.GET.get('language', 'python')  # Default: Python
    query = f"language:{language} stars:>100"
    
    headers = {"Authorization": f"token {GITHUB_TOKEN}"}
    response = requests.get(f"{GITHUB_API_URL}?q={query}&sort=stars", headers=headers)

    print(response.status_code, response.text)  # Debugging print statement

    if response.status_code == 200:
        return Response(response.json()['items'])
    
    return Response({"error": "Failed to fetch repositories", "details": response.text}, status=400)
