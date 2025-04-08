import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import AITranscriptionIcon from '../assets/ai_transcription_icon.svg';
import MinutesIcon from '../assets/minutes_icon.svg';
import ManagementIcon from '../assets/management_icon.svg';

const Home = () => {
  const navigate = useNavigate();

  // Sample features for features section
  const features = [
    {
      title: 'AI Transcription',
      description: 'Accurate speech-to-text conversion powered by advanced AI technology',
      icon: AITranscriptionIcon,
      color: '#034FAF'
    },
    {
      title: 'Minutes of the Meeting',
      description: 'Automated generation of comprehensive meeting summaries and action items',
      icon: MinutesIcon,
      color: '#0369A1'
    },
    {
      title: 'Easy Management',
      description: 'Intuitive organization and quick access to all your meeting recordings',
      icon: ManagementIcon,
      color: '#047857'
    }
  ];

  // Navigation handlers
  const handleUploadClick = () => {
    navigate('/upload-recorded');
  };

  const handleLearnMore = () => {
    const featuresSection = document.getElementById('features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const PrimaryButton = ({ onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        background: '#034FAF',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
      onMouseOver={(e) => {
        e.target.style.background = '#0347A0';
        e.target.style.transform = 'translateY(-2px)';
        e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
      }}
      onMouseOut={(e) => {
        e.target.style.background = '#034FAF';
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
      }}
    >
      {children}
    </button>
  );

  const SecondaryButton = ({ onClick, children }) => (
    <button
      onClick={onClick}
      style={{
        padding: '12px 24px',
        background: 'transparent',
        color: '#034FAF',
        border: '2px solid #034FAF',
        borderRadius: '8px',
        fontWeight: '600',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginLeft: '15px',
      }}
      onMouseOver={(e) => {
        e.target.style.background = 'rgba(3, 79, 175, 0.1)';
        e.target.style.transform = 'translateY(-2px)';
      }}
      onMouseOut={(e) => {
        e.target.style.background = 'transparent';
        e.target.style.transform = 'translateY(0)';
      }}
    >
      {children}
    </button>
  );

  const FeatureCard = ({ title, description, icon, color }) => (
    <div style={{
      background: 'rgba(255, 255, 255, 0.15)',
      backdropFilter: 'blur(8px)',
      WebkitBackdropFilter: 'blur(8px)',
      borderRadius: '10px',
      padding: '25px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      border: '1px solid rgba(255, 255, 255, 0.25)',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
      transition: 'all 0.3s ease',
      height: '100%',
      cursor: 'default',
    }}
    onMouseOver={(e) => {
      e.currentTarget.style.transform = 'translateY(-5px)';
      e.currentTarget.style.boxShadow = '0 8px 15px rgba(0, 0, 0, 0.1)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
    }}
    onMouseOut={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.05)';
      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
    }}
    >
      <div style={{
        width: '50px',
        height: '50px',
        borderRadius: '10px',
        background: `${color}15`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '20px',
      }}>
        <img src={icon} alt={title} style={{ width: '25px', height: '25px' }} />
      </div>
      <h3 style={{
        color: color,
        margin: '0 0 10px 0',
        fontSize: '18px',
        fontWeight: '600',
        textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
        cursor: 'default'
      }}>{title}</h3>
      <p style={{
        color: '#333',
        margin: 0,
        fontSize: '14px',
        lineHeight: '1.6',
        textShadow: '0 1px 2px rgba(255, 255, 255, 0.7)',
        cursor: 'default'
      }}>{description}</p>
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: "'Montserrat', sans-serif",
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background Elements */}
      <div className="background-pattern" />

      {/* Gradient Overlay */}
      <div className="gradient-overlay" />

      {/* Decorative Elements */}
      <div className="decorative-circle circle-1" />
      <div className="decorative-circle circle-2" />
      <div className="decorative-circle circle-3" />

      <Sidebar />

      <div style={{
        flex: 1,
        position: 'relative',
        zIndex: 2,
        height: '100vh',
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        {/* Hero Section */}
        <section style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 50px',
          position: 'relative',
        }}>
          <div style={{
            maxWidth: '800px',
            animation: 'fadeIn 0.8s ease-out',
          }}>
            <h1 style={{
              fontSize: '48px',
              fontWeight: '700',
              color: '#034FAF',
              marginBottom: '20px',
              lineHeight: '1.2',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
              cursor: 'default',
            }}>
              Transform Your Meetings with <span style={{ color: '#0369A1' }}>AI</span>
            </h1>

            <p style={{
              fontSize: '18px',
              color: '#333',
              marginBottom: '40px',
              lineHeight: '1.6',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.7)',
              cursor: 'default',
            }}>
              Upload your recorded meetings and let our AI assistant generate accurate transcriptions and comprehensive meeting minutes automatically.
            </p>

            <div style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '20px',
            }}>
              <PrimaryButton onClick={handleUploadClick}>
                Upload Recorded Meeting
              </PrimaryButton>

              <SecondaryButton onClick={handleLearnMore}>
                Learn More
              </SecondaryButton>
            </div>
          </div>

          <div
            onClick={handleLearnMore}
            style={{
              position: 'absolute',
              bottom: '30px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'bounce 2s infinite',
              cursor: 'pointer',
              padding: '10px', /* Larger clickable area */
            }}
            className="clickable"
            role="button"
            aria-label="Scroll to features"
          >
            <svg width="30" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 10L12 15L17 10" stroke="#034FAF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </section>

        {/* Features Section */}
        <section id="features-section" style={{
          padding: '100px 50px',
          background: 'rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}>
          <div style={{
            maxWidth: '1200px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              color: '#034FAF',
              marginBottom: '50px',
              textAlign: 'center',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
              cursor: 'default',
            }}>
              Key Features
            </h2>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '30px',
            }}>
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
                  color={feature.color}
                />
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          padding: '100px 50px',
          textAlign: 'center',
        }}>
          <div style={{
            maxWidth: '800px',
            margin: '0 auto',
          }}>
            <h2 style={{
              fontSize: '36px',
              fontWeight: '700',
              color: '#034FAF',
              marginBottom: '20px',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
              cursor: 'default',
            }}>
              Ready to Get Started?
            </h2>

            <p style={{
              fontSize: '18px',
              color: '#333',
              marginBottom: '40px',
              lineHeight: '1.6',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.7)',
              cursor: 'default',
            }}>
              Start transforming your meetings today with our AI-powered assistant.
            </p>

            <PrimaryButton onClick={handleUploadClick}>
              Upload Your First Recorded Meeting
            </PrimaryButton>
          </div>
        </section>
      </div>

      <style>
        {`
          /* Background Animations */
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

          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0) translateX(-50%); }
            40% { transform: translateY(-10px) translateX(-50%); }
            60% { transform: translateY(-5px) translateX(-50%); }
          }

          /* Background Elements */
          .background-pattern {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(3, 79, 175, 0.12), rgba(87, 215, 226, 0.12)),
              url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23034FAF' fill-opacity='0.06'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
            animation: backgroundShift 30s linear infinite;
            z-index: 0;
          }

          .gradient-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(3, 79, 175, 0.25) 100%);
            z-index: 1;
          }

          /* Decorative Elements */
          .decorative-circle {
            position: absolute;
            border-radius: 50%;
            z-index: 1;
            opacity: 0.7;
            filter: blur(80px);
          }

          .circle-1 {
            width: 400px;
            height: 400px;
            background: radial-gradient(circle, rgba(3, 79, 175, 0.25) 0%, rgba(87, 215, 226, 0.12) 70%);
            top: -150px;
            right: 5%;
            animation: float 15s ease-in-out infinite, shimmer 8s infinite;
          }

          .circle-2 {
            width: 300px;
            height: 300px;
            background: radial-gradient(circle, rgba(87, 215, 226, 0.25) 0%, rgba(3, 79, 175, 0.12) 70%);
            bottom: 5%;
            left: 25%;
            animation: float 12s ease-in-out infinite reverse, shimmer 10s infinite 2s;
          }

          .circle-3 {
            width: 200px;
            height: 200px;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(3, 79, 175, 0.15) 70%);
            top: 35%;
            left: 65%;
            animation: float 20s ease-in-out infinite 2s, shimmer 12s infinite 1s;
          }

          /* Content Container */
          .content-container {
            flex: 1;
            padding: 25px 30px;
            position: relative;
            z-index: 2;
            width: calc(100% - 310px);
            overflow: auto;
            background: transparent;
            -webkit-backdrop-filter: none;
            backdrop-filter: none;
            box-shadow: none;
            msOverflowStyle: none;
            scrollbarWidth: none;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }

          @keyframes waveAnimation {
            0% { transform: scaleY(1); }
            50% { transform: scaleY(0.8); }
            100% { transform: scaleY(1); }
          }

          @keyframes softGlow {
            0% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03); }
            50% { box-shadow: 0 6px 22px rgba(3, 79, 175, 0.1); }
            100% { box-shadow: 0 4px 15px rgba(0, 0, 0, 0.03); }
          }

          @keyframes borderPulse {
            0% { border-color: rgba(3, 79, 175, 0.05); }
            50% { border-color: rgba(3, 79, 175, 0.15); }
            100% { border-color: rgba(3, 79, 175, 0.05); }
          }

          @keyframes iconFloat {
            0% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
            100% { transform: translateY(0); }
          }

          @keyframes accentLineWidth {
            0% { width: 30px; opacity: 0.7; }
            50% { width: 50px; opacity: 1; }
            100% { width: 30px; opacity: 0.7; }
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
          h1, h2, h3, h4, h5, h6, p, span, div, section {
            cursor: default !important;
          }

          /* Ensure buttons and interactive elements have pointer cursor */
          button, a, .clickable, [role="button"] {
            cursor: pointer !important;
          }

          /* Header Styles */
          .header-container {
            width: 100%;
            max-width: 1200px;
            margin-bottom: 30px;
            position: relative;
            animation: fadeIn 0.8s ease-out;
            overflow: hidden;
            align-self: center;
          }

          .header-accent-line {
            display: none;
          }

          .home-header {
            background: transparent;
            padding: 30px 40px;
            position: relative;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            box-shadow: none;
            border-radius: 0;
            border: none;
          }

          .header-content {
            text-align: center;
            max-width: 800px;
            position: relative;
            z-index: 2;
          }

          .header-title-container {
            position: relative;
            display: inline-block;
            margin-bottom: 15px;
          }

          .header-underline {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 3px;
            background: #034FAF;
            border-radius: 3px;
          }

          .home-header h1 {
            color: #034FAF;
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            line-height: 1.3;
            position: relative;
            letter-spacing: 0.5px;
            text-shadow: 0 1px 3px rgba(255, 255, 255, 0.7);
          }

          .highlight {
            color: #034FAF;
            position: relative;
            font-weight: 700;
          }

          .header-subtitle {
            color: #333;
            margin: 25px auto 5px;
            font-size: 16px;
            line-height: 1.6;
            max-width: 650px;
            font-weight: 400;
            letter-spacing: 0.2px;
            text-shadow: 0 1px 3px rgba(255, 255, 255, 0.7);
          }

          /* Main Content Area */
          .main-content-area {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 30px;
            height: calc(100vh - 180px);
            overflow: auto;
            width: 100%;
            max-width: 1200px;
            padding: 10px 5px;
          }

          /* Features Grid */
          .features-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 20px;
            width: 100%;
            max-width: 100%;
            margin-bottom: 10px;
          }

          /* Feature Cards */
          .feature-card {
            position: relative;
            background: rgba(255, 255, 255, 0.15);
            padding: 20px;
            border-radius: 8px;
            box-shadow: none;
            text-align: left;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: flex-start;
            min-height: 140px;
            transition: all 0.3s ease;
            border: 1px solid rgba(255, 255, 255, 0.25);
            overflow: hidden;
            animation: fadeIn 0.6s ease-out;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }

          /* Card 1 Animation - Soft Glow */
          .feature-card-1 {
            animation: fadeIn 0.6s ease-out, softGlow 4s infinite ease-in-out;
          }

          /* Card 2 Animation - Border Pulse */
          .feature-card-2 {
            animation: fadeIn 0.6s ease-out, borderPulse 5s infinite ease-in-out;
          }

          /* Card 3 Animation - Subtle Scale */
          .feature-card-3 {
            animation: fadeIn 0.6s ease-out, pulse 6s infinite ease-in-out;
          }

          .feature-card:hover {
            transform: translateY(-3px);
            background: rgba(255, 255, 255, 0.25);
            border-color: rgba(255, 255, 255, 0.3);
          }

          .feature-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background: #034FAF;
            opacity: 0;
            transition: opacity 0.3s ease;
          }

          .feature-card:hover::before {
            opacity: 1;
          }

          .feature-icon-container {
            margin-bottom: 15px;
            transition: all 0.3s ease;
          }

          .feature-icon-background {
            background: rgba(3, 79, 175, 0.04);
            padding: 10px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.3s ease;
          }

          .feature-card:hover .feature-icon-background {
            background: rgba(3, 79, 175, 0.08);
          }

          /* Icon animations for each card */
          .feature-card-1 .feature-icon-container {
            animation: iconFloat 4s infinite ease-in-out;
          }

          .feature-card-2 .feature-icon-background {
            animation: pulse 5s infinite ease-in-out;
          }

          .feature-card-3 .feature-icon {
            animation: pulse 4.5s infinite ease-in-out;
          }

          .feature-icon {
            width: 24px;
            height: 24px;
            transition: transform 0.3s ease;
          }

          .feature-card:hover .feature-icon {
            transform: scale(1.05);
          }

          .feature-content {
            width: 100%;
          }

          .feature-title {
            color: #034FAF;
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
            transition: color 0.3s ease;
            text-shadow: 0 1px 3px rgba(255, 255, 255, 0.7);
          }

          .feature-card:hover .feature-title {
            color: #0047AB;
          }

          .feature-divider {
            width: 30px;
            height: 2px;
            background: #034FAF;
            margin-bottom: 8px;
            transition: width 0.3s ease;
          }

          .feature-card:hover .feature-divider {
            width: 40px;
          }

          /* Divider animations for each card */
          .feature-card-1 .feature-divider {
            animation: accentLineWidth 4s infinite ease-in-out;
          }

          .feature-card-2 .feature-divider {
            animation: accentLineWidth 5s infinite ease-in-out 1s;
          }

          .feature-card-3 .feature-divider {
            animation: accentLineWidth 6s infinite ease-in-out 2s;
          }

          .feature-description {
            color: #333;
            margin: 0;
            font-size: 13px;
            line-height: 1.5;
            font-weight: 400;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);
          }

          /* Upload Section */
          .upload-section {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.15);
            padding: 30px;
            border-radius: 8px;
            box-shadow: none;
            max-width: 450px;
            width: 100%;
            margin-top: 20px;
            border: 1px solid rgba(255, 255, 255, 0.25);
            animation: fadeIn 0.8s ease-out;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
            backdrop-filter: blur(8px);
            -webkit-backdrop-filter: blur(8px);
          }

          .upload-section::before {
            display: none;
          }

          .upload-section:hover {
            background: rgba(255, 255, 255, 0.25);
            transform: translateY(-3px);
          }

          .upload-content {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;
            position: relative;
            z-index: 2;
          }

          .upload-title {
            color: #034FAF;
            font-weight: 700;
            margin-bottom: 8px;
            font-size: 18px;
            text-align: center;
            letter-spacing: 0.5px;
            position: relative;
            text-shadow: 0 1px 3px rgba(255, 255, 255, 0.7);
          }

          .upload-description {
            color: #333;
            font-size: 14px;
            text-align: center;
            margin-bottom: 20px;
            font-weight: 400;
            text-shadow: 0 1px 2px rgba(255, 255, 255, 0.7);
          }

          .waveform-container {
            margin-bottom: 25px;
            position: relative;
            overflow: hidden;
            padding: 10px 15px;
            transition: all 0.3s ease;
          }

          .audio-waveform {
            height: 60px;
            transition: all 0.3s ease;
            animation: waveAnimation 2s infinite ease-in-out;
          }

          .upload-section:hover .audio-waveform {
            transform: scale(1.03);
          }

          .start-button {
            padding: 10px 25px;
            background: #034FAF;
            color: white;
            border: none;
            border-radius: 4px;
            font-weight: 600;
            cursor: pointer;
            font-size: 15px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 10px rgba(3, 79, 175, 0.1);
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
          }

          .button-text {
            position: relative;
            z-index: 2;
          }

          .button-icon {
            font-size: 16px;
            transition: transform 0.3s ease;
            position: relative;
            z-index: 2;
          }

          .start-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 15px rgba(3, 79, 175, 0.15);
            background: #0047AB;
          }

          .start-button:hover .button-icon {
            transform: translateX(3px);
          }

          .start-button:active {
            transform: translateY(1px);
            box-shadow: 0 2px 8px rgba(3, 79, 175, 0.1);
          }

          /* Responsive Styles */
          @media (max-width: 1200px) {
            .features-grid {
              gap: 20px;
            }

            .feature-card {
              padding: 25px 20px;
            }
          }

          @media (max-width: 992px) {
            .features-grid {
              grid-template-columns: repeat(2, 1fr);
              gap: 25px;
            }
          }

          @media (max-width: 768px) {
            .content-container {
              padding: 20px;
            }

            .home-header {
              padding: 25px 20px;
            }

            .home-header h1 {
              font-size: 24px;
            }

            .header-subtitle {
              font-size: 15px;
              margin-top: 20px;
            }

            .header-underline {
              width: 80px;
            }

            .feature-card {
              min-height: 170px;
            }

            .upload-section {
              padding: 30px 25px;
            }

            .upload-title {
              font-size: 18px;
            }
          }

          @media (max-width: 576px) {
            .features-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }

            .feature-card {
              min-height: auto;
              padding: 20px;
            }

            .home-header {
              padding: 20px 15px;
            }

            .home-header h1 {
              font-size: 22px;
            }

            .header-subtitle {
              font-size: 14px;
              margin-top: 15px;
            }

            .header-underline {
              width: 60px;
              bottom: -8px;
            }

            .upload-section {
              padding: 25px 20px;
            }

            .waveform-container {
              padding: 10px 15px;
            }

            .audio-waveform {
              height: 70px;
            }

            .start-button {
              padding: 10px 25px;
              font-size: 15px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
