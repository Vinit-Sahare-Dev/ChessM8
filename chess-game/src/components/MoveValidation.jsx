import React from 'react';

const MoveValidation = ({ isValidMove, lastMove, checkStatus }) => {
  const getValidationMessage = () => {
    if (checkStatus === 'check') return '⚠️ King is in check!';
    if (checkStatus === 'checkmate') return '♔ Checkmate! Game Over!';
    if (checkStatus === 'stalemate') return '🤝 Stalemate! Draw!';
    if (!isValidMove) return '❌ Invalid move';
    return '✓ Valid move';
  };

  const getValidationClass = () => {
    if (checkStatus === 'checkmate') return 'checkmate';
    if (checkStatus === 'check') return 'check';
    if (checkStatus === 'stalemate') return 'stalemate';
    if (!isValidMove) return 'invalid';
    return 'valid';
  };

  return (
    <div className="move-validation">
      <div className={`validation-message ${getValidationClass()}`}>
        {getValidationMessage()}
      </div>
      {lastMove && (
        <div className="last-move-info">
          <span className="move-label">Last move:</span>
          <span className="move-notation">{lastMove}</span>
        </div>
      )}
    </div>
  );
};

export default MoveValidation;
