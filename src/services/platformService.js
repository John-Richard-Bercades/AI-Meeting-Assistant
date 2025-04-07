const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const platform = {
  isServerAvailable: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/test`, {
        credentials: 'include'
      });
      return response.ok;
    } catch (error) {
      console.error('Server availability check failed:', error);
      return false;
    }
  },

  processAudio: async (file, callbacks = {}) => {
    const { onProgress, onStage, metadata = {} } = callbacks;

    try {
      // Validate file
      if (!file) {
        throw new Error('No file provided');
      }

      // Validate file size (5GB limit)
      if (file.size > 5 * 1024 * 1024 * 1024) {
        throw new Error('File size exceeds 5GB limit');
      }

      const formData = new FormData();
      formData.append('file', file);

      // Add metadata if provided
      if (metadata.userId) formData.append('userId', metadata.userId);
      if (metadata.title) formData.append('title', metadata.title);
      if (metadata.description) formData.append('description', metadata.description);

      console.log('Sending file to server:', {
        name: file.name,
        size: file.size,
        type: file.type
      });

      const response = await fetch(`${API_BASE_URL}/process-audio`, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'include',
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        console.error('Failed to parse server response:', e);
        throw new Error('Invalid server response');
      }

      if (!response.ok) {
        console.error('Server error response:', data);
        throw new Error(data.error || `Server error: ${response.status}`);
      }

      if (data.status === 'error') {
        throw new Error(data.error || 'Processing failed');
      }

      return data;

    } catch (error) {
      console.error('Audio processing error:', {
        message: error.message,
        stack: error.stack,
        file: {
          name: file.name,
          size: file.size,
          type: file.type
        }
      });
      throw error;
    }
  }
};

export { platform };




