import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import backIcon from '../assets/back.png';
import uploadIcon from '../assets/upload_recorded.png';

const UploadRecorded = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState('');

  // Add this check for electron availability
  React.useEffect(() => {
    if (window.electron) {
      const handleProgress = (event, data) => {
        setProgress(data.progress);
        setStatus(data.status);
      };

      window.electron.on('processing-progress', handleProgress);
      return () => {
        window.electron.removeListener('processing-progress', handleProgress);
      };
    }
  }, []);

  const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB
  
  const validateFile = (file) => {
    const validTypes = [
      // Video formats
      'video/mp4',
      'video/webm',
      'video/x-matroska', // mkv
      'video/quicktime', // mov
      'video/x-msvideo', // avi
      // Audio formats
      'audio/mpeg', // mp3
      'audio/wav',
      'audio/x-m4a',
      'audio/flac',
      'audio/aac',
      'audio/ogg'
    ];

    if (!validTypes.includes(file.type)) {
      setError('Please select a valid video or audio file');
      return false;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5GB');
      return false;
    }

    setError('');
    return true;
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && validateFile(selectedFile)) {
      setFile(selectedFile);
    } else {
      setFile(null);
    }
  };

  const handleDragEnter = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const droppedFile = event.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      setFile(droppedFile);
    } else {
      setFile(null);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const openFileDialog = () => {
    document.getElementById('fileInput').click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleUpload = async () => {
    if (!file) return;

    try {
      setIsProcessing(true);
      setError('');
      setProgress(0);
      setStatus('Starting...');

      if (window.electron) {
        await window.electron.processAudioFile(file.path);
        navigate('/faculty-attendance');
      } else {
        throw new Error('Electron API not available');
      }
    } catch (err) {
      setError('Error processing file: ' + err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="page-container" style={{ 
      display: 'flex', 
      height: '100vh', 
      fontFamily: "'Montserrat', sans-serif", 
      overflow: 'hidden',
      position: 'relative', // Added for absolute positioning of background elements
    }}>
      {/* Background Elements */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `
          linear-gradient(45deg, rgba(3, 79, 175, 0.1), rgba(87, 215, 226, 0.1)),
          url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23034FAF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
        `,
        animation: 'backgroundShift 30s linear infinite',
        zIndex: 0,
      }} />
      
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 79, 175, 0.2) 100%)',
        zIndex: 1,
      }} />

      {/* Main Content */}
      <Sidebar style={{ position: 'relative', zIndex: 2 }} />

      <div style={{ 
        marginLeft: '320px',
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '30px',
        position: 'relative',
        zIndex: 2,
        height: '100vh',
        overflowY: 'auto'
      }}>
        {/* Header Section */}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '20px 30px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            cursor: 'pointer',
            padding: '8px',
            borderRadius: '8px',
            transition: 'all 0.3s ease',
          }} 
          onClick={() => navigate(-1)}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(3, 79, 175, 0.1)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
            <img
              src={backIcon}
              alt="Back"
              style={{
                width: '24px',
                height: '24px',
                marginRight: '10px',
              }}
            />
            <span style={{ color: '#034FAF', fontWeight: '600' }}>Back</span>
          </div>
          <h1 style={{ 
            margin: '0 auto', 
            fontSize: "24px", 
            fontWeight: "900", 
            color: '#034FAF',
            letterSpacing: '1px',
          }}>
            UPLOAD RECORDED MEETING FILES
          </h1>
        </div>

        {/* Main Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
        }}>
          <div
            onClick={openFileDialog}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '50px',
              borderRadius: '20px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              border: `2px dashed ${isDragging ? '#034FAF' : 'rgba(3, 79, 175, 0.2)'}`,
              backdropFilter: 'blur(10px)',
              maxWidth: '800px',
              width: '100%',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: isDragging ? 'scale(1.02)' : 'scale(1)',
              position: 'relative',
            }}
          >
            <input
              type="file"
              id="fileInput"
              onChange={handleFileChange}
              style={{ display: 'none' }}
              accept="video/*,audio/*"
            />
            
            <img 
              src={uploadIcon} 
              alt="Upload Icon" 
              style={{ 
                height: '120px', 
                marginBottom: '30px',
                transition: 'transform 0.3s ease',
                filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))',
              }}
            />
            
            {error && (
              <div style={{ 
                color: '#ff4444',
                background: 'rgba(255, 68, 68, 0.1)',
                padding: '12px 24px',
                borderRadius: '8px',
                marginBottom: '20px',
                fontWeight: '500',
                width: '100%',
                textAlign: 'center',
              }}>
                {error}
              </div>
            )}

            <div style={{ 
              textAlign: 'center',
              color: '#666',
            }}>
              {file ? (
                <div style={{
                  background: 'rgba(3, 79, 175, 0.1)',
                  padding: '20px',
                  borderRadius: '12px',
                  width: '100%',
                }}>
                  <p style={{ 
                    margin: '0 0 10px 0',
                    color: '#034FAF',
                    fontWeight: '600',
                    fontSize: '16px',
                  }}>
                    {file.name}
                  </p>
                  <p style={{ 
                    margin: 0,
                    color: '#666',
                    fontSize: '14px',
                  }}>
                    Size: {formatFileSize(file.size)}
                  </p>
                </div>
              ) : (
                <>
                  <p style={{ 
                    margin: '0 0 15px 0',
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#034FAF',
                  }}>
                    Drag and drop your file here
                  </p>
                  <p style={{ 
                    margin: '0 0 20px 0',
                    fontSize: '16px',
                  }}>
                    or click to choose file
                  </p>
                  <div style={{
                    background: 'rgba(3, 79, 175, 0.1)',
                    padding: '15px',
                    borderRadius: '12px',
                    fontSize: '14px',
                  }}>
                    <p style={{ margin: '0 0 10px 0', fontWeight: '600' }}>
                      Supported formats:
                    </p>
                    <p style={{ margin: '0 0 5px 0' }}>
                      Video: MP4, WebM, MKV, MOV, AVI
                    </p>
                    <p style={{ margin: '0 0 5px 0' }}>
                      Audio: MP3, WAV, M4A, FLAC, AAC, OGG
                    </p>
                    <p style={{ margin: '0', color: '#034FAF' }}>
                      Maximum file size: 5GB
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            gap: '20px',
            marginTop: '40px',
            width: '100%',
            maxWidth: '800px',
          }}>
            <button
              onClick={() => navigate('/home')}
              style={{
                padding: '15px 40px',
                backgroundColor: 'rgba(255, 255, 255, 0.95)',
                color: '#034FAF',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '200px',
                transition: 'all 0.3s ease',
                fontSize: '16px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
              }}
            >
              Cancel
            </button>
            <button
              onClick={handleUpload}
              disabled={!file || error || isProcessing}
              style={{
                padding: '15px 40px',
                background: file && !error && !isProcessing
                  ? 'linear-gradient(45deg, #034FAF, #0367d4)'
                  : '#ccc',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: file && !error && !isProcessing ? 'pointer' : 'not-allowed',
                width: '200px',
                transition: 'all 0.3s ease',
                fontSize: '16px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              }}
              onMouseOver={(e) => {
                if (file && !error && !isProcessing) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(3, 79, 175, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (file && !error && !isProcessing) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                }
              }}
            >
              {isProcessing ? 'Processing...' : 'Upload File'}
            </button>
          </div>
        </div>
      </div>

      {/* Add animation keyframes */}
      <style>
        {`
          @keyframes backgroundShift {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
          }
        `}
      </style>
    </div>
  );
};

export default UploadRecorded;
