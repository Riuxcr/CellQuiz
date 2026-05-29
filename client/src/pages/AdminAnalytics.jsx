import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { API_BASE_URL } from '../config.js'

export default function AdminAnalytics() {
  const navigate = useNavigate()
  const location = useLocation()
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeTab, setActiveTab] = useState(() => {
     const params = new URLSearchParams(window.location.search)
     return params.get('tab') || 'overview'
  })
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)
  const [pathFilter, setPathFilter] = useState('') // '' (All), 'Skincare', 'Longevity'

  const [promoStartDate, setPromoStartDate] = useState('')
  const [promoEndDate, setPromoEndDate] = useState('')
  const [promoUtmSource, setPromoUtmSource] = useState('')
  const [promoUtmCampaign, setPromoUtmCampaign] = useState('')

  useEffect(() => {
     const params = new URLSearchParams(location.search)
     const tab = params.get('tab') || 'overview'
     if (tab !== activeTab) {
        setActiveTab(tab)
     }
  }, [location.search])

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
  }, [pathFilter, promoStartDate, promoEndDate, promoUtmSource, promoUtmCampaign])

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('admin_token')
      const res = await axios.get(`${API_BASE_URL}/api/quiz/analytics`, {
        headers: { Authorization: token },
        params: { 
          goal: pathFilter,
          promoStartDate,
          promoEndDate,
          promoUtmSource,
          promoUtmCampaign
        }
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
    { id: 'leads', label: 'Customer List', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    ), path: '/admin' },
    { id: 'feed', label: 'Recent Activity', icon: (
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
    )},
    { id: 'drop-offs', label: 'User Steps', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" /></svg>
    )},
    { id: 'promo', label: 'Feel Young Stats', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg>
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
                className="ml-4 text-xl font-black tracking-tighter text-gray-900 whitespace-nowrap"
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
                if (item.path) {
                  navigate(item.path)
                } else {
                  setActiveTab(item.id)
                }
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

            {activeTab === 'promo' && (() => {
               const promoData = data?.promoStats?.feelYoung || {
                  totalViews: 0,
                  uniqueViews: 0,
                  totalClicks: 0,
                  totalPageClicks: 0,
                  totalModuleClicks: 0,
                  totalBuyNowClicks: 0,
                  uniqueClickers: 0,
                  uniqueModuleClickers: 0,
                  uniqueBuyNowClickers: 0
               };

               const allCampaigns = (data?.promoStats?.allCampaigns || []).filter(camp => camp !== 'feel_young_promo');
               const allSources = data?.promoStats?.allSources || [];

               const conversionRate = promoData.uniqueViews > 0 
                  ? ((promoData.uniqueBuyNowClickers / promoData.uniqueViews) * 100).toFixed(1)
                  : '0.0';

               const funnelSteps = [
                  { 
                     label: '1. Landed on Page', 
                     value: promoData.uniqueViews, 
                     percent: 100, 
                     color: 'bg-blue-600', 
                     desc: 'Unique visitor sessions loaded the landing page' 
                  },
                  { 
                     label: '2. General Engagement', 
                     value: promoData.uniqueClickers, 
                     percent: promoData.uniqueViews > 0 ? Math.round((promoData.uniqueClickers / promoData.uniqueViews) * 100) : 0, 
                     color: 'bg-indigo-600', 
                     desc: 'Users who made at least one click/interaction' 
                  },
                  { 
                     label: '3. Module Interactions', 
                     value: promoData.uniqueModuleClickers, 
                     percent: promoData.uniqueViews > 0 ? Math.round((promoData.uniqueModuleClickers / promoData.uniqueViews) * 100) : 0, 
                     color: 'bg-purple-600', 
                     desc: 'Users who interacted with accordions, reviews, or FAQs' 
                  },
                  { 
                     label: '4. Buy Now Redirection', 
                     value: promoData.uniqueBuyNowClickers, 
                     percent: promoData.uniqueViews > 0 ? Math.round((promoData.uniqueBuyNowClickers / promoData.uniqueViews) * 100) : 0, 
                     color: 'bg-emerald-600', 
                     desc: 'Users who clicked a pack and redirected to Shopify Checkout' 
                  }
               ];

               return (
                  <motion.div
                     key="promo-stats"
                     initial={{ opacity: 0, y: 15 }}
                     animate={{ opacity: 1, y: 0 }}
                     exit={{ opacity: 0, y: -15 }}
                     className="space-y-8 md:space-y-12 pb-32"
                  >
                     {/* Campaign Title Banner */}
                     <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_4px_24px_rgba(0,0,0,0.01)] border border-gray-100/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div>
                           <h3 className="text-xl md:text-2xl font-black text-gray-900">Feel Young Promo Campaign</h3>
                           <p className="text-xs md:text-sm text-gray-400 mt-1">Track Vercel landing page views and outbound Shopify checkout clicks</p>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                           <span className="text-[10px] font-black uppercase text-gray-400">Platform Active Filters:</span>
                           {promoUtmSource && (
                              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-3 py-1 rounded-full border border-blue-100">
                                 Source: {promoUtmSource === 'meta' ? 'Meta Ads' : promoUtmSource.toUpperCase()}
                              </span>
                           )}
                           {promoUtmCampaign && (
                              <span className="bg-indigo-50 text-indigo-600 text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-100">
                                 Campaign: {promoUtmCampaign}
                              </span>
                           )}
                           {(promoStartDate || promoEndDate) && (
                              <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-3 py-1 rounded-full border border-emerald-100">
                                 📅 {promoStartDate || '...'} to {promoEndDate || '...'}
                              </span>
                           )}
                           {!promoUtmSource && !promoUtmCampaign && !promoStartDate && !promoEndDate && (
                              <span className="bg-gray-50 text-gray-400 text-[10px] font-bold px-3 py-1 rounded-full border border-gray-100">
                                 None (All Traffic)
                              </span>
                           )}
                        </div>
                     </div>

                     {/* Sleek Filter Control Panel */}
                     <div className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {/* Start Date */}
                        <div className="flex flex-col gap-2">
                           <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Start Date</span>
                           <input 
                              type="date" 
                              value={promoStartDate} 
                              onChange={(e) => setPromoStartDate(e.target.value)} 
                              className="w-full px-4 py-3 rounded-xl border border-gray-100 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-gray-50/50 hover:bg-white transition-all cursor-pointer"
                           />
                        </div>

                        {/* End Date */}
                        <div className="flex flex-col gap-2">
                           <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">End Date</span>
                           <input 
                              type="date" 
                              value={promoEndDate} 
                              onChange={(e) => setPromoEndDate(e.target.value)} 
                              className="w-full px-4 py-3 rounded-xl border border-gray-100 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-gray-50/50 hover:bg-white transition-all cursor-pointer"
                           />
                        </div>

                        {/* Ads Source */}
                        <div className="flex flex-col gap-2">
                           <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Ad Platform</span>
                           <select 
                              value={promoUtmSource} 
                              onChange={(e) => setPromoUtmSource(e.target.value)} 
                              className="w-full px-4 py-3 rounded-xl border border-gray-100 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-gray-50/50 hover:bg-white transition-all cursor-pointer"
                           >
                              <option value="">All Platforms</option>
                              <option value="meta">Meta Ads Only (Facebook/Instagram)</option>
                              {allSources.filter(s => typeof s === 'string' && !['facebook', 'instagram', 'meta', 'fb', 'ig'].includes(s.toLowerCase())).map(src => (
                                 <option key={src} value={src}>{src.toUpperCase()}</option>
                              ))}
                           </select>
                        </div>

                        {/* Campaigns */}
                        <div className="flex flex-col gap-2">
                           <span className="text-[10px] font-black uppercase tracking-wider text-gray-400">Ad Campaign</span>
                           <select 
                              value={promoUtmCampaign} 
                              onChange={(e) => setPromoUtmCampaign(e.target.value)} 
                              className="w-full px-4 py-3 rounded-xl border border-gray-100 text-sm font-medium focus:ring-2 focus:ring-blue-600 focus:outline-none bg-gray-50/50 hover:bg-white transition-all cursor-pointer"
                           >
                              <option value="">All Campaigns</option>
                              {allCampaigns.map(camp => (
                                 <option key={camp} value={camp}>{camp}</option>
                              ))}
                           </select>
                        </div>

                        {/* Reset Filters Option if any filter is active */}
                        {(promoStartDate || promoEndDate || promoUtmSource || promoUtmCampaign) && (
                           <div className="sm:col-span-2 lg:col-span-4 flex justify-end">
                              <button 
                                 onClick={() => {
                                    setPromoStartDate('');
                                    setPromoEndDate('');
                                    setPromoUtmSource('');
                                    setPromoUtmCampaign('');
                                 }}
                                 className="px-5 py-2.5 bg-red-50 text-red-600 text-xs font-black uppercase tracking-wider rounded-full hover:bg-red-100 transition-all flex items-center gap-2"
                              >
                                 <span>Clear Filters</span>
                                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                              </button>
                           </div>
                        )}
                     </div>

                     {/* Stats Grid */}
                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        <StatCard 
                           label="Total Impressions" 
                           value={promoData.totalViews.toLocaleString()} 
                           icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>} 
                           delay={0.1} 
                        />
                        <StatCard 
                           label="Unique Visitors" 
                           value={promoData.uniqueViews.toLocaleString()} 
                           icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>} 
                           delay={0.2} 
                        />
                        <StatCard 
                           label="Buy Now Clicks" 
                           value={promoData.totalBuyNowClicks.toLocaleString()} 
                           icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} 
                           highlight 
                           delay={0.3} 
                        />
                        <StatCard 
                           label="Checkout CTR" 
                           value={`${conversionRate}%`} 
                           icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>} 
                           delay={0.4} 
                        />
                     </div>

                     {/* Funnel & Feed Grid */}
                     <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 md:gap-10">
                        {/* Funnel Visualizer */}
                        <section className="xl:col-span-3 bg-white p-6 md:p-12 rounded-3xl md:rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40">
                           <div className="mb-8 md:mb-12">
                              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Campaign Flow</h4>
                              <h3 className="text-xl md:text-3xl font-black tracking-tight text-gray-900">Conversion Funnel</h3>
                           </div>

                           <div className="space-y-6">
                              {funnelSteps.map((step, idx) => (
                                 <div key={idx} className="space-y-2">
                                    <div className="flex justify-between items-end">
                                       <div>
                                          <span className="text-sm font-black text-gray-800">{step.label}</span>
                                          <p className="text-[10px] text-gray-400 mt-0.5">{step.desc}</p>
                                       </div>
                                       <div className="text-right">
                                          <span className="text-lg font-black text-gray-900">{step.value.toLocaleString()}</span>
                                          <span className="text-xs font-bold text-gray-400 ml-2">({step.percent}%)</span>
                                       </div>
                                    </div>
                                    <div className="h-3 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/30">
                                       <motion.div
                                          initial={{ width: 0 }}
                                          animate={{ width: `${step.percent}%` }}
                                          transition={{ duration: 1, ease: 'easeOut', delay: idx * 0.1 }}
                                          className={`h-full ${step.color} rounded-full`}
                                       />
                                    </div>
                                 </div>
                              ))}
                           </div>
                        </section>

                        {/* Recent Activity Feed */}
                        <section className="xl:col-span-2 bg-white p-6 md:p-12 rounded-3xl md:rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40 flex flex-col max-h-[500px]">
                           <div className="mb-6">
                              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Real-Time Tracking</h4>
                              <h3 className="text-xl md:text-3xl font-black tracking-tight text-gray-900">Live Interactions</h3>
                           </div>

                           <div className="flex-1 overflow-y-auto pr-2 space-y-4 no-scrollbar">
                              {data?.promoStats?.recentActivity && data.promoStats.recentActivity.length > 0 ? (
                                 data.promoStats.recentActivity
                                    .filter(e => e && e.page === 'feel-young')
                                    .map((event, idx) => {
                                       const isBuyNow = event.element === 'buy_now';
                                       const isVisit = event.element === 'page_view';
                                       const isSection = event.element === 'section_view';
                                       const dateObj = event.createdAt ? new Date(event.createdAt) : null;
                                       const timeStr = dateObj && !isNaN(dateObj.getTime()) ? dateObj.toLocaleTimeString([], { 
                                          hour: '2-digit', 
                                          minute: '2-digit',
                                          second: '2-digit'
                                       }) : 'Unknown';

                                       return (
                                          <div 
                                             key={idx} 
                                             className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100/40"
                                          >
                                             <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 text-lg ${
                                                isBuyNow 
                                                   ? 'bg-emerald-50 text-emerald-600' 
                                                   : isSection 
                                                      ? 'bg-amber-50 text-amber-600'
                                                      : isVisit 
                                                         ? 'bg-blue-50 text-blue-600' 
                                                         : 'bg-indigo-50 text-indigo-600'
                                             }`}>
                                                {isBuyNow ? '🛍️' : isSection ? '⏱️' : isVisit ? '👁️' : '🖱️'}
                                             </div>
                                             <div className="min-w-0 flex-grow">
                                                <div className="flex items-center justify-between gap-2">
                                                   <span className="text-[10px] font-black uppercase text-gray-400">
                                                      Feel Young
                                                   </span>
                                                   <span className="text-[9px] font-bold text-gray-300">{timeStr}</span>
                                                </div>
                                                <p className="text-xs font-black text-gray-800 mt-1 truncate">
                                                   {isBuyNow 
                                                      ? 'Clicked BUY NOW checkout redirect' 
                                                      : isSection 
                                                         ? `Spent ${event.metadata?.timeSpentSeconds || 0}s on ${
                                                            {
                                                               'hero': 'Hero Banner',
                                                               'featured': 'Featured Logos',
                                                               'testimonials': 'Reviews Panel',
                                                               'story': 'Secret Story',
                                                               'solution': 'Solution Intro',
                                                               'breakthroughs': 'Breakthroughs',
                                                               'science': 'Cellular Science',
                                                               'journey': '30-Day Journey',
                                                               'transformation': 'Before/Afters',
                                                               'trust': 'Ingredients',
                                                               'pricing-grid': 'Choose Package',
                                                               'guarantee': 'Money Back Guarantee',
                                                               'results': 'Clinical Results',
                                                               'formula': 'Formula Details',
                                                               'team': 'Medical Board',
                                                               'faq': 'FAQ Section',
                                                               'footer': 'Footer navigation'
                                                            }[event.metadata?.section] || event.metadata?.section || 'Section'
                                                         }`
                                                         : isVisit 
                                                            ? 'New visitor landed on page' 
                                                            : `Clicked on page section (${event.element})`
                                                   }
                                                </p>
                                                <p className="text-[9px] font-bold text-gray-400 mt-0.5 truncate font-mono">
                                                   ID: {event.sessionId}
                                                </p>
                                                <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                                                   <span className="inline-flex items-center text-[9px] font-black text-blue-600 bg-blue-50/50 px-1.5 py-0.5 rounded-md border border-blue-100/30">
                                                      📍 {event.location || 'Unknown Location'}
                                                   </span>
                                                   {event.metadata?.utm_source && (
                                                      <span className="inline-flex items-center text-[9px] font-black text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md border border-emerald-100">
                                                         📢 {event.metadata.utm_source.toUpperCase()}
                                                      </span>
                                                   )}
                                                   {event.metadata?.utm_campaign && (
                                                      <span className="inline-flex items-center text-[9px] font-black text-indigo-700 bg-indigo-50 px-1.5 py-0.5 rounded-md border border-indigo-100">
                                                         🎯 {event.metadata.utm_campaign}
                                                      </span>
                                                   )}
                                                   {event.ip && (
                                                      <span className="text-[8px] font-bold text-gray-300 font-mono">
                                                         ({event.ip})
                                                      </span>
                                                   )}
                                                </div>
                                             </div>
                                          </div>
                                       );
                                    })
                              ) : (
                                 <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                                    <span className="text-3xl mb-3">📡</span>
                                    <p className="text-sm font-black text-gray-800">No events captured yet</p>
                                    <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Listening on Vercel pages...</p>
                                 </div>
                              )}
                           </div>
                        </section>
                      </div>

                     {/* Heatmap & Geographical Insights Grid */}
                     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-10">
                        {/* Section Heatmap - takes 2 columns */}
                        <div className="lg:col-span-2">
                           <section className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40 h-full">
                              <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                 <div>
                                    <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Attention Mapping</h4>
                                    <h3 className="text-xl md:text-2xl font-black tracking-tight text-gray-900">Engagement Heatmap</h3>
                                    <p className="text-xs text-gray-400 mt-1">Identify which portions of your Feel Young landing page are keeping users engaged the longest.</p>
                                 </div>
                                 <div className="flex items-center gap-2 bg-blue-50/50 text-blue-700 px-3 py-1.5 rounded-xl text-xs font-bold shrink-0 self-start sm:self-center">
                                    <span>⏱️ Spent &gt;2s to register</span>
                                 </div>
                              </div>

                              <div className="overflow-x-auto no-scrollbar">
                                 {promoData.sections && promoData.sections.length > 0 ? (
                                    <table className="w-full text-left border-collapse">
                                       <thead>
                                          <tr className="border-b border-gray-100 text-[10px] font-black uppercase tracking-wider text-gray-400">
                                             <th className="py-4 pl-4">Page Section</th>
                                             <th className="py-4">Impressions</th>
                                             <th className="py-4 text-center">Avg. Time Spent</th>
                                             <th className="py-4 pr-4">Depth</th>
                                          </tr>
                                       </thead>
                                       <tbody className="divide-y divide-gray-100">
                                          {promoData.sections.map((sec, idx) => {
                                             const sectionNameMap = {
                                                'hero': '✨ Hero Section (Top Banner)',
                                                'featured': '📺 As Featured In Logos',
                                                'testimonials': '💬 Customer Reviews Panel',
                                                'story': '📖 The Aging Secret Story',
                                                'solution': '🔬 ChronoNAD+ Solution Intro',
                                                'breakthroughs': '🧬 Scientific Breakthroughs',
                                                'science': '🧫 Cellular NAD+ Science Details',
                                                'journey': '📈 30-Day Rejuvenation Journey',
                                                'transformation': '✨ Before/After Transformations',
                                                'trust': '🛡️ Brand Trust & Ingredients',
                                                'pricing-grid': '🛍️ Package Pricing Options (Choose Package)',
                                                'guarantee': '🤝 Money Back Guarantee Banner',
                                                'results': '📊 Clinical Test Results',
                                                'formula': '🧪 Clean & Safe Formula Details',
                                                'team': '👩‍⚕️ Medical Advisory Board',
                                                'faq': '❓ Frequently Asked Questions',
                                                'footer': '📑 Footer Navigation & Links'
                                             };

                                             const friendlyName = sectionNameMap[sec.section] || sec.section;
                                             let barColor = 'bg-blue-600';
                                             if (sec.avgTimeSpent > 15) barColor = 'bg-emerald-500';
                                             else if (sec.avgTimeSpent > 8) barColor = 'bg-indigo-500';
                                             else if (sec.avgTimeSpent > 4) barColor = 'bg-blue-500';
                                             else barColor = 'bg-gray-400';

                                             const barPercent = Math.min((sec.avgTimeSpent / 20) * 100, 100);

                                             return (
                                                <tr key={idx} className="hover:bg-gray-50/50 transition-colors text-xs group">
                                                   <td className="py-3 pl-4 font-black text-gray-800">{friendlyName}</td>
                                                   <td className="py-3 font-bold text-gray-500">
                                                      <span className="bg-gray-100 px-2 py-0.5 rounded-full text-[10px] font-black text-gray-700">
                                                         {sec.views.toLocaleString()} views
                                                      </span>
                                                   </td>
                                                   <td className="py-3 text-center font-black text-gray-900 text-sm">
                                                      {sec.avgTimeSpent} seconds
                                                   </td>
                                                   <td className="py-3 pr-4">
                                                      <div className="flex items-center gap-2">
                                                         <div className="h-1.5 w-20 bg-gray-100 rounded-full overflow-hidden shrink-0">
                                                            <div className={`h-full ${barColor} rounded-full`} style={{ width: `${barPercent}%` }} />
                                                         </div>
                                                         <span className="text-[9px] font-bold text-gray-400">
                                                            {sec.avgTimeSpent > 15 ? '🔥 High' : sec.avgTimeSpent > 8 ? '⚡ Med' : '💤 Low'}
                                                         </span>
                                                      </div>
                                                   </td>
                                                </tr>
                                             );
                                          })}
                                       </tbody>
                                    </table>
                                 ) : (
                                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-40">
                                       <span className="text-4xl mb-3">⏱️</span>
                                       <p className="text-sm font-black text-gray-800">Waiting for scroll data...</p>
                                       <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Users need to spend at least 2 seconds on a section to track</p>
                                    </div>
                                 )}
                              </div>
                           </section>
                        </div>

                        {/* Top Locations - takes 1 column */}
                        <div className="lg:col-span-1">
                           <section className="bg-white p-6 md:p-8 rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40 h-full flex flex-col">
                              <div className="mb-8">
                                 <h4 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-2">Geographic Split</h4>
                                 <h3 className="text-xl md:text-2xl font-black tracking-tight text-gray-900">Traffic by Location</h3>
                                 <p className="text-xs text-gray-400 mt-1">Breakdown of visitors by country and city</p>
                              </div>

                              <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar max-h-[450px]">
                                 {promoData.locations && promoData.locations.length > 0 ? (
                                    promoData.locations.map((loc, idx) => {
                                       const totalLocationViews = promoData.locations.reduce((acc, curr) => acc + curr.count, 0) || 1;
                                       const percentage = Math.round((loc.count / totalLocationViews) * 100);

                                       return (
                                          <div key={idx} className="space-y-1">
                                             <div className="flex justify-between items-center text-xs">
                                                <span className="font-bold text-gray-700 truncate max-w-[150px]">
                                                   📍 {loc.name}
                                                </span>
                                                <span className="font-black text-gray-900 bg-gray-100 px-2 py-0.5 rounded-full text-[10px] shrink-0">
                                                   {loc.count.toLocaleString()} ({percentage}%)
                                                </span>
                                             </div>
                                             <div className="h-1.5 w-full bg-gray-50 rounded-full overflow-hidden border border-gray-100/30">
                                                <div 
                                                   className="h-full bg-blue-600 rounded-full" 
                                                   style={{ width: `${percentage}%` }}
                                                />
                                             </div>
                                          </div>
                                       );
                                    })
                                 ) : (
                                    <div className="py-20 flex flex-col items-center justify-center text-center opacity-40 my-auto">
                                       <span className="text-3xl mb-3">📍</span>
                                       <p className="text-sm font-black text-gray-800">No geo data yet</p>
                                       <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">Detecting visitor IPs...</p>
                                    </div>
                                 )}
                              </div>
                           </section>
                        </div>
                     </div>
                  </motion.div>
               );
            })()}

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
