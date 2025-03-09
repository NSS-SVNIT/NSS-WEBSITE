import pandas as pd
import json
import re
import requests
import mimetypes
import firebase_admin
from firebase_admin import credentials, storage

# Firebase setup – update these values with your credentials and bucket info
cred = credentials.Certificate("src/components/Pages/Team/serviceAccountKey.json")  
firebase_admin.initialize_app(cred, {
    'storageBucket': 'nss-svnit.appspot.com'  # Update with your Firebase Storage bucket name
})
bucket = storage.bucket()

# Function to extract file ID from Google Drive link
def extract_file_id(link):
    patterns = [
        r"id=([\w-]+)",
        r"\/d\/([\w-]+)",
        r"\/d\/([\w-]+)\/view"
    ]
    for pattern in patterns:
        match = re.search(pattern, link)
        if match:
            return match.group(1)
    return None

# Function to format Google Drive link with file ID
def format_drive_link(file_id):
    return f"https://drive.google.com/uc?id={file_id}&export=download"

def sanitize_filename(name):
    # Replace spaces with underscores and remove unwanted characters
    return re.sub(r'[^a-zA-Z0-9_-]', '', name.replace(" ", "_"))

# Function to upload image to Firebase Storage and return its public URL
def upload_image_to_firebase(image_link,volunteer_name):
    file_id = extract_file_id(image_link)
    if not file_id:
        print(f"Could not extract file ID from link: {image_link}")
        return None

    download_link = format_drive_link(file_id)
    response = requests.get(download_link)
    if response.status_code == 200:
        content_type = response.headers.get('content-type', 'image/jpeg')
        extension = mimetypes.guess_extension(content_type)
        if not extension:
            extension = '.jpg'
        safe_name = sanitize_filename(volunteer_name)
        # Construct filename using the person's name and file_id to ensure uniqueness
        filename = f"{safe_name}_{file_id}{extension}"
        blob = bucket.blob(f"team page/2022/{filename}")
        blob.upload_from_string(response.content, content_type=content_type)
        blob.make_public()
        print(f"Uploaded {filename} to Firebase.")
        return blob.public_url
    else:
        print(f"Failed to download image from {download_link}")
        return None

# Read data from Excel file
excel_file_path = 'src/components/Pages/Team/Team_data.xlsx'
excel_data = pd.read_excel(excel_file_path, sheet_name=None)

# Process each sheet in the Excel file
data_dict = {}
for sheet_name, sheet_data in excel_data.items():
    if 'image' in sheet_data.columns:
        # Format the image URL (Google Drive link) if present
        sheet_data['image'] = sheet_data['image'].apply(
            lambda x: format_drive_link(extract_file_id(x)) if pd.notnull(x) else x
        )
        # Ensure the 'firebase' column exists, create if not present
        if 'firebase' not in sheet_data.columns:
            sheet_data['firebase'] = None
        
        # For each row, check if firebase field is already set; if not, upload image and set the firebase URL
        def process_row(row):
            # If firebase column is already filled, keep its value
            if pd.notnull(row['firebase']) and row['firebase'] != "":
                return row['firebase']
            # Otherwise, if an image exists, upload it
            elif pd.notnull(row['image']) and pd.notnull(row['name']):
                return upload_image_to_firebase(row['image'],row['name'])
            else:
                return row['firebase']
            
        sheet_data['firebase'] = sheet_data.apply(process_row, axis=1)
    data_dict[sheet_name] = sheet_data.to_dict(orient='records')

# Export the updated data to a JavaScript file
with open('src/components/Pages/Team/TeamData.js', 'w') as file:
    for sheet_name, sheet_records in data_dict.items():
        file.write(f"const {sheet_name} = {json.dumps(sheet_records)};\n\n")
    file.write("export { " + ", ".join(data_dict.keys()) + " };")

print("Data exported to TeamData.js")
