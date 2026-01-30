import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Onboarding from './pages/Onboarding';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Nutrition from './pages/Nutrition';
import Fitness from './pages/Fitness';
import Health from './pages/Health';
import Chat from './pages/Chat';
import Settings from './pages/Settings';
import Recipes from './pages/Recipes';
import Social from './pages/Social';
import Review from './pages/Review';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/resetpassword/:resetToken" element={<ResetPassword />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/nutrition" element={<Nutrition />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/fitness" element={<Fitness />} />
          <Route path="/health" element={<Health />} />
          <Route path="/social" element={<Social />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/review" element={<Review />} />
        </Routes>
      </Router>
    </AppProvider>
  )
}

export default App
