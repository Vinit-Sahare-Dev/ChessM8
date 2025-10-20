import React from 'react';

const Header = () => {
  return (
    <header>
     <div class="logo"><h1> Chessm8</h1></div>
      <nav>
  
        <ul>
      
          <li><a href="http://localhost:3000">Home</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Chess">About</a></li>
          <li><a href="https://www.chessjournal.com/chess-rules/">Rules</a></li>
          <li><a href="https://en.chessbase.com/%20">Events</a></li>
          <button type="submit">SignIn </button>
    
        </ul>
      </nav>
    </header>
  );
};

export default Header;