import { useEffect, useMemo, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { trackFbq } from '../utils/fbq.js'
import { API_BASE_URL } from '../config.js'
import {
  PRODUCT_URL,
  CHECKOUT_URL,
  buildRedirectUrl,
  openCellStartUrl,
  RESULT_STATE_STORAGE_KEY,
} from '../constants/cellstartUrls.js'
import {
  getPersonalizedInsight,
  getHeroImageForAnswers,
} from '../utils/personalizedResult.js'

const REVIEWS_URL = `${API_BASE_URL}/api/reviews`

function getProductRecommendation(answers) {
  if (!answers || typeof answers !== 'object') return null

  const goal = answers.goal || ''

  if (goal === 'Skincare & anti-aging') {
    return {
      title: 'ChronoNAD+™ for skin and cells',
      description:
        'Supports how your skin looks and feels by helping your cells with energy and healthy aging.',
      productUrl: PRODUCT_URL,
    }
  }

  if (goal === 'Longevity & cellular repair') {
    return {
      title: 'ChronoNAD+™ for longevity',
      description:
        'NAD+ and related support for energy, recovery, and how you age over time.',
      productUrl: PRODUCT_URL,
    }
  }

  return {
    title: 'ChronoNAD+™ daily support',
    description: 'Daily support for cellular energy and overall wellness.',
    productUrl: PRODUCT_URL,
  }
}

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
  return (
    answers != null &&
    typeof answers === 'object' &&
    Object.keys(answers).length > 0
  )
}

/** Four plain whole-body benefit cards (no jargon). */
const WHOLE_BODY_BENEFITS = [
  {
    title: 'Energy you notice',
    text: 'Many people use NAD+ support to feel steadier energy day to day—not a spike, more like a baseline.',
  },
  {
    title: 'Cells all over',
    text: 'Your whole body runs on cellular energy. This kind of support isn’t only for one organ or one goal.',
  },
  {
    title: 'Aging and repair',
    text: 'NAD+ is tied to how cells repair and age. That matters for skin, activity, and how you recover.',
  },
  {
    title: 'Fits a routine',
    text: 'One daily habit alongside food, sleep, and movement—without replacing what your doctor tells you.',
  },
]

const FALLBACK_REVIEWS = [
  {
    _id: 'fallback-1',
    name: 'Sarah M.',
    rating: 5,
    title: 'Part of my morning',
    body: 'Simple to take. I like that it’s one thing I don’t have to overthink.',
    date: new Date().toISOString(),
  },
  {
    _id: 'fallback-2',
    name: 'James T.',
    rating: 5,
    title: 'Steadier days',
    body: 'Hard to pin on one product, but I feel more consistent week to week.',
    date: new Date().toISOString(),
  },
  {
    _id: 'fallback-3',
    name: 'Elena R.',
    rating: 4,
    title: 'Good addition',
    body: 'I still see my derm and use my creams. This felt like a sensible add-on.',
    date: new Date().toISOString(),
  },
]

