#!/usr/bin/env python3
"""
Update Firestore image URLs from Firebase to Cloudinary
"""

import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

def update_firestore_urls():
    """Update Firestore image URLs with Cloudinary URLs"""
    
    # Initialize Firebase Admin
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
        # Read migration log to get URL mapping
        with open('folder_migration_log_20260206_230238.json', 'r') as f:
            migration_log = json.load(f)
        
        print("🔄 Updating Firestore URLs...")
        print("=" * 50)
        
        # Create Firebase to Cloudinary URL mapping
        url_mapping = {}
        for file_info in migration_log['migrated_files']:
            firebase_path = file_info['firebase_path']
            cloudinary_url = file_info['cloudinary_url']
            
            # Try to construct Firebase URL from path
            firebase_url = f"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/{firebase_path.replace('/', '%2F')}?alt=media"
            url_mapping[firebase_url] = cloudinary_url
        
        print(f"📋 Created mapping for {len(url_mapping)} images")
        
        # Get all posts from Firestore
        posts_ref = db.collection('posts')
        docs = posts_ref.stream()
        
        updated_count = 0
        not_found_count = 0
        error_count = 0
        
        for doc in docs:
            post_data = doc.to_dict()
            post_id = doc.id
            
            if 'image' in post_data and post_data['image']:
                firebase_url = post_data['image']
                
                # Check if this URL needs updating
                if firebase_url in url_mapping:
                    cloudinary_url = url_mapping[firebase_url]
                    
                    try:
                        # Update the document
                        doc.reference.update({'image': cloudinary_url})
                        updated_count += 1
                        print(f"✅ Updated post: {post_data.get('title', post_id)}")
                        print(f"   Old: {firebase_url}")
                        print(f"   New: {cloudinary_url}")
                        print()
                        
                    except Exception as e:
                        error_count += 1
                        print(f"❌ Error updating post {post_id}: {e}")
                        
                elif 'firebasestorage.googleapis.com' in firebase_url:
                    # Firebase URL not found in migration log
                    not_found_count += 1
                    print(f"⚠️  Firebase URL not in migration log: {post_data.get('title', post_id)}")
                    print(f"   URL: {firebase_url}")
                    print()
        
        print("=" * 50)
        print("📊 Update Summary:")
        print(f"✅ Successfully updated: {updated_count} posts")
        print(f"⚠️  Firebase URLs not found in migration: {not_found_count} posts")
        print(f"❌ Errors: {error_count} posts")
        
        # Save update log
        update_log = {
            'timestamp': '2026-02-06T23:30:00',
            'updated_posts': updated_count,
            'not_found_posts': not_found_count,
            'error_posts': error_count,
            'url_mapping_count': len(url_mapping)
        }
        
        with open('firestore_update_log.json', 'w') as f:
            json.dump(update_log, f, indent=2)
        
        print(f"📝 Update log saved to: firestore_update_log.json")
        
    except FileNotFoundError:
        print("❌ Migration log file not found!")
        print("Make sure 'folder_migration_log_20260206_230238.json' exists")
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    update_firestore_urls()
