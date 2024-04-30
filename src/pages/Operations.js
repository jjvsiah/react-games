import React, { useState, useEffect } from 'react';
import './styles/Operations.css';
import { useScore } from './ScoreContext';

function Operations() {
  const { decrementScore } = useScore();
  const [inputOne, setInputOne] = useState(0);
  const [inputTwo, setInputTwo] = useState(0);
  const [output, setOutput] = useState(0);
  const [attempt, setAttempt] = useState(0); 

  // Function to calculate a random result
  const generateValidOutput = (input1, input2) => {
    const operations = ['+', '-', 'x', '÷'];
    const randomOp = operations[Math.floor(Math.random() * operations.length)];
    let result;
    switch (randomOp) {
      case '+':
        result = input1 + input2;
        break;
      case '-':
        result = input1 - input2;
        break;
      case 'x':
        result = input1 * input2;
        break;
      case '÷':
        if (input2 !== 0) {
          result = input1 / input2;
          // Limit the number of decimal places to 2
          result = parseFloat(result.toFixed(2));
        } else {
          result = input1; // Avoid division by zero
        }
        break;
      default:
        result = input1 + input2;
    }
    return result;
  };

  const generateNumbers = () => {
    const num1 = Math.floor(Math.random() * 10);
    const num2 = Math.floor(Math.random() * 10);
    setInputOne(num1);
    setInputTwo(num2);
    setOutput(generateValidOutput(num1, num2));
  };

  useEffect(() => {
    generateNumbers();
  }, [attempt]);

  const checkOperation = (operator) => {
    let result;
    switch (operator) {
      case '+':
        result = inputOne + inputTwo;
        break;
      case '-':
        result = inputOne - inputTwo;
        break;
      case 'x':
        result = inputOne * inputTwo;
        break;
      case '÷':
        result = inputTwo !== 0 ? inputOne / inputTwo : null; // Handle division by zero
        break;
      default:
        return;
    }

    if (result === output) {
      alert('Correct! You have won the game.');
      decrementScore();
      setAttempt(attempt => (attempt + 1) % 5); // Cycle attempts from 0 to 4
    } else {
      alert('Incorrect answer. Try again!');
    }
  };

  return (
    <div className="operations-container">
      <div className="primary-box">
        <div className="section">{inputOne}</div>
        <div className="section">
          <button onClick={() => checkOperation('+')}>+</button>
          <button onClick={() => checkOperation('-')}>-</button>
          <button onClick={() => checkOperation('x')}>x</button>
          <button onClick={() => checkOperation('÷')}>÷</button>
        </div>
        <div className="section">{inputTwo}</div>
        <div className="section">=</div>
        <div className="section">{output}</div>
      </div>
    </div>
  );
}

export default Operations;
