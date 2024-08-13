from django.urls import path
from .views import api_list_technicians, api_delete_technician

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:id>/", api_delete_technician, name="api_delete_technician"),
]
