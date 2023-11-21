import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginModal from './components/LoginModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Budget from './components/Budget/Budget';
import SidebarPortal from './components/SidebarPortal';
import MainScreen from './components/MainScreen/MainScreen';

function App() {
  return (
    <AuthProvider>
      <Header />
      
      <Router basename="/app/">
      <SidebarPortal />
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route
            path="/budget/:budgetId"
            element={
              <ProtectedRoute>
                <Budget />
              </ProtectedRoute>
            }
          />
          <Route
            path="/" // The new route path
            element={
              <ProtectedRoute>
                <MainScreen />
              </ProtectedRoute>
            }
          />
          {/* More routes can be added */}
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
