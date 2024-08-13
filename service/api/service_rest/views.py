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
        "id",
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

            # make sure all fields are included
            required_fields = ["first_name", "last_name", "employee_id"]
            for field in required_fields:
                if field not in content:
                    return JsonResponse(
                        {"Error": f"Missing required field: {field}"},
                        status=400,
                    )
            # create technician
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False
            )

        except json.JSONDecodeError:
            return JsonResponse(
                {"Error": "Invalid JSON"},
                status=400
            )

        except Technician.DoesNotExist:
            return JsonResponse(
                {"Error": "Technician not found."},
                status=404,
            )

        except Exception as e:
            return JsonResponse(
                {"Error": f"{str(e)}"},
                status=400
            )


# delete technician (DELETE)
@require_http_methods(["DELETE"])
def api_delete_technician(request, id):
    try:
        count, _ = Technician.objects.filter(id=id).delete()
        return JsonResponse({"Deleted": count > 0})
    except Technician.DoesNotExist:
        return JsonResponse(
                {"Error": "Technician not found."},
                status=404,
            )

# list appointments, add appointment (GET, POST)
@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": list(appointments)},
            encoder=AppointmentEncoder,
            safe=False
        )
    else:
        try:
            content = json.loads(request.body)

            # make sure all fields are included
            required_fields = ["date_time", "reason", "status", "vin", "customer", "technician"]
            for field in required_fields:
                if field not in content:
                    return JsonResponse(
                        {"Error": f"Missing required field: {field}"},
                        status=400,
                    )
            # make sure technician exists
            try:
                technician = Technician.objects.get(id=content["technician"])
            except Technician.DoesNotExist:
                return JsonResponse(
                    {"Error": "Technician not found."},
                    status=404,
                )
            # create appointment
            appointment = Appointment.objects.create(
                date_time=content["date_time"],
                reason=content["reason"],
                status=content["status"],
                vin=content["vin"],
                customer=content["customer"],
                technician=technician
            )
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )

        except json.JSONDecodeError:
            return JsonResponse(
                {"Error": "Invalid JSON"},
                status=400
            )

        except Exception as e:
            return JsonResponse(
                {"Error": f"{str(e)}"},
                status=400
            )


# delete appointment (DELETE)
@require_http_methods(["DELETE"])
def api_delete_appointment():
    pass

# update appointment status to "canceled" or "finished" (PUT)
@require_http_methods(["PUT"])
def api_update_appointment_status():
    pass
