import axios from 'axios';
import { Platform } from 'react-native';

// Set the API base URL based on environment
const API_BASE_URL = Platform.OS === 'web' 
  ? 'http://localhost:5000' 
  : 'http://10.0.2.2:5000'; // Use 10.0.2.2 for Android emulator

class ApiService {
  constructor(baseURL = API_BASE_URL) {
    this.baseURL = baseURL;
    this.client = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  async sendMessage(message) {
    try {
      const response = await this.client.post('/api/chat', {
        question: message,
      });
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}

export default new ApiService();
