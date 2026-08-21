from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware

from PyPDF2 import PdfReader
from docx import Document
from PIL import Image

import pytesseract
import hashlib
import io
import re
import pymysql
import zipfile
import os

from dotenv import load_dotenv


# ==========================================
# LOAD ENVIRONMENT VARIABLES
# ==========================================

load_dotenv()


# ==========================================
# FASTAPI APPLICATION
# ==========================================

app = FastAPI(title="ASTITVA Backend")


# ==========================================
# CORS
# ==========================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# MYSQL CONNECTION
# ==========================================

def get_db_connection():

    connection = pymysql.connect(
        host=os.getenv("MYSQL_HOST", "127.0.0.1"),
        port=int(os.getenv("MYSQL_PORT", "3307")),
        user=os.getenv("MYSQL_USER", "root"),
        password=os.getenv("MYSQL_PASSWORD", ""),
        database=os.getenv("MYSQL_DATABASE", "astitva_db"),
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

    text = text.lower()

    text = re.sub(r"\s+", " ", text)

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

def save_certificate(filename, fingerprint):

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

            certificate_id = cursor.lastrowid

        connection.commit()

        return certificate_id

    finally:

        connection.close()


# ==========================================
# EXTRACT TEXT FROM PDF
# ==========================================

def extract_pdf_text(file_data):

    pdf_file = io.BytesIO(file_data)

    reader = PdfReader(pdf_file)

    text = ""

    for page in reader.pages:

        text += page.extract_text() or ""

    return text


# ==========================================
# EXTRACT TEXT FROM DOCX
# ==========================================

def extract_docx_text(file_data):

    docx_file = io.BytesIO(file_data)

    document = Document(docx_file)

    text = ""

    for paragraph in document.paragraphs:

        text += paragraph.text + "\n"

    return text


# ==========================================
# EXTRACT TEXT FROM IMAGE
# ==========================================

def extract_image_text(file_data):

    image_file = io.BytesIO(file_data)

    image = Image.open(image_file)

    return pytesseract.image_to_string(image)


# ==========================================
# EXTRACT TEXT FROM ZIP
# ==========================================

def extract_zip_text(file_data):

    text_parts = []

    supported_text_extensions = (
        ".txt",
        ".py",
        ".java",
        ".js",
        ".jsx",
        ".ts",
        ".tsx",
        ".html",
        ".css",
        ".c",
        ".cpp",
        ".h",
        ".sql",
        ".json",
        ".xml",
        ".md"
    )

    supported_image_extensions = (
        ".jpg",
        ".jpeg",
        ".png"
    )

    try:

        zip_file = io.BytesIO(file_data)

        with zipfile.ZipFile(zip_file, "r") as zip_ref:

            for zip_info in zip_ref.infolist():

                # --------------------------------------
                # Skip folders
                # --------------------------------------

                if zip_info.is_dir():
                    continue

                inner_filename = zip_info.filename.lower()

                # --------------------------------------
                # Skip unnecessary folders
                # --------------------------------------

                skip_folders = (
                    "node_modules/",
                    "venv/",
                    ".venv/",
                    ".git/",
                    "__pycache__/",
                    "dist/",
                    "build/"
                )

                if any(
                    folder in inner_filename
                    for folder in skip_folders
                ):
                    continue

                try:

                    inner_data = zip_ref.read(zip_info)

                    # ==================================
                    # TEXT / PROGRAMMING FILE
                    # ==================================

                    if inner_filename.endswith(
                        supported_text_extensions
                    ):

                        inner_text = inner_data.decode(
                            "utf-8",
                            errors="ignore"
                        )

                        text_parts.append(
                            f"\n--- {zip_info.filename} ---\n"
                        )

                        text_parts.append(inner_text)


                    # ==================================
                    # PDF INSIDE ZIP
                    # ==================================

                    elif inner_filename.endswith(".pdf"):

                        pdf_text = extract_pdf_text(
                            inner_data
                        )

                        text_parts.append(
                            f"\n--- {zip_info.filename} ---\n"
                        )

                        text_parts.append(pdf_text)


                    # ==================================
                    # DOCX INSIDE ZIP
                    # ==================================

                    elif inner_filename.endswith(".docx"):

                        docx_text = extract_docx_text(
                            inner_data
                        )

                        text_parts.append(
                            f"\n--- {zip_info.filename} ---\n"
                        )

                        text_parts.append(docx_text)


                    # ==================================
                    # IMAGE INSIDE ZIP
                    # ==================================

                    elif inner_filename.endswith(
                        supported_image_extensions
                    ):

                        image_text = extract_image_text(
                            inner_data
                        )

                        text_parts.append(
                            f"\n--- {zip_info.filename} ---\n"
                        )

                        text_parts.append(image_text)

                except Exception:

                    # If one file inside ZIP fails,
                    # continue processing other files.
                    continue

        text = "\n".join(text_parts)

        if not text.strip():

            return None

        return text

    except zipfile.BadZipFile:

        return None


# ==========================================
# FILE UPLOAD
# ==========================================

@app.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    # ======================================
    # READ FILE
    # ======================================

    file_data = await file.read()

    original_filename = file.filename or "unknown"

    filename = original_filename.lower()


    # ======================================
    # CHECK EMPTY FILE
    # ======================================

    if not file_data:

        return {
            "message": "Uploaded file is empty"
        }


    # ======================================
    # EXTRACT TEXT
    # ======================================

    try:

        # ==================================
        # PDF
        # ==================================

        if filename.endswith(".pdf"):

            text = extract_pdf_text(
                file_data
            )


        # ==================================
        # DOCX
        # ==================================

        elif filename.endswith(".docx"):

            text = extract_docx_text(
                file_data
            )


        # ==================================
        # IMAGE OCR
        # ==================================

        elif filename.endswith(
            (
                ".jpg",
                ".jpeg",
                ".png"
            )
        ):

            text = extract_image_text(
                file_data
            )


        # ==================================
        # TXT / PROGRAMMING FILES
        # ==================================

        elif filename.endswith(
            (
                ".txt",
                ".py",
                ".java",
                ".js",
                ".jsx",
                ".ts",
                ".tsx",
                ".html",
                ".css",
                ".c",
                ".cpp",
                ".h",
                ".sql",
                ".json",
                ".xml",
                ".md"
            )
        ):

            text = file_data.decode(
                "utf-8",
                errors="ignore"
            )


        # ==================================
        # ZIP
        # ==================================

        elif filename.endswith(".zip"):

            text = extract_zip_text(
                file_data
            )

            if text is None:

                return {
                    "message":
                    "ZIP file is invalid or contains no supported readable files",

                    "filename":
                    original_filename
                }


        # ==================================
        # UNSUPPORTED
        # ==================================

        else:

            return {

                "message":
                "File type not supported yet",

                "filename":
                original_filename,

                "content_type":
                file.content_type
            }


    except Exception as error:

        return {

            "message":
            "Error while processing file",

            "filename":
            original_filename,

            "processing_error":
            str(error)
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
            original_filename,
            fingerprint
        )

    except Exception as error:

        return {

            "message":
            "File processed but database save failed",

            "filename":
            original_filename,

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
        original_filename,

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