import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import backIcon from '../assets/back.png';

const ConversationList = () => {
    const navigate = useNavigate();

    const meetingMinutes = [
        { id: 1, title: "Meeting 1", createdAt: "2024-03-20 10:30 AM", updatedAt: "2024-03-20 11:30 AM" },
        { id: 2, title: "Meeting 2", createdAt: "2024-03-19 02:15 PM", updatedAt: "2024-03-19 03:45 PM" },
        { id: 3, title: "Meeting 3", createdAt: "2024-03-18 09:00 AM", updatedAt: "2024-03-18 10:00 AM" },
        { id: 4, title: "Meeting 4", createdAt: "2024-03-17 03:30 PM", updatedAt: "2024-03-17 04:30 PM" },
        { id: 5, title: "Meeting 5", createdAt: "2024-03-16 11:45 AM", updatedAt: "2024-03-16 12:45 PM" },
        { id: 6, title: "Meeting 6", createdAt: "2024-03-15 01:00 PM", updatedAt: "2024-03-15 02:00 PM" }
    ];

    const handleRowClick = (id) => {
        navigate(`/transcription/${id}`);
    };

    const handleEdit = (e, id) => {
        e.stopPropagation();
        navigate(`/transcription/${id}`);
    };

    const handleDownload = (e, title) => {
        e.stopPropagation();
        console.log(`Downloading transcript for ${title}`);
    };

    const handleDelete = (e, title) => {
        e.stopPropagation();
        // Add confirmation before deletion
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            console.log(`Deleting ${title}`);
            // Add actual delete logic here
        }
    };

    const ActionButton = ({ onClick, color = '#034FAF', children }) => (
        <button
            onClick={onClick}
            style={{
                padding: '8px 16px',
                background: color,
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                marginLeft: '10px',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 4px rgba(3, 79, 175, 0.1)'
            }}
            onMouseEnter={(e) => {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = '0 4px 12px rgba(3, 79, 175, 0.1)';
                e.target.style.background = color === '#034FAF' ? '#0241a8' : '#2c5282';
            }}
            onMouseLeave={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 4px rgba(3, 79, 175, 0.1)';
                e.target.style.background = color;
            }}
        >
            {children}
        </button>
    );

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

            <div style={{ 
                marginLeft: '320px',
                flex: 1, 
                padding: '30px 40px',
                height: '100vh',
                overflow: 'hidden',
                maxWidth: 'calc(100% - 300px)',
                position: 'relative',
                zIndex: 2,
            }}>
                <div className="content-card">
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
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        onClick={() => window.history.back()}
                        >
                            <img
                                src={backIcon}
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
                        }}>TRANSCRIPTIONS</h1>
                    </div>

                    {/* Table Container */}
                    <div style={{
                        background: 'white',
                        borderRadius: '15px',
                        padding: '30px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)'
                    }}>
                        <table style={{ 
                            width: '100%', 
                            borderCollapse: 'separate',
                            borderSpacing: '0 12px'
                        }}>
                            <thead>
                                <tr>
                                    <th style={{...tableHeaderStyle, width: '30%'}}>TITLE</th>
                                    <th style={{...tableHeaderStyle, width: '25%'}}>CREATED AT</th>
                                    <th style={{...tableHeaderStyle, width: '25%'}}>UPDATED AT</th>
                                    <th style={{...tableHeaderStyle, width: '10%', textAlign: 'center'}}>EDIT</th>
                                    <th style={{...tableHeaderStyle, width: '10%', textAlign: 'center'}}>DELETE</th>
                                </tr>
                            </thead>
                            <tbody>
                                {meetingMinutes.map((meeting) => (
                                    <tr 
                                        key={meeting.id} 
                                        onClick={() => handleRowClick(meeting.id)}
                                        style={{
                                            cursor: 'pointer',
                                            transition: 'all 0.3s ease',
                                            background: 'white',
                                            boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                                            borderRadius: '8px',
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.transform = 'translateY(-2px)';
                                            e.currentTarget.style.boxShadow = '0 4px 12px rgba(3, 79, 175, 0.1)';
                                            e.currentTarget.style.background = 'rgba(3, 79, 175, 0.02)';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
                                            e.currentTarget.style.background = 'white';
                                        }}
                                    >
                                        <td style={{...tableDataStyle, fontWeight: '600'}}>{meeting.title}</td>
                                        <td style={tableDataStyle}>{meeting.createdAt}</td>
                                        <td style={tableDataStyle}>{meeting.updatedAt}</td>
                                        <td style={{...tableDataStyle, textAlign: 'center'}}>
                                            <ActionButton 
                                                onClick={(e) => handleEdit(e, meeting.id)}
                                                color="#034FAF"
                                            >
                                                Edit
                                            </ActionButton>
                                        </td>
                                        <td style={{...tableDataStyle, textAlign: 'center'}}>
                                            <ActionButton 
                                                onClick={(e) => handleDelete(e, meeting.title)}
                                                color="#DC2626"
                                            >
                                                Delete
                                            </ActionButton>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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

const tableHeaderStyle = {
    textAlign: 'left',
    padding: '15px 20px',
    color: '#566573',
    fontWeight: '600',
    fontSize: '14px',
    letterSpacing: '0.5px',
    borderBottom: '2px solid #f1f1f1'
};

const tableDataStyle = {
    padding: '15px 20px',
    color: '#2c3e50',
    fontSize: '14px',
    fontWeight: '500',
    whiteSpace: 'nowrap',
    borderBottom: '1px solid rgba(241, 241, 241, 0.5)'
};

export default ConversationList;
