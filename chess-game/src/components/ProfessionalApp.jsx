import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import Confetti from 'react-confetti';
import { useChessGame } from '../hooks/useChessGame';
import ProfessionalHeader from './ProfessionalHeader';
import ProfessionalStats from './ProfessionalStats';
import ProfessionalBoard from './ProfessionalBoard';
import MoveHistory from './MoveHistory';
import PositionAnalysis from './PositionAnalysis';
import ChessQuotes from './ChessQuotes';
import '../styles/Professional.css';

const ProfessionalApp = () => {
  const {
    game,
    gameOver,
    winner,
    moves,
    accurateMoves,
    timer,
    aiDifficulty,
    showAnalysis,
    positionAnalysis,
    isAnalyzing,
    onDrop,
    restartGame,
    changeDifficulty,
    toggleAnalysis,
  } = useChessGame();

  const [capturedPieces, setCapturedPieces] = useState({ white: 0, black: 0 });
  const [boardOrientation, setBoardOrientation] = useState('white');

  const getGameStatus = () => {
    if (gameOver) {
      if (winner) return winner === 'w' ? 'White Wins' : 'Black Wins';
      return 'Draw';
    }
    if (game.in_check()) return 'Check';
    return 'Active';
  };

  const flipBoard = () => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white');
  };

  const copyFEN = () => {
    navigator.clipboard.writeText(game.fen());
    // You could add a toast notification here
  };

  return (
    <div className="professional-app">
      <ProfessionalHeader />
      
      <main className="main-content">
        <div className="left-panel">
          <MoveHistory moves={moves} />
          
          {showAnalysis && (
            <PositionAnalysis 
              analysis={positionAnalysis}
              isLoading={isAnalyzing}
              showAnalysis={showAnalysis}
            />
          )}
        </div>
        
        <div className="center-panel">
          <ProfessionalBoard 
            position={game.fen()} 
            onPieceDrop={onDrop}
            boardOrientation={boardOrientation}
            onFlipBoard={flipBoard}
            onCopyFEN={copyFEN}
          />
        </div>
        
        <div className="right-panel">
          <ProfessionalStats 
            moves={moves}
            accurateMoves={accurateMoves}
            timer={timer}
            capturedPieces={capturedPieces}
            gameStatus={getGameStatus()}
          />
          
          <div className="game-controls">
            <button className="control-btn primary" onClick={restartGame}>
              🔄 New Game
            </button>
            <button className="control-btn secondary" onClick={() => changeDifficulty(10)}>
              🤖 AI Level {aiDifficulty}
            </button>
            <button className="control-btn" onClick={toggleAnalysis}>
              📊 Analysis {showAnalysis ? 'ON' : 'OFF'}
            </button>
          </div>
        </div>
      </main>
      
      <footer className="professional-footer">
        <div className="footer-content">
          <p>&copy; 2024 ChessM8 - Professional Chess Platform</p>
          <div className="footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </footer>

      {gameOver && (
        <Confetti
          width={1500}
          height={1000}
          numberOfPieces={300}
          recycle={false}
        />
      )}
    </div>
  );
};

export default ProfessionalApp;
