import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';

const FacultyAttendance = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [newFacultyName, setNewFacultyName] = useState('');
  const [facultyList, setFacultyList] = useState([
    { id: 1, name: 'Mia V. Villarica', role: 'Dean', status: 'present' },
    { id: 2, name: 'Edward Flores', role: 'Faculty', status: 'present' },
    { id: 3, name: 'Gener Mosico', role: 'Faculty', status: 'present' },
    { id: 4, name: 'Harlene Gabrille Origines', role: 'Faculty', status: 'present' },
    { id: 5, name: 'John Randolf Penaredondo', role: 'Faculty', status: 'present' },
    { id: 6, name: 'Joy Mell J', role: 'Faculty', status: 'present' },
    { id: 7, name: 'Maria Laureen Miranda', role: 'Faculty', status: 'present' },
    { id: 8, name: 'Mark P. Bernardino', role: 'Faculty', status: 'present' },
    { id: 9, name: 'Paul Allan Lustre', role: 'Faculty', status: 'present' },
    { id: 10, name: 'Rachiel R. Rivano', role: 'Faculty', status: 'present' },
    { id: 11, name: 'Reymart Joseph Pielago', role: 'Faculty', status: 'present' },
    { id: 12, name: 'Reynalen C. Justo', role: 'Faculty', status: 'present' },
    { id: 13, name: 'Rhonn John Viel L. Aligarbes', role: 'Faculty', status: 'present' },
    { id: 14, name: 'Romel P. Serrano', role: 'Faculty', status: 'present' },
  ]);

  const handleStatusChange = (id, newStatus) => {
    setFacultyList(prevList =>
      prevList.map(faculty =>
        faculty.id === id 
          ? { ...faculty, status: newStatus }
          : faculty
      )
    );
  };

  const handleAddFaculty = () => {
    if (newFacultyName.trim()) {
      const newId = facultyList.length > 0 
        ? Math.max(...facultyList.map(f => f.id)) + 1 
        : 1;
        
      setFacultyList(prevList => [
        ...prevList,
        {
          id: newId,
          name: newFacultyName.trim(),
          role: 'Faculty',
          status: 'present'
        }
      ]);
      setNewFacultyName('');
    }
  };

  const handleRemoveFaculty = (id) => {
    if (window.confirm('Are you sure you want to remove this faculty member?')) {
      setFacultyList(facultyList.filter(faculty => faculty.id !== id));
    }
  };

  const ActionButton = ({ onClick, color, children }) => (
    <button
      onClick={onClick}
      style={{
        padding: '6px 12px',
        background: 'white',
        color: color,
        border: `1px solid ${color}`,
        borderRadius: '20px',
        fontWeight: '600',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        marginRight: '5px',
      }}
      onMouseOver={(e) => {
        e.target.style.background = color;
        e.target.style.color = 'white';
      }}
      onMouseOut={(e) => {
        e.target.style.background = 'white';
        e.target.style.color = color;
      }}
    >
      {children}
    </button>
  );

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh',
      fontFamily: "'Montserrat', sans-serif",
      position: 'relative',
      overflow: 'hidden',
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
        padding: '30px',
        position: 'relative',
        zIndex: 2,
        height: '100vh',
        overflowY: 'auto',
        msOverflowStyle: 'none',
        scrollbarWidth: 'none',
      }}>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.95)',
          padding: '25px',
          borderRadius: '15px',
          boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(3, 79, 175, 0.1)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            position: 'sticky',
            top: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            zIndex: 3,
            padding: '10px 0',
          }}>
            <h1 style={{ 
              color: '#034FAF',
              margin: 0,
            }}>
              FACULTY AND STAFF ATTENDANCE
            </h1>
            <button
              onClick={() => setIsEditing(!isEditing)}
              style={{
                padding: '10px 20px',
                background: isEditing ? '#DC2626' : '#034FAF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '14px',
              }}
            >
              {isEditing ? 'Done Editing' : 'Edit List'}
            </button>
          </div>

          {isEditing && (
            <div style={{
              marginBottom: '20px',
              display: 'flex',
              gap: '10px',
            }}>
              <input
                type="text"
                value={newFacultyName}
                onChange={(e) => setNewFacultyName(e.target.value)}
                placeholder="Enter faculty name"
                style={{
                  padding: '10px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  flex: 1,
                }}
              />
              <button
                onClick={handleAddFaculty}
                style={{
                  padding: '10px 20px',
                  background: '#166534',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                }}
              >
                Add Faculty
              </button>
            </div>
          )}

          <div style={{
            maxHeight: 'calc(100vh - 250px)',
            overflowY: 'auto',
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}>
            <table style={{
              width: '100%',
              borderCollapse: 'collapse',
              marginBottom: '20px',
            }}>
              <thead style={{
                position: 'sticky',
                top: 0,
                background: '#034FAF',
                zIndex: 2,
              }}>
                <tr style={{
                  background: '#034FAF',
                  color: 'white',
                }}>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                  <th style={{ padding: '15px', textAlign: 'left' }}>Role</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>Status</th>
                  <th style={{ padding: '15px', textAlign: 'center' }}>Action</th>
                  {isEditing && <th style={{ padding: '15px', textAlign: 'center' }}>Remove</th>}
                </tr>
              </thead>
              <tbody>
                {facultyList.map((faculty) => (
                  <tr key={faculty.id} style={{
                    borderBottom: '1px solid #eee',
                  }}>
                    <td style={{ padding: '15px' }}>{faculty.name}</td>
                    <td style={{ padding: '15px' }}>{faculty.role}</td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <span style={{
                        padding: '6px 12px',
                        borderRadius: '20px',
                        background: faculty.status === 'present' ? '#dcfce7' : '#fee2e2',
                        color: faculty.status === 'present' ? '#166534' : '#991b1b',
                        fontSize: '14px',
                      }}>
                        {faculty.status.charAt(0).toUpperCase() + faculty.status.slice(1)}
                      </span>
                    </td>
                    <td style={{ padding: '15px', textAlign: 'center' }}>
                      <ActionButton
                        onClick={() => handleStatusChange(faculty.id, 'present')}
                        color="#166534"
                      >
                        Present
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleStatusChange(faculty.id, 'absent')}
                        color="#991b1b"
                      >
                        Absent
                      </ActionButton>
                    </td>
                    {isEditing && (
                      <td style={{ padding: '15px', textAlign: 'center' }}>
                        <button
                          onClick={() => handleRemoveFaculty(faculty.id)}
                          style={{
                            padding: '6px 12px',
                            background: '#DC2626',
                            color: 'white',
                            border: 'none',
                            borderRadius: '20px',
                            cursor: 'pointer',
                            fontSize: '14px',
                          }}
                        >
                          Remove
                        </button>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '30px',
            position: 'sticky',
            bottom: 0,
            background: 'rgba(255, 255, 255, 0.95)',
            padding: '15px 0',
            zIndex: 3,
          }}>
            <button
              onClick={() => navigate('/record-saved')}
              style={{
                padding: '15px 40px',
                background: '#034FAF',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px',
              }}
            >
              Continue
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

export default FacultyAttendance;
