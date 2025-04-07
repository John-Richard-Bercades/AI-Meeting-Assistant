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

  const handleDownload = async () => {
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
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: "Attendees:",
              heading: HeadingLevel.HEADING_2,
            }),
            ...minuteData.attendees.map(
              (attendee) =>
                new Paragraph({
                  text: `• ${attendee}`,
                })
            ),
            new Paragraph({
              text: "Agenda:",
              heading: HeadingLevel.HEADING_2,
            }),
            new Paragraph({
              text: minuteData.agenda,
              spacing: {
                after: 200,
              },
            }),
            new Paragraph({
              text: "Action Items:",
              heading: HeadingLevel.HEADING_2,
            }),
            ...minuteData.actionItems.map(
              (item) =>
                new Paragraph({
                  text: `• ${item}`,
                })
            ),
          ],
        },
      ],
    });

    // Save the document
    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'minutes.docx';
    document.body.appendChild(link);
    link.click();
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

      {/* Main Content */}
      <div style={{
        marginLeft: '320px',
        flex: 1,
        padding: '30px 40px',
        height: '100vh',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '30px',
          gap: '20px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '15px',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '50px',
            height: '50px',
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
                width: '32px',
                height: '32px',
                transition: 'transform 0.3s ease'
              }}
            />
          </div>
          <h1 style={{
            margin: 0,
            fontSize: "28px",
            fontWeight: "900",
            color: '#034FAF',
            letterSpacing: '0.5px'
          }}>MINUTES OF THE MEETING</h1>
        </div>

        {/* Content Container */}
        <div style={{
          background: 'white',
          borderRadius: '15px',
          padding: '30px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
        }}>
          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#034FAF',
              marginBottom: '15px',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>Date and Time</h2>
            <p style={{
              fontSize: '16px',
              color: '#2c3e50',
              lineHeight: '1.6'
            }}>{minuteData.dateTime}</p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#034FAF',
              marginBottom: '15px',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>Attendees</h2>
            <ul style={{
              paddingLeft: '20px',
              margin: '0'
            }}>
              {minuteData.attendees.map((attendee, index) => (
                <li key={index} style={{
                  fontSize: '16px',
                  color: '#2c3e50',
                  marginBottom: '8px',
                  lineHeight: '1.6'
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
              letterSpacing: '0.5px'
            }}>Agenda</h2>
            <p style={{
              fontSize: '16px',
              color: '#2c3e50',
              lineHeight: '1.6'
            }}>{minuteData.agenda}</p>
          </div>

          <div style={{ marginBottom: '30px' }}>
            <h2 style={{
              color: '#034FAF',
              marginBottom: '15px',
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0.5px'
            }}>Action Items</h2>
            <ul style={{
              paddingLeft: '20px',
              margin: '0'
            }}>
              {minuteData.actionItems.map((item, index) => (
                <li key={index} style={{
                  fontSize: '16px',
                  color: '#2c3e50',
                  marginBottom: '8px',
                  lineHeight: '1.6'
                }}>{item}</li>
              ))}
            </ul>
          </div>

          <button
            onClick={handleDownload}
            style={{
              backgroundColor: '#034FAF',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '600',
              fontSize: '14px',
              letterSpacing: '0.5px',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(3, 79, 175, 0.1)',
              marginTop: '10px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 12px rgba(3, 79, 175, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 6px rgba(3, 79, 175, 0.1)';
            }}
          >
            Download as Word Document
          </button>
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
        `}
      </style>
    </div>
  );
};

export default Minutes;
