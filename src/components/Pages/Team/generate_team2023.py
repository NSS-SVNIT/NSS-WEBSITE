import os
import re
import pandas as pd
import cloudinary
import cloudinary.uploader
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# 🔐 Cloudinary credentials
cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

# 📂 Load CSV
df = pd.read_csv("team2023.csv")

# 🧹 Clean column names (removes hidden spaces)
df.columns = df.columns.str.strip()
print("Detected columns:", df.columns)

team_list = []

def convert_drive_link(url):
    """Convert various Google Drive links to direct download link"""
    if not isinstance(url, str):
        return None

    # Case 1: /file/d/FILE_ID/view
    match = re.search(r'/d/([a-zA-Z0-9_-]+)', url)
    if match:
        return f"https://drive.google.com/uc?id={match.group(1)}&export=download"

    # Case 2: open?id=FILE_ID
    match = re.search(r'id=([a-zA-Z0-9_-]+)', url)
    if match:
        return f"https://drive.google.com/uc?id={match.group(1)}&export=download"

    return None


for _, row in df.iterrows():
    name = row.get("Full Name", "").strip()
    gmail = row.get("Personal Email ID", "").strip()   # ✅ personal email
    linkedin = row.get("LinkedIn Profile Link", "").strip()
    drive_link = row.get("Upload Photograph", "")

    if not name or not drive_link:
        print(f"⚠ Skipping incomplete row: {name}")
        continue

    direct_image = convert_drive_link(drive_link)

    if not direct_image:
        print(f"❌ Skipping {name}, invalid Drive link")
        continue

    try:
        # ⬆ Upload to Cloudinary
        upload_result = cloudinary.uploader.upload(
            direct_image,
            folder="team/Team2023",
            public_id=name.replace(" ", "_"),
            overwrite=True
        )

        cloudinary_url = upload_result["secure_url"]

        team_list.append({
            "image": direct_image,
            "name": name,
            "position": "Volunteer",
            "linkedin": linkedin,
            "gmail": gmail,
            "firebase": cloudinary_url
        })

        print(f"✅ Uploaded {name}")

    except Exception as e:
        print(f"❌ Error uploading {name}: {e}")

# 💾 Save output to JS file automatically
with open("Team2023.js", "w", encoding="utf-8") as f:
    f.write("const Team2023 = [\n")
    for member in team_list:
        f.write("  {\n")
        f.write(f'    image: "{member["image"]}",\n')
        f.write(f'    name: "{member["name"]}",\n')
        f.write('    position: "Volunteer",\n')
        f.write(f'    linkedin: "{member["linkedin"]}",\n')
        f.write(f'    gmail: "{member["gmail"]}",\n')
        f.write(f'    firebase: "{member["firebase"]}",\n')
        f.write("  },\n")
    f.write("];\n")

print("\n🎉 Team2023.js file created successfully!")
