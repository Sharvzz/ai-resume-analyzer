skill_course_map = {
    "python": [
        {"title": "Python for Beginners", "url": "https://www.youtube.com/watch?v=_uQrJ0TkZlc"},
        {"title": "Coursera Python Basics", "url": "https://www.coursera.org/learn/python"},
    ],
    "flask": [
        {"title": "Flask Crash Course", "url": "https://www.youtube.com/watch?v=Z1RJmh_OqeA"},
        {"title": "Flask for Beginners", "url": "https://www.freecodecamp.org/news/learn-flask-build-a-crud-web-app-with-python/"},
    ],
    "react": [
        {"title": "React JS Tutorial", "url": "https://www.youtube.com/watch?v=bMknfKXIFA8"},
        {"title": "React - Official Docs", "url": "https://reactjs.org/docs/getting-started.html"},
    ],
    "docker": [
        {"title": "Docker for Beginners", "url": "https://www.youtube.com/watch?v=pTFZFxd4hOI"},
        {"title": "Docker Docs", "url": "https://docs.docker.com/get-started/"},
    ],
    # Add more as needed
}

def get_recommendations(missing_skills):
    recommendations = {}

    for skill in missing_skills:
        skill_lower = skill.lower()
        if skill_lower in skill_course_map:
            recommendations[skill_lower] = skill_course_map[skill_lower]
        else:
            recommendations[skill_lower] = [{"title": "No specific course found", "url": ""}]

    return recommendations
