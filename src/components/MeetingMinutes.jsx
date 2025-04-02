import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import BackIcon from '../assets/back.png';
// Add docx library import
import { Document, Packer, Paragraph, HeadingLevel } from 'docx';

const MeetingMinutes = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const meetingData = {
    dateTime: "July 26, 2024, 10:00 AM",
    attendees: ["John Doe", "Jane Smith", "Mike Johnson", "Emily Davis"],
    actionItems: [
      "Follow up with the client regarding the project requirements.",
      "Prepare a draft of the project plan.",
      "Schedule the next team meeting.",
      
    ],
    agenda: "Discuss the new project proposal, review the client's feedback, and assign tasks to team members."
  };

  const generateWordDoc = async () => {
    const doc = new Document({
      sections: [{
        properties: {},
        children: [
          new Paragraph({
            text: "CCS FACULTY MEETING",
            heading: HeadingLevel.HEADING_1
          }),
          new Paragraph({
            text: `Date/Time: ${meetingData.dateTime}`
          }),
          new Paragraph({
            text: "FACULTY AND STAFF PRESENT",
            heading: HeadingLevel.HEADING_2
          }),
          new Paragraph({
            text: meetingData.attendees.join(", ")
          }),
          new Paragraph({
            text: "AGENDA & DISCUSSION",
            heading: HeadingLevel.HEADING_2
          }),
          new Paragraph({
            text: meetingData.agenda
          }),
          new Paragraph({
            text: "ACTION ITEMS",
            heading: HeadingLevel.HEADING_2
          }),
          ...meetingData.actionItems.map(item => 
            new Paragraph({
              text: `• ${item}`
            })
          )
        ]
      }]
    });

    const blob = await Packer.toBlob(doc);
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'meeting-minutes.docx';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ 
      display: 'flex', 
      minHeight: '100vh', 
      fontFamily: "'Montserrat', sans-serif",
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

      {/* Main content */}
      <div style={{ 
        marginLeft: '325px',
        display: 'flex', 
        flexDirection: 'column', 
        flex: 1, 
        padding: '30px 40px',
        maxWidth: 'calc(100% - 280px)',
        boxSizing: 'border-box',
        height: '100vh',
        overflowY: 'auto',
        position: 'relative',
        zIndex: 2,
        msOverflowStyle: 'none',
        scrollbarWidth: 'none'
      }}>
        {/* Header Section */}
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '25px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
            borderRadius: '50%',
            cursor: 'pointer',
            transition: 'all 0.3s ease'
          }}>
            <img
              src={BackIcon}
              alt="Back"
              style={{
                width: '24px',
                height: '24px',
                marginRight: '15px',
                cursor: 'pointer',
                transition: 'transform 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
              onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
              onClick={handleBackClick}
            />
          </div>
          <h1 style={{ 
            margin: 0, 
            fontSize: "28px", 
            fontWeight: "900", 
            color: '#034FAF',
            letterSpacing: '0.5px'
          }}>
            MEETING MINUTES
          </h1>
        </div>

        {/* Meeting Minutes Form */}
        <div style={{ 
          backgroundColor: 'white', 
          padding: '30px', 
          borderRadius: '15px', 
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          border: '1px solid rgba(3, 79, 175, 0.1)'
        }}>
            {/* Date/Time Container */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              {/* Left Date/Time */}
              <div style={{ width: '45%' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>CCS FACULTY MEETING:</label>
                <div style={{
                  backgroundColor: '#e0e0e0',
                  padding: '15px',
                  borderRadius: '5px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}>
                  {meetingData.ccsFacultyMeeting}
                </div>
              </div>

              {/* Right Date/Time */}
              <div style={{ width: '45%' }}>
                <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>DATE/TIME:</label>
                <div style={{
                  backgroundColor: '#e0e0e0',
                  padding: '15px',
                  borderRadius: '5px',
                  fontSize: '14px',
                  boxSizing: 'border-box'
                }}>
                  {meetingData.rightDateTime}
                </div>
              </div>
            </div>

          {/* Attendees Section */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>FACULTY AND STAFF PRESENT</label>
            <div style={{
              backgroundColor: '#e0e0e0',
              padding: '15px',
              borderRadius: '5px',
              width: '100%',
              overflowY: 'auto',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}>
              <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
                {meetingData.attendees.map((attendee, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    {attendee}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Agenda Section */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>AGENDA & DISCUSION</label>
            <div style={{
              backgroundColor: '#e0e0e0',
              padding: '15px',
              borderRadius: '5px',
              width: '100%',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}>
              {meetingData.agenda}
            </div>
          </div>

          {/* Minutes Section */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '5px', fontSize: '14px' }}>ACTION ITEMS</label>
            <div style={{
              backgroundColor: '#e0e0e0',
              padding: '15px',
              borderRadius: '5px',
              width: '100%',
              overflowY: 'auto',
              fontSize: '14px',
              boxSizing: 'border-box'
            }}>
              <ul style={{ margin: 0, padding: 0, listStyleType: 'none' }}>
                {meetingData.actionItems.map((item, index) => (
                  <li key={index} style={{ marginBottom: '5px' }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add Download Button */}
          <div style={{ marginTop: '20px', textAlign: 'right' }}>
            <button
              onClick={generateWordDoc}
              style={{
                padding: '12px 24px',
                backgroundColor: '#034FAF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.opacity = '0.9';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.opacity = '1';
              }}
            >
              Download as Word
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
        `}
      </style>
    </div>
  );
};

export default MeetingMinutes;
