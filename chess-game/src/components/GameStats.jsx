import React from 'react';

const GameStats = ({ moves, accurateMoves, timer }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const accuracy = moves > 0 ? Math.round((accurateMoves / moves) * 100) : 0;

  return (
    <div className="stats-container">
      <div className="stat-card">
        <div className="stat-icon">♟️</div>
        <div className="stat-content">
          <div className="stat-value">{moves}</div>
          <div className="stat-label">Moves</div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">🎯</div>
        <div className="stat-content">
          <div className="stat-value">{accuracy}%</div>
          <div className="stat-label">Accuracy</div>
        </div>
      </div>
      
      <div className="stat-card">
        <div className="stat-icon">⏱️</div>
        <div className="stat-content">
          <div className="stat-value">{formatTime(timer)}</div>
          <div className="stat-label">Time</div>
        </div>
      </div>
    </div>
  );
};

export default GameStats;
