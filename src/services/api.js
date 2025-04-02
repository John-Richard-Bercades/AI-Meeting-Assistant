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

  async uploadFile(file) {
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

export const apiClient = new ApiClient();
