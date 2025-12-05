import React from 'react';
import { Chessboard } from 'react-chessboard';

const ProfessionalBoard = ({ position, onPieceDrop, boardOrientation = 'white' }) => {
  return (
    <div className="professional-board">
      <div className="board-wrapper">
        <div className="board-header">
          <div className="player-info white">
            <span className="player-name">White</span>
            <span className="player-time">⏱️ 00:00</span>
          </div>
          <div className="vs-indicator">VS</div>
          <div className="player-info black">
            <span className="player-name">Black (AI)</span>
            <span className="player-difficulty">🤖 Level 10</span>
          </div>
        </div>
        
        <div className="chessboard-container">
          <Chessboard 
            position={position} 
            onPieceDrop={onPieceDrop}
            boardOrientation={boardOrientation}
            customBoardStyle={{
              borderRadius: '8px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
            }}
          />
        </div>
        
        <div className="board-controls">
          <button className="board-btn" onClick={() => {}}>
            🔄 Flip Board
          </button>
          <button className="board-btn" onClick={() => {}}>
            📋 Copy FEN
          </button>
          <button className="board-btn" onClick={() => {}}>
            🎯 Analysis
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalBoard;
