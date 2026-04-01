import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { API_BASE_URL } from '../config.js'

export default function AdminLogin() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })

      if (res.ok) {
        const data = await res.json()
        localStorage.setItem('admin_token', data.token)
        navigate('/admin', { replace: true })
      } else {
        setError('Incorrect administrator password.')
      }
    } catch (err) {
      setError('Connection to server failed.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f8f9fa] px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm rounded-[40px] bg-white p-12 shadow-[0_20px_50px_rgba(0,0,0,0.05)] text-center"
      >
        <div className="mb-8 flex justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-blue-50 text-blue-800">
             <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12l-1.5-3.5L16 12l-4-4-4 4 1.5 5.5L6 21zM9 9h6M9 6v3m6-3v3m-3-3v3" /></svg>
          </div>
        </div>
        
        <h1 className="text-2xl font-black text-gray-900 tracking-tight mb-2">Admin Portal</h1>
        <p className="text-sm text-gray-400 mb-10 font-medium tracking-wide">Enter your password to proceed.</p>

        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-2xl border-none bg-gray-50 px-6 py-4 text-center text-lg font-bold tracking-[0.3em] transition-all focus:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-100"
              autoFocus
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.p 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="text-xs font-bold text-red-500 uppercase tracking-widest"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-blue-800 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-xl transition-all hover:bg-blue-900 hover:scale-[1.02] active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Verifying...' : 'Authenticate'}
          </button>
        </form>
      </motion.div>
    </main>
  )
}
