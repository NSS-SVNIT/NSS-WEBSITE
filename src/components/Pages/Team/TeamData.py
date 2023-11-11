import pandas as pd
import json
import re

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

# Read data from Excel file
excel_file_path = 'src/components/Pages/Team/Team_data.xlsx'
excel_data = pd.read_excel(excel_file_path, sheet_name=None)

# Convert each sheet to a dictionary of records
data_dict = {}
for sheet_name, sheet_data in excel_data.items():
    # Extract and format Google Drive links in the 'image' column
    if 'image' in sheet_data.columns:
        sheet_data['image'] = sheet_data['image'].apply(lambda x: format_drive_link(extract_file_id(x)) if pd.notnull(x) else x)
    data_dict[sheet_name] = sheet_data.to_dict(orient='records')

# Export the data to a JavaScript file
with open('src/components/Pages/Team/TeamData.js', 'w') as file:
    for sheet_name, sheet_records in data_dict.items():
        file.write(f"const {sheet_name} = {json.dumps(sheet_records)};\n\n")
    file.write("export { " + ", ".join(data_dict.keys()) + " };")

print("Data exported to TeamData.js")
