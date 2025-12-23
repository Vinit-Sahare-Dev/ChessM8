import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { toast } from 'react-hot-toast'

const ProfessionalLearn = () => {
  const { theme } = useTheme()
  const [selectedLevel, setSelectedLevel] = useState('beginner')
  const [selectedTopic, setSelectedTopic] = useState('openings')

  const levels = [
    { id: 'beginner', label: 'Beginner', icon: '🌱', description: 'Start your chess journey' },
    { id: 'intermediate', label: 'Intermediate', icon: '🎯', description: 'Improve your skills' },
    { id: 'advanced', label: 'Advanced', icon: '⚔️', description: 'Master advanced concepts' },
    { id: 'expert', label: 'Expert', icon: '👑', description: 'Become a chess master' }
  ]

  const topics = [
    { id: 'openings', label: 'Openings', icon: '🚀', lessons: 45 },
    { id: 'middlegame', label: 'Middlegame', icon: '⚔️', lessons: 38 },
    { id: 'endgame', label: 'Endgame', icon: '🏁', lessons: 32 },
    { id: 'tactics', label: 'Tactics', icon: '🎯', lessons: 67 },
    { id: 'strategy', label: 'Strategy', icon: '🧠', lessons: 29 },
    { id: 'puzzles', label: 'Puzzles', icon: '🧩', lessons: 150 }
  ]

  const featuredLessons = [
    {
      id: 1,
      title: 'Master the Italian Opening',
      level: 'Beginner',
      duration: '15 min',
      rating: 4.8,
      students: 12500,
      image: '🏰'
    },
    {
      id: 2,
      title: 'Tactical Patterns: Forks',
      level: 'Intermediate',
      duration: '20 min',
      rating: 4.9,
      students: 8900,
      image: '🔱'
    },
    {
      id: 3,
      title: 'Endgame Fundamentals',
      level: 'Beginner',
      duration: '25 min',
      rating: 4.7,
      students: 15600,
      image: '🏁'
    },
    {
      id: 4,
      title: 'Positional Chess Mastery',
      level: 'Advanced',
      duration: '30 min',
      rating: 4.9,
      students: 5400,
      image: '👑'
    }
  ]

  return (
    <div className="professional-learn">
      {/* Header */}
      <section className="learn-hero">
        <div className="container">
          <motion.div
            className="learn-hero-content"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="learn-hero-title"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Master Chess with <span className="highlight">Expert Lessons</span>
            </motion.h1>
            
            <motion.p 
              className="learn-hero-subtitle"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Learn from grandmasters with interactive lessons, puzzles, and personalized training plans.
              Track your progress and improve your chess skills step by step.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Level Selection */}
      <section className="level-selection">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Choose Your Skill Level
          </motion.h2>
          
          <div className="levels-grid">
            {levels.map((level, index) => (
              <motion.div
                key={level.id}
                className={`level-card ${selectedLevel === level.id ? 'active' : ''}`}
                onClick={() => setSelectedLevel(level.id)}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="level-icon">{level.icon}</div>
                <h3 className="level-title">{level.label}</h3>
                <p className="level-description">{level.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Topics */}
      <section className="topics-section">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Explore Chess Topics
          </motion.h2>
          
          <div className="topics-grid">
            {topics.map((topic, index) => (
              <motion.div
                key={topic.id}
                className={`topic-card ${selectedTopic === topic.id ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic.id)}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="topic-icon">{topic.icon}</div>
                <h3 className="topic-title">{topic.label}</h3>
                <p className="topic-lessons">{topic.lessons} Lessons</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Lessons */}
      <section className="featured-lessons">
        <div className="container">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            Featured Lessons
          </motion.h2>
          
          <div className="lessons-grid">
            {featuredLessons.map((lesson, index) => (
              <motion.div
                key={lesson.id}
                className="lesson-card"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <div className="lesson-image">{lesson.image}</div>
                <div className="lesson-content">
                  <h3 className="lesson-title">{lesson.title}</h3>
                  <div className="lesson-meta">
                    <span className="lesson-level">{lesson.level}</span>
                    <span className="lesson-duration">{lesson.duration}</span>
                  </div>
                  <div className="lesson-stats">
                    <div className="lesson-rating">
                      ⭐ {lesson.rating}
                    </div>
                    <div className="lesson-students">
                      👥 {lesson.students.toLocaleString()}
                    </div>
                  </div>
                  <motion.button
                    className="professional-btn professional-btn-small"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toast.success(`Starting: ${lesson.title}`)}
                  >
                    Start Learning
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProfessionalLearn
