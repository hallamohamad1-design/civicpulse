import React from 'react';
import { useNavigate } from 'react-router-dom';

const CitizenDashboard = () => {
  const navigate = useNavigate();

  // Mock data for citizen's submitted reports
  const reports = [
    {
      id: 'REP-1023',
      title: 'Large pothole on Main St.',
      category: 'ROADS',
      date: '2026-03-24',
      status: 'IN_PROGRESS',
      upvotes: 12,
    },
    {
      id: 'REP-0984',
      title: 'Streetlight out near Park Avenue',
      category: 'ELECTRICITY',
      date: '2026-03-22',
      status: 'RESOLVED',
      upvotes: 5,
    },
    {
      id: 'REP-1045',
      title: 'Water leak from fire hydrant',
      category: 'WATER',
      date: '2026-03-25',
      status: 'PENDING',
      upvotes: 2,
    }
  ];

  const getStatusBadge = (status) => {
    const styles = {
      PENDING: { bg: '#FFF3CD', color: '#856404' },
      ACKNOWLEDGED: { bg: '#D1ECF1', color: '#0C5460' },
      IN_PROGRESS: { bg: '#CCE5FF', color: '#004085' },
      RESOLVED: { bg: '#D4EDDA', color: '#155724' },
      REJECTED: { bg: '#F8D7DA', color: '#721C24' }
    };
    
    const style = styles[status] || styles.PENDING;
    return (
      <span style={{
        backgroundColor: style.bg,
        color: style.color,
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '0.75rem',
        fontWeight: 'bold'
      }}>
        {status.replace('_', ' ')}
      </span>
    );
  };

  return (
    <div style={{ backgroundColor: 'var(--color-light-gray)', minHeight: '100vh' }}>
      <nav style={{ backgroundColor: 'white', padding: '16px 24px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between' }}>
        <h2 style={{ margin: 0, color: 'var(--color-navy)' }}>Citizen Portal</h2>
        <div>
          <button className="btn btn-secondary" style={{ marginRight: '12px' }} onClick={() => navigate('/map')}>New Report +</button>
          <button className="btn btn-secondary" style={{ border: 'none' }} onClick={() => navigate('/')}>Logout</button>
        </div>
      </nav>

      <main className="container" style={{ paddingTop: '32px' }}>
        <h1 style={{ marginBottom: '8px' }}>Welcome back, Citizen</h1>
        <p style={{ color: 'var(--color-text-light)', marginBottom: '32px' }}>Track the status of your reported issues below.</p>

        <div style={{ backgroundColor: 'white', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', borderBottom: '1px solid #eee', paddingBottom: '12px' }}>My Reports</h2>
          
          <div style={{ display: 'grid', gap: '16px' }}>
            {reports.map((report) => (
              <div key={report.id} style={{ border: '1px solid #eee', borderRadius: '8px', padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', fontWeight: 'bold' }}>{report.id}</span>
                    {getStatusBadge(report.status)}
                  </div>
                  <h3 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--color-navy)' }}>{report.title}</h3>
                  <div style={{ display: 'flex', gap: '16px', marginTop: '8px', fontSize: '0.85rem', color: 'var(--color-text-light)' }}>
                    <span>Category: <strong>{report.category}</strong></span>
                    <span>Reported: {report.date}</span>
                    <span>Upvotes: {report.upvotes}</span>
                  </div>
                </div>
                <div>
                  <button className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>View Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CitizenDashboard;
