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
#This function is fully operational. It handles the list of salespeople and creating salesperson
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

#This function is fully operational. It handles requests for salesperson
@require_http_methods(["DELETE", "PUT", "GET"])
def show_salesperson(request, id):
    try:
        if request.method == "DELETE":
            count, _ = Salesperson.objects.filter(id=id).delete()
            return JsonResponse({ "deleted": count > 0})
        elif request.method == "PUT":
            salesperson = Salesperson.objects.get(id=id)
            content = json.loads(request.body)
            Salesperson.objects.filter(id=id).update(**content)
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(salesperson, encoder=SalespersonEncoder, safe=False)
        else:
            salesperson = Salesperson.objects.get(id=id)
            return JsonResponse(salesperson, encoder=SalespersonEncoder, safe=False)
    except Salesperson.DoesNotExist:
        return JsonResponse({"message": "Salesperson not found"}, status=404)

#This function is fully operational. It handles the list of customers and creating customer
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

#This function is fully operational. It handles requests for customer
@require_http_methods(["DELETE", "PUT", "GET"])
def show_customer(request, id):
    try:
        if request.method == "DELETE":
            count, _ = Customer.objects.filter(id=id).delete()
            return JsonResponse({ "deleted": count > 0})
        elif request.method == "PUT":
            customer = Customer.objects.get(id=id)
            content = json.loads(request.body)
            Customer.objects.filter(id=id).update(**content)
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
        else:
            customer = Customer.objects.get(id=id)
            return JsonResponse(customer, encoder=CustomerEncoder, safe=False)
    except Customer.DoesNotExist:
        return JsonResponse({"message": "Customer not found"}, status=404)

#This is get/create for Sales it works
@require_http_methods(["GET", "POST"])
def list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder
        )
    else:
        if request.content_type == "application/json":
            content = json.loads(request.body)
            try:
                automobile = AutomobileVO.objects.get(id=content["automobile"])
                content["automobile"] = automobile
                salesperson = Salesperson.objects.get(id=content["salesperson"])
                content["salesperson"] = salesperson
                customer = Customer.objects.get(id=content["customer"])
                content["customer"] = customer
                sale = Sale.objects.create(**content)
                return JsonResponse(
                    sale,
                    encoder=SaleEncoder,
                    safe=False,
                    status=201)
            except AutomobileVO.DoesNotExist:
                return JsonResponse({"message": "Automobile does not exist"}, status=400)
        else:
                return JsonResponse({"message": "Incorrectly formatted request body. Request body must be of type: application/json"}, status=400)

#This is the get/update/delete for sale. THIS DRAFT UNTESTED!!!
@require_http_methods(["DELETE", "PUT", "GET"])
def show_sale(request, id):
    try:
        if request.method == "DELETE":
            count, _ = Sale.objects.filter(id=id).delete()
            return JsonResponse({"deleted": count > 0})
        elif request.method == "PUT":
            sale = Sale.objects.get(id=id)
            content = json.loads(request.body)
            Sale.objects.filter(id=id).update(**content)
            sale = Sale.objects.get(id=id)
            return JsonResponse(sale, encoder=SaleEncoder, safe=False)
        else:
            sale = Sale.objects.get(id=id)
            return JsonResponse(sale, encoder=SaleEncoder, safe=False)
    except Sale.DoesNotExist:
        return JsonResponse({"message": "Sale not found"}, status=404)
