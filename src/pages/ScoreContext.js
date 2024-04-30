import React, { createContext, useState, useContext, useEffect } from 'react';

const ScoreContext = createContext();

export const useScore = () => useContext(ScoreContext);

export const ScoreProvider = ({ children }) => {
  const [score, setScore] = useState(0);

  const fetchInitialScore = async () => {
    try {
      const response = await fetch('https://cgi.cse.unsw.edu.au/~cs6080/raw/data/info.json');
      const data = await response.json();
      setScore(data.score);
      localStorage.setItem('score', data.score);
    } catch (error) {
      console.error('Failed to fetch initial score:', error);
    }
  };

  useEffect(() => {
    const storedScore = localStorage.getItem('score');
    if (storedScore !== null) {
      setScore(parseInt(storedScore, 10));
    } else {
      fetchInitialScore();
    }
  }, []);

  const decrementScore = () => {
    if (score > 0) {
      setScore(score - 1);
      localStorage.setItem('score', score - 1);
    }
  };

  const resetScore = () => {
    fetchInitialScore();
  };

  return (
    <ScoreContext.Provider value={{ score, decrementScore, resetScore }}>
      {children}
    </ScoreContext.Provider>
  );
};
