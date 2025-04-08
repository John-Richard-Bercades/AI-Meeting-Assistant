import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlatformContext } from '../App';
import { platform } from '../services/platformService';
import Sidebar from './Sidebar';
import backIcon from '../assets/back.png';
import uploadIcon from '../assets/upload_recorded.png';

const VALID_TYPES = {
  // Video formats
  'mp4': 'video/mp4',
  'webm': 'video/webm',
  'mkv': 'video/x-matroska',
  'mov': 'video/quicktime',
  'avi': 'video/x-msvideo',
  // Audio formats
  'mp3': 'audio/mpeg',
  'wav': 'audio/wav',
  'm4a': 'audio/x-m4a',
  'flac': 'audio/flac',
  'aac': 'audio/aac',
  'ogg': 'audio/ogg'
};

const MAX_FILE_SIZE = 5 * 1024 * 1024 * 1024; // 5GB

const validateFile = (file) => {
  const extension = file.name.split('.').pop().toLowerCase();
  const expectedType = VALID_TYPES[extension];

  if (!expectedType || file.type !== expectedType) {
    return {
      isValid: false,
      error: 'Please select a valid video or audio file'
    };
  }

  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: 'File size must be less than 5GB'
    };
  }

  return { isValid: true };
};

const ProcessingIndicator = ({ progress, stage, status }) => (
  <div style={{
    marginTop: '20px',
    padding: '15px',
    borderRadius: '8px',
    backgroundColor: 'rgba(3, 79, 175, 0.1)',
    color: '#034FAF',
    textAlign: 'center'
  }}>
    <div>{status}</div>
    {stage && <div style={{ fontSize: '14px', marginTop: '5px' }}>{stage}</div>}
    <div style={{
      width: '100%',
      height: '4px',
      backgroundColor: 'rgba(3, 79, 175, 0.1)',
      borderRadius: '2px',
      marginTop: '10px'
    }}>
      <div style={{
        width: `${progress}%`,
        height: '100%',
        backgroundColor: '#034FAF',
        borderRadius: '2px',
        transition: 'width 0.3s ease'
      }} />
    </div>
  </div>
);

