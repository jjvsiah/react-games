import React, { useEffect, useState } from 'react';
import { useScore } from './ScoreContext';
import { useLocation } from 'react-router-dom';
import './styles/Dashboard.css';

function Dashboard() {
  const { score, resetScore } = useScore();
  const location = useLocation();
  const [isMounted, setIsMounted] = useState(false);  

  useEffect(() => {
    setIsMounted(true);  
  }, []);

  useEffect(() => {
    if (isMounted && location.pathname === '/home' && score === 0) {
      alert('Congratulations!', 10);
      resetScore();
    }
  }, [score, location, isMounted]); 

  return (
    <div className="dashboard">
      <p className="message">Please choose an option from the sidebar.</p>
      <p>Games left to win: {score !== null ? score : 'Loading...'} <button onClick={resetScore}>Reset</button></p>
    </div>
  );
}

export default Dashboard;
