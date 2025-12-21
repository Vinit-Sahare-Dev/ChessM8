import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const ProfessionalNavbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/play', label: 'Play', icon: '♟️' },
    { path: '/learn', label: 'Learn', icon: '📚' },
    { path: '/community', label: 'Community', icon: '👥' },
    { path: '/profile', label: 'Profile', icon: '👤' },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <motion.nav 
      className={`professional-nav ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
    >
      <div className="container">
        <motion.div className="professional-brand">
          <Link to="/" className="professional-logo">
            ♟️
          </Link>
          <motion.span 
            className="brand-text"
            whileHover={{ scale: 1.05 }}
          >
            ChessM8
          </motion.span>
        </motion.div>

        <div className="professional-nav-links">
          {navItems.map((item) => (
            <motion.div key={item.path}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={item.path}
                  className={`professional-nav-link ${isActive(item.path) ? 'active' : ''}`}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </Link>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <div className="nav-actions">
          <motion.button
            onClick={toggleTheme}
            className="theme-toggle"
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </motion.button>

          <motion.button
            className="mobile-menu-toggle"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.span
              animate={{ rotate: isMenuOpen ? 45 : 0 }}
            >
              ☰
            </motion.span>
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
          >
            <div className="mobile-menu-content">
              {navItems.map((item) => (
                <motion.div key={item.path}>
                  <motion.div
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to={item.path}
                      className={`mobile-nav-link ${isActive(item.path) ? 'active' : ''}`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span className="nav-icon">{item.icon}</span>
                      <span className="nav-label">{item.label}</span>
                    </Link>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default ProfessionalNavbar
