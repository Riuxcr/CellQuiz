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
  CHECKOUT_URL
} from '../constants/cellstartUrls.js'
import {
  getPersonalizedInsight,
  getHeroImageForAnswers,
} from '../utils/personalizedResult.js'
import Logo from '../components/Logo.jsx'



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

function VideoCard({ ugc }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <motion.div 
        whileHover={{ y: -10 }}
        onClick={() => setIsOpen(true)}
        className="relative aspect-[9/16] w-full overflow-hidden rounded-[2rem] bg-gray-100 shadow-xl cursor-pointer group"
      >
        <img 
          src={ugc.thumb} 
          alt={ugc.title} 
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/20 transition-opacity duration-300 group-hover:bg-black/40" />
        
        <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-16 w-16 md:h-20 md:w-20 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 transition-transform duration-300 group-hover:scale-110">
                <svg className="w-6 h-6 md:w-10 md:h-10 text-white translate-x-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6 4l12 6-12 6V4z" />
                </svg>
            </div>
        </div>

        {/* Text Details */}
        <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <h4 className="text-xl md:text-2xl font-black text-white leading-tight uppercase">{ugc.title}</h4>
          <p className="mt-1 text-xs md:text-sm font-bold text-white/60 uppercase tracking-widest">{ugc.desc}</p>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black px-4 md:px-0 bg-opacity-95">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative aspect-[9/16] h-[85vh] max-w-full overflow-hidden rounded-3xl"
            >
              <video 
                src={ugc.video} 
                className="h-full w-full object-cover"
                controls
                autoPlay
              />
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setIsOpen(false)
                }}
                className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}

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

  useEffect(() => { window.scrollTo({ top: 0, left: 0, behavior: 'auto' }) }, [])

  const answers = resolvedState?.answers
  const insight = useMemo(() => getPersonalizedInsight(answers), [answers])
  const heroImage = '/Result.jpg' // Updated as requested

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
    
    // Determine variant first for tracking accuracy
    let variant = 'product';
    if (resolvedState?.sequenceNumber) {
      variant = (resolvedState.sequenceNumber % 2 !== 0) ? 'checkout' : 'product';
    } else {
      variant = Math.random() < 0.5 ? 'product' : 'checkout';
    }

    try {
      if (resolvedState?.email) {
        const axios = (await import('axios')).default;
        await axios.put(`${API_BASE_URL}/api/quiz/mark-converted`, { 
          email: resolvedState.email,
          destination: variant,
          sessionId: resolvedState.sessionId
        });
      }
    } catch (e) { console.error('Conversion track failed', e) }
    
    const targetBaseUrl = variant === 'product' ? PRODUCT_URL : CHECKOUT_URL;
    openCellStartUrl(buildRedirectUrl(targetBaseUrl, variant));
  }



  return (
    <main className="min-h-screen bg-neutral-100 text-[#111827]">
      {/* Expansive Left-Aligned Hero with Full Background */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden bg-white">
        {/* Full-width Background Image */}
        <div className="absolute inset-0 z-0">
          <picture>
            <source media="(max-width: 768px)" srcSet="/Quizmobile.png" />
            <img 
              src="/resultpage.png" 
              alt="ChronoNAD+™ Protocol Background" 
              className="w-full h-full object-cover"
            />
          </picture>
          {/* Mobile-only overlay for text legibility */}
          <div className="absolute inset-0 bg-black/50 md:hidden" />
        </div>

        {/* Company Logo at Top Left */}
        <div className="absolute top-8 left-6 md:top-12 md:left-12 z-50">
          <Logo className="h-10 md:h-14 brightness-0 invert" />
        </div>

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 md:px-12 py-20">
          <div className="max-w-3xl text-left">
            <span className="text-[12px] font-black uppercase tracking-[0.4em] text-white">
              {insight?.categoryLabel || 'quiz results'}
            </span>
            
            <h1 className="mt-8 text-[2.2rem] md:text-[3.5rem] font-black tracking-tight text-white leading-[0.95] uppercase">
              Your results<br />are in!
            </h1>
            
            <p className="mt-12 max-w-2xl text-lg md:text-2xl leading-relaxed text-white/90 font-medium">
              <span className="text-white font-bold">{insight?.headline}.</span> {insight?.body}
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
            <h2 className="text-4xl md:text-6xl font-black text-[#111827] tracking-tight uppercase">Whole-body benefits</h2>
            <p className="mt-4 text-sm md:text-base text-gray-400 font-bold uppercase tracking-[0.2em] italic">
              Nourishing your cells for a more vibrant, energized lifecycle.
            </p>
          </div>

          <BenefitAccordion />
        </div>
      </section>

      {/* UGC Creator Videos Section */}
      <section className="bg-white px-6 py-24 md:py-32 border-t border-gray-50">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black text-[#111827] tracking-tight uppercase">
              Real People,<br className="md:hidden" /> Real Transformations
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              { 
                video: '/firstVideo.mp4', 
                thumb: '/firstThumbnail.png', 
                title: 'Amazing Results!',
                desc: 'See the visible shift in skin vitality.'
              },
              { 
                video: '/secondVideo.mp4', 
                thumb: '/secondthumbnail.png', 
                title: 'Why I Chose ChronoNAD+',
                desc: 'Supporting cellular energy daily.'
              },
              { 
                video: '/thirdvideo.mov', 
                thumb: '/Third_thumbnail.png', 
                title: 'My 30-Day Journey',
                desc: 'Consistent results starting from within.'
              }
            ].map((ugc, i) => (
              <VideoCard key={i} ugc={ugc} />
            ))}
          </div>
        </div>
      </section>



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
