#!/usr/bin/env python3
"""
Migrate missing images from Firebase Storage to Cloudinary
"""

import os
import json
import time
from firebase_admin import credentials, firestore, storage
from cloudinary import uploader, config

def migrate_missing_images():
    """Migrate all missing images from Firebase to Cloudinary"""
    
    # Initialize Firebase
    try:
        cred = credentials.Certificate('service-account-key.json')
        firebase_admin.initialize_app(cred, {
            'projectId': 'nss-svnit',
            'storageBucket': 'nss-svnit.appspot.com'
        })
        bucket = storage.bucket()
        print("✅ Firebase initialized successfully")
    except Exception as e:
        print(f"❌ Firebase initialization failed: {e}")
        return
    
    try:
        print("🔍 Finding missing images...")
        print("=" * 60)
        
        # Get all needed filenames from Firestore
        with open('firestore_image_analysis.json', 'r') as f:
            firestore_data = json.load(f)
        
        needed_filenames = set()
        for item in firestore_data['firebase_url_details']:
            firebase_url = item['url']
            if 'firebasestorage.googleapis.com' in firebase_url:
                # Extract filename from URL
                url_parts = firebase_url.split('/')
                filename_with_query = url_parts[-1]
                filename = filename_with_query.split('?')[0]
                needed_filenames.add(filename)
        
        print(f"📋 Need to find {len(needed_filenames)} images in Firebase Storage")
        
        # List all files in Firebase Storage (both folders)
        all_blobs = {}
        
        # Check images/ folder
        print("\n📁 Checking images/ folder...")
        blobs = bucket.list_blobs(prefix='images/')
        for blob in blobs:
            if not blob.name.endswith('/'):
                filename = blob.name.split('/')[-1]
                if filename in needed_filenames:
                    all_blobs[filename] = {
                        'blob': blob,
                        'path': blob.name,
                        'folder': 'images/'
                    }
        
        # Check eventImages/ folder  
        print("\n📁 Checking eventImages/ folder...")
        blobs = bucket.list_blobs(prefix='eventImages/')
        for blob in blobs:
            if not blob.name.endswith('/'):
                filename = blob.name.split('/')[-1]
                if filename in needed_filenames:
                    all_blobs[filename] = {
                        'blob': blob,
                        'path': blob.name,
                        'folder': 'eventImages/'
                    }
        
        print(f"\n📊 Found {len(all_blobs)} matching files in Firebase Storage")
        
        # Migrate missing files
        migration_result = {
            'status': 'pending',
            'files_migrated': 0,
            'files_failed': 0,
            'total_size': 0,
            'errors': [],
            'migrated_files': []
        }
        
        for i, (filename, file_info) in enumerate(all_blobs.items(), 1):
            print(f"\n📊 Progress: {i}/{len(all_blobs)} - {filename}")
            
            try:
                # Download file from Firebase
                file_data = file_info['blob'].download_as_bytes()
                
                # Create Cloudinary public_id
                file_base_name = os.path.splitext(filename)[0]
                public_id = f"events_images/{file_base_name}"
                
                # Upload to Cloudinary
                result = uploader.upload(
                    file_data,
                    public_id=public_id,
                    folder="events_images",
                    resource_type="image",
                    quality="auto:good",
                    fetch_format="auto",
                    use_filename=True,
                    unique_filename=False
                )
                
                if result.get('secure_url'):
                    migration_result['files_migrated'] += 1
                    migration_result['total_size'] += file_info['blob'].size
                    migration_result['migrated_files'].append({
                        'firebase_path': file_info['path'],
                        'cloudinary_url': result['secure_url'],
                        'public_id': result['public_id'],
                        'filename': filename,
                        'folder': file_info['folder'],
                        'size': file_info['blob'].size
                    })
                    
                    print(f"✅ Migrated: {filename} -> {result['secure_url']}")
                    
                    # Add delay to avoid rate limiting
                    time.sleep(0.5)
                else:
                    raise Exception("Cloudinary upload failed")
                    
            except Exception as e:
                error_msg = f"Failed to migrate {filename}: {str(e)}"
                migration_result['errors'].append(error_msg)
                migration_result['files_failed'] += 1
                print(f"❌ {error_msg}")
        
        migration_result['status'] = 'completed'
        
        print(f"\n🎉 Migration completed!")
        print(f"📊 Summary: {migration_result['files_migrated']} successful, {migration_result['files_failed']} failed")
        print(f"💾 Total size: {round(migration_result['total_size'] / (1024 * 1024), 2)} MB")
        
        # Save migration log
        log_filename = f"complete_migration_log_{time.strftime('%Y%m%d_%H%M%S')}.json"
        
        log_data = {
            'migration_info': {
                'timestamp': time.strftime('%Y-%m-%dT%H:%M:%S'),
                'status': migration_result['status'],
                'files_migrated': migration_result['files_migrated'],
                'files_failed': migration_result['files_failed'],
                'total_size_mb': round(migration_result['total_size'] / (1024 * 1024), 2)
            },
            'migrated_files': migration_result['migrated_files'],
            'errors': migration_result['errors']
        }
        
        with open(log_filename, 'w') as f:
            json.dump(log_data, f, indent=2)
        
        print(f"\n📝 Migration log saved to: {log_filename}")
        
        # Now update Firestore URLs
        print(f"\n🔄 Updating Firestore URLs...")
        
        # Create filename to Cloudinary URL mapping
        filename_to_cloudinary = {}
        for file_info in migration_result['migrated_files']:
            filename_to_cloudinary[file_info['filename']] = file_info['cloudinary_url']
        
        # Update Firestore
        db = firestore.client()
        posts_ref = db.collection('posts')
        docs = posts_ref.stream()
        
        updated_count = 0
        for doc in docs:
            post_data = doc.to_dict()
            post_id = doc.id
            
            if 'image' in post_data and post_data['image']:
                firebase_url = post_data['image']
                
                if 'firebasestorage.googleapis.com' in firebase_url:
                    # Extract filename from Firebase URL
                    url_parts = firebase_url.split('/')
                    filename_with_query = url_parts[-1]
                    filename = filename_with_query.split('?')[0]
                    
                    # Find matching Cloudinary URL
                    if filename in filename_to_cloudinary:
                        cloudinary_url = filename_to_cloudinary[filename]
                        
                        try:
                            # Update the document
                            doc.reference.update({'image': cloudinary_url})
                            updated_count += 1
                            print(f"✅ Updated: {post_data.get('title', post_id)}")
                            print(f"   New: {cloudinary_url}")
                        except Exception as e:
                            print(f"❌ Error updating {post_id}: {e}")
        
        print(f"\n🎉 Complete! Updated {updated_count} Firestore documents with Cloudinary URLs")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    migrate_missing_images()
