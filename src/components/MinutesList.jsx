import React from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from './Sidebar';
import backIcon from '../assets/back.png';

const MinutesList = () => {
    const navigate = useNavigate();

    const minutesList = [
        { title: "Minute 1", createdAt: "2024-03-20 10:30 AM", updatedAt: "2024-03-20 11:30 AM" },
        { title: "Minute 2", createdAt: "2024-03-19 02:15 PM", updatedAt: "2024-03-19 03:45 PM" },
        { title: "Minute 3", createdAt: "2024-03-18 09:00 AM", updatedAt: "2024-03-18 10:00 AM" },
        { title: "Minute 4", createdAt: "2024-03-17 03:30 PM", updatedAt: "2024-03-17 04:30 PM" },
        { title: "Minute 5", createdAt: "2024-03-16 11:45 AM", updatedAt: "2024-03-16 12:45 PM" },
        { title: "Minute 6", createdAt: "2024-03-15 01:00 PM", updatedAt: "2024-03-15 02:00 PM" }
    ];

    const handleRowClick = (title) => {
        // Assuming each minute has a unique ID, you can use
        // the title as a temporary ID
        // In a real application, you would use an actual ID from your data
        const minuteId = title.toLowerCase().replace(/\s+/g, '-');
        navigate(`/minutes/${minuteId}`);
    };

    const handleEdit = (e, title) => {
        e.stopPropagation();
        const minuteId = title.toLowerCase().replace(/\s+/g, '-');
        navigate(`/minutes/${minuteId}`);
    };

    const handleDelete = (e, title) => {
        e.stopPropagation();
        if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
            console.log(`Deleting ${title}`);
        }
    };

    const ActionButton = ({ onClick, color = 'linear-gradient(45deg, #034FAF, #0367d4)', children }) => (
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
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px',
            }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 5px rgba(0, 0, 0, 0.1)';
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
                    onClick={() => window.history.back()}
                    >
                        <img
                            src={backIcon}
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

                {/* Table Container */}
                <div style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    borderRadius: '15px',
                    padding: '30px',
                    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.25)',
                    animation: 'fadeIn 0.8s ease-out',
                }}>
                    <table style={{
                        width: '100%',
                        borderCollapse: 'separate',
                        borderSpacing: '0 12px'
                    }}>
                        <thead>
                            <tr>
                                <th style={{...tableHeaderStyle, width: '30%', cursor: 'default'}}>TITLE</th>
                                <th style={{...tableHeaderStyle, width: '25%', cursor: 'default'}}>CREATED AT</th>
                                <th style={{...tableHeaderStyle, width: '25%', cursor: 'default'}}>UPDATED AT</th>
                                <th style={{...tableHeaderStyle, width: '10%', textAlign: 'center', cursor: 'default'}}>EDIT</th>
                                <th style={{...tableHeaderStyle, width: '10%', textAlign: 'center', cursor: 'default'}}>DELETE</th>
                            </tr>
                        </thead>
                        <tbody>
                            {minutesList.map((minute, index) => (
                                <tr
                                    key={index}
                                    onClick={() => handleRowClick(minute.title)}
                                    style={{
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease',
                                        background: 'rgba(255, 255, 255, 0.5)',
                                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.02)',
                                        borderRadius: '8px',
                                        backdropFilter: 'blur(5px)',
                                        WebkitBackdropFilter: 'blur(5px)',
                                        border: '1px solid rgba(255, 255, 255, 0.3)',
                                        animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = 'translateY(-2px)';
                                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(3, 79, 175, 0.1)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.7)';
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = 'translateY(0)';
                                        e.currentTarget.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.02)';
                                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.5)';
                                    }}
                                >
                                    <td style={{...tableDataStyle, fontWeight: '600', color: '#034FAF'}}>{minute.title}</td>
                                    <td style={tableDataStyle}>{minute.createdAt}</td>
                                    <td style={tableDataStyle}>{minute.updatedAt}</td>
                                    <td style={{...tableDataStyle, textAlign: 'center'}}>
                                        <ActionButton
                                            onClick={(e) => handleEdit(e, minute.title)}
                                            color="linear-gradient(45deg, #034FAF, #0367d4)"
                                        >
                                            Edit
                                        </ActionButton>
                                    </td>
                                    <td style={{...tableDataStyle, textAlign: 'center'}}>
                                        <ActionButton
                                            onClick={(e) => handleDelete(e, minute.title)}
                                            color="linear-gradient(45deg, #DC2626, #ef4444)"
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

export default MinutesList;
