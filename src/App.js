import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

// Authentication Components
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import SplashScreen from "./components/SplashScreen";
import Home from "./components/Home";
import Sidebar from "./components/Sidebar";

// Recording Flow Components
import UploadRecorded from "./components/UploadRecorded";
import FacultyAttendance from "./components/FacultyAttendance";
import RecordSaved from "./components/RecordSaved";

// Conversation Components
import ConversationList from "./components/ConversationList";
import Conversation from "./components/Conversation";

// Minutes Components
import MinutesList from "./components/MinutesList";
import Minutes from "./components/Minutes";

// Add Platform Context
const PlatformContext = React.createContext();

const styles = {
  pageContainer: {
    width: '100vw',
    height: '100vh',
    margin: 0,
    padding: 0,
    overflow: 'hidden',
    background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
  }
};

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PageLayout = ({ children }) => (
  <div style={styles.pageContainer}>
    {children}
  </div>
);

const App = () => {
  // Detect platform
  const [platform] = React.useState(() => {
    if (window?.electronAPI?.isElectron) {
      return 'electron';
    }
    return 'web';
  });

  return (
    <PlatformContext.Provider value={platform}>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<SplashScreen />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected Routes */}
          <Route path="/home" element={
            <ProtectedRoute>
              <PageLayout>
                <Home />
              </PageLayout>
            </ProtectedRoute>
          } />

          {/* Recording Flow Routes */}
          <Route path="/upload-recorded" element={
            <ProtectedRoute>
              <PageLayout>
                <UploadRecorded />
              </PageLayout>
            </ProtectedRoute>
          } />

          <Route path="/faculty-attendance" element={
            <ProtectedRoute>
              <PageLayout>
                <FacultyAttendance />
              </PageLayout>
            </ProtectedRoute>
          } />

          <Route path="/record-saved" element={
            <ProtectedRoute>
              <PageLayout>
                <RecordSaved />
              </PageLayout>
            </ProtectedRoute>
          } />

          {/* Transcription Routes */}
          <Route path="/transcriptions" element={
            <ProtectedRoute>
              <PageLayout>
                <ConversationList />
              </PageLayout>
            </ProtectedRoute>
          } />

          <Route path="/transcription/:id" element={
            <ProtectedRoute>
              <PageLayout>
                <Conversation />
              </PageLayout>
            </ProtectedRoute>
          } />

          {/* Minutes Routes */}
          <Route path="/minutes" element={
            <ProtectedRoute>
              <PageLayout>
                <MinutesList />
              </PageLayout>
            </ProtectedRoute>
          } />

          <Route path="/minutes/:id" element={
            <ProtectedRoute>
              <PageLayout>
                <Minutes />
              </PageLayout>
            </ProtectedRoute>
          } />

          {/* Catch-all Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </PlatformContext.Provider>
  );
};

// Export both the component and the context
export { PlatformContext };
export default App;
