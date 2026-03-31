import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { motion } from 'framer-motion'
import { trackFbq } from '../utils/fbq.js'
import Logo from '../components/Logo.jsx'

const API_TEST_URL = '/api/test'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
  },
}

export default function Landing() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-white selection:bg-blue-600 selection:text-white">
      {/* Background Section (Full Width) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/hero-bg.jpeg" 
          alt="Chrono NAD+ Hero" 
          className="h-full w-full object-cover object-center lg:object-[center_right]"
        />
        {/* Blue Gradient Overlay on the Left (Matching Reference) */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/40 to-transparent" />
      </div>

      {/* Centered Top Header - Moved Up */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 px-8 pt-6 pb-4 md:px-12 md:pt-8 text-left"
      >
        <div className="inline-flex rounded-xl md:rounded-2xl border border-white/30 bg-white/15 px-3 py-2 shadow-lg shadow-black/20 backdrop-blur-md md:px-4 md:py-2.5">
          <Logo className="h-9 w-auto md:h-11 drop-shadow-md" />
        </div>
      </motion.header>

      {/* Hero Content Overlaid on the Left - Moved Up */}
      <motion.div
        className="relative z-10 flex min-h-[calc(100vh-120px)] flex-col justify-start pt-12 md:pt-20 lg:pt-32 px-8 md:px-20 lg:px-32 max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div 
          variants={itemVariants}
          className="max-w-[85%] lg:max-w-4xl"
        >
          <h1 className="text-[clamp(1.5rem,3.5vw,2.75rem)] font-extrabold tracking-tight text-white leading-[1.1] drop-shadow-lg mb-8 uppercase">
             ChronoNAD+<span className="text-blue-400">™</span> was created to boost and maintain optimal NAD+ levels at the cellular source.
          </h1>
          
          <p className="text-[clamp(1rem,1.5vw,1.25rem)] font-medium leading-[1.6] text-blue-50/90 mb-10 drop-shadow-sm max-w-2xl">
            NAD+ is an essential coenzyme that plays a vital role in energy production and repair, supporting healthy aging and whole-body health at the cellular level. Take our quiz to find the right ChronoNAD+ protocol for you.
          </p>

          <motion.div 
            variants={itemVariants} 
            className="flex flex-col items-start gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.3)' }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="rounded-full bg-white px-14 py-6 text-xl font-bold text-blue-900 shadow-2xl transition-all"
              onClick={() => {
                trackFbq('InitiateCheckout')
                navigate('/quiz')
              }}
            >
              Start the quiz
            </motion.button>
            <div className="flex items-center gap-2 mt-4 text-blue-100/80 font-bold px-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs uppercase tracking-[0.2em] drop-shadow-md">Takes 3 minutes</span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Trust Reel */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-24 left-1/2 -translate-x-1/2 w-full px-6 z-20"
      >
        <div className="flex flex-wrap justify-center items-center gap-x-4 md:gap-x-8 gap-y-3 max-w-5xl mx-auto py-4 border-t border-b border-white/10 text-white/40 text-[clamp(7px,1vw,10px)] font-black tracking-[0.2em] uppercase text-center bg-blue-900/10 backdrop-blur-sm rounded-2xl">
          <span>cGMP Certified</span>
          <span className="opacity-20 hidden md:block">•</span>
          <span>Clinically Tested</span>
          <span className="opacity-20 hidden md:block">•</span>
          <span>Made in USA</span>
          <span className="opacity-20 hidden md:block">•</span>
          <span>Non GMO</span>
          <span className="opacity-20 hidden md:block">•</span>
          <span>Sugar Free</span>
          <span className="opacity-20 hidden md:block">•</span>
          <span>Vegan Friendly</span>
        </div>
      </motion.div>

    </main>
  )
}

