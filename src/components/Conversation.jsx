import React, { useState, useEffect, useRef } from "react";
import styled from 'styled-components';
import Sidebar from './Sidebar';
import backIcon from '../assets/back.png';
import dateIcon from '../assets/date.png';
import timeIcon from '../assets/time.png';
import speaker from '../assets/speaker.png';

const ScrollableContent = styled.div`
  height: 100%;
  position: relative;
  overflow: hidden;
`;

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
      height: '100vh', // Changed from minHeight to fixed height
      fontFamily: 'Montserrat, sans-serif',
      position: 'relative',
      overflow: 'hidden' // Ensures no scrolling on the main container
    }}>
      {/* Background Pattern */}
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
        marginLeft: '350px',
        flex: 1, 
        padding: '30px 40px',
        height: '100vh',
        overflow: 'hidden', // Changed from overflowY: 'auto' to prevent scrolling
        maxWidth: 'calc(100% - 300px)',
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        flexDirection: 'column'
      }}>
        {/* Header */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '25px',
          flexShrink: 0 // Prevents header from shrinking
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            ':hover': {
              background: 'rgba(3, 79, 175, 0.1)'
            }
          }}>
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
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              onClick={() => window.history.back()}
            />
          </div>
          <h1 style={{ 
            margin: 0, 
            fontSize: "28px", 
            fontWeight: "900", 
            color: '#034FAF',
            letterSpacing: '0.5px'
          }}>CONVERSATION</h1>
        </div>

        {/* Title Header */}
        <div style={{
          background: 'white',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          marginBottom: '25px',
          border: '1px solid rgba(3, 79, 175, 0.1)',
          flexShrink: 0 // Prevents title section from shrinking
        }}>
          <h2 style={{ 
            margin: 0, 
            fontSize: '24px', 
            fontWeight: '800',
            color: '#2c3e50',
            marginBottom: '12px'
          }}>Online Kamustahan</h2>
          
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={dateIcon} alt="Date" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                <span style={{ 
                  fontSize: '15px', 
                  fontWeight: '600',
                  color: '#566573'
                }}>07/26/2024</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img src={timeIcon} alt="Time" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                <span style={{ 
                  fontSize: '15px', 
                  fontWeight: '600',
                  color: '#566573'
                }}>10:31PM</span>
              </div>
            </div>

            <div style={{ 
              display: 'flex', 
              alignItems: 'center',
              background: 'rgba(3, 79, 175, 0.05)',
              padding: '8px 15px',
              borderRadius: '10px'
            }}>
              <span style={{ 
                fontSize: '14px', 
                fontWeight: '600', 
                marginRight: '12px',
                color: '#034FAF'
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
                  transition: 'background-color 0.3s ease'
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
          ref={transcriptRef}  // Add the ref here
          style={{
            background: 'white',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            overflowY: 'auto',
            flex: 1,
            border: '1px solid rgba(3, 79, 175, 0.1)',
            marginBottom: '0',
            scrollBehavior: 'smooth'  // Add smooth scrolling
          }}
          className="transcript-section"  // Add class for styling
        >
          {/* Map through transcript data */}
          {transcriptData.map((entry, index) => (
            <div 
              key={index}
              style={{ 
                marginBottom: '25px',
                padding: '15px',
                borderRadius: '12px',
                background: index % 2 === 0 ? 'rgba(3, 79, 175, 0.03)' : 'white',
                border: '1px solid rgba(3, 79, 175, 0.05)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '15px' }}>
                <div style={{
                  borderRadius: "50%",
                  padding: "8px",
                  background: 'rgba(3, 79, 175, 0.05)'
                }}>
                  <img
                    src={speaker}
                    alt="Speaker Icon"
                    style={{ width: "24px", height: "24px" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '8px',
                  }}>
                    <span style={{ 
                      fontSize: "15px", 
                      fontWeight: "700", 
                      color: "#034FAF"
                    }}>
                      {entry.speaker}
                    </span>
                  </div>
                  <p style={{ 
                    fontSize: "15px", 
                    lineHeight: '1.6',
                    color: "#37474F",
                    margin: 0
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

          .transcript-section::-webkit-scrollbar {
            width: 6px;
          }

          .transcript-section::-webkit-scrollbar-track {
            background: #f1f1f1;
          }

          .transcript-section::-webkit-scrollbar-thumb {
            background: #888;
            border-radius: 3px;
          }

          .transcript-section::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        `}
      </style>
    </div>
  );
};

export default Conversation;
