import sys

def extract():
    try:
        import PyPDF2
        reader = PyPDF2.PdfReader('School LMS.pdf')
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        with open('.gemini_pdf_extract.txt', 'w', encoding='utf-8') as f:
            f.write(text)
        print("Extracted successfully")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    extract()
