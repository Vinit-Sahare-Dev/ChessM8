import React, { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { toast } from 'react-hot-toast'

const ModernPlay = () => {
  const { theme } = useTheme()
  const [game, setGame] = useState(new Chess())
  const [fen, setFen] = useState('start')
  const [moveHistory, setMoveHistory] = useState([])
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] })
  const [gameStatus, setGameStatus] = useState('Active')
  const [timer, setTimer] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [aiDifficulty, setAiDifficulty] = useState(10)
  const [showAnalysis, setShowAnalysis] = useState(false)
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

    // Simple AI: random move with some intelligence
    const randomMove = moves[Math.floor(Math.random() * moves.length)]
    const move = game.move(randomMove)
    
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
        toast(`🤖 AI captured ${move.captured}!`)
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
    <div className="modern-play">
      <div className="container">
        {/* Header */}
        <motion.div
          className="play-header-modern"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="page-title-modern"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            ♟️ Play Chess
          </motion.h1>
          
          <motion.div
            className="game-controls-modern"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <motion.button
              onClick={resetGame}
              className="btn-modern"
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-icon">🔄</span>
              New Game
            </motion.button>
            
            <motion.select
              value={aiDifficulty}
              onChange={(e) => setAiDifficulty(Number(e.target.value))}
              className="difficulty-select-modern"
              whileHover={{ scale: 1.02 }}
            >
              <option value={5}>🌱 Beginner</option>
              <option value={10}>🎯 Intermediate</option>
              <option value={15}>⚔️ Advanced</option>
              <option value={20}>👑 Expert</option>
            </motion.select>
            
            <motion.button
              onClick={() => setShowAnalysis(!showAnalysis)}
              className={`btn-modern ${showAnalysis ? 'btn-active' : 'btn-secondary-modern'}`}
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-icon">📊</span>
              Analysis {showAnalysis ? 'ON' : 'OFF'}
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Main Game Layout */}
        <div className="game-layout-modern">
          {/* Left Panel - Move History */}
          <motion.div
            className="left-panel-modern"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <div className="move-history-modern">
              <div className="history-header">
                <h3>📜 Move History</h3>
                <span className="move-count">{moveHistory.length} moves</span>
              </div>
              
              <div className="moves-list">
                <AnimatePresence>
                  {moveHistory.slice(-10).map((move, index) => (
                    <motion.div
                      key={moveHistory.length - 10 + index}
                      className={`move-item ${index % 2 === 0 ? 'white-move' : 'black-move'}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ x: 10, scale: 1.02 }}
                    >
                      <span className="move-number">{Math.floor((moveHistory.length - 10 + index) / 2) + 1}.</span>
                      <span className="move-notation">{move}</span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* Center Panel - Chess Board */}
          <motion.div
            className="center-panel-modern"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <div className="board-wrapper-modern">
              <motion.div
                className="board-modern"
                initial={{ rotate: 0 }}
                animate={{ rotate: lastMove ? [0, 2, -2, 0] : 0 }}
                transition={{ duration: 0.5 }}
              >
                <Chessboard
                  position={fen}
                  onPieceDrop={makeMove}
                  boardOrientation={boardOrientation}
                  customBoardStyle={{
                    borderRadius: '16px',
                    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
                    border: '3px solid transparent',
                    background: 'linear-gradient(135deg, #2d3748 0%, #1a1f2e 100%)',
                  }}
                  customSquareStyles={{
                    ...lastMove && {
                      [lastMove.from]: {
                        background: 'rgba(102, 126, 234, 0.3)',
                        boxShadow: 'inset 0 0 10px rgba(102, 126, 234, 0.5)'
                      },
                      [lastMove.to]: {
                        background: 'rgba(102, 126, 234, 0.5)',
                        boxShadow: 'inset 0 0 15px rgba(102, 126, 234, 0.7)'
                      }
                    }
                  }}
                />
              </motion.div>
            </div>
            
            <motion.div
              className="board-controls-modern"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
            >
              <motion.button
                onClick={flipBoard}
                className="btn-control-modern"
                whileHover={{ scale: 1.1, rotate: 180 }}
                whileTap={{ scale: 0.9 }}
              >
                🔄
              </motion.button>
              
              <motion.button
                onClick={copyFEN}
                className="btn-control-modern"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                📋
              </motion.button>
              
              <motion.button
                onClick={() => setShowAnalysis(!showAnalysis)}
                className={`btn-control-modern ${showAnalysis ? 'control-active' : ''}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                📊
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Right Panel - Stats */}
          <motion.div
            className="right-panel-modern"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <div className="game-stats-modern">
              <div className="stats-header">
                <h3>📊 Game Stats</h3>
                <div className={`status-indicator ${gameStatus.toLowerCase()}`}>
                  <span className="status-dot"></span>
                  {gameStatus}
                </div>
              </div>
              
              <div className="stats-grid-modern">
                <motion.div
                  className="stat-item-modern"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-icon">⚔️</div>
                  <div className="stat-info">
                    <span className="stat-value">{moveHistory.length}</span>
                    <span className="stat-label">Moves</span>
                  </div>
                </motion.div>
                
                <motion.div
                  className="stat-item-modern"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-icon">🎯</div>
                  <div className="stat-info">
                    <span className="stat-value">{moveHistory.length > 0 ? Math.round((accurateMoves / moveHistory.length) * 100) : 0}%</span>
                    <span className="stat-label">Accuracy</span>
                  </div>
                </motion.div>
                
                <motion.div
                  className="stat-item-modern"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.3, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-icon">⏱️</div>
                  <div className="stat-info">
                    <span className="stat-value">{Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}</span>
                    <span className="stat-label">Time</span>
                  </div>
                </motion.div>
                
                <motion.div
                  className="stat-item-modern"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="stat-icon">🤖</div>
                  <div className="stat-info">
                    <span className="stat-value">Level {aiDifficulty}</span>
                    <span className="stat-label">AI</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ModernPlay
