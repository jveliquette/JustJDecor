import json
import requests
import os

PEXELS_API_KEY = os.getenv("PEXELS_API_KEY", "")
print(f"PEXELS_API_KEY: {PEXELS_API_KEY}")

def search_inspiration(query):
    headers = {
        "Authorization": PEXELS_API_KEY,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
        }
    params = {
        "query": query,
        "per_page": 50,
    }
    url = "https://api.pexels.com/v1/search"

    print(f"Requesting URL: {url} with params: {params} and headers: {headers}")

    response = requests.get(url, params=params, headers=headers)

    print(f"Response status code: {response.status_code}")
    print(f"Response headers: {response.headers}")
    print(f"Response content: {response.content}")

    if response.status_code != 200:
        return {"error": f"Failed to get data from Pexels API. Status: {response.status_code}", "details": response.content}

    try:
        content = response.json()
    except json.JSONDecodeError:
        print(f"Failed to decode JSON: {response.content}")
        return {"error": "Invalid JSON response from Pexels API"}

    photos = []
    try:
        for photo in content.get("photos", []):
            photos.append({
                "picture_url": photo["src"]["original"],
            })
        return {"photos": photos}
    except KeyError:
        print("KeyError: 'photos' not found in response content")
        return {"error": "Unexpected response format from Pexels API", "content": content}

def main_page(query):
    headers = {
        "Authorization": PEXELS_API_KEY,
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"
    }
    params = {
        "query": query,
        "per_page": 10,
    }
    url = "https://api.pexels.com/v1/search"

    print(f"Requesting URL: {url} with params: {params} and headers: {headers}")

    try:
        response = requests.get(url, params=params, headers=headers)

        print(f"Response status code: {response.status_code}")
        print(f"Response headers: {response.headers}")
        print(f"Response content: {response.content}")

        if response.status_code != 200:
            return {"error": f"Failed to get data from Pexels API. Status: {response.status_code}", "details": response.content}

        try:
            content = response.json()
        except json.JSONDecodeError:
            print(f"Failed to decode JSON: {response.content}")
            return {"error": "Invalid JSON response from Pexels API"}

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
            print("KeyError: 'photos' not found in response content")
            return {"error": "Unexpected response format from Pexels API", "content": content}

    except requests.exceptions.RequestException as e:
        print(f"Error fetching from Pexels API: {e}")
        return {"error": "Failed to fetch main photos from Pexels API", "details": str(e)}
