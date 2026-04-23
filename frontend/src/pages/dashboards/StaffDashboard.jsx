import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Briefcase, Clock, CheckCircle2, AlertTriangle, MessageSquare, RefreshCw } from 'lucide-react';
import api from '../../services/api';

const StaffDashboard = () => {
  const { user } = useAuth();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);

  useEffect(() => {
    fetchAssignedTasks();
  }, []);

  const fetchAssignedTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/compliance');
      setEntries(res.data.entries || []);
    } catch (error) {
      console.error('Error loading staff tasks:', error);
    }
    setLoading(false);
  };

  const handleStatusChange = async (taskId, status) => {
    setUpdatingId(taskId);
    try {
      await api.patch(`/compliance/${taskId}`, { status });
      await fetchAssignedTasks();
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Unable to update task status.');
    }
    setUpdatingId(null);
  };

  const statusCounts = useMemo(() => {
    const counts = { All: entries.length, 'Not Started': 0, 'In Progress': 0, Filed: 0, Completed: 0, 'On Hold': 0 };
    entries.forEach((entry) => {
      counts[entry.status] = (counts[entry.status] || 0) + 1;
    });
    return counts;
  }, [entries]);

  const overdueCount = entries.filter((entry) => {
    const due = entry.dueDate ? new Date(entry.dueDate) : null;
    return due && due < new Date() && !['Filed', 'Completed'].includes(entry.status);
  }).length;

  const dueSoonCount = entries.filter((entry) => {
    const due = entry.dueDate ? new Date(entry.dueDate) : null;
    const now = new Date();
    const soon = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    return due && due >= now && due <= soon && !['Filed', 'Completed'].includes(entry.status);
  }).length;

  const filteredEntries = selectedStatus === 'All'
    ? entries
    : entries.filter((entry) => entry.status === selectedStatus);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'Completed':
      case 'Filed':
        return { background: '#dcfce7', color: '#166534' };
      case 'In Progress':
        return { background: '#fef9c3', color: '#92400e' };
      case 'On Hold':
        return { background: '#fee2e2', color: '#b91c1c' };
      default:
        return { background: '#e0f2fe', color: '#075985' };
    }
  };

  return (
    <div className="fade-in" style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '30px' }}>
          <h1 className="gradient-text">Staff Dashboard</h1>
          <p style={{ color: 'var(--text-muted)' }}>Manage your assigned compliance tasks and stay on top of upcoming deadlines.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          <StatCard icon={<Briefcase />} label="Assigned Tasks" value={entries.length} />
          <StatCard icon={<Clock />} label="Due Soon" value={dueSoonCount} />
          <StatCard icon={<AlertTriangle />} label="Overdue" value={overdueCount} />
          <StatCard icon={<CheckCircle2 />} label="Completed" value={statusCounts.Completed + statusCounts.Filed} />
        </div>

        <div className="glass-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', gap: '16px', marginBottom: '24px' }}>
            <div>
              <h2 style={{ margin: 0 }}>My Task Pipeline</h2>
              <p style={{ margin: '8px 0 0', color: 'var(--text-muted)' }}>Filter assigned work by status and update progress directly.</p>
            </div>
            <button className="btn btn-outline" onClick={fetchAssignedTasks} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <RefreshCw size={16} /> Refresh
            </button>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '24px' }}>
            {['All', 'Not Started', 'In Progress', 'Filed', 'Completed', 'On Hold'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className="btn btn-outline"
                style={{
                  borderColor: selectedStatus === status ? 'var(--accent-vibrant)' : 'rgba(255,255,255,0.25)',
                  background: selectedStatus === status ? 'rgba(96,165,250,0.15)' : 'transparent',
                  color: 'inherit',
                  minWidth: '120px'
                }}
              >
                {status} ({statusCounts[status] || 0})
              </button>
            ))}
          </div>

          {loading ? (
            <p>Loading assigned tasks…</p>
          ) : filteredEntries.length === 0 ? (
            <div style={{ padding: '40px 0', textAlign: 'center', color: 'var(--text-muted)' }}>
              <p>No tasks found for this status.</p>
            </div>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.12)' }}>
                    <th style={{ padding: '14px 12px' }}>Client</th>
                    <th style={{ padding: '14px 12px' }}>Service</th>
                    <th style={{ padding: '14px 12px' }}>Due Date</th>
                    <th style={{ padding: '14px 12px' }}>Status</th>
                    <th style={{ padding: '14px 12px' }}>Remarks</th>
                    <th style={{ padding: '14px 12px' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEntries.map((entry) => (
                    <tr key={entry._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ fontWeight: 700 }}>{entry.clientId?.userId?.name || 'Client'}</div>
                        <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{entry.clientId?.businessName || entry.clientId?.entityName || 'No business name'}</div>
                      </td>
                      <td style={{ padding: '14px 12px' }}>{entry.serviceType} {entry.quarter ? `(${entry.quarter})` : ''}</td>
                      <td style={{ padding: '14px 12px' }}>{entry.dueDate ? new Date(entry.dueDate).toLocaleDateString() : 'N/A'}</td>
                      <td style={{ padding: '14px 12px' }}>
                        <span style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px',
                          padding: '8px 12px',
                          borderRadius: '999px',
                          fontWeight: 700,
                          fontSize: '0.85rem',
                          ...getStatusStyle(entry.status)
                        }}>
                          {entry.status === 'Completed' || entry.status === 'Filed' ? <CheckCircle2 size={16} /> : entry.status === 'In Progress' ? <Clock size={16} /> : <AlertTriangle size={16} />}
                          {entry.status}
                        </span>
                      </td>
                      <td style={{ padding: '14px 12px', maxWidth: '280px' }}>{entry.remarks || 'No remarks yet'}</td>
                      <td style={{ padding: '14px 12px' }}>
                        <div style={{ display: 'grid', gap: '10px' }}>
                          <select
                            value={entry.status}
                            onChange={(e) => handleStatusChange(entry._id, e.target.value)}
                            disabled={updatingId === entry._id}
                            style={{
                              padding: '10px',
                              borderRadius: '10px',
                              border: '1px solid #60a5fa',
                              background: '#fff',
                              minWidth: '170px'
                            }}
                          >
                            <option value="Not Started">Not Started</option>
                            <option value="In Progress">In Progress</option>
                            <option value="Filed">Filed</option>
                            <option value="Completed">Completed</option>
                            <option value="On Hold">On Hold</option>
                          </select>
                          <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => alert('Use the remarks field in the backend to update notes if needed.')}
                            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                          >
                            <MessageSquare size={16} /> Note
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="glass-card" style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '14px' }}>
    <div style={{ color: 'var(--accent-vibrant)' }}>{icon}</div>
    <div style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>{label}</div>
    <div style={{ fontSize: '1.8rem', fontWeight: 800 }}>{value}</div>
  </div>
);

export default StaffDashboard;
