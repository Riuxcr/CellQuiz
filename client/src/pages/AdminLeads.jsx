import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { LEADS_URL } from '../config.js'

export default function AdminLeads() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [isFetchingMore, setIsFetchingMore] = useState(false)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 1024
      setIsMobile(mobile)
      if (mobile && isSidebarOpen) setIsSidebarOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [isSidebarOpen])



  const fetchLeads = async (pageNumber = 1, append = false, currentSearch = search) => {
    try {
      if (append) setIsFetchingMore(true)
      else setLoading(true)

      const token = localStorage.getItem('admin_token')
      const res = await axios.get(`${LEADS_URL}?page=${pageNumber}&limit=20&search=${encodeURIComponent(currentSearch)}`, {
        headers: { Authorization: token }
      })

      if (append) {
        setLeads(prev => [...prev, ...(res.data.leads || [])])
      } else {
        setLeads(res.data.leads || [])
      }
      
      setHasMore(res.data.pagination?.hasMore || false)
      setPage(pageNumber)
      setError(null)
    } catch (err) {
      setError('Connection failed.')
      console.error(err)
    } finally {
      setLoading(false)
      setIsFetchingMore(false)
    }
  }

  // Debounced search
  useEffect(() => {
    const handler = setTimeout(() => {
      fetchLeads(1, false, search)
    }, 500)
    return () => clearTimeout(handler)
  }, [search])

  const handleLoadMore = () => {
    if (!isFetchingMore && hasMore) {
      fetchLeads(page + 1, true, search)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }



  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    })
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white">
        <div className="h-8 w-8 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
      </div>
    )
  }

  const navItems = [
    { id: 'insights', label: 'Summary', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    ), path: '/admin/analytics' },
    { id: 'leads', label: 'Customer List', icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    ), path: '/admin', active: true },
    { id: 'support', label: 'Help & Support', icon: (
       <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
    ), path: '/admin/analytics?tab=support' },
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
            onClick={() => fetchLeads()}
            className={`w-full flex items-center justify-center gap-3 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-all rounded-[28px] overflow-hidden ${isSidebarOpen ? 'px-6 py-4' : 'h-14 w-14 p-0 ml-1.5'}`}
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            {isSidebarOpen && <span className="text-sm font-black text-gray-800 uppercase tracking-widest whitespace-nowrap">Refresh List</span>}
          </button>
        </div>

        <nav className="flex-1 mt-8 space-y-1 px-3 min-w-[280px]">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (isMobile) setIsSidebarOpen(false)
                if (item.id === 'support') {
                   navigate('/admin/analytics');
                } else {
                   navigate(item.path);
                }
              }}
              className={`w-full flex items-center gap-4 px-4 py-3.5 rounded-[20px] transition-all group ${item.active ? 'bg-blue-50 text-blue-700 font-bold' : 'text-gray-500 hover:bg-gray-50'}`}
            >
              <span className={`flex-shrink-0 transition-transform duration-500 ${item.active ? 'text-blue-600 scale-110' : 'text-gray-400 group-hover:text-gray-900 group-hover:scale-110'}`}>{item.icon}</span>
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

      <main className="flex-1 h-screen overflow-y-auto relative">
        <header className="px-4 md:px-12 py-4 h-auto md:h-16 flex flex-col md:flex-row items-start md:items-center justify-between sticky top-0 bg-[#f8f9fa]/90 backdrop-blur-xl z-40 border-b border-gray-100/50 gap-4 md:gap-0">
          <div className="flex items-center gap-4 md:gap-6 w-full md:w-auto">
            {isMobile && !isSidebarOpen && (
              <button 
                onClick={() => setIsSidebarOpen(true)}
                className="p-2 rounded-lg bg-white shadow-sm border border-gray-100 text-gray-500"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
              </button>
            )}
            <h2 className="hidden sm:inline text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Tracking Status</h2>
            <div className="hidden sm:block h-4 w-[1px] bg-gray-200" />
            <div className="flex items-center gap-3">
              <span className="text-xs sm:text-sm font-bold text-gray-900 tracking-tight">Leads</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 md:gap-6 w-full md:w-auto justify-between md:justify-end">
             <div className="relative group flex-1 md:flex-none">
                <input 
                    type="text" 
                    placeholder="Search leads..." 
                    className="w-full md:w-64 lg:w-96 bg-white border border-gray-100 rounded-[20px] px-5 py-2.5 text-xs md:text-sm font-bold text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-100/40 focus:border-blue-200 transition-all shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
             <button onClick={() => navigate('/')} className="px-4 py-2 rounded-full bg-gray-900 text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white hover:bg-black transition-all shadow-xl shadow-gray-900/10">Front View</button>
          </div>
        </header>

        <div className="px-4 sm:px-8 md:px-12 py-6 md:py-12 max-w-[1400px] mx-auto space-y-6 md:space-y-10">
          {error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] bg-red-50 border border-red-100 p-8 text-red-600 font-bold flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.2em]">{error}</span>
              <button onClick={fetchLeads} className="text-red-800 underline uppercase text-xs tracking-widest">Refresh Now</button>
            </motion.div>
          )}

          <div className="space-y-6 pb-20">
            <AnimatePresence mode="popLayout">
              {leads.length > 0 ? (
                leads.map((lead, idx) => (
                  <motion.div 
                    key={lead._id || idx}
                    layout
                    initial={{ opacity: 0, scale: 0.98, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: idx * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white p-6 md:p-10 rounded-3xl md:rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40 hover:shadow-[0_32px_96px_rgba(0,0,0,0.04)] hover:border-blue-100 transition-all duration-700 flex flex-col lg:flex-row lg:items-center justify-between gap-6 md:gap-12 group"
                  >
                    <div className="flex-1 min-w-0 flex items-center gap-4 md:gap-8">
                      <div className="h-14 w-14 md:h-20 md:w-20 rounded-2xl md:rounded-[32px] bg-blue-50 border border-blue-100 flex items-center justify-center text-xl md:text-3xl font-black text-blue-600 shadow-inner group-hover:scale-110 transition-transform duration-700">
                        {lead.name ? lead.name[0].toUpperCase() : '?'}
                      </div>
                      <div className="min-w-0">
                        <h2 className="text-lg md:text-2xl font-black text-gray-900 tracking-tight leading-loose mb-1 md:mb-3 truncate">{lead.name || 'Anonymous User'}</h2>
                        <p className="text-[10px] md:text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors truncate">{lead.email}</p>
                        {lead.isConverted && (
                          <div className="mt-3 md:mt-5 inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 md:px-4 py-1.5 md:py-2 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-widest shadow-sm">
                             <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z" /></svg>
                             Purchasor {lead.conversionDestination && <span className="opacity-50 ml-1">via {lead.conversionDestination}</span>}
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-[1.5] flex flex-wrap gap-2 md:gap-4">
                       <div className={`px-4 md:px-5 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${lead.goalPath === 'Skincare' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-indigo-50 text-indigo-600 border-indigo-100'}`}>
                          {lead.goalPath || 'General'} Path
                       </div>
                       <div className={`px-4 md:px-5 py-2 md:py-3 rounded-full text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${lead.assignedVariant === 'checkout' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                          {lead.assignedVariant === 'checkout' ? 'Checkout' : 'Results'} Split
                       </div>
                       {Object.entries(lead.answers || {}).slice(0, 4).map(([key, value]) => (
                         <div key={key} className="bg-gray-50/50 border border-gray-100/50 rounded-xl md:rounded-[20px] px-4 md:px-6 py-2 md:py-3 flex items-center gap-2 md:gap-4 hover:bg-white hover:border-blue-50 hover:shadow-sm transition-all duration-300">
                            <span className="text-[9px] md:text-[11px] font-black uppercase text-gray-300 tracking-[0.1em]">{key}</span>
                            <span className="text-[10px] md:text-xs font-black text-gray-800">{String(value)}</span>
                         </div>
                       ))}
                    </div>

                    <div className="flex flex-row lg:flex-col items-center lg:items-end justify-between lg:justify-start gap-2 min-w-full lg:min-w-[140px] pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-50">
                      <span className="text-xl md:text-2xl font-black text-gray-900 tracking-tighter">{formatDate(lead.createdAt)}</span>
                      <span className="text-[9px] md:text-[11px] font-black text-gray-400 md:text-gray-300 uppercase tracking-[0.4em] bg-gray-50 px-3 md:px-4 py-1 md:py-1.5 rounded-lg md:rounded-xl border border-gray-100">
                        {formatTime(lead.createdAt)}
                      </span>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="py-40 flex flex-col items-center justify-center gap-8 opacity-40">
                    <div className="h-24 w-24 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center shadow-inner animate-bounce text-gray-300">
                        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
                    </div>
                    <div className="text-center">
                      <p className="text-3xl font-black text-gray-900 mb-2 tracking-tight">No records found</p>
                      <p className="text-xs font-black text-gray-400 uppercase tracking-[0.3em]">The database is currently clear</p>
                    </div>
                    <button onClick={() => setSearch('')} className="px-10 py-4 rounded-full bg-blue-600 text-white text-[11px] font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 active:scale-95">Search Again</button>
                </div>
              )}
            </AnimatePresence>

            {hasMore && (
              <div className="flex justify-center pt-8 pb-12">
                <button
                  onClick={handleLoadMore}
                  disabled={isFetchingMore}
                  className="group relative flex items-center gap-4 px-10 py-5 rounded-full bg-white border border-gray-100 shadow-[0_12px_40px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-blue-100 transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed group-hover:scale-105 active:scale-95"
                >
                  {isFetchingMore ? (
                    <div className="flex items-center gap-3">
                       <div className="h-4 w-4 rounded-full border-2 border-blue-600 border-t-transparent animate-spin" />
                       <span className="text-[10px] font-black uppercase tracking-widest text-blue-600">Loading Records...</span>
                    </div>
                  ) : (
                    <>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 group-hover:text-blue-600 transition-colors">Load More Customers</span>
                      <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
