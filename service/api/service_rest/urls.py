from django.urls import path
from .views import api_list_technicians, api_delete_technician, api_list_appointments, api_delete_appointment, api_update_appointment_status

urlpatterns = [
    path("technicians/", api_list_technicians, name="api_list_technicians"),
    path("technicians/<int:id>/", api_delete_technician, name="api_delete_technician"),
    path("appointments/", api_list_appointments, name="api_list_appointments"),
    path("appointments/<int:id>/", api_delete_appointment, name="api_delete_appointment"),
    path("appointments/<int:id>/<str:status>/", api_update_appointment_status, name="api_update_appointment_status"),
]
