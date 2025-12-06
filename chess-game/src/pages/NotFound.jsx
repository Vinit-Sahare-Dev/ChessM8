import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const NotFound = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <motion.div
          className="not-found-content"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="error-code"
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            404
          </motion.div>
          
          <h1 className="error-title">Oops! Page Not Found</h1>
          <p className="error-description">
            The chess piece you're looking for seems to have fallen off the board.
            Let's get you back to the game!
          </p>
          
          <div className="error-actions">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/" className="btn btn-primary">
                🏠 Go Home
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/play" className="btn btn-secondary">
                ♟️ Play Chess
              </Link>
            </motion.div>
          </div>
          
          <div className="chess-animation">
            <motion.div
              className="fallen-piece"
              animate={{ 
                y: [0, -20, 0],
                rotate: [0, 180, 360]
              }}
              transition={{ 
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              ♟️
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default NotFound
