import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { useNavigate } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIcon2x,
  shadowUrl: markerShadow,
});

const LocationMarker = ({ position, setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });

  return position === null ? null : (
    <Marker position={position}>
      <Popup>Report an issue here!</Popup>
    </Marker>
  );
};

const InteractiveMap = () => {
  const navigate = useNavigate();
  const defaultPosition = [31.9522, 35.2332];
  const [position, setPosition] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  const handlePositionSelect = (pos) => {
    setPosition(pos);
    setIsFormOpen(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', width: '100%' }}>
      <div style={{ padding: '16px 20px', backgroundColor: 'var(--color-navy)', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', fontSize: '1.5rem' }}>←</button>
          <h2 style={{ margin: 0, color: 'white' }}>CivicPulse Issue Map</h2>
        </div>
        <div>
          <span style={{ fontSize: '0.9rem', color: '#ccc' }}>Click anywhere on the map to place a pin</span>
        </div>
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        <MapContainer 
          center={defaultPosition} 
          zoom={13} 
          style={{ height: '100%', width: '100%', zIndex: 0 }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <LocationMarker position={position} setPosition={handlePositionSelect} />
        </MapContainer>

        {isFormOpen && position && (
          <div style={{
            position: 'absolute',
            bottom: '24px',
            right: '24px',
            width: '350px',
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
            zIndex: 1000
          }}>
            <h3 style={{ marginBottom: '16px' }}>Report Issue</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-text-light)', marginBottom: '16px' }}>
              Lat: {position.lat.toFixed(4)}, Lng: {position.lng.toFixed(4)}
            </p>
            
            <div className="input-group">
              <label className="input-label">Title</label>
              <input type="text" className="input-field" placeholder="Brief description of the issue" />
            </div>

            <div className="input-group">
              <label className="input-label">Category</label>
              <select className="input-field" defaultValue="">
                <option value="" disabled>Select a category</option>
                <option value="ROADS">Roads & Potholes</option>
                <option value="WATER">Water & Leaks</option>
                <option value="ELECTRICITY">Electricity & Lighting</option>
                <option value="SANITATION">Sanitation & Trash</option>
              </select>
            </div>

            <div className="input-group">
              <label className="input-label">Photo Evidence (Max 5MB)</label>
              <input type="file" className="input-field" accept="image/jpeg, image/png, image/webp" style={{ padding: '8px' }} />
            </div>

            <div style={{ display: 'flex', gap: '8px', marginTop: '24px' }}>
              <button className="btn btn-primary" style={{ flex: 1 }} onClick={() => navigate('/citizen/dashboard')}>
                Submit
              </button>
              <button className="btn btn-secondary" style={{ flex: 1 }} onClick={() => setIsFormOpen(false)}>
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;
