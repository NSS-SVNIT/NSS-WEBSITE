#!/usr/bin/env python3
"""
Fix URL matching by decoding URL-encoded filenames
"""

import os
import json
import urllib.parse
import firebase_admin
from firebase_admin import credentials, firestore

def fix_url_matching():
    """Fix URL matching by decoding URL-encoded filenames"""
    
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
        print("🔄 Fixing URL matching...")
        print("=" * 60)
        
        # Read migration logs
        with open('folder_migration_log_20260206_230238.json', 'r') as f:
            images_migration = json.load(f)
        
        # Read Firestore analysis
        with open('firestore_image_analysis.json', 'r') as f:
            firestore_data = json.load(f)
        
        # Create filename to Cloudinary URL mapping (decode URLs first)
        filename_to_cloudinary = {}
        
        for file_info in images_migration['migrated_files']:
            firebase_path = file_info['firebase_path']
            cloudinary_url = file_info['cloudinary_url']
            
            # Extract clean filename from Firebase path
            clean_filename = firebase_path.split('/')[-1]  # e.g., "mock fire drill.jpg"
            filename_to_cloudinary[clean_filename.lower()] = cloudinary_url
        
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
                
                # Extract and decode filename from Firebase URL
                if 'firebasestorage.googleapis.com' in firebase_url:
                    # Extract filename from URL
                    url_parts = firebase_url.split('/')
                    filename_with_query = url_parts[-1]
                    filename = filename_with_query.split('?')[0]  # Remove query params
                    
                    # URL decode the filename
                    try:
                        decoded_filename = urllib.parse.unquote(filename)
                        print(f"🔍 Matching: {decoded_filename}")
                    except:
                        decoded_filename = filename
                    
                    # Try to find matching Cloudinary URL (case insensitive)
                    cloudinary_url = None
                    for key, url in filename_to_cloudinary.items():
                        if key.lower() == decoded_filename.lower():
                            cloudinary_url = url
                            break
                    
                    if cloudinary_url:
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
                        print(f"   Decoded filename: {decoded_filename}")
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
        
        with open('final_update_log_fixed.json', 'w') as f:
            json.dump(update_log, f, indent=2)
        
        print(f"\n📝 Update log saved to: final_update_log_fixed.json")
        
        if updated_count > 0:
            print("\n🎉 Firestore URL update completed!")
            print(f"📊 {updated_count} posts now use Cloudinary URLs")
        else:
            print("\n⚠️  No posts were updated")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    fix_url_matching()
