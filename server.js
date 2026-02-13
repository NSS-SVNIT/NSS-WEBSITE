// Simple dev server to proxy Cloudinary API calls
import express from 'express';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

cloudinary.config({
  cloud_name: process.env.VITE_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.VITE_CLOUDINARY_API_KEY,
  api_secret: process.env.VITE_CLOUDINARY_API_SECRET
});

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

app.get('/api/cloudinary', async (req, res) => {
  try {
    const result = await cloudinary.api.resources({
      type: 'upload',
      prefix: 'events_images/',
      max_results: 500
    });

    const folderMap = {};
    
    result.resources.forEach(resource => {
      const parts = resource.public_id.split('/');
      if (parts.length > 1) {
        const folderName = parts[1];
        
        if (!folderMap[folderName]) {
          folderMap[folderName] = {
            name: folderName,
            images: []
          };
        }
        
        folderMap[folderName].images.push({
          url: resource.secure_url,
          public_id: resource.public_id
        });
      }
    });

    res.json({
      success: true,
      albums: Object.values(folderMap)
    });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`✓ API server running on http://localhost:${PORT}`);
  console.log(`Cloudinary Cloud Name: ${process.env.VITE_CLOUDINARY_CLOUD_NAME}`);
});
