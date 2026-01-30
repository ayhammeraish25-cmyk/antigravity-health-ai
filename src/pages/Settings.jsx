import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';
import './Settings.css';

const Settings = () => {
  const { user, updateUser, devices, toggleDevice } = useApp();
  
  const [formData, setFormData] = useState(user);

  useEffect(() => {
    setFormData(user);
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSave = () => {
    updateUser(formData);
    alert('Settings Saved!');
  };

  const devList = [
    { id: 'watch', name: 'Apple Watch Series 8', type: 'watch' },
    { id: 'ring', name: 'Oura Ring', type: 'ring' }
  ];

  return (
    <Layout>
      <div className="settings-container">
        <h2>Settings & Preferences</h2>

        <div className="settings-grid">
          <div className="settings-card glass-panel">
            <h3>User Profile</h3>

            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name || ''}
                onChange={handleChange}
              />
            </div>

            <Button variant="primary" onClick={handleSave}>
              Update Profile
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;
