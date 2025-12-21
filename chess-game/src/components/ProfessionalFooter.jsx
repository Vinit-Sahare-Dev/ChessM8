import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const ProfessionalFooter = () => {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Game',
      links: [
        { path: '/play', label: 'Play Online' },
        { path: '/puzzles', label: 'Daily Puzzles' },
        { path: '/tournaments', label: 'Tournaments' },
        { path: '/analysis', label: 'Board Analysis' }
      ]
    },
    {
      title: 'Learn',
      links: [
        { path: '/learn', label: 'Chess Lessons' },
        { path: '/openings', label: 'Openings' },
        { path: '/endgames', label: 'Endgames' },
        { path: '/tactics', label: 'Tactics Training' }
      ]
    },
    {
      title: 'Community',
      links: [
        { path: '/community', label: 'Forums' },
        { path: '/clubs', label: 'Chess Clubs' },
        { path: '/streamers', label: 'Streamers' },
        { path: '/events', label: 'Live Events' }
      ]
    },
    {
      title: 'Support',
      links: [
        { path: '/help', label: 'Help Center' },
        { path: '/contact', label: 'Contact Us' },
        { path: '/feedback', label: 'Feedback' },
        { path: '/report', label: 'Report Issue' }
      ]
    }
  ]

  const socialLinks = [
    { name: 'Twitter', icon: '🐦', url: 'https://twitter.com' },
    { name: 'Facebook', icon: '📘', url: 'https://facebook.com' },
    { name: 'YouTube', icon: '📺', url: 'https://youtube.com' },
    { name: 'Instagram', icon: '📷', url: 'https://instagram.com' },
    { name: 'Discord', icon: '💬', url: 'https://discord.com' }
  ]

  const legalLinks = [
    { path: '/privacy', label: 'Privacy Policy' },
    { path: '/terms', label: 'Terms of Service' },
    { path: '/cookies', label: 'Cookie Policy' },
    { path: '/accessibility', label: 'Accessibility' },
    { path: '/sitemap', label: 'Sitemap' }
  ]

  return (
    <footer className="professional-footer">
      <div className="container">
        {/* Main Footer Content */}
        <div className="footer-content">
          <div className="footer-sections">
            {footerSections.map((section, index) => (
              <motion.div
                key={section.title}
                className="footer-section"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
              >
                <h3 className="footer-section-title">{section.title}</h3>
                <ul className="footer-links">
                  {section.links.map((link) => (
                    <motion.li key={link.path}>
                      <motion.div whileHover={{ x: 5 }}>
                        <Link
                          to={link.path}
                          className="footer-link"
                        >
                          {link.label}
                        </Link>
                      </motion.div>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <div className="footer-sidebar">
            {/* Newsletter */}
            <motion.div
              className="newsletter-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              <h3 className="newsletter-title">Stay Updated</h3>
              <p className="newsletter-description">
                Get the latest chess news, tips, and exclusive offers
              </p>
              <form className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                  required
                />
                <motion.button
                  type="submit"
                  className="newsletter-button professional-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Subscribe
                </motion.button>
              </form>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="social-section"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <h3 className="social-title">Follow Us</h3>
              <div className="social-links">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={social.name}
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <span className="social-icon">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <motion.div
              className="footer-brand"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              <Link to="/" className="footer-logo">
                ♟️ ChessM8
              </Link>
              <p className="footer-tagline">
                The Ultimate Chess Platform
              </p>
            </motion.div>

            <motion.div
              className="footer-legal"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <div className="legal-links">
                {legalLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="legal-link"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
              <p className="copyright">
                © {currentYear} ChessM8. All rights reserved.
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default ProfessionalFooter
