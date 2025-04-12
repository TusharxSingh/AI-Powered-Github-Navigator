import os
import random
import requests
from dotenv import load_dotenv
from rest_framework.response import Response
from rest_framework.decorators import api_view

load_dotenv()

GITHUB_API_URL = "https://api.github.com/search/repositories"
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")

@api_view(['GET'])
def get_repositories(request):
    query = request.GET.get('language', 'python')
    page = random.randint(1, 10)  # Random page for more variety
    per_page = 12  # Number of repos to fetch each time

    search_query = f"{query} in:name,description"  # Search by name/desc

    headers = {
        "Authorization": f"token {GITHUB_TOKEN}",
        "Accept": "application/vnd.github+json"
    }

    url = f"{GITHUB_API_URL}?q={search_query}&sort=stars&order=desc&page={page}&per_page={per_page}"
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        items = response.json().get('items', [])
        return Response(items)
    
    return Response({
        "error": "Failed to fetch repositories",
        "details": response.text
    }, status=400)
