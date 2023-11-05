import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginModal from './components/LoginModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Budget from './components/Budget/Budget';
import CompositionPage from './components/Composicoes/CompositionPage';

function App() {
  return (
    <AuthProvider>
      <Header />
      <Router basename="/app/">
        <Routes>
          <Route path="/login" element={<LoginModal />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Budget />
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
