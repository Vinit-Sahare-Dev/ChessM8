import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';

const GamifiedBoard = ({ position, onPieceDrop, boardOrientation = 'white' }) => {
  const [lastMove, setLastMove] = useState(null);
  const [hoveredSquare, setHoveredSquare] = useState(null);
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [moveHighlights, setMoveHighlights] = useState([]);

  useEffect(() => {
    // Add particle effects and animations
    const timer = setTimeout(() => {
      setMoveHighlights(['e4', 'e2', 'd2', 'f2']); // Example highlights
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const handlePieceDrop = (sourceSquare, targetSquare, piece) => {
    const move = onPieceDrop(sourceSquare, targetSquare, piece);
    if (move) {
      setLastMove({ from: sourceSquare, to: targetSquare, piece });
      // Add capture animation
      if (piece && piece.type === 'p' && Math.abs(targetSquare.charCodeAt(1) - sourceSquare.charCodeAt(1)) === 1) {
        // En passant capture
        addCaptureAnimation(targetSquare);
      }
    }
    return move;
  };

  const addCaptureAnimation = (square) => {
    const element = document.querySelector(`[data-square="${square}"]`);
    if (element) {
      element.classList.add('capture-animation');
      setTimeout(() => element.classList.remove('capture-animation'), 600);
    }
  };

  const customSquareStyles = () => {
    const styles = {};
    
    // Highlight last move
    if (lastMove) {
      styles[lastMove.from] = {
        backgroundColor: 'rgba(255, 215, 0, 0.4)',
        boxShadow: 'inset 0 0 10px rgba(255, 215, 0, 0.5)'
      };
      styles[lastMove.to] = {
        backgroundColor: 'rgba(255, 215, 0, 0.6)',
        boxShadow: 'inset 0 0 15px rgba(255, 215, 0, 0.7)'
      };
    }

    // Highlight possible moves
    moveHighlights.forEach(square => {
      styles[square] = {
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        boxShadow: 'inset 0 0 8px rgba(0, 255, 0, 0.3)'
      };
    });

    // Hover effect
    if (hoveredSquare) {
      styles[hoveredSquare] = {
        backgroundColor: 'rgba(100, 200, 255, 0.3)',
        boxShadow: 'inset 0 0 12px rgba(100, 200, 255, 0.4)',
        transform: 'scale(1.05)'
      };
    }

    return styles;
  };

  return (
    <div className="gamified-board">
      <div className="board-wrapper">
        <div className="board-header">
          <div className="player-info white">
            <div className="player-avatar">
              <span className="avatar-icon">♔</span>
            </div>
            <div className="player-details">
              <span className="player-name">You</span>
              <div className="player-stats">
                <span className="player-rating">1850</span>
                <span className="player-time">⏱️ 05:23</span>
              </div>
            </div>
            <div className="captured-pieces">
              {capturedPieces.black.map((piece, i) => (
                <span key={i} className="captured-piece">{piece}</span>
              ))}
            </div>
          </div>
          
          <div className="vs-indicator">
            <span className="vs-text">VS</span>
            <div className="vs-glow"></div>
          </div>
          
          <div className="player-info black">
            <div className="player-avatar ai">
              <span className="avatar-icon">🤖</span>
            </div>
            <div className="player-details">
              <span className="player-name">ChessM8 AI</span>
              <div className="player-stats">
                <span className="player-rating">2100</span>
                <span className="player-difficulty">🎮 Expert</span>
              </div>
            </div>
            <div className="captured-pieces">
              {capturedPieces.white.map((piece, i) => (
                <span key={i} className="captured-piece">{piece}</span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="chessboard-container">
          <div className="board-effects">
            <div className="particle-effect"></div>
            <div className="glow-effect"></div>
          </div>
          <Chessboard 
            position={position} 
            onPieceDrop={handlePieceDrop}
            boardOrientation={boardOrientation}
            customSquareStyles={customSquareStyles()}
            onSquareClick={(square) => setHoveredSquare(square)}
            customBoardStyle={{
              borderRadius: '12px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.3)',
              border: '3px solid #FFD700',
              background: 'linear-gradient(135deg, #2C1810 0%, #8B7355 100%)',
            }}
          />
        </div>
        
        <div className="board-controls">
          <button className="board-btn primary" onClick={() => {}}>
            🔄 Flip Board
          </button>
          <button className="board-btn secondary" onClick={() => {}}>
            📋 Copy FEN
          </button>
          <button className="board-btn tertiary" onClick={() => {}}>
            🎯 Analysis
          </button>
          <button className="board-btn special" onClick={() => {}}>
            ✨ Hint
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamifiedBoard;
