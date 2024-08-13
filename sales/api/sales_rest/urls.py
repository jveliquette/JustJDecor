from django.urls import path
from .views import list_salespeople

urlpatterns = [
    path(
        "salespeople/",
        list_salespeople,
        name="list_salespeople",
    ),
  #  path(
  #      "salespeople/:id/",
   #     show_salesperson,
    #    name="show_salesperson",
    #),
    #path(
     #   "customers/",
      #  list_customers,
       # name="list_customers",
    #),
    #path(
     #   "api_customers/:id/",
      #  show_customer,
       # name="show_customer",
    #),
    #path(
     #   "sales/",
      #  list_sales,
       # name="list_sales",
    #),
    #path(
     #   "sales/:id/",
      #  show_sale,
       # name="show_sale",
    #)
]
