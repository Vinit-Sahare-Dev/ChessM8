import React from 'react';

const PositionAnalysis = ({ analysis, isLoading, showAnalysis }) => {
  if (!showAnalysis) return null;

  const getEvaluationText = (score) => {
    if (Math.abs(score) > 1000) {
      return score > 0 ? 'White is winning' : 'Black is winning';
    } else if (Math.abs(score) > 300) {
      return score > 0 ? 'White has advantage' : 'Black has advantage';
    } else if (Math.abs(score) > 100) {
      return score > 0 ? 'White is slightly better' : 'Black is slightly better';
    }
    return 'Position is equal';
  };

  const getEvaluationColor = (score) => {
    if (score > 300) return '#4CAF50';
    if (score < -300) return '#f44336';
    if (score > 100) return '#8BC34A';
    if (score < -100) return '#FF9800';
    return '#FFC107';
  };

  return (
    <div className="position-analysis">
      <h3>Position Analysis</h3>
      
      {isLoading ? (
        <div className="analysis-loading">
          <div className="spinner"></div>
          <p>Analyzing position...</p>
        </div>
      ) : analysis ? (
        <div className="analysis-content">
          <div className="evaluation-score">
            <span 
              className="score-value" 
              style={{ color: getEvaluationColor(analysis.score) }}
            >
              {analysis.score > 0 ? '+' : ''}{(analysis.score / 100).toFixed(2)}
            </span>
            <span className="score-text">
              {getEvaluationText(analysis.score)}
            </span>
          </div>
          
          {analysis.bestMove && (
            <div className="best-move">
              <strong>Best move:</strong> {analysis.bestMove}
            </div>
          )}
          
          <div className="position-tips">
            <h4>Position Tips:</h4>
            <ul>
              {analysis.score > 300 && (
                <>
                  <li>You have a significant advantage - press your initiative</li>
                  <li>Look for tactical opportunities to convert your advantage</li>
                </>
              )}
              {analysis.score < -300 && (
                <>
                  <li>You're at a disadvantage - focus on defense</li>
                  <li>Look for counter-attacking opportunities</li>
                </>
              )}
              {Math.abs(analysis.score) <= 300 && (
                <>
                  <li>Position is balanced - play strategically</li>
                  <li>Look for small advantages and piece improvements</li>
                </>
              )}
            </ul>
          </div>
        </div>
      ) : (
        <p>No analysis available</p>
      )}
    </div>
  );
};

export default PositionAnalysis;
