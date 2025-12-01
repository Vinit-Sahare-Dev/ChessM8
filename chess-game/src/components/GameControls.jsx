import React, { useState } from 'react';

const GameControls = ({ 
  onRestart, 
  onDifficultyChange, 
  difficulty, 
  onAnalysisToggle, 
  showAnalysis,
  analysis 
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const difficulties = [
    { value: 1, label: 'Beginner', description: 'New to chess' },
    { value: 5, label: 'Easy', description: 'Learning the basics' },
    { value: 10, label: 'Medium', description: 'Decent challenge' },
    { value: 15, label: 'Hard', description: 'Think carefully' },
    { value: 20, label: 'Expert', description: 'Grandmaster level' },
  ];

  return (
    <div className="game-controls">
      <button className="control-button primary" onClick={onRestart}>
        New Game
      </button>
      
      <button 
        className="control-button secondary" 
        onClick={() => setShowSettings(!showSettings)}
      >
        Settings
      </button>

      {showSettings && (
        <div className="settings-panel">
          <h3>Game Settings</h3>
          
          <div className="difficulty-selector">
            <label>AI Difficulty:</label>
            <select 
              value={difficulty} 
              onChange={(e) => onDifficultyChange(parseInt(e.target.value))}
            >
              {difficulties.map((diff) => (
                <option key={diff.value} value={diff.value}>
                  {diff.label}
                </option>
              ))}
            </select>
            <p className="difficulty-description">
              {difficulties.find(d => d.value === difficulty)?.description}
            </p>
          </div>

          <div className="analysis-toggle">
            <label>
              <input
                type="checkbox"
                checked={showAnalysis}
                onChange={onAnalysisToggle}
              />
              Show Position Analysis
            </label>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameControls;
