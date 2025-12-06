import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../hooks/useTheme'
import { toast } from 'react-hot-toast'

const Learn = () => {
  const { theme } = useTheme()
  const [selectedTopic, setSelectedTopic] = useState('basics')
  const [completedLessons, setCompletedLessons] = useState([])

  const topics = [
    {
      id: 'basics',
      title: 'Chess Basics',
      icon: '📚',
      description: 'Learn the fundamental rules and movements',
      lessons: [
        { id: 1, title: 'Board Setup', duration: '5 min', completed: true },
        { id: 2, title: 'Piece Movements', duration: '15 min', completed: true },
        { id: 3, title: 'Special Rules', duration: '10 min', completed: false },
        { id: 4, title: 'Check and Checkmate', duration: '12 min', completed: false },
      ]
    },
    {
      id: 'tactics',
      title: 'Tactics & Strategy',
      icon: '⚔️',
      description: 'Master tactical patterns and strategic thinking',
      lessons: [
        { id: 5, title: 'Forks', duration: '8 min', completed: false },
        { id: 6, title: 'Pins', duration: '10 min', completed: false },
        { id: 7, title: 'Skewers', duration: '8 min', completed: false },
        { id: 8, title: 'Discovered Attacks', duration: '12 min', completed: false },
      ]
    },
    {
      id: 'openings',
      title: 'Opening Theory',
      icon: '🎯',
      description: 'Explore popular chess openings',
      lessons: [
        { id: 9, title: 'Italian Game', duration: '15 min', completed: false },
        { id: 10, title: 'Ruy Lopez', duration: '20 min', completed: false },
        { id: 11, title: 'Sicilian Defense', duration: '18 min', completed: false },
        { id: 12, title: 'French Defense', duration: '15 min', completed: false },
      ]
    },
    {
      id: 'endgames',
      title: 'Endgame Mastery',
      icon: '🏁',
      description: 'Learn essential endgame techniques',
      lessons: [
        { id: 13, title: 'King and Pawn', duration: '12 min', completed: false },
        { id: 14, title: 'Rook Endgames', duration: '15 min', completed: false },
        { id: 15, title: 'Queen Endgames', duration: '10 min', completed: false },
        { id: 16, title: 'Basic Checkmates', duration: '8 min', completed: false },
      ]
    }
  ]

  const handleLessonClick = (lesson) => {
    if (lesson.completed) {
      toast.success('Reviewing lesson: ' + lesson.title)
    } else {
      toast('Starting lesson: ' + lesson.title)
      setCompletedLessons(prev => [...prev, lesson.id])
    }
  }

  const getProgress = (topic) => {
    const completed = topic.lessons.filter(l => l.completed).length
    return (completed / topic.lessons.length) * 100
  }

  return (
    <div className="learn-page">
      <div className="container">
        <motion.div
          className="learn-header"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="page-title">Learn Chess</h1>
          <p className="page-description">
            Master chess from basics to advanced strategies with interactive lessons
          </p>
        </motion.div>

        <div className="learn-content">
          <div className="topics-sidebar">
            {topics.map((topic) => (
              <motion.button
                key={topic.id}
                className={`topic-button ${selectedTopic === topic.id ? 'active' : ''}`}
                onClick={() => setSelectedTopic(topic.id)}
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="topic-icon">{topic.icon}</span>
                <div className="topic-info">
                  <span className="topic-title">{topic.title}</span>
                  <span className="topic-progress">
                    {Math.round(getProgress(topic))}%
                  </span>
                </div>
              </motion.button>
            ))}
          </div>

          <div className="lessons-content">
            {topics
              .filter(topic => topic.id === selectedTopic)
              .map(topic => (
                <motion.div
                  key={topic.id}
                  className="topic-section"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="topic-header">
                    <h2>{topic.icon} {topic.title}</h2>
                    <p>{topic.description}</p>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill"
                        style={{ width: `${getProgress(topic)}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="lessons-grid">
                    {topic.lessons.map((lesson, index) => (
                      <motion.div
                        key={lesson.id}
                        className={`lesson-card ${lesson.completed ? 'completed' : ''}`}
                        onClick={() => handleLessonClick(lesson)}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="lesson-header">
                          <h3>{lesson.title}</h3>
                          {lesson.completed && (
                            <span className="completed-badge">✓</span>
                          )}
                        </div>
                        <div className="lesson-meta">
                          <span className="lesson-duration">⏱️ {lesson.duration}</span>
                          <span className="lesson-status">
                            {lesson.completed ? 'Completed' : 'Start'}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Learn
