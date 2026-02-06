import cloudinary
import cloudinary.uploader
import cloudinary.api
import requests
import os
import urllib.parse
from dotenv import load_dotenv

# ------------------ CONFIG ------------------
load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

BASE_FOLDER = "nss"  # Top-level folder in Cloudinary

# 🔹 Paste Firebase image URLs here
firebase_urls = [
    "https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/aboutImages%2Fnss_logo.jpg?alt=media&token=d787fba2-33fc-4940-9eaa-c9b0dc46616f",
]

# -------------------------------------------

def extract_folder_and_filename(firebase_url):
    try:
        path_part = firebase_url.split("/o/")[1].split("?")[0]
        decoded_path = urllib.parse.unquote(path_part)

        parts = decoded_path.split("/")
        filename = parts[-1]
        folder_path = "/".join(parts[:-1])

        return folder_path, filename

    except Exception as e:
        print("❌ Error extracting path:", firebase_url, e)
        return None, None


def already_exists(full_folder, filename):
    safe_name = os.path.splitext(filename)[0].replace(" ", "_")
    public_id = f"{full_folder}/{safe_name}"

    try:
        cloudinary.api.resource(public_id)
        return True
    except:
        return False


def upload_image(firebase_url):
    folder_path, filename = extract_folder_and_filename(firebase_url)
    if not folder_path:
        return

    full_folder = f"{BASE_FOLDER}/{folder_path}"
    safe_name = os.path.splitext(filename)[0].replace(" ", "_")

    print(f"\n📁 Target folder: {full_folder}")
    print(f"🖼 File name: {safe_name}")

    if already_exists(full_folder, filename):
        print("⏭ Skipping (already exists in Cloudinary)")
        return

    try:
        response = requests.get(firebase_url, timeout=20)
        if response.status_code != 200:
            print("❌ Failed to download:", firebase_url)
            return

        result = cloudinary.uploader.upload(
            response.content,
            folder=full_folder,
            public_id=safe_name,
            overwrite=True
        )

        print("✅ Uploaded successfully!")
        print("Firebase  :", firebase_url)
        print("Cloudinary:", result["secure_url"])

    except Exception as e:
        print("❌ Upload failed:", e)


# ------------ RUN MIGRATION ------------

print("🚀 Starting structured migration...")

for url in firebase_urls:
    upload_image(url)

print("\n🎉 Migration script finished!")
