import React, { useState, useEffect } from 'react';
import './styles/Memory.css';
import { useScore } from './ScoreContext';

function Memory() {
  const { decrementScore } = useScore();
  const [sequence, setSequence] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [userSequence, setUserSequence] = useState([]);
  const [gameStatus, setGameStatus] = useState('watch'); // 'watch', 'play', or 'lost'
  const [round, setRound] = useState(1);

  useEffect(() => {
    startRound();
  }, []);

  useEffect(() => {
    if (gameStatus === 'play' && userSequence.length === sequence.length) {
      if (JSON.stringify(userSequence) === JSON.stringify(sequence)) {
        if (round === 5) {
          alert('You have won the game!');
          resetGame();
        } else {
          alert('Correct! Next round!');
          decrementScore();
          setRound(round + 1);
          startRound();
        }
      } else {
        alert('Incorrect sequence, try again!');
        resetGame();
      }
    }
  }, [userSequence, gameStatus]);

  const startRound = () => {
    setGameStatus('watch');
    setUserSequence([]);
    setCurrentStep('');
    let newSequence = [];
    for (let i = 0; i < round; i++) {
      newSequence.push(['A', 'B', 'C', 'D'][Math.floor(Math.random() * 4)]);
    }
    setSequence(newSequence);

    newSequence.forEach((value, index) => {
      setTimeout(() => {
        setCurrentStep(value);
        if (index === newSequence.length - 1) {
          setTimeout(() => {
            setGameStatus('play');
            setCurrentStep('');
          }, 1000);
        }
      }, 1000 * (index + 1));
    });
  };

  const resetGame = () => {
    setRound(1);
    startRound();
  };

  const handleBoxClick = (value) => {
    if (gameStatus === 'play') {
      setUserSequence([...userSequence, value]);
    }
  };

  return (
    <div className="memory-game">
      <div className="top-half">
        {['A', 'B', 'C', 'D'].map((letter, index) => (
          <button key={index} disabled={gameStatus === 'watch'} onClick={() => handleBoxClick(letter)}>
            {letter}
          </button>
        ))}
      </div>
      <div className="bottom-half">
        <div className="instruction-box">{currentStep}</div>
      </div>
    </div>
  );
}

export default Memory;
