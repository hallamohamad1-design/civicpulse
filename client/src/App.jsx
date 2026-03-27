import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import InteractiveMap from './components/InteractiveMap';
import CitizenDashboard from './pages/CitizenDashboard';
import OfficialDashboard from './pages/OfficialDashboard';
import AdminPanel from './pages/AdminPanel';
import './index.css';

// A simple Navbar that maps directly for demonstration purposes
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/map" element={<InteractiveMap />} />
          <Route path="/citizen/dashboard" element={<CitizenDashboard />} />
          <Route path="/official/dashboard" element={<OfficialDashboard />} />
          <Route path="/admin/dashboard" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
