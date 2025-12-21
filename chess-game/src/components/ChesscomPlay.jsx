import React, { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { toast } from 'react-hot-toast'

const ChesscomPlay = () => {
  const { theme } = useTheme()
  const [game, setGame] = useState(new Chess())
  const [fen, setFen] = useState('start')
  const [moveHistory, setMoveHistory] = useState([])
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] })
  const [gameStatus, setGameStatus] = useState('Active')
  const [timer, setTimer] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [aiDifficulty, setAiDifficulty] = useState(10)
  const [lastMove, setLastMove] = useState(null)
  const [boardOrientation, setBoardOrientation] = useState('white')

  useEffect(() => {
    let interval
    if (isPlaying && !game.isGameOver()) {
      interval = setInterval(() => {
        setTimer(prev => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, game])

  useEffect(() => {
    if (game.isCheckmate()) {
      setGameStatus('Checkmate')
      setIsPlaying(false)
      toast.success('🎉 Checkmate! Game Over!')
    } else if (game.isStalemate()) {
      setGameStatus('Stalemate')
      setIsPlaying(false)
      toast('🤝 Game is a draw!')
    } else if (game.isCheck()) {
      setGameStatus('Check')
    } else {
      setGameStatus('Active')
    }
  }, [game])

  const makeMove = (source, target, piece) => {
    const move = game.move({
      from: source,
      to: target,
      promotion: piece === 'wP' && target[1] === '8' ? 'q' :
               piece === 'bP' && target[1] === '1' ? 'q' : undefined
    })

    if (move === null) {
      toast.error('❌ Invalid move!')
      return false
    }

    setFen(game.fen())
    setMoveHistory(prev => [...prev, move.san])
    setLastMove({ from: source, to: target })
    
    // Handle captured pieces
    if (move.captured) {
      const pieceSymbol = move.color === 'w' ? '♟' : '♙'
      setCapturedPieces(prev => ({
        ...prev,
        [move.color === 'w' ? 'black' : 'white']: [...prev[move.color === 'w' ? 'black' : 'white'], pieceSymbol]
      }))
      toast(`🎯 ${move.color === 'w' ? 'White' : 'Black'} captured ${move.captured}!`)
    }

    // AI move
    if (!game.isGameOver()) {
      setTimeout(() => makeAIMove(), 800)
    }

    return true
  }

  const makeAIMove = () => {
    const moves = game.moves()
    if (moves.length === 0) return

    // Smart AI: prefer center control and piece development
    const scoredMoves = moves.map(move => {
      let score = Math.random() * 10 // Base randomness
      
      // Prefer center moves
      if (move.to.includes('d') || move.to.includes('e')) score += 5
      
      // Prefer captures
      if (move.flags.includes('c')) score += 10
      
      // Prefer checks
      const tempGame = new Chess(game.fen())
      tempGame.move(move)
      if (tempGame.inCheck()) score += 15
      
      return { move, score }
    })
    
    const bestMove = scoredMoves.reduce((best, current) => 
      current.score > best.score ? current : best
    )
    
    const move = game.move(bestMove.move)
    
    if (move) {
      setFen(game.fen())
      setMoveHistory(prev => [...prev, move.san])
      setLastMove({ from: move.from, to: move.to })
      
      if (move.captured) {
        const pieceSymbol = move.color === 'w' ? '♟' : '♙'
        setCapturedPieces(prev => ({
          ...prev,
          [move.color === 'w' ? 'black' : 'white']: [...prev[move.color === 'w' ? 'black' : 'white'], pieceSymbol]
        }))
        toast(`🤖 AI played ${move.san}`)
      }
    }
  }

  const resetGame = () => {
    const newGame = new Chess()
    setGame(newGame)
    setFen('start')
    setMoveHistory([])
    setCapturedPieces({ white: [], black: [] })
    setGameStatus('Active')
    setTimer(0)
    setIsPlaying(true)
    setLastMove(null)
    toast.success('🔄 New game started!')
  }

  const flipBoard = () => {
    setBoardOrientation(prev => prev === 'white' ? 'black' : 'white')
    toast('🔄 Board flipped!')
  }

  const copyFEN = () => {
    navigator.clipboard.writeText(fen)
    toast.success('📋 FEN copied to clipboard!')
  }

  const accurateMoves = moveHistory.filter((_, index) => index % 2 === 0).length

  return (
    <div className="chesscom-play">
      <div className="container">
        {/* Header */}
        <motion.div
          className="chesscom-play-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="chesscom-page-title"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Play Chess
          </motion.h1>
          
          <motion.div
            className="chesscom-game-controls"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              onClick={resetGame}
              className="chesscom-btn"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 New Game
            </motion.button>
            
            <motion.select
              value={aiDifficulty}
              onChange={(e) => setAiDifficulty(Number(e.target.value))}
              className="chesscom-difficulty-select"
              whileHover={{ scale: 1.02 }}
            >
              <option value={5}>🌱 Beginner</option>
              <option value={10}>🎯 Intermediate</option>
              <option value={15}>⚔️ Advanced</option>
              <option value={20}>👑 Expert</option>
            </motion.select>
            
            <motion.button
              onClick={flipBoard}
              className="chesscom-btn chesscom-btn-secondary"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Flip Board
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Main Game Layout */}
        <div className="chesscom-game-layout">
          {/* Left Panel - Game Info */}
          <motion.div
            className="chesscom-left-panel"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="chesscom-game-info">
              <div className="chesscom-info-header">
                <h3>Game Info</h3>
                <div className={`chesscom-status-indicator ${gameStatus.toLowerCase()}`}>
                  <span className="chesscom-status-dot"></span>
                  {gameStatus}
                </div>
              </div>
              
              <div className="chesscom-info-stats">
                <div className="chesscom-info-item">
                  <span className="chesscom-info-label">Moves:</span>
                  <span className="chesscom-info-value">{moveHistory.length}</span>
                </div>
                
                <div className="chesscom-info-item">
                  <span className="chesscom-info-label">Time:</span>
                  <span className="chesscom-info-value">
                    {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                  </span>
                </div>
                
                <div className="chesscom-info-item">
                  <span className="chesscom-info-label">AI Level:</span>
                  <span className="chesscom-info-value">{aiDifficulty}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Center Panel - Chess Board */}
          <motion.div
            className="chesscom-center-panel"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="chesscom-board-container">
              <motion.div
                className="chesscom-board-wrapper"
                initial={{ rotate: 0 }}
                animate={{ rotate: lastMove ? [0, 1, -1, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Chessboard
                  position={fen}
                  onPieceDrop={makeMove}
                  boardOrientation={boardOrientation}
                  customBoardStyle={{
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.2)',
                    border: '2px solid #81b64c',
                  }}
                  customSquareStyles={{
                    ...lastMove && {
                      [lastMove.from]: {
                        background: 'rgba(129, 182, 76, 0.3)',
                        boxShadow: 'inset 0 0 10px rgba(129, 182, 76, 0.5)'
                      },
                      [lastMove.to]: {
                        background: 'rgba(129, 182, 76, 0.5)',
                        boxShadow: 'inset 0 0 15px rgba(129, 182, 76, 0.7)'
                      }
                    }
                  }}
                />
              </motion.div>
            </div>
            
            <motion.div
              className="chesscom-board-controls"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.button
                onClick={copyFEN}
                className="chesscom-btn chesscom-btn-secondary chesscom-btn-small"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                📋 Copy FEN
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Panel - Move History */}
          <motion.div
            className="chesscom-right-panel"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="chesscom-move-history">
              <div className="chesscom-history-header">
                <h3>📜 Move History</h3>
                <span className="chesscom-move-count">{moveHistory.length} moves</span>
              </div>
              
              <div className="chesscom-moves-list">
                <AnimatePresence>
                  {moveHistory.slice(-8).map((move, index) => (
                    <motion.div
                      key={moveHistory.length - 8 + index}
                      className={`chesscom-move-item ${index % 2 === 0 ? 'white-move' : 'black-move'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <span className="chesscom-move-number">
                        {Math.floor((moveHistory.length - 8 + index) / 2) + 1}.
                      </span>
                      <span className="chesscom-move-notation">{move}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ChesscomPlay
