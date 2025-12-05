import React from 'react';

const Header = () => {
  return (
    <header>
      <div className="logo">
        <h1>♟️ ChessM8</h1>
      </div>
      <nav>
        <ul>
          <li><a href="#home">🏠 Home</a></li>
          <li><a href="#play">♟️ Play</a></li>
          <li><a href="#learn">📚 Learn</a></li>
          <li><a href="#about">ℹ️ About</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;