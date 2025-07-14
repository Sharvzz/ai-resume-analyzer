# 🧠 AI Resume Skill Gap Analyzer – Backend (Flask)

This is the **backend module** of the group project: **AI Resume Skill Gap Analyzer & Career Recommender**.  
It extracts skills from resumes and job descriptions, performs skill gap analysis, and recommends personalized learning resources.

---

## 🚀 Features

- Upload PDF resumes → extract text & skills using spaCy
- Paste Job Descriptions → extract required skills
- Compare resume skills vs. JD → show matched & missing skills
- Get YouTube/Coursera-based learning recommendations

---

## 📁 Project Structure

backend/
├── app.py # Flask entry point
├── routes/
│ └── resume_routes.py # All API endpoints
├── services/
│ ├── resume_parser.py # PDF text extraction
│ ├── skill_extractor.py # NLP skill extraction
│ ├── skill_matcher.py # Resume vs JD gap logic
│ └── recommender.py # Course recommendations
├── uploads/ # Uploaded PDF resumes
├── backend-env/ # Python virtual environment (not pushed to GitHub)
└── requirements.txt # Backend dependencies


---

## ⚙️ Setup Instructions (Ubuntu/Linux)

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/ai-resume-analyzer.git
cd ai-resume-analyzer/backend

2. Create and activate virtual environment

python3 -m venv backend-env
source backend-env/bin/activate

3. Install dependencies

pip install -r requirements.txt --break-system-packages
python3 -m spacy download en_core_web_sm --break-system-packages


| Route              | Method | Description                        |
| ------------------ | ------ | ---------------------------------- |
| `/`                | GET    | Health check (basic message)       |
| `/upload-resume`   | POST   | Upload PDF, extract skills         |
| `/upload-jd`       | POST   | Send JD text, extract skills       |
| `/skill-gap`       | POST   | Compare resume vs JD skills        |
| `/recommendations` | POST   | Suggest courses for missing skills |


/upload-jd
{
  "jd_text": "We are looking for someone skilled in Python, Flask, and React..."
}


/skill-gap
{
  "resume_skills": ["python", "html", "css"],
  "jd_skills": ["python", "flask", "react"]
}


/recommendations
{
  "missing_skills": ["flask", "react"]
}


👨‍💻 Built With
Python 3

Flask

spaCy

PyMuPDF (fitz)

scikit-learn