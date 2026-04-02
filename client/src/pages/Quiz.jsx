import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import { trackFbq } from '../utils/fbq.js'
import QuestionCard from '../components/QuestionCard.jsx'
import EmailCapture from '../components/EmailCapture.jsx'
import { warmQuizApi } from '../utils/warmQuizApi.js'
import { API_BASE_URL } from '../config.js'
import {
  RESULT_STATE_STORAGE_KEY,
  CHECKOUT_URL,
  buildRedirectUrl,
} from '../constants/cellstartUrls.js'

// Order: goal first, then age — then branch into skincare or longevity path.
const COMMON_QUESTIONS = [
  {
    id: 'goal',
    question: 'Which goal is more important to you?',
    options: ['Skincare & anti-aging', 'Longevity & cellular repair'],
    info: 'Whether you focus on your skin or your internal cells, NAD+ is the foundational fuel for both repair processes.',
    image: '/goal.jpg'
  },
  {
    id: 'age',
    question: 'What is your age range?',
    options: ['Under 30', '30-40', '40-60', 'Above 60'],
    info: 'Did you know your biological age (how old your cells act) can be significantly different from your chronological age (how many birthdays you’ve had)? Most people can shift their biological markers by 3–5 years just by optimizing the factors we discuss next.',
    image: '/Age.png'
  },
]

const SKINCARE_PATH = [
  {
    id: 'routine',
    question: 'Do you have a skincare routine?',
    options: ['Yes', 'No'],
    info: 'A consistent routine provides the structural foundation that helps personalized supernutrients like NAD+ work more effectively.',
    image: '/skin.jpg'
  },
  {
    id: 'dermatologist',
    question: 'Have you seen a dermatologist?',
    options: ['Yes', 'No'],
    info: 'Everyone’s skin “biome” is as unique as a fingerprint. Seeing a professional can help identify whether a skin issue is inflammatory (internal) or reactive (external), saving you months of trial-and-error with products that might not be attacking the right problem.',
    image: '/dermo.jpg'
  },
  {
    id: 'severity',
    question: 'How severe is your skin issue?',
    type: 'scale',
    min: 1,
    max: 10,
    helperText: 'On a scale of 10, with 1 being the least severe and 10 the most severe. Scores of 5 and up often warrant a dermatologist visit.',
    info: 'Higher severity often indicates a greater need for deep cellular repair to reset the skin’s natural healing cycle.',
    image: '/skinSevere.jpg'
  },
]

const LONGEVITY_PATH = [
  {
    id: 'active',
    question: 'How active are you?',
    options: ['Highly Active', 'Moderately Active', 'Lightly Active', 'Sedentary'],

    info: 'Beyond intentional exercise, Non-Exercise Activity Thermogenesis (NEAT)—like pacing while on the phone or taking the stairs—can account for up to 50% of your daily energy burn. Staying “lightly active” throughout the day is often more impactful for longevity than one intense hour at the gym.',
    image: '/Active.png'
  },
  {
    id: 'sleep',
    question: 'How many hours of sleep do you typically get?',
    options: ['Optimal', 'Average', 'Insufficient', 'Deprived'],

    info: 'During deep sleep, your brain essentially “washes” itself, clearing out metabolic waste products that build up during the day. If you’re consistently getting less than 7 hours, your body misses the window for this critical neurological cleanup.',
    image: '/Sleep.jpg'
  },
  {
    id: 'stress',
    question: 'How would you describe your current daily stress levels?',
    options: ['Low', 'Moderate', 'High', 'Chronic'],

    info: 'Did you know high stress doesn’t just feel bad; it can actually “shorten” your DNA. Chronic stress is linked to the shortening of telomeres—the protective caps on the ends of your chromosomes—which is a primary marker of biological aging.',
    image: '/Stress.png'
  },
  {
    id: 'recovery',
    question: 'How long does it typically take your body to recover?',
    options: ['Rapid', 'Standard', 'Slow', 'Persistent'],

    info: 'Recovery time is a direct reflection of your body’s “efficiency.” The faster you can move from an inflammatory state (soreness/fatigue) back to homeostasis (balance), the more resilient your system is. Hydration and amino acid availability are the two biggest levers you can pull here.',
    image: '/recover.png'
  },
]

