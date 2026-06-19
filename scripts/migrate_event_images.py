#!/usr/bin/env python3
"""
Migrate eventImages folder from Firebase to Cloudinary
"""

import os
import json
import time
from firebase_admin import credentials, firestore, storage
from cloudinary import uploader, config

def migrate_event_images():
    """Migrate eventImages folder from Firebase to Cloudinary"""
    
    # Initialize Firebase
    try:
        cred = credentials.Certificate('service-account-key.json')
        firebase_admin.initialize_app(cred, {
            'projectId': 'nss-svnit',
            'storageBucket': 'nss-svnit.appspot.com'
        })
        db = firestore.client()
        bucket = storage.bucket()
        print("✅ Firebase initialized successfully")
    except Exception as e:
        print(f"❌ Firebase initialization failed: {e}")
        return
    
    try:
        print("🔄 Migrating eventImages folder...")
        print("=" * 50)
        
        # List all files in eventImages folder
        blobs = bucket.list_blobs(prefix='eventImages/')
        files_to_migrate = []
        
        for blob in blobs:
            if blob.name.endswith('/'):  # Skip folder markers
                continue
                
            files_to_migrate.append({
                'blob': blob,
                'firebase_path': blob.name,
                'relative_path': blob.name[len('eventImages/'):],  # Remove prefix
                'size': blob.size
            })
        
        if not files_to_migrate:
            print("⚠️  No files found in eventImages folder")
            return
        
        print(f"📁 Found {len(files_to_migrate)} files in eventImages/")
        
        # Read Firestore analysis to get post titles
        with open('firestore_image_analysis.json', 'r') as f:
            firestore_data = json.load(f)
        
        # Create URL mapping from Firebase to post info
        url_to_post = {}
        for item in firestore_data['firebase_url_details']:
            url_to_post[item['url']] = {
                'post_id': item['post_id'],
                'title': item['title']
            }
        
        migration_result = {
            'source_folder': 'eventImages/',
            'destination_folder': 'events_images',
            'status': 'pending',
            'files_migrated': 0,
            'files_failed': 0,
            'total_size': 0,
            'errors': [],
            'migrated_files': []
        }
        
        # Migrate each file
        for i, file_info in enumerate(files_to_migrate, 1):
            blob = file_info['blob']
            relative_path = file_info['relative_path']
            
            # Get post info if available
            firebase_url = f"https://firebasestorage.googleapis.com/v0/b/nss-svnit.appspot.com/o/{file_info['firebase_path'].replace('/', '%2F')}?alt=media"
            post_info = url_to_post.get(firebase_url, {'title': relative_path})
            
            print(f"📊 Progress: {i}/{len(files_to_migrate)} - {post_info['title']}")
            
            try:
                # Download file from Firebase
                file_data = blob.download_as_bytes()
                
                # Create Cloudinary public_id
                file_base_name = os.path.splitext(relative_path)[0]
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
                    migration_result['total_size'] += file_info['size']
                    migration_result['migrated_files'].append({
                        'firebase_path': file_info['firebase_path'],
                        'cloudinary_url': result['secure_url'],
                        'public_id': result['public_id'],
                        'post_title': post_info['title'],
                        'post_id': post_info.get('post_id', ''),
                        'size': file_info['size']
                    })
                    
                    print(f"✅ Migrated: {relative_path} -> {result['secure_url']}")
                    
                    # Update Firestore with new URL
                    if post_info.get('post_id'):
                        try:
                            doc_ref = db.collection('posts').document(post_info['post_id'])
                            doc_ref.update({'image': result['secure_url']})
                            print(f"🔄 Updated Firestore for: {post_info['title']}")
                        except Exception as e:
                            print(f"⚠️  Firestore update failed: {e}")
                    
                else:
                    raise Exception("Cloudinary upload failed")
                
                # Add delay to avoid rate limiting
                time.sleep(0.5)
                
            except Exception as e:
                error_msg = f"Failed to migrate {relative_path}: {str(e)}"
                migration_result['errors'].append(error_msg)
                migration_result['files_failed'] += 1
                print(f"❌ {error_msg}")
        
        migration_result['status'] = 'completed'
        
        print(f"\n🎉 eventImages migration completed!")
        print(f"📊 Summary: {migration_result['files_migrated']} successful, {migration_result['files_failed']} failed")
        print(f"💾 Total size: {round(migration_result['total_size'] / (1024 * 1024), 2)} MB")
        
        # Save migration log
        log_filename = f"event_images_migration_log_{time.strftime('%Y%m%d_%H%M%S')}.json"
        
        log_data = {
            'migration_info': {
                'timestamp': time.strftime('%Y-%m-%dT%H:%M:%S'),
                'source_folder': migration_result['source_folder'],
                'destination_folder': migration_result['destination_folder'],
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
        
        # Create URL mapping file
        with open('event_images_cloudinary_urls.txt', 'w') as f:
            f.write("Event Images Cloudinary URLs\n")
            f.write("=" * 40 + "\n\n")
            
            for file_info in migration_result['migrated_files']:
                f.write(f"{file_info['post_title']}\n")
                f.write(f"Post ID: {file_info['post_id']}\n")
                f.write(f"Cloudinary URL: {file_info['cloudinary_url']}\n\n")
        
        print(f"✅ URLs saved to: event_images_cloudinary_urls.txt")
        
    except Exception as e:
        print(f"❌ Migration failed: {e}")

if __name__ == "__main__":
    migrate_event_images()
