import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { toast } from 'react-hot-toast'

const Settings = () => {
  const { theme, toggleTheme } = useTheme()
  const [settings, setSettings] = useState({
    soundEnabled: true,
    animationsEnabled: true,
    autoAnalysis: false,
    boardTheme: 'modern',
    pieceStyle: 'classic',
    language: 'english',
    notifications: {
      gameInvites: true,
      tournaments: true,
      dailyPuzzles: true,
      friendRequests: true
    },
    privacy: {
      profilePublic: true,
      showRating: true,
      showStats: true
    }
  })

  const handleSettingChange = (category, setting, value) => {
    setSettings(prev => ({
      ...prev,
      [category]: typeof prev[category] === 'object' 
        ? { ...prev[category], [setting]: value }
        : value
    }))
    toast.success(`Setting updated successfully!`)
  }

  const resetSettings = () => {
    setSettings({
      soundEnabled: true,
      animationsEnabled: true,
      autoAnalysis: false,
      boardTheme: 'modern',
      pieceStyle: 'classic',
      language: 'english',
      notifications: {
        gameInvites: true,
        tournaments: true,
        dailyPuzzles: true,
        friendRequests: true
      },
      privacy: {
        profilePublic: true,
        showRating: true,
        showStats: true
      }
    })
    toast.success('Settings reset to default!')
  }

  return (
    <div className="settings-page">
      <div className="container">
        <motion.div
          className="settings-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Settings</h1>
          <p className="page-description">
            Customize your ChessM8 experience
          </p>
        </motion.div>

        <div className="settings-content">
          <div className="settings-grid">
            {/* General Settings */}
            <motion.div
              className="settings-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <h2>🎮 General</h2>
              <div className="setting-group">
                <div className="setting-item">
                  <label>Theme</label>
                  <button 
                    onClick={toggleTheme}
                    className="theme-selector"
                  >
                    <span className="theme-icon">
                      {theme === 'dark' ? '🌙' : '☀️'}
                    </span>
                    <span>{theme === 'dark' ? 'Dark Mode' : 'Light Mode'}</span>
                  </button>
                </div>
                
                <div className="setting-item">
                  <label>Language</label>
                  <select 
                    value={settings.language}
                    onChange={(e) => handleSettingChange('language', e.target.value)}
                    className="setting-select"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Español</option>
                    <option value="french">Français</option>
                    <option value="german">Deutsch</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>Board Theme</label>
                  <select 
                    value={settings.boardTheme}
                    onChange={(e) => handleSettingChange('boardTheme', e.target.value)}
                    className="setting-select"
                  >
                    <option value="classic">Classic</option>
                    <option value="modern">Modern</option>
                    <option value="wood">Wood</option>
                    <option value="marble">Marble</option>
                    <option value="glass">Glass</option>
                  </select>
                </div>

                <div className="setting-item">
                  <label>Piece Style</label>
                  <select 
                    value={settings.pieceStyle}
                    onChange={(e) => handleSettingChange('pieceStyle', e.target.value)}
                    className="setting-select"
                  >
                    <option value="classic">Classic</option>
                    <option value="unicode">Unicode</option>
                    <option value="metal">Metal</option>
                    <option value="minimal">Minimal</option>
                  </select>
                </div>
              </div>
            </motion.div>

            {/* Game Settings */}
            <motion.div
              className="settings-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <h2>♟️ Game</h2>
              <div className="setting-group">
                <div className="setting-item">
                  <label>Sound Effects</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.soundEnabled}
                      onChange={(e) => handleSettingChange('soundEnabled', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Animations</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.animationsEnabled}
                      onChange={(e) => handleSettingChange('animationsEnabled', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Auto Analysis</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.autoAnalysis}
                      onChange={(e) => handleSettingChange('autoAnalysis', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Show Coordinates</label>
                  <div className="toggle-switch">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Notifications */}
            <motion.div
              className="settings-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <h2>🔔 Notifications</h2>
              <div className="setting-group">
                <div className="setting-item">
                  <label>Game Invites</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications.gameInvites}
                      onChange={(e) => handleSettingChange('notifications', 'gameInvites', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Tournament Updates</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications.tournaments}
                      onChange={(e) => handleSettingChange('notifications', 'tournaments', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Daily Puzzles</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications.dailyPuzzles}
                      onChange={(e) => handleSettingChange('notifications', 'dailyPuzzles', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Friend Requests</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.notifications.friendRequests}
                      onChange={(e) => handleSettingChange('notifications', 'friendRequests', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Privacy */}
            <motion.div
              className="settings-card"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <h2>🔒 Privacy</h2>
              <div className="setting-group">
                <div className="setting-item">
                  <label>Public Profile</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.privacy.profilePublic}
                      onChange={(e) => handleSettingChange('privacy', 'profilePublic', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Show Rating</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.privacy.showRating}
                      onChange={(e) => handleSettingChange('privacy', 'showRating', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>

                <div className="setting-item">
                  <label>Show Statistics</label>
                  <div className="toggle-switch">
                    <input 
                      type="checkbox" 
                      checked={settings.privacy.showStats}
                      onChange={(e) => handleSettingChange('privacy', 'showStats', e.target.checked)}
                    />
                    <span className="toggle-slider"></span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          <div className="settings-actions">
            <motion.button
              onClick={resetSettings}
              className="btn btn-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🔄 Reset to Default
            </motion.button>
            
            <motion.button
              className="btn btn-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              💾 Save Changes
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Settings
