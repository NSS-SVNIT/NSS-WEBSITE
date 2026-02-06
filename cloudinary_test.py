import cloudinary
import cloudinary.uploader
import requests
import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

# 🔹 Put ONE Firebase image link here
firebase_image_url = "https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/aboutImages%2Fnss_logo.jpg?alt=media&token=d787fba2-33fc-4940-9eaa-c9b0dc46616f"

print("Downloading image...")
response = requests.get(firebase_image_url)

if response.status_code != 200:
    print("❌ Failed to download image")
    exit()

print("Uploading to Cloudinary...")

upload_result = cloudinary.uploader.upload(
    response.content,
    folder="nss/test"   # temporary test folder
)

print("✅ Uploaded successfully!")
print("Cloudinary URL:", upload_result["secure_url"])
