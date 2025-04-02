import React, { useEffect, useState } from 'react';
import { api } from '../services/apiClient';

const ConnectionTest = () => {
  const [status, setStatus] = useState('Testing connection...');
  const [error, setError] = useState(null);
  const [apiUrl, setApiUrl] = useState('');

  useEffect(() => {
    const testConnection = async () => {
      try {
        // Log the actual URL being used
        const url = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';
        console.log('Attempting to connect to:', `${url}/test`);
        
        const response = await fetch(`${url}/test`, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          }
        });
        
        console.log('Response status:', response.status);
        const data = await response.json();
        console.log('Response data:', data);
        
        setStatus(`Connected successfully! Server response: ${JSON.stringify(data)}`);
        setError(null);
      } catch (err) {
        console.error('Connection error details:', err);
        setStatus('Connection failed');
        setError(`${err.message} - Please check if the server is running on port 3001`);
      }
    };

    testConnection();
  }, []);

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', margin: '20px' }}>
      <h3>Connection Status</h3>
      <p>API URL: {process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api'}</p>
      <p>Status: {status}</p>
      {error && (
        <p style={{ color: 'red' }}>
          Error: {error}
        </p>
      )}
    </div>
  );
};

export default ConnectionTest;

