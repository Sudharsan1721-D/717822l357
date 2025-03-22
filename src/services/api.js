import axios from 'axios';

const API_URL = '/api';

export const fetchNumbers = async (numberType) => {
  try {
    const response = await axios.get(`${API_URL}/numbers/${numberType}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching numbers:', error);
    throw error;
  }
};