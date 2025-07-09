def compare_skills(resume_skills, jd_skills):
    resume_skills = [skill.lower() for skill in resume_skills]
    jd_skills = [skill.lower() for skill in jd_skills]

    matched_skills = list(set(resume_skills) & set(jd_skills))
    missing_skills = list(set(jd_skills) - set(resume_skills))

    match_percentage = round((len(matched_skills) / len(jd_skills)) * 100, 2) if jd_skills else 0

    return {
        "matched_skills": matched_skills,
        "missing_skills": missing_skills,
        "match_percentage": match_percentage
    }
