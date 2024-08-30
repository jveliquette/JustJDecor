from django.db import models
from django.contrib.auth.models import User


class Room(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image_url = models.URLField(max_length=500, null=True, blank=True)

    def __str__(self):
        return self.name

class Project(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True, null=True)
    room = models.ForeignKey(
        Room,
        on_delete=models.CASCADE,
        related_name="projects"
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Note(models.Model):
    content = models.TextField()
    completed = models.BooleanField(default=False)
    room = models.ForeignKey(Room, related_name='notes', on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.content} ({'Completed' if self.completed else 'Incomplete'})"

class WishlistItem(models.Model):
    STATUS_CHOICES = [
        ('wishlist', 'Wishlist'),
        ('purchased', 'Purchased'),
    ]
    title = models.CharField(max_length=200)
    image_url = models.URLField(max_length=200)
    purchase_link = models.URLField(max_length=200, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    added_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='wishlist')
    purchase_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True, null=True)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="wishlistitems"
    )

    def __str__(self):
        return self.title

class Pin(models.Model):
    title = models.CharField(max_length=200)
    image_url = models.URLField(max_length=200)
    description = models.TextField(blank=True, null=True)
    pinned_at = models.DateTimeField(auto_now_add=True)
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        related_name="pins"
    )

    def __str__(self):
        return self.title

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.user.username
