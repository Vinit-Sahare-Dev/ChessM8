import React from 'react';

const MoveHistory = ({ moves }) => {
  return (
    <div className="move-list">
      <p>Game Positions:</p>
      {moves.map((move, index) => (
        <li
          key={index}
          className={index % 2 === 0 ? 'move-item even' : 'move-item odd'}
        >
          <span className="move-index" data-index={index + 1}>
            {move}
          </span>
        </li>
      ))}
    </div>
  );
};

export default MoveHistory;
