from django.contrib import admin
from .models import AutomobileVO, Salesperson, Customer, Sale

# Register your models here.
@admin.register(AutomobileVO)
class AutomobileVO(admin.ModelAdmin):
    pass

@admin.register(Salesperson)
class Salesperson(admin.ModelAdmin):
    pass

admin.register(Customer)
class Customer(admin.ModelAdmin):
    pass

admin.register(Sale)
class Sale(admin.ModelAdmin):
    pass
