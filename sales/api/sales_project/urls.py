"""sales_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from sales.api.sales_rest.views import list_salespeople

urlpatterns = [
    path('admin/', admin.site.urls),
    path(
        "salespeople/",
        list_salespeople,
        name="list_salespeople",
    ),
    path(
        "salespeople/:id/",
        show_salesperson,
        name="show_salesperson",
    ),
    path(
        "customers/",
        list_customers,
        name="list_customers",
    ),
    path(
        "api_customers/:id/",
        show_customer,
        name="show_customer",
    ),
    path(
        "sales/",
        list_sales,
        name="list_sales",
    ),
    path(
        "sales/:id/",
        show_sale,
        name="show_sale",
    )
]
