import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Budget from './components/Budget/Budget';
import CompositionPage from './components/Composicoes/CompositionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route index path="/" element={<Budget />} />
        <Route path="/composicoes/:codigo" element={<CompositionPage />} />
      </Routes>
    </Router>
  );
}

export default App
