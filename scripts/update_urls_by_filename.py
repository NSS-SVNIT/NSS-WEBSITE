#!/usr/bin/env python3
"""
Update Firestore URLs by matching filenames
"""

import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

def update_urls_by_filename():
    """Update Firestore URLs by matching filenames"""
    
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
        print("🔄 Updating Firestore URLs by filename matching...")
        print("=" * 60)
        
        # Read migration logs
        with open('folder_migration_log_20260206_230238.json', 'r') as f:
            images_migration = json.load(f)
        
        # Read Firestore analysis
        with open('firestore_image_analysis.json', 'r') as f:
            firestore_data = json.load(f)
        
        # Create filename to Cloudinary URL mapping
        filename_to_cloudinary = {}
        
        for file_info in images_migration['migrated_files']:
            firebase_path = file_info['firebase_path']
            cloudinary_url = file_info['cloudinary_url']
            
            # Extract filename from Firebase path
            filename = firebase_path.split('/')[-1]  # e.g., "mock fire drill.jpg"
            filename_to_cloudinary[filename] = cloudinary_url
        
        print(f"📋 Created filename mapping for {len(filename_to_cloudinary)} images")
        
        # Update Firestore posts
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
                
                # Extract filename from Firebase URL
                if 'firebasestorage.googleapis.com' in firebase_url:
                    # Extract filename from URL
                    url_parts = firebase_url.split('/')
                    filename = url_parts[-1].split('?')[0]  # Get last part before ?
                    
                    # Try to find matching Cloudinary URL
                    if filename in filename_to_cloudinary:
                        cloudinary_url = filename_to_cloudinary[filename]
                        
                        try:
                            # Update the document
                            doc.reference.update({'image': cloudinary_url})
                            updated_count += 1
                            print(f"✅ Updated: {post_data.get('title', post_id)}")
                            print(f"   Old: {firebase_url}")
                            print(f"   New: {cloudinary_url}")
                            print()
                            
                        except Exception as e:
                            error_count += 1
                            print(f"❌ Error updating {post_id}: {e}")
                    else:
                        not_found_count += 1
                        print(f"⚠️  No Cloudinary match for: {post_data.get('title', post_id)}")
                        print(f"   Filename: {filename}")
                        print()
                else:
                    print(f"ℹ️  Already Cloudinary URL: {post_data.get('title', post_id)}")
        
        print("=" * 60)
        print("📊 Update Summary:")
        print(f"✅ Successfully updated: {updated_count} posts")
        print(f"⚠️  No Cloudinary match found: {not_found_count} posts")
        print(f"❌ Errors: {error_count} posts")
        
        # Save update log
        update_log = {
            'timestamp': '2026-02-07T00:00:00',
            'updated_posts': updated_count,
            'not_found_posts': not_found_count,
            'error_posts': error_count,
            'total_posts_processed': len(list(docs))
        }
        
        with open('final_update_log.json', 'w') as f:
            json.dump(update_log, f, indent=2)
        
        print(f"\n📝 Update log saved to: final_update_log.json")
        
        if updated_count > 0:
            print("\n🎉 Firestore URL update completed!")
            print(f"📊 {updated_count} posts now use Cloudinary URLs")
        else:
            print("\n⚠️  No posts were updated")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    update_urls_by_filename()
