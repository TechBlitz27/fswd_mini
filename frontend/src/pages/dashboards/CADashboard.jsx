import React, { useState, useEffect } from 'react';
import { Search, Filter, Edit3, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import api from '../../services/api';

const CADashboard = () => {
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(null);
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const res = await api.get('/clients');
      setClients(res.data.clients || []);
    } catch (err) { console.error(err); }
  };

  const fetchCompliances = async (clientId) => {
    setLoading(true);
    try {
      const res = await api.get(`/compliance/client/${clientId}`);
      setEntries(res.data.entries || []);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const updateStatus = async (entryId, status) => {
    try {
      await api.patch(`/compliance/${entryId}`, { status });
      fetchCompliances(selectedClient._id);
    } catch (err) { alert('Error updating status'); }
  };

  return (
    <div className="fade-in" style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 className="gradient-text" style={{ marginBottom: '32px' }}>Chartered Accountant Dashboard</h1>

        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '30px' }}>
          {/* Client List */}
          <div className="glass-card" style={{ padding: '24px', height: 'fit-content' }}>
            <h3 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={20} /> My Clients
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {clients.map(c => (
                <div 
                  key={c._id} 
                  onClick={() => { setSelectedClient(c); fetchCompliances(c._id); }}
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    background: selectedClient?._id === c._id ? 'var(--accent-vibrant)' : 'rgba(255,255,255,0.3)',
                    color: selectedClient?._id === c._id ? '#fff' : 'inherit',
                    cursor: 'pointer',
                    transition: '0.2s'
                  }}
                >
                  <div style={{ fontWeight: 700 }}>{c.userId?.name || 'Unnamed Client'}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{c.businessName || c.entityName || 'No Entity Name'}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Compliance Viewer */}
          <div className="glass-card" style={{ padding: '24px' }}>
            {selectedClient ? (
              <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                  <div>
                    <h2>{selectedClient.businessName || selectedClient.entityName}</h2>
                    <p style={{ color: 'var(--text-muted)' }}>PAN: {selectedClient.pan} | GST: {selectedClient.gstNumber || 'N/A'}</p>
                  </div>
                </div>

                <div style={{ display: 'grid', gap: '16px' }}>
                  {entries.length > 0 ? entries.map(entry => (
                    <div key={entry._id} style={{ 
                      padding: '20px', 
                      borderRadius: '12px', 
                      background: 'rgba(255,255,255,0.4)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      border: '1px solid rgba(255,255,255,0.2)'
                    }}>
                      <div>
                        <div style={{ fontWeight: 800, fontSize: '1.1rem' }}>{entry.serviceType} - {entry.financialYear}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Due: {entry.dueDate ? new Date(entry.dueDate).toLocaleDateString() : 'N/A'}</div>
                      </div>
                      
                      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <select 
                          value={entry.status} 
                          onChange={(e) => updateStatus(entry._id, e.target.value)}
                          style={{
                            padding: '8px',
                            borderRadius: '6px',
                            border: '1px solid #60a5fa',
                            background: '#fff',
                            fontSize: '0.9rem'
                          }}
                        >
                          <option value="Not Started">Not Started</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Filed">Filed</option>
                          <option value="Completed">Completed</option>
                          <option value="On Hold">On Hold</option>
                        </select>
                        <div style={{
                          color: entry.status === 'Completed' || entry.status === 'Filed' ? '#10b981' : entry.status === 'In Progress' ? '#f59e0b' : '#ef4444'
                        }}>
                          {entry.status === 'Completed' || entry.status === 'Filed' ? <CheckCircle /> : entry.status === 'In Progress' ? <Clock /> : <AlertCircle />}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div style={{ textAlign: 'center', padding: '40px' }}>
                      <p>No compliance records found for this client.</p>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div style={{ height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', color: 'var(--text-muted)' }}>
                <Edit3 size={48} strokeWidth={1} style={{ marginBottom: '16px' }} />
                <p>Select a client to view and update their status</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CADashboard;
