import '../styles/App.css';
import { Chessboard } from 'react-chessboard';
import Confetti from 'react-confetti';
import { useChessGame } from '../hooks/useChessGame';
import Header from './header.jsx';
import ChatBox from './ChatBox.js';
import GameStats from './GameStats.jsx';
import MoveHistory from './MoveHistory.jsx';
import GameOverModal from './GameOverModal.jsx';
import ChessQuotes from './ChessQuotes.jsx';
import GameControls from './GameControls.jsx';
import PositionAnalysis from './PositionAnalysis.jsx';

function App() {
  const {
    game,
    gameOver,
    winner,
    moves,
    accurateMoves,
    timer,
    aiDifficulty,
    showAnalysis,
    positionAnalysis,
    isAnalyzing,
    onDrop,
    restartGame,
    changeDifficulty,
    toggleAnalysis,
  } = useChessGame();

  return (
    <div className="app">
      {gameOver && (
        <Confetti
          width={1500}
          height={1000}
          numberOfPieces={300}
          recycle={false}
        />
      )}

      <header className="header">
        <Header />
      </header>

      <div className="game-controls">
        <GameControls 
          onRestart={restartGame}
          onDifficultyChange={changeDifficulty}
          difficulty={aiDifficulty}
          onAnalysisToggle={toggleAnalysis}
          showAnalysis={showAnalysis}
          analysis={positionAnalysis}
        />
      </div>

      <div className="move-list">
        <MoveHistory moves={moves} />
      </div>

      <div className="chessboard-container">
        <Chessboard position={game.fen()} onPieceDrop={onDrop} />
      </div>

      <div className="stats-container">
        <GameStats 
          moves={moves} 
          accurateMoves={accurateMoves} 
          timer={timer} 
        />
      </div>

      {showAnalysis && (
        <div className="position-analysis">
          <PositionAnalysis 
            analysis={positionAnalysis}
            isLoading={isAnalyzing}
            showAnalysis={showAnalysis}
          />
        </div>
      )}

      <div className="quotes-container">
        <ChessQuotes />
      </div>

      <div className="community">
        <h2>ChessM8 is here &#x1F916;</h2>
        <ChatBox />
      </div>

      <footer>
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h4>Contact Us</h4>
              <h4>Phone : 9921349614</h4>
              <h4>Email: vinitsahare123@gmail.com</h4>
            </div>
            <div className="social">
              <h4>Follow Us</h4>
              <ul>
                <li>
                  <a href="https://www.linkedin.com/in/vinit-sahare/" target="_blank" rel="noopener noreferrer">
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a href="https://github.com/Vinit-Sahare" target="_blank" rel="noopener noreferrer">
                    Github
                  </a>
                </li>
                <li>
                  <a href="https://www.instagram.com/vinit.fr/" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
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
          <p>&copy; 2024 Vinit-Sahare | All rights reserved.</p>
        </div>
      </footer>

      <GameOverModal 
        gameOver={gameOver} 
        winner={winner} 
        onRestart={restartGame} 
      />
    </div>
  );
}

export default App;