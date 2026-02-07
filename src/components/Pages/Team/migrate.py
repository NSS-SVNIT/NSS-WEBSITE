import os
import re
import requests
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv
from PIL import Image
import time

# ---------- CONFIG ----------
load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

JS_FILE = "TeamData.js"
OUTPUT_FILE = "TeamData.js"


# ---------- HELPERS ----------

def download_image(firebase_url):
    """Download image from Firebase and verify it's valid"""
    try:
        response = requests.get(firebase_url, stream=True, timeout=20)
        if response.status_code == 200:
            filename = "temp.jpg"
            with open(filename, "wb") as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)

            # Verify image integrity
            try:
                img = Image.open(filename)
                img.verify()
                return filename
            except Exception:
                os.remove(filename)
                print("❌ Firebase link did not return a valid image")
                return None
    except Exception as e:
        print("❌ Download error:", e)

    return None


def compress_image(path, max_size_mb=9):
    """Compress large images before upload"""
    size_mb = os.path.getsize(path) / (1024 * 1024)
    if size_mb <= max_size_mb:
        return path

    print("🗜 Compressing large image...")
    img = Image.open(path).convert("RGB")
    compressed_path = "compressed.jpg"
    quality = 85

    while True:
        img.save(compressed_path, "JPEG", quality=quality)
        size_mb = os.path.getsize(compressed_path) / (1024 * 1024)
        if size_mb <= max_size_mb or quality <= 30:
            break
        quality -= 5

    return compressed_path


def upload_to_cloudinary(local_path, folder, public_id):
    try:
        local_path = compress_image(local_path)
        result = cloudinary.uploader.upload(
            local_path,
            folder=folder,
            public_id=public_id,
            overwrite=True
        )
        return result["secure_url"]
    except Exception as e:
        print("❌ Upload skipped:", e)
        return None


# ---------- READ JS FILE ----------
with open(JS_FILE, "r", encoding="utf-8") as f:
    content = f.read()

updated_content = content
groups = re.findall(r"const\s+(\w+)\s*=\s*\[([\s\S]*?)\];", content)

for group_name, group_body in groups:
    print(f"\n🚀 Processing group: {group_name}")
    folder = f"team/{group_name}"
    persons = re.findall(r"\{([\s\S]*?)\}", group_body)

    for person_block in persons:
        name_match = re.search(r'name:\s*"([^"]+)"', person_block)
        firebase_match = re.search(r'firebase:\s*"([^"]+)"', person_block)

        if not name_match or not firebase_match:
            continue

        name = name_match.group(1)
        firebase_url = firebase_match.group(1)

        print(f"⬇ Downloading (Firebase) {name}")
        local_file = download_image(firebase_url)

        if not local_file:
            print("❌ Failed download from Firebase:", firebase_url)
            continue

        public_id = name.replace(" ", "_")
        print(f"☁ Uploading → {folder}/{public_id}")

        new_url = upload_to_cloudinary(local_file, folder, public_id)
        os.remove(local_file)

        if new_url:
            pattern = re.escape(firebase_url)
            updated_content, count = re.subn(pattern, new_url, updated_content)

            if count > 0:
                print(f"✅ Replaced Firebase link for {name}")

                # 💾 SAVE IMMEDIATELY
                with open(JS_FILE, "w", encoding="utf-8") as f:
                    f.write(updated_content)
            else:
                print(f"⚠ Firebase link not found in file for {name}")

        time.sleep(1)  # avoid rate limits


# ---------- FINAL SAVE ----------
with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    f.write(updated_content)

print("\n🎉 DONE! Firebase links replaced with Cloudinary links in:", OUTPUT_FILE)
