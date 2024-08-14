from django.contrib import admin
from .models import AutomobileVO, Salesperson, Customer, Sale

# Register your models here.
admin.site.register(AutomobileVO)
admin.site.register(Salesperson)
admin.site.register(Customer)
admin.site.register(Sale)
