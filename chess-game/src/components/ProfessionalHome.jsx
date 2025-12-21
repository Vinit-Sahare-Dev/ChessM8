import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const ProfessionalHome = () => {
  const { theme } = useTheme()

  const features = [
    {
      icon: '♟️',
      title: 'Play Chess Online',
      description: 'Challenge players from around the world in rated and unrated games.',
      color: '#81b64c',
      delay: 0
    },
    {
      icon: '🎯',
      title: 'Daily Puzzles',
      description: 'Improve your tactical skills with new puzzles every day.',
      color: '#f7a352',
      delay: 0.1
    },
    {
      icon: '📚',
      title: 'Chess Lessons',
      description: 'Learn from grandmasters with interactive video lessons.',
      color: '#26a417',
      delay: 0.2
    },
    {
      icon: '🏆',
      title: 'Tournaments',
      description: 'Compete in daily, weekly, and monthly tournaments.',
      color: '#6b46c1',
      delay: 0.3
    }
  ]

  const stats = [
    { number: '100M+', label: 'Games Played', delay: 0 },
    { number: '10M+', label: 'Active Members', delay: 0.1 },
    { number: '150K+', label: 'Daily Puzzles', delay: 0.2 },
    { number: '24/7', label: 'Available', delay: 0.3 }
  ]

  return (
    <div className="professional-home">
      {/* Hero Section */}
      <section className="professional-hero">
        <motion.div
          className="professional-hero-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1 
            className="professional-hero-title"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Play Chess on the{' '}
            <span className="highlight">#1 Chess Platform</span>
          </motion.h1>
          
          <motion.p 
            className="professional-hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Join millions of players playing millions of chess games every day.
            Play with friends, play against the computer, learn new openings, 
            solve puzzles, and more.
          </motion.p>
          
          <motion.div 
            className="professional-hero-actions"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/play" className="professional-btn professional-btn-green">
                Play Online
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/learn" className="professional-btn professional-btn-secondary">
                Solve Puzzles
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="professional-stats">
        <div className="container">
          <motion.div
            className="professional-stats-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="professional-stat-card"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay, duration: 0.6 }}
                whileHover={{ y: -8, scale: 1.02 }}
              >
                <motion.div
                  className="professional-stat-number"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay + 0.3, duration: 0.6 }}
                >
                  {stat.number}
                </motion.div>
                <motion.div
                  className="professional-stat-label"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay + 0.4, duration: 0.6 }}
                >
                  {stat.label}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="professional-features">
        <div className="container">
          <motion.div
            className="professional-features-grid"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="professional-feature-card"
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                whileHover={{ y: -12, scale: 1.03, rotate: 1 }}
                whileTap={{ scale: 0.97 }}
                style={{ borderTopColor: feature.color }}
              >
                <motion.div
                  className="professional-feature-icon"
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    y: [0, -3, 0, -3, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                  style={{ filter: `drop-shadow(0 4px 8px ${feature.color}40)` }}
                >
                  {feature.icon}
                </motion.div>
                
                <h3 className="professional-feature-title">{feature.title}</h3>
                <p className="professional-feature-description">{feature.description}</p>
                
                <motion.div
                  className="professional-feature-link-wrapper"
                  whileHover={{ x: 10 }}
                >
                  <Link 
                    to={index === 0 ? '/play' : index === 1 ? '/learn' : '/community'}
                    className="professional-feature-link"
                    style={{ color: feature.color }}
                  >
                    Learn More →
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="professional-cta">
        <div className="container">
          <motion.div
            className="professional-cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="professional-cta-title"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Ready to Play Chess?
            </motion.h2>
            
            <motion.p 
              className="professional-cta-description"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Create your free account today and join the world's largest chess community.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/play" className="professional-btn professional-btn-orange professional-btn-large">
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ProfessionalHome
