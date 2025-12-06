import React, { useState, useEffect } from 'react';

const GamifiedStats = ({ moves, accurateMoves, timer, capturedPieces, gameStatus }) => {
  const [animatedMoves, setAnimatedMoves] = useState(0);
  const [animatedAccuracy, setAnimatedAccuracy] = useState(0);
  const [animatedTimer, setAnimatedTimer] = useState(0);

  useEffect(() => {
    setAnimatedMoves(moves);
    setAnimatedAccuracy(moves > 0 ? Math.round((accurateMoves / moves) * 100) : 0);
    setAnimatedTimer(timer);
  }, [moves, accurateMoves, timer]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getPerformanceRating = () => {
    const accuracy = moves > 0 ? (accurateMoves / moves) * 100 : 0;
    if (accuracy >= 95) return { rating: 'Grandmaster', color: '#FFD700', icon: '👑' };
    if (accuracy >= 85) return { rating: 'Expert', color: '#C0C0C0', icon: '🎯' };
    if (accuracy >= 75) return { rating: 'Advanced', color: '#CD7F32', icon: '🥉' };
    if (accuracy >= 60) return { rating: 'Intermediate', color: '#8B4513', icon: '🥈' };
    return { rating: 'Beginner', color: '#B87333', icon: '🥉' };
  };

  const performance = getPerformanceRating();

  return (
    <div className="gamified-stats">
      <div className="stats-grid">
        <div className="stat-card primary animated">
          <div className="stat-header">
            <span className="stat-icon">⚔️</span>
            <span className="stat-title">Battle Stats</span>
          </div>
          <div className="stat-body">
            <div className="stat-item">
              <span className="stat-label">Moves</span>
              <span className="stat-value move-counter">{animatedMoves}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Accuracy</span>
              <span className="stat-value accuracy-value">{animatedAccuracy}%</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Time</span>
              <span className="stat-value timer-value">{formatTime(animatedTimer)}</span>
            </div>
          </div>
        </div>

        <div className="stat-card secondary animated">
          <div className="stat-header">
            <span className="stat-icon">🏆</span>
            <span className="stat-title">Performance</span>
          </div>
          <div className="stat-body">
            <div className="performance-rating">
              <div className="rating-icon" style={{ color: performance.color }}>
                {performance.icon}
              </div>
              <div className="rating-info">
                <span className="rating-title" style={{ color: performance.color }}>
                  {performance.rating}
                </span>
                <div className="rating-progress">
                  <div 
                    className="rating-bar" 
                    style={{ 
                      width: `${animatedAccuracy}%`,
                      background: `linear-gradient(90deg, ${performance.color} 0%, ${performance.color}88 100%)`
                    }}
                  ></div>
                </div>
              </div>
            </div>
            
            <div className="status-indicator">
              <span className={`status-dot ${gameStatus.toLowerCase()}`}></span>
              <span className="status-text">{gameStatus}</span>
            </div>
          </div>
        </div>

        <div className="stat-card achievement">
          <div className="stat-header">
            <span className="stat-icon">🎖️</span>
            <span className="stat-title">Achievements</span>
          </div>
          <div className="stat-body">
            <div className="achievement-list">
              <div className="achievement-badge unlocked">
                <span className="badge-icon">🎯</span>
                <span className="badge-name">First Move</span>
              </div>
              <div className="achievement-badge unlocked">
                <span className="badge-icon">⚡</span>
                <span className="badge-name">Speed Demon</span>
              </div>
              <div className="achievement-badge locked">
                <span className="badge-icon">👑</span>
                <span className="badge-name">Grandmaster</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamifiedStats;
