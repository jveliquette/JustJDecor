from django.urls import path
from .views import list_salespeople, show_salesperson, list_customers, show_customer, list_sales, show_sale

urlpatterns = [
    path(
        "salespeople/",
        list_salespeople,
        name="list_salespeople",
    ),
    path(
        "salespeople/<int:id>/",
        show_salesperson,
        name="show_salesperson",
    ),
    path(
        "customers/",
        list_customers,
        name="list_customers",
    ),
    path(
        "customers/<int:id>/",
        show_customer,
        name="show_customer",
    ),
    path(
        "sales/",
        list_sales,
        name="list_sales",
    ),
    path(
        "sales/<int:id>/",
        show_sale,
        name="show_sale",
    )
]
