import fitz

def extract_text_from_pdf(file_path):
    try:
        doc = fitz.open(file_path)
        text = ""
        for page in doc:
            text+=page.get_text()
        doc.close()
        return text
    except Exception as e:
        print("Error reading PDF: ",e)
        return None    