import React, { useState } from 'react';

const GameSettings = ({ 
  difficulty, 
  onDifficultyChange, 
  showAnalysis, 
  onAnalysisToggle,
  soundEnabled,
  onSoundToggle,
  theme,
  onThemeChange 
}) => {
  const [showSettings, setShowSettings] = useState(false);

  const difficulties = [
    { value: 1, label: 'Beginner', description: 'New to chess', icon: '🟢' },
    { value: 5, label: 'Easy', description: 'Learning basics', icon: '🔵' },
    { value: 10, label: 'Medium', description: 'Decent challenge', icon: '🟡' },
    { value: 15, label: 'Hard', description: 'Think carefully', icon: '🟠' },
    { value: 20, label: 'Expert', description: 'Grandmaster level', icon: '🔴' },
  ];

  const themes = [
    { value: 'dark', label: 'Dark', icon: '🌙' },
    { value: 'light', label: 'Light', icon: '☀️' },
    { value: 'green', label: 'Green', icon: '♟️' },
  ];

  return (
    <div className="game-settings">
      <button 
        className="settings-toggle"
        onClick={() => setShowSettings(!showSettings)}
      >
        ⚙️ Settings
      </button>

      {showSettings && (
        <div className="settings-panel">
          <div className="settings-header">
            <h3>Game Settings</h3>
            <button 
              className="close-settings"
              onClick={() => setShowSettings(false)}
            >
              ✕
            </button>
          </div>

          <div className="settings-content">
            <div className="setting-group">
              <label>AI Difficulty:</label>
              <div className="difficulty-options">
                {difficulties.map((diff) => (
                  <button
                    key={diff.value}
                    className={`difficulty-btn ${difficulty === diff.value ? 'active' : ''}`}
                    onClick={() => onDifficultyChange(diff.value)}
                  >
                    <span className="difficulty-icon">{diff.icon}</span>
                    <div className="difficulty-info">
                      <span className="difficulty-label">{diff.label}</span>
                      <span className="difficulty-desc">{diff.description}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-group">
              <label>Theme:</label>
              <div className="theme-options">
                {themes.map((t) => (
                  <button
                    key={t.value}
                    className={`theme-btn ${theme === t.value ? 'active' : ''}`}
                    onClick={() => onThemeChange(t.value)}
                  >
                    <span>{t.icon}</span>
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="setting-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={showAnalysis}
                  onChange={onAnalysisToggle}
                />
                <span className="toggle-slider"></span>
                Show Position Analysis
              </label>
            </div>

            <div className="setting-group">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={onSoundToggle}
                />
                <span className="toggle-slider"></span>
                Sound Effects
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GameSettings;
