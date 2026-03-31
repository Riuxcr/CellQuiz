import { useEffect, useMemo, useState } from 'react'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { trackFbq } from '../utils/fbq.js'
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

function getProductRecommendation(answers) {
  if (!answers || typeof answers !== 'object') return null

  const goal = answers.goal || ''

  if (goal === 'Skincare & anti-aging') {
    return {
      title: 'ChronoNAD+™ Cellular Skin Protocol',
      description:
        'Nourishing your cells for a more vibrant, energized lifecycle. This protocol targets aging at the source to support skin resilience and cellular repair from the inside out.',
      productUrl: PRODUCT_URL,
    }
  }

  if (goal === 'Longevity & cellular repair') {
    return {
      title: 'ChronoNAD+™ Total Longevity System',
      description:
        'Fight Father Time and replenish what time takes. Our signature NAD+ and Resveratrol blend supports DNA maintenance, mitochondrial function, and healthy aging.',
      productUrl: PRODUCT_URL,
    }
  }

  return {
    title: 'ChronoNAD+™ Daily Cellular Support',
    description:
      'A comprehensive approach to cellular wellness. Replenish your NAD+ levels to support energy, metabolism, and long-term biological health.',
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

const HERO_BENEFITS = [
  'Supports cellular energy & NAD+ pathways',
  'Designed for daily, long-term wellness',
  'Pairs with your lifestyle and goals',
]

export default function Result() {
  const location = useLocation()
  const navigate = useNavigate()
  const [resolvedState, setResolvedState] = useState(() => location.state ?? null)

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

  if (!hasQuizAnswers(answers)) {
    return (
      <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-6 py-12">
        <p className="text-center text-lg font-medium text-gray-500">
          No profile data found. Please complete the analysis.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 text-sm font-semibold">
          <Link
            className="text-[#111827] underline decoration-gray-300 underline-offset-4 transition-all hover:decoration-[#111827]"
            to="/quiz"
          >
            Start Analysis
          </Link>
          <span className="text-gray-300">|</span>
          <Link
            className="text-[#111827] underline decoration-gray-300 underline-offset-4 transition-all hover:decoration-[#111827]"
            to="/"
          >
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
    <main className="min-h-[100dvh] bg-white text-[#111827]">
      {/* Hero: background image + overlay + primary message */}
      <section
        className="relative isolate flex min-h-[min(88vh,900px)] flex-col justify-end overflow-hidden pb-16 pt-28 md:justify-center md:pb-24 md:pt-32"
        aria-labelledby="result-hero-heading"
      >
        <div
          className="absolute inset-0 bg-slate-900 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/80 to-slate-950/95"
          aria-hidden
        />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(96,165,250,0.15),transparent)]" />

        <div className="relative z-10 mx-auto w-full max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="text-[11px] font-semibold uppercase tracking-[0.35em] text-blue-200/90"
          >
            Your results are in
          </motion.p>
          <motion.h1
            id="result-hero-heading"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.06 }}
            className="mt-5 text-balance text-[clamp(2rem,5vw,3.25rem)] font-extrabold leading-[1.08] tracking-tight text-white"
          >
            {firstName ? `${firstName}, ` : ''}
            {insight?.headline ?? 'Your personalized protocol'}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-pretty text-lg font-medium leading-relaxed text-white/85 md:text-xl"
          >
            Personalized results based on your quiz answers—plus how ChronoNAD+ may complement
            your goals.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18 }}
            className="mx-auto mt-10 flex max-w-xl flex-col gap-3 text-left sm:max-w-none sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-6 sm:gap-y-2"
          >
            {HERO_BENEFITS.map((line) => (
              <li
                key={line}
                className="flex items-start gap-2 text-sm font-medium text-white/90 sm:inline-flex sm:items-center"
              >
                <span
                  className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400 sm:mt-0"
                  aria-hidden
                />
                {line}
              </li>
            ))}
          </motion.ul>

          <motion.figure
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.24 }}
            className="mx-auto mt-12 max-w-lg rounded-2xl border border-white/10 bg-white/[0.07] p-6 text-left shadow-[0_24px_80px_-24px_rgba(0,0,0,0.5)] backdrop-blur-md md:p-8"
          >
            <blockquote className="text-base font-medium leading-relaxed text-white/95 md:text-lg">
              “I wanted something that fit my routine—not another complicated stack. Within a few
              weeks I felt more consistent energy, and it’s become part of my morning ritual.”
            </blockquote>
            <figcaption className="mt-4 text-xs font-semibold uppercase tracking-widest text-white/50">
              — Verified ChronoNAD+ customer
            </figcaption>
          </motion.figure>
        </div>
      </section>

      {/* Personalized narrative */}
      <section className="mx-auto max-w-3xl px-6 py-16 md:py-24" aria-labelledby="insight-heading">
        <p className="text-center text-[11px] font-bold uppercase tracking-[0.3em] text-gray-400">
          {insight?.categoryLabel ?? 'Your results'}
        </p>
        <h2
          id="insight-heading"
          className="mt-4 text-center text-2xl font-extrabold tracking-tight text-[#111827] md:text-3xl"
        >
          {insight?.headline}
        </h2>
        <p className="mt-8 text-lg leading-relaxed text-gray-600">{insight?.body}</p>
      </section>

      {/* Product + CTAs */}
      {recommendation && (
        <section className="border-t border-gray-100 bg-gray-50/80 px-6 py-16 md:py-20">
          <div className="mx-auto max-w-3xl">
            <div className="overflow-hidden rounded-[2rem] border border-gray-200 bg-white p-10 text-center shadow-xl shadow-gray-200/40 md:p-14">
              <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-2xl bg-gray-50">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="h-10 w-10 text-[#111827]"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z"
                  />
                </svg>
              </div>

              <h3 className="text-3xl font-extrabold leading-tight sm:text-4xl">
                {recommendation.title.split('™').map((part, index, array) => (
                  <span key={index}>
                    {part}
                    {index < array.length - 1 && <span className="text-blue-500">™</span>}
                  </span>
                ))}
              </h3>
              <p className="mx-auto mt-6 max-w-xl text-lg font-medium leading-relaxed text-gray-500">
                {recommendation.description}
              </p>

              <div className="mx-auto mt-12 flex w-full max-w-lg flex-col gap-4 sm:flex-row">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className={`w-full rounded-2xl px-8 py-5 text-lg font-bold transition-all sm:flex-1 ${
                    preferredFlow === 'product'
                      ? 'bg-[#111827] text-white shadow-lg hover:bg-black'
                      : 'border-2 border-gray-200 bg-white text-[#111827] hover:bg-gray-50'
                  }`}
                  onClick={goProduct}
                >
                  View product
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className={`w-full rounded-2xl px-8 py-5 text-lg font-bold transition-all sm:flex-1 ${
                    preferredFlow === 'checkout'
                      ? 'bg-[#111827] text-white shadow-lg hover:bg-black'
                      : 'border-2 border-gray-200 bg-white text-[#111827] hover:bg-gray-50'
                  }`}
                  onClick={goCheckout}
                >
                  Go to checkout
                </motion.button>
              </div>
              <p className="mt-6 text-xs text-gray-400">
                Your recommended next step is highlighted based on your profile—we still show both
                options so you can choose what fits best.
              </p>
            </div>
          </div>
        </section>
      )}

      <section className="mx-auto max-w-4xl px-6 py-16">
        <h4 className="text-center text-[10px] font-black uppercase tracking-[0.35em] text-gray-400">
          What to expect
        </h4>
        <div className="mt-10 grid gap-10 md:grid-cols-4">
          {[
            {
              label: 'Stage 1',
              title: 'Replenish',
              desc: 'Supporting the NAD+ pool at the cellular level.',
            },
            {
              label: 'Stage 2',
              title: 'Energy',
              desc: 'Many people notice steadier day-to-day vitality.',
            },
            {
              label: 'Stage 3',
              title: 'Consistency',
              desc: 'Routine use supports long-term wellness habits.',
            },
            {
              label: 'Stage 4',
              title: 'Maintain',
              desc: 'Ongoing support for healthy aging pathways.',
            },
          ].map((item) => (
            <div key={item.label}>
              <div className="mb-2 text-[10px] font-black uppercase tracking-widest text-blue-500">
                {item.label}
              </div>
              <div className="text-lg font-bold text-[#111827]">{item.title}</div>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="pb-16 text-center">
        <Link
          className="text-xs font-black uppercase tracking-widest text-gray-400 underline-offset-8 transition-all hover:text-[#111827] hover:underline"
          to="/"
        >
          Back to home
        </Link>
      </div>
    </main>
  )
}
