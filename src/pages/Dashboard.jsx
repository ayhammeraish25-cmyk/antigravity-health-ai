import React from 'react';
import Layout from '../components/Layout';
import Button from '../components/Button';
import { useApp } from '../context/AppContext';

const Dashboard = () => {
  const {
    user,
    today,
    logMeal,
    logWater,
    devices,
    toggleDevice,
    loading
  } = useApp();

  // حماية من الكراش
  if (loading || !user || !today) {
    return (
      <div
        className="loading-screen"
        style={{ color: 'white', textAlign: 'center', marginTop: '20%' }}
      >
        Loading your health data...
      </div>
    );
  }

  const isConnected =
    devices?.watch?.connected || devices?.ring?.connected;

  const handleConnectDevice = () => {
    toggleDevice('watch', true);
  };

  const logBreakfast = () => {
    logMeal({ name: 'Quick Breakfast', cal: 400, p: 20, c: 40, f: 10 });
  };

  return (
    <Layout>
      <div className="dashboard-grid">

        {/* Welcome Section */}
        <section className="welcome-section glass-panel">
          <h2>Good Morning, {user?.name || 'Friend'} ☀️</h2>
          <p>"Consistency is key. Start your day strong."</p>

          <div className="progress-ring">
            <span>
              {today?.calories ? Math.min((today.calories / 2000) * 100, 100).toFixed(0) : 0}%
            </span>
          </div>
        </section>

        {/* Device Warning */}
        {!isConnected && (
          <div className="device-connect-banner">
            <p>No wearable connected</p>
            <Button size="sm" onClick={handleConnectDevice}>
              Connect Device
            </Button>
          </div>
        )}

        {/* Stats */}
        <div className="stats-row">
          <div className="stat-card">🔥 {today?.calories ?? 0} / 2000</div>
          <div className="stat-card">💧 {(today?.hydration ?? 0).toFixed(1)} L</div>
          <div className="stat-card">
            👟 {isConnected ? (today?.steps ?? 0) : '--'}
          </div>
          <div className="stat-card">
            ❤️ {isConnected ? `${today?.heartRate ?? 0} bpm` : '--'}
          </div>
        </div>

        {/* Tasks */}
        <section className="todays-tasks">
          <h3>Today's Log</h3>

          <Button size="sm" onClick={logBreakfast}>
            Log Breakfast
          </Button>

          <Button size="sm" onClick={() => logWater(0.25)}>
            +250ml Water
          </Button>
        </section>

      </div>
    </Layout>
  );
};

export default Dashboard;
