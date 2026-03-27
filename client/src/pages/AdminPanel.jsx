import React from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--color-light-gray)', minHeight: '100vh', display: 'flex' }}>
      
      {/* Sidebar Navigation */}
      <aside style={{ width: '250px', backgroundColor: 'var(--color-navy)', color: 'white', padding: '24px', display: 'flex', flexDirection: 'column' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '32px' }}>Admin Portal</h2>
        <ul style={{ listStyle: 'none', padding: 0, margin: 0, flex: 1 }}>
          <li style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px', color: '#aeb9ce' }} onClick={() => navigate('/official/dashboard')}>Priority Queue</li>
          <li style={{ padding: '12px 16px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px' }}>Analytics & Reports</li>
          <li style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px', color: '#aeb9ce' }}>User Management</li>
          <li style={{ padding: '12px 16px', borderRadius: '8px', cursor: 'pointer', marginBottom: '8px', color: '#aeb9ce' }}>System Settings</li>
        </ul>
        <button onClick={() => navigate('/')} style={{ background: 'none', border: 'none', color: '#aeb9ce', cursor: 'pointer', textAlign: 'left', padding: '12px 16px' }}>Logout</button>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '32px' }}>
        <h1 style={{ margin: '0 0 32px 0', color: 'var(--color-navy)' }}>Platform Analytics</h1>

        {/* Key Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', marginBottom: '32px' }}>
          {[
            { label: 'Total Issues', value: '1,284' },
            { label: 'Resolved (30d)', value: '845' },
            { label: 'Avg Resolution Time', value: '4.2 Days' },
            { label: 'Active Active Users', value: '5,021' }
          ].map(metric => (
            <div key={metric.label} style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
              <div style={{ color: 'var(--color-text-light)', fontSize: '0.9rem', marginBottom: '8px' }}>{metric.label}</div>
              <div style={{ color: 'var(--color-navy)', fontSize: '2rem', fontWeight: 'bold' }}>{metric.value}</div>
            </div>
          ))}
        </div>

        {/* Charts Mockup Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)', minHeight: '300px' }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-navy)' }}>Issue Resolution Trends</h3>
            <div style={{ width: '100%', height: '200px', backgroundColor: 'var(--color-light-gray)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
              [ Chart Visualization Placeholder ]
            </div>
          </div>
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ margin: '0 0 16px 0', color: 'var(--color-navy)' }}>Issues by Category</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}><span>Roads</span> <strong>45%</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}><span>Water</span> <strong>25%</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee' }}><span>Electricity</span> <strong>20%</strong></li>
              <li style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0' }}><span>Sanitation</span> <strong>10%</strong></li>
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminPanel;
