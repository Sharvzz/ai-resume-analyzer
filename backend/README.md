resume-backend/
├── app.py
├── backend-env/              # Your virtual environment
├── requirements.txt          # List of all required Python packages
├── /uploads/                 # Stores uploaded resume files (PDFs)
├── /routes/                  # Flask route handlers (APIs)
│   └── resume_routes.py
├── /services/                # Business logic (e.g. parsing, skill analysis)
│   └── resume_parser.py
├── /utils/                   # Helper functions (e.g. text cleaning, scraping)
│   └── helpers.py
├── /models/                  # (Optional) Database models
│   └── user.py
├── /data/                    # (Optional) Sample resumes, test data
│   └── sample_resume.pdf
└── README.md                 # Project description and usage guide
