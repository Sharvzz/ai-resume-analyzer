from flask import Blueprint, request, jsonify
import os
from services.resume_parser import extract_text_from_pdf
from services.skill_extractor import extract_skills_from_text
from services.skill_matcher import compare_skills
from services.recommender import get_recommendation


resume_bp = Blueprint('resume', __name__)
UPLOAD_FOLDER = 'uploads'

# Route to handle resume upload
@resume_bp.route('/upload-resume', methods=['POST'])
def upload_resume():
    if 'file' not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    extracted_text = extract_text_from_pdf(file_path)

    if extracted_text:
        skills = extract_skills_from_text(extracted_text)
        return jsonify({
            "text": extracted_text,
            "skills": skills
        }), 200
    else:
        return jsonify({"error": "Failed to extract text"}), 500


# ✅ New Route to handle JD skill extraction
@resume_bp.route('/upload-jd', methods=['POST'])
def upload_jd():
    data = request.get_json()

    if not data or 'jd_text' not in data:
        return jsonify({"error": "No job description text provided"}), 400

    jd_text = data['jd_text']
    jd_skills = extract_skills_from_text(jd_text)

    return jsonify({
        "jd_text": jd_text,
        "jd_skills": jd_skills
    }), 200


@resume_bp.route('/skill-gap', methods=['POST'])
def skill_gap():
    data = request.get_json()

    if not data or 'resume_skills' not in data or 'jd_skills' not in data:
        return jsonify({"error": "resume_skills and jd_skills required"}), 400

    resume_skills = data['resume_skills']
    jd_skills = data['jd_skills']

    result = compare_skills(resume_skills, jd_skills)

    return jsonify(result), 200


@resume_bp.route('/recommend', methods=['POST'])
def recommend():
    data = request.get_json()
    missing_skills = data.get('missing_skills', [])
    recommendations = get_recommendation(missing_skills)
    return jsonify(recommendations)
