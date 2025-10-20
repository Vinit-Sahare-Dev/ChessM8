import '../styles/App.css';
import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js'; 
import Header from './header.jsx'; 
import ChatBox from './ChatBox.js';
import { useWindowSize } from 'react-use'; // import the useWindowSize hook
import Confetti from 'react-confetti'; // import the Confetti component



function App() {
  const [game, setGame] = useState(new Chess());
  const [winner, setWinner] = useState(null);
  const [gameOver, setGameOver] = useState(false);
  const [moves, setMoves] = useState([]);
  const [accurateMoves, setAccurateMoves] = useState(0);
  const [timer, setTimer] = useState(0); // add timer state
  const [startTime, setStartTime] = useState(null); // add start time state
 
// Let's perform a function on the game state
function safeGameMutate(modify) {
  setGame((g) => {
    const update = {...g };
    modify(update);
    return update;
  });
}


function makeRandomMove() {
  const possibleMove = game.moves();

     // exit if the game is over
     if (game.game_over() || game.in_draw() || possibleMove.length === 0) {
      setGameOver(true);
      const winner = game.turn() === 'w'? 'Black' : 'White';
      setWinner(winner);
      return;
    }



  // select random move
  const randomIndex = Math.floor(Math.random() * possibleMove.length);
  const opponentMove = possibleMove[randomIndex];

  // play random move
  safeGameMutate((game) => {
    game.move(opponentMove);
  });

  // store opponent's move in moves state
  const moveHistory = game.history();
  setMoves((prevMoves) => [...prevMoves, moveHistory[moveHistory.length - 1]]);
}

function onDrop(source, target) {
  if (gameOver) return false;

  let move = null;
  safeGameMutate((game) => {
    move = game.move({
      from: source,
      to: target,
      promotion: 'q',
    });
  });
  // illegal move
  if (move === null) return false;
  // valid move
  setMoves((prevMoves) => [...prevMoves, `${move.from} -> ${move.to}`]);
  setAccurateMoves(accurateMoves + 1); // update accurateMoves state

  // start timer if it's the first move
  if (!startTime) {
    setStartTime(Date.now());
  }

  setTimeout(makeRandomMove, 200);
  return true;
}


  // Reset the game
  function restartGame() {
    setGame(new Chess());
    setGameOver(false);
    setWinner(null);
    setMoves([]);
    setAccurateMoves(0);
    setTimer(0);
    setStartTime(null);
  }

  // Listen for Enter key press to restart the game
  <div className="timer">
  <p>Time: {timer} seconds</p>
</div>

// ...

useEffect(() => {
  function handleKeyPress(event) {
    if (event.key === 'Enter') {
      restartGame();
    }
  }
  window.addEventListener('keydown', handleKeyPress);
  return () => {
    window.removeEventListener('keydown', handleKeyPress);
  };
}, []);



useEffect(() => {
  if (startTime) {
    const intervalId = setInterval(() => {
      const currentTime = Date.now();
      const elapsed = currentTime - startTime;
      setTimer(Math.floor(elapsed / 1000));
    }, 1000); // update every 1 second

    return () => {
      clearInterval(intervalId);
    };
  }
}, [startTime]);

  return (
  
    <div className="app">




  {gameOver && (
    
  <Confetti
    width={1500} // specify the width of the confetti canvas
    height={1000} // specify the height of the confetti canvas
    numberOfPieces={300} // add this prop to specify the number of confetti pieces
    recycle={false} // add this prop to specify whether to recycle confetti pieces
  />
 
)

}

      <div className="header">
        <Header /> 
        
  
      </div>
      <div className="game-info">
  <div className="stats-container">
    <p className="move-count">Moves: {moves.length}</p>
    <p className="accuracy">Accuracy: {accurateMoves}/{moves.length}</p>
    <button className="timer-button">
      <span>Time: {timer} seconds</span>
    </button>
  </div>
  <ul className="move-list">  
    <p>Game Positions:</p>

    {moves.map((move, index) => (
      <li key={index} className={index % 2 === 0? "move-item even" : "move-item odd"}>
        <span className="move-arrow">{/* Add chess piece icon here */}</span>
        <span className="move-index" data-index={index + 1}>{move}</span>
      </li>
    ))}
  </ul>
</div>
      <div className="chessboard-container">
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
       
      </div>
      {gameOver && (
        <div className="game-over-container">
       
       
          <div className="game-over">

          
          <h2>Game Over👾!!</h2>
          <h1> You Won &#127942;</h1>
            <button className="restart-button" onClick={restartGame}>Play Again!</button>
           

          </div>
        </div>
      )}


        <div className="blog">

        
  <img src="https://e1.pxfuel.com/desktop-wallpaper/312/675/desktop-wallpaper-bobby-fischer-american-chess-grandmaster-poster-art-posters-artwork-12x12-home-kitchen-mikhail-tal-thumbnail.jpg" alt='bobby fisher'/>
  <span>“ A strong memory, concentration, imagination, and a strong will is required to become a great Chess player ” &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://en.wikipedia.org/wiki/Bobby_Fischer" target="_blank">  ― Bobby Fischer </a> </span>

   </div>
   
  <div className="magnus">
  <img src="https://media.gq-magazine.co.uk/photos/5e96bf31013fff000829de0c/1:1/w_1280,h_1280,c_limit/GettyImages-1199899108.jpg" alt='magnus'/>
  <span>“Without the element of enjoyment, it’s not worth trying to excel at anything ” &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://en.wikipedia.org/wiki/Magnus_Carlsen" target="_blank">  ― Magnus Carlsen</a> </span>
</div>
   
<div className="vish">
  <img src="https://im.rediff.com/sports/2015/jun/18anand.jpg?w=670&h=900" alt='vishvanand'/>
  <span> " If revenge motivates you, go for it! But the main thing is to set your game in order"  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<a href="https://en.wikipedia.org/wiki/Viswanathan_Anand" target="_blank">  ― Vishwanathan anand </a> </span>
  </div>
  <div>
  <h2 class="ultimate-chess">The Ultimate Chess Companion&#9819;</h2>
</div>
<div className="community">
<h2>ChessM8 is here 	&#x1F916;</h2>
  <ChatBox> </ChatBox>
</div>

    <footer>
  <div className="container">
    <div className="row">
      <div className="col-md-4">
        <h4>Contact Us</h4>
        <h4>Phone : 9921349614 </h4>
        <h4>Emailid : vinitsahare123@gmail.com</h4>
      </div>
      <div className="social">
        <h4>Follow Us</h4>
        <ul>
          <li><a href="https://www.linkedin.com/in/vinit-sahare/" target="Likedin"><i className="Linkedin" aria-hidden="true"></i> LinkedIn</a></li>

          <li><a href="https://github.com/Vinit-Sahare" target="Github"><i className="Github" aria-hidden="true"></i> Github</a></li>
        
          <li><a href="https://www.instagram.com/vinit.fr/?next=%2F" target="Instagram"><i className="Instagram" aria-hidden="true"></i> Instagram</a></li>
        </ul>
      </div>
      <div className="inpp">
        <h4>Subscribe to Our Newsletter</h4>
        <form>
          <input type="email" placeholder="Enter your email address" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  </div>
  <div className="copyright">
  <p>&copy; 2024 Vinit-Sahare  &nbsp; | &nbsp; All rights reserved.</p>
  </div>
</footer>
    </div>
  );
}

export default App;