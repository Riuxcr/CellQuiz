import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home')
    }, 2800) // Slightly longer to let the animation finish

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white selection:bg-blue-600">
      <div className="flex flex-col items-center gap-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="text-center"
        >
          <h1 className="text-[clamp(4rem,20vw,14rem)] font-black tracking-tighter text-[#111827] leading-none mb-4">
            CellStart<span className="text-blue-500 animate-pulse">.</span>
          </h1>
        </motion.div>

        {/* Minimalist Buffer / Loading Bar */}
        <div className="relative w-64 h-[4px] bg-gray-50 rounded-full overflow-hidden border border-gray-100/50">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[#111827] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2.2, ease: "easeInOut" }}
          />
        </div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-[10px] font-black uppercase tracking-[0.5em] text-[#111827]"
        >
          Replenishing What Time Takes
        </motion.p>
      </div>
    </main>
  )
}
