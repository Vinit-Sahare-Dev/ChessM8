import React from 'react';

const GameStats = ({ moves, accurateMoves, timer }) => {
  return (
    <div className="stats-container">
      <p className="move-count">Moves: {moves.length}</p>
      <p className="accuracy">
        Accuracy: {accurateMoves}/{moves.length}
      </p>
      <button className="timer-button">
        <span>Time: {timer} seconds</span>
      </button>
    </div>
  );
};

export default GameStats;
