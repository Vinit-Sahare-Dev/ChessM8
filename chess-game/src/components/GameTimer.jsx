import React, { useState, useEffect } from 'react';

const GameTimer = ({ timer, isPaused, onTogglePause }) => {
  const [displayTime, setDisplayTime] = useState('00:00');

  useEffect(() => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    setDisplayTime(formattedTime);
  }, [timer]);

  const getTimerColor = () => {
    if (timer > 600) return '#4CAF50'; // Green for > 10 minutes
    if (timer > 300) return '#FFC107'; // Yellow for > 5 minutes
    return '#f44336'; // Red for < 5 minutes
  };

  return (
    <div className="game-timer">
      <div className="timer-display">
        <span className="timer-icon">⏱️</span>
        <span 
          className="timer-value" 
          style={{ color: getTimerColor() }}
        >
          {displayTime}
        </span>
      </div>
      <button 
        className="timer-pause-btn"
        onClick={onTogglePause}
      >
        {isPaused ? '▶️ Resume' : '⏸️ Pause'}
      </button>
    </div>
  );
};

export default GameTimer;
