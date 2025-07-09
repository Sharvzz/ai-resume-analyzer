import spacy

# Load English model (make sure it's installed)
nlp = spacy.load("en_core_web_sm")

# A simple list of known skills (expand later)
SKILL_KEYWORDS = [
    "python", "java", "c++", "html", "css", "javascript", "react",
    "node.js", "flask", "machine learning", "deep learning",
    "data analysis", "sql", "mongodb", "docker", "git", "nlp"
]

def extract_skills_from_text(text):
    doc = nlp(text.lower())
    extracted_skills = []

    for token in doc:
        if token.text in SKILL_KEYWORDS:
            extracted_skills.append(token.text)

    return list(set(extracted_skills))  # remove duplicates
