import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LOGO from '../assets/logo.png';
import backIcon from '../assets/back.png';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault(); // Prevent form submission default behavior
    localStorage.setItem('isAuthenticated', 'true');
    navigate('/home', { replace: true }); // Use replace to prevent going back to login
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="luxury-bg"></div>
      <div className="gradient-overlay"></div>
      <link href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Playfair+Display:wght@400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <div className="content-wrapper">
        <main className="main-content">
          <div className="login-form">
            <img src={LOGO} alt="App Logo" className="app-logo" />
            <h2 className="form-title">Login</h2>
            <form onSubmit={handleLogin}>
              <div className="input-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                />
              </div>
              <div className="input-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                />
              </div>
              <button type="submit" className="login-btn">
                Log In
              </button>
            </form>
            <div className="signup-section">
              <p>Don't have an account?</p>
              <button className="signup-btn" onClick={() => navigate('/signup')}>
                Sign Up
              </button>
            </div>
          </div>
        </main>

        <div className="action-buttons">
          <button className="back-button" onClick={handleBack}>
            <img src={backIcon} alt="Back" className="back-icon" />
            <span>Back to Home</span>
          </button>
          <p className="footer-text">AI-Powered Meeting Assistant</p>
        </div>

        <style>
        {`
          .action-buttons {
            padding: 12px 30px;
            background: linear-gradient(45deg, #034FAF, #57D7E2);
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 10px 20px;
            border-radius: 15px;
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 100;
          }

          .back-button {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 20px;
            padding: 8px 16px;
            color: #034FAF;
            cursor: pointer;
            transition: all 0.3s ease;
            font-weight: 500;
          }

          .back-button:hover {
            background: white;
            transform: translateY(-2px);
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          }

          .back-icon {
            width: 20px;
            height: 20px;
            object-fit: contain;
          }

          .back-button span {
            font-size: 0.9rem;
            font-weight: 500;
          }

          .footer-text {
            color: white;
            margin: 0;
            font-size: 0.9rem;
            text-align: center;
            flex: 1;
          }

          @media (max-width: 768px) {
            .action-buttons {
              padding: 10px 20px;
              margin: 5px 10px;
            }

            .back-button {
              padding: 6px 12px;
            }

            .back-icon {
              width: 16px;
              height: 16px;
            }

            .footer-text {
              font-size: 0.8rem;
            }

            .back-button span {
              font-size: 0.8rem;
            }
          }
        `}
        </style>
      </div>

      <style>
        {`
          .login-container {
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
          }

          html, body, #root {
            margin: 0;
            padding: 0;
            overflow: hidden !important;
            position: fixed;
            width: 100%;
            height: 100%;
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
            
          }

          @keyframes backgroundShift {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
          }

          .logo {
            height: 60px;
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          }

          .main-title {
            font-family: 'UnifrakturMaguntia', serif;
            font-size: 2.8rem;
            color: #034FAF;
            text-align: center;
            margin: 0;
            padding: 0 20px;
          }

          .main-content {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: flex-start;
            padding-top: 10px;
          }

          .login-form {
            background: rgba(56, 56, 56, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            padding: 40px;
            border-radius: 20px;
            width: 100%;
            max-width: 420px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 0px;
          }

          .app-logo {
            width: 120px;
            height: auto;
            margin-bottom: 25px;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
            transition: transform 0.3s ease;
          }

          .app-logo:hover {
            transform: scale(1.05);
          }

          .form-title {
            color: white;
            font-size: 2rem;
            font-weight: 700;
            margin-bottom: 30px;
            text-align: center;
            letter-spacing: 1px;
            text-transform: uppercase;
          }

          .input-group {
            width: 90%;
            margin-bottom: 20px;
            margin-right: 35px;
          }

          .input-group label {
            display: block;
            color: white;
            margin-bottom: 8px;
            font-weight: 500;
            font-size: 0.9rem;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }

          .input-group input {
            width: 100%;
            padding: 12px 16px;
            border: 2px solid rgba(255, 255, 255, 0.1);
            border-radius: 8px;
            background: rgba(255, 255, 255, 0.05);
            color: white;
            font-size: 1rem;
            transition: all 0.3s ease;
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

          .login-btn {
            width: 100%;
            padding: 14px;
            background: linear-gradient(45deg, #034FAF, #57D7E2);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-top: 10px;
            box-shadow: 0 4px 15px rgba(3, 79, 175, 0.2);
          }

          .login-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(3, 79, 175, 0.3);
            background: linear-gradient(45deg, #0367d4, #64e0ea);
          }

          .login-btn:active {
            transform: translateY(0);
          }

          .signup-section {
            margin-top: 25px;
            text-align: center;
            width: 100%;
            padding-top: 20px;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
          }

          .signup-section p {
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 12px;
            font-size: 0.9rem;
          }

          .signup-btn {
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

          .signup-btn:hover {
            background: rgba(255, 255, 255, 0.1);
            border-color: rgba(255, 255, 255, 0.3);
            transform: translateY(-2px);
          }

          /* Responsive adjustments */
          @media (max-width: 768px) {
            .login-form {
              padding: 30px;
              max-width: 90%;
              margin: 20px;
            }

            .form-title {
              font-size: 1.8rem;
            }

            .app-logo {
              width: 100px;
              margin-bottom: 20px;
            }

            .input-group input {
              padding: 10px 14px;
            }
          }

          @media (max-width: 480px) {
            .login-form {
              padding: 25px;
            }

            .form-title {
              font-size: 1.5rem;
            }

            .app-logo {
              width: 80px;
            }
          }

          .action-buttons {
            padding: 20px;
            background: linear-gradient(45deg, #034FAF, #57D7E2);
            display: flex;
            align-items: center;
            box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.1);
            border-radius: 30px 30px 0 0;
            margin: 0 20px;
          }

          .footer-left {
            flex: 1;
          }

          .back-button {
            background: rgba(255, 255, 255, 0.9);
            border: none;
            border-radius: 20px;
            padding: 8px 16px;
            display: flex;
            align-items: center;
            cursor: pointer;
            transition: all 0.3s ease;
            gap: 6px;
          }

          .back-icon {
            width: 16px;
            height: 16px;
            object-fit: contain;
          }

          .footer-text {
            flex: 2;
            color: white;
            font-size: 1rem;
            margin: 0;
            text-align: center;
          }

          @media (max-width: 768px) {
            .luxury-header {
              padding: 10px;
              flex-direction: column;
            }

            .logo {
              height: 50px;
              margin: 5px 0;
            }

            .main-title {
              font-size: 1.8rem;
            }

            .login-form {
              padding: 20px;
            }

            .form-title {
              font-size: 1.5rem;
            }

            .action-buttons {
              padding: 15px;
              flex-direction: column;
              gap: 10px;
            }

            .footer-left {
              width: 100%;
            }

            .back-button {
              width: fit-content;
            }

            .footer-text {
              font-size: 0.9rem;
            }
          }

          @media (min-height: 800px) {
            .main-content {
              padding: 40px 20px;
            }

            .login-form {
              padding: 40px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;
