# Use a stable version of Python (compatible with spaCy)
FROM python:3.10-slim

# Set the working directory inside the container
WORKDIR /app

# Copy all files from your backend project to /app inside the container
COPY . /app

# Upgrade pip
RUN pip install --upgrade pip

# Install dependencies
RUN pip install -r requirements.txt

# Download the spaCy model
RUN python -m spacy download en_core_web_sm

# Expose the port your Flask app runs on
EXPOSE 10000

# Run the app
CMD ["python", "app.py"]

