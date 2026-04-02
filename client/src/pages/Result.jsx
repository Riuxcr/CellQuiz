import { useEffect, useMemo, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { trackFbq } from '../utils/fbq.js'
import { API_BASE_URL } from '../config.js'
import {
  PRODUCT_URL,
  buildRedirectUrl,
  openCellStartUrl,
  RESULT_STATE_STORAGE_KEY,
} from '../constants/cellstartUrls.js'
import {
  getPersonalizedInsight,
  getHeroImageForAnswers,
} from '../utils/personalizedResult.js'

const REVIEWS_URL = `${API_BASE_URL}/api/reviews`

function readStoredResultState() {
  try {
    const raw = sessionStorage.getItem(RESULT_STATE_STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed?.answers || typeof parsed.answers !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

function hasQuizAnswers(answers) {
  return answers != null && typeof answers === 'object' && Object.keys(answers).length > 0
}

const FALLBACK_REVIEWS = [
  { _id: 'f1', name: 'Sarah M.', rating: 5, title: 'Part of my morning', body: 'Simple to take. I like that it’s one thing I don’t have to overthink.', date: '01/22/2026' },
  { _id: 'f2', name: 'James T.', rating: 5, title: 'Steadier days', body: 'Hard to pin on one product, but I feel more consistent week to week.', date: '01/18/2026' },
  { _id: 'f3', name: 'Elena R.', rating: 4, title: 'Good addition', body: 'I still see my derm and use my creams. This felt like a sensible add-on.', date: '01/12/2026' },
]

function StarRow({ n, max = 5 }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: max }, (_, i) => (
        <svg key={i} className={`h-4 w-4 ${i < n ? 'text-amber-500' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const ACCORDION_DATA = [
  {
    title: 'Healthy Aging',
    desc: 'Support how your body ages from within. Help maintain energy, vitality, and overall wellness as you grow older. Feel better as you age.',
    img: '/Firstcard.jpg',
    icon: '⏳'
  },
  {
    title: 'Skin Health',
    desc: 'Support your skin from the inside out. Works alongside your skincare routine to promote a smoother, healthier look. Because real skin health starts beneath the surface.',
    img: '/Secondcard.jpg',
    icon: '✨'
  },
  {
    title: 'Stress Management',
    desc: 'Daily stress can drain your body over time. Support your system as it responds to physical and environmental stress. Stay balanced, even on demanding days.',
    img: '/Thirdcard.jpeg',
    icon: '🧘'
  },
  {
    title: 'Cellular Repair',
    desc: 'Help your body repair and renew at the cellular level. Supports the natural processes that keep your cells functioning properly. Stronger cells, better overall health.',
    img: '/fourthcard.jpg',
    icon: '🧬'
  }
]

function BenefitAccordion() {
  const [active, setActive] = useState(0)

  return (
    <div className="flex h-[500px] md:h-[650px] w-full gap-2 md:gap-4 mt-8 md:mt-12">
      {ACCORDION_DATA.map((item, i) => (
        <motion.div
          key={i}
          onClick={() => setActive(i)}
          onMouseEnter={() => setActive(i)}
          animate={{
            flex: active === i ? 5 : 1
          }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-full overflow-hidden rounded-2xl md:rounded-3xl cursor-pointer group"
        >
          {/* Background Image */}
          <img
            src={item.img}
            alt={item.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Main Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

          {/* Active Content */}
          <motion.div
            initial={false}
            animate={{ 
              opacity: active === i ? 1 : 0,
              y: active === i ? 0 : 20
            }}
            transition={{ duration: 0.4, delay: active === i ? 0.2 : 0 }}
            className={`absolute bottom-0 left-0 p-4 md:p-10 w-full ${active === i ? 'block' : 'hidden'}`}
          >
            <h3 className="text-xl md:text-3xl font-bold text-white mb-2 md:mb-3">{item.title}</h3>
            <p className="max-w-md text-xs md:text-base leading-relaxed text-white/90">
              {item.desc}
            </p>
          </motion.div>

          {/* Collapsed Vertical Title */}
          {active !== i && (
            <motion.div
              layoutId={`title-${i}`}
              className="absolute inset-0 flex items-center justify-center p-1 md:p-2"
            >
              <span className="rotate-180 whitespace-nowrap text-[9px] md:text-xs font-black uppercase tracking-[0.3em] md:tracking-[0.5em] text-white/70 [writing-mode:vertical-lr]">
                {item.title}
              </span>
            </motion.div>
          )}
        </motion.div>
      ))}
    </div>
  )
}

export default function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const [resolvedState, setResolvedState] = useState(() => location.state ?? null)
  const [reviews, setReviews] = useState([])
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false)
  const [isSubmittingReview, setIsSubmittingReview] = useState(false)
  const [newReview, setNewReview] = useState({ rating: 5, title: '', body: '', name: '' })

  const fetchReviews = async () => {
    try {
      const res = await fetch(REVIEWS_URL)
      if (res.ok) {
        const data = await res.json()
        if (Array.isArray(data)) setReviews(data)
      }
    } catch { /* silence errors, stay fallback */ }
  }

  useEffect(() => {
    fetchReviews()
  }, [])

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    setIsSubmittingReview(true)
    try {
      const res = await fetch(REVIEWS_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newReview)
      })
      if (res.ok) {
        setNewReview({ rating: 5, title: '', body: '', name: '' })
        setIsReviewModalOpen(false)
        fetchReviews()
      }
    } catch (err) {
      console.error('Error submitting review:', err)
    } finally {
      setIsSubmittingReview(false)
    }
  }

  useEffect(() => {
    if (hasQuizAnswers(location.state?.answers)) {
      setResolvedState(location.state)
      return
    }
    const stored = readStoredResultState()
    if (stored && hasQuizAnswers(stored.answers)) {
      setResolvedState(stored)
      navigate('/result', { replace: true, state: stored })
    }
  }, [location.state, navigate])

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }, [])

  const answers = resolvedState?.answers
  const insight = useMemo(() => getPersonalizedInsight(answers), [answers])
  const heroImage = '/Result.jpg' // Updated as requested
  const displayReviews = reviews.length > 0 ? reviews : FALLBACK_REVIEWS

  if (!hasQuizAnswers(answers)) {
    console.error('Quiz Debug: Missing answers in state or session storage.', { 
      'Location State': location.state, 
      'Session Storage': readStoredResultState() 
    });
    return (
      <main className="mx-auto flex min-h-[100dvh] w-full flex-col items-center justify-center bg-white px-8 text-center font-sans">
        <div className="max-w-md w-full">
            <div className="h-20 w-20 bg-blue-50 text-blue-300 rounded-full flex items-center justify-center mx-auto mb-10">
                <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <h2 className="text-3xl font-black text-[#111827] tracking-tight uppercase mb-4">Analysis data missing</h2>
            <p className="text-gray-400 font-bold mb-12 leading-relaxed uppercase tracking-[0.2em] text-[10px]">Your personalized report requires a completed quiz session.</p>
            <div className="flex flex-col gap-4">
                <Link className="px-8 py-5 bg-[#111827] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:bg-black transition-all active:scale-95" to="/quiz">Restart Analysis</Link>
                <Link className="px-8 py-5 bg-white border border-gray-100 text-[#111827] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-gray-50 transition-all active:scale-95" to="/">Back to Home</Link>
            </div>
        </div>
      </main>
    )
  }

  const goProduct = async () => { 
    trackFbq('AddToCart'); 
    try {
      if (resolvedState?.email) {
        const axios = (await import('axios')).default;
        await axios.put(`${API_BASE_URL}/api/quiz/mark-converted`, { email: resolvedState.email });
      }
    } catch (e) { console.error('Conversion track failed', e) }
    openCellStartUrl(buildRedirectUrl(PRODUCT_URL, 'product')) 
  }



  return (
    <main className="min-h-screen bg-neutral-100 text-[#111827]">
      {/* Expansive Left-Aligned Hero with Full Background */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-white">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/resultpage.png" 
            alt="ChronoNAD+™ Protocol Background" 
            className="w-full h-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 py-20">
          <div className="max-w-3xl text-left">
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-[#111827]">
              {insight?.categoryLabel || 'quiz results'}
            </span>
            
            <h1 className="mt-8 text-[2.2rem] md:text-[3.5rem] font-black tracking-tight text-[#111827] leading-[0.95] uppercase">
              Your results<br />are in!
            </h1>
            
            <p className="mt-12 max-w-2xl text-lg md:text-2xl leading-relaxed text-gray-800 font-medium">
              <span className="text-[#111827] font-bold">{insight?.headline}.</span> {insight?.body}
            </p>

            <div className="mt-14 flex flex-wrap gap-4">
              <button
                onClick={goProduct}
                className="rounded-[0.5rem] bg-[#005ba4] px-14 py-4 text-[11px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-blue-800 shadow-xl min-w-[240px]"
              >
                Shop NAD+
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Immersive Whole-Body Benefits Accordion */}
      <section id="benefits" className="bg-white px-6 py-24 md:py-32 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#003d7c] md:text-5xl">Whole-body benefits</h2>
            <p className="mt-4 text-sm text-gray-400 font-medium tracking-wide italic">
              Nourishing your cells for a more vibrant, energized lifecycle.
            </p>
          </div>

          <BenefitAccordion />
        </div>
      </section>

      {/* High-Fidelity Judge.me Review Widget */}
      <section className="bg-white px-6 py-20 border-t border-gray-100 font-sans">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-8">
            <span className="text-[12px] font-black text-blue-800 uppercase tracking-[0.3em]">Customer Reviews</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mt-4">Customer Reviews</h2>
          </div>

          <div className="flex flex-col items-center border-y border-gray-200 py-10 mb-8">
            <div className="flex flex-col items-center gap-2 mb-2">
              <StarRow n={5} />
              <span className="text-2xl md:text-3xl font-bold text-gray-900">4.94 out of 5</span>
            </div>
            <div className="flex items-center gap-1.5 mb-8">
              <span className="text-base md:text-lg font-bold text-gray-500">Based on 16 reviews</span>
              <svg className="w-5 h-5 text-[#00b2a9]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
              </svg>
            </div>

            {/* Star Distribution Breakdown */}
            <div className="w-full max-w-sm space-y-1.5 px-6">
              {[5, 4, 3, 2, 1].map((s) => {
                const count = s === 5 ? 15 : s === 4 ? 1 : 0
                const width = s === 5 ? '100%' : s === 4 ? '5%' : '0%'
                return (
                  <div key={s} className="flex items-center gap-4 text-[11px] font-bold text-gray-400 uppercase">
                    <div className="flex gap-0.5 shrink-0">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className={`w-3 h-3 ${i < s ? 'text-blue-800' : 'text-gray-200'}`} fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <div className="h-4 w-full bg-gray-50 rounded-sm overflow-hidden">
                      <div className="h-full bg-blue-800" style={{ width }} />
                    </div>
                    <span className="min-w-[12px]">{count}</span>
                  </div>
                )
              })}
            </div>

            <button 
              onClick={() => setIsReviewModalOpen(true)}
              className="mt-10 bg-[#005ba4] text-white px-24 py-2.5 text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-blue-800 transition-colors"
            >
              Write a review
            </button>
          </div>

          {/* Individual Reviews Stack */}
          <div className="space-y-0 border-t border-gray-100">
            {displayReviews.map((review, idx) => (
              <div key={idx} className="py-10 border-b border-gray-100 last:border-b-0 group">
                <div className="flex justify-between items-start mb-6">
                  <div className="flex flex-col gap-2">
                    <StarRow n={review.rating} />
                    <div className="flex items-center gap-2 mt-2">
                      <div className="w-6 h-6 rounded-full border border-blue-800 flex items-center justify-center p-1 overflow-hidden">
                         <svg className="w-full h-full text-blue-800" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                         </svg>
                      </div>
                      <span className="text-sm font-bold text-blue-800">{review.name}</span>
                      <svg className="w-4 h-4 text-[#00b2a9]" fill="currentColor" viewBox="0 0 20 20">
                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                      </svg>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-gray-300 tracking-wider font-mono">
                    {new Date(review.date).toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' })}
                  </span>
                </div>
                <h4 className="text-lg font-bold text-gray-900 mb-3">{review.title}</h4>
                <p className="text-base leading-relaxed text-gray-600 font-normal">
                  {review.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Write Review Modal */}
      <AnimatePresence>
        {isReviewModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-6 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg overflow-hidden rounded-sm bg-white shadow-2xl"
            >
              <div className="bg-[#003d7c] px-8 py-6 text-white text-center relative">
                <h3 className="text-xl font-bold">Write a review</h3>
                <button 
                  onClick={() => setIsReviewModalOpen(false)}
                  className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              
              <form onSubmit={handleSubmitReview} className="p-8 space-y-5 text-left">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Rating</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setNewReview({ ...newReview, rating: s })}
                        className="transition-transform active:scale-90"
                      >
                        <svg className={`w-8 h-8 ${s <= newReview.rating ? 'text-yellow-400' : 'text-gray-200'} fill-current`} viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Name</label>
                    <input
                      required
                      type="text"
                      value={newReview.name}
                      onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                      className="w-full rounded-sm border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Headline</label>
                    <input
                      required
                      type="text"
                      value={newReview.title}
                      onChange={(e) => setNewReview({ ...newReview, title: e.target.value })}
                      className="w-full rounded-sm border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Review Content</label>
                  <textarea
                    required
                    rows={4}
                    value={newReview.body}
                    onChange={(e) => setNewReview({ ...newReview, body: e.target.value })}
                    className="w-full rounded-sm border border-gray-200 bg-gray-50 px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-blue-800 resize-none"
                  />
                </div>

                <button
                  disabled={isSubmittingReview}
                  type="submit"
                  className="w-full rounded-sm bg-[#005ba4] py-4 text-xs font-bold uppercase tracking-widest text-white shadow-xl transition-all hover:bg-blue-800 disabled:opacity-50"
                >
                  {isSubmittingReview ? 'Posting...' : 'Submit Review'}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Final Footer Link */}
      <div className="bg-white py-12 text-center border-t border-gray-100">
        <Link 
          className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 transition-all hover:text-gray-900" 
          to="/"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
