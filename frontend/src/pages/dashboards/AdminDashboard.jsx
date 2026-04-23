import React, { useState, useEffect } from 'react';
import { UserPlus, Users, Briefcase, Activity, Trash2, Edit } from 'lucide-react';
import api from '../../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ totalUsers: 0, activeUsers: 0, usersByRole: [] });
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'staff' });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchUsers();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get('/users/stats');
      setStats(res.data);
    } catch (err) { console.error(err); }
  };

  const fetchUsers = async () => {
    try {
      const res = await api.get('/users');
      setUsers(res.data.users);
    } catch (err) { console.error(err); }
  };

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      setShowAddModal(false);
      setFormData({ name: '', email: '', password: '', role: 'staff' });
      fetchUsers();
      fetchStats();
    } catch (err) { alert(err.response?.data?.message || 'Error adding user'); }
  };

  return (
    <div className="fade-in" style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
          <h1 className="gradient-text">Admin Control Center</h1>
          <button onClick={() => setShowAddModal(true)} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <UserPlus size={18} /> Add User/Client
          </button>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
          <StatCard icon={<Users />} label="Total Users" value={stats.totalUsers} />
          <StatCard icon={<Activity />} label="Active Users" value={stats.activeUsers} />
          <StatCard icon={<Briefcase />} label="Total Clients" value={stats.usersByRole.find(r => r._id === 'client')?.count || 0} />
          <StatCard icon={<Users />} label="Staff Members" value={stats.usersByRole.find(r => r._id === 'staff')?.count || 0} />
        </div>

        {/* User Table */}
        <div className="glass-card" style={{ padding: '24px', overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--bg-body)', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Email</th>
                <th style={{ padding: '12px' }}>Role</th>
                <th style={{ padding: '12px' }}>Status</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(u => (
                <tr key={u._id} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <td style={{ padding: '12px' }}>{u.name}</td>
                  <td style={{ padding: '12px' }}>{u.email}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '4px 10px', 
                      borderRadius: '12px', 
                      fontSize: '0.8rem', 
                      background: u.role === 'admin' ? '#ef4444' : u.role === 'ca' ? '#f59e0b' : '#3b82f6',
                      color: '#fff' 
                    }}>{u.role.toUpperCase()}</span>
                  </td>
                  <td style={{ padding: '12px' }}>{u.isActive ? '✅ Active' : '❌ Inactive'}</td>
                  <td style={{ padding: '12px', display: 'flex', gap: '10px' }}>
                    <button style={{ color: 'var(--accent-vibrant)', background: 'none', border: 'none', cursor: 'pointer' }}><Edit size={18} /></button>
                    <button style={{ color: '#ef4444', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={18} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add User Modal */}
        {showAddModal && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 2000 }}>
            <div className="glass-card" style={{ width: '100%', maxWidth: '450px', padding: '32px' }}>
              <h3>Add New User/Client</h3>
              <form onSubmit={handleAddUser} style={{ marginTop: '20px' }}>
                <div style={{ marginBottom: '16px' }}>
                  <label>Full Name</label>
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} style={modalInputStyle} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Email</label>
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={modalInputStyle} />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label>Password</label>
                  <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={modalInputStyle} />
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label>Role</label>
                  <select value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} style={modalInputStyle}>
                    <option value="client">Client</option>
                    <option value="staff">Staff</option>
                    <option value="ca">CA</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" className="btn btn-primary" style={{ flex: 1 }}>Save User</button>
                  <button type="button" onClick={() => setShowAddModal(false)} className="btn btn-outline" style={{ flex: 1 }}>Cancel</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <div className="glass-card" style={{ padding: '24px', textAlign: 'center' }}>
    <div style={{ color: 'var(--accent-vibrant)', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>{icon}</div>
    <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>{label}</div>
    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{value}</div>
  </div>
);

const modalInputStyle = {
  width: '100%',
  padding: '10px',
  borderRadius: '8px',
  border: '1px solid #60a5fa',
  background: 'rgba(255,255,255,0.7)',
  marginTop: '4px'
};

export default AdminDashboard;