const UploadRecorded = () => {
  const platformType = useContext(PlatformContext);
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadResponse, setUploadResponse] = useState(null);
  const [processingStatus, setProcessingStatus] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState('');
  const [isServerAvailable, setIsServerAvailable] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Combine both server checks into one useEffect
  useEffect(() => {
    const checkServerConnection = async () => {
      try {
        const isAvailable = await platform.isServerAvailable();
        if (!isAvailable) {
          setError('Server connection failed. Please check if the server is running.');
          return;
        }
        console.log('Server connection successful');
      } catch (error) {
        setError(`Connection error: ${error.message}`);
        console.error('Server connection error:', error);
      }
    };

    checkServerConnection();
  }, []); // Removed dependency array to run only once

  const handleFileSelection = (selectedFile) => {
    if (!selectedFile) {
      setFile(null);
      setError('');
      return;
    }

    const validation = validateFile(selectedFile);
    if (validation.isValid) {
      setFile(selectedFile);
      setError('');
    } else {
      setFile(null);
      setError(validation.error);
    }
  };

  const handleFileChange = (event) => {
    handleFileSelection(event.target.files[0]);
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
    handleFileSelection(event.dataTransfer.files[0]);
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

  const handleUpload = async (file) => {
    try {
      setIsProcessing(true);
      setError('');
      setUploadResponse(null);
      setProcessingStatus('Starting upload...');
      setUploadProgress(0);

      // Validate file
      if (!file) {
        throw new Error('No file selected');
      }

      // Check file type
      const fileExtension = file.name.split('.').pop().toLowerCase();
      if (!VALID_TYPES[fileExtension]) {
        throw new Error(`Unsupported file type: ${fileExtension}`);
      }

      // Get user ID from localStorage
      const userId = localStorage.getItem('userId');

      // Validate title
      if (!title.trim()) {
        throw new Error('Please enter a title for this minute');
      }

      const result = await platform.processAudio(file, {
        onProgress: (progress) => {
          setUploadProgress(progress);
          setProcessingStatus(`Processing: ${Math.round(progress)}%`);
        },
        onStage: (stage) => {
          setProcessingStage(stage);
        },
        metadata: {
          userId,
          title,
          description
        }
      });

      if (!result) {
        throw new Error('No response from server');
      }

      setProcessingStatus('Processing complete!');
      setUploadResponse({
        status: 'success',
        processingResult: {
          output_path: result.result.data.file_path,
          transcript: result.result.data.transcript,
          speakers: result.result.data.speakers
        }
      });

    } catch (error) {
      console.error('Upload error:', error);
      setError(`Upload failed: ${error.message}`);
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
      position: 'relative',
    }}>
      {/* Background Elements */}
      <div className="background-pattern" style={{
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

      {/* Gradient Overlay */}
      <div className="gradient-overlay" style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(3, 79, 175, 0.25) 100%)',
        zIndex: 1,
      }} />

      {/* Decorative Elements */}
      <div className="decorative-circle circle-1" style={{
        position: 'absolute',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(3, 79, 175, 0.25) 0%, rgba(87, 215, 226, 0.12) 70%)',
        top: '-150px',
        right: '5%',
        animation: 'float 15s ease-in-out infinite, shimmer 8s infinite',
        zIndex: 1,
        opacity: 0.7,
        filter: 'blur(80px)',
      }} />

      <div className="decorative-circle circle-2" style={{
        position: 'absolute',
        width: '300px',
        height: '300px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(87, 215, 226, 0.25) 0%, rgba(3, 79, 175, 0.12) 70%)',
        bottom: '5%',
        left: '25%',
        animation: 'float 12s ease-in-out infinite reverse, shimmer 10s infinite 2s',
        zIndex: 1,
        opacity: 0.7,
        filter: 'blur(80px)',
      }} />

      {/* Main Content */}
      <Sidebar style={{ position: 'relative', zIndex: 2 }} />

      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '30px',
        position: 'relative',
        zIndex: 2,
        height: '100vh',
        overflow: 'hidden',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        {/* Header Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '20px 30px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          marginBottom: '30px',
          display: 'flex',
          alignItems: 'center',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          transition: 'all 0.3s ease',
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
            <span style={{ color: '#034FAF', fontWeight: '600', cursor: 'pointer' }}>Back</span>
          </div>
          <h1 style={{
            margin: '0 auto',
            fontSize: "24px",
            fontWeight: "900",
            color: '#034FAF',
            letterSpacing: '1px',
            cursor: 'default',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
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
          padding: '10px',
          maxHeight: 'calc(100vh - 150px)',
          overflow: 'hidden',
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
              background: 'rgba(255, 255, 255, 0.15)',
              padding: '40px',
              borderRadius: '20px',
              boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
              border: `2px dashed ${isDragging ? '#034FAF' : 'rgba(3, 79, 175, 0.2)'}`,
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              maxWidth: '800px',
              width: '100%',
              maxHeight: 'calc(100vh - 250px)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              transform: isDragging ? 'scale(1.02)' : 'scale(1)',
              position: 'relative',
              animation: 'fadeIn 0.8s ease-out',
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
                height: '100px',
                marginBottom: '20px',
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

          {isProcessing && (
            <ProcessingIndicator
              progress={uploadProgress}
              stage={processingStage}
              status={processingStatus}
            />
          )}

          {uploadResponse && (
            <div style={{
              marginTop: '20px',
              padding: '15px',
              borderRadius: '8px',
              backgroundColor: 'rgba(0, 255, 0, 0.1)',
              border: '1px solid #00c853',
              color: '#00c853',
            }}>
              <h3>Upload Success!</h3>
              <pre style={{
                margin: '10px 0',
                padding: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '4px',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                {JSON.stringify(uploadResponse, null, 2)}
              </pre>
            </div>
          )}

          {/* Metadata Form */}
          {file && !isProcessing && !uploadResponse && (
            <div style={{
              marginTop: '20px',
              width: '100%',
              maxWidth: '800px',
              padding: '25px',
              background: 'rgba(255, 255, 255, 0.15)',
              borderRadius: '15px',
              boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
              maxHeight: 'calc(100vh - 450px)',
              overflow: 'hidden',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              animation: 'fadeIn 0.6s ease-out',
            }}>
              <h3 style={{
                color: '#034FAF',
                marginTop: 0,
                marginBottom: '20px',
                fontSize: '20px',
                fontWeight: '700',
                cursor: 'default',
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
              }}>Meeting Information</h3>

              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="title"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#034FAF',
                    cursor: 'default',
                  }}
                >
                  Title *
                </label>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter a title for this minute"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(3, 79, 175, 0.2)',
                    fontSize: '16px',
                    boxSizing: 'border-box',
                    background: 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 0 0 2px rgba(3, 79, 175, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.boxShadow = 'none';
                  }}
                  required
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label
                  htmlFor="description"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '600',
                    color: '#034FAF',
                    cursor: 'default',
                  }}
                >
                  Description
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter a description (optional)"
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid rgba(3, 79, 175, 0.2)',
                    fontSize: '16px',
                    minHeight: '100px',
                    maxHeight: '150px',
                    resize: 'none',
                    boxSizing: 'border-box',
                    background: 'rgba(255, 255, 255, 0.8)',
                    transition: 'all 0.3s ease',
                  }}
                  onFocus={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.boxShadow = '0 0 0 2px rgba(3, 79, 175, 0.1)';
                  }}
                  onBlur={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.8)';
                    e.target.style.boxShadow = 'none';
                  }}
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            marginTop: '30px',
            width: '100%',
            maxWidth: '800px',
          }}>
            <button
              onClick={() => navigate('/home')}
              style={{
                padding: '15px 40px',
                background: 'rgba(255, 255, 255, 0.15)',
                color: '#034FAF',
                border: '2px solid #034FAF',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: 'pointer',
                width: '200px',
                transition: 'all 0.3s ease',
                fontSize: '16px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                e.target.style.background = 'rgba(3, 79, 175, 0.1)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                e.target.style.background = 'rgba(255, 255, 255, 0.15)';
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => handleUpload(file)}
              disabled={!file || error || isProcessing || !title.trim()}
              style={{
                padding: '15px 40px',
                background: file && !error && !isProcessing && title.trim()
                  ? 'linear-gradient(45deg, #034FAF, #0367d4)'
                  : 'rgba(204, 204, 204, 0.7)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                cursor: file && !error && !isProcessing && title.trim() ? 'pointer' : 'not-allowed',
                width: '200px',
                transition: 'all 0.3s ease',
                fontSize: '16px',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
              }}
              onMouseOver={(e) => {
                if (file && !error && !isProcessing && title.trim()) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(3, 79, 175, 0.3)';
                }
              }}
              onMouseOut={(e) => {
                if (file && !error && !isProcessing && title.trim()) {
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

      {/* Add animation keyframes and hide scrollbars */}
      <style>
        {`
          @keyframes backgroundShift {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
          }

          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-15px) rotate(5deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }

          @keyframes shimmer {
            0% { opacity: 0.7; }
            50% { opacity: 0.9; }
            100% { opacity: 0.7; }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          /* Hide scrollbar for Chrome, Safari and Opera */
          *::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */
          * {
            -ms-overflow-style: none;  /* IE and Edge */
            scrollbar-width: none;  /* Firefox */
          }

          /* Default cursor for text elements */
          h1, h2, h3, h4, h5, h6, p, span, div, section, label {
            cursor: default !important;
          }

          /* Ensure buttons and interactive elements have pointer cursor */
          button, a, .clickable, [role="button"], input[type="file"], input[type="submit"] {
            cursor: pointer !important;
          }
        `}
      </style>
    </div>
  );
};

export default UploadRecorded;
