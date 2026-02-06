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

JS_FILE = "Developers.jsx"


# ---------- HELPERS ----------

def download_image(url):
    try:
        response = requests.get(url, stream=True, timeout=20)
        if response.status_code == 200:
            filename = "temp.jpg"
            with open(filename, "wb") as f:
                for chunk in response.iter_content(1024):
                    f.write(chunk)

            try:
                img = Image.open(filename)
                img.verify()
                return filename
            except Exception:
                os.remove(filename)
                print("❌ Invalid image from Firebase")
                return None
    except Exception as e:
        print("❌ Download error:", e)
    return None


def upload_to_cloudinary(local_path, folder, public_id):
    try:
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


# ---------- READ FILE ----------
with open(JS_FILE, "r", encoding="utf-8") as f:
    content = f.read()

updated_content = content

# Find each developer object
developers = re.findall(r"\{[\s\S]*?\}", content)

for dev in developers:
    name_match = re.search(r'name:\s*"([^"]+)"', dev)
    image_match = re.search(r'imageLink:\s*"([^"]+)"', dev)

    if not name_match or not image_match:
        continue

    name = name_match.group(1)
    firebase_url = image_match.group(1)

    print(f"\n⬇ Downloading {name}")
    local_file = download_image(firebase_url)

    if not local_file:
        print("❌ Failed download:", firebase_url)
        continue

    public_id = name.replace(" ", "_")
    print(f"☁ Uploading → developer/developers/{public_id}")

    new_url = upload_to_cloudinary(local_file, "developer/developers", public_id)
    os.remove(local_file)

    if new_url:
        pattern = re.escape(firebase_url)
        updated_content, count = re.subn(pattern, new_url, updated_content)

        if count > 0:
            print(f"✅ Replaced imageLink for {name}")
            with open(JS_FILE, "w", encoding="utf-8") as f:
                f.write(updated_content)
        else:
            print(f"⚠ imageLink not found in file for {name}")

    time.sleep(1)

print("\n🎉 DONE! Developers.jsx now uses Cloudinary images.")
