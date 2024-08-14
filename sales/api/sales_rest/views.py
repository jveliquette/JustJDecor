from django.shortcuts import render
from django.views.decorators.http import require_http_methods
from django.http import JsonResponse
import json
from common.json import ModelEncoder
from .models import Salesperson, Customer, Sale, AutomobileVO

class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO

    properties = [
        "vin",
        "sold",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer

    properties = [
        "id",
        "first_name",
        "last_name",
        "address",
        "phone_number",
    ]

class SalespersonEncoder(ModelEncoder):
    model = Salesperson

    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale

    properties = [
        "id",
        "price",
        "automobile",
        "salesperson",
        "customer",
    ]

    encoders = {
        "automobile": AutomobileVOEncoder(),
        "salesperson": SalespersonEncoder(),
        "customer": CustomerEncoder(),
    }

# Create your views here.
#This function will be for listing the salespeople. This is g2g
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
        salesperson = Salesperson.objects.create(**content)
        return JsonResponse(
            salesperson,
            encoder=SalespersonEncoder,
            safe=False,
        )

#Delete g2g
@require_http_methods(["DELETE", "GET"])
def show_salesperson(request, id):
    if request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=id).delete()
        return JsonResponse({ "deleted": count > 0})

#The code below is to list and create a customer. This is g2g
@require_http_methods(["GET", "POST"])
def list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder
        )
    else:
        content = json.loads(request.body)
        customer = Customer.objects.create(**content)
        return JsonResponse(
            customer,
            encoder=CustomerEncoder,
            safe=False,
        )

#Delete g2g
@require_http_methods(["DELETE", "GET"])
def show_customer(request, id):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=id).delete()
        return JsonResponse({ "deleted": count > 0})

#This is get/create for Sales
@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder
        )
    else:
        content = json.loads(request.body)
        sale = Sale.objects.create(**content)
        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False,
        )
