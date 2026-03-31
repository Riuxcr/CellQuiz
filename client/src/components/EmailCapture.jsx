import { useState } from 'react'
import axios from 'axios'
import { trackFbq } from '../utils/fbq.js'
import { API_ENDPOINTS } from '../config.js'

const SUBMIT_URL = API_ENDPOINTS.SUBMIT_QUIZ
/** Render cold starts + DB can exceed 30s; keep UX honest with a clear timeout message. */
const SUBMIT_TIMEOUT_MS = 90000

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
      await axios.post(
        SUBMIT_URL,
        {
          name: name.trim(),
          email: email.trim(),
          answers,
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
          {(validationError || submitError) && (
            <p
              className="mt-2 text-xs font-black text-red-500 uppercase tracking-wider pl-4 transition-opacity duration-200"
              role="alert"
            >
              {validationError || submitError}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="relative w-full rounded-[1.25rem] bg-[#111827] px-8 py-5 text-xl font-black text-white shadow-2xl transition-all duration-150 hover:bg-black active:scale-[0.99] disabled:pointer-events-none disabled:opacity-70"
          disabled={submitting}
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-3">
              <span
                className="h-4 w-4 shrink-0 rounded-full border-[3px] border-white/30 border-t-white animate-spin"
                aria-hidden
              />
              <span className="text-lg">Saving…</span>
            </span>
          ) : (
            <span className="text-lg md:text-xl">Generate My Protocol</span>
          )}
        </button>
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
