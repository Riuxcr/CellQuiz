import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios'
import { trackEvent, identifyUser } from '../utils/pixels.js'
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
    info: 'Interestingly, the body views your skin as a "non-essential" organ compared to your heart or brain. When your cellular repair resources start to decline with age, your body diverts those resources inward to keep you alive, leaving your skin to fend for itself. This "resource diversion" is the primary reason why fine lines and loss of elasticity accelerate after age 30.',
    image: '/goal.jpg'
  },
  {
    id: 'age',
    question: 'What is your age range?',
    options: ['Under 30', '30-40', '40-60', 'Above 60'],
    info: 'Did you know your biological age (how old your cells act) can be significantly different from your chronological age (how many birthdays you\'ve had)? Most people can shift their biological markers by 3–5 years just by optimizing the factors we discuss next.',
    image: '/Age.png'
  },
]

const SKINCARE_PATH = [
  {
    id: 'routine',
    question: 'Do you have a skincare routine?',
    options: ['Yes', 'No'],
    info: 'Dermatologists often note a large part of visible skin aging is driven by UV exposure, which can be prevented with sunscreen. Including a retinol, facewash, and moisturizer into your routine are also great starting points.',
    image: '/skin.jpg'
  },
  {
    id: 'dermatologist',
    question: 'Have you seen a dermatologist?',
    options: ['Yes', 'No'],
    info: 'Everyone’s skin "biome" is as unique as a fingerprint. Seeing a professional can help identify whether a skin issue is inflammatory (internal) or reactive (external), saving you months of trial-and-error with products that might not be attacking the right problem.',
    image: '/dermo.jpg'
  },
  {
    id: 'severity',
    question: 'How severe is your skin issue?',
    type: 'scale',
    min: 1,
    max: 10,
    helperText: 'On a scale of 10, with 1 being the least severe and 10 the most severe. Scores of 5 and up often warrant a dermatologist visit.',
    info: 'Your skin completely replaces itself roughly every 28 to 40 days. If you\'re dealing with a high-severity issue, it’s important to remember that true structural change takes at least two full "cycles" to become visible. Remember to see your dermatologist.',
    image: '/skinSevere.jpg'
  },
]

const LONGEVITY_PATH = [
  {
    id: 'active',
    question: 'How active are you?',
    options: ['Highly Active', 'Moderately Active', 'Lightly Active', 'Sedentary'],

    info: 'Beyond intentional exercise, Non-Exercise Activity Thermogenesis (NEAT)—like pacing while on the phone or taking the stairs—can account for up to 50% of your daily energy burn. Staying "lightly active" throughout the day is often more impactful for longevity than one intense hour at the gym.',
    image: '/Active.png'
  },
  {
    id: 'sleep',
    question: 'How many hours of sleep do you typically get?',
    options: ['Optimal', 'Average', 'Insufficient', 'Deprived'],

    info: 'During deep sleep, your brain essentially "washes" itself, clearing out metabolic waste products that build up during the day. If you\'re consistently getting less than 7 hours, your body misses the window for this critical neurological cleanup.',
    image: '/Sleep.jpg'
  },
  {
    id: 'stress',
    question: 'How would you describe your current daily stress levels?',
    options: ['Low', 'Moderate', 'High', 'Chronic'],

    info: 'Did you know high stress doesn\'t just feel bad; it can actually "shorten" your DNA. Chronic stress is linked to the shortening of telomeres—the protective caps on the ends of your chromosomes—which is a primary marker of biological aging.',
    image: '/Stress.png'
  },
  {
    id: 'recovery',
    question: 'How long does it typically take your body to recover?',
    options: ['Rapid', 'Standard', 'Slow', 'Persistent'],

    info: 'Recovery time is a direct reflection of your body\'s "efficiency." The faster you can move from an inflammatory state (soreness/fatigue) back to homeostasis (balance), the more resilient your system is. Hydration and amino acid availability are the two biggest levers you can pull here.',
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
  const [sequenceNumber, setSequenceNumber] = useState(null)

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
    trackEvent('ViewContent', { 
      content_name: 'Quiz Startup',
      content_category: 'Analysis' 
    })
    warmQuizApi()
    
    // Initialize session for drop-off tracking
    axios.post(`${API_BASE_URL}/api/quiz/start-session`, { 
      sessionId 
    })
    .then(res => {
      if (res.data?.success) {
        setSequenceNumber(res.data.sequenceNumber)
      }
    })
    .catch(err => console.error('Failed to start session tracking:', err))
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

    // Log the interaction to the tracker immediately
    axios.put(`${API_BASE_URL}/api/quiz/track`, {
      sessionId,
      questionIndex: currentStep,
      answer: option
    }).catch(err => console.error('Silent tracking error:', err))

    const nextQuestionSet = getQuestionSetForAnswers(nextAnswers)

    if (currentStep < nextQuestionSet.length - 1) {
      setCurrentStep((s) => s + 1)
    } else {
    const goal = nextAnswers['goal'] || 'Unknown'
    trackEvent('CompleteRegistration', {
      content_name: 'Quiz Completed',
      goal: goal
    })
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
    const submittedName = (payload?.name ?? name).trim()
    if (!submittedEmail) return
    
    // Klaviyo "Identify" (Step 2)
    const _learnq = window._learnq || [];
    const goal = answers['goal'] || 'Unknown'
    
    // Segment logic
    let segment = 'unknown'
    if (goal === 'Skincare & anti-aging') {
      const hasRoutine = answers['routine'] === 'Yes'
      segment = hasRoutine ? 'skincare_with_routine' : 'skincare_no_routine'
    } else if (goal === 'Longevity & cellular repair') {
      const isActive = ['Highly Active', 'Moderately Active'].includes(answers['active'])
      segment = isActive ? 'longevity_active' : 'longevity_sedentary'
    }

    _learnq.push(['identify', {
      '$email': submittedEmail,
      '$first_name': submittedName,
      'Quiz Goal': goal,
      'Quiz Segment': segment
    }]);

    // Track identifying information
    identifyUser(submittedEmail, submittedName);

    // Track "Completed Quiz" event in Klaviyo

    const assignedVariant = sequenceNumber ? (sequenceNumber % 2 !== 0 ? 'checkout' : 'product') : 'product'
    
    const resultState = {
      answers: { ...answers },
      name: submittedName,
      email: submittedEmail,
      assignedVariant,
      sequenceNumber,
      goal,
      segment
    }

    try {
      sessionStorage.setItem(RESULT_STATE_STORAGE_KEY, JSON.stringify(resultState))
    } catch {
      /* ignore quota / private mode */
    }

    // Always redirect to results page (100% of users)
    navigate('/result', { state: resultState })
  }

  const progress = ((currentStep + 1) / total) * 100

  const shell = 'flex min-h-[100dvh] w-full flex-col'

  return (
    <main className={shell}>


      <div className="w-full flex-1 flex flex-col items-center justify-center">
        <AnimatePresence mode="wait">
          {showEmailStep ? (
            <motion.div
              key="email"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="w-full"
            >
              <EmailCapture
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                answers={answers}
                sessionId={sessionId}
                assignedVariant={sequenceNumber ? (sequenceNumber % 2 !== 0 ? 'checkout' : 'product') : 'product'}
                onSuccess={handleEmailSuccess}
              />
            </motion.div>
          ) : current ? (
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="w-full h-full flex flex-col"
            >
              <QuestionCard
                question={current.question}
                questionNumber={currentStep + 1}
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