export default function Quiz() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [showEmailStep, setShowEmailStep] = useState(false)

  // Determine current question set based on goal selection
  const getQuestionSetForAnswers = (currentAnswers) => {
    const goal = currentAnswers['goal']
    if (!goal) return COMMON_QUESTIONS
    if (goal === 'Skincare & anti-aging') return [...COMMON_QUESTIONS, ...SKINCARE_PATH]
    return [...COMMON_QUESTIONS, ...LONGEVITY_PATH]
  }

  const questionSet = getQuestionSetForAnswers(answers)
  const current = questionSet[currentStep]
  const total = questionSet.length

  const [sessionId] = useState(() => `sess_${Math.random().toString(36).substring(2, 11)}_${Date.now()}`)

  useEffect(() => {
    trackFbq('ViewContent')
    warmQuizApi()
    
    // Initialize session for drop-off tracking
    axios.post(`${API_BASE_URL}/api/quiz/start-session`, { 
      sessionId 
    }).catch(err => console.error('Failed to start session tracking:', err))
  }, [])

  // Track progress on every step change
  useEffect(() => {
    const questionIndex = showEmailStep ? questionSet.length : currentStep
    axios.put(`${API_BASE_URL}/api/quiz/track`, {
      sessionId,
      questionIndex
    }).catch(err => console.error('Failed to track progress:', err))
  }, [currentStep, showEmailStep, sessionId])

  useEffect(() => {
    if (!showEmailStep) return
    warmQuizApi()
    const id = window.setTimeout(warmQuizApi, 800)
    return () => clearTimeout(id)
  }, [showEmailStep])

  // Warm browser cache for quiz art: first image immediately, rest when idle (smoother step-to-step).
  useEffect(() => {
    const preload = (src) => {
      const im = new Image()
      im.src = src
    }
    const first = COMMON_QUESTIONS[0]?.image
    if (first) preload(first)

    const allUrls = [
      ...COMMON_QUESTIONS,
      ...SKINCARE_PATH,
      ...LONGEVITY_PATH,
    ]
      .map((q) => q.image)
      .filter(Boolean)
    const unique = [...new Set(allUrls)]

    const run = () => {
      unique.forEach(preload)
    }
    if (typeof requestIdleCallback === 'function') {
      const id = requestIdleCallback(run, { timeout: 2500 })
      return () => cancelIdleCallback(id)
    }
    const t = setTimeout(run, 400)
    return () => clearTimeout(t)
  }, [])

  const handleSelect = (option) => {
    const nextAnswers = { ...answers, [current.id]: option }
    setAnswers(nextAnswers)

    const nextQuestionSet = getQuestionSetForAnswers(nextAnswers)

    if (currentStep < nextQuestionSet.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
      trackFbq('CompleteRegistration')
      setShowEmailStep(true)
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1)
    }
  }

  const stableSplit = (seed) => {
    // Stable "random" assignment so the same user/email
    // is routed consistently during an A/B test.
    // Simple string hash -> odd/even decision.
    let hash = 0
    for (let i = 0; i < seed.length; i++) {
      hash = (hash << 5) - hash + seed.charCodeAt(i)
      hash |= 0 // force 32-bit
    }
    return Math.abs(hash)
  }

  const handleEmailSuccess = (payload) => {
    const submittedEmail = (payload?.email ?? email).trim().toLowerCase()
    if (!submittedEmail) return
    
    // 25/75 Split: 0 -> checkout (25%), 1,2,3 -> results (75%)
    const splitValue = stableSplit(submittedEmail) % 4
    const isDirectToCheckout = splitValue === 0 

    const resultState = {
      answers: { ...answers },
      name: (payload?.name ?? name).trim(),
      email: submittedEmail,
      preferredFlow: isDirectToCheckout ? 'checkout' : 'product',
    }

    try {
      sessionStorage.setItem(RESULT_STATE_STORAGE_KEY, JSON.stringify(resultState))
    } catch {
      /* ignore quota / private mode */
    }

    if (isDirectToCheckout) {
      // Redirect directly to checkout for 25% of users
      window.location.href = buildRedirectUrl(CHECKOUT_URL, 'checkout')
    } else {
      // Redirect to results page for 75% of users
      navigate('/result', { state: resultState })
    }
  }

  const shell = 'mx-auto flex min-h-[100dvh] w-full max-w-[1400px] flex-col justify-center px-6 py-12'

  return (
    <main className={shell}>
      <div className="w-full flex flex-col items-center">

        
        <AnimatePresence mode="wait">
          {showEmailStep ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -40 }}
              className="w-full"
            >
              <EmailCapture
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                answers={answers}
                sessionId={sessionId}
                onSuccess={handleEmailSuccess}
              />
            </motion.div>
          ) : current ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <QuestionCard
                question={current.question}
                options={current.options}
                type={current.type}
                min={current.min}
                max={current.max}
                helperText={current.helperText}
                info={current.info}
                image={current.image}
                onSelect={handleSelect}
                onBack={currentStep > 0 ? handleBack : null}
              />

            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  )
}
