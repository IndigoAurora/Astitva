from fastapi import FastAPI, UploadFile, File
from PyPDF2 import PdfReader
from docx import Document
from PIL import Image
import pytesseract
import hashlib
import io
import re
import pymysql
from dotenv import load_dotenv
import os


# ==========================================
# LOAD ENVIRONMENT VARIABLES
# ==========================================

load_dotenv()


# ==========================================
# FASTAPI APPLICATION
# ==========================================

app = FastAPI(title="ASTITVA Backend")


# ==========================================
# MYSQL CONNECTION
# ==========================================

def get_db_connection():

    connection = pymysql.connect(
        host=os.getenv("MYSQL_HOST"),
        port=int(os.getenv("MYSQL_PORT")),
        user=os.getenv("MYSQL_USER"),
        password=os.getenv("MYSQL_PASSWORD"),
        database=os.getenv("MYSQL_DATABASE"),
        cursorclass=pymysql.cursors.DictCursor
    )

    return connection


# ==========================================
# HOME
# ==========================================

@app.get("/")
def home():

    return {
        "message": "ASTITVA Backend is running!"
    }


# ==========================================
# HEALTH CHECK
# ==========================================

@app.get("/health")
def health_check():

    return {
        "status": "healthy"
    }


# ==========================================
# TEXT NORMALIZATION
# ==========================================

def normalize_text(text):

    # Convert text to lowercase
    text = text.lower()

    # Remove extra spaces and new lines
    text = re.sub(r"\s+", " ", text)

    # Remove leading/trailing spaces
    text = text.strip()

    return text


# ==========================================
# SHA-256 FINGERPRINT
# ==========================================

def create_fingerprint(text):

    normalized_text = normalize_text(text)

    fingerprint = hashlib.sha256(
        normalized_text.encode("utf-8")
    ).hexdigest()

    return fingerprint


# ==========================================
# SAVE CERTIFICATE TO MYSQL
# ==========================================

def save_certificate(
    filename,
    fingerprint
):

    connection = get_db_connection()

    try:

        with connection.cursor() as cursor:

            sql = """
            INSERT INTO certificates
            (filename, fingerprint, blockchain_status)
            VALUES (%s, %s, %s)
            """

            cursor.execute(
                sql,
                (
                    filename,
                    fingerprint,
                    "Pending"
                )
            )

        connection.commit()

        certificate_id = cursor.lastrowid

        return certificate_id

    finally:

        connection.close()


# ==========================================
# FILE UPLOAD
# ==========================================

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    # Read uploaded file
    file_data = await file.read()

    filename = file.filename.lower()


    # ======================================
    # PDF
    # ======================================

    if filename.endswith(".pdf"):

        pdf_file = io.BytesIO(file_data)

        reader = PdfReader(pdf_file)

        text = ""

        for page in reader.pages:

            text += page.extract_text() or ""


    # ======================================
    # DOCX
    # ======================================

    elif filename.endswith(".docx"):

        docx_file = io.BytesIO(file_data)

        document = Document(docx_file)

        text = ""

        for paragraph in document.paragraphs:

            text += paragraph.text + "\n"


    # ======================================
    # IMAGE OCR
    # ======================================

    elif filename.endswith((
        ".jpg",
        ".jpeg",
        ".png"
    )):

        image_file = io.BytesIO(file_data)

        image = Image.open(image_file)

        text = pytesseract.image_to_string(
            image
        )


    # ======================================
    # TXT AND PROGRAMMING FILES
    # ======================================

    elif filename.endswith((
        ".txt",
        ".py",
        ".java",
        ".js",
        ".html",
        ".css",
        ".c",
        ".cpp",
        ".h",
        ".sql"
    )):

        text = file_data.decode(
            "utf-8",
            errors="ignore"
        )


    # ======================================
    # UNSUPPORTED FILE
    # ======================================

    else:

        return {

            "message":
            "File type not supported yet",

            "filename":
            file.filename,

            "content_type":
            file.content_type
        }


    # ======================================
    # CREATE FINGERPRINT
    # ======================================

    fingerprint = create_fingerprint(
        text
    )


    # ======================================
    # SAVE TO MYSQL
    # ======================================

    try:

        certificate_id = save_certificate(
            file.filename,
            fingerprint
        )

    except Exception as error:

        return {

            "message":
            "File processed but database save failed",

            "filename":
            file.filename,

            "fingerprint":
            fingerprint,

            "database_error":
            str(error)
        }


    # ======================================
    # FINAL RESPONSE
    # ======================================

    return {

        "message":
        "File processed and certificate saved",

        "certificate_id":
        certificate_id,

        "filename":
        file.filename,

        "content_type":
        file.content_type,

        "text_length":
        len(text),

        "extracted_text":
        text,

        "fingerprint":
        fingerprint,

        "blockchain_status":
        "Pending"
    }