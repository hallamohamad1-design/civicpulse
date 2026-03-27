import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OfficialDashboard = () => {
  const navigate = useNavigate();

  // Mock data for government priority queue
  const [issues, setIssues] = useState([
    {
      id: 'REP-1002',
      title: 'Collapsed bridge barrier',
      category: 'ROADS',
      priorityScore: 95.5,
      status: 'PENDING',
      department: 'Unassigned',
      reportedAt: '2026-03-24'
    },
    {
      id: 'REP-0941',
      title: 'Major water main break flooding intersection',
      category: 'WATER',
      priorityScore: 88.0,
      status: 'ACKNOWLEDGED',
      department: 'Water Authority',
      reportedAt: '2026-03-23'
    },
    {
      id: 'REP-1055',
      title: 'Traffic light malfunction on Route 9',
      category: 'ELECTRICITY',
      priorityScore: 72.5,
      status: 'IN_PROGRESS',
      department: 'Public Works',
      reportedAt: '2026-03-25'
    }
  ]);

  const updateStatus = (id, newStatus) => {
    setIssues(issues.map(iss => iss.id === id ? { ...iss, status: newStatus } : iss));
  };

  return (
    <div style={{ backgroundColor: 'var(--color-light-gray)', minHeight: '100vh', display: 'flex' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '250px', backgroundColor: 'var(--color-navy)', color: 'white', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '32px' }}>Gov Portal</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
          <li style={{ padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px' }}>Priority Queue</li>
          <li style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px', color: '#aeb9ce' }} onClick={() => navigate('/admin/dashboard')}>Admin Panel</li>
          <li style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px', color: '#aeb9ce' }}>My Department</li>
        </ul>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#aeb9ce', cursor: 'pointer', textAlign: 'left', padding: '12px 16px' }}>Logout</button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h1 style={{ margin: 0, color: 'var(--color-navy)' }}>Priority Queue</h1>
            <p style={{ color: 'var(--color-text-light)', margin: '8px 0 0 0' }}>Issues sorted by dynamic urgency score.</p>
          </div>
          <div>
            <span style={{ backgroundColor: 'white', padding: '8px 16px', borderRadius: '20px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', fontSize: '0.9rem', fontWeight: 'bold' }}>Department: General Triage</span>
          </div>
        </div>

        {/* Data Table */}
        <div style={{ backgroundColor: 'white', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead style={{ backgroundColor: 'var(--color-light-gray)' }}>
              <tr>
                <th style={{ padding: '16px 24px', color: 'var(--color-text-light)', fontWeight: '600' }}>Score</th>
                <th style={{ padding: '16px 24px', color: 'var(--color-text-light)', fontWeight: '600' }}>ID & Title</th>
                <th style={{ padding: '16px 24px', color: 'var(--color-text-light)', fontWeight: '600' }}>Department</th>
                <th style={{ padding: '16px 24px', color: 'var(--color-text-light)', fontWeight: '600' }}>Status</th>
                <th style={{ padding: '16px 24px', color: 'var(--color-text-light)', fontWeight: '600' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.map(iss => (
                <tr key={iss.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ 
                      backgroundColor: iss.priorityScore > 90 ? '#ffebee' : 'var(--color-light-gray)',
                      color: iss.priorityScore > 90 ? '#c62828' : 'var(--color-navy)',
                      padding: '8px', borderRadius: '8px', fontWeight: 'bold', display: 'inline-block', minWidth: '50px', textAlign: 'center'
                    }}>
                      {iss.priorityScore}
                    </div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <div style={{ fontSize: '0.8rem', color: 'var(--color-text-light)' }}>{iss.id} • {iss.category}</div>
                    <div style={{ fontWeight: '600', color: 'var(--color-navy)', marginTop: '4px' }}>{iss.title}</div>
                  </td>
                  <td style={{ padding: '16px 24px' }}>{iss.department}</td>
                  <td style={{ padding: '16px 24px' }}>
                    <select 
                      value={iss.status} 
                      onChange={(e) => updateStatus(iss.id, e.target.value)}
                      style={{ padding: '6px 12px', borderRadius: '8px', border: '1px solid #ccc', outline: 'none' }}
                    >
                      <option value="PENDING">Pending</option>
                      <option value="ACKNOWLEDGED">Acknowledged</option>
                      <option value="IN_PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </td>
                  <td style={{ padding: '16px 24px' }}>
                    <button className="btn btn-primary" style={{ padding: '6px 12px', fontSize: '0.85rem' }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default OfficialDashboard;
