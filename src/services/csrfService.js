import { apiClient } from './api';

// Function to fetch CSRF token
export const fetchCsrfToken = async () => {
  try {
    const response = await fetch(`${apiClient.baseURL}/csrf-token`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Failed to fetch CSRF token');
    }
    
    const data = await response.json();
    return data.csrfToken;
  } catch (error) {
    console.error('CSRF token fetch error:', error);
    throw error;
  }
};

// Function to add CSRF token to request headers
export const addCsrfToken = async (headers = {}) => {
  try {
    const csrfToken = await fetchCsrfToken();
    return {
      ...headers,
      'X-CSRF-Token': csrfToken
    };
  } catch (error) {
    console.error('Error adding CSRF token:', error);
    throw error;
  }
};
