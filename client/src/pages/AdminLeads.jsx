import { useEffect, useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { API_ENDPOINTS } from '../config.js'
import Logo from '../components/Logo.jsx'

const LEADS_URL = API_ENDPOINTS.FETCH_LEADS

export default function AdminLeads() {
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')

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
      setError('Could not fetch leads. Is the server running?')
      console.error(err)
    } finally {
      setLoading(false)
    }
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
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-[#f9fafb]">
        <Logo className="h-10 w-auto opacity-90" />
        <div className="h-10 w-10 animate-spin rounded-full border-[3px] border-[#111827] border-t-transparent shadow-xl" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-blue-100">
      <div className="w-full">
        
        {/* Header Section - Full Width */}
        <header className="px-10 py-12 md:px-16 border-b border-gray-50 flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-[#fcfcfd]">
          <div className="relative">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <h1 className="text-5xl font-black tracking-tight text-[#111827]">
                  Leads Hub<span className="text-blue-600">.</span>
                </h1>
                <div className="mt-3 flex items-center gap-3">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-sm font-black text-gray-400 uppercase tracking-[0.2em]">{leads.length} Total Analysis Completions</p>
                </div>
            </motion.div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
             <div className="relative group">
                <input 
                    type="text" 
                    placeholder="Search by email..." 
                    className="w-full md:w-80 bg-white border border-gray-100 rounded-2xl px-6 py-3.5 text-sm font-bold text-[#111827] placeholder-gray-300 focus:outline-none focus:ring-4 focus:ring-blue-100/20 focus:border-blue-200 transition-all shadow-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <svg className="absolute right-5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300 group-focus-within:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
             </div>
             <Link 
              to="/admin/analytics" 
              className="px-6 py-3.5 rounded-2xl bg-white border border-gray-100 text-sm font-black uppercase tracking-widest text-[#111827] hover:shadow-sm transition-all active:scale-95 text-[10px]"
            >
              Analytics
            </Link>
            <button 
              onClick={fetchLeads}
              className="p-3.5 rounded-2xl bg-white border border-gray-100 text-[#111827] shadow-sm hover:shadow-md transition-all active:scale-95"
              title="Refresh Data"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
            </button>
            <Link 
              to="/" 
              className="px-8 py-3.5 rounded-2xl bg-[#111827] text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-2xl shadow-blue-900/10 hover:bg-black transition-all active:scale-95"
            >
              Client Site
            </Link>
          </div>
        </header>

        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="m-10 mb-8 rounded-3xl bg-red-50 border border-red-100 p-6 text-red-600 font-bold flex items-center justify-between">
            <span>{error}</span>
            <button onClick={fetchLeads} className="text-red-800 underline uppercase text-xs tracking-widest">Retry</button>
          </motion.div>
        )}

        {/* Leads Table - Full Width Edge-to-Edge */}
        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-white">
                  <th className="px-10 py-8 md:px-16 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Contributor</th>
                  <th className="px-10 py-8 md:px-16 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">AB Group</th>
                  <th className="px-10 py-8 md:px-16 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Analysis Breakdown</th>
                  <th className="px-10 py-8 md:px-16 text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 text-right">Captured</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50/50">
                <AnimatePresence>
                  {filteredLeads.length > 0 ? (
                    filteredLeads.map((lead, idx) => (
                      <motion.tr 
                        key={lead._id || idx}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: idx * 0.02 }}
                        className="group hover:bg-[#fcfcfd] transition-all"
                      >
                        <td className="px-10 py-10 md:px-16 align-top">
                          <div className="flex flex-col">
                            <span className="text-xl font-black text-[#111827] leading-none mb-2">{lead.name || 'Anonymous User'}</span>
                            <span className="text-sm font-bold text-gray-400 leading-none">{lead.email}</span>
                            {lead.isConverted && (
                              <div className="mt-4 flex items-center gap-2">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-100 px-3 py-1.5 text-[9px] font-black uppercase text-emerald-600 tracking-widest">
                                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 100-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" /></svg>
                                  Shop Clicked
                                </span>
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-10 py-10 md:px-16 align-top">
                          {lead.assignedVariant ? (
                            <span className={`inline-flex items-center px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest ${lead.assignedVariant === 'checkout' ? 'bg-purple-50 text-purple-600 border border-purple-100' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                              {lead.assignedVariant === 'checkout' ? 'Checkout' : 'Product'}
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-gray-300 uppercase tracking-widest italic">Legacy Lead</span>
                          )}
                        </td>
                        <td className="px-10 py-10 md:px-16">
                          <div className="flex flex-wrap gap-3">
                            {Object.entries(lead.answers || {}).map(([key, value]) => (
                              <div key={key} className="inline-flex items-center gap-2.5 rounded-2xl bg-gray-50 border border-gray-100 px-4 py-2.5 hover:bg-white hover:border-blue-100 transition-all duration-200 cursor-default">
                                <span className="text-[10px] font-black uppercase text-gray-400 tracking-tighter opacity-60">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </span>
                                <span className="text-xs font-black text-[#111827]">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-10 py-10 md:px-16 align-top text-right whitespace-nowrap">
                          <div className="flex flex-col items-end">
                            <span className="text-base font-black text-gray-900 mb-1">{formatDate(lead.createdAt).split(',')[0]}</span>
                            <span className="text-[11px] font-bold text-gray-300 uppercase tracking-widest">{formatDate(lead.createdAt).split(',')[1]}</span>
                          </div>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-8 py-40 text-center">
                        <div className="flex flex-col items-center gap-6">
                            <div className="h-20 w-20 flex items-center justify-center rounded-full bg-gray-50 text-gray-200">
                                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <div>
                                <p className="text-2xl font-black text-gray-900 mb-1 leading-none">No records match your criteria</p>
                                <p className="text-sm font-bold text-gray-400">Total analysis available: {leads.length}</p>
                            </div>
                            <button onClick={() => setSearch('')} className="px-8 py-3 rounded-2xl bg-blue-50 text-blue-800 text-[11px] font-black uppercase tracking-widest transition-all hover:bg-blue-100">Reset Search</button>
                        </div>
                      </td>
                    </tr>
                  )}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
