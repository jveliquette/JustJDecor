import json
import requests
import os

PEXELS_API_KEY = os.environ["PEXELS_API_KEY"]

def search_inspiration(query):
    headers = {"Authorization": PEXELS_API_KEY}
    params = {
        "query": query,
        "per_page": 50,
    }
    url = "https://api.pexels.com/v1/search"
    response = requests.get(url, params=params, headers=headers)
    content = json.loads(response.content)

    photos = []
    try:
        for photo in content["photos"]:
            photos.append({
                "picture_url": photo["src"]["original"],
            })
        return {"photos": photos}
    except KeyError:
        return {"photos": []}

def main_page(query):
    headers = {"Authorization": PEXELS_API_KEY}
    params = {
        "query": query,
        "per_page": 10,
    }
    url = "https://api.pexels.com/v1/search"
    response = requests.get(url, params=params, headers=headers)
    content = response.json()

    photos = []
    try:
        for photo in content.get("photos", []):
            photos.append({
                "id": photo["id"],
                "picture_url": photo["src"]["original"],
                "alt": photo.get("alt", "No description available"),
            })
        return {"photos": photos}
    except KeyError:
        return {"photos": []}
