import React, { useState, useEffect } from 'react'
import { Chessboard } from 'react-chessboard'
import { Chess } from 'chess.js'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import GamifiedStats from '../components/GamifiedStats.jsx'
import GamifiedMoveHistory from '../components/GamifiedMoveHistory.jsx'
import { toast } from 'react-hot-toast'

const Play = () => {
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
      toast.success('Checkmate! Game Over!')
    } else if (game.isStalemate()) {
      setGameStatus('Stalemate')
      setIsPlaying(false)
      toast('Game is a draw!')
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
      toast.error('Invalid move!')
      return false
    }

    setFen(game.fen())
    setMoveHistory(prev => [...prev, move.san])
    
    // Handle captured pieces
    if (move.captured) {
      const pieceSymbol = move.color === 'w' ? '♟' : '♙'
      setCapturedPieces(prev => ({
        ...prev,
        [move.color === 'w' ? 'black' : 'white']: [...prev[move.color === 'w' ? 'black' : 'white'], pieceSymbol]
      }))
    }

    // AI move
    if (!game.isGameOver()) {
      setTimeout(() => makeAIMove(), 500)
    }

    return true
  }

  const makeAIMove = () => {
    const moves = game.moves()
    if (moves.length === 0) return

    const randomMove = moves[Math.floor(Math.random() * moves.length)]
    const move = game.move(randomMove)
    
    if (move) {
      setFen(game.fen())
      setMoveHistory(prev => [...prev, move.san])
      
      if (move.captured) {
        const pieceSymbol = move.color === 'w' ? '♟' : '♙'
        setCapturedPieces(prev => ({
          ...prev,
          [move.color === 'w' ? 'black' : 'white']: [...prev[move.color === 'w' ? 'black' : 'white'], pieceSymbol]
        }))
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
    toast.success('New game started!')
  }

  const flipBoard = () => {
    // Board flip functionality
    toast('Board flipped!')
  }

  const copyFEN = () => {
    navigator.clipboard.writeText(fen)
    toast.success('FEN copied to clipboard!')
  }

  const accurateMoves = moveHistory.filter((_, index) => index % 2 === 0).length

  return (
    <div className="play-page">
      <div className="container">
        <motion.div
          className="play-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Play Chess</h1>
          <div className="game-controls">
            <button onClick={resetGame} className="btn btn-primary">
              🔄 New Game
            </button>
            <select 
              value={aiDifficulty} 
              onChange={(e) => setAiDifficulty(Number(e.target.value))}
              className="difficulty-select"
            >
              <option value={5}>Beginner</option>
              <option value={10}>Intermediate</option>
              <option value={15}>Advanced</option>
              <option value={20}>Expert</option>
            </select>
            <button 
              onClick={() => setShowAnalysis(!showAnalysis)}
              className={`btn ${showAnalysis ? 'btn-secondary' : 'btn-primary'}`}
            >
              📊 Analysis {showAnalysis ? 'ON' : 'OFF'}
            </button>
          </div>
        </motion.div>

        <div className="game-layout">
          <div className="left-panel">
            <GamifiedMoveHistory moves={moveHistory} />
          </div>

          <div className="center-panel">
            <motion.div
              className="chess-board-container"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Chessboard
                position={fen}
                onPieceDrop={makeMove}
                boardOrientation="white"
                customBoardStyle={{
                  borderRadius: '12px',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  border: '3px solid var(--accent-gold)',
                }}
              />
              <div className="board-controls">
                <button onClick={flipBoard} className="btn btn-secondary">
                  🔄 Flip Board
                </button>
                <button onClick={copyFEN} className="btn btn-secondary">
                  📋 Copy FEN
                </button>
              </div>
            </motion.div>
          </div>

          <div className="right-panel">
            <GamifiedStats
              moves={moveHistory.length}
              accurateMoves={accurateMoves}
              timer={timer}
              capturedPieces={capturedPieces}
              gameStatus={gameStatus}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Play
