from django.db import models

# Create your models here.

class Technician(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_id = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.employee_id})"

class AutomobileVO(models.Model):
    vin = models.CharField(max_length=17, unique=True)
    sold = models.BooleanField(default=False)

    def __str__(self):
        return self.vin

class Appointment(models.Model):
    date_time = models.DateTimeField()
    reason = models.TextField()
    status = models.CharField(max_length=10, choices=[("scheduled", "Scheduled"), ("canceled", "Canceled"), ("finished", "Finished")], default="scheduled") # add choices and default
    vin = models.CharField(max_length=17)
    customer = models.CharField(max_length=100)
    technician = models.ForeignKey(
        Technician,
        related_name="appointment",
        on_delete=models.CASCADE,
    )

    def __str__(self):
        return f"Appointment for {self.vin} with {self.technician}"
