import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { API_BASE_URL } from '../config.js'

export default function AdminAnalytics() {
  const navigate = useNavigate()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    fetchAnalytics()
    const interval = setInterval(fetchAnalytics, 30000)
    return () => clearInterval(interval)
  }, [])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const res = await axios.get(`${API_BASE_URL}/api/quiz/analytics`, {
        headers: { Authorization: token }
      })
      setData(res.data.data)
    } catch (err) {
      setError('Intelligence sync failed.')
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  if (loading && !data) return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
    </div>
  )

  const navItems = [
    { id: 'overview', label: 'Insights', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    )},
    { id: 'feed', label: 'Activity', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )},
    { id: 'drop-offs', label: 'Drop-offs', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
    )},
  ]

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-blue-100 overflow-hidden">
      
      {/* Gmail-style Persistent & Collapsible Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white border-r border-gray-100 flex flex-col relative z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        <div className="h-16 flex items-center px-6">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-3 rounded-full hover:bg-gray-100 text-gray-500 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
          </button>
          
          <AnimatePresence>
            {isSidebarOpen && (
              <motion.h1 
                initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}
                className="ml-4 text-xl font-black tracking-tighter text-gray-900 flex items-center gap-2 whitespace-nowrap"
              >
                Command<span className="text-blue-600">Center</span>
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <div className="px-3 mt-4">
          <button 
            onClick={fetchAnalytics}
            className={`w-full flex items-center justify-center gap-3 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-all rounded-[28px] overflow-hidden ${isSidebarOpen ? 'px-6 py-4' : 'h-14 w-14 p-0 ml-1.5'}`}
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            {isSidebarOpen && <span className="text-sm font-black text-gray-800 uppercase tracking-widest whitespace-nowrap">Sync Global</span>}
          </button>
        </div>

        <nav className="flex-1 mt-8 space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] transition-all group ${activeTab === item.id ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className={`flex-shrink-0 transition-transform duration-500 ${activeTab === item.id ? 'text-blue-600 scale-110' : 'text-gray-400 group-hover:text-gray-900 group-hover:scale-110'}`}>{item.icon}</span>
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-sm tracking-tight whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          ))}
          
          <div className="pt-8 mt-8 border-t border-gray-100">
            <Link
              to="/admin"
              className="w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] text-gray-500 hover:bg-gray-50 transition-all group"
            >
              <svg className="flex-shrink-0 w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:scale-110 transition-all duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
              <AnimatePresence>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="text-sm tracking-tight whitespace-nowrap"
                  >
                    Leads Portfolio
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </nav>

        <div className="mt-auto p-4 space-y-2">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] text-red-500/60 hover:bg-red-50 hover:text-red-600 transition-all font-medium transition-all group"
          >
            <svg className="w-5 h-5 flex-shrink-0 group-hover:scale-110 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
            <AnimatePresence>
              {isSidebarOpen && (
                <motion.span 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="text-sm whitespace-nowrap"
                >
                  Logout
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </motion.aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto relative">
        <header className="px-12 h-16 flex items-center justify-between sticky top-0 bg-[#f8f9fa]/90 backdrop-blur-xl z-40 border-b border-gray-100/50">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Database Engine</span>
            <div className="h-4 w-[1px] bg-gray-200" />
            <span className="text-sm font-bold text-gray-900">
               {activeTab === 'overview' ? 'Insights Overview' : activeTab === 'feed' ? 'Activity Log' : 'Drop-off Metrics'}
            </span>
          </div>
          
          <div className="flex items-center gap-6">
            <button onClick={() => navigate('/')} className="px-5 py-2 rounded-full border border-gray-200 text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-white hover:border-blue-600 transition-all shadow-sm">Client Portal</button>
            <div className="h-9 w-9 rounded-full bg-blue-600 flex items-center justify-center text-xs font-black text-white shadow-lg shadow-blue-600/20">DP</div>
          </div>
        </header>

        <div className="p-12 space-y-12 max-w-[1400px] mx-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="overview"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                className="space-y-12"
              >
                {/* iOS Standard Stat Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  <StatCard label="Live Traffic" value={data?.totalAttempts} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>} delay={0.1} />
                  <StatCard label="Qualified" value={data?.completions} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} delay={0.2} />
                  <StatCard label="Sales Path" value={data?.totalConversions} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} highlight delay={0.3} />
                  <StatCard label="Momentum" value={data?.completions > 0 ? `${((data.totalConversions / data.completions) * 100).toFixed(1)}%` : '0%'} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} delay={0.4} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-10">
                   {/* Funnel Design - Awwwards Inspiration */}
                   <section className="xl:col-span-3 bg-white p-12 rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40">
                      <div className="flex items-center justify-between mb-14">
                        <h3 className="text-xl font-black tracking-tight text-gray-900 flex items-center gap-3">
                           Funnel Conduit
                           <span className="h-1.5 w-1.5 rounded-full bg-blue-600" />
                        </h3>
                        <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-3 py-1.5 rounded-full">Precision Engine</span>
                      </div>
                      
                      <div className="space-y-14">
                        {[
                          { label: 'Visits Initiated', count: data?.totalAttempts || 0, color: 'bg-blue-600' },
                          { label: 'Leads Identified', count: data?.completions || 0, color: 'bg-indigo-600' },
                          { label: 'Final Conversion', count: data?.totalConversions || 0, color: 'bg-emerald-500' }
                        ].map((step, i, arr) => {
                          const next = arr[i+1];
                          const dropoff = next ? step.count - next.count : 0;
                          return (
                            <div key={i} className="relative group">
                               <div className="flex items-end justify-between mb-4">
                                  <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{step.label}</p>
                                    <p className="text-4xl font-black tracking-tighter text-gray-900">{step.count.toLocaleString()}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Efficiency</p>
                                    <p className="text-sm font-bold text-gray-900">{((step.count / (data.totalAttempts || 1)) * 100).toFixed(1)}%</p>
                                  </div>
                               </div>
                               <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step.count / (data.totalAttempts || 1)) * 100}%` }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 + (i * 0.1) }}
                                    className={`h-full ${step.color} rounded-full`}
                                  />
                               </div>
                               {next && (
                                 <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="absolute left-6 -bottom-10 flex items-center gap-3"
                                  >
                                    <div className="h-6 w-[1px] bg-red-100" />
                                    <span className="text-[9px] font-black uppercase tracking-widest text-red-400">Leakage: -{dropoff.toLocaleString()} participants</span>
                                 </motion.div>
                               )}
                            </div>
                          )
                        })}
                      </div>
                   </section>

                   {/* Data Points */}
                   <section className="xl:col-span-2 bg-white p-12 rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40">
                      <h3 className="text-xl font-black tracking-tight text-gray-900 mb-12 italic">User Logic</h3>
                      <div className="space-y-10">
                        {Object.entries(data?.questionStats || {}).slice(0, 3).map(([key, stats]) => (
                          <div key={key} className="space-y-5">
                            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                            <div className="grid gap-3">
                                {Object.entries(stats).map(([opt, count]) => (
                                  <div key={opt} className="flex items-center justify-between p-4 rounded-3xl bg-gray-50/50 border border-transparent hover:border-gray-100 hover:bg-white transition-all duration-300">
                                    <span className="text-xs font-bold text-gray-600">{opt}</span>
                                    <span className="text-sm font-black text-gray-900">{count}</span>
                                  </div>
                                ))}
                            </div>
                          </div>
                        ))}
                      </div>
                   </section>
                </div>
              </motion.div>
            )}

            {activeTab === 'feed' && (
              <motion.div 
                key="feed"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto space-y-6 pb-20"
              >
                  <div className="flex items-center justify-between mb-10">
                    <h3 className="text-3xl font-black tracking-tighter text-gray-900 italic">Global Stream</h3>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-[10px] font-black text-blue-600 uppercase tracking-widest">
                       <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping" />
                       Real-time Updates
                    </div>
                  </div>
                  
                  {data?.activityFeed?.map((item, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        key={i} 
                        className="bg-white p-8 rounded-[36px] shadow-[0_8px_30px_rgba(0,0,0,0.01)] border border-gray-100 flex items-center justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                    >
                        <div className="flex items-center gap-8">
                            <div className={`h-14 w-14 rounded-3xl flex items-center justify-center shadow-inner ${item.isCompleted ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                              {item.isCompleted ? (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                              ) : (
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                              )}
                            </div>
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1.5">{item.isCompleted ? 'Conversion Confirmed' : `Milestone #${item.lastStep + 1}`}</p>
                                <p className="text-lg font-black text-gray-900 tracking-tight">User Hash: <span className="text-blue-600">{item.sessionId.split('_')[1]}</span></p>
                            </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1.5">TIME RECEIVED</p>
                          <p className="text-sm font-black text-gray-400 uppercase px-4 py-1.5 bg-gray-50 rounded-xl">{new Date(item.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </motion.div>
                  ))}
              </motion.div>
            )}

            {activeTab === 'drop-offs' && (
               <motion.div 
                key="drop-offs"
                initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
               >
                   {Object.entries(data?.dropOffMap || {}).map(([idx, count], i) => (
                      <motion.div 
                        key={idx} 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="bg-white p-12 rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col justify-between h-72 group hover:shadow-2xl transition-all duration-700"
                      >
                          <div className="flex items-center justify-between">
                             <p className="text-[11px] font-black uppercase tracking-[0.3em] text-blue-600">Checkpoint {parseInt(idx) + 1}</p>
                             <div className="h-24 w-24 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner animate-bounce">
                                <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                             </div>
                          </div>
                          <div>
                             <p className="text-6xl font-black tracking-tighter text-gray-900 mb-3">{count.toLocaleString()}</p>
                             <div className="flex items-center gap-2">
                                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Active Retention Points</p>
                             </div>
                          </div>
                      </motion.div>
                   ))}
               </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  )
}

function StatCard({ label, value, icon, highlight, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      className={`p-10 rounded-[48px] border ${highlight ? 'bg-[#1a1a1a] border-gray-800 shadow-2xl shadow-blue-900/10' : 'bg-white border-gray-100 shadow-[0_24px_80px_rgba(0,0,0,0.02)]'} group cursor-default hover:scale-[1.02] transition-all duration-500`}
    >
      <div className="flex items-center justify-between mb-8">
        <span className={`text-4xl ${highlight ? 'grayscale-0' : 'grayscale group-hover:grayscale-0 transition-all duration-700'}`}>{icon}</span>
        <div className={`h-8 w-8 rounded-full border flex items-center justify-center ${highlight ? 'border-gray-700' : 'border-gray-100'}`}>
            <svg className={`w-4 h-4 ${highlight ? 'text-white' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        </div>
      </div>
      <div>
        <p className={`text-[11px] font-black uppercase tracking-[0.3em] mb-3 ${highlight ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
        <p className={`text-5xl font-black tracking-tighter ${highlight ? 'text-white' : 'text-gray-900'}`}>{value || 0}</p>
      </div>
    </motion.div>
  )
}
