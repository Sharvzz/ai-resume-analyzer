from flask import Flask
from routes.resume_routes import resume_bp
from flask_cors import CORS
import os

app = Flask(__name__)
CORS(app)

# Create uploads folder if it doesn't exist
if not os.path.exists('uploads'):
    os.makedirs('uploads')

# Register the Blueprint
app.register_blueprint(resume_bp)

@app.route('/')
def home():
    return "Backend is working!"

if __name__ == '__main__':
    app.run(debug=True)
