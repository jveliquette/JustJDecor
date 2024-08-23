from django.urls import path
from .views import (
    api_rooms, api_room, api_projects, api_project,
    api_wishlist_items, api_wishlist_item, api_pins,
    api_pin, api_user_profiles, api_user_profile,
    api_search_inspiration, api_main_photos, api_projects_by_room
)

urlpatterns = [
    path('rooms/', api_rooms, name='api_rooms'),
    path('rooms/<int:pk>/', api_room, name='api_room'),

    path('projects/', api_projects, name='api_projects'),
    path('projects/<int:id>/', api_project, name='api_project'),
    path('rooms/<int:room_id>/projects/', api_projects_by_room, name='api_projects_by_room'),

    path('wishlist-items/', api_wishlist_items, name='api_wishlist_items'),
    path('wishlist-items/<int:id>/', api_wishlist_item, name='api_wishlist_item'),

    path('pins/', api_pins, name='api_pins'),
    path('pins/<int:id>/', api_pin, name='api_pin'),

    path('user-profiles/', api_user_profiles, name='api_user_profiles'),
    path('user-profiles/<int:id>/', api_user_profile, name='api_user_profile'),

    path('search-inspiration/', api_search_inspiration, name='api_search_inspiration'),
    path('main-photos/', api_main_photos, name='api_main_photos')
]
