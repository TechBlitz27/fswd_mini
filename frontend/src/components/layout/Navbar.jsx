import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Home, Info, Mail, LayoutDashboard } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{
      height: 'var(--nav-height)',
      background: 'var(--bg-anchor)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      alignItems: 'center'
    }}>
      <div className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          color: 'var(--text-on-dark)',
          fontSize: '1.3rem',
          fontWeight: 800
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '8px'
          }}>
             <img src="https://smratnani.com/images/ca_india.jpg" alt="Logo" style={{ width: '100%', borderRadius: '4px' }} />
          </div>
          <span>S.M Ratnani & Co</span>
        </Link>

        <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <Link to="/" style={{ color: '#bfdbfe', fontWeight: 600 }}>Home</Link>
          <Link to="/about" style={{ color: '#bfdbfe', fontWeight: 600 }}>About</Link>
          <Link to="/contact" style={{ color: '#bfdbfe', fontWeight: 600 }}>Contact</Link>
          
          {user ? (
            <>
              <Link to="/dashboard" style={{
                color: '#fff',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <LayoutDashboard size={18} /> Dashboard
              </Link>
              <button onClick={handleLogout} className="btn btn-outline" style={{
                padding: '8px 16px',
                fontSize: '0.9rem',
                borderColor: '#ef4444',
                color: '#ef4444'
              }}>
                <LogOut size={16} />
              </button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary" style={{ padding: '8px 24px' }}>Login</Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
