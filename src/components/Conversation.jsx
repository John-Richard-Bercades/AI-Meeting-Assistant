import React, { useState, useEffect, useRef } from "react";
import Sidebar from './Sidebar';
import backIcon from '../assets/back.png';
import dateIcon from '../assets/date.png';
import timeIcon from '../assets/time.png';
import speaker from '../assets/speaker.png';

const Conversation = () => {
  const [autoScroll, setAutoScroll] = useState(false);
  const [transcriptData, setTranscriptData] = useState([]);
  const transcriptRef = useRef(null);  // Add ref for transcript section

  // Auto scroll effect
  useEffect(() => {
    if (autoScroll && transcriptRef.current) {
      const scrollInterval = setInterval(() => {
        const element = transcriptRef.current;
        element.scrollTop = element.scrollTop + 5; // Adjust scroll speed by changing this value

        // Reset scroll to top when reached bottom
        if (element.scrollTop >= (element.scrollHeight - element.clientHeight)) {
          element.scrollTop = 0;
        }
      }, 50); // Adjust interval for smoother/faster scrolling

      return () => clearInterval(scrollInterval);
    }
  }, [autoScroll]);

  useEffect(() => {
    const parseTranscript = (text) => {
      return text.split('\n')
        .filter(line => line.trim() !== '') // Remove empty lines
        .map(line => {
          // Check if the line contains a colon
          if (line.includes(':')) {
            const [speaker, ...textParts] = line.split(':');
            return {
              speaker: speaker.trim(),
              text: textParts.join(':').trim() // Rejoin in case text contains colons
            };
          }
          return null;
        })
        .filter(item => item !== null); // Remove any null entries
    };

    // Use the correct path to the file in the public folder
    fetch('/SMT.txt')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text();
      })
      .then(text => {
        const parsedData = parseTranscript(text);
        setTranscriptData(parsedData);
      })
      .catch(error => {
        console.error('Error loading transcript:', error);
        // Set some default data or error state here if needed
        setTranscriptData([{
          speaker: "Error",
          text: "Could not load transcript. Please try again later."
        }]);
      });
  }, []);

  const toggleAutoScroll = () => {
    setAutoScroll(!autoScroll);
  };

  return (
    <div style={{
      display: 'flex',
      height: '100vh',
      fontFamily: 'Montserrat, sans-serif',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
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

      <Sidebar style={{ position: 'relative', zIndex: 2 }} />

      <div style={{
        flex: 1,
        padding: '30px',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '25px',
          flexShrink: 0,
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '15px 25px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          transition: 'all 0.3s ease',
          animation: 'fadeIn 0.8s ease-out',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.background = 'rgba(3, 79, 175, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.background = 'transparent';
          }}
          >
            <img
              src={backIcon}
              alt="back"
              style={{
                width: '24px',
                height: '24px',
                marginRight: '15px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onClick={() => window.history.back()}
            />
          </div>
          <h1 style={{
            margin: 0,
            fontSize: "24px",
            fontWeight: "900",
            color: '#034FAF',
            letterSpacing: '0.5px',
            cursor: 'default',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
          }}>CONVERSATION</h1>
        </div>

        {/* Title Header */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '25px',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          flexShrink: 0,
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          animation: 'fadeIn 0.8s ease-out',
        }}>
          <h2 style={{
            margin: 0,
            fontSize: '24px',
            fontWeight: '800',
            color: '#034FAF',
            marginBottom: '12px',
            cursor: 'default',
            textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
          }}>Online Kamustahan</h2>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.3)',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}>
                <img src={dateIcon} alt="Date" style={{ width: '20px', height: '20px', marginRight: '8px', cursor: 'default' }} />
                <span style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#333',
                  cursor: 'default',
                }}>07/26/2024</span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.3)',
                padding: '8px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
              }}>
                <img src={timeIcon} alt="Time" style={{ width: '20px', height: '20px', marginRight: '8px', cursor: 'default' }} />
                <span style={{
                  fontSize: '15px',
                  fontWeight: '600',
                  color: '#333',
                  cursor: 'default',
                }}>10:31PM</span>
              </div>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              background: 'rgba(255, 255, 255, 0.3)',
              padding: '8px 15px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.05)',
            }}>
              <span style={{
                fontSize: '14px',
                fontWeight: '600',
                marginRight: '12px',
                color: '#034FAF',
                cursor: 'default',
              }}>Auto-scroll</span>
              <div
                onClick={toggleAutoScroll}
                style={{
                  width: '44px',
                  height: '24px',
                  borderRadius: '12px',
                  backgroundColor: autoScroll ? '#034FAF' : '#E0E0E0',
                  position: 'relative',
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                  boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    backgroundColor: 'white',
                    position: 'absolute',
                    top: '2px',
                    left: autoScroll ? '22px' : '2px',
                    transition: 'left 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Transcript Section */}
        <div
          ref={transcriptRef}
          style={{
            background: 'rgba(255, 255, 255, 0.15)',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            overflowY: 'auto',
            flex: 1,
            border: '1px solid rgba(255, 255, 255, 0.25)',
            marginBottom: '0',
            scrollBehavior: 'smooth',
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
            animation: 'fadeIn 0.8s ease-out',
            msOverflowStyle: 'none',  /* IE and Edge */
            scrollbarWidth: 'none',   /* Firefox */
          }}
          className="transcript-section"
        >
          {/* Map through transcript data */}
          {transcriptData.map((entry, index) => (
            <div
              key={index}
              style={{
                marginBottom: '25px',
                padding: '20px',
                borderRadius: '12px',
                background: index % 2 === 0 ? 'rgba(255, 255, 255, 0.5)' : 'rgba(255, 255, 255, 0.3)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                backdropFilter: 'blur(5px)',
                WebkitBackdropFilter: 'blur(5px)',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.03)',
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.03)';
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <div style={{
                  borderRadius: "50%",
                  padding: "10px",
                  background: 'rgba(3, 79, 175, 0.1)',
                  border: '1px solid rgba(3, 79, 175, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <img
                    src={speaker}
                    alt="Speaker Icon"
                    style={{ width: "24px", height: "24px", cursor: 'default' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginBottom: '8px',
                  }}>
                    <span style={{
                      fontSize: "16px",
                      fontWeight: "700",
                      color: "#034FAF",
                      cursor: 'default',
                      textShadow: '0 1px 2px rgba(255, 255, 255, 0.7)',
                    }}>
                      {entry.speaker}
                    </span>
                  </div>
                  <p style={{
                    fontSize: "15px",
                    lineHeight: '1.6',
                    color: "#333",
                    margin: 0,
                    cursor: 'default',
                  }}>
                    {entry.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
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
          .transcript-section::-webkit-scrollbar {
            display: none;
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

export default Conversation;
