import { useState } from 'react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import { trackFbq } from '../utils/fbq.js'
import { API_ENDPOINTS } from '../config.js'

const SUBMIT_URL = API_ENDPOINTS.SUBMIT_QUIZ

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EmailCapture({ name, setName, email, setEmail, answers, onSuccess }) {
  const [validationError, setValidationError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const trimmedEmail = email.trim()
    const trimmedName = name.trim()
    
    if (!trimmedName) {
      setValidationError('Please enter your full name.')
      return false
    }
    if (!trimmedEmail) {
      setValidationError('Please enter your email address.')
      return false
    }
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      setValidationError('Please enter a valid email address.')
      return false
    }
    setValidationError('')
    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError('')
    if (!validate()) return

    setSubmitting(true)
    try {
      await axios.post(SUBMIT_URL, {
        name: name.trim(),
        email: email.trim(),
        answers,
      })
      trackFbq('Lead')
      onSuccess()
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        err.message ||
        'Could not submit. Please try again.'
      setSubmitError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[700px] bg-white rounded-[2rem] md:rounded-[3rem] border border-[#f3f4f6] p-8 md:p-14 shadow-[0_60px_120px_-20px_rgba(0,0,0,0.12)]">
      <div className="text-center max-w-sm mx-auto">
        <h2 className="text-[clamp(1.75rem,3.5vw,2.2rem)] font-black text-[#111827] tracking-tight leading-[0.95] uppercase">
          Unlock Your Protocol
        </h2>
        <p className="mt-4 text-base text-gray-400 font-medium leading-relaxed">
          Enter your details to receive your personalized ChronoNAD+<span className="text-blue-500">™</span> cellular report and exclusive welcome offer.
        </p>
      </div>

      <form className="mt-10 flex flex-col gap-5" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="relative group">
          <label htmlFor="quiz-name" className="sr-only">Full Name</label>
          <input
            id="quiz-name"
            type="text"
            placeholder="Your Full Name"
            className="w-full rounded-[1.25rem] border-2 border-[#f3f4f6] bg-[#fafafa] px-6 py-4 text-xl font-bold text-[#111827] placeholder-gray-300 transition-all focus:border-[#111827] focus:bg-white focus:outline-none focus:ring-8 focus:ring-gray-100/50 disabled:opacity-50"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (validationError) setValidationError('')
            }}
            disabled={submitting}
          />
        </div>

        {/* Email Input */}
        <div className="relative group">
          <label htmlFor="quiz-email" className="sr-only">Email Address</label>
          <input
            id="quiz-email"
            type="email"
            placeholder="email@example.com"
            className="w-full rounded-[1.25rem] border-2 border-[#f3f4f6] bg-[#fafafa] px-6 py-4 text-xl font-bold text-[#111827] placeholder-gray-300 transition-all focus:border-[#111827] focus:bg-white focus:outline-none focus:ring-8 focus:ring-gray-100/50 disabled:opacity-50"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (validationError) setValidationError('')
            }}
            autoComplete="email"
            disabled={submitting}
          />
          <AnimatePresence>
            {(validationError || submitError) && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <p className="mt-2 text-xs font-black text-red-500 uppercase tracking-wider pl-4">
                  {validationError || submitError}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02, backgroundColor: '#000' }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="relative overflow-hidden w-full rounded-[1.25rem] bg-[#111827] px-8 py-5 text-xl font-black text-white shadow-2xl transition-all disabled:opacity-70"
          disabled={submitting}
        >
          <AnimatePresence mode="wait">
            {submitting ? (
              <motion.div 
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center justify-center gap-3"
              >
                <div className="w-4 h-4 border-[3px] border-white/30 border-t-white rounded-full animate-spin" />
                <span className="text-lg">Analyzing...</span>
              </motion.div>
            ) : (
              <motion.span 
                key="text"
                className="text-lg md:text-xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                Generate My Protocol
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </form>

      <div className="mt-12 flex items-center justify-center gap-3 text-[10px] font-black text-gray-300 uppercase tracking-[0.3em]">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-50">
          <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
        </svg>
        <span>Your Data is Secure & Encrypted</span>
      </div>
    </div>
  )
}
