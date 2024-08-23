from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.http import require_http_methods
import json
import requests
from .acls import search_inspiration, main_page
from .models import Room, Project, WishlistItem, Pin, UserProfile, Note
from .encoders import RoomEncoder, ProjectEncoder, WishlistItemEncoder, PinEncoder, UserProfileEncoder, NoteEncoder

# Room Views
@require_http_methods(["GET", "POST"])
def api_rooms(request):
    if request.method == "GET":
        rooms = Room.objects.all()
        return JsonResponse(
            {"rooms": rooms},
            encoder=RoomEncoder,
            safe=False
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            room = Room.objects.create(**content)
            return JsonResponse(
                room,
                encoder=RoomEncoder,
                safe=False
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_room(request, pk):
    room = get_object_or_404(Room, id=pk)
    if request.method == "GET":
        return JsonResponse(
            room,
            encoder=RoomEncoder,
            safe=False
        )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            for prop in ["name", "image_url"]:
                if prop in content:
                    setattr(room, prop, content[prop])
            room.save()
            return JsonResponse(
                room,
                encoder=RoomEncoder,
                safe=False
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )
    elif request.method == "DELETE":
        room.delete()
        return JsonResponse(
            {"deleted": True}
        )



# Project Views
@require_http_methods(["GET", "POST"])
def api_projects(request):
    if request.method == "GET":
        projects = Project.objects.all()
        return JsonResponse(
            {"projects": projects},
            encoder=ProjectEncoder,
            safe=False
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            room_id = content.get("room")
            room = get_object_or_404(Room, id=room_id)
            content["room"] = room
            project = Project.objects.create(**content)
            return JsonResponse(
                project,
                encoder=ProjectEncoder,
                safe=False
            )
        except Room.DoesNotExist:
            return JsonResponse(
                {"error": "Room does not exist"},
                status=404
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_project(request, id):
    project = get_object_or_404(Project, id=id)
    if request.method == "GET":
        return JsonResponse(
            project,
            encoder=ProjectEncoder,
            safe=False
        )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            for prop in ["name", "description"]:
                if prop in content:
                    setattr(project, prop, content[prop])
            project.save()
            return JsonResponse(
                project,
                encoder=ProjectEncoder,
                safe=False
            )
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    elif request.method == "DELETE":
        project.delete()
        return JsonResponse(
            {"deleted": True}
        )

@require_http_methods(["GET"])
def api_projects_by_room(request, room_id):
    room = get_object_or_404(Room, id=room_id)
    projects = Project.objects.filter(room=room)
    return JsonResponse(
        {"projects": projects},
        encoder=ProjectEncoder,
        safe=False
    )



# Note Views
@require_http_methods(["GET", "POST"])
def api_notes(request, room_id):
    room = Room.objects.get(id=room_id)
    if request.method == "GET":
        notes = Note.objects.filter(room=room)
        return JsonResponse(
            {"notes": notes},
            encoder=NoteEncoder,
            safe=False
        )
    elif request.method == "POST":
        content = json.loads(request.body)
        note = Note.objects.create(room=room, **content)
        return JsonResponse(
            note,
            encoder=NoteEncoder,
            safe=False
        )

@require_http_methods(["PUT", "DELETE"])
def api_note(request, note_id):
    note = Note.objects.get(id=note_id)
    if request.method == "PUT":
        content = json.loads(request.body)
        note.content = content.get("content", note.content)
        note.completed = content.get("completed", note.completed)
        note.save()
        return JsonResponse(
            note,
            encoder=NoteEncoder,
            safe=False
        )
    elif request.method == "DELETE":
        note.delete()
        return JsonResponse(
            {"deleted": True}
        )



# WishlistItem Views
@require_http_methods(["GET", "POST"])
def api_wishlist_items(request):
    if request.method == "GET":
        wishlist_items = WishlistItem.objects.all()
        return JsonResponse(
            {"wishlist_items": wishlist_items},
            encoder=WishlistItemEncoder,
            safe=False
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            project_id = content.get("project")
            project = get_object_or_404(Project, id=project_id)
            content["project"] = project  # Convert project ID to a Project instance
            wishlist_item = WishlistItem.objects.create(**content)
            return JsonResponse(
                wishlist_item,
                encoder=WishlistItemEncoder,
                safe=False
            )
        except Project.DoesNotExist:
            return JsonResponse(
                {"error": "Project does not exist"},
                status=404
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )

@require_http_methods(["GET", "PUT", "DELETE"])
def api_wishlist_item(request, id):
    wishlist_item = get_object_or_404(WishlistItem, id=id)
    if request.method == "GET":
        return JsonResponse(
            wishlist_item,
            encoder=WishlistItemEncoder,
            safe=False
        )
    elif request.method == "PUT":
        try:
            content = json.loads(request.body)
            for prop in ["status", "purchase_date", "notes"]:
                if prop in content:
                    setattr(wishlist_item, prop, content[prop])
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
        wishlist_item.delete()
        return JsonResponse(
            {"deleted": True}
        )



# Pin Views
@require_http_methods(["GET", "POST"])
def api_pins(request):
    if request.method == "GET":
        pins = Pin.objects.all()
        return JsonResponse(
            {"pins": pins},
            encoder=PinEncoder,
            safe=False
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            project_id = content.get("project")
            project = get_object_or_404(Project, id=project_id)
            content["project"] = project  # Convert project ID to a Project instance
            pin = Pin.objects.create(**content)
            return JsonResponse(
                pin,
                encoder=PinEncoder,
                safe=False
            )
        except Project.DoesNotExist:
            return JsonResponse(
                {"error": "Project does not exist"},
                status=404
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )

@require_http_methods(["DELETE"])
def api_pin(request, id):
    pin = get_object_or_404(Pin, id=id)
    if request.method == "DELETE":
        pin.delete()
        return JsonResponse(
            {"deleted": True}
        )



# UserProfile Views
@require_http_methods(["GET", "POST"])
def api_user_profiles(request):
    if request.method == "GET":
        profiles = UserProfile.objects.all()
        return JsonResponse(
            {"user_profiles": profiles},
            encoder=UserProfileEncoder,
            safe=False
        )
    elif request.method == "POST":
        try:
            content = json.loads(request.body)
            user_id = content.get("user")
            user = get_object_or_404(UserProfile, id=user_id)
            content["user"] = user  # Replace the user ID with the actual User instance
            profile = UserProfile.objects.create(**content)
            return JsonResponse(
                profile,
                encoder=UserProfileEncoder,
                safe=False
            )
        except UserProfile.DoesNotExist:
            return JsonResponse(
                {"error": "User does not exist"},
                status=404
            )
        except Exception as e:
            return JsonResponse(
                {"error": str(e)},
                status=400
            )

@require_http_methods(["DELETE"])
def api_user_profile(request, id):
    profile = get_object_or_404(UserProfile, id=id)
    if request.method == "DELETE":
        profile.delete()
        return JsonResponse(
            {"deleted": True}
        )



# Pexels Views
@require_http_methods(["GET"])
def api_search_inspiration(request):
    query = request.GET.get("query")
    if not query:
        return JsonResponse(
            {"error": "Query parameter is required."},
            status=400
        )
    try:
        data = search_inspiration(query)
        return JsonResponse(
            data,
            safe=False
        )
    except requests.exceptions.RequestException as e:
        print(f"Error fetching from Pexels API: {e}")
        return JsonResponse(
            {"error": "Failed to fetch inspiration from Pexels."},
            status=500
        )


@require_http_methods(["GET"])
def api_main_photos(request):
    query = "home decor"
    try:
        data = main_page(query)
        return JsonResponse(
            data,
            safe=False
        )
    except requests.exceptions.RequestException as e:
        print(f"Error fetching from Pexels API: {e}")
        return JsonResponse(
            {"error": "Failed to fetch inspiration from Pexels."},
            status=500
        )
