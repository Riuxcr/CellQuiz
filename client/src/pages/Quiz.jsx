import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
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
    info: 'Interestingly, the body views your skin as a "non-essential" organ. As repair resources decline with age, they’re diverted inward—leaving your skin to show the first signs of aging after 30.',
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

const SKINCARE_ENTRY_QUESTION = {
  id: 'skin_goal',
  question: 'What would you like to improve most about your skin?',
  options: [
    'Look more youthful (fine lines, firmness)',
    'Brighter, more even glow',
    'Calm irritation or sensitivity'
  ],
  info: 'Did you know? Changes in your skin often come from a mix of lifestyle, environment, and your daily routine.',
  image: '/skin.jpg'
}

const ANTI_AGING_PATH = [
  {
    id: 'aging_signs',
    question: 'Which signs of aging are you noticing most?',
    options: [
      'Fine lines or wrinkles',
      'Loss of firmness',
      'Uneven skin tone',
      'Dull-looking skin'
    ],
    info: 'As we age, our skin’s natural production of collagen and elastin slows down, leading to visible changes in texture and elasticity.',
    image: '/skin.jpg'
  },
  {
    id: 'commitment',
    question: 'How serious are you about improving your skin?',
    options: [
      'I want noticeable results fast',
      'I’m consistent but prefer simple routines',
      'I just want to maintain my skin'
    ],
    info: 'Small, consistent routines tend to outperform complex routines that aren’t followed regularly.',
    image: '/Firstcard.jpg'
  },
  {
    id: 'current_routine',
    question: 'What’s your current routine like?',
    options: [
      'I use serums and treatments regularly',
      'Cleanser + moisturizer mostly',
      'I don’t really have a routine'
    ],
    info: 'Consistency is the most important factor in any skincare routine, regardless of how many steps it has.',
    image: '/dermo.jpg'
  },
]

const GLOW_PATH = [
  {
    id: 'glow_frustration',
    question: 'What’s your biggest frustration with your skin right now?',
    options: [
      'It looks dull or tired',
      'My skin tone feels uneven',
      'It lacks that natural glow'
    ],
    info: 'Dullness is often caused by a buildup of dead skin cells or lack of hydration, which prevents light from reflecting evenly off your skin.',
    image: '/skin.jpg'
  },
  {
    id: 'worst_time',
    question: 'When does your skin look its worst?',
    options: [
      'In the morning',
      'During the day',
      'It looks the same all the time'
    ],
    info: 'Skin often looks different throughout the day due to changes in hydration, blood flow, and environmental exposure.',
    image: '/Time.png'
  },
  {
    id: 'glow_routine_pref',
    question: 'What kind of routine do you prefer?',
    options: [
      'Simple and quick',
      'A few effective steps',
      'I don’t mind multiple steps'
    ],
    info: 'A simple routine followed daily can be more effective than an inconsistent multi-step routine.',
    image: '/dermo.jpg'
  },
]

const SENSITIVE_PATH = [
  {
    id: 'sensitive_issue',
    question: 'What are you currently dealing with?',
    options: [
      'Redness',
      'Breakouts',
      'Skin that feels irritated'
    ],
    info: 'Sensitivity can be a sign that your skin barrier is compromised, making it more reactive to environmental triggers.',
    image: '/skin.jpg'
  },
  {
    id: 'sensitive_severity',
    question: 'Which statement sounds most like your skin?',
    options: [
      'My skin is easy to manage',
      'I get occasional reactions',
      'My skin is very sensitive'
    ],
    info: 'Identifying your skin’s unique triggers is the first step toward achieving a calm, balanced complexion.',
    image: '/skinSevere.jpg'
  },
  {
    id: 'sensitive_priority',
    question: 'What matters most in your skincare?',
    options: [
      'Gentle, calming products',
      'Something that won’t cause breakouts',
      'Just keeping my skin balanced'
    ],
    info: 'Strengthening your skin barrier can improve how your skin responds to other products.',
    image: '/dermo.jpg'
  },
]

const SKINCARE_COMMON_END = [
  {
    id: 'dermatologist',
    question: 'Have you seen a dermatologist?',
    options: ['Yes', 'No'],
    info: 'Everyone’s skin "biome" is as unique as a fingerprint. Seeing a professional can help identify whether a skin issue is inflammatory (internal) or reactive (external).',
    image: '/dermo.jpg'
  },
  {
    id: 'severity',
    question: 'How severe is your skincare issue?',
    type: 'scale',
    min: 1,
    max: 10,
    helperText: 'On a scale of 10, with 1 being the least severe and 10 the most severe.',
    info: 'True structural change in skin typically takes at least two full renewal cycles (roughly 60-80 days) to become visible.',
    image: '/skinSevere.jpg'
  }
]

