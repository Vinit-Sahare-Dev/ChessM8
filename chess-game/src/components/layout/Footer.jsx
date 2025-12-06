import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = [
    { category: 'Game', links: [
      { to: '/play', label: 'Play Online' },
      { to: '/learn', label: 'Learn Chess' },
      { to: '/puzzles', label: 'Chess Puzzles' },
    ]},
    { category: 'Community', links: [
      { to: '/community', label: 'Forums' },
      { to: '/tournaments', label: 'Tournaments' },
      { to: '/leaderboard', label: 'Leaderboard' },
    ]},
    { category: 'Support', links: [
      { to: '/help', label: 'Help Center' },
      { to: '/contact', label: 'Contact Us' },
      { to: '/feedback', label: 'Feedback' },
    ]},
    { category: 'Legal', links: [
      { to: '/privacy', label: 'Privacy Policy' },
      { to: '/terms', label: 'Terms of Service' },
      { to: '/cookies', label: 'Cookie Policy' },
    ]},
  ]

  const socialLinks = [
    { href: 'https://github.com/Vinit-Sahare-Dev/ChessM8', icon: '🐙', label: 'GitHub' },
    { href: 'https://twitter.com/chessm8', icon: '🐦', label: 'Twitter' },
    { href: 'https://discord.gg/chessm8', icon: '💬', label: 'Discord' },
    { href: 'https://youtube.com/c/chessm8', icon: '📺', label: 'YouTube' },
  ]

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <motion.div 
              className="footer-logo"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="logo-icon">♟️</span>
              <span className="logo-text">ChessM8</span>
            </motion.div>
            <p className="footer-description">
              The next generation chess platform. Play, learn, and master the royal game with AI-powered features and a vibrant community.
            </p>
            <div className="social-links">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link"
                  aria-label={social.label}
                  whileHover={{ y: -3, scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          <div className="footer-links-grid">
            {footerLinks.map((section, index) => (
              <div key={index} className="footer-section">
                <h3 className="footer-section-title">{section.category}</h3>
                <ul className="footer-section-links">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link to={link.to} className="footer-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="copyright">
              © {currentYear} ChessM8. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <Link to="/accessibility" className="footer-bottom-link">
                Accessibility
              </Link>
              <Link to="/sitemap" className="footer-bottom-link">
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
