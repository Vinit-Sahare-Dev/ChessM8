import React from 'react';

const ChessQuotes = () => {
  return (
    <>
      <div className="blog">
        <img
          src="https://e1.pxfuel.com/desktop-wallpaper/312/675/desktop-wallpaper-bobby-fischer-american-chess-grandmaster-poster-art-posters-artwork-12x12-home-kitchen-mikhail-tal-thumbnail.jpg"
          alt="bobby fisher"
        />
        <span>
          " A strong memory, concentration, imagination, and a strong will is required to become a great Chess player "
          <a href="https://en.wikipedia.org/wiki/Bobby_Fischer" target="_blank" rel="noopener noreferrer">
            ― Bobby Fischer
          </a>
        </span>
      </div>

      <div className="magnus">
        <img
          src="https://media.gq-magazine.co.uk/photos/5e96bf31013fff000829de0c/1:1/w_1280,h_1280,c_limit/GettyImages-1199899108.jpg"
          alt="magnus"
        />
        <span>
          "Without the element of enjoyment, it's not worth trying to excel at anything "
          <a href="https://en.wikipedia.org/wiki/Magnus_Carlsen" target="_blank" rel="noopener noreferrer">
            ― Magnus Carlsen
          </a>
        </span>
      </div>

      <div className="vish">
        <img
          src="https://im.rediff.com/sports/2015/jun/18anand.jpg?w=670&h=900"
          alt="vishvanand"
        />
        <span>
          " If revenge motivates you, go for it! But the main thing is to set your game in order"
          <a href="https://en.wikipedia.org/wiki/Viswanathan_Anand" target="_blank" rel="noopener noreferrer">
            ― Vishwanathan Anand
          </a>
        </span>
      </div>

      <div className="ultimate-chess-container">
        <h2 className="ultimate-chess">The Ultimate Chess Companion&#9819;</h2>
      </div>
    </>
  );
};

export default ChessQuotes;
