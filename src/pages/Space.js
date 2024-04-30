import React, { useState, useEffect, useCallback } from 'react';
import './styles/Space.css';
import { useScore } from './ScoreContext';

const numRows = 2;
const numCols = 10;
const totalTargets = numRows * numCols;

function Space() {
  const {decrementScore} = useScore();
  const [shooterPosition, setShooterPosition] = useState(0);
  const [targets, setTargets] = useState(new Array(totalTargets).fill(true));

  const moveShooter = useCallback((direction) => {
    setShooterPosition((prevPosition) => {
      if (direction === 'left') {
        return Math.max(prevPosition - 1, 0);
      } else if (direction === 'right') {
        return Math.min(prevPosition + 1, 500 - 10);
      }
      return prevPosition;
    });
  }, []);

  const shoot = useCallback(() => {
    setTargets((prevTargets) => {
      return prevTargets.map((active, index) => {
        const targetColumn = index % numCols;
        const shooterColumn = Math.floor(shooterPosition / (500 / numCols));
        if (active && targetColumn === shooterColumn) {
          return false;
        }
        return active;
      });
    });
  }, [shooterPosition]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowLeft') {
        moveShooter('left');
      } else if (event.key === 'ArrowRight') {
        moveShooter('right');
      } else if (event.key === ' ') {
        shoot();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [moveShooter, shoot]);

  useEffect(() => {
    if (targets.every((active) => !active)) {
      alert('Congratulations! You have won.');
      decrementScore();
      setTargets(new Array(totalTargets).fill(true));
    }
  }, [targets]);

  return (
    <div className="space-game">
      <div className="game-window">
        {targets.map((active, index) => (
          <div
            key={index}
            className={`target ${!active ? 'destroyed' : ''}`}
            style={{
              top: `${Math.floor(index / numCols) * (20 + 30)}px`,
              left: `${(index % numCols) * (20 + 30)}px`, 
            }}
          ></div>
        ))}
        <div
          className="shooter"
          style={{ left: `${shooterPosition}px` }}
        ></div>
      </div>
    </div>
  );
}

export default Space;

