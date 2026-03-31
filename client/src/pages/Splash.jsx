import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Logo from '../components/Logo.jsx'

export default function Splash() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/home')
    }, 2800) // Slightly longer to let the animation finish

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white selection:bg-blue-600 selection:text-black">
      <div className="flex flex-col items-center gap-12 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex justify-center"
        >
          <Logo className="w-[min(320px,85vw)] h-auto" />
        </motion.div>

        <div className="relative w-64 h-[4px] rounded-full overflow-hidden border border-gray-100 bg-gray-50">
          <motion.div
            className="absolute top-0 left-0 h-full rounded-full bg-[#111827]"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.55 }}
          transition={{ delay: 1, duration: 1.5 }}
          className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400"
        >
          Replenishing What Time Takes
        </motion.p>
      </div>
    </main>
  )
}
