import React from 'react';

const ProfessionalStats = ({ moves, accurateMoves, timer, capturedPieces, gameStatus }) => {
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const accuracy = moves > 0 ? Math.round((accurateMoves / moves) * 100) : 0;
  const materialAdvantage = capturedPieces?.white || 0;

  return (
    <div className="professional-stats">
      <div className="stats-grid">
        <div className="stat-card primary">
          <div className="stat-header">
            <span className="stat-icon">♟️</span>
            <span className="stat-title">Game Progress</span>
          </div>
          <div className="stat-body">
            <div className="stat-item">
              <span className="stat-label">Moves</span>
              <span className="stat-value">{moves}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Accuracy</span>
              <span className="stat-value accuracy">{accuracy}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Time</span>
              <span className="stat-value">{formatTime(timer)}</span>
            </div>
          </div>
        </div>

        <div className="stat-card secondary">
          <div className="stat-header">
            <span className="stat-icon">📊</span>
            <span className="stat-title">Game Status</span>
          </div>
          <div className="stat-body">
            <div className="status-indicator">
              <span className={`status-dot ${gameStatus}`}></span>
              <span className="status-text">{gameStatus}</span>
            </div>
            {materialAdvantage !== 0 && (
              <div className="material-advantage">
                <span className="advantage-label">Material</span>
                <span className="advantage-value">+{materialAdvantage}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalStats;
