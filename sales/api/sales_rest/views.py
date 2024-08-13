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
    print("Get request working")
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

#@require_http_methods(["DELETE", "GET"])
#def show_salesperson(request, id):
 #   if request.method == "GET":
  #      try:
   #         salesperson = Salesperson.objects.get(id=id)
    #        return JsonResponse(
     #           salesperson,
      #          encoder=SalespersonEncoder,
       #         safe=False
        #    )
    #try:
     #   if request.method == "DELETE":
      #      count, _ = Salesperson.objects.filter(id=id).delete()
       #     return JsonResponse({ "deleted": count > 0})
       # e
