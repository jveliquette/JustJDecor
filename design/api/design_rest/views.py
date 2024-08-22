from django.http import JsonResponse
from django.shortcuts import render, get_object_or_404
from django.views.decorators.http import require_http_methods
import json
from .models import Room, Project, WishlistItem, Pin, UserProfile
from .encoders import RoomEncoder, ProjectEncoder, WishlistItemEncoder, PinEncoder, UserProfileEncoder

@require_http_methods(["GET", "POST"])
def api_rooms(request):
    if request.method == "GET":
        rooms = Room.objects.all()
        return JsonResponse(
            {"rooms": rooms},
            encoder=RoomEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            room = Room.objects.create(**content)
            return JsonResponse(
                room,
                encoder=RoomEncoder,
                safe=False
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the room"}
            )
            response.status_code = 400
            return response

@require_http_methods(["DELETE", "GET", "PUT"])
def api_room(request, pk):
    if request.method == "GET":
        try:
            room = Room.objects.get(id=pk)
            return JsonResponse(
                room,
                encoder=RoomEncoder,
                safe=False
            )
        except Room.DoesNotExist:
            response = JsonResponse({"message": "Room does not exist"})
            response.status_code = 404
            return response
    elif request.method == "DELETE":
        try:
            room = Room.objects.get(id=pk)
            room.delete()
            return JsonResponse(
                room,
                encoder=RoomEncoder,
                safe=False,
            )
        except Room.DoesNotExist:
            return JsonResponse({"message": "Room does not exist"})
    else: # PUT
        try:
            content = json.loads(request.body)
            room = Room.objects.get(id=pk)

            props = ["name", "room_type", "description"]
            for prop in props:
                if prop in content:
                    setattr(room, prop, content[prop])
            room.save()
            return JsonResponse(
                room,
                encoder=RoomEncoder,
                safe=False,
            )
        except Room.DoesNotExist:
            response = JsonResponse({"message": "Room does not exist"})
            response.status_code = 404
            return response



@require_http_methods(["GET", "POST"])
def api_projects(request):
    if request.method == "GET":
        projects = Project.objects.all()
        return JsonResponse(
            {"projects": projects},
            encoder=ProjectEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        project = Project.objects.create(**content)
        return JsonResponse(
            project,
            encoder=ProjectEncoder,
            safe=False
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_project(request, id):
    if request.method == "GET":
        project = get_object_or_404(Project, id=id)
        return JsonResponse(
            project,
            encoder=ProjectEncoder,
            safe=False
        )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            project = get_object_or_404(Project, id=id)
            if "name" in content:
                project.name = content["name"]
            if "description" in content:
                project.description = content["description"]
            project.save()
            return JsonResponse(
                project,
                encoder=ProjectEncoder,
                safe=False
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )
    elif request.method == "DELETE":
        project = get_object_or_404(Project, id=id)
        project.delete()
        return JsonResponse({"deleted": True})



@require_http_methods(["GET", "POST"])
def api_wishlist_items(request):
    if request.method == "GET":
        wishlist_items = WishlistItem.objects.all()
        return JsonResponse(
            {"wishlist_items": wishlist_items},
            encoder=WishlistItemEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        wishlist_item = WishlistItem.objects.create(**content)
        return JsonResponse(
            wishlist_item,
            encoder=WishlistItemEncoder,
            safe=False
        )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_wishlist_item(request, id):
    if request.method == "GET":
        wishlist_item = get_object_or_404(WishlistItem, id=id)
        return JsonResponse(
            wishlist_item,
            encoder=WishlistItemEncoder,
            safe=False
        )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            wishlist_item = get_object_or_404(WishlistItem, id=id)
            if "status" in content:
                wishlist_item.status = content["status"]
            if "purchase_date" in content:
                wishlist_item.purchase_date = content["purchase_date"]
            if "notes" in content:
                wishlist_item.notes = content["notes"]
            wishlist_item.save()
            return JsonResponse(
                wishlist_item,
                encoder=WishlistItemEncoder,
                safe=False
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )
    elif request.method == "DELETE":
        wishlist_item = get_object_or_404(WishlistItem, id=id)
        wishlist_item.delete()
        return JsonResponse({"deleted": True})



@require_http_methods(["GET", "POST"])
def api_pins(request):
    if request.method == "GET":
        pins = Pin.objects.all()
        return JsonResponse(
            {"pins": pins},
            encoder=PinEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        pin = Pin.objects.create(**content)
        return JsonResponse(
            pin,
            encoder=PinEncoder,
            safe=False
        )

@require_http_methods(["DELETE"])
def api_pin(request, id):
    try:
        pin = Pin.objects.get(id=id)
        pin.delete()
        return JsonResponse({"Deleted": True})
    except Pin.DoesNotExist:
        return JsonResponse(
            {"Error": "Pin not found."},
            status=404,
        )



@require_http_methods(["GET", "POST"])
def api_user_profiles(request):
    if request.method == "GET":
        profiles = UserProfile.objects.all()
        return JsonResponse(
            {"user_profiles": profiles},
            encoder=UserProfileEncoder,
            safe=False
        )
    else:
        content = json.loads(request.body)
        profile = UserProfile.objects.create(**content)
        return JsonResponse(
            profile,
            encoder=UserProfileEncoder,
            safe=False
        )

@require_http_methods(["DELETE"])
def api_user_profile(request, id):
    try:
        profile = UserProfile.objects.get(id=id)
        profile.delete()
        return JsonResponse({"Deleted": True})
    except UserProfile.DoesNotExist:
        return JsonResponse(
                {"Error": "User not found."},
                status=404,
            )
