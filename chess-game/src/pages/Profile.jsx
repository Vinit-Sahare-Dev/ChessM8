import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { toast } from 'react-hot-toast'

const Profile = () => {
  const { theme, toggleTheme } = useTheme()
  const [activeSection, setActiveSection] = useState('overview')
  const [userStats, setUserStats] = useState({
    gamesPlayed: 342,
    gamesWon: 198,
    gamesLost: 144,
    draws: 0,
    currentRating: 1824,
    peakRating: 1956,
    winRate: 57.9,
    averageAccuracy: 82.3,
    favoriteOpening: 'Italian Game',
    bestTacticalMove: 'Fork'
  })

  const [recentGames] = useState([
    { id: 1, opponent: 'AI_Master', result: 'Win', rating: '+12', date: '2024-12-25' },
    { id: 2, opponent: 'ChessExpert', result: 'Win', rating: '+8', date: '2024-12-24' },
    { id: 3, opponent: 'TacticalGenius', result: 'Loss', rating: '-15', date: '2024-12-23' },
    { id: 4, opponent: 'EndgameWizard', result: 'Win', rating: '+18', date: '2024-12-22' },
    { id: 5, opponent: 'OpeningMaster', result: 'Draw', rating: '0', date: '2024-12-21' },
  ])

  const [achievements] = useState([
    { id: 1, name: 'First Victory', description: 'Win your first game', icon: '🏆', unlocked: true },
    { id: 2, name: 'Tactical Genius', description: 'Win 10 games with tactics', icon: '⚔️', unlocked: true },
    { id: 3, name: 'Endgame Master', description: 'Win 5 endgame positions', icon: '♔', unlocked: true },
    { id: 4, name: 'Speed Demon', description: 'Win a blitz game in under 2 minutes', icon: '⚡', unlocked: false },
    { id: 5, name: 'Perfectionist', description: 'Complete a game with 100% accuracy', icon: '💎', unlocked: false },
    { id: 6, name: 'Marathon Player', description: 'Play 100 games', icon: '🏃', unlocked: true },
  ])

  const handleSettingsChange = (setting, value) => {
    toast.success(`${setting} updated to ${value}`)
  }

  const getResultColor = (result) => {
    switch (result) {
      case 'Win': return '#10b981'
      case 'Loss': return '#ef4444'
      case 'Draw': return '#f59e0b'
      default: return '#6b7280'
    }
  }

  return (
    <div className="profile-page">
      <div className="container">
        <motion.div
          className="profile-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="profile-info">
            <div className="avatar-container">
              <div className="avatar">♔</div>
              <div className="rating-badge">{userStats.currentRating}</div>
            </div>
            <div className="user-details">
              <h1 className="username">ChessMaster2024</h1>
              <p className="user-title">Advanced Player</p>
              <div className="user-badges">
                <span className="badge">🏆 Top 10%</span>
                <span className="badge">⚡ Speed Player</span>
                <span className="badge">📚 Student</span>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="profile-tabs">
          {['overview', 'statistics', 'achievements', 'settings'].map((section) => (
            <motion.button
              key={section}
              className={`tab-button ${activeSection === section ? 'active' : ''}`}
              onClick={() => setActiveSection(section)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {section === 'overview' && '📊 Overview'}
              {section === 'statistics' && '📈 Statistics'}
              {section === 'achievements' && '🏆 Achievements'}
              {section === 'settings' && '⚙️ Settings'}
            </motion.button>
          ))}
        </div>

        <div className="profile-content">
          {activeSection === 'overview' && (
            <motion.div
              className="overview-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">🎮</div>
                  <div className="stat-info">
                    <span className="stat-value">{userStats.gamesPlayed}</span>
                    <span className="stat-label">Games Played</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🏆</div>
                  <div className="stat-info">
                    <span className="stat-value">{userStats.winRate}%</span>
                    <span className="stat-label">Win Rate</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-info">
                    <span className="stat-value">{userStats.peakRating}</span>
                    <span className="stat-label">Peak Rating</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-info">
                    <span className="stat-value">{userStats.averageAccuracy}%</span>
                    <span className="stat-label">Accuracy</span>
                  </div>
                </div>
              </div>

              <div className="recent-games">
                <h2>Recent Games</h2>
                <div className="games-list">
                  {recentGames.map((game, index) => (
                    <motion.div
                      key={game.id}
                      className="game-item"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 5 }}
                    >
                      <div className="game-info">
                        <span className="opponent">{game.opponent}</span>
                        <span className="date">{game.date}</span>
                      </div>
                      <div className="game-result">
                        <span 
                          className="result-badge"
                          style={{ backgroundColor: getResultColor(game.result) }}
                        >
                          {game.result}
                        </span>
                        <span className="rating-change">{game.rating}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'statistics' && (
            <motion.div
              className="statistics-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="detailed-stats">
                <div className="stats-group">
                  <h3>Performance</h3>
                  <div className="stat-row">
                    <span>Games Won:</span>
                    <span>{userStats.gamesWon}</span>
                  </div>
                  <div className="stat-row">
                    <span>Games Lost:</span>
                    <span>{userStats.gamesLost}</span>
                  </div>
                  <div className="stat-row">
                    <span>Draws:</span>
                    <span>{userStats.draws}</span>
                  </div>
                </div>
                <div className="stats-group">
                  <h3>Preferences</h3>
                  <div className="stat-row">
                    <span>Favorite Opening:</span>
                    <span>{userStats.favoriteOpening}</span>
                  </div>
                  <div className="stat-row">
                    <span>Best Tactical Move:</span>
                    <span>{userStats.bestTacticalMove}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'achievements' && (
            <motion.div
              className="achievements-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="achievements-grid">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className={`achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.05 }}
                  >
                    <div className="achievement-icon">{achievement.icon}</div>
                    <h3>{achievement.name}</h3>
                    <p>{achievement.description}</p>
                    <div className="achievement-status">
                      {achievement.unlocked ? '✓ Unlocked' : '🔒 Locked'}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeSection === 'settings' && (
            <motion.div
              className="settings-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="settings-groups">
                <div className="settings-group">
                  <h3>Appearance</h3>
                  <div className="setting-item">
                    <label>Theme</label>
                    <button 
                      onClick={toggleTheme}
                      className="theme-toggle-btn"
                    >
                      {theme === 'dark' ? '🌙 Dark' : '☀️ Light'}
                    </button>
                  </div>
                </div>
                
                <div className="settings-group">
                  <h3>Game Preferences</h3>
                  <div className="setting-item">
                    <label>Board Theme</label>
                    <select className="setting-select">
                      <option>Classic</option>
                      <option>Modern</option>
                      <option>Wood</option>
                      <option>Marble</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Piece Style</label>
                    <select className="setting-select">
                      <option>Classic</option>
                      <option>Unicode</option>
                      <option>Metal</option>
                    </select>
                  </div>
                </div>

                <div className="settings-group">
                  <h3>Notifications</h3>
                  <div className="setting-item">
                    <label>Game Invites</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>Tournament Updates</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                  <div className="setting-item">
                    <label>Daily Puzzles</label>
                    <input type="checkbox" defaultChecked />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
