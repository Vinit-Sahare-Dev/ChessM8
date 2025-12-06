import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { toast } from 'react-hot-toast'

const Community = () => {
  const { theme } = useTheme()
  const [activeTab, setActiveTab] = useState('forums')
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'ChessMaster99',
      avatar: '♔',
      title: 'Amazing Sicilian Defense Variation!',
      content: 'Just discovered a brilliant line in the Sicilian Defense that completely caught my opponent off guard...',
      likes: 42,
      comments: 8,
      time: '2 hours ago',
      category: 'Openings'
    },
    {
      id: 2,
      author: 'TacticalGenius',
      avatar: '♕',
      title: 'Puzzle of the Day - Fork Attack',
      content: 'Here\'s a beautiful fork combination I found in a recent game. Can you spot the winning move?',
      likes: 128,
      comments: 23,
      time: '5 hours ago',
      category: 'Tactics'
    },
    {
      id: 3,
      author: 'EndgameExpert',
      avatar: '♖',
      title: 'King and Pawn Endgame Study',
      content: 'Studied the Lucena position today. The concept of building a bridge is fascinating...',
      likes: 67,
      comments: 15,
      time: '1 day ago',
      category: 'Endgames'
    }
  ])

  const tournaments = [
    {
      id: 1,
      name: 'ChessM8 Championship 2024',
      date: 'Dec 28, 2024',
      prize: '$1000',
      participants: 256,
      status: 'Open',
      type: 'Rapid'
    },
    {
      id: 2,
      name: 'Weekend Blitz Arena',
      date: 'Dec 26, 2024',
      prize: '$500',
      participants: 128,
      status: 'Open',
      type: 'Blitz'
    },
    {
      id: 3,
      name: 'Beginner Friendly Tournament',
      date: 'Dec 30, 2024',
      prize: '$250',
      participants: 64,
      status: 'Open',
      type: 'Classical'
    }
  ]

  const leaderboard = [
    { rank: 1, name: 'Magnus_Carlsen', rating: 2847, country: '🇳🇴', games: 1523 },
    { rank: 2, name: 'Hikaru', rating: 2789, country: '🇺🇸', games: 2145 },
    { rank: 3, name: 'Fabiano', rating: 2768, country: '🇺🇸', games: 1876 },
    { rank: 4, name: 'Wesley_So', rating: 2753, country: '🇵🇭', games: 1987 },
    { rank: 5, name: 'Levon_Aronian', rating: 2745, country: '🇦🇲', games: 1654 },
  ]

  const handleLike = (postId) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, likes: post.likes + 1 }
        : post
    ))
    toast.success('Post liked!')
  }

  const handleJoinTournament = (tournamentId) => {
    toast.success('Successfully joined tournament!')
  }

  return (
    <div className="community-page">
      <div className="container">
        <motion.div
          className="community-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Community</h1>
          <p className="page-description">
            Connect with chess enthusiasts, share knowledge, and compete in tournaments
          </p>
        </motion.div>

        <div className="community-tabs">
          {['forums', 'tournaments', 'leaderboard'].map((tab) => (
            <motion.button
              key={tab}
              className={`tab-button ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {tab === 'forums' && '💬 Forums'}
              {tab === 'tournaments' && '🏆 Tournaments'}
              {tab === 'leaderboard' && '📊 Leaderboard'}
            </motion.button>
          ))}
        </div>

        <div className="community-content">
          {activeTab === 'forums' && (
            <motion.div
              className="forums-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="posts-grid">
                {posts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    className="post-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <div className="post-header">
                      <div className="author-info">
                        <span className="author-avatar">{post.avatar}</span>
                        <div>
                          <span className="author-name">{post.author}</span>
                          <span className="post-time">{post.time}</span>
                        </div>
                      </div>
                      <span className="post-category">{post.category}</span>
                    </div>
                    
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-content">{post.content}</p>
                    
                    <div className="post-actions">
                      <motion.button
                        className="action-button"
                        onClick={() => handleLike(post.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        ❤️ {post.likes}
                      </motion.button>
                      <button className="action-button">
                        💬 {post.comments}
                      </button>
                      <button className="action-button">
                        📤 Share
                      </button>
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
            >
              <div className="tournaments-grid">
                {tournaments.map((tournament, index) => (
                  <motion.div
                    key={tournament.id}
                    className="tournament-card"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5, scale: 1.02 }}
                  >
                    <div className="tournament-header">
                      <h3>{tournament.name}</h3>
                      <span className={`tournament-status ${tournament.status.toLowerCase()}`}>
                        {tournament.status}
                      </span>
                    </div>
                    
                    <div className="tournament-details">
                      <div className="detail-item">
                        <span className="detail-label">Date:</span>
                        <span className="detail-value">{tournament.date}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Prize:</span>
                        <span className="detail-value prize">{tournament.prize}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Type:</span>
                        <span className="detail-value">{tournament.type}</span>
                      </div>
                      <div className="detail-item">
                        <span className="detail-label">Participants:</span>
                        <span className="detail-value">{tournament.participants}/256</span>
                      </div>
                    </div>
                    
                    <motion.button
                      className="btn btn-primary"
                      onClick={() => handleJoinTournament(tournament.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Join Tournament
                    </motion.button>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'leaderboard' && (
            <motion.div
              className="leaderboard-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="leaderboard-table">
                <div className="table-header">
                  <span>Rank</span>
                  <span>Player</span>
                  <span>Country</span>
                  <span>Rating</span>
                  <span>Games</span>
                </div>
                {leaderboard.map((player, index) => (
                  <motion.div
                    key={player.rank}
                    className={`table-row ${index < 3 ? 'top-player' : ''}`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ x: 5 }}
                  >
                    <span className="rank-number">
                      {index < 3 ? ['🥇', '🥈', '🥉'][index] : player.rank}
                    </span>
                    <span className="player-name">{player.name}</span>
                    <span className="player-country">{player.country}</span>
                    <span className="player-rating">{player.rating}</span>
                    <span className="player-games">{player.games}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Community
