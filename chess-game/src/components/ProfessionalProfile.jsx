import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { toast } from 'react-hot-toast'

const ProfessionalProfile = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('overview')

  const userProfile = {
    username: 'ChessMaster2024',
    name: 'Alex Johnson',
    rating: 1847,
    rank: 'Expert',
    country: '🇺🇸',
    joinDate: 'January 2023',
    gamesPlayed: 2847,
    winRate: 68.3,
    favoriteOpening: 'Italian Game',
    avatar: '👤'
  }

  const stats = [
    { label: 'Games Played', value: userProfile.gamesPlayed.toLocaleString(), icon: '♟️' },
    { label: 'Win Rate', value: `${userProfile.winRate}%`, icon: '🏆' },
    { label: 'Current Rating', value: userProfile.rating, icon: '⭐' },
    { label: 'Best Rating', value: 1923, icon: '🚀' }
  ]

  const recentGames = [
    {
      id: 1,
      opponent: 'TacticalGenius',
      result: 'win',
      ratingChange: '+12',
      opening: 'Sicilian Defense',
      timeControl: '10+5',
      date: '2 hours ago'
    },
    {
      id: 2,
      opponent: 'EndgameExpert',
      result: 'draw',
      ratingChange: '0',
      opening: 'Queen\'s Gambit',
      timeControl: '15+10',
      date: '5 hours ago'
    },
    {
      id: 3,
      opponent: 'OpeningWizard',
      result: 'loss',
      ratingChange: '-8',
      opening: 'Italian Game',
      timeControl: '3+0',
      date: '1 day ago'
    },
    {
      id: 4,
      opponent: 'ChessKing99',
      result: 'win',
      ratingChange: '+15',
      opening: 'Ruy Lopez',
      timeControl: '5+3',
      date: '2 days ago'
    }
  ]

  const achievements = [
    {
      id: 1,
      title: 'First Victory',
      description: 'Win your first game',
      icon: '🏆',
      unlocked: true,
      date: 'January 2023'
    },
    {
      id: 2,
      title: 'Puzzle Master',
      description: 'Solve 100 puzzles',
      icon: '🧩',
      unlocked: true,
      date: 'March 2023'
    },
    {
      id: 3,
      title: 'Rating Milestone',
      description: 'Reach 1800 rating',
      icon: '⭐',
      unlocked: true,
      date: 'June 2023'
    },
    {
      id: 4,
      title: 'Tournament Champion',
      description: 'Win a tournament',
      icon: '👑',
      unlocked: false,
      progress: 75
    },
    {
      id: 5,
      title: 'Speed Demon',
      description: 'Win 10 bullet games',
      icon: '⚡',
      unlocked: false,
      progress: 60
    },
    {
      id: 6,
      title: 'Endgame Expert',
      description: 'Win 50 endgame studies',
      icon: '🏁',
      unlocked: false,
      progress: 40
    }
  ]

  const preferences = {
    notifications: true,
    soundEffects: true,
    autoAnalysis: false,
    showRating: true,
    language: 'English',
    boardTheme: 'Classic',
    pieceStyle: 'Staunton'
  }

  return (
    <div className="professional-profile">
      {/* Profile Header */}
      <section className="profile-header">
        <div className="container">
          <motion.div
            className="profile-header-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="profile-avatar">
              <div className="avatar-circle">{userProfile.avatar}</div>
              <div className="rating-badge">{userProfile.rating}</div>
            </div>
            
            <div className="profile-info">
              <motion.h1 
                className="profile-name"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                {userProfile.name}
              </motion.h1>
              
              <motion.div 
                className="profile-details"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
              >
                <span className="profile-username">@{userProfile.username}</span>
                <span className="profile-country">{userProfile.country}</span>
                <span className="profile-rank">{userProfile.rank}</span>
              </motion.div>
              
              <motion.p 
                className="profile-bio"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
              >
                Passionate chess player | Always learning | Love tactical puzzles | Favorite opening: {userProfile.favoriteOpening}
              </motion.p>
            </div>
            
            <motion.div
              className="profile-actions"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <motion.button
                className="professional-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toast.success('Profile edited!')}
              >
                Edit Profile
              </motion.button>
              <motion.button
                className="professional-btn professional-btn-secondary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => toast.success('Settings opened!')}
              >
                Settings
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Overview */}
      <section className="profile-stats">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                className="stat-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="profile-tabs">
        <div className="container">
          <div className="tabs-container">
            {['overview', 'games', 'achievements', 'settings'].map((tab) => (
              <motion.button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === 'overview' && '📊 Overview'}
                {tab === 'games' && '♟️ Games'}
                {tab === 'achievements' && '🏆 Achievements'}
                {tab === 'settings' && '⚙️ Settings'}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Content based on active tab */}
      <section className="profile-content">
        <div className="container">
          {activeTab === 'overview' && (
            <motion.div
              className="overview-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="overview-grid">
                <div className="overview-card">
                  <h3>Recent Performance</h3>
                  <div className="performance-chart">
                    <div className="chart-placeholder">
                      📈 Rating progress chart coming soon
                    </div>
                  </div>
                </div>
                
                <div className="overview-card">
                  <h3>Quick Stats</h3>
                  <div className="quick-stats">
                    <div className="quick-stat">
                      <span className="stat-label">Member Since</span>
                      <span className="stat-value">{userProfile.joinDate}</span>
                    </div>
                    <div className="quick-stat">
                      <span className="stat-label">Favorite Opening</span>
                      <span className="stat-value">{userProfile.favoriteOpening}</span>
                    </div>
                    <div className="quick-stat">
                      <span className="stat-label">Best Win Streak</span>
                      <span className="stat-value">12 games</span>
                    </div>
                    <div className="quick-stat">
                      <span className="stat-label">Average Game Length</span>
                      <span className="stat-value">23 moves</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'games' && (
            <motion.div
              className="games-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="games-list">
                {recentGames.map((game, index) => (
                  <motion.div
                    key={game.id}
                    className="game-item"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className={`game-result ${game.result}`}>
                      {game.result === 'win' && '🏆'}
                      {game.result === 'draw' && '🤝'}
                      {game.result === 'loss' && '💔'}
                    </div>
                    <div className="game-details">
                      <div className="opponent">vs {game.opponent}</div>
                      <div className="game-meta">
                        <span className="opening">{game.opening}</span>
                        <span className="time-control">{game.timeControl}</span>
                        <span className="date">{game.date}</span>
                      </div>
                    </div>
                    <div className={`rating-change ${game.result === 'win' ? 'positive' : game.result === 'loss' ? 'negative' : 'neutral'}`}>
                      {game.ratingChange}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'achievements' && (
            <motion.div
              className="achievements-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="achievement-icon">{achievement.icon}</div>
                    <h3 className="achievement-title">{achievement.title}</h3>
                    <p className="achievement-description">{achievement.description}</p>
                    {achievement.unlocked ? (
                      <div className="achievement-date">Unlocked: {achievement.date}</div>
                    ) : (
                      <div className="achievement-progress">
                        <div className="progress-bar">
                          <div 
                            className="progress-fill"
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                        </div>
                        <span className="progress-text">{achievement.progress}%</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              className="settings-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="settings-grid">
                <div className="settings-card">
                  <h3>Preferences</h3>
                  <div className="settings-list">
                    <div className="setting-item">
                      <label className="setting-label">
                        <input type="checkbox" defaultChecked={preferences.notifications} />
                        <span>Enable Notifications</span>
                      </label>
                    </div>
                    <div className="setting-item">
                      <label className="setting-label">
                        <input type="checkbox" defaultChecked={preferences.soundEffects} />
                        <span>Sound Effects</span>
                      </label>
                    </div>
                    <div className="setting-item">
                      <label className="setting-label">
                        <input type="checkbox" defaultChecked={preferences.autoAnalysis} />
                        <span>Auto Game Analysis</span>
                      </label>
                    </div>
                    <div className="setting-item">
                      <label className="setting-label">
                        <input type="checkbox" defaultChecked={preferences.showRating} />
                        <span>Show Rating in Games</span>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="settings-card">
                  <h3>Display</h3>
                  <div className="settings-list">
                    <div className="setting-item">
                      <label className="setting-label">Language</label>
                      <select className="setting-select" defaultValue={preferences.language}>
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div className="setting-item">
                      <label className="setting-label">Board Theme</label>
                      <select className="setting-select" defaultValue={preferences.boardTheme}>
                        <option>Classic</option>
                        <option>Green</option>
                        <option>Blue</option>
                        <option>Wood</option>
                      </select>
                    </div>
                    <div className="setting-item">
                      <label className="setting-label">Piece Style</label>
                      <select className="setting-select" defaultValue={preferences.pieceStyle}>
                        <option>Staunton</option>
                        <option>Merida</option>
                        <option>USCF</option>
                        <option>Circular</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="settings-actions">
                <motion.button
                  className="professional-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.success('Settings saved!')}
                >
                  Save Changes
                </motion.button>
                <motion.button
                  className="professional-btn professional-btn-secondary"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => toast.success('Settings reset!')}
                >
                  Reset to Default
                </motion.button>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProfessionalProfile
