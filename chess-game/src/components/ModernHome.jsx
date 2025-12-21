import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const ModernHome = () => {
  const { theme } = useTheme()

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Gameplay',
      description: 'Challenge our advanced AI with multiple difficulty levels and learn from your mistakes.',
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      delay: 0
    },
    {
      icon: '📚',
      title: 'Interactive Learning',
      description: 'Master chess strategies with our comprehensive tutorials and puzzle collection.',
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
      delay: 0.1
    },
    {
      icon: '👥',
      title: 'Vibrant Community',
      description: 'Connect with chess enthusiasts worldwide and participate in tournaments.',
      gradient: 'linear-gradient(135deg, #00c9ff 0%, #92fe9d 100%)',
      delay: 0.2
    },
    {
      icon: '🏆',
      title: 'Compete & Win',
      description: 'Join tournaments, climb the leaderboard, and prove your chess mastery.',
      gradient: 'linear-gradient(135deg, #fc466b 0%, #3f5efb 100%)',
      delay: 0.3
    }
  ]

  const stats = [
    { number: '50K+', label: 'Active Players', delay: 0 },
    { number: '1M+', label: 'Games Played', delay: 0.1 },
    { number: '1000+', label: 'Daily Puzzles', delay: 0.2 },
    { number: '24/7', label: 'AI Available', delay: 0.3 }
  ]

  return (
    <div className="modern-home">
      {/* Hero Section */}
      <section className="hero-modern">
        <motion.div
          className="hero-content-modern"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <motion.h1 
            className="hero-title-modern"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            Master the Royal Game with{' '}
            <span className="highlight">ChessM8</span>
          </motion.h1>
          
          <motion.p 
            className="hero-subtitle-modern"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            Experience chess like never before with AI-powered gameplay, 
            interactive learning, and a thriving global community.
          </motion.p>
          
          <motion.div 
            className="hero-actions-modern"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/play" className="btn-modern">
                <span className="btn-icon">♟️</span>
                Play Now
              </Link>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/learn" className="btn-modern btn-secondary-modern">
                <span className="btn-icon">📚</span>
                Learn Chess
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="stats-section-modern">
        <div className="container">
          <motion.div
            className="stats-modern"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card-modern"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: stat.delay, duration: 0.6 }}
                whileHover={{ y: -10, scale: 1.05 }}
              >
                <motion.div
                  className="stat-number-modern"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: stat.delay + 0.3, duration: 0.6 }}
                >
                  {stat.number}
                </motion.div>
                <motion.div
                  className="stat-label-modern"
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
      <section className="features-section-modern">
        <div className="container">
          <motion.div
            className="section-header-modern"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="section-title-modern">Why Choose ChessM8?</h2>
            <p className="section-subtitle-modern">
              Discover features that make ChessM8 the ultimate chess platform
            </p>
          </motion.div>

          <div className="features-grid-modern">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card-modern"
                style={{ background: feature.gradient }}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: feature.delay, duration: 0.6 }}
                whileHover={{ y: -15, scale: 1.05, rotate: 2 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="feature-icon-wrapper">
                  <motion.div
                    className="feature-icon"
                    animate={{ 
                      rotate: [0, 10, 0, -10, 0],
                      y: [0, -5, 0, -5, 0]
                    }}
                    transition={{ 
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    {feature.icon}
                  </motion.div>
                </div>
                
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                
                <motion.div
                  className="feature-cta"
                  whileHover={{ x: 10 }}
                >
                  <Link 
                    to={index === 0 ? '/play' : index === 1 ? '/learn' : '/community'}
                    className="feature-link"
                  >
                    Explore →
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section-modern">
        <div className="container">
          <motion.div
            className="cta-content-modern"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.h2 
              className="cta-title-modern"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Ready to Become a Chess Master?
            </motion.h2>
            
            <motion.p 
              className="cta-description-modern"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Join thousands of players and start your chess journey today
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6, duration: 0.6 }}
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/play" className="btn-modern cta-btn">
                <span className="btn-icon">🚀</span>
                Get Started Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default ModernHome
