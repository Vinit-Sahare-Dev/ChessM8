import React from 'react';

const GameOverModal = ({ gameOver, winner, onRestart }) => {
  if (!gameOver) return null;

  return (
    <div className="game-over-container">
      <div className="game-over">
        <h2>Game Over👾!!</h2>
        <h1>You Won &#127942;</h1>
        <button className="restart-button" onClick={onRestart}>
          Play Again!
        </button>
      </div>
    </div>
  );
};

export default GameOverModal;
