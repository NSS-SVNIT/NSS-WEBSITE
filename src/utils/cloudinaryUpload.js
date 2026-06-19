import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY,
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  secure: true
});

/**
 * Upload image to Cloudinary with folder structure
 * @param {File} file - Image file to upload
 * @param {string} folder - Cloudinary folder name
 * @param {string} publicId - Public ID for the image
 * @returns {Promise<string>} - Cloudinary URL
 */
export const uploadToCloudinary = (file, folder = 'nss-events', publicId = null) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'nss-upload-preset'); // You need to create this in Cloudinary
    formData.append('folder', folder);
    
    if (publicId) {
      formData.append('public_id', publicId);
    }

    // Use unsigned upload for client-side
    const cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
    const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

    fetch(url, {
      method: 'POST',
      body: formData
    })
    .then(response => response.json())
    .then(data => {
      if (data.error) {
        reject(new Error(data.error.message));
      } else {
        resolve(data.secure_url);
      }
    })
    .catch(error => {
      reject(error);
    });
  });
};

/**
 * Delete image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete
 * @returns {Promise<boolean>} - Success status
 */
export const deleteFromCloudinary = async (publicId) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    return result.result === 'ok';
  } catch (error) {
    console.error('Error deleting from Cloudinary:', error);
    return false;
  }
};

export default cloudinary;
