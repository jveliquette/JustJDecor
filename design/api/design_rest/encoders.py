from common.json import ModelEncoder
from .models import Room, Project, WishlistItem, Pin, UserProfile

class RoomEncoder(ModelEncoder):
    model = Room
    properties = [
        "id",
        "name",
        "image_url",
    ]

class ProjectEncoder(ModelEncoder):
    model = Project
    properties = [
        "id",
        "name",
        "description",
        "room",
        "created_at",
    ]
    encoders = {
        "room": RoomEncoder(),
    }

class WishlistItemEncoder(ModelEncoder):
    model = WishlistItem
    properties = [
        "id",
        "title",
        "image_url",
        "purchase_link",
        "description",
        "added_at",
        "status",
        "purchase_date",
        "notes",
        "project",
    ]
    encoders = {
        "project": ProjectEncoder(),
    }

class PinEncoder(ModelEncoder):
    model = Pin
    properties = [
        "id",
        "title",
        "image_url",
        "description",
        "pinned_at",
        "project",
    ]
    encoders = {
        "project": ProjectEncoder(),
    }

class UserProfileEncoder(ModelEncoder):
    model = UserProfile
    properties = [
        "id",
        "user",
        "bio",
    ]
