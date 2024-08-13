from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import Salesperson

class SalespersonEncoder(ModelEncoder):
    model = Salesperson

    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

# Create your views here.
#This function will be for listing the salespeople
@require_http_methods(["GET", "POST"])
def list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder
        )
    else:
        content = json.loads(request.body)
        salesperson = Salesperson.object.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )
