import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Footer from './components/Footer';
import './App.css';
import Dashboard from './pages/Dashboard';
import Operations from './pages/Operations';
import Memory from './pages/Memory';
import Space from './pages/Space';
import { ScoreProvider } from './pages/ScoreContext';

function App() {
  return (
    <Router>
      <ScoreProvider>
        <div className="app">
          <Sidebar />
          <div className="main-content">
            <Routes>
              <Route path="/home" element={<Dashboard />} />
              <Route path="/operations" element={<Operations />} />
              <Route path="/memory" element={<Memory />} />
              <Route path="/space" element={<Space />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </ScoreProvider>
    </Router>
  );
}

export default App;
