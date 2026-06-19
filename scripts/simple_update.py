#!/usr/bin/env python3
"""
Simple Firestore URL update with Cloudinary URLs
"""

import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

def simple_update():
    """Simple update of Firestore URLs with Cloudinary URLs"""
    
    # Initialize Firebase
    try:
        cred = credentials.Certificate('service-account-key.json')
        firebase_admin.initialize_app(cred, {
            'projectId': 'nss-svnit'
        })
        db = firestore.client()
        print("✅ Firebase initialized successfully")
    except Exception as e:
        print(f"❌ Firebase initialization failed: {e}")
        return
    
    try:
        print("🔄 Simple Firestore URL update...")
        print("=" * 50)
        
        # Read migration log
        with open('folder_migration_log_20260206_230238.json', 'r') as f:
            migration_data = json.load(f)
        
        # Create simple mapping: extract base filename -> Cloudinary URL
        filename_mapping = {}
        for file_info in migration_data['migrated_files']:
            firebase_path = file_info['firebase_path']
            cloudinary_url = file_info['cloudinary_url']
            
            # Extract base filename (remove path and extension)
            filename = firebase_path.split('/')[-1]  # e.g., "mock fire drill.jpg"
            base_name = os.path.splitext(filename)[0].lower()  # e.g., "mock fire drill"
            
            filename_mapping[base_name] = cloudinary_url
        
        print(f"📋 Created mapping for {len(filename_mapping)} filenames")
        
        # Update Firestore
        posts_ref = db.collection('posts')
        docs = posts_ref.stream()
        
        updated_count = 0
        not_found_count = 0
        
        for doc in docs:
            post_data = doc.to_dict()
            post_id = doc.id
            
            if 'image' in post_data and post_data['image']:
                firebase_url = post_data['image']
                
                if 'firebasestorage.googleapis.com' in firebase_url:
                    # Extract filename from Firebase URL and try to match
                    url_parts = firebase_url.split('/')
                    filename = url_parts[-1].split('?')[0]  # Get filename
                    base_name = os.path.splitext(filename)[0].lower()  # Get base name
                    
                    # Try multiple matching strategies
                    cloudinary_url = None
                    
                    # Strategy 1: Direct match
                    if base_name in filename_mapping:
                        cloudinary_url = filename_mapping[base_name]
                    
                    # Strategy 2: Partial match (remove common prefixes)
                    else:
                        for key, url in filename_mapping.items():
                            if base_name in key or key in base_name:
                                cloudinary_url = url
                                break
                    
                    if cloudinary_url:
                        try:
                            doc.reference.update({'image': cloudinary_url})
                            updated_count += 1
                            print(f"✅ Updated: {post_data.get('title', post_id)}")
                            print(f"   {firebase_url}")
                            print(f"   {cloudinary_url}")
                            print()
                        except Exception as e:
                            print(f"❌ Error: {e}")
                    else:
                        not_found_count += 1
                        print(f"⚠️  No match for: {post_data.get('title', post_id)}")
                        print(f"   Looking for: {base_name}")
                        print()
        
        print("=" * 50)
        print(f"📊 Results: {updated_count} updated, {not_found_count} not found")
        
        if updated_count > 0:
            print(f"\n🎉 Successfully updated {updated_count} posts to use Cloudinary URLs!")
        else:
            print(f"\n⚠️  No matching Cloudinary URLs found")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    simple_update()
