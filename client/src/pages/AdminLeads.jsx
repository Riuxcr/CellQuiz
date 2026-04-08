import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useNavigate } from 'react-router-dom'
import { LEADS_URL } from '../config.js'

export default function AdminLeads() {
  const navigate = useNavigate()
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('admin_token')
      const res = await axios.get(LEADS_URL, {
        headers: { Authorization: token }
      })
      setLeads(res.data.leads || [])
      setError(null)
    } catch (err) {
      setError('Connection failed.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin/login')
  }

  const filteredLeads = leads.filter(l => 
    l.email?.toLowerCase().includes(search.toLowerCase()) ||
    l.name?.toLowerCase().includes(search.toLowerCase())
  )

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
    <div className="flex h-screen bg-[#f8f9fa] text-gray-900 font-sans selection:bg-blue-100 overflow-hidden">
      
      {/* Sidebar with Simple Language */}
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
                className="ml-4 text-xl font-black tracking-tighter text-gray-900 whitespace-nowrap"
              >
                Admin<span className="text-blue-600">Panel</span>
              </motion.h1>
            )}
          </AnimatePresence>
        </div>

        <div className="px-3 mt-4">
          <button 
            onClick={fetchLeads}
            className={`w-full flex items-center justify-center gap-3 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 hover:shadow-[0_8px_16px_rgba(0,0,0,0.12)] transition-all rounded-[28px] overflow-hidden ${isSidebarOpen ? 'px-6 py-4' : 'h-14 w-14 p-0 ml-1.5'}`}
          >
            <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" /></svg>
            {isSidebarOpen && <span className="text-sm font-black text-gray-800 uppercase tracking-widest whitespace-nowrap">Refresh List</span>}
          </button>
        </div>

        <nav className="flex-1 mt-8 space-y-1 px-3">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
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

        <div className="mt-auto p-4 space-y-2">
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
        <header className="px-12 h-16 flex items-center justify-between sticky top-0 bg-[#f8f9fa]/90 backdrop-blur-xl z-40 border-b border-gray-100/50">
          <div className="flex items-center gap-6">
            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Tracking Status</h2>
            <div className="h-4 w-[1px] bg-gray-200" />
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-gray-900 tracking-tight">Customer List Management</span>
              <span className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6">
             <div className="relative group">
                <input 
                    type="text" 
                    placeholder="Search people..." 
                    className="w-full md:w-96 bg-white border border-gray-100 rounded-[20px] px-6 py-3 text-sm font-bold text-gray-900 placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-100/40 focus:border-blue-200 transition-all shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <svg className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
             <button onClick={() => navigate('/')} className="px-6 py-2.5 rounded-full bg-gray-900 text-[10px] font-black uppercase tracking-widest text-white hover:bg-black transition-all shadow-xl shadow-gray-900/10">Front View</button>
          </div>
        </header>

        <div className="px-12 py-12 max-w-[1400px] mx-auto space-y-10">
          {error && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="rounded-[32px] bg-red-50 border border-red-100 p-8 text-red-600 font-bold flex items-center justify-between">
              <span className="text-sm uppercase tracking-[0.2em]">{error}</span>
              <button onClick={fetchLeads} className="text-red-800 underline uppercase text-xs tracking-widest">Refresh Now</button>
            </motion.div>
          )}

          <div className="space-y-6 pb-20">
            <AnimatePresence mode="popLayout">
              {filteredLeads.length > 0 ? (
                filteredLeads.map((lead, idx) => (
                  <motion.div 
                    key={lead._id || idx}
                    layout
                    initial={{ opacity: 0, scale: 0.98, y: 15 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ delay: idx * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="bg-white p-10 rounded-[48px] shadow-[0_24px_80px_rgba(0,0,0,0.02)] border border-gray-100/40 hover:shadow-[0_32px_96px_rgba(0,0,0,0.04)] hover:border-blue-100 transition-all duration-700 flex flex-col lg:flex-row lg:items-center justify-between gap-12 group"
                  >
                    <div className="flex-1 min-w-0 flex items-center gap-8">
                      <div className="h-20 w-20 rounded-[32px] bg-blue-50 border border-blue-100 flex items-center justify-center text-3xl font-black text-blue-600 shadow-inner group-hover:scale-110 transition-transform duration-700">
                        {lead.name ? lead.name[0].toUpperCase() : '?'}
                      </div>
                      <div>
                        <h2 className="text-2xl font-black text-gray-900 tracking-tight leading-none mb-3">{lead.name || 'Anonymous User'}</h2>
                        <p className="text-sm font-bold text-gray-400 group-hover:text-blue-600 transition-colors">{lead.email}</p>
                        {lead.isConverted && (
                          <div className="mt-5 inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 border border-emerald-100 px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm">
                             <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z" /></svg>
                             Purchased Kit
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex-[1.5] flex flex-wrap gap-4">
                       <div className={`px-5 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border shadow-sm ${lead.assignedVariant === 'checkout' ? 'bg-purple-50 text-purple-600 border-purple-100' : 'bg-blue-50 text-blue-600 border-blue-100'}`}>
                          {lead.assignedVariant === 'checkout' ? 'Checkout View' : 'Results View'}
                       </div>
                       {Object.entries(lead.answers || {}).slice(0, 4).map(([key, value]) => (
                         <div key={key} className="bg-gray-50/50 border border-gray-100/50 rounded-[20px] px-6 py-3 flex items-center gap-4 hover:bg-white hover:border-blue-50 hover:shadow-sm transition-all duration-300">
                            <span className="text-[11px] font-black uppercase text-gray-300 tracking-[0.1em]">{key}</span>
                            <span className="text-xs font-black text-gray-800">{String(value)}</span>
                         </div>
                       ))}
                    </div>

                    <div className="flex flex-col items-end gap-2 md:min-w-[140px]">
                      <span className="text-2xl font-black text-gray-900 tracking-tighter">{formatDate(lead.createdAt)}</span>
                      <span className="text-[11px] font-black text-gray-300 uppercase tracking-[0.4em] bg-gray-50 px-4 py-1.5 rounded-xl border border-gray-100">
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
          </div>
        </div>
      </main>
    </div>
  )
}
