import React, { useState, useEffect } from 'react';

const GamifiedHeader = () => {
  const [userLevel, setUserLevel] = useState(15);
  const [userXP, setUserXP] = useState(2850);
  const [streak, setStreak] = useState(7);
  const [animatedXP, setAnimatedXP] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedXP(userXP), 100);
    return () => clearTimeout(timer);
  }, [userXP]);

  const xpProgress = (userXP % 1000) / 1000 * 100;
  const nextLevelXP = Math.ceil(userXP / 1000) * 1000;

  return (
    <header className="gamified-header">
      <div className="header-brand">
        <div className="logo">
          <span className="logo-icon">♟️</span>
          <h1 className="logo-text">ChessM8</h1>
        </div>
        <div className="level-badge">
          <span className="level-number">LVL {userLevel}</span>
          <div className="level-progress">
            <div className="progress-bar" style={{ width: `${xpProgress}%` }}></div>
          </div>
        </div>
      </div>
      
      <nav className="gamified-nav">
        <div className="nav-desktop">
          <a href="#home" className="nav-link">
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Home</span>
          </a>
          <a href="#play" className="nav-link">
            <span className="nav-icon">♟️</span>
            <span className="nav-text">Play</span>
          </a>
          <a href="#learn" className="nav-link">
            <span className="nav-icon">📚</span>
            <span className="nav-text">Learn</span>
          </a>
          <a href="#about" className="nav-link">
            <span className="nav-icon">ℹ️</span>
            <span className="nav-text">About</span>
          </a>
        </div>
        
        <div className="user-stats">
          <div className="streak-counter">
            <span className="streak-icon">🔥</span>
            <span className="streak-number">{streak}</span>
            <span className="streak-label">Day Streak</span>
          </div>
          <div className="xp-display">
            <span className="xp-current">{animatedXP.toLocaleString()}</span>
            <span className="xp-separator">/</span>
            <span className="xp-total">{nextLevelXP.toLocaleString()}</span>
            <span className="xp-label">XP</span>
          </div>
        </div>
        
        <button className="mobile-menu-toggle">☰</button>
      </nav>
    </header>
  );
};

export default GamifiedHeader;
