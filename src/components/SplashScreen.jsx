import React from "react";
import { useNavigate } from "react-router-dom";
import lspuLogo from '../assets/lspu_logo.png';
import ccsLogo from '../assets/ccs_logo.png';
import logo from '../assets/logo.png';

const SplashScreen = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="splash-container">
      <link href="https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Playfair+Display:wght@400;500;600;700;800;900&family=Montserrat:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet" />
      
      <div className="luxury-bg"></div>
      <div className="gradient-overlay"></div>

      <div className="content-wrapper">
        <header className="luxury-header">
          <img src={lspuLogo} alt="Left Logo" className="logo logo-left" />
          <div className="title-container">
            <h1 className="main-title">Laguna State Polytechnic University</h1>
            <h2 className="subtitle">COLLEGE OF COMPUTER STUDIES DEAN'S OFFICE</h2>
          </div>
          <img src={ccsLogo} alt="Right Logo" className="logo logo-right" />
        </header>

        <main className="main-content">
          <img src={logo} alt="App Logo" className="app-logo" />
          <h2 className="hero-title">AI-Powered Meeting Assistant</h2>
          <p className="hero-description">
            Enhance your meetings with advanced AI technology for better collaboration and productivity
          </p>
        </main>

        <div className="action-buttons">
          <button className="luxury-btn">DEMO</button>
          <button className="luxury-btn">ABOUT</button>
          <button className="luxury-btn" onClick={handleSignUpClick}>SIGN UP</button>
          <button className="luxury-btn" onClick={handleLoginClick}>LOGIN</button>
        </div>
      </div>

      <style>
        {`
          html, body, #root {
            margin: 0;
            padding: 0;
            overflow: hidden !important;
            position: fixed;
            width: 100%;
            height: 100%;
          }

          .splash-container {
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
            height: 100%;
            overflow: hidden !important;
          }

          .luxury-header {
            padding: 20px 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid rgba(255, 255, 255, 0.3);
            position: relative;
            overflow: hidden;
            border-radius: 0 0 30px 30px; /* Added curved bottom corners */
            margin: 0 20px; /* Added margin to show the curved corners */
          }

          .luxury-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%);
            animation: shimmer 3s infinite;
          }

          .logo {
            height: 80px;
            transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
          }

          .logo:hover {
            transform: scale(1.05) rotate(5deg);
          }

          .title-container {
            flex-grow: 1;
            text-align: center;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }

          .main-title {
            font-family: 'UnifrakturMaguntia', serif;
            font-size: 3.5rem;
            margin: 0;
            color: #000000;
            text-transform: none;
            letter-spacing: 2px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1),
                         -1px -1px 0 rgba(255, 255, 255, 0.5);
            padding: 0 20px;
            position: relative;
            text-align: center;
            width: 100%;
          }

          .subtitle {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            margin: 5px 0 0;
            color: #034FAF;
            text-transform: none;
            letter-spacing: 1px;
            text-align: center;
            width: 100%;
          }

          .main-content {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            padding: 40px;
            background: transparent;
            position: relative;
            overflow: hidden !important;
          }

          .main-content::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 60%);
            animation: rotate 20s linear infinite;
          }

          .app-logo {
            width: 200px;
            height: auto;
            margin-bottom: 30px;
            filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.2));
            transition: transform 0.3s ease;
          }

          .app-logo:hover {
            transform: scale(1.05);
          }

          .hero-title {
            font-family: 'Playfair Display', serif;
            color: #ffffff;
            font-weight: 900;
            font-size: 4.5rem;
            margin: 0 0 30px 0;
            text-transform: uppercase;
            letter-spacing: 4px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
            line-height: 1.2;
            position: relative;
          }

          .hero-description {
            font-family: 'Montserrat', sans-serif;
            font-size: 1.4rem;
            font-weight: 300;
            color: #000000;
            max-width: 800px;
            line-height: 1.8;
            margin: 0 0 40px 0;
            padding: 30px;
            background: rgba(0, 0, 0, 0.7);
            color: #ffffff;
            border-radius: 50px;  /* Added this line to make corners curved */
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.5);
            transform: perspective(1000px) rotateX(5deg);
            transition: transform 0.3s ease;
          }

          .hero-description:hover {
            transform: perspective(1000px) rotateX(0deg);
          }

          .action-buttons {
            padding: 30px;
            background: linear-gradient(45deg, #034FAF, #57D7E2);
            display: flex;
            justify-content: center;
            gap: 30px;
            box-shadow: 0 -4px 30px rgba(0, 0, 0, 0.1);
            position: relative;
            overflow: hidden;
            border-radius: 30px 30px 0 0; /* Added curved top corners */
            margin: 0 20px; /* Added margin to show the curved corners */
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
            padding: 18px 40px;
            border-radius: 30px;
            border: none;
            background: rgba(255, 255, 255, 0.95);
            color: #034FAF;
            font-weight: 600;
            font-size: 1.1rem;
            cursor: pointer;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            text-transform: uppercase;
            letter-spacing: 3px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            backdrop-filter: blur(5px);
            position: relative;
            overflow: hidden;
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

          @keyframes backgroundShift {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
          }

          @keyframes titleFloat {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
          }

          @keyframes shimmer {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @keyframes rotate {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @keyframes shine {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(100%); }
          }

          @media (max-width: 768px) {
            .main-title {
              font-size: 2rem;
            }
            
            .hero-title {
              font-size: 2.8rem;
            }

            .hero-description {
              font-size: 1.2rem;
            }

            .action-buttons {
              flex-direction: column;
              gap: 15px;
            }

            .luxury-btn {
              width: 100%;
              font-size: 1rem;
              padding: 15px 30px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default SplashScreen;
