from django.db import models
from django.urls import reverse
from inventory.api.inventory_rest.models import Automobile

# Create your models here.
#AutomobileVO
class AutomobileVO(models.Model):
    import_href = models.CharField(max_length=200, unique=True)
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    model = models.ForeignKey(
        Automobile,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )

#Salesperson Model
class Salesperson(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.PositiveSmallIntegerField()

    def __str__(self):
        return f'{self.first_name} {self.last_name} {self.employee_id}'

    def get_api_url(self):
        return reverse("show_salesperson", kwargs={"id": self.id})

#Customer Model
class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)

    def __str__(self):
        return f'{self.first_name} {self.last_name} {self.address} {self.phone_number}'

    def get_api_url(self):
        return reverse("show_customer", kwargs={"id": self.id})

#Sale Model: Automobile foreign key need inventory to be complete
class Sale(models.Model):
    price = models.DecimalField(max_digits=6, decimal_places=2)

    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobiles",
        on_delete=models.CASCADE
    )

    salesperson = models.ForeignKey(
        Salesperson,
        related_name="salespersons",
        on_delete=models.CASCADE
    )

    customer = models.ForeignKey(
        Customer,
        related_name="customers",
        on_delete=models.CASCADE
    )

    def __str__(self):
        return f'{self.automobile.vin} {self.salesperson.first_name} {self.salesperson.last_name} {self.customer.first_name} {self.customer.last_name} {self.price} {self.salesperson.employee_id}'

    def get_api_url(self):
        return reverse("show_sale", kwargs={"id": self.id})
