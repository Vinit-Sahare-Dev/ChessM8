import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../../hooks/useTheme'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/play', label: 'Play', icon: '♟️' },
    { path: '/learn', label: 'Learn', icon: '📚' },
    { path: '/community', label: 'Community', icon: '👥' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="brand-link">
            <motion.div 
              className="brand-icon"
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              ♟️
            </motion.div>
            <span className="brand-text">ChessM8</span>
          </Link>
          
          <div className="navbar-actions">
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
            
            <button
              className="mobile-menu-toggle"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'open' : ''}`}>
          <div className="menu-items">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-text">{item.label}</span>
                {isActive(item.path) && (
                  <motion.div
                    className="active-indicator"
                    layoutId="activeTab"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>
          
          <div className="menu-footer">
            <Link to="/settings" className="settings-link">
              ⚙️ Settings
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
