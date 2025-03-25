from django.urls import path
from .views import get_repositories
from django.http import JsonResponse  # Import this

# A simple function to return a message when /api/ is accessed
def api_home(request):
    return JsonResponse({"message": "GitHub Navigator API is working!"})

urlpatterns = [
    path('', api_home),  # This handles /api/
    path('repos/', get_repositories),  # This handles /api/repos/
]
