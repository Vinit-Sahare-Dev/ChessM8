import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { toast } from 'react-hot-toast'

const ProfessionalCommunity = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('forums')

  const forums = [
    {
      id: 1,
      title: 'General Discussion',
      description: 'Talk about anything chess-related',
      posts: 15420,
      members: 8934,
      lastActivity: '2 minutes ago',
      icon: '💬'
    },
    {
      id: 2,
      title: 'Tournament Announcements',
      description: 'Stay updated on upcoming tournaments',
      posts: 3421,
      members: 12543,
      lastActivity: '5 minutes ago',
      icon: '🏆'
    },
    {
      id: 3,
      title: 'Game Analysis',
      description: 'Share and analyze your games',
      posts: 8932,
      members: 5621,
      lastActivity: '1 minute ago',
      icon: '📊'
    },
    {
      id: 4,
      title: 'Chess Openings',
      description: 'Discuss opening theory and ideas',
      posts: 12456,
      members: 7890,
      lastActivity: '3 minutes ago',
      icon: '♟️'
    }
  ]

  const tournaments = [
    {
      id: 1,
      name: 'Weekend Blitz Championship',
      type: 'Blitz',
      timeControl: '3+0',
      prize: '$500',
      participants: 256,
      maxParticipants: 512,
      startTime: '2 hours',
      icon: '⚡'
    },
    {
      id: 2,
      name: 'Daily Rapid Arena',
      type: 'Rapid',
      timeControl: '10+5',
      prize: '$200',
      participants: 128,
      maxParticipants: 256,
      startTime: '30 minutes',
      icon: '🕐'
    },
    {
      id: 3,
      name: 'Classical Swiss Tournament',
      type: 'Classical',
      timeControl: '15+10',
      prize: '$1000',
      participants: 64,
      maxParticipants: 128,
      startTime: '1 day',
      icon: '🏰'
    },
    {
      id: 4,
      name: 'Bullet Marathon',
      type: 'Bullet',
      timeControl: '1+0',
      prize: '$100',
      participants: 512,
      maxParticipants: 1024,
      startTime: '15 minutes',
      icon: '🚀'
    }
  ]

  const topPlayers = [
    { rank: 1, name: 'Magnus_Carlsen', rating: 2847, country: '🇳🇴', status: 'online' },
    { rank: 2, name: 'Hikaru', rating: 2821, country: '🇺🇸', status: 'online' },
    { rank: 3, name: 'Fabiano_Caruana', rating: 2804, country: '🇺🇸', status: 'offline' },
    { rank: 4, name: 'Ding_Liren', rating: 2799, country: '🇨🇳', status: 'online' },
    { rank: 5, name: 'Ian_Nepomniachtchi', rating: 2793, country: '🇷🇺', status: 'offline' }
  ]

  const recentActivity = [
    {
      id: 1,
      user: 'ChessMaster2024',
      action: 'won tournament',
      target: 'Weekend Blitz Championship',
      time: '5 minutes ago',
      icon: '🏆'
    },
    {
      id: 2,
      user: 'TacticalGenius',
      action: 'achieved',
      target: '2000 rating milestone',
      time: '12 minutes ago',
      icon: '⭐'
    },
    {
      id: 3,
      user: 'EndgameExpert',
      action: 'posted',
      target: 'Amazing endgame study',
      time: '25 minutes ago',
      icon: '📝'
    },
    {
      id: 4,
      user: 'OpeningWizard',
      action: 'started',
      target: 'Daily Puzzle Challenge',
      time: '1 hour ago',
      icon: '🧩'
    }
  ]

  return (
    <div className="professional-community">
      {/* Header */}
      <section className="community-hero">
        <div className="container">
          <motion.div
            className="community-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="community-hero-title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Join the <span className="highlight">Chess Community</span>
            </motion.h1>
            
            <motion.p 
              className="community-hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Connect with chess players worldwide, participate in tournaments, and improve your game together.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="community-tabs">
        <div className="container">
          <div className="tabs-container">
            {['forums', 'tournaments', 'players', 'activity'].map((tab) => (
              <motion.button
                key={tab}
                className={`tab-button ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {tab === 'forums' && '💬 Forums'}
                {tab === 'tournaments' && '🏆 Tournaments'}
                {tab === 'players' && '👥 Players'}
                {tab === 'activity' && '📊 Activity'}
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Content based on active tab */}
      <section className="community-content">
        <div className="container">
          {activeTab === 'forums' && (
            <motion.div
              className="forums-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="forums-grid">
                {forums.map((forum, index) => (
                  <motion.div
                    key={forum.id}
                    className="forum-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="forum-icon">{forum.icon}</div>
                    <h3 className="forum-title">{forum.title}</h3>
                    <p className="forum-description">{forum.description}</p>
                    <div className="forum-stats">
                      <div className="stat-item">
                        <span className="stat-number">{forum.posts.toLocaleString()}</span>
                        <span className="stat-label">Posts</span>
                      </div>
                      <div className="stat-item">
                        <span className="stat-number">{forum.members.toLocaleString()}</span>
                        <span className="stat-label">Members</span>
                      </div>
                    </div>
                    <div className="forum-activity">
                      <span className="activity-indicator online"></span>
                      <span className="activity-text">{forum.lastActivity}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'tournaments' && (
            <motion.div
              className="tournaments-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="tournaments-grid">
                {tournaments.map((tournament, index) => (
                  <motion.div
                    key={tournament.id}
                    className="tournament-card"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.05, y: -5 }}
                  >
                    <div className="tournament-icon">{tournament.icon}</div>
                    <h3 className="tournament-name">{tournament.name}</h3>
                    <div className="tournament-details">
                      <div className="detail-item">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value">{tournament.type}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Time:</span>
                        <span className="detail-value">{tournament.timeControl}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Prize:</span>
                        <span className="detail-value prize">{tournament.prize}</span>
                      </div>
                    </div>
                    <div className="tournament-participants">
                      <div className="participants-bar">
                        <div 
                          className="participants-fill"
                          style={{ width: `${(tournament.participants / tournament.maxParticipants) * 100}%` }}
                        ></div>
                      </div>
                      <span className="participants-text">
                        {tournament.participants}/{tournament.maxParticipants} players
                      </span>
                    </div>
                    <div className="tournament-time">
                      <span className="time-label">Starts in:</span>
                      <span className="time-value">{tournament.startTime}</span>
                    </div>
                    <motion.button
                      className="professional-btn professional-btn-small"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => toast.success(`Registered for: ${tournament.name}`)}
                    >
                      Join Tournament
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'players' && (
            <motion.div
              className="players-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="players-table">
                <div className="table-header">
                  <div className="header-cell">Rank</div>
                  <div className="header-cell">Player</div>
                  <div className="header-cell">Rating</div>
                  <div className="header-cell">Status</div>
                </div>
                {topPlayers.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    className="table-row"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="cell rank-cell">#{player.rank}</div>
                    <div className="cell player-cell">
                      <span className="country-flag">{player.country}</span>
                      <span className="player-name">{player.name}</span>
                    </div>
                    <div className="cell rating-cell">{player.rating}</div>
                    <div className="cell status-cell">
                      <span className={`status-indicator ${player.status}`}></span>
                      <span className="status-text">{player.status}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              className="activity-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="activity-feed">
                {recentActivity.map((activity, index) => (
                  <motion.div
                    key={activity.id}
                    className="activity-item"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                  >
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <div className="activity-text">
                        <strong>{activity.user}</strong> {activity.action} <em>{activity.target}</em>
                      </div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProfessionalCommunity
