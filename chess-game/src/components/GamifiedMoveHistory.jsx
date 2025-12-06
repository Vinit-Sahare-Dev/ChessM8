import React, { useState, useEffect } from 'react';

const GamifiedMoveHistory = ({ moves }) => {
  const [animatedMoves, setAnimatedMoves] = useState([]);
  const [selectedMove, setSelectedMove] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedMoves(moves.map((move, index) => ({
        ...move,
        index,
        isNew: index >= moves.length - 2
      })));
    }, 100);
    return () => clearTimeout(timer);
  }, [moves]);

  const getMoveIcon = (index) => {
    return index % 2 === 0 ? '♔' : '♚';
  };

  const getMoveType = (move) => {
    if (move.includes('x')) return 'capture';
    if (move.includes('+')) return 'check';
    if (move.includes('#')) return 'checkmate';
    if (move.includes('O-O')) return 'castle';
    return 'normal';
  };

  const getMoveColor = (type) => {
    switch (type) {
      case 'capture': return '#ff6b6b';
      case 'check': return '#f59e0b';
      case 'checkmate': return '#ef4444';
      case 'castle': return '#8b5cf6';
      default: return '#10b981';
    }
  };

  return (
    <div className="gamified-move-history">
      <div className="move-history-header">
        <div className="header-content">
          <h3>📜 Move Chronicle</h3>
          <div className="move-counter">
            <span className="move-count">{moves.length}</span>
            <span className="move-label">Moves</span>
          </div>
        </div>
        <div className="filter-controls">
          <button className="filter-btn active">All</button>
          <button className="filter-btn">Captures</button>
          <button className="filter-btn">Checks</button>
        </div>
      </div>
      
      <div className="move-list-container">
        {moves.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">♟️</div>
            <p>No moves yet. Begin your chess journey!</p>
            <div className="empty-hint">
              <span>💡 Tip: Make your first move to start the chronicle</span>
            </div>
          </div>
        ) : (
          <div className="move-list">
            {animatedMoves.map((move, index) => {
              const moveType = getMoveType(move.move || move);
              const moveColor = getMoveColor(moveType);
              
              return (
                <div 
                  key={index} 
                  className={`move-item ${index % 2 === 0 ? 'white-move' : 'black-move'} ${move.isNew ? 'new-move' : ''} ${selectedMove === index ? 'selected' : ''}`}
                  onClick={() => setSelectedMove(selectedMove === index ? null : index)}
                  style={{ '--move-color': moveColor }}
                >
                  <div className="move-number">{index + 1}.</div>
                  <div className="move-content">
                    <div className="move-notation">{move.move || move}</div>
                    {moveType !== 'normal' && (
                      <div className="move-indicator" style={{ color: moveColor }}>
                        {moveType === 'capture' && '⚔️'}
                        {moveType === 'check' && '⚠️'}
                        {moveType === 'checkmate' && '♔'}
                        {moveType === 'castle' && '🏰'}
                      </div>
                    )}
                  </div>
                  <div className="move-piece">
                    <span className="piece-icon">{getMoveIcon(index)}</span>
                    {move.isNew && <span className="new-badge">NEW</span>}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
      
      <div className="move-history-footer">
        <div className="statistics-summary">
          <div className="stat-item">
            <span className="stat-icon">⚔️</span>
            <span className="stat-value">{moves.filter(m => (m.move || m).includes('x')).length}</span>
            <span className="stat-label">Captures</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">🏰</span>
            <span className="stat-value">{moves.filter(m => (m.move || m).includes('O-O')).length}</span>
            <span className="stat-label">Castles</span>
          </div>
          <div className="stat-item">
            <span className="stat-icon">⚠️</span>
            <span className="stat-value">{moves.filter(m => (m.move || m).includes('+')).length}</span>
            <span className="stat-label">Checks</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GamifiedMoveHistory;
