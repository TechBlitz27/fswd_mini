import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';       // <-- Added Import
import Contact from './pages/Contact';   // <-- Added Import
import ProtectedRoute from './components/auth/ProtectedRoute';

// Dashboards
import AdminDashboard from './pages/dashboards/AdminDashboard';
import CADashboard from './pages/dashboards/CADashboard';
import ClientDashboard from './pages/dashboards/ClientDashboard';
import StaffDashboard from './pages/dashboards/StaffDashboard';

const DashboardRedirect = () => {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" />;
  
  switch (user.role) {
    case 'admin': return <AdminDashboard />;
    case 'ca': return <CADashboard />;
    case 'client': return <ClientDashboard />;
    case 'staff': return <StaffDashboard />;
    default: return <Navigate to="/" />;
  }
};

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <div className="app-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Navbar />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              
              {/* Replaced inline HTML with the new Components */}
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              
              {/* Protected Dashboard Route */}
              <Route element={<ProtectedRoute />}>
                <Route path="/dashboard" element={<DashboardRedirect />} />
              </Route>
              
              <Route path="/unauthorized" element={<div className="container" style={{ padding: '100px 0' }}><h1>Unauthorized</h1><p>You do not have access to this page.</p></div>} />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <footer style={{ padding: '40px 0', background: 'var(--bg-anchor)', color: '#fff', textAlign: 'center' }}>
            <div className="container">
              <p>© {new Date().getFullYear()} S.M Ratnani & Co — All rights reserved</p>
            </div>
          </footer>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;