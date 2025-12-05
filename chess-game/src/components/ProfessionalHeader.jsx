import React, { useState } from 'react';

const ProfessionalHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="professional-header">
      <div className="header-brand">
        <div className="logo">
          <span className="logo-icon">♟️</span>
          <h1 className="logo-text">ChessM8</h1>
        </div>
      </div>
      
      <nav className="professional-nav">
        <div className="nav-desktop">
          <a href="#home" className="nav-link">🏠 Home</a>
          <a href="#play" className="nav-link">♟️ Play</a>
          <a href="#learn" className="nav-link">📚 Learn</a>
          <a href="#about" className="nav-link">ℹ️ About</a>
        </div>
        
        <button 
          className="mobile-menu-toggle"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
        
        {isMenuOpen && (
          <div className="mobile-menu">
            <a href="#home">🏠 Home</a>
            <a href="#play">♟️ Play</a>
            <a href="#learn">📚 Learn</a>
            <a href="#about">ℹ️ About</a>
          </div>
        )}
      </nav>
    </header>
  );
};

export default ProfessionalHeader;
