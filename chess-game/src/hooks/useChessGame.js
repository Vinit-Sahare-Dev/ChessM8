import { useState, useEffect, useCallback } from 'react';
import { Chess } from 'chess.js';

export const useChessGame = (difficulty = 10) => {
  const [game, setGame] = useState(new Chess());
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState(null);
  const [moves, setMoves] = useState([]);
  const [accurateMoves, setAccurateMoves] = useState(0);
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [aiDifficulty, setAiDifficulty] = useState(difficulty);
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [positionAnalysis, setPositionAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const safeGameMutate = useCallback((modify) => {
    setGame((g) => {
      const update = { ...g };
      modify(update);
      return update;
    });
  }, []);

  const makeRandomMove = useCallback(() => {
    const possibleMoves = game.moves();
    
    if (game.game_over() || game.in_draw() || possibleMoves.length === 0) {
      setGameOver(true);
      const gameWinner = game.turn() === 'w' ? 'Black' : 'White';
      setWinner(gameWinner);
      return;
    }

    // AI difficulty-based move selection
    let selectedMove;
    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    
    if (aiDifficulty <= 5) {
      // Easy: completely random moves
      selectedMove = possibleMoves[randomIndex];
    } else if (aiDifficulty <= 15) {
      // Medium: 70% random, 30% best looking moves
      if (Math.random() < 0.7) {
        selectedMove = possibleMoves[randomIndex];
      } else {
        // Simple heuristic: prefer captures and checks
        const captures = possibleMoves.filter(move => move.includes('x'));
        const checks = possibleMoves.filter(move => move.includes('+'));
        const goodMoves = [...captures, ...checks];
        selectedMove = goodMoves.length > 0 ? 
          goodMoves[Math.floor(Math.random() * goodMoves.length)] : 
          possibleMoves[randomIndex];
      }
    } else {
      // Hard: prefer captures, checks, and center control
      const captures = possibleMoves.filter(move => move.includes('x'));
      const checks = possibleMoves.filter(move => move.includes('+'));
      const centerMoves = possibleMoves.filter(move => 
        move.includes('e4') || move.includes('d4') || move.includes('e5') || move.includes('d5')
      );
      
      const goodMoves = [...captures, ...checks, ...centerMoves];
      selectedMove = goodMoves.length > 0 ? 
        goodMoves[Math.floor(Math.random() * goodMoves.length)] : 
        possibleMoves[randomIndex];
    }

    safeGameMutate((game) => {
      game.move(selectedMove);
    });

    const moveHistory = game.history();
    setMoves((prevMoves) => [...prevMoves, moveHistory[moveHistory.length - 1]]);
  }, [game, safeGameMutate, aiDifficulty]);

  const onDrop = useCallback((source, target) => {
    if (gameOver) return false;

    let move = null;
    safeGameMutate((game) => {
      move = game.move({
        from: source,
        to: target,
        promotion: 'q',
      });
    });

    if (move === null) return false;

    setMoves((prevMoves) => [...prevMoves, `${move.from} -> ${move.to}`]);
    setAccurateMoves((prev) => prev + 1);

    if (!startTime) {
      setStartTime(Date.now());
    }

    setTimeout(makeRandomMove, 200);
    return true;
  }, [gameOver, safeGameMutate, startTime, makeRandomMove]);

  const restartGame = useCallback(() => {
    setGame(new Chess());
    setGameOver(false);
    setWinner(null);
    setMoves([]);
    setAccurateMoves(0);
    setTimer(0);
    setStartTime(null);
    setPositionAnalysis(null);
  }, []);

  const changeDifficulty = useCallback((newDifficulty) => {
    setAiDifficulty(newDifficulty);
  }, []);

  const toggleAnalysis = useCallback(() => {
    setShowAnalysis(prev => !prev);
  }, []);

  const analyzeCurrentPosition = useCallback(async () => {
    if (!showAnalysis) return;
    
    setIsAnalyzing(true);
    try {
      // Simple position evaluation based on material and position factors
      const fen = game.fen();
      const evaluation = evaluatePosition(fen);
      setPositionAnalysis(evaluation);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  }, [game, showAnalysis]);

  const evaluatePosition = (fen) => {
    // Simple evaluation function
    const board = game.board();
    let score = 0;
    
    const pieceValues = {
      'p': 1, 'n': 3, 'b': 3, 'r': 5, 'q': 9, 'k': 100,
      'P': -1, 'N': -3, 'B': -3, 'R': -5, 'Q': -9, 'K': -100
    };
    
    for (let row of board) {
      for (let square of row) {
        if (square) {
          score += pieceValues[square.type] * (square.color === 'w' ? 1 : -1);
        }
      }
    }
    
    return {
      score: score * 100,
      bestMove: game.moves()[0] || null
    };
  };

  useEffect(() => {
    if (startTime) {
      const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const elapsed = currentTime - startTime;
        setTimer(Math.floor(elapsed / 1000));
      }, 1000);

      return () => clearInterval(intervalId);
    }
  }, [startTime]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter') {
        restartGame();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [restartGame]);

  useEffect(() => {
    if (showAnalysis) {
      analyzeCurrentPosition();
    }
  }, [game.fen(), showAnalysis, analyzeCurrentPosition]);

  return {
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
  };
};
