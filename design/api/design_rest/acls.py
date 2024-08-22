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
