#!/usr/bin/env python3
"""
Extract Cloudinary URLs from migration log into a simple list
"""

import json

def extract_urls():
    try:
        # Read the migration log
        with open('folder_migration_log_20260206_230238.json', 'r') as f:
            log_data = json.load(f)
        
        print("📋 Cloudinary URLs from Migration")
        print("=" * 60)
        
        # Extract and organize by folder
        folders = {}
        
        for file_info in log_data['migrated_files']:
            url = file_info['cloudinary_url']
            firebase_path = file_info['firebase_path']
            
            # Extract folder name from Firebase path
            path_parts = firebase_path.split('/')
            if len(path_parts) > 2:
                folder_name = path_parts[1]
                file_name = path_parts[2]
            else:
                folder_name = 'root'
                file_name = path_parts[1] if len(path_parts) > 1 else path_parts[0]
            
            if folder_name not in folders:
                folders[folder_name] = []
            
            folders[folder_name].append({
                'file': file_name,
                'url': url
            })
        
        # Print organized by folder
        for folder_name, files in sorted(folders.items()):
            print(f"\n📁 {folder_name}/")
            for file_info in files:
                print(f"   📄 {file_info['file']}")
                print(f"      🔗 {file_info['url']}")
        
        # Save to simple text file
        with open('cloudinary_urls.txt', 'w') as f:
            f.write("Cloudinary URLs from Migration\n")
            f.write("=" * 50 + "\n\n")
            
            for folder_name, files in sorted(folders.items()):
                f.write(f"{folder_name}/\n")
                for file_info in files:
                    f.write(f"{file_info['file']}\n")
                    f.write(f"{file_info['url']}\n\n")
        
        print(f"\n✅ URLs saved to: cloudinary_urls.txt")
        print(f"📊 Total folders: {len(folders)}")
        print(f"📄 Total files: {len(log_data['migrated_files'])}")
        
    except FileNotFoundError:
        print("❌ Migration log file not found!")
        print("Make sure 'folder_migration_log_20260206_230238.json' exists in scripts folder")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    extract_urls()
