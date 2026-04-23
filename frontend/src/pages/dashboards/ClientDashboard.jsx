import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { CheckCircle2, Clock, XCircle, FileText, Download, MessageSquare } from 'lucide-react';
import api from '../../services/api';

const ClientDashboard = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && user.id) {
      fetchMyStatus();
    }
  }, [user]);

  const fetchMyStatus = async () => {
    try {
      const res = await api.get(`/compliance/client/${user.id}`);
      setEntries(res.data.entries || []);
    } catch (err) { 
      console.error('Error fetching status:', err); 
    }
    setLoading(false);
  };

  const getStatusInfo = (status) => {
    switch (status) {
      case 'Completed':
      case 'Filed':
        return { icon: <CheckCircle2 color="#10b981" />, label: status, bg: '#dcfce7' };
      case 'In Progress':
        return { icon: <Clock color="#f59e0b" />, label: 'In Progress', bg: '#fef3c7' };
      default:
        return { icon: <XCircle color="#ef4444" />, label: status || 'Not Started', bg: '#fee2e2' };
    }
  };

  return (
    <div className="fade-in" style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '40px' }}>
          <h1 className="gradient-text">Welcome, {user?.name || 'Client'}</h1>
          <p style={{ color: 'var(--text-muted)' }}>Track your compliance status and work progress.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
          {/* Work Progress Tracker */}
          <div className="glass-card" style={{ gridColumn: 'span 2', padding: '32px' }}>
            <h3 style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <FileText size={20} /> My Work Status
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {loading ? (
                <p>Loading your records...</p>
              ) : entries.length > 0 ? entries.map(entry => {
                const info = getStatusInfo(entry.status);
                return (
                  <div key={entry._id} style={{
                    padding: '24px',
                    borderRadius: '16px',
                    background: 'rgba(255,255,255,0.4)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                      <div style={{ padding: '12px', background: info.bg, borderRadius: '12px' }}>{info.icon}</div>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.2rem' }}>{entry.serviceType} - {entry.financialYear}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Due: {entry.dueDate ? new Date(entry.dueDate).toLocaleDateString() : 'N/A'}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <span style={{ 
                        padding: '6px 16px', 
                        borderRadius: '50px', 
                        fontSize: '0.9rem', 
                        fontWeight: 700, 
                        background: info.bg, 
                        color: 'var(--text-on-light)' 
                      }}>{info.label}</span>
                    </div>
                  </div>
                );
              }) : (
                <div style={{ textAlign: 'center', padding: '40px', background: 'rgba(255,255,255,0.2)', borderRadius: '12px' }}>
                  <p>No active compliance projects found.</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Actions / Sidebar Info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div className="glass-card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '16px' }}>Quick Actions</h4>
              <div style={{ display: 'grid', gap: '10px' }}>
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <Download size={18} /> Download Tax Report
                </button>
                <button className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                  <MessageSquare size={18} /> Message CA
                </button>
              </div>
            </div>

            <div style={{ padding: '24px', background: 'var(--bg-anchor)', borderRadius: 'var(--radius-std)', color: '#fff' }}>
              <h4 style={{ marginBottom: '12px', color: '#60a5fa' }}>Need Help?</h4>
              <p style={{ fontSize: '0.9rem', opacity: 0.8 }}>Contact our support team for any queries regarding your compliance filings.</p>
              <button style={{ marginTop: '16px', background: '#fff', color: 'var(--bg-anchor)', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}>
                Chat Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDashboard;
