import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Avatar from '../assets/user.png';
import bigLogo from '../assets/logo.png';
import homeIcon from '../assets/home.png';
import conversationIcon from '../assets/conversation.png';
import minutesIcon from '../assets/meeting_minutes.png';
import signOutIcon from '../assets/sign_out.png';
import settingsIcon from '../assets/settings.png';

const Sidebar = () => {
  const location = useLocation();
  const [activeMenu, setActiveMenu] = useState(location.pathname);

  useEffect(() => {
    setActiveMenu(location.pathname);
  }, [location]);

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
          <p className="user-name">User Name</p>
          <p className="user-email">CSB05@lspu.edu.ph</p>
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
        <Link to="/settings" className="footer-item">
          <img src={settingsIcon} alt="Settings" className="menu-icon" />
          Settings
        </Link>
        <Link to="/" className="footer-item">
          <img src={signOutIcon} alt="Sign Out" className="menu-icon" />
          Sign Out
        </Link>
      </div>

      <style>
        {`
          .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            display: flex;
            flex-direction: column;
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            padding: 20px;
            height: 100vh;
            width: 280px;
            box-shadow: 4px 0 30px rgba(0, 0, 0, 0.1);
            border-right: 1px solid rgba(255, 255, 255, 0.3);
            font-family: 'Montserrat', sans-serif;
            z-index: 1000;
          }

          .logo-section {
            text-align: center;
            padding: 20px 0;
            border-bottom: 1px solid rgba(3, 79, 175, 0.1);
          }

          .big-logo {
            width: 120px;
            transition: transform 0.3s ease;
          }

          .big-logo:hover {
            transform: scale(1.05);
          }

          .user-info {
            display: flex;
            align-items: center;
            background: linear-gradient(135deg, rgba(3, 79, 175, 0.1) 0%, rgba(87, 215, 226, 0.1) 100%);
            padding: 15px;
            border-radius: 15px;
            margin: 20px 0;
            border: 1px solid rgba(3, 79, 175, 0.1);
          }

          .avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            border: 2px solid #034FAF;
          }

          .user-details {
            margin-left: 15px;
          }

          .user-name {
            font-weight: 600;
            color: #034FAF;
            margin: 0;
            font-size: 0.9rem;
          }

          .user-email {
            font-size: 0.75rem;
            color: #666;
            margin: 0;
          }

          .nav-menu {
            flex: 0.7;
            overflow: hidden;
          }

          .nav-menu ul {
            list-style-type: none;
            padding: 0;
            margin: 0;
          }

          .menu-item {
            display: flex;
            align-items: center;
            padding: 12px 15px;
            margin: 8px 0;
            border-radius: 10px;
            color: #333;
            text-decoration: none;
            transition: all 0.3s ease;
            font-weight: 500;
          }

          .menu-item:hover {
            background: rgba(3, 79, 175, 0.1);
            color: #034FAF;
            transform: translateX(5px);
          }

          .menu-item.active {
            background: linear-gradient(45deg, #034FAF, #57D7E2);
            color: white;
            box-shadow: 0 4px 15px rgba(3, 79, 175, 0.2);
          }

          .menu-icon {
            width: 24px;
            height: 24px;
            margin-right: 15px;
          }

          .sidebar-footer {
            flex: 0.3;
            border-top: 1px solid rgba(3, 79, 175, 0.1);
            padding-top: 20px;
            margin-top: auto;
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
          }

          .footer-item {
            display: flex;
            align-items: center;
            padding: 12px 15px;
            color: #666;
            text-decoration: none;
            transition: all 0.3s ease;
            border-radius: 10px;
            margin: 5px 0;
          }

          .footer-item:hover {
            background: rgba(3, 79, 175, 0.1);
            color: #034FAF;
          }
        `}
      </style>
    </div>
  );
};

export default Sidebar;
