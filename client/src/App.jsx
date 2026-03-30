import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import MetaPixelPageView from './components/MetaPixelPageView.jsx'
import Landing from './pages/Landing.jsx'
import Quiz from './pages/Quiz.jsx'
import Result from './pages/Result.jsx'
import AdminLeads from './pages/AdminLeads.jsx'
import Splash from './pages/Splash.jsx'

export default function App() {
  const location = useLocation()
  
  return (
    <div className="min-h-screen bg-white text-[#111827] font-sans antialiased selection:bg-gray-200 selection:text-black hover:cursor-default">
      <MetaPixelPageView />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Splash />} />
            <Route path="/home" element={<Landing />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<Result />} />
            <Route path="/admin" element={<AdminLeads />} />
          </Routes>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
