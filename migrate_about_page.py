import cloudinary
import cloudinary.uploader
import requests
import os
import re
from dotenv import load_dotenv

# ------------------ SETUP ------------------
load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

ABOUT_FILE = "src/components/Pages/About.jsx"   # 🔁 path from your screenshot

# ------------------------------------------

def upload_firebase_image(image_url):
    try:
        response = requests.get(image_url, timeout=15)
        if response.status_code != 200:
            print("❌ Failed to download:", image_url)
            return None

        upload_result = cloudinary.uploader.upload(
            response.content,
            folder="nss/about"
        )

        return upload_result["secure_url"]

    except Exception as e:
        print("❌ Upload error:", e)
        return None


def move_cloudinary_image(old_url):
    try:
        parts = old_url.split("/")
        public_id_with_ext = parts[-1]
        public_id = public_id_with_ext.split(".")[0]

        new_public_id = f"nss/about/{public_id}"

        result = cloudinary.uploader.rename(
            public_id,
            new_public_id,
            overwrite=True
        )

        return result["secure_url"]

    except Exception as e:
        print("❌ Move error:", e)
        return old_url


def process_url(url):
    if "firebasestorage" in url:
        print("⬆ Uploading Firebase → nss/about")
        return upload_firebase_image(url)

    elif "cloudinary" in url and "nss/about" not in url:
        print("📁 Moving Cloudinary image → nss/about")
        return move_cloudinary_image(url)

    return url


# ------------ PROCESS FILE ------------

print(f"\n📄 Scanning {ABOUT_FILE}")

with open(ABOUT_FILE, "r", encoding="utf-8") as f:
    content = f.read()

urls = re.findall(r'https?://[^\s"\']+', content)
updated_content = content

for url in urls:
    if "firebasestorage" in url or "cloudinary" in url:
        print("🔎 Found image:", url)
        new_url = process_url(url)

        if new_url and new_url != url:
            updated_content = updated_content.replace(url, new_url)
            print("🔁 Replaced URL")

if updated_content != content:
    with open(ABOUT_FILE, "w", encoding="utf-8") as f:
        f.write(updated_content)
    print("💾 About.jsx updated!")

print("\n🎉 About page migration complete!")
