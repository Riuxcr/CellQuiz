import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { API_BASE_URL } from '../config.js'
import Logo from '../components/Logo.jsx'

export default function AdminAnalytics() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_token')
      const res = await axios.get(`${API_BASE_URL}/api/quiz/analytics`, {
        headers: { Authorization: token }
      })
      setData(res.data.data)
    } catch (err) {
      setError('Could not fetch analytics.')
    } finally {
      setLoading(false)
    }
  }

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-gray-50"><div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent" /></div>

  const funnelSteps = [
    { label: 'Started Quiz', count: data?.totalAttempts || 0, icon: '🚀' },
    { label: 'Question 1', count: data?.dropOffMap['0'] || 0, icon: '1️⃣' },
    { label: 'Question 2', count: data?.dropOffMap['1'] || 0, icon: '2️⃣' },
    { label: 'Question 3', count: data?.dropOffMap['2'] || 0, icon: '3️⃣' },
    { label: 'Question 4', count: data?.dropOffMap['3'] || 0, icon: '4️⃣' },
    { label: 'Question 5', count: data?.dropOffMap['4'] || 0, icon: '5️⃣' },
    { label: 'Question 6+', count: (data?.dropOffMap['5'] || 0) + (data?.dropOffMap['6'] || 0) + (data?.dropOffMap['7'] || 0), icon: '📈' },
    { label: 'Completed', count: data?.completions || 0, icon: '✅', highlight: true }
  ]

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <div className="w-full">
        
        {/* Header - Full Width */}
        <header className="px-10 py-12 md:px-16 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-[#fcfcfd]">
          <div>
            <h1 className="text-5xl font-black text-gray-900 tracking-tight leading-none mb-4">Quiz Funnel<span className="text-blue-600">.</span></h1>
            <p className="text-gray-400 font-bold uppercase tracking-[0.4em] text-[10px]">Real-time Performance Metrics</p>
          </div>
          <div className="flex gap-4">
             <Link to="/admin" className="px-6 py-3.5 rounded-2xl bg-white border border-gray-100 text-sm font-black uppercase tracking-widest text-[#111827] hover:bg-gray-50 transition-all active:scale-95 text-[10px]">View Leads List</Link>
             <button onClick={fetchAnalytics} className="px-8 py-3.5 rounded-2xl bg-blue-800 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-blue-900/10 hover:bg-black transition-all active:scale-95">Refresh Data</button>
          </div>
        </header>

        {/* Stats Row - Flat Integrated Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-gray-100">
            <StatCard label="Total Starts" value={data?.totalAttempts} sub="Unique visitors started" isFirst={true} />
            <StatCard label="Completions" value={data?.completions} sub="Final submissions" />
            <StatCard label="Conversion Rate" value={data?.totalAttempts > 0 ? `${((data.completions / data.totalAttempts) * 100).toFixed(1)}%` : '0%'} sub="Start to lead" />
            <StatCard label="Drop-off Rate" value={data?.totalAttempts > 0 ? `${(100 - (data.completions / data.totalAttempts) * 100).toFixed(1)}%` : '0%'} sub="Total funnel loss" color="text-red-500" />
        </div>

        {/* Funnel Section - Minimal Flat Design */}
        <div className="px-10 py-16 md:px-16">
           <h3 className="text-[10px] font-black text-gray-400 mb-16 uppercase tracking-[0.5em]">The Drop-off Funnel Analysis</h3>
           <div className="space-y-12 max-w-6xl">
              {funnelSteps.map((step, i) => (
                <FunnelBar 
                    key={i} 
                    label={step.label} 
                    count={step.count} 
                    icon={step.icon} 
                    percentage={data?.totalAttempts > 0 ? (step.count / data.totalAttempts) * 100 : 0}
                    highlight={step.highlight}
                />
              ))}
           </div>
        </div>
      </div>
    </div>
  )
}

function StatCard({ label, value, sub, color = "text-blue-800", isFirst }) {
    return (
        <div className={`p-10 md:p-16 border-r border-gray-100 last:border-r-0 ${isFirst ? 'md:pl-16' : ''} bg-white`}>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-300 block mb-4">{label}</span>
            <span className={`text-6xl font-black ${color} block leading-none`}>{value || 0}</span>
            <span className="text-xs font-bold text-gray-400 mt-6 block">{sub}</span>
        </div>
    )
}

function FunnelBar({ label, count, icon, percentage, highlight }) {
    return (
        <div className="group w-full">
            <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-6">
                    <span className="text-3xl opacity-80">{icon}</span>
                    <span className={`text-[12px] font-black uppercase tracking-[0.2em] ${highlight ? 'text-blue-800' : 'text-gray-400'}`}>{label}</span>
                </div>
                <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-black text-gray-900">{count}</span>
                    <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">Users</span>
                </div>
            </div>
            <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.max(percentage, 1)}%` }}
                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className={`h-full ${highlight ? 'bg-blue-800' : 'bg-blue-400'} rounded-full`}
                />
            </div>
        </div>
    )
}
