#!/usr/bin/env python3
"""
Organize Cloudinary images into proper folder structure
"""

import os
import json
from cloudinary import uploader, config

def organize_cloudinary_folders():
    """Reorganize Cloudinary images into proper folder structure"""
    
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
        
        print("🔄 Reorganizing Cloudinary folders...")
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
        
        print(f"📁 Found {len(folder_groups)} folders to organize")
        
        # Reorganize each folder
        for folder_name, files in folder_groups.items():
            print(f"\n📂 Processing folder: {folder_name}")
            
            for i, file_info in enumerate(files, 1):
                print(f"  📄 {i}/{len(files)} - {file_info['file_name']}")
                
                try:
                    # Extract the current public_id and create new one
                    current_public_id = file_info['public_id']
                    
                    # Create new public_id with proper folder structure
                    file_base_name = os.path.splitext(file_info['file_name'])[0]
                    new_public_id = f"events_images/{folder_name}/{file_base_name}"
                    
                    # Rename the asset to proper folder structure
                    result = uploader.rename(
                        current_public_id,
                        new_public_id,
                        overwrite=True
                    )
                    
                    if result.get('public_id'):
                        print(f"    ✅ Moved to: {result['public_id']}")
                    else:
                        print(f"    ⚠️  Already in correct location")
                        
                except Exception as e:
                    print(f"    ❌ Error: {str(e)}")
        
        print(f"\n🎉 Folder organization completed!")
        print(f"📊 Processed {len(folder_groups)} folders")
        
    except FileNotFoundError:
        print("❌ Migration log file not found!")
        print("Make sure 'folder_migration_log_20260206_230238.json' exists")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    organize_cloudinary_folders()
