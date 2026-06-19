#!/usr/bin/env python3
"""
Firebase to Cloudinary Image Migration Script
Migrates all event images from Firebase Storage to Cloudinary and updates Firestore URLs
"""

import os
import json
import requests
import time
from datetime import datetime
from typing import Dict, List, Optional, Tuple
import firebase_admin
from firebase_admin import credentials, firestore, storage
from cloudinary import uploader, config
from cloudinary.api import delete_resources_by_prefix

class FirebaseToCloudinaryMigrator:
    def __init__(self):
        """Initialize the migrator with Firebase and Cloudinary configurations"""
        self.migration_log = []
        self.success_count = 0
        self.error_count = 0
        self.skipped_count = 0
        
    def setup_firebase(self, service_account_path: str):
        """Initialize Firebase Admin SDK"""
        try:
            cred = credentials.Certificate(service_account_path)
            firebase_admin.initialize_app(cred, {
                'storageBucket': 'nss-svnit.appspot.com'
            })
            self.db = firestore.client()
            self.bucket = storage.bucket()
            print("✅ Firebase initialized successfully")
        except Exception as e:
            print(f"❌ Firebase initialization failed: {e}")
            raise
    
    def setup_cloudinary(self, cloud_name: str, api_key: str, api_secret: str):
        """Configure Cloudinary"""
        try:
            config(
                cloud_name=cloud_name,
                api_key=api_key,
                api_secret=api_secret,
                secure=True
            )
            print("✅ Cloudinary configured successfully")
        except Exception as e:
            print(f"❌ Cloudinary configuration failed: {e}")
            raise
    
    def list_all_files_in_folder(self, folder_path: str) -> List[Dict]:
        """List all files and folders in a Firebase Storage folder"""
        try:
            blobs = self.bucket.list_blobs(prefix=folder_path)
            files = []
            folders = set()
            
            for blob in blobs:
                # Remove the prefix to get relative path
                relative_path = blob.name[len(folder_path):].lstrip('/')
                
                if relative_path:
                    if '/' in relative_path:
                        # It's a subfolder
                        folder_name = relative_path.split('/')[0]
                        folders.add(folder_name)
                    else:
                        # It's a file
                        files.append({
                            'name': blob.name,
                            'path': relative_path,
                            'size': blob.size,
                            'updated': blob.updated
                        })
            
            return {
                'files': files,
                'folders': list(folders)
            }
        except Exception as e:
            print(f"❌ Error listing folder {folder_path}: {e}")
            return {'files': [], 'folders': []}
    
    def migrate_folder_to_cloudinary(self, firebase_folder: str, cloudinary_folder: str) -> Dict:
        """Migrate entire folder from Firebase to Cloudinary preserving structure"""
        migration_result = {
            'source_folder': firebase_folder,
            'destination_folder': cloudinary_folder,
            'status': 'pending',
            'files_migrated': 0,
            'files_failed': 0,
            'total_size': 0,
            'errors': [],
            'migrated_files': []
        }
        
        try:
            print(f"🔄 Starting migration of folder: {firebase_folder}")
            
            # List all files in the folder recursively
            blobs = self.bucket.list_blobs(prefix=firebase_folder)
            files_to_migrate = []
            
            for blob in blobs:
                if blob.name.endswith('/'):  # Skip folder markers
                    continue
                    
                files_to_migrate.append({
                    'blob': blob,
                    'firebase_path': blob.name,
                    'relative_path': blob.name[len(firebase_folder):].lstrip('/'),
                    'size': blob.size
                })
            
            if not files_to_migrate:
                migration_result['status'] = 'completed'
                migration_result['message'] = 'No files found in folder'
                print(f"⚠️  No files found in folder: {firebase_folder}")
                return migration_result
            
            print(f"📁 Found {len(files_to_migrate)} files to migrate")
            
            # Migrate each file
            for i, file_info in enumerate(files_to_migrate, 1):
                blob = file_info['blob']
                relative_path = file_info['relative_path']
                
                print(f"📊 Progress: {i}/{len(files_to_migrate)} - {relative_path}")
                
                try:
                    # Download file from Firebase
                    file_data = blob.download_as_bytes()
                    
                    # Create Cloudinary public_id preserving folder structure
                    file_name = os.path.splitext(relative_path)[0]
                    public_id = f"{cloudinary_folder}/{file_name}"
                    
                    # Upload to Cloudinary
                    result = uploader.upload(
                        file_data,
                        public_id=public_id,
                        resource_type="auto",  # Auto-detect resource type
                        quality="auto:good",
                        fetch_format="auto",
                        use_filename=True,
                        unique_filename=False
                    )
                    
                    migration_result['files_migrated'] += 1
                    migration_result['total_size'] += file_info['size']
                    migration_result['migrated_files'].append({
                        'firebase_path': file_info['firebase_path'],
                        'cloudinary_url': result['secure_url'],
                        'public_id': result['public_id'],
                        'size': file_info['size']
                    })
                    
                    print(f"✅ Migrated: {relative_path} -> {result['secure_url']}")
                    
                    # Add delay to avoid rate limiting
                    time.sleep(0.5)
                    
                except Exception as e:
                    error_msg = f"Failed to migrate {relative_path}: {str(e)}"
                    migration_result['errors'].append(error_msg)
                    migration_result['files_failed'] += 1
                    print(f"❌ {error_msg}")
            
            migration_result['status'] = 'completed'
            print(f"🎉 Folder migration completed!")
            print(f"📊 Summary: {migration_result['files_migrated']} successful, {migration_result['files_failed']} failed")
            
        except Exception as e:
            migration_result['status'] = 'failed'
            migration_result['errors'].append(f"Migration failed: {str(e)}")
            print(f"❌ Folder migration failed: {e}")
        
        return migration_result

    def get_all_posts(self) -> List[Dict]:
        """Retrieve all posts from Firestore"""
        try:
            posts_ref = self.db.collection('posts')
            docs = posts_ref.stream()
            posts = []
            
            for doc in docs:
                post_data = doc.to_dict()
                post_data['id'] = doc.id
                posts.append(post_data)
            
            print(f"📄 Found {len(posts)} posts in Firestore")
            return posts
        except Exception as e:
            print(f"❌ Error fetching posts: {e}")
            raise
    
    def extract_filename_from_url(self, firebase_url: str) -> Optional[str]:
        """Extract filename from Firebase Storage URL"""
        try:
            # Handle different Firebase URL formats
            if 'firebasestorage.googleapis.com' in firebase_url:
                # Format: https://firebasestorage.googleapis.com/v0/b/bucket/o/path%2Ffilename?token=...
                url_parts = firebase_url.split('/o/')
                if len(url_parts) > 1:
                    path_with_token = url_parts[1]
                    filename_with_token = path_with_token.split('?')[0]
                    filename = filename_with_token.split('%2F')[-1]
                    return filename
            elif 'storage.googleapis.com' in firebase_url:
                # Format: https://storage.googleapis.com/bucket/path/filename
                url_parts = firebase_url.split('/')
                return url_parts[-1] if url_parts else None
            else:
                # Try to extract from any URL format
                return firebase_url.split('/')[-1].split('?')[0]
        except Exception as e:
            print(f"⚠️  Error extracting filename from URL {firebase_url}: {e}")
            return None
    
    def download_image_from_firebase(self, image_path: str) -> Optional[bytes]:
        """Download image from Firebase Storage"""
        try:
            blob = self.bucket.blob(image_path)
            if blob.exists():
                image_data = blob.download_as_bytes()
                print(f"📥 Downloaded {image_path}")
                return image_data
            else:
                print(f"⚠️  Image not found in Firebase: {image_path}")
                return None
        except Exception as e:
            print(f"❌ Error downloading {image_path}: {e}")
            return None
    
    def upload_to_cloudinary(self, image_data: bytes, post_id: str, filename: str) -> Optional[str]:
        """Upload image to Cloudinary"""
        try:
            # Create public ID from post ID and filename
            file_base = os.path.splitext(filename)[0]
            public_id = f"nss-events/{post_id}_{file_base}"
            
            # Upload to Cloudinary with optimizations
            result = uploader.upload(
                image_data,
                public_id=public_id,
                folder="nss-events",
                resource_type="image",
                quality="auto:good",
                fetch_format="auto",
                eager=[{"quality": "auto:good", "fetch_format": "auto"}]
            )
            
            print(f"☁️  Uploaded to Cloudinary: {result['secure_url']}")
            return result['secure_url']
        except Exception as e:
            print(f"❌ Error uploading to Cloudinary: {e}")
            return None
    
    def update_firestore_url(self, post_id: str, new_url: str) -> bool:
        """Update image URL in Firestore"""
        try:
            post_ref = self.db.collection('posts').document(post_id)
            post_ref.update({'image': new_url})
            print(f"🔄 Updated Firestore URL for post {post_id}")
            return True
        except Exception as e:
            print(f"❌ Error updating Firestore: {e}")
            return False
    
    def is_cloudinary_url(self, url: str) -> bool:
        """Check if URL is already from Cloudinary"""
        return 'cloudinary.com' in url
    
    def migrate_post(self, post: Dict) -> Dict:
        """Migrate a single post's image"""
        migration_result = {
            'post_id': post['id'],
            'title': post.get('title', 'Untitled'),
            'old_url': post.get('image', ''),
            'new_url': '',
            'status': 'pending',
            'error': '',
            'timestamp': datetime.now().isoformat()
        }
        
        try:
            # Skip if no image
            if not post.get('image'):
                migration_result['status'] = 'skipped'
                migration_result['error'] = 'No image in post'
                self.skipped_count += 1
                return migration_result
            
            # Skip if already using Cloudinary
            if self.is_cloudinary_url(post['image']):
                migration_result['status'] = 'skipped'
                migration_result['error'] = 'Already using Cloudinary'
                self.skipped_count += 1
                return migration_result
            
            print(f"\n🔄 Processing post: {post.get('title', post['id'])}")
            
            # Extract filename from Firebase URL
            filename = self.extract_filename_from_url(post['image'])
            if not filename:
                migration_result['status'] = 'error'
                migration_result['error'] = 'Could not extract filename'
                self.error_count += 1
                return migration_result
            
            # Try to determine the Firebase storage path
            # Common patterns for event images
            possible_paths = [
                f"eventImages/{filename}",
                f"events/{filename}",
                filename
            ]
            
            image_data = None
            image_path = None
            
            # Try different paths to find the image
            for path in possible_paths:
                image_data = self.download_image_from_firebase(path)
                if image_data:
                    image_path = path
                    break
            
            if not image_data:
                migration_result['status'] = 'error'
                migration_result['error'] = f'Image not found in Firebase. Tried paths: {possible_paths}'
                self.error_count += 1
                return migration_result
            
            # Upload to Cloudinary
            new_url = self.upload_to_cloudinary(image_data, post['id'], filename)
            if not new_url:
                migration_result['status'] = 'error'
                migration_result['error'] = 'Cloudinary upload failed'
                self.error_count += 1
                return migration_result
            
            # Update Firestore
            if self.update_firestore_url(post['id'], new_url):
                migration_result['new_url'] = new_url
                migration_result['status'] = 'success'
                migration_result['firebase_path'] = image_path
                self.success_count += 1
            else:
                migration_result['status'] = 'error'
                migration_result['error'] = 'Firestore update failed'
                self.error_count += 1
            
        except Exception as e:
            migration_result['status'] = 'error'
            migration_result['error'] = str(e)
            self.error_count += 1
            print(f"❌ Unexpected error: {e}")
        
        return migration_result
    
    def run_migration(self) -> Dict:
        """Run the complete migration process"""
        print("🚀 Starting Firebase to Cloudinary migration...")
        print("=" * 50)
        
        try:
            # Get all posts
            posts = self.get_all_posts()
            
            if not posts:
                print("⚠️  No posts found to migrate")
                return {'status': 'no_posts'}
            
            # Process each post
            for i, post in enumerate(posts, 1):
                print(f"\n📊 Progress: {i}/{len(posts)}")
                result = self.migrate_post(post)
                self.migration_log.append(result)
                
                # Add delay to avoid rate limiting
                time.sleep(1)
            
            # Save migration log
            self.save_migration_log()
            
            # Print summary
            self.print_summary()
            
            return {
                'status': 'completed',
                'total_posts': len(posts),
                'success_count': self.success_count,
                'error_count': self.error_count,
                'skipped_count': self.skipped_count
            }
            
        except Exception as e:
            print(f"❌ Migration failed: {e}")
            return {'status': 'failed', 'error': str(e)}
    
    def save_folder_migration_log(self, migration_result: Dict):
        """Save folder migration log to file"""
        log_filename = f"folder_migration_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        log_data = {
            'migration_info': {
                'timestamp': datetime.now().isoformat(),
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
        
        try:
            with open(log_filename, 'w') as f:
                json.dump(log_data, f, indent=2)
            print(f"\n📝 Folder migration log saved to: {log_filename}")
        except Exception as e:
            print(f"❌ Error saving folder migration log: {e}")

    def save_migration_log(self):
        """Save migration log to file"""
        log_filename = f"migration_log_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"
        
        log_data = {
            'migration_info': {
                'timestamp': datetime.now().isoformat(),
                'total_posts': len(self.migration_log),
                'success_count': self.success_count,
                'error_count': self.error_count,
                'skipped_count': self.skipped_count
            },
            'migrations': self.migration_log
        }
        
        try:
            with open(log_filename, 'w') as f:
                json.dump(log_data, f, indent=2)
            print(f"\n📝 Migration log saved to: {log_filename}")
        except Exception as e:
            print(f"❌ Error saving migration log: {e}")
    
    def print_summary(self):
        """Print migration summary"""
        print("\n" + "=" * 50)
        print("📊 MIGRATION SUMMARY")
        print("=" * 50)
        print(f"Total posts processed: {len(self.migration_log)}")
        print(f"✅ Successfully migrated: {self.success_count}")
        print(f"❌ Errors: {self.error_count}")
        print(f"⏭️  Skipped: {self.skipped_count}")
        
        if self.error_count > 0:
            print(f"\n❌ Errors encountered:")
            for log in self.migration_log:
                if log['status'] == 'error':
                    print(f"   - {log['title']}: {log['error']}")
        
        print("\n🎉 Migration completed!")


def main():
    """Main function to run the migration"""
    
    print("🔧 Firebase to Cloudinary Migration Tool")
    print("=" * 50)
    
    # Configuration
    config = {
        'firebase_service_account': os.getenv('FIREBASE_SERVICE_ACCOUNT', 'service-account-key.json'),
        'cloudinary_cloud_name': os.getenv('CLOUDINARY_CLOUD_NAME'),
        'cloudinary_api_key': os.getenv('CLOUDINARY_API_KEY'),
        'cloudinary_api_secret': os.getenv('CLOUDINARY_API_SECRET')
    }
    
    # Validate configuration
    if not all([config['cloudinary_cloud_name'], config['cloudinary_api_key'], config['cloudinary_api_secret']]):
        print("❌ Missing Cloudinary configuration!")
        print("Please set the following environment variables:")
        print("- CLOUDINARY_CLOUD_NAME")
        print("- CLOUDINARY_API_KEY") 
        print("- CLOUDINARY_API_SECRET")
        return
    
    if not os.path.exists(config['firebase_service_account']):
        print(f"❌ Firebase service account file not found: {config['firebase_service_account']}")
        print("Please download your service account key from Firebase Console")
        return
    
    # Initialize migrator
    migrator = FirebaseToCloudinaryMigrator()
    
    try:
        # Setup services
        migrator.setup_firebase(config['firebase_service_account'])
        migrator.setup_cloudinary(
            config['cloudinary_cloud_name'],
            config['cloudinary_api_key'],
            config['cloudinary_api_secret']
        )
        
        # Ask user what to migrate
        print("\n📋 What would you like to migrate?")
        print("1. Migrate 'images' folder to 'events_images' (folder structure)")
        print("2. Migrate post images from Firestore (individual posts)")
        print("3. Both")
        
        choice = input("\nEnter your choice (1, 2, or 3): ").strip()
        
        if choice in ['1', '3']:
            print("\n🚀 Starting folder migration...")
            print("Migrating: images/ -> events_images/")
            
            # First, list what's in the images folder
            print("\n📁 Exploring Firebase Storage structure...")
            folder_info = migrator.list_all_files_in_folder('images/')
            
            if folder_info['folders']:
                print(f"Found {len(folder_info['folders'])} subfolders:")
                for folder in folder_info['folders'][:10]:  # Show first 10
                    print(f"  📂 {folder}/")
                if len(folder_info['folders']) > 10:
                    print(f"  ... and {len(folder_info['folders']) - 10} more")
            
            if folder_info['files']:
                print(f"Found {len(folder_info['files'])} files in root:")
                for file in folder_info['files'][:5]:  # Show first 5
                    print(f"  📄 {file['path']}")
                if len(folder_info['files']) > 5:
                    print(f"  ... and {len(folder_info['files']) - 5} more")
            
            confirm = input(f"\nProceed with migrating {len(folder_info['folders'])} folders and {len(folder_info['files'])} files? (y/N): ").strip().lower()
            
            if confirm == 'y':
                result = migrator.migrate_folder_to_cloudinary('images/', 'events_images')
                migrator.save_folder_migration_log(result)
                
                if result['status'] == 'completed':
                    print(f"\n🎉 Folder migration completed successfully!")
                    print(f"📊 Results: {result['files_migrated']} files migrated, {result['files_failed']} failed")
                    print(f"💾 Total size: {round(result['total_size'] / (1024 * 1024), 2)} MB")
                else:
                    print(f"\n❌ Folder migration failed!")
                    for error in result['errors']:
                        print(f"   - {error}")
            else:
                print("❌ Folder migration cancelled")
        
        if choice in ['2', '3']:
            print("\n🚀 Starting post migration...")
            result = migrator.run_migration()
            
            if result['status'] == 'completed':
                print(f"\n🎉 Post migration completed successfully!")
                print(f"📊 Results: {result['success_count']} migrated, {result['error_count']} errors, {result['skipped_count']} skipped")
            else:
                print(f"\n❌ Post migration failed: {result.get('error', 'Unknown error')}")
        
        if choice not in ['1', '2', '3']:
            print("❌ Invalid choice. Please run the script again.")
            
    except Exception as e:
        print(f"❌ Migration failed with exception: {e}")


if __name__ == "__main__":
    main()
