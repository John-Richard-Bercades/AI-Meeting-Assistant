import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import CheckmarkIcon from '../assets/saved.png';

const RecordSaved = () => {
  const navigate = useNavigate();

  const handleDoneClick = () => {
    navigate('/home');
  };

  const handleGoToConversationClick = () => {
    navigate('/conversation-list');
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

      <Sidebar style={{ position: 'relative', zIndex: 2 }} />

      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        padding: '30px',
        position: 'relative',
        zIndex: 2,
        height: '100vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '100%',
          maxWidth: '800px',
        }}>
          {/* Header Section */}
          <div style={{ 
            background: 'linear-gradient(135deg, #28a745, #20c997)',
            padding: '25px 40px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(40, 167, 69, 0.2)',
            marginBottom: '30px',
            width: '100%',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px'
          }}>
            <h2 style={{ 
              margin: '0', 
              color: 'white', 
              fontWeight: '700', 
              fontSize: '28px',
              textAlign: 'center',
              letterSpacing: '1px',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}>
              RECORD HAS BEEN SAVED
            </h2>
          </div>

          {/* Main Content */}
          <div style={{ 
            textAlign: 'center', 
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '50px',
            borderRadius: '20px',
            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
            backdropFilter: 'blur(10px)',
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.3)',
          }}>
            {/* Success Animation */}
            <div style={{
              width: '120px',
              height: '120px',
              margin: '0 auto 30px',
              background: 'linear-gradient(135deg, #28a745, #20c997)',
              borderRadius: '60px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 10px 20px rgba(40, 167, 69, 0.2)',
              animation: 'pulseAnimation 2s infinite',
            }}>
              <svg 
                width="60" 
                height="60" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white"
                strokeWidth="3" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                style={{
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1))',
                  animation: 'checkmarkAnimation 0.5s ease-out',
                }}
              >
                <path d="M20 6L9 17l-5-5"/>
              </svg>
            </div>

            {/* Success Message */}
            <h2 style={{ 
              color: '#28a745',
              fontSize: '32px',
              fontWeight: '800',
              marginBottom: '20px',
              textShadow: '0 2px 4px rgba(40, 167, 69, 0.1)',
            }}>
              Success!
            </h2>

            <p style={{ 
              fontSize: '18px', 
              color: '#666', 
              margin: '0 auto 40px',
              maxWidth: '500px',
              lineHeight: '1.6',
              fontWeight: '500',
            }}>
              Your recording has been successfully saved and is now ready for transcription. 
              You can access it anytime from your transcriptions list.
            </p>

            {/* Action Buttons Container */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: '20px',
              position: 'relative',
            }}>
              <button
                onClick={() => navigate('/home')}
                style={{
                  padding: '16px 40px',
                  backgroundColor: 'white',
                  color: '#034FAF',
                  border: '2px solid #034FAF',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '200px',
                  transition: 'all 0.3s ease',
                  fontSize: '16px',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.15)';
                  e.target.style.backgroundColor = 'rgba(3, 79, 175, 0.1)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
                  e.target.style.backgroundColor = 'white';
                }}
              >
                Back to Home
              </button>
              <button
                onClick={handleGoToConversationClick}
                style={{
                  padding: '16px 40px',
                  background: 'linear-gradient(45deg, #034FAF, #0367d4)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  width: '200px',
                  transition: 'all 0.3s ease',
                  fontSize: '16px',
                  boxShadow: '0 4px 15px rgba(3, 79, 175, 0.3)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseOver={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 6px 20px rgba(3, 79, 175, 0.4)';
                }}
                onMouseOut={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 15px rgba(3, 79, 175, 0.3)';
                }}
              >
                View Transcriptions
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Add animations */}
      <style>
        {`
          @keyframes pulseAnimation {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
          }

          @keyframes checkmarkAnimation {
            0% { transform: scale(0); opacity: 0; }
            100% { transform: scale(1); opacity: 1; }
          }

          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      {/* Animation keyframes */}
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

export default RecordSaved;
