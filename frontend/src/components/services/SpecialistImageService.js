/**
 * Service for fetching specialist images from the API
 */
class SpecialistImageService {
  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';
  }

  /**
   * Fetches all specialist images from the API
   * @returns {Promise<Array>} Array of specialist image objects
   */
  async getAllSpecialistImages() {
    try {
      const response = await fetch(`${this.baseUrl}/api/specialists/images`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching specialist images:', error);
      return [];
    }
  }

  /**
   * Fetches specialist images for a specific specialist
   * @param {string} specialistId - The specialist's ID
   * @returns {Promise<Array>} Array of specialist image objects for the specialist
   */
  async getSpecialistImages(specialistId) {
    try {
      const response = await fetch(`${this.baseUrl}/api/specialists/images/by-specialist/${specialistId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching specialist images:', error);
      return [];
    }
  }

  /**
   * Gets the first image URL for a specialist
   * @param {string} specialistId - The specialist's ID
   * @returns {Promise<string|null>} The first image URL or null if not found
   */
  async getSpecialistImageUrl(specialistId) {
    try {
      const images = await this.getSpecialistImages(specialistId);
      return images.length > 0 ? images[0].imageUrl : null;
    } catch (error) {
      console.error('Error fetching specialist image URL:', error);
      return null;
    }
  }
}

export default new SpecialistImageService();

