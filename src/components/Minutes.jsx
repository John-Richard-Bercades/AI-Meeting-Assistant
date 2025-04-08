import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import BackIcon from '../assets/back.png';
// Add docx library import
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';

const Minutes = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const minuteData = {
    dateTime: "July 26, 2024, 10:00 AM",
    attendees: ["John Doe", "Jane Smith", "Mike Johnson", "Emily Davis"],
    actionItems: [
      "Follow up with the client regarding the project requirements.",
      "Prepare a draft of the project plan.",
      "Schedule the next team meeting.",
    ],
    agenda: "Discuss the new project proposal, review the client's feedback, and assign tasks to team members."
  };

  const generateDocx = async () => {
    // Create a new document
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: [
            new Paragraph({
              text: "Minutes of the Meeting",
              heading: HeadingLevel.HEADING_1,
            }),
            new Paragraph({
              text: `Date and Time: ${minuteData.dateTime}`,
            }),
            new Paragraph({
              text: "Attendees:",
            }),
            ...minuteData.attendees.map(
              (attendee) =>
                new Paragraph({
                  text: `- ${attendee}`,
                })
            ),
            new Paragraph({
              text: "Agenda:",
            }),
            new Paragraph({
              text: minuteData.agenda,
            }),
            new Paragraph({
              text: "Action Items:",
            }),
            ...minuteData.actionItems.map(
              (item) =>
                new Paragraph({
                  text: `- ${item}`,
                })
            ),
          ],
        },
      ],
    });

    // Generate the document as a blob
    const blob = await Packer.toBlob(doc);

    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = url;
    link.download = "minutes.docx";
    document.body.appendChild(link);
    link.click();

    // Clean up
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
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

      {/* Main Content */}
      <div style={{
        flex: 1,
        padding: '30px',
        height: '100vh',
        overflow: 'auto',
        position: 'relative',
        zIndex: 2,
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px',
          gap: '20px',
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
            justifyContent: 'center',
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
          onClick={handleBackClick}
          >
            <img
              src={BackIcon}
              alt="back"
              style={{
                width: '28px',
                height: '28px',
                transition: 'transform 0.3s ease',
                cursor: 'pointer',
              }}
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
          }}>MINUTES OF THE MEETING</h1>
        </div>

        {/* Content Section */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.15)',
          padding: '30px',
          borderRadius: '15px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.25)',
          marginBottom: '30px',
        }}>
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#034FAF',
              marginBottom: '15px',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              cursor: 'default',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
            }}>Date and Time</h2>
            <p style={{
              fontSize: '16px',
              color: '#333',
              margin: '0',
              padding: '12px 15px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '8px',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              cursor: 'default',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.7)',
            }}>{minuteData.dateTime}</p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#034FAF',
              marginBottom: '15px',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              cursor: 'default',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
            }}>Attendees</h2>
            <ul style={{
              paddingLeft: '20px',
              margin: '0',
              background: 'rgba(255, 255, 255, 0.5)',
              padding: '12px 15px 12px 35px',
              borderRadius: '8px',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}>
              {minuteData.attendees.map((attendee, index) => (
                <li key={index} style={{
                  fontSize: '16px',
                  color: '#333',
                  marginBottom: '8px',
                  lineHeight: '1.6',
                  cursor: 'default',
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.7)',
                }}>{attendee}</li>
              ))}
            </ul>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#034FAF',
              marginBottom: '15px',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              cursor: 'default',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
            }}>Agenda</h2>
            <p style={{
              fontSize: '16px',
              color: '#333',
              margin: '0',
              padding: '12px 15px',
              background: 'rgba(255, 255, 255, 0.5)',
              borderRadius: '8px',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              lineHeight: '1.6',
              cursor: 'default',
              textShadow: '0 1px 2px rgba(255, 255, 255, 0.7)',
            }}>{minuteData.agenda}</p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#034FAF',
              marginBottom: '15px',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0.5px',
              cursor: 'default',
              textShadow: '0 1px 3px rgba(255, 255, 255, 0.7)',
            }}>Action Items</h2>
            <ul style={{
              paddingLeft: '20px',
              margin: '0',
              background: 'rgba(255, 255, 255, 0.5)',
              padding: '12px 15px 12px 35px',
              borderRadius: '8px',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              border: '1px solid rgba(255, 255, 255, 0.3)',
            }}>
              {minuteData.actionItems.map((item, index) => (
                <li key={index} style={{
                  fontSize: '16px',
                  color: '#333',
                  marginBottom: '8px',
                  lineHeight: '1.6',
                  cursor: 'default',
                  textShadow: '0 1px 2px rgba(255, 255, 255, 0.7)',
                }}>{item}</li>
              ))}
            </ul>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginTop: '20px',
          }}>
            <button
              onClick={generateDocx}
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(45deg, #034FAF, #57D7E2)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '16px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'linear-gradient(45deg, #0347A0, #4BC0CB)';
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 6px 8px rgba(0, 0, 0, 0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'linear-gradient(45deg, #034FAF, #57D7E2)';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
              }}
            >
              Download as DOCX
            </button>
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
            }

            /* Default cursor for text elements */
            h1, h2, h3, h4, h5, h6, p, span, div, section, label, th {
              cursor: default !important;
            }

            /* Ensure buttons and interactive elements have pointer cursor */
            button, a, .clickable, [role="button"], input[type="file"], input[type="submit"] {
              cursor: pointer !important;
            }

            /* Make table rows with pointer cursor */
            tr[onClick] {
              cursor: pointer !important;
            }
          `}
        </style>
      </div>
    </div>
  );
};

export default Minutes;
