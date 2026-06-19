#!/usr/bin/env python3
"""
Fix Cloudinary folder visibility by properly organizing into folders
"""

import os
import json
import requests
from cloudinary import uploader, config

def fix_cloudinary_folders():
    """Fix Cloudinary folder organization"""
    
    # Configure Cloudinary
    config(
        cloud_name=os.getenv('CLOUDINARY_CLOUD_NAME'),
        api_key=os.getenv('CLOUDINARY_API_KEY'),
        api_secret=os.getenv('CLOUDINARY_API_SECRET'),
        secure=True
    )
    
    try:
        # Read migration log to get current structure
        with open('folder_migration_log_20260206_230238.json', 'r') as f:
            log_data = json.load(f)
        
        print("🔧 Fixing Cloudinary folder visibility...")
        print("=" * 50)
        
        # Group by original Firebase folders
        folder_groups = {}
        
        for file_info in log_data['migrated_files']:
            firebase_path = file_info['firebase_path']
            cloudinary_url = file_info['cloudinary_url']
            
            # Extract folder name from Firebase path
            path_parts = firebase_path.split('/')
            if len(path_parts) > 2:
                folder_name = path_parts[1]  # e.g., "Amrit Kalash"
                file_name = path_parts[2]   # e.g., "image.jpg"
            else:
                continue
            
            if folder_name not in folder_groups:
                folder_groups[folder_name] = []
            
            folder_groups[folder_name].append({
                'file_name': file_name,
                'cloudinary_url': cloudinary_url,
                'public_id': file_info['public_id']
            })
        
        print(f"📁 Found {len(folder_groups)} folders to fix")
        
        # Process each folder
        for folder_name, files in folder_groups.items():
            print(f"\n📂 Processing folder: {folder_name}")
            
            for i, file_info in enumerate(files, 1):
                print(f"  📄 {i}/{len(files)} - {file_info['file_name']}")
                
                try:
                    # Download the current image
                    current_public_id = file_info['public_id']
                    
                    # Extract file extension from URL
                    file_extension = file_info['cloudinary_url'].split('.')[-1].split('?')[0]
                    file_base_name = os.path.splitext(file_info['file_name'])[0]
                    
                    # Download image data from Cloudinary
                    download_url = file_info['cloudinary_url'].replace('/upload/', '/upload/fl_lossy/')
                    response = requests.get(download_url)
                    
                    if response.status_code == 200:
                        # Re-upload to proper folder structure
                        result = uploader.upload(
                            response.content,
                            public_id=f"events_images/{folder_name}/{file_base_name}",
                            folder=f"events_images/{folder_name}",
                            resource_type="image",
                            format=file_extension,
                            overwrite=True
                        )
                        
                        if result.get('secure_url'):
                            print(f"    ✅ Reorganized: {result['secure_url']}")
                        else:
                            print(f"    ⚠️  Upload result: {result}")
                    else:
                        print(f"    ❌ Failed to download: {response.status_code}")
                        
                except Exception as e:
                    print(f"    ❌ Error: {str(e)}")
                
                # Add delay to avoid rate limiting
                import time
                time.sleep(0.5)
        
        print(f"\n🎉 Folder reorganization completed!")
        print(f"📊 Processed {len(folder_groups)} folders")
        
        # Create summary file
        with open('cloudinary_folders_fixed.txt', 'w') as f:
            f.write("Cloudinary Folder Fix Summary\n")
            f.write("=" * 40 + "\n\n")
            
            for folder_name, files in folder_groups.items():
                f.write(f"{folder_name}/\n")
                for file_info in files:
                    f.write(f"  {file_info['file_name']}\n")
                    f.write(f"  {file_info['cloudinary_url']}\n\n")
        
        print(f"✅ Summary saved to: cloudinary_folders_fixed.txt")
        
    except FileNotFoundError:
        print("❌ Migration log file not found!")
        print("Make sure 'folder_migration_log_20260206_230238.json' exists")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    fix_cloudinary_folders()
