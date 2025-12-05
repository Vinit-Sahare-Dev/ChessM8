import React from 'react';

const MoveHistory = ({ moves }) => {
  return (
    <div className="move-history">
      <div className="move-history-header">
        <h3>📋 Move History</h3>
        <span className="move-count">{moves.length} moves</span>
      </div>
      <div className="move-list">
        {moves.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">♟️</div>
            <p>No moves yet. Start playing to see your move history!</p>
          </div>
        ) : (
          moves.map((move, index) => (
            <div 
              key={index} 
              className={`move-item ${index % 2 === 0 ? 'white-move' : 'black-move'}`}
            >
              <div className="move-number">{index + 1}.</div>
              <div className="move-notation">{move}</div>
              <div className="move-piece">
                {index % 2 === 0 ? '♔' : '♚'}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MoveHistory;
