import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'

const Home = () => {
  const { theme } = useTheme()

  const features = [
    {
      icon: '🤖',
      title: 'AI-Powered Gameplay',
      description: 'Challenge our advanced AI with multiple difficulty levels and learn from your mistakes.',
      link: '/play'
    },
    {
      icon: '📚',
      title: 'Interactive Learning',
      description: 'Master chess strategies with our comprehensive tutorials and puzzle collection.',
      link: '/learn'
    },
    {
      icon: '👥',
      title: 'Vibrant Community',
      description: 'Connect with chess enthusiasts worldwide and participate in tournaments.',
      link: '/community'
    },
    {
      icon: '🏆',
      title: 'Compete & Win',
      description: 'Join tournaments, climb the leaderboard, and prove your chess mastery.',
      link: '/tournaments'
    }
  ]

  const stats = [
    { number: '50K+', label: 'Active Players' },
    { number: '1M+', label: 'Games Played' },
    { number: '1000+', label: 'Daily Puzzles' },
    { number: '24/7', label: 'AI Available' }
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            className="hero-content"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="hero-title">
              Master the Royal Game with{' '}
              <span className="text-gradient">ChessM8</span>
            </h1>
            <p className="hero-description">
              Experience chess like never before with AI-powered gameplay, 
              interactive learning, and a thriving global community.
            </p>
            <div className="hero-actions">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/play" className="btn btn-primary btn-large">
                  ♟️ Play Now
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to="/learn" className="btn btn-secondary btn-large">
                  📚 Learn Chess
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <motion.div
            className="stats-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                className="stat-card"
                variants={itemVariants}
              >
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div
            className="section-header"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="section-title">Why Choose ChessM8?</h2>
            <p className="section-description">
              Discover the features that make ChessM8 the ultimate chess platform
            </p>
          </motion.div>

          <motion.div
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card"
                variants={itemVariants}
                whileHover={{ y: -10, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
                <Link to={feature.link} className="feature-link">
                  Explore →
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            className="cta-content"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="cta-title">Ready to Become a Chess Master?</h2>
            <p className="cta-description">
              Join thousands of players and start your chess journey today
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link to="/play" className="btn btn-primary btn-large">
                🚀 Get Started Free
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
