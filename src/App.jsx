import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import { AuthProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import LoginModal from './components/LoginModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Budget from './components/Budget/Budget';
import BudgetCreation from './components/Budget/BudgetCreation';
import SidebarPortal from './components/SidebarPortal';
import MainScreen from './components/MainScreen/MainScreen';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';


function App() {
  return (
    <MantineProvider
    theme={{ /* theme options here */ }}
  >
    <AuthProvider>
      
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
         <Route
         path="criar-orcamento"
         element={
          <ProtectedRoute>
                <BudgetCreation />
              </ProtectedRoute>
         }
         />
                 </Routes>
      </Router>
    </AuthProvider>
    </MantineProvider>
  );
}

export default App;
