from django.contrib import admin
from .models import Manufacturer, VehicleModel, Automobile

@admin.register(Manufacturer)
class Manufacturer(admin.ModelAdmin):
    pass

@admin.register(VehicleModel)
class VehicleModel(admin.ModelAdmin):
    pass

@admin.register(Automobile)
class Automobile(admin.ModelAdmin):
    pass
