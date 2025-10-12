import MinIOService from '../components/services/MinIOService';

// Mapping of specialist names to their corresponding image files
const specialistImageMap = {
  'Маргарита Дронова': 'card-1.png',
  'Олексій Соколенко': 'card-4.png', 
  'Антоніна Смила': 'card-5.png',
  'Олександр Медичний': 'card-3.png',
  'Андрій Кач': 'card-6.png',
  'Олеся Мамкіна': 'card-2.png',
  'Дмитро Делитанович': 'card-6.png'
};

// Function to convert file to File object for upload
const fileToFileObject = async (imagePath, fileName) => {
  try {
    const response = await fetch(imagePath);
    const blob = await response.blob();
    return new File([blob], fileName, { type: blob.type });
  } catch (error) {
    console.error(`Error loading image ${fileName}:`, error);
    return null;
  }
};

// Function to upload all specialist photos
export const uploadAllSpecialistPhotos = async () => {
  console.log('Starting upload of all specialist photos...');
  
  const uploadPromises = Object.entries(specialistImageMap).map(async ([specialistName, imageFile]) => {
    try {
      // Import the image dynamically
      const imageModule = await import(`../assets/specialists-img/${imageFile}`);
      const imagePath = imageModule.default;
      
      // Convert to File object
      const file = await fileToFileObject(imagePath, imageFile);
      if (!file) {
        console.error(`Failed to load image for ${specialistName}`);
        return null;
      }
      
      // Upload to MinIO
      const result = await MinIOService.uploadSpecialistCardPhoto(file, specialistName);
      console.log(`Successfully uploaded photo for ${specialistName}:`, result);
      return { specialistName, result };
    } catch (error) {
      console.error(`Error uploading photo for ${specialistName}:`, error);
      return null;
    }
  });
  
  const results = await Promise.all(uploadPromises);
  const successfulUploads = results.filter(result => result !== null);
  
  console.log(`Upload completed. ${successfulUploads.length}/${Object.keys(specialistImageMap).length} photos uploaded successfully.`);
  
  return successfulUploads;
};

// Function to update all photo URLs in the database
export const updateAllPhotoUrls = async () => {
  try {
    console.log('Updating photo URLs in database...');
    const result = await MinIOService.updatePhotoUrls();
    console.log('Photo URLs updated successfully:', result);
    return result;
  } catch (error) {
    console.error('Error updating photo URLs:', error);
    throw error;
  }
};

// Function to clean all photo URLs (remove old URLs)
export const cleanAllPhotoUrls = async () => {
  try {
    console.log('Cleaning photo URLs in database...');
    const result = await MinIOService.cleanPhotoUrls();
    console.log('Photo URLs cleaned successfully:', result);
    return result;
  } catch (error) {
    console.error('Error cleaning photo URLs:', error);
    throw error;
  }
};

// Main function to run the complete process
export const runPhotoUploadProcess = async () => {
  try {
    console.log('Starting complete photo upload process...');
    
    // Step 1: Clean existing URLs
    await cleanAllPhotoUrls();
    
    // Step 2: Upload all photos
    const uploadResults = await uploadAllSpecialistPhotos();
    
    // Step 3: Update URLs in database
    await updateAllPhotoUrls();
    
    console.log('Photo upload process completed successfully!');
    return uploadResults;
  } catch (error) {
    console.error('Error in photo upload process:', error);
    throw error;
  }
};

// Export for use in components
export default {
  uploadAllSpecialistPhotos,
  updateAllPhotoUrls,
  cleanAllPhotoUrls,
  runPhotoUploadProcess
};

