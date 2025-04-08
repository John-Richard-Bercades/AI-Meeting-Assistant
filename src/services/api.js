class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL || process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
  }

  async testConnection() {
    try {
      console.log('Attempting to connect to:', `${this.baseURL}/test`);
      const response = await fetch(`${this.baseURL}/test`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });
      const data = await response.json();
      console.log('Connection test response:', data);
      return data;
    } catch (error) {
      console.error('Connection test failed:', error);
      throw error;
    }
  }

  async uploadFile(file, userId, title, description = '') {
    try {
      // First, test the connection
      console.log('Testing server connection...');
      const testResponse = await fetch(`${this.baseURL}/test`, {
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });
      if (!testResponse.ok) {
        throw new Error(`Server test failed: ${testResponse.status}`);
      }
      console.log('Server test successful');

      // Proceed with file upload
      const formData = new FormData();
      formData.append('file', file);

      // Add metadata if provided
      if (userId) formData.append('userId', userId);
      if (title) formData.append('title', title);
      if (description) formData.append('description', description);

      const uploadUrl = `${this.baseURL}/process-audio`;
      console.log('Uploading to:', uploadUrl, 'File size:', file.size);

      const response = await fetch(uploadUrl, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
        // Increase timeout to 30 minutes
        timeout: 1800000
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        if (response.status === 413) {
          throw new Error('File is too large. Maximum size is 5GB.');
        }
        throw new Error(errorData.error || `Upload failed: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('API Error:', {
        message: error.message,
        url: `${this.baseURL}/process-audio`,
        fileInfo: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      });
      throw error;
    }
  }

  async processFileElectron(file) {
    if (!window.electronAPI?.processAudioFile) {
      throw new Error('Electron API not available');
    }
    return window.electronAPI.processAudioFile(file.path);
  }
}

// Create a new minute with CSRF protection
async function createMinute(userId, title, description, filePath, duration) {
  try {
    // Import here to avoid circular dependency
    const { addCsrfToken } = await import('./csrfService');

    // Get CSRF token and add to headers
    const headers = await addCsrfToken({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const response = await fetch(`${this.baseURL}/minutes`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ userId, title, description, filePath, duration }),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to create minute: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Create minute error:', error);
    throw error;
  }
}

// Get minutes for a user
async function getMinutes(userId) {
  try {
    const response = await fetch(`${this.baseURL}/minutes/${userId}`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to get minutes: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get minutes error:', error);
    throw error;
  }
}

// Get minute details
async function getMinuteDetails(userId, minuteId) {
  try {
    const response = await fetch(`${this.baseURL}/minutes/${userId}/${minuteId}`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to get minute details: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get minute details error:', error);
    throw error;
  }
}

// Add the methods to the ApiClient prototype
ApiClient.prototype.createMinute = createMinute;
ApiClient.prototype.getMinutes = getMinutes;
ApiClient.prototype.getMinuteDetails = getMinuteDetails;

// Get user profile
async function getUserProfile(userId) {
  try {
    const response = await fetch(`${this.baseURL}/user/${userId}`, {
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to get user profile: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Get user profile error:', error);
    throw error;
  }
}

// Update user profile
async function updateUserProfile(userId, userData) {
  try {
    const response = await fetch(`${this.baseURL}/user/${userId}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(userData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `Failed to update user profile: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Update user profile error:', error);
    throw error;
  }
}

// Add the methods to the ApiClient prototype
ApiClient.prototype.getUserProfile = getUserProfile;
ApiClient.prototype.updateUserProfile = updateUserProfile;

export const apiClient = new ApiClient();
