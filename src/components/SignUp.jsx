import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import backIcon from '../assets/back.png';
import { apiClient } from '../services/api';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignUp = async (e) => {
    if (e) e.preventDefault();

    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email ||
        !formData.username || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    // Password match validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // First test the connection to make sure server is running
      await apiClient.testConnection();

      // Make registration request
      const response = await fetch(`${apiClient.baseURL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName
        }),
        credentials: 'include'
      });

      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Navigate to login page
        navigate('/login', {
          replace: true,
          state: { message: 'Registration successful! Please log in.' }
        });
      } else {
        setError(data.error || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration error:', error);
      setError('Connection error. Please make sure the server is running.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="signup-container">
      <div className="luxury-bg"></div>
      <div className="gradient-overlay"></div>
      <div className="content-wrapper">
        <main className="main-content">
          <div className="signup-form">
            <img src={logo} alt="App Logo" className="app-logo" />
            <h2 className="form-title">Sign Up</h2>
            <div className="form-content-wrapper">
              <div className="input-row">
                <div className="input-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="Enter your first name"
                  />
                </div>
                <div className="input-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />
                </div>
                <div className="input-group">
                  <label>Username</label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Choose a username"
                  />
                </div>
              </div>
              <div className="input-row">
                <div className="input-group">
                  <label>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                  />
                </div>
                <div className="input-group">
                  <label>Confirm Password</label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm your password"
                  />
                </div>
              </div>
              {error && <div className="error-message">{error}</div>}
              <button className="signup-btn" onClick={handleSignUp} disabled={isLoading}>
                {isLoading ? 'Creating Account...' : 'Sign Up'}
              </button>
              <div className="login-section">
                <p>Already have an account?</p>
                <button className="login-link" onClick={() => navigate('/login')}>
                  Log In
                </button>
              </div>
            </div>
          </div>
        </main>

        <div className="action-buttons">
          <button className="luxury-btn" onClick={handleBack}>
            <img src={backIcon} alt="Back" className="back-icon" />
            <span>Back to Home</span>
          </button>
          <p className="footer-text">AI-Powered Meeting Assistant</p>
        </div>
      </div>

      <style>
        {`
          .signup-container {
            display: flex;
            flex-direction: column;
            height: 100vh;
            width: 100vw;
            overflow: hidden !important;
            font-family: 'Montserrat', sans-serif;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #000;
            padding-bottom: 60px; /* Add padding to account for footer height */
          }

          .luxury-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background:
              linear-gradient(45deg, rgba(3, 79, 175, 0.1), rgba(87, 215, 226, 0.1)),
              url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23034FAF' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            animation: backgroundShift 30s linear infinite;
          }

          .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 79, 175, 0.2) 100%);
            z-index: 1;
          }

          .content-wrapper {
            position: relative;
            z-index: 2;
            display: flex;
            flex-direction: column;
            flex: 1;
            padding-bottom: 60px; /* Add padding to account for footer height */
          }

          .main-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 20px 0 100px 0; /* Increased bottom padding for footer */
            min-height: calc(100vh - 80px); /* Subtract footer height */
            overflow-y: auto;
          }

          .signup-form {
            background: rgba(56, 56, 56, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 30px; /* Reduced padding */
            border-radius: 20px;
            width: 100%;
            max-width: 750px; /* Slightly reduced max-width */
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            box-sizing: border-box;
            margin: 0 0 80px 0; /* Increased bottom margin to prevent overlap with footer */
            position: relative;
            z-index: 10;
            transform: scale(0.95); /* Slightly scale down the entire form */
          }

          .app-logo {
            width: 100px; /* Smaller logo */
            height: auto;
            margin-bottom: 15px; /* Reduced margin */
          }

          .form-title {
            color: white;
            font-size: 2.2rem; /* Slightly smaller font */
            font-weight: 800;
            margin-bottom: 25px; /* Reduced margin */
            text-align: center;
          }

          .form-content-wrapper {
            width: 100%;
            display: flex;
            flex-direction: column;
            gap: 15px; /* Reduced gap */
            padding: 0 15px; /* Reduced padding */
          }

          .input-row {
            display: flex;
            gap: 15px; /* Reduced gap */
            width: 100%;
            margin: 0;
          }

          .input-group {
            flex: 1;
            margin-right: 0;
            width: 100%;
          }

          .input-group label {
            display: block;
            color: white;
            margin-bottom: 6px; /* Reduced margin */
            font-weight: 500;
            font-size: 0.85rem; /* Smaller font */
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          .input-group input {
            width: 100%;
            padding: 10px 14px; /* Reduced padding */
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            color: white;
            font-size: 0.95rem; /* Smaller font */
            transition: all 0.3s ease;
            box-sizing: border-box;
          }

          .input-group input:focus {
            outline: none;
            border-color: #57D7E2;
            background: rgba(255, 255, 255, 0.1);
            box-shadow: 0 0 0 4px rgba(87, 215, 226, 0.1);
          }

          .input-group input::placeholder {
            color: rgba(255, 255, 255, 0.5);
          }

          .signup-btn {
            width: 100%;
            padding: 12px; /* Reduced padding */
            background: linear-gradient(45deg, #034FAF, #57D7E2);
            color: white;
            border: none;
            border-radius: 12px;
            font-size: 1rem; /* Smaller font */
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 15px; /* Reduced margin */
          }

          .signup-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 15px rgba(3, 79, 175, 0.2);
          }

          .signup-btn:disabled {
            background: #cccccc;
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .error-message {
            color: #ff6b6b;
            background-color: rgba(255, 107, 107, 0.1);
            border: 1px solid rgba(255, 107, 107, 0.3);
            border-radius: 4px;
            padding: 10px;
            margin-bottom: 15px;
            width: 100%;
            text-align: center;
            font-size: 0.9rem;
          }

          .login-section {
            margin-top: 25px;
            text-align: center;
            width: 100%;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .login-section p {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 12px;
            font-size: 0.9rem;
          }

          .login-link {
            background: transparent;
            border: 2px solid rgba(255, 255, 255, 0.2);
            color: white;
            padding: 10px 24px;
            border-radius: 8px;
            cursor: pointer;
            transition: all 0.3s ease;
            font-size: 0.9rem;
            font-weight: 500;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }

          .login-link:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }

          .action-buttons {
            padding: 20px 30px;
            background: linear-gradient(45deg, #034FAF, #57D7E2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.1);
            border-radius: 30px 30px 0 0; /* Curved top corners */
            margin: 0 20px; /* Added margin to show the curved corners */
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 5; /* Lower z-index so signup form can be above */
            overflow: hidden; /* For the shimmer effect */
            height: auto; /* Auto height based on content */
          }

          .action-buttons::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 200%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            animation: shine 3s infinite;
          }

          .luxury-btn {
            font-family: 'Montserrat', sans-serif;
            padding: 12px 24px;
            border-radius: 30px;
            border: none;
            background: rgba(255, 255, 255, 0.95);
            color: #034FAF;
            font-weight: 600;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            letter-spacing: 1px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            gap: 8px;
          }

          .luxury-btn:hover {
            transform: translateY(-3px) scale(1.05);
            background: #034FAF;
            color: white;
            box-shadow: 0 8px 25px rgba(3, 79, 175, 0.3);
          }

          .luxury-btn:active {
            transform: translateY(-1px);
          }

          .back-icon {
            width: 16px;
            height: 16px;
            object-fit: contain;
          }

          .footer-text {
            color: white;
            font-size: 1.2rem;
            margin: 0;
            text-align: center;
            font-weight: 600;
            letter-spacing: 1px;
            text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
          }

          @keyframes backgroundShift {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
          }

          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @media (max-width: 768px) {
            .signup-form {
              padding: 20px 15px;
            }

            .input-row {
              flex-direction: column;
              gap: 15px;
            }

            .form-title {
              font-size: 1.8rem;
            }

            .action-buttons {
              padding: 15px;
              margin: 0 10px;
            }

            .back-button {
              padding: 6px 12px;
            }

            .footer-text {
              font-size: 0.9rem;
            }

            .input-group {
              margin-right: 0;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SignUp;
