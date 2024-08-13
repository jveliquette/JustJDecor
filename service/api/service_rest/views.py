from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import Technician, AutomobileVO, Appointment

# Create your views here.

class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "vin",
        "sold",
    ]

class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "first_name",
        "last_name",
        "employee_id",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "date_time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }


# list technicians, add technician (GET, POST)
@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": list(technicians)},
            encoder=TechnicianEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)
            if "first_name" not in content or "last_name" not in content or "employee_id" not in content:
                return JsonResponse(
                    {"Error": "Missing required field."},
                    status=400,
                )
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )

        except Technician.DoesNotExist:
            return JsonResponse(
                {"Error": "Technician not found."},
                status=404,
            )

# delete technician (DELETE)
@require_http_methods(["DELETE"])
def api_delete_technician():
    pass

# list appointments, add appointment (GET, POST)
@require_http_methods(["GET", "POST"])
def api_list_appointments():
    pass

# delete appointment (DELETE)
@require_http_methods(["DELETE"])
def api_delete_appointment():
    pass

# update appointment status to "canceled" or "finished" (PUT)
@require_http_methods(["PUT"])
def api_update_appointment_status():
    pass
