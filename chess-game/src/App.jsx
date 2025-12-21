import React, { Suspense, lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Toaster } from 'react-hot-toast'
import { useTheme } from './hooks/useTheme'
import LoadingSpinner from './components/ui/LoadingSpinner'
import ProfessionalNavbar from './components/ProfessionalNavbar'
import ProfessionalFooter from './components/ProfessionalFooter'
import ErrorBoundary from './components/ui/ErrorBoundary'

// Lazy load pages for better performance
const Home = lazy(() => import('./components/ProfessionalHome'))
const Play = lazy(() => import('./components/ProfessionalPlay'))
const Learn = lazy(() => import('./pages/Learn'))
const Community = lazy(() => import('./pages/Community'))
const Profile = lazy(() => import('./pages/Profile'))
const Settings = lazy(() => import('./pages/Settings'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Page transition animation
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.4
}

function App() {
  const { theme } = useTheme()

  return (
    <div className="app" data-theme={theme}>
      <ErrorBoundary>
        <div className="app-container">
          <ProfessionalNavbar />
          
          <main className="main-content">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={
                  <motion.div
                    key="home"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingSpinner />}>
                      <Home />
                    </Suspense>
                  </motion.div>
                } />
                
                <Route path="/play" element={
                  <motion.div
                    key="play"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingSpinner />}>
                      <Play />
                    </Suspense>
                  </motion.div>
                } />
                
                <Route path="/learn" element={
                  <motion.div
                    key="learn"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingSpinner />}>
                      <Learn />
                    </Suspense>
                  </motion.div>
                } />
                
                <Route path="/community" element={
                  <motion.div
                    key="community"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingSpinner />}>
                      <Community />
                    </Suspense>
                  </motion.div>
                } />
                
                <Route path="/profile" element={
                  <motion.div
                    key="profile"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingSpinner />}>
                      <Profile />
                    </Suspense>
                  </motion.div>
                } />
                
                <Route path="/settings" element={
                  <motion.div
                    key="settings"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingSpinner />}>
                      <Settings />
                    </Suspense>
                  </motion.div>
                } />
                
                <Route path="/404" element={
                  <motion.div
                    key="notfound"
                    variants={pageVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={pageTransition}
                  >
                    <Suspense fallback={<LoadingSpinner />}>
                      <NotFound />
                    </Suspense>
                  </motion.div>
                } />
                
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </AnimatePresence>
          </main>
          
          <ProfessionalFooter />
        </div>
        
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: 'rgba(15, 23, 42, 0.9)',
              color: '#ffffff',
              border: '1px solid rgba(43, 108, 176, 0.3)',
              borderRadius: '12px',
              fontSize: '14px',
              fontWeight: '500',
              backdropFilter: 'blur(10px)',
            },
          }}
        />
      </ErrorBoundary>
    </div>
  )
}

export default App
