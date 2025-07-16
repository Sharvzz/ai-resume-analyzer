import os
import requests

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

def get_recommendation(missing_skills: list[str]) -> dict:
    skill_course_map = {
        "python": [
            {"title": "Python for Beginners", "url": "https://www.youtube.com/watch?v=_uQrJ0TkZlc"},
            {"title": "Coursera Python Basics", "url": "https://www.coursera.org/learn/python"},
        ],
        "machine learning": [
            {"title": "Intro to Machine Learning", "url": "https://www.youtube.com/watch?v=Gv9_4yMHFhI"},
        ],
        # Add more static mappings as needed
    }
    recommendations = {}
    for skill in missing_skills:
        key = skill.lower()
        courses = skill_course_map.get(key, [])
        if not courses:
            yt_course = get_youtube_course(skill)
            if yt_course:
                courses = [yt_course]
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
