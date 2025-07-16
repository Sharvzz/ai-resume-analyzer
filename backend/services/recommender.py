import os
import requests
from bs4 import BeautifulSoup

# Recommended: Use environment variable
YOUTUBE_API_KEY = os.getenv("YOUTUBE_API_KEY")

# For quick testing only (not secure for production)
if not YOUTUBE_API_KEY:
    YOUTUBE_API_KEY = "AIzaSyAlj63bLxuqTB5qoEMtWy8f05dVqg16s74"

def get_youtube_course(skill):
    if not YOUTUBE_API_KEY:
        return None
    search_url = "https://www.googleapis.com/youtube/v3/search"
    params = {
        "part": "snippet",
        "q": f"{skill} course",
        "type": "video",
        "key": YOUTUBE_API_KEY,
        "maxResults": 1
    }
    response = requests.get(search_url, params=params)
    if response.status_code != 200:
        return None
    results = response.json().get("items", [])
    if results:
        video = results[0]
        title = video["snippet"]["title"]
        url = f"https://www.youtube.com/watch?v={video['id']['videoId']}"
        return {"title": title, "url": url}
    return None

def get_coursera_courses(skill):
    url = f"https://www.coursera.org/search?query={skill}"
    headers = {
        "User-Agent": "Mozilla/5.0"
    }
    try:
        response = requests.get(url, headers=headers, timeout=10)
        print("Coursera HTML response:", response.text[:500])  # Print first 500 chars for debug
        if response.status_code != 200:
            return []
        soup = BeautifulSoup(response.text, "html.parser")
        results = []
        for a in soup.select('a[data-click-key="search.search.click.search_card"]'):
            title = a.get("aria-label")
            href = a.get("href")
            if title and href and href.startswith("/learn/"):
                course_url = f"https://www.coursera.org{href}"
                results.append({"title": title, "url": course_url})
            if len(results) >= 2:
                break
        return results
    except Exception as e:
        print("Coursera scraping error:", e)
        return []

def get_recommendation(missing_skills: list[str]) -> dict:
    recommendations = {}
    for skill in missing_skills:
        courses = []
        yt_course = get_youtube_course(skill)
        if yt_course:
            courses.append(yt_course)
        coursera_courses = get_coursera_courses(skill)
        courses.extend(coursera_courses)
        recommendations[skill] = courses
    return recommendations

from flask import Blueprint, request, jsonify
from services.recommender import get_recommendation

resume_bp = Blueprint('resume', __name__)

@resume_bp.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    missing_skills = data.get('missing_skills', [])
    recommendations = get_recommendation(missing_skills)
    return jsonify(recommendations)

if __name__ == '__main__':
    app.run(debug=True)
