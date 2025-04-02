import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UploadIcon from '../assets/record_meeting.png';

const Home = () => {
  const navigate = useNavigate();

  const handleUploadClick = () => {
    navigate('/upload-recorded');
  };

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      fontFamily: "'Montserrat', sans-serif", 
      position: 'relative',
      overflow: 'hidden', // This ensures no scrolling at container level
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
      
      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(3, 79, 175, 0.2) 100%)',
        zIndex: 1,
      }} />

      <Sidebar style={{ position: 'relative', zIndex: 2 }} />

      <div style={{ 
        marginLeft: '320px',
        flex: 1, 
        padding: '30px 40px',
        position: 'relative',
        zIndex: 2,
        maxWidth: 'calc(100% - 400px)',
        overflow: 'auto', // Change from 'hidden' to 'auto' to allow content scrolling
        msOverflowStyle: 'none', // Hide scrollbar in IE/Edge
        scrollbarWidth: 'none', // Hide scrollbar in Firefox
      }}>
        {/* Header Section */}
        <header className="home-header">
          <div className="header-content">
            <h1>Welcome to AI Meeting Assistant</h1>
            <p>Upload your recorded audio or video files and let AI help you manage your meetings efficiently</p>
          </div>
        </header>

        {/* Main Content Area */}
        <div style={{
          padding: '10px 20px', // Reduced top padding
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '50px', // Adjusted gap between main sections
          height: 'calc(100vh - 200px)',
          overflow: 'hidden'
        }}>
          {/* Features Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '25px',
            width: '100%',
            maxWidth: '1000px',
            marginTop: '5px', // Negative margin to pull it up
            marginBottom: '-15px', // Added margin bottom
          }}>
            {[
              { 
                title: 'AI Transcription', 
                description: 'Accurate speech-to-text conversion powered by advanced AI technology',
                icon: '🤖',
                gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
              },
              { 
                title: 'Minutes of the Meeting', 
                description: 'Automated generation of comprehensive meeting summaries and action items',
                icon: '📝',
                gradient: 'linear-gradient(135deg, #3B82F6, #2DD4BF)'
              },
              { 
                title: 'Easy Management', 
                description: 'Intuitive organization and quick access to all your meeting recordings',
                icon: '⚡',
                gradient: 'linear-gradient(135deg, #F59E0B, #EF4444)'
              }
            ].map((feature, index) => (
              <div key={index} style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.98)',
                padding: '35px 25px',
                borderRadius: '20px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
                border: '1px solid rgba(3, 79, 175, 0.08)',
                textAlign: 'left',
                transition: 'all 0.4s ease',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'flex-start',
                minHeight: '240px',
                overflow: 'hidden',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.12)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.05)';
              }}
              >
                {/* Decorative Top Border */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: feature.gradient,
                }} />
                
                {/* Icon Container */}
                <div style={{
                  background: feature.gradient,
                  width: '50px',
                  height: '50px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px',
                  fontSize: '24px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                }}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 style={{
                  color: '#1F2937',
                  margin: '0 0 12px 0',
                  fontSize: '20px',
                  fontWeight: '700',
                  letterSpacing: '-0.5px',
                }}>
                  {feature.title}
                </h3>

                <p style={{
                  color: '#6B7280',
                  margin: 0,
                  fontSize: '15px',
                  lineHeight: '1.6',
                  fontWeight: '400',
                }}>
                  {feature.description}
                </p>

                {/* Decorative Corner Element */}
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: '100px',
                  height: '100px',
                  background: `linear-gradient(135deg, transparent, ${feature.gradient.split(',')[1].trim().slice(0, -1)})`,
                  opacity: '0.05',
                  borderRadius: '100% 0 0 0',
                }} />
              </div>
            ))}
          </div>

          {/* Upload Section */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '25px', // Slightly reduced padding
            borderRadius: '15px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            border: '1px solid rgba(3, 79, 175, 0.1)',
            backdropFilter: 'blur(10px)',
            maxWidth: '800px',
            width: '100%',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            marginTop: '0', // Removed top margin since we're using gap
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-5px)';
            e.currentTarget.style.boxShadow = '0 6px 35px rgba(0, 0, 0, 0.15)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
          }}
          >
            <h2 style={{ 
              color: '#034FAF', 
              fontWeight: '900', 
              marginBottom: '20px', // Reduced margin
              fontSize: '25px',
              textAlign: 'center'
            }}>
              PROCESS RECORDED MEETING FILES
            </h2>
            <img 
              src={UploadIcon} 
              alt="Upload Recorded Audio Files" 
              style={{ 
                height: '100px', 
                marginBottom: '25px',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
            />
            <button 
              onClick={handleUploadClick}
              style={{
                padding: '15px 40px',
                background: 'linear-gradient(45deg, #034FAF, #57D7E2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '16px',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 15px rgba(3, 79, 175, 0.2)'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 20px rgba(3, 79, 175, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 15px rgba(3, 79, 175, 0.2)';
              }}
            >
              Start 
            </button>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes backgroundShift {
            0% { background-position: 0 0; }
            100% { background-position: 100% 100%; }
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
          
          .home-header {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(3, 79, 175, 0.1);
            box-shadow: 0 2px 15px rgba(0, 0, 0, 0.08);
            margin: 5px 20px 0;
            border-radius: 30px 30px 30px 30px;
            padding: 25px 40px;
            position: relative;
            z-index: 10;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .header-content {
            text-align: center;
            max-width: 800px;
          }

          .home-header h1 {
            color: #034FAF;
            margin: 0;
            font-size: 28px;
            font-weight: 900;
            letter-spacing: -0.5px;
            line-height: 1.2;
            position: relative;
          }

          .home-header p {
            color: #666;
            margin: 15px auto 0;
            font-size: 16px;
            line-height: 1.5;
            max-width: 600px;
            opacity: 0.9;
          }

          @media (max-width: 768px) {
            .home-header {
              padding: 20px;
            }

            .home-header h1 {
              font-size: 24px;
            }

            .home-header p {
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
};

export default Home;