const LONGEVITY_PATH = [
  {
    id: 'health_frustration',
    question: 'What’s your biggest health frustration right now?',
    options: [
      'Brain fog / poor focus',
      'Low energy throughout the day',
      'Stress / burnout',
      'Poor sleep / tired mornings',
      'Joint discomfort / stiffness',
      'Digestive issues',
      'General aging / prevention'
    ],
    info: 'Did you know - “Most people usually notice the first sign of aging in their bodily function.”',
    image: '/Active.png'
  },
  {
    id: 'refreshed_wake',
    question: 'How often do you wake up feeling fully refreshed?',
    options: ['Almost never', 'Rarely', 'Sometimes', 'Most days', 'Always'],
    info: 'Quality sleep is essential for the glymphatic system to clear metabolic waste from the brain.',
    image: '/Sleep.jpg'
  },
  {
    id: 'activity_level',
    question: 'How active are you?',
    options: ['Sedentary', 'Lightly active', 'Moderately active', 'Very active'],
    info: 'Physical activity stimulates mitochondrial biogenesis, which is the creation of new energy-producing centers in your cells.',
    image: '/Active.png'
  },
  {
    id: 'mental_clarity',
    question: 'Do you struggle with mental clarity or focus during the day?',
    options: ['Constantly struggle', 'Often struggle', 'Sometimes', 'Rarely'],
    info: 'Did you know - “Cognitive fatigue often shows up before physical fatigue does.”',
    image: '/Stress.png'
  },
  {
    id: 'stress_levels',
    question: 'How would you describe your stress levels lately?',
    options: ['Very high', 'High', 'Moderate', 'Low', 'Very low'],
    info: 'Did you know - “Stress can quietly affect sleep, energy, and overall recovery more than most people realize.”',
    image: '/Stress.png'
  },
  {
    id: 'sleep_hours',
    question: 'How many hours of sleep do you typically get?',
    options: ['<5 hours', '5–6 hours', '6–7 hours', '7–8 hours', '8+ hours'],
    info: 'Most adults require 7-9 hours of sleep to allow for complete cellular repair cycles.',
    image: '/Sleep.jpg'
  },
  {
    id: 'energy_crashes',
    question: 'Do you feel like your energy crashes as the day goes on?',
    options: ['Yes, daily', 'Often (afternoon)', 'Sometimes', 'Rarely'],
    info: 'Mid-day energy dips are often a sign of mitochondrial inefficiency or blood sugar fluctuations.',
    image: '/Active.png'
  },
  {
    id: 'mental_sharpness',
    question: 'How important is staying mentally sharp as you age?',
    options: ['Extremely important', 'Very important', 'Somewhat important', 'Not important'],
    info: 'Did you know - “Mental performance is closely tied to cellular energy and long-term brain support.”',
    image: '/Stress.png'
  },
  {
    id: 'joint_recovery',
    question: 'Do you experience joint discomfort, stiffness, or slower recovery?',
    options: ['Frequent pain/stiffness', 'Sometimes', 'Rarely', 'Never'],
    info: 'Systemic inflammation can manifest as joint stiffness and prolonged muscle soreness after activity.',
    image: '/recover.png'
  },
  {
    id: 'digestion_health',
    question: 'How would you rate your digestion and gut health?',
    options: ['Frequent issues', 'Occasional bloating', 'Mostly fine', 'Excellent'],
    info: 'Did you know - “Gut health plays a key role in how well your body absorbs nutrients, creates and retains energy, and overall wellbeing.”',
    image: '/Firstcard.jpg'
  },
  {
    id: 'aging_concern',
    question: 'What aging concern matters most to you?',
    options: [
      'Energy decline',
      'Mental decline',
      'Physical decline (mobility)',
      'General aging prevention'
    ],
    info: 'Identifying your top concerns allows for a more targeted approach to longevity and cellular repair.',
    image: '/Age.png'
  },
  {
    id: 'health_goal_12m',
    question: 'What’s your main health goal over the next 12 months?',
    options: [
      'More energy',
      'Better focus',
      'Better recovery/sleep',
      'Better mobility',
      'General health optimization'
    ],
    info: 'Setting clear, long-term health goals is the first step toward meaningful biological change.',
    image: '/goal.jpg'
  },
]

export default function Quiz() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
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

    if (goal === 'Skincare & anti-aging') {
      const skinGoal = currentAnswers['skin_goal']
      const base = [...COMMON_QUESTIONS, SKINCARE_ENTRY_QUESTION]
      
      if (!skinGoal) return base
      
      if (skinGoal === 'Look more youthful (fine lines, firmness)') {
        return [...base, ...ANTI_AGING_PATH, ...SKINCARE_COMMON_END]
      }
      if (skinGoal === 'Brighter, more even glow') {
        return [...base, ...GLOW_PATH, ...SKINCARE_COMMON_END]
      }
      if (skinGoal === 'Calm irritation or sensitivity') {
        return [...base, ...SENSITIVE_PATH, ...SKINCARE_COMMON_END]
      }
      return base
    }

    return [...COMMON_QUESTIONS, ...LONGEVITY_PATH]
  }

  // Extract tracking parameters
  const trackingData = {
    source: searchParams.get('source'),
    utm_source: searchParams.get('utm_source'),
    utm_medium: searchParams.get('utm_medium'),
    utm_campaign: searchParams.get('utm_campaign'),
    utm_content: searchParams.get('utm_content'),
    utm_term: searchParams.get('utm_term'),
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
      SKINCARE_ENTRY_QUESTION,
      ...ANTI_AGING_PATH,
      ...GLOW_PATH,
      ...SENSITIVE_PATH,
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

  const handleClose = () => {
    navigate('/feel-young')
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
      const skinGoal = answers['skin_goal']
      if (skinGoal === 'Look more youthful (fine lines, firmness)') segment = 'skincare_anti_aging'
      else if (skinGoal === 'Brighter, more even glow') segment = 'skincare_glow'
      else if (skinGoal === 'Calm irritation or sensitivity') segment = 'skincare_sensitive'
    } else if (goal === 'Longevity & cellular repair') {
      const isActive = ['Very active', 'Moderately active'].includes(answers['activity_level'])
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
                trackingData={trackingData}
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
                onClose={currentStep === 0 ? handleClose : null}
              />

            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </main>
  )
}

