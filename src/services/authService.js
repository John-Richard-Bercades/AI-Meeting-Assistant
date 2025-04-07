import { apiClient } from './api';

// Function to log out the user
export const logout = async () => {
  try {
    // Call the logout endpoint to clear the cookie
    const response = await fetch(`${apiClient.baseURL}/logout`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    });
    
    if (!response.ok) {
      throw new Error('Logout failed');
    }
    
    // Clear local storage
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    
    return true;
  } catch (error) {
    console.error('Logout error:', error);
    // Still clear local storage even if the server request fails
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
    return false;
  }
};

// Function to check if user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Function to get user ID
export const getUserId = () => {
  return localStorage.getItem('userId');
};

// Function to get username
export const getUsername = () => {
  return localStorage.getItem('username');
};
