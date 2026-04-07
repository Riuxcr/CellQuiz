import { useState } from 'react'
import axios from 'axios'
import { motion } from 'framer-motion'
import { trackFbq } from '../utils/fbq.js'
import { API_ENDPOINTS } from '../config.js'

const SUBMIT_URL = API_ENDPOINTS.SUBMIT_QUIZ
/** Render cold starts + DB can exceed 30s; keep UX honest with a clear timeout message. */
const SUBMIT_TIMEOUT_MS = 90000

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function EmailCapture({ name, setName, email, setEmail, answers, sessionId, onSuccess }) {
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
      await axios.post(
        SUBMIT_URL,
        {
          name: name.trim(),
          email: email.trim(),
          answers,
          sessionId,
        },
        {
          timeout: SUBMIT_TIMEOUT_MS,
          headers: { 'Content-Type': 'application/json' },
        },
      )
      trackFbq('Lead')
      // Pass submitted values so redirect logic never relies on stale parent state.
      onSuccess({ email: email.trim(), name: name.trim() })
    } catch (err) {
      const isTimeout =
        err.code === 'ECONNABORTED' ||
        (typeof err.message === 'string' && err.message.toLowerCase().includes('timeout'))
      const msg = isTimeout
        ? 'That took too long—the server may have been starting up. Please tap again in a few seconds.'
        : err.response?.data?.message ||
          err.message ||
          'Could not submit. Please try again.'
      setSubmitError(msg)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="mx-auto w-full max-w-[600px] bg-white md:rounded-[2.5rem] p-8 md:p-14 md:shadow-ios">
      <div className="text-center max-w-sm mx-auto">
        <span className="text-[10px] font-bold tracking-[0.2em] text-[#007AFF] uppercase block mb-3">Final Step</span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 tracking-tight leading-[1.05]">
          Results Ready.
        </h2>
        <p className="mt-4 text-base text-gray-500 font-medium leading-relaxed">
          Enter your details to view your personalized protocol and receive <span className="text-gray-900 font-bold">10% off</span> your first order.
        </p>
      </div>

      <form className="mt-10 flex flex-col gap-4" onSubmit={handleSubmit}>
        {/* Name Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="quiz-name" className="text-xs font-bold text-gray-400 ml-4 uppercase tracking-wider">Full Name</label>
          <input
            id="quiz-name"
            type="text"
            placeholder="John Doe"
            className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 py-4 text-lg font-semibold text-gray-900 placeholder-gray-300 transition-all focus:border-[#007AFF] focus:bg-white focus:outline-none disabled:opacity-50"
            value={name}
            onChange={(e) => {
              setName(e.target.value)
              if (validationError) setValidationError('')
            }}
            disabled={submitting}
          />
        </div>

        {/* Email Input */}
        <div className="flex flex-col gap-1.5">
          <label htmlFor="quiz-email" className="text-xs font-bold text-gray-400 ml-4 uppercase tracking-wider">Email Address</label>
          <input
            id="quiz-email"
            type="email"
            placeholder="john@example.com"
            className="w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-6 py-4 text-lg font-semibold text-gray-900 placeholder-gray-300 transition-all focus:border-[#007AFF] focus:bg-white focus:outline-none disabled:opacity-50"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
              if (validationError) setValidationError('')
            }}
            autoComplete="email"
            disabled={submitting}
          />
          {(validationError || submitError) && (
            <p className="mt-2 text-xs font-bold text-red-500 uppercase tracking-wider ml-4" role="alert">
              {validationError || submitError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-[#007AFF] px-8 py-5 text-lg font-bold text-white shadow-xl shadow-blue-500/20 active:scale-95 transition-all disabled:opacity-70"
          disabled={submitting}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-3">
              <span className="h-5 w-5 rounded-full border-[3px] border-white/30 border-t-white animate-spin" />
              <span>Analyzing Results...</span>
            </span>
          ) : (
            <span>Reveal My Protocol</span>
          )}
        </button>
      </form>

      <div className="mt-12 flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5 opacity-60">
            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
          </svg>
          <span>Your information is encrypted and secure</span>
        </div>
        <p className="text-[10px] text-gray-400 font-medium px-6">
          By continuing, you agree to receive personalized health insights and marketing emails. Unsubscribe at any time.
        </p>
      </div>
    </div>
  )
}
