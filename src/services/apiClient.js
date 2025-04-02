class ApiClient {
  constructor(baseURL) {
    this.baseURL = baseURL || 'http://localhost:3001/api';
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}${endpoint}`;
    const headers = {
      'Accept': 'application/json',
      ...options.headers
    };

    try {
      const response = await fetch(url, {
        ...options,
        headers,
        credentials: 'include'
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'API request failed');
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  }

  async uploadFile(file, onProgress) {
    const formData = new FormData();
    formData.append('file', file);

    return this.request('/process-audio', {
      method: 'POST',
      body: formData
    });
  }

  async testConnection() {
    return this.request('/test');
  }
}

export const api = new ApiClient(process.env.REACT_APP_API_BASE_URL);
