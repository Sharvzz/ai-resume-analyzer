from flask import Flask
from routes.resume_routes import resume_bp
from flask_cors import CORS
from dotenv import load_dotenv
import os

# ✅ Load environment variables from .env
load_dotenv()

# ✅ Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# ✅ Create 'uploads' folder if it doesn't exist
if not os.path.exists('uploads'):
    os.makedirs('uploads')

# ✅ Register all routes from the blueprint
app.register_blueprint(resume_bp)

# ✅ Root route (optional health check)
@app.route('/')
def home():
    return "Backend is working!"

# ✅ Bind to 0.0.0.0 and dynamic PORT for Render
if __name__ == '__main__':
    port = int(os.environ.get("PORT", 10000))
    app.run(host='0.0.0.0', port=port, debug=True)
