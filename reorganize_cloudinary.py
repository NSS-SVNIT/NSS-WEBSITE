import cloudinary
import cloudinary.uploader
import cloudinary.api
import os
from dotenv import load_dotenv

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET")
)

print("🚀 Moving developers images to nss/team/members...\n")

result = cloudinary.api.resources(type="upload", prefix="developers/")

resources = result["resources"]
print(f"🔍 Found {len(resources)} developer images\n")

for res in resources:
    old_public_id = res["public_id"]
    filename = old_public_id.split("/")[-1]
    new_public_id = f"nss/team/members/{filename}"

    print(f"📁 {old_public_id} → {new_public_id}")
    cloudinary.uploader.rename(old_public_id, new_public_id, overwrite=True)

print("\n🎉 Move complete!")