function StarRow({ n, max = 5 }) {
  return (
    <div className="flex gap-0.5" aria-hidden>
      {Array.from({ length: max }, (_, i) => (
        <svg
          key={i}
          className={`h-4 w-4 ${i < n ? 'text-amber-500' : 'text-gray-200'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

export default function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const [resolvedState, setResolvedState] = useState(() => location.state ?? null)
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await fetch(REVIEWS_URL)
        if (!res.ok) return
        const data = await res.json()
        if (!cancelled && Array.isArray(data)) setReviews(data)
      } catch {
        /* offline or CORS — keep empty, use fallback in UI */
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

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

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  const answers = resolvedState?.answers
  const firstName = resolvedState?.name?.trim()?.split(/\s+/)[0] || ''
  const preferredFlow = resolvedState?.preferredFlow === 'checkout' ? 'checkout' : 'product'

  const insight = useMemo(() => getPersonalizedInsight(answers), [answers])
  const recommendation = useMemo(() => getProductRecommendation(answers), [answers])
  const heroImage = useMemo(() => getHeroImageForAnswers(answers), [answers])

  const displayReviews = reviews.length > 0 ? reviews : FALLBACK_REVIEWS

  if (!hasQuizAnswers(answers)) {
    return (
      <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-6 py-12">
        <p className="text-center text-lg text-gray-600">
          No quiz data here. Finish the quiz first.
        </p>
        <div className="mt-8 flex justify-center gap-4 text-sm font-medium">
          <Link className="text-gray-900 underline underline-offset-4" to="/quiz">
            Start quiz
          </Link>
          <span className="text-gray-300">|</span>
          <Link className="text-gray-900 underline underline-offset-4" to="/">
            Home
          </Link>
        </div>
      </main>
    )
  }

  const productHref = buildRedirectUrl(PRODUCT_URL, 'product')
  const checkoutHref = buildRedirectUrl(CHECKOUT_URL, 'checkout')

  const goProduct = () => {
    trackFbq('AddToCart')
    openCellStartUrl(productHref)
  }

  const goCheckout = () => {
    trackFbq('InitiateCheckout')
    openCellStartUrl(checkoutHref)
  }

  return (
    <main className="min-h-[100dvh] bg-white text-gray-900">
      {/* Hero: full background, copy on the left only — no floating cards */}
      <section
        className="relative flex min-h-[min(78vh,820px)] items-center"
        aria-labelledby="result-title"
      >
        <div
          className="absolute inset-0 bg-slate-800 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        {/* Readability: stronger darkening on the left where the text sits */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/25 md:from-black/75 md:via-black/40 md:to-transparent"
          aria-hidden
        />

        <div className="relative z-10 w-full px-6 py-20 md:px-12 lg:px-16">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-xl text-left text-white">
              <p className="text-sm font-medium text-white/80">Your results</p>
              <h1 id="result-title" className="mt-2 text-3xl font-bold leading-tight md:text-4xl lg:text-[2.5rem]">
                {firstName ? `${firstName}, ` : ''}
                {insight?.headline ?? 'Here is what we took from your answers'}
              </h1>
              <p className="mt-3 text-base leading-relaxed text-white/85">
                Based on your quiz—not a medical diagnosis. This is plain language around how
                ChronoNAD+ might fit your goals.
              </p>
              {insight?.categoryLabel && (
                <p className="mt-6 text-xs font-semibold uppercase tracking-wide text-white/60">
                  {insight.categoryLabel}
                </p>
              )}
              <p className="mt-2 text-base leading-relaxed text-white/90">{insight?.body}</p>

              {recommendation && (
                <div className="mt-8 border-t border-white/20 pt-8">
                  <p className="text-sm font-semibold text-white">{recommendation.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-white/80">
                    {recommendation.description}
                  </p>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  onClick={goProduct}
                  className={`rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors ${
                    preferredFlow === 'product'
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'border border-white/40 bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  View product
                </button>
                <button
                  type="button"
                  onClick={goCheckout}
                  className={`rounded-xl px-6 py-3.5 text-sm font-semibold transition-colors ${
                    preferredFlow === 'checkout'
                      ? 'bg-white text-gray-900 hover:bg-gray-100'
                      : 'border border-white/40 bg-transparent text-white hover:bg-white/10'
                  }`}
                >
                  Go to checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Whole-body benefits: 4 simple cards */}
      <section className="border-t border-gray-100 bg-gray-50 px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Whole-body benefits</h2>
          <p className="mt-2 max-w-2xl text-gray-600">
            How people usually think about this product—in everyday words.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {WHOLE_BODY_BENEFITS.map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="px-6 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-gray-900 md:text-3xl">Reviews</h2>
          <p className="mt-2 text-gray-600">
            {reviews.length > 0
              ? 'From people who left a review.'
              : 'Sample feedback—share yours when the review list is live.'}
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {displayReviews.map((review, idx) => (
              <article
                key={review._id || idx}
                className="rounded-2xl border border-gray-200 bg-gray-50/80 p-6"
              >
                <StarRow n={review.rating} />
                <h3 className="mt-3 font-semibold text-gray-900">{review.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">{review.body}</p>
                <p className="mt-4 text-xs font-medium text-gray-500">— {review.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="border-t border-gray-100 px-6 py-10 text-center">
        <Link className="text-sm text-gray-500 underline underline-offset-4 hover:text-gray-900" to="/">
          Back to home
        </Link>
      </div>
    </main>
  )
}
