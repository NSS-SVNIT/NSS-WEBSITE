// Cloudinary Gallery Service
// Fetches and organizes gallery data from Cloudinary

const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
const CLOUDINARY_API_KEY = process.env.REACT_APP_CLOUDINARY_API_KEY;
const CLOUDINARY_API_SECRET = process.env.REACT_APP_CLOUDINARY_API_SECRET;

// Helper function to extract year from folder name
const extractYearFromFolder = (folderName) => {
  // Try to extract year from folder name
  const yearMatch = folderName.match(/20\d{2}/);
  if (yearMatch) {
    return yearMatch[0];
  }
  
  // Default to current year if no year found
  return new Date().getFullYear().toString();
};

// Helper function to get folder display name
const getFolderDisplayName = (folderName) => {
  // Convert folder names to readable format
  return folderName
    .replace(/%20/g, ' ')
    .replace(/_/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
};

// Fetch all folders from Cloudinary
export const fetchCloudinaryFolders = async () => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/folders/events_images`,
      {
        headers: {
          'Authorization': `Basic ${btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`)}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch folders');
    }

    const data = await response.json();
    return data.folders || [];
  } catch (error) {
    console.error('Error fetching Cloudinary folders:', error);
    return [];
  }
};

// Fetch images from a specific folder
export const fetchImagesFromFolder = async (folderPath) => {
  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/resources/image/upload?prefix=${folderPath}&max_results=100`,
      {
        headers: {
          'Authorization': `Basic ${btoa(`${CLOUDINARY_API_KEY}:${CLOUDINARY_API_SECRET}`)}`
        }
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images');
    }

    const data = await response.json();
    
    // Transform Cloudinary resources to our format
    return data.resources.map(resource => ({
      url: resource.secure_url,
      public_id: resource.public_id,
      format: resource.format,
      width: resource.width,
      height: resource.height,
      created_at: resource.created_at
    }));
  } catch (error) {
    console.error('Error fetching images from folder:', error);
    return [];
  }
};

// Organize folders by year and events
export const organizeGalleryData = async () => {
  try {
    // Fetch all folders in events_images
    const folders = await fetchCloudinaryFolders();
    
    // Organize by year
    const galleryData = {};
    
    for (const folder of folders) {
      const folderName = folder.name;
      const year = extractYearFromFolder(folderName);
      const displayName = getFolderDisplayName(folderName);
      
      // Fetch images for this folder
      const images = await fetchImagesFromFolder(`events_images/${folderName}`);
      
      // Create year entry if not exists
      if (!galleryData[year]) {
        galleryData[year] = {
          year: year,
          events: []
        };
      }
      
      // Add event to year
      galleryData[year].events.push({
        id: folderName,
        name: displayName,
        folderName: folderName,
        images: images,
        imageCount: images.length,
        thumbnail: images.length > 0 ? images[0].url : null
      });
    }
    
    // Sort events alphabetically within each year
    Object.keys(galleryData).forEach(year => {
      galleryData[year].events.sort((a, b) => a.name.localeCompare(b.name));
    });
    
    // Sort years in descending order (newest first)
    const sortedYears = Object.keys(galleryData).sort((a, b) => b.localeCompare(a));
    
    return {
      years: sortedYears,
      galleryData: galleryData,
      totalEvents: Object.values(galleryData).reduce((sum, year) => sum + year.events.length, 0),
      totalImages: Object.values(galleryData).reduce((sum, year) => 
        sum + year.events.reduce((eventSum, event) => eventSum + event.imageCount, 0), 0)
    };
    
  } catch (error) {
    console.error('Error organizing gallery data:', error);
    return {
      years: [],
      galleryData: {},
      totalEvents: 0,
      totalImages: 0
    };
  }
};

// Get all images for a specific event
export const getEventImages = async (eventName) => {
  try {
    const images = await fetchImagesFromFolder(`events_images/${eventName}`);
    return images.map(img => img.url);
  } catch (error) {
    console.error('Error fetching event images:', error);
    return [];
  }
};

// Search events by name
export const searchEvents = async (searchTerm) => {
  try {
    const galleryData = await organizeGalleryData();
    const results = [];
    
    Object.values(galleryData.galleryData).forEach(yearData => {
      yearData.events.forEach(event => {
        if (event.name.toLowerCase().includes(searchTerm.toLowerCase())) {
          results.push({
            ...event,
            year: yearData.year
          });
        }
      });
    });
    
    return results;
  } catch (error) {
    console.error('Error searching events:', error);
    return [];
  }
};
