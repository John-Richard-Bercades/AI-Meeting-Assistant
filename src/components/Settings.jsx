import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../services/api';
import backIcon from '../assets/back.png';

const Settings = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Fetch user data when component mounts
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const userId = localStorage.getItem('userId');

      if (!userId) {
        navigate('/login');
        return;
      }

      // Make API request to get user data
      const response = await fetch(`${apiClient.baseURL}/user/${userId}`, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }

      const data = await response.json();
      console.log('User data response:', data);

      if (data.status === 'success') {
        // Update state with user data
        // Map database field names to our component state
        setUserData({
          ...userData,
          firstName: data.user.first_name || '',
          lastName: data.user.last_name || '',
          email: data.user.email || '',
          username: data.user.username || ''
        });
      } else {
        setMessage({ text: data.error || 'Failed to load user data', type: 'error' });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setMessage({ text: 'Error loading user data. Please try again.', type: 'error' });

      // Fallback: Use data from localStorage if available
      const username = localStorage.getItem('username');
      const email = localStorage.getItem('email');

      if (username) {
        // Extract first and last name from username as a fallback
        let firstName = '';
        let lastName = '';

        // Try to split username into first and last name if it contains a space
        if (username.includes(' ')) {
          const nameParts = username.split(' ');
          firstName = nameParts[0];
          lastName = nameParts.slice(1).join(' ');
        } else {
          // If no space, just use the username as the first name
          firstName = username;
        }

        setUserData({
          ...userData,
          username,
          email: email || '',
          firstName,
          lastName
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form
    if (isEditing && userData.newPassword) {
      if (!userData.currentPassword) {
        setMessage({ text: 'Current password is required to change password', type: 'error' });
        return;
      }

      if (userData.newPassword !== userData.confirmPassword) {
        setMessage({ text: 'New passwords do not match', type: 'error' });
        return;
      }
    }

    try {
      setIsLoading(true);
      setMessage({ text: '', type: '' });

      const userId = localStorage.getItem('userId');

      // Prepare data for update - use the field names expected by the server
      const updateData = {
        firstName: userData.firstName, // server will map this to first_name
        lastName: userData.lastName,   // server will map this to last_name
        email: userData.email
      };

      // Add password data if changing password
      if (userData.newPassword && userData.currentPassword) {
        updateData.currentPassword = userData.currentPassword;
        updateData.newPassword = userData.newPassword;
      }

      // Make API request to update user data
      const response = await fetch(`${apiClient.baseURL}/user/${userId}`, {
        method: 'PUT',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(updateData)
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Update localStorage with new data
        localStorage.setItem('username', data.user.username);
        localStorage.setItem('email', data.user.email);

        setMessage({ text: 'Profile updated successfully!', type: 'success' });
        setIsEditing(false);

        // Clear password fields
        setUserData({
          ...userData,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        setMessage({ text: data.error || 'Failed to update profile', type: 'error' });
      }
    } catch (error) {
      console.error('Error updating user data:', error);
      setMessage({ text: 'Error updating profile on server. Local data updated.', type: 'warning' });

      // Even if the server update fails, update the local storage and UI
      // This is a temporary solution until the server-side issue is fixed
      localStorage.setItem('email', userData.email);

      // Clear password fields
      setUserData({
        ...userData,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });

      setIsEditing(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
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
      <div style={{
        flex: 1,
        padding: '30px 40px',
        position: 'relative',
        zIndex: 2,
        height: '100vh',
        overflow: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        {/* Header Section */}
        <header style={{
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
          onClick={handleBack}
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
            Account Settings
          </h1>
        </header>

        {/* Main Content Area */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          animation: 'fadeIn 0.8s ease-out',
        }}>
          {message.text && (
            <div style={{
              padding: '15px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontWeight: '500',
              background: message.type === 'success' ? 'rgba(76, 175, 80, 0.1)' :
                         message.type === 'error' ? 'rgba(244, 67, 54, 0.1)' :
                         'rgba(255, 152, 0, 0.1)',
              color: message.type === 'success' ? '#2e7d32' :
                     message.type === 'error' ? '#d32f2f' :
                     '#f57c00',
              border: message.type === 'success' ? '1px solid rgba(76, 175, 80, 0.3)' :
                      message.type === 'error' ? '1px solid rgba(244, 67, 54, 0.3)' :
                      '1px solid rgba(255, 152, 0, 0.3)',
            }}>
              {message.text}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '30px',
          }}>
            <div style={{
              borderBottom: '1px solid rgba(3, 79, 175, 0.1)',
              paddingBottom: '25px',
              marginBottom: '25px',
            }}>
              <h2 style={{
                color: '#034FAF',
                fontSize: '1.5rem',
                marginBottom: '20px',
                fontWeight: '600',
                cursor: 'default',
                textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
              }}>Profile Information</h2>

              <div style={{
                display: 'flex',
                gap: '20px',
                marginBottom: '15px',
                width: '100%',
              }}>
                <div style={{ flex: 1, marginBottom: '15px' }}>
                  <label
                    htmlFor="firstName"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '500',
                      color: '#333',
                      cursor: 'default',
                    }}
                  >First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={userData.firstName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '1px solid rgba(3, 79, 175, 0.2)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: !isEditing ? 'rgba(245, 245, 245, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                      color: !isEditing ? '#666' : '#333',
                      cursor: !isEditing ? 'not-allowed' : 'text',
                    }}
                  />
                </div>

                <div style={{ flex: 1, marginBottom: '15px' }}>
                  <label
                    htmlFor="lastName"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '500',
                      color: '#333',
                      cursor: 'default',
                    }}
                  >Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={userData.lastName}
                    onChange={handleChange}
                    disabled={!isEditing}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '1px solid rgba(3, 79, 175, 0.2)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: !isEditing ? 'rgba(245, 245, 245, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                      color: !isEditing ? '#666' : '#333',
                      cursor: !isEditing ? 'not-allowed' : 'text',
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '15px', width: '100%' }}>
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333',
                    cursor: 'default',
                  }}
                >Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid rgba(3, 79, 175, 0.2)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: !isEditing ? 'rgba(245, 245, 245, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                    color: !isEditing ? '#666' : '#333',
                    cursor: !isEditing ? 'not-allowed' : 'text',
                  }}
                />
              </div>

              <div style={{ marginBottom: '15px', width: '100%' }}>
                <label
                  htmlFor="username"
                  style={{
                    display: 'block',
                    marginBottom: '8px',
                    fontWeight: '500',
                    color: '#333',
                    cursor: 'default',
                  }}
                >Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={userData.username}
                  disabled={true}
                  style={{
                    width: '100%',
                    padding: '12px 15px',
                    border: '1px solid rgba(3, 79, 175, 0.2)',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    transition: 'all 0.3s ease',
                    background: 'rgba(245, 245, 245, 0.8)',
                    color: '#666',
                    cursor: 'not-allowed',
                  }}
                />
                <small style={{
                  display: 'block',
                  color: '#666',
                  fontSize: '0.8rem',
                  marginTop: '5px',
                  cursor: 'default',
                }}>Username cannot be changed</small>
              </div>
            </div>

            {isEditing && (
              <div style={{
                borderBottom: '1px solid rgba(3, 79, 175, 0.1)',
                paddingBottom: '25px',
                marginBottom: '25px',
              }}>
                <h2 style={{
                  color: '#034FAF',
                  fontSize: '1.5rem',
                  marginBottom: '20px',
                  fontWeight: '600',
                  cursor: 'default',
                  textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
                }}>Change Password</h2>
                <p style={{
                  color: '#666',
                  marginTop: '-15px',
                  marginBottom: '20px',
                  fontSize: '0.9rem',
                  cursor: 'default',
                }}>Leave blank if you don't want to change your password</p>

                <div style={{ marginBottom: '20px', width: '100%' }}>
                  <label
                    htmlFor="currentPassword"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '500',
                      color: '#333',
                      cursor: 'default',
                    }}
                  >Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={userData.currentPassword}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '1px solid rgba(3, 79, 175, 0.2)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.8)',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px', width: '100%' }}>
                  <label
                    htmlFor="newPassword"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '500',
                      color: '#333',
                      cursor: 'default',
                    }}
                  >New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={userData.newPassword}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '1px solid rgba(3, 79, 175, 0.2)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.8)',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '20px', width: '100%' }}>
                  <label
                    htmlFor="confirmPassword"
                    style={{
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '500',
                      color: '#333',
                      cursor: 'default',
                    }}
                  >Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={userData.confirmPassword}
                    onChange={handleChange}
                    style={{
                      width: '100%',
                      padding: '12px 15px',
                      border: '1px solid rgba(3, 79, 175, 0.2)',
                      borderRadius: '8px',
                      fontSize: '1rem',
                      transition: 'all 0.3s ease',
                      background: 'rgba(255, 255, 255, 0.8)',
                    }}
                  />
                </div>
              </div>
            )}

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '15px',
              marginTop: '20px',
              marginBottom: '10px',
            }}>
              {!isEditing ? (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  style={{
                    padding: '12px 24px',
                    borderRadius: '8px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    background: 'linear-gradient(45deg, #034FAF, #57D7E2)',
                    color: 'white',
                  }}
                  onMouseOver={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 20px rgba(3, 79, 175, 0.3)';
                  }}
                  onMouseOut={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  }}
                >
                  Edit Profile
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      fetchUserData(); // Reset form data
                    }}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      background: 'rgba(0, 0, 0, 0.05)',
                      color: '#333',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.background = 'rgba(0, 0, 0, 0.1)';
                      e.target.style.transform = 'translateY(-2px)';
                      e.target.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.background = 'rgba(0, 0, 0, 0.05)';
                      e.target.style.transform = 'translateY(0)';
                      e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '8px',
                      fontWeight: '600',
                      cursor: isLoading ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s ease',
                      border: 'none',
                      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                      background: 'linear-gradient(45deg, #034FAF, #57D7E2)',
                      color: 'white',
                      opacity: isLoading ? 0.7 : 1,
                    }}
                    onMouseOver={(e) => {
                      if (!isLoading) {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 8px 20px rgba(3, 79, 175, 0.3)';
                      }
                    }}
                    onMouseOut={(e) => {
                      if (!isLoading) {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                      }
                    }}
                  >
                    {isLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                </>
              )}
            </div>
          </form>
        </div>
      </div>

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
            box-sizing: border-box;
          }

          /* Default cursor for text elements */
          h1, h2, h3, h4, h5, h6, p, span, div, section, label {
            cursor: default !important;
          }

          /* Ensure buttons and interactive elements have pointer cursor */
          button, a, .clickable, [role="button"], input[type="file"], input[type="submit"] {
            cursor: pointer !important;
          }

          /* Ensure inputs have text cursor when editable */
          input:not([disabled]), textarea:not([disabled]) {
            cursor: text !important;
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .form-row {
              flex-direction: column;
              gap: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Settings;
