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
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [pathFilter, setPathFilter] = useState('') // '' (All), 'Skincare', 'Longevity'

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile && isSidebarOpen) setIsSidebarOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarOpen])

  useEffect(() => {
    fetchAnalytics()
    const interval = setInterval(fetchAnalytics, 30000)
    return () => clearInterval(interval)
  }, [pathFilter])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const res = await axios.get(`${API_BASE_URL}/api/quiz/analytics`, {
        headers: { Authorization: token },
        params: { goal: pathFilter }
      })
      setData(res.data.data)
    } catch (err) {
      setError('System sync failed.')
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
    { id: 'overview', label: 'Summary', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    )},
    { id: 'feed', label: 'Recent Activity', icon: (
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )},
    { id: 'drop-offs', label: 'User Steps', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
    )},
    { id: 'support', label: 'Help & Support', icon: (
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    )},
  ]

  return (
    <div className="flex h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-blue-100 overflow-hidden relative">
      
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isMobile && isSidebarOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[45]"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside 
        initial={false}
        animate={{ 
          width: isSidebarOpen ? 280 : (isMobile ? 0 : 80),
          x: isMobile && !isSidebarOpen ? -280 : 0
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`${isMobile ? 'fixed inset-y-0 left-0' : 'relative'} bg-white border-r border-gray-100 flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)] overflow-hidden`}
      >
        <div className="h-16 flex items-center px-6 min-w-[280px]">
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
                Admin<span className="text-blue-600">Panel</span>
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <div className="px-3 mt-4 min-w-[280px]">
          <button 
            onClick={fetchAnalytics}
            className={`w-full flex items-center justify-center gap-3 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-all rounded-[28px] overflow-hidden ${isSidebarOpen ? 'px-6 py-4' : 'h-14 w-14 p-0 ml-1.5'}`}
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            {isSidebarOpen && <span className="text-sm font-black text-gray-800 uppercase tracking-widest whitespace-nowrap">Refresh Data</span>}
          </button>
        </div>

        <nav className="flex-1 mt-8 space-y-1 px-3 min-w-[280px]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id)
                if (isMobile) setIsSidebarOpen(false)
              }}
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
                    Customer List
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          </div>
        </nav>

        <div className="mt-auto p-4 space-y-2 min-w-[280px]">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] text-red-500/60 hover:bg-red-50 hover:text-red-600 transition-all font-medium group"
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
        <header className="px-4 md:px-12 h-16 flex items-center justify-between sticky top-0 bg-[#f8f9fa]/90 backdrop-blur-xl z-40 border-b border-gray-100/50">
          <div className="flex items-center gap-4">
            {isMobile && !isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            )}
            <span className="hidden sm:inline text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Tracking Status</span>
            <div className="hidden sm:block h-4 w-[1px] bg-gray-200" />
            <div className="flex bg-gray-100 p-1 rounded-xl overflow-x-auto no-scrollbar max-w-[200px] sm:max-w-none">
               {['', 'Skincare', 'Longevity'].map(p => (
                 <button 
                  key={p} 
                  onClick={() => setPathFilter(p)}
                  className={`px-3 sm:px-4 py-1.5 rounded-lg text-[9px] sm:text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${pathFilter === p ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                 >
                   {p || 'All'}
                 </button>
               ))}
            </div>
          </div>
          
          <div className="flex items-center gap-3 sm:gap-6">
            <button onClick={() => navigate('/')} className="px-3 sm:px-5 py-2 rounded-full border border-gray-200 text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-gray-600 hover:bg-white hover:border-blue-600 transition-all shadow-sm">Front</button>
            <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-blue-600 flex items-center justify-center text-[10px] sm:text-xs font-black text-white shadow-lg shadow-blue-600/20">DP</div>
          </div>
        </header>

        <div className="p-4 sm:p-8 md:p-12 space-y-6 md:space-y-12 max-w-[1400px] mx-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div 
                key="summary"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                className="space-y-6 md:space-y-12"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                  <StatCard label="Total Visitors" value={data?.totalAttempts} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" /></svg>} delay={0.1} />
                  <StatCard label="Interested Users" value={data?.completions} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} delay={0.2} />
                  <StatCard label="Purchases" value={data?.totalConversions} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} highlight delay={0.3} />
                  <StatCard label="Conversion Rate" value={data?.completions > 0 ? `${((data.totalConversions / data.completions) * 100).toFixed(1)}%` : '0%'} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} delay={0.4} />
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 md:gap-10">
                   <section className="xl:col-span-3 bg-white p-6 md:p-12 rounded-3xl md:rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40">
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-14 gap-4">
                        <h3 className="text-lg md:text-xl font-black tracking-tight text-gray-900 flex items-center gap-3">
                           Visitor Journey 
                           <span className="text-[10px] text-blue-600 font-bold">({pathFilter || 'Overall'})</span>
                        </h3>
                        <div className="flex gap-4">
                           <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-blue-600" />
                              <span className="text-[9px] font-black uppercase text-gray-400">Normal</span>
                           </div>
                           <div className="flex items-center gap-2">
                              <span className="h-2 w-2 rounded-full bg-red-400" />
                              <span className="text-[9px] font-black uppercase text-gray-400">Critical Drop</span>
                           </div>
                        </div>
                      </div>
                      
                      <div className="space-y-10 md:space-y-14">
                        {[
                          { label: 'Started Quiz', count: data?.totalAttempts || 0, color: 'bg-blue-600' },
                          { label: 'Left Email', count: data?.completions || 0, color: 'bg-indigo-600' },
                          { label: 'Purchased', count: data?.totalConversions || 0, color: 'bg-emerald-500' }
                        ].map((step, i, arr) => {
                          const next = arr[i+1];
                          const dropoff = next ? step.count - next.count : 0;
                          const percentDrop = next ? ((dropoff / (step.count || 1)) * 100) : 0;
                          const isCritical = percentDrop > 30;

                          return (
                            <div key={i} className="relative group">
                               <div className="flex items-end justify-between mb-3 md:mb-4">
                                  <div>
                                    <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">{step.label}</p>
                                    <p className="text-2xl md:text-4xl font-black tracking-tighter text-gray-900">{step.count.toLocaleString()}</p>
                                  </div>
                                  <div className="text-right">
                                    <p className="text-[8px] md:text-[9px] font-black text-gray-300 uppercase tracking-widest mb-1">Percentage</p>
                                    <p className="text-xs md:text-sm font-bold text-gray-900">{((step.count / (data.totalAttempts || 1)) * 100).toFixed(1)}%</p>
                                  </div>
                               </div>
                               <div className="h-2 w-full bg-gray-50 rounded-full overflow-hidden">
                                  <motion.div 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step.count / (data.totalAttempts || 1)) * 100}%` }}
                                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.5 + (i * 0.1) }}
                                    className={`h-full ${isCritical ? 'bg-red-400' : step.color} rounded-full`}
                                  />
                               </div>
                               {next && (
                                 <motion.div 
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                                    className="absolute left-6 -bottom-8 md:-bottom-10 flex items-center gap-3"
                                  >
                                    <div className={`h-4 md:h-6 w-[1px] ${isCritical ? 'bg-red-200' : 'bg-gray-200'}`} />
                                    <div className="flex flex-col">
                                       <span className={`text-[8px] md:text-[9px] font-black uppercase tracking-widest ${isCritical ? 'text-red-500' : 'text-gray-400'}`}>
                                          {isCritical ? 'Critical Loss Point' : 'Abandonment'}
                                       </span>
                                       <span className="text-[9px] md:text-[10px] font-bold text-gray-600">-{percentDrop.toFixed(0)}% ({dropoff.toLocaleString()} people)</span>
                                    </div>
                                 </motion.div>
                               )}
                            </div>
                          )
                        })}
                      </div>
                   </section>

                   <section className="xl:col-span-2 space-y-6 md:space-y-10">
                      {/* Destination Split View */}
                      <div className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40">
                         <h3 className="text-lg md:text-xl font-black tracking-tight text-gray-900 mb-8 md:mb-10 italic">A/B Destination</h3>
                         <div className="space-y-6 md:space-y-8">
                            {[
                               { label: 'Direct Checkout', count: data?.destSplit?.checkout || 0, color: 'bg-purple-500' },
                               { label: 'Product Page', count: data?.destSplit?.product || 0, color: 'bg-blue-500' }
                            ].map((dest, i) => {
                               const total = (data?.destSplit?.checkout || 0) + (data?.destSplit?.product || 0);
                               const percent = total > 0 ? ((dest.count / total) * 100) : 0;
                               return (
                                 <div key={i} className="space-y-2 md:space-y-3">
                                    <div className="flex justify-between items-end">
                                       <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest text-gray-400">{dest.label}</span>
                                       <span className="text-lg md:text-xl font-black">{dest.count}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden">
                                       <motion.div 
                                          initial={{ width: 0 }} animate={{ width: `${percent}%` }}
                                          className={`h-full ${dest.color} rounded-full`}
                                       />
                                    </div>
                                 </div>
                               )
                            })}
                            
                            <div className="pt-6 border-t border-gray-50">
                               <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-gray-300 mb-2">Completion Drop-off</p>
                               <div className="flex items-center justify-between">
                                  <span className="text-[10px] md:text-xs font-bold text-gray-600">Results Abandonment</span>
                                  <span className="text-xs md:text-sm font-black text-red-500">
                                     {data?.completions > 0 ? (((data.completions - (data.destSplit?.checkout + data.destSplit?.product || 0)) / data.completions) * 100).toFixed(1) : 0}%
                                  </span>
                               </div>
                               <p className="text-[8px] md:text-[9px] text-gray-400 mt-1 italic">Finished quiz but didn't click any store link.</p>
                            </div>
                         </div>
                      </div>

                      {/* Top Answers */}
                      <div className="bg-white p-6 md:p-12 rounded-3xl md:rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40">
                        <h3 className="text-lg md:text-xl font-black tracking-tight text-gray-900 mb-8 md:mb-12 italic">Common Answers</h3>
                        <div className="space-y-8 md:space-y-10">
                          {Object.entries(data?.questionStats || {}).slice(0, 2).map(([key, stats]) => (
                            <div key={key} className="space-y-4 md:space-y-5">
                              <p className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-blue-600">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                              <div className="grid gap-2 md:gap-3">
                                  {Object.entries(stats).map(([opt, count]) => (
                                    <div key={opt} className="flex items-center justify-between p-3 md:p-4 rounded-2xl md:rounded-3xl bg-gray-50/50 border border-transparent hover:border-gray-100 hover:bg-white transition-all duration-300">
                                      <span className="text-[10px] md:text-xs font-bold text-gray-600">{opt}</span>
                                      <span className="text-xs md:text-sm font-black text-gray-900">{count}</span>
                                    </div>
                                  ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                   </section>
                </div>
              </motion.div>
            )}

            {activeTab === 'feed' && (
              <motion.div 
                key="recent"
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                className="max-w-4xl mx-auto space-y-4 md:space-y-6 pb-20"
              >
                  <div className="flex items-center justify-between mb-6 md:mb-10">
                    <h3 className="text-2xl md:text-3xl font-black tracking-tighter text-gray-900 italic">Recent Activity</h3>
                    <div className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-full bg-blue-50 text-[8px] md:text-[10px] font-black text-blue-600 uppercase tracking-widest">
                       <span className="h-1.5 w-1.5 rounded-full bg-blue-600 animate-ping" />
                       Live
                    </div>
                  </div>
                  
                  {data?.activityFeed?.map((item, i) => (
                    <motion.div 
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                        key={i} 
                        className="bg-white p-5 md:p-8 rounded-2xl md:rounded-[36px] shadow-[0_8px_30px_rgba(0,0,0,0.01)] border border-gray-100 flex items-center justify-between group hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
                    >
                        <div className="flex items-center gap-4 md:gap-8">
                            <div className={`h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-3xl flex items-center justify-center shadow-inner ${item.isCompleted ? 'bg-emerald-50 text-emerald-600 border border-emerald-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                              {item.conversionDestination === 'checkout' ? (
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                              ) : item.conversionDestination === 'product' ? (
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                              ) : item.isCompleted ? (
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                              ) : (
                                <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                              )}
                            </div>
                            <div>
                                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-1">
                                   {item.conversionDestination ? `Redirected to ${item.conversionDestination}` : item.isCompleted ? 'Quailified Lead' : `Step #${item.lastStep + 1}`}
                                </p>
                                <p className="text-sm md:text-lg font-black text-gray-900 tracking-tight">Visitor #{item.sessionId?.split('_')[1]?.substring(0,6) || item.sessionId?.substring(0,6)}</p>
                            </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] font-black text-gray-300 uppercase tracking-widest mb-1.5 hidden sm:block">TIME</p>
                          <p className="text-[10px] md:text-sm font-black text-gray-400 uppercase px-3 py-1 md:px-4 md:py-1.5 bg-gray-50 rounded-lg md:rounded-xl">{new Date(item.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        </div>
                    </motion.div>
                  ))}
              </motion.div>
            )}

            {activeTab === 'drop-offs' && (
               <motion.div 
                key="steps"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto space-y-6 md:space-y-8 pb-32"
               >
                   <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 md:mb-12 gap-4">
                      <h3 className="text-2xl md:text-4xl font-black tracking-tighter italic">Abandonment</h3>
                      <div className="px-4 py-1.5 rounded-full border border-gray-100 flex items-center gap-3">
                         <span className="h-2 w-2 rounded-full bg-red-400 animate-pulse" />
                         <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">Leaky Points</span>
                      </div>
                   </div>

                   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                      {Object.entries(data?.dropOffMap || {}).map(([idx, count], i) => {
                         const rate = data?.abandonmentRate?.[idx] || 0;
                         const isDangerous = rate > 25;
                         return (
                            <motion.div 
                              key={idx} 
                              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                              className={`bg-white p-6 md:p-10 rounded-3xl md:rounded-[40px] border shadow-[0_20px_60px_rgba(0,0,0,0.015)] flex flex-col justify-between h-56 md:h-72 transition-all duration-500 ${isDangerous ? 'border-red-100 ring-4 ring-red-50/50' : 'border-gray-50 hover:border-blue-100'}`}
                            >
                                <div className="flex items-center justify-between">
                                  <p className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] ${isDangerous ? 'text-red-500' : 'text-blue-600'}`}>Q {parseInt(idx) + 1}</p>
                                  <div className={`h-8 w-8 md:h-10 md:w-10 rounded-xl md:rounded-2xl flex items-center justify-center text-xs md:text-sm font-black ${isDangerous ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-300'}`}>#{parseInt(idx) + 1}</div>
                                </div>
                                <div>
                                  <div className="flex items-baseline gap-2">
                                     <p className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900">{rate}%</p>
                                     <p className={`text-[8px] md:text-[10px] font-black text-gray-300 uppercase`}>Lost</p>
                                  </div>
                                  <div className="flex items-center gap-2 mt-3 md:mt-4">
                                     <div className={`h-1 w-full bg-gray-50 rounded-full overflow-hidden`}>
                                        <div className={`h-full ${isDangerous ? 'bg-red-400' : 'bg-blue-600'}`} style={{ width: `${rate}%` }} />
                                     </div>
                                  </div>
                                </div>
                                <p className="text-[8px] md:text-[9px] font-black text-gray-400 uppercase tracking-widest">
                                   {count.toLocaleString()} visits ended here.
                                </p>
                            </motion.div>
                         )
                      })}
                   </div>
               </motion.div>
            )}

            {activeTab === 'support' && (
              <motion.div 
                key="help"
                initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }}
                className="max-w-5xl mx-auto space-y-10 md:space-y-16 pb-32"
              >
                <div className="text-center space-y-4">
                  <h3 className="text-3xl md:text-5xl font-black tracking-tighter text-gray-900">Help Center</h3>
                  <p className="text-sm md:text-lg font-bold text-gray-400 max-w-2xl mx-auto">Understanding our tracking engine.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                   <DocumentationCard 
                    step="01" 
                    title="Path Segments" 
                    desc="We segment users into 'Skincare' or 'Longevity' paths for comparison."
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>}
                   />
                   <DocumentationCard 
                    step="02" 
                    title="Destination Insight" 
                    desc="We track clicks to Product Page or Direct Checkout."
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
                   />
                   <DocumentationCard 
                    step="03" 
                    title="Critical Losses" 
                    desc="Questions with >25% abandonment are automatically flagged."
                    icon={<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>}
                   />
                </div>
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
      className={`p-6 md:p-10 rounded-3xl md:rounded-[48px] border ${highlight ? 'bg-[#1a1a1a] border-gray-800 shadow-2xl shadow-blue-900/10' : 'bg-white border-gray-100 shadow-[0_24px_80px_rgba(0,0,0,0.02)]'} group cursor-default hover:scale-[1.02] transition-all duration-500`}
    >
      <div className="flex items-center justify-between mb-6 md:mb-8">
        <span className={`text-2xl md:text-4xl ${highlight ? 'grayscale-0' : 'grayscale group-hover:grayscale-0 transition-all duration-700'}`}>{icon}</span>
        <div className={`h-6 w-6 md:h-8 md:w-8 rounded-full border flex items-center justify-center ${highlight ? 'border-gray-700' : 'border-gray-100'}`}>
            <svg className={`w-3 h-3 md:w-4 md:h-4 ${highlight ? 'text-white' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
        </div>
      </div>
      <div>
        <p className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.3em] mb-2 md:mb-3 ${highlight ? 'text-gray-500' : 'text-gray-400'}`}>{label}</p>
        <p className={`text-3xl md:text-5xl font-black tracking-tighter ${highlight ? 'text-white' : 'text-gray-900'}`}>{value || 0}</p>
      </div>
    </motion.div>
  )
}

function DocumentationCard({ step, title, desc, icon }) {
  return (
    <div className="bg-white p-8 md:p-12 rounded-3xl md:rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col items-start gap-6 md:gap-8 hover:shadow-xl transition-all duration-500 group">
       <div className="flex items-center justify-between w-full">
          <div className="h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-3xl bg-blue-50 text-blue-600 flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-500">
             {icon}
          </div>
          <span className="text-[9px] md:text-[10px] font-black text-gray-200 tracking-widest">{step}</span>
       </div>
       <div>
          <h4 className="text-lg md:text-xl font-black tracking-tight text-gray-900 mb-3 md:mb-4">{title}</h4>
          <p className="text-xs md:text-sm font-bold text-gray-400 leading-relaxed">{desc}</p>
       </div>
    </div>
  )
}
