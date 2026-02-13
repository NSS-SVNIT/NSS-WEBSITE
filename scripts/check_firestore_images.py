#!/usr/bin/env python3
"""
Check what Firebase image URLs are actually in Firestore
"""

import os
import json
import firebase_admin
from firebase_admin import credentials, firestore

def check_firestore_images():
    """Check actual Firebase image URLs in Firestore"""
    
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
        print("🔍 Checking Firestore image URLs...")
        print("=" * 50)
        
        # Get all posts from Firestore
        posts_ref = db.collection('posts')
        docs = posts_ref.stream()
        
        image_urls = []
        firebase_urls = []
        cloudinary_urls = []
        other_urls = []
        
        for doc in docs:
            post_data = doc.to_dict()
            post_id = doc.id
            
            if 'image' in post_data and post_data['image']:
                image_url = post_data['image']
                image_urls.append({
                    'post_id': post_id,
                    'title': post_data.get('title', 'No title'),
                    'image_url': image_url
                })
                
                # Categorize URLs
                if 'firebasestorage.googleapis.com' in image_url:
                    firebase_urls.append({
                        'post_id': post_id,
                        'title': post_data.get('title', 'No title'),
                        'url': image_url
                    })
                elif 'cloudinary.com' in image_url:
                    cloudinary_urls.append({
                        'post_id': post_id,
                        'title': post_data.get('title', 'No title'),
                        'url': image_url
                    })
                else:
                    other_urls.append({
                        'post_id': post_id,
                        'title': post_data.get('title', 'No title'),
                        'url': image_url
                    })
        
        print(f"📊 Total posts with images: {len(image_urls)}")
        print(f"🔥 Firebase URLs: {len(firebase_urls)}")
        print(f"☁️  Cloudinary URLs: {len(cloudinary_urls)}")
        print(f"🔗 Other URLs: {len(other_urls)}")
        
        # Analyze Firebase URL patterns
        print(f"\n🔍 Firebase URL Analysis:")
        firebase_patterns = {}
        for item in firebase_urls:
            url = item['url']
            if '/o/' in url:
                path = url.split('/o/')[1].split('?')[0]
                folder = path.split('/')[0] if '/' in path else 'root'
                if folder not in firebase_patterns:
                    firebase_patterns[folder] = 0
                firebase_patterns[folder] += 1
        
        for folder, count in firebase_patterns.items():
            print(f"  📁 {folder}: {count} images")
        
        # Show sample Firebase URLs
        print(f"\n📋 Sample Firebase URLs:")
        for i, item in enumerate(firebase_urls[:5], 1):
            print(f"  {i}. {item['title']}")
            print(f"     URL: {item['url']}")
            print()
        
        # Save analysis
        analysis = {
            'total_posts': len(image_urls),
            'firebase_urls': len(firebase_urls),
            'cloudinary_urls': len(cloudinary_urls),
            'other_urls': len(other_urls),
            'firebase_patterns': firebase_patterns,
            'firebase_url_details': firebase_urls[:10],  # First 10 for reference
            'all_image_urls': image_urls
        }
        
        with open('firestore_image_analysis.json', 'w') as f:
            json.dump(analysis, f, indent=2)
        
        print(f"\n📝 Analysis saved to: firestore_image_analysis.json")
        
    except Exception as e:
        print(f"❌ Error: {e}")

if __name__ == "__main__":
    check_firestore_images()
