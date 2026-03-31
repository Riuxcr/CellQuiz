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

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    try {
      setLoading(true)
      const res = await axios.get(LEADS_URL)
      setLeads(res.data.leads || [])
      setError(null)
    } catch (err) {
      setError('Could not fetch leads. Is the server running?')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

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
      <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50">
        <Logo className="h-10 w-auto opacity-90" />
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#111827] border-t-transparent" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-16 md:px-12 lg:px-24">
      <div className="mx-auto max-w-7xl">
        <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-[#111827]">
              Leads Overview<span className="text-gray-300">.</span>
            </h1>
            <p className="mt-3 text-lg font-medium text-gray-500">
              Total Analysis Completions: <span className="font-bold text-[#111827]">{leads.length}</span>
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={fetchLeads}
              className="px-6 py-3 rounded-xl bg-white border border-gray-200 text-sm font-bold text-[#111827] shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Refresh Data
            </button>
            <Link 
              to="/" 
              className="px-6 py-3 rounded-xl bg-[#111827] text-sm font-bold text-white shadow-xl hover:bg-black transition-all active:scale-95"
            >
              Go to Landing
            </Link>
          </div>
        </header>

        {error && (
          <div className="mb-8 rounded-2xl bg-red-50 border border-red-100 p-6 text-red-600 font-bold">
            {error}
          </div>
        )}

        <div className="overflow-hidden rounded-[2rem] border border-gray-100 bg-white shadow-2xl shadow-gray-200/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-gray-50 bg-gray-50/50">
                  <th className="px-8 py-5 text-sm font-black uppercase tracking-widest text-gray-400">Email</th>
                  <th className="px-8 py-5 text-sm font-black uppercase tracking-widest text-gray-400">Profile Details</th>
                  <th className="px-8 py-5 text-sm font-black uppercase tracking-widest text-gray-400">Captured On</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                <AnimatePresence>
                  {leads.length > 0 ? (
                    leads.map((lead, idx) => (
                      <motion.tr 
                        key={lead._id || idx}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="group hover:bg-gray-50/30 transition-colors"
                      >
                        <td className="px-8 py-6 align-top">
                          <span className="text-lg font-bold text-[#111827]">{lead.email}</span>
                        </td>
                        <td className="px-8 py-6">
                          <div className="flex flex-wrap gap-2">
                            {Object.entries(lead.answers || {}).map(([key, value]) => (
                              <div key={key} className="inline-flex flex-col rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
                                <span className="text-[10px] font-black uppercase text-gray-400 leading-none mb-1">{key}</span>
                                <span className="text-sm font-bold text-[#111827] leading-none">{String(value)}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="px-8 py-6 align-top whitespace-nowrap">
                          <span className="text-sm font-bold text-gray-400">{formatDate(lead.createdAt)}</span>
                        </td>
                      </motion.tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3" className="px-8 py-20 text-center">
                        <div className="flex flex-col items-center gap-4 text-gray-400 font-bold">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                          </svg>
                          <span>No leads found yet. Time to start the quiz!</span>
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
