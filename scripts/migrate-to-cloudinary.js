import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref, getDownloadURL, listAll } from 'firebase/storage';
import { v2 as cloudinary } from 'cloudinary';
import { getDocs, doc, updateDoc } from 'firebase/firestore';
import { writeFileSync } from 'fs';

// Firebase configuration (same as your firebase.js)
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "nss-svnit.firebaseapp.com",
  projectId: "nss-svnit",
  storageBucket: "nss-svnit.appspot.com",
  messagingSenderId: "1087350248008",
  appId: "1:1087350248008:web:0960756a28d32b01d23e7d",
  measurementId: "G-Z2TRT1KDBZ",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

// Configure Cloudinary (you'll need to set these environment variables)
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true
});

// Migration function
async function migrateImagesToCloudinary() {
  console.log('Starting migration from Firebase to Cloudinary...');
  
  try {
    // Get all posts from Firestore
    const postsSnapshot = await getDocs(collection(firestore, 'posts'));
    const posts = postsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    console.log(`Found ${posts.length} posts to process`);
    
    const migrationLog = [];
    let successCount = 0;
    let errorCount = 0;
    
    for (const post of posts) {
      if (!post.image) {
        console.log(`Post ${post.id} has no image, skipping...`);
        continue;
      }
      
      try {
        // Check if image is already from Cloudinary
        if (post.image.includes('cloudinary.com')) {
          console.log(`Post ${post.id} already uses Cloudinary, skipping...`);
          continue;
        }
        
        console.log(`Processing post: ${post.title || post.id}`);
        
        // Extract filename from Firebase URL
        const urlParts = post.image.split('/');
        const fileName = urlParts[urlParts.length - 1].split('?')[0];
        
        // Download image from Firebase
        const firebaseRef = ref(storage, `eventImages/${fileName}`);
        const imageUrl = await getDownloadURL(firebaseRef);
        
        // Upload to Cloudinary with folder structure
        const result = await cloudinary.uploader.upload(imageUrl, {
          folder: 'nss-events',
          public_id: `${post.id}_${fileName.split('.')[0]}`,
          resource_type: 'image',
          quality: 'auto:good',
          fetch_format: 'auto'
        });
        
        // Update Firestore document with new Cloudinary URL
        const postRef = doc(firestore, 'posts', post.id);
        await updateDoc(postRef, {
          image: result.secure_url
        });
        
        migrationLog.push({
          postId: post.id,
          title: post.title,
          oldUrl: post.image,
          newUrl: result.secure_url,
          status: 'success'
        });
        
        console.log(`✅ Successfully migrated ${post.title || post.id}`);
        successCount++;
        
        // Add delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 1000));
        
      } catch (error) {
        console.error(`❌ Error migrating post ${post.id}:`, error.message);
        migrationLog.push({
          postId: post.id,
          title: post.title,
          oldUrl: post.image,
          error: error.message,
          status: 'error'
        });
        errorCount++;
      }
    }
    
    // Save migration log
    writeFileSync('migration-log.json', JSON.stringify(migrationLog, null, 2));
    
    console.log('\n=== Migration Summary ===');
    console.log(`Total posts processed: ${posts.length}`);
    console.log(`Successfully migrated: ${successCount}`);
    console.log(`Errors: ${errorCount}`);
    console.log('Migration log saved to migration-log.json');
    
  } catch (error) {
    console.error('Migration failed:', error);
  }
}

// Run migration
migrateImagesToCloudinary();
