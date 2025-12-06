import React from 'react'
import { motion } from 'framer-motion'

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px'
  }

  return (
    <div className="loading-spinner-container">
      <motion.div
        className="loading-spinner"
        style={{ width: sizeMap[size], height: sizeMap[size] }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
      >
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
      </motion.div>
      {text && <p className="loading-text">{text}</p>}
    </div>
  )
}

export default LoadingSpinner
