import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../assets/user.png';
import bigLogo from '../assets/logo.png';
import homeIcon from '../assets/home.png';
import conversationIcon from '../assets/conversation.png';
import minutesIcon from '../assets/meeting_minutes.png';
import signOutIcon from '../assets/sign_out.png';
import settingsIcon from '../assets/settings.png';
import { getUsername } from '../services/authService';
import '../styles/SidebarStyles.css';

const Sidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);
  // Directly compute if we're on the settings page
  const isSettingsPage = location.pathname === '/settings';
  const [userData, setUserData] = useState({
    username: '',
    email: ''
  });

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

  useEffect(() => {
    // Get user data from localStorage
    let username = localStorage.getItem('username') || 'User';
    let email = localStorage.getItem('email');

    // Capitalize the first letter of the username for better display
    if (username) {
      username = username.charAt(0).toUpperCase() + username.slice(1);
    }

    // If email is not available, create a default one
    if (!email) {
      const usernameForEmail = localStorage.getItem('username') || 'user';
      email = usernameForEmail.toLowerCase() + '@lspu.edu.ph';
    }

    setUserData({
      username,
      email
    });
  }, []);

  const menuItems = [
    { name: 'Home', path: '/home', icon: homeIcon },
    { name: 'Transcriptions', path: '/transcriptions', icon: conversationIcon },
    { name: 'Minutes of the Meeting', path: '/minutes', icon: minutesIcon }
  ];

  return (
    <div className="sidebar">
      {/* Big Logo Section */}
      <div className="logo-section">
        <img src={bigLogo} alt="Logo" className="big-logo" />
      </div>

      {/* User Avatar and Info */}
      <div className="user-info">
        <img src={Avatar} alt="User Avatar" className="avatar" />
        <div className="user-details">
          <p className="user-name">{userData.username}</p>
          <p className="user-email">{userData.email}</p>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="nav-menu">
        <ul>
          {menuItems.map(item => (
            <li key={item.name}>
              <Link
                to={item.path}
                className={`menu-item ${activeMenu === item.path ? 'active' : ''}`}
                onClick={() => setActiveMenu(item.path)}
              >
                <img
                  src={item.icon}
                  alt={item.name}
                  className="menu-icon"
                  style={{
                    filter: activeMenu === item.path ? 'brightness(0) invert(1)' : 'none'
                  }}
                />
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer Section */}
      <div className="sidebar-footer">
        <Link
          to="/settings"
          className={`footer-item ${isSettingsPage ? 'active' : ''}`}
        >
          <img
            src={settingsIcon}
            alt="Settings"
            className="menu-icon"
            style={{
              filter: isSettingsPage ? 'brightness(0) invert(1)' : 'none'
            }}
          />
          Settings
        </Link>
        <Link to="/" className="footer-item">
          <img src={signOutIcon} alt="Sign Out" className="menu-icon" />
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
