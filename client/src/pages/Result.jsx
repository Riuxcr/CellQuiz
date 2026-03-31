import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { trackFbq } from '../utils/fbq.js'

const CHECKOUT_URL =
  'https://cellstart.com/checkouts/cn/hWNAU8GfyILoKlWisS38oZvN/en-us?_r=AQABeic2poYKAyDjN9NVkfsIjkT9LngcU-PtbsT3yIKv_GA&auto_redirect=false&edge_redirect=true&preview_theme_id=156406677761&skip_shop_pay=true'

function getRecommendation(answers) {
  if (!answers || typeof answers !== 'object') return null
  
  const goal = answers['goal'] || ''
  const age = answers['age'] || ''

  if (goal === 'Skincare & anti-aging') {
    return {
      title: 'ChronoNAD+™ Cellular Skin Protocol',
      description: 'Nourishing your cells for a more vibrant, energized lifecycle. This protocol targets aging at the source to support skin resilience and cellular repair from the inside out.',
      productUrl: 'https://cellstart.com/products/nad?selling_plan=3903586561&variant=46896557195521',
    }
  }

  if (goal === 'Longevity & cellular repair') {
    return {
      title: 'ChronoNAD+™ Total Longevity System',
      description: 'Fight Father Time and replenish what time takes. Our signature NAD+ and Resveratrol blend supports DNA maintenance, mitochondrial function, and healthy aging.',
      productUrl: 'https://cellstart.com/products/nad?selling_plan=3903586561&variant=46896557195521',
    }
  }

  return {
    title: 'ChronoNAD+™ Daily Cellular Support',
    description: 'A comprehensive approach to cellular wellness. Replenish your NAD+ levels to support energy, metabolism, and long-term biological health.',
    productUrl: 'https://cellstart.com/products/nad?selling_plan=3903586561&variant=46896557195521',
  }
}

function hasQuizAnswers(answers) {
  return (
    answers != null &&
    typeof answers === 'object' &&
    Object.keys(answers).length > 0
  )
}

export default function Result() {
  const location = useLocation()
  const answers = location.state?.answers

  if (!hasQuizAnswers(answers)) {
    return (
      <main className="mx-auto flex min-h-[100dvh] max-w-md flex-col justify-center px-6 py-12">
        <p className="text-center text-lg font-medium text-gray-500">
          No profile data found. Please complete the analysis.
        </p>
        <div className="mt-8 flex items-center justify-center gap-4 text-sm font-semibold">
          <Link className="text-[#111827] underline decoration-gray-300 underline-offset-4 hover:decoration-[#111827] transition-all" to="/quiz">
            Start Analysis
          </Link>
          <span className="text-gray-300">|</span>
          <Link className="text-[#111827] underline decoration-gray-300 underline-offset-4 hover:decoration-[#111827] transition-all" to="/">
            Home
          </Link>
        </div>
      </main>
    )
  }

  const recommendation = getRecommendation(answers)

  return (
    <main className="mx-auto flex min-h-[100dvh] max-w-3xl flex-col justify-center px-6 py-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center mb-12"
      >
        <motion.span 
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-[10px] font-black tracking-[0.3em] text-[#111827] uppercase"
        >
          Your Profile is Ready
        </motion.span>
        <motion.h2 
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 text-4xl font-extrabold tracking-tight text-[#111827] sm:text-5xl"
        >
          Your Personalized Recommendation
        </motion.h2>
      </motion.div>
      
      {recommendation && (
        <motion.section 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="group relative"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-gray-100 to-gray-50 rounded-[3rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative overflow-hidden rounded-[2.5rem] border border-[#e5e7eb] bg-white p-10 md:p-16 text-center shadow-2xl shadow-gray-200/50">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 200, damping: 10 }}
              className="mx-auto mb-10 flex h-24 w-24 items-center justify-center rounded-3xl bg-gray-50"
            >
               <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 text-[#111827]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09l2.846.813-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
              </svg>
            </motion.div>

            <h3 className="text-3xl font-extrabold leading-tight text-[#111827] sm:text-4xl">
              {recommendation.title.split('™').map((part, index, array) => (
                <span key={index}>
                  {part}
                  {index < array.length - 1 && <span className="text-blue-500">™</span>}
                </span>
              ))}
            </h3>
            <p className="mt-6 text-xl font-medium leading-relaxed text-gray-500 max-w-md mx-auto">
              {recommendation.description}
            </p>

            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-lg mx-auto">
              <motion.button
                whileHover={{ scale: 1.03, boxShadow: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)" }}
                whileTap={{ scale: 0.97 }}
                type="button"
                className="w-full sm:flex-1 rounded-2xl bg-[#111827] px-8 py-5 text-lg font-bold text-white shadow-xl transition-all hover:bg-black flex items-center justify-center gap-2"
                onClick={() => {
                  trackFbq('AddToCart')
                  window.location.assign(recommendation.productUrl)
                }}
              >
                <span>View Product</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, backgroundColor: '#f9fafb' }}
                whileTap={{ scale: 0.97 }}
                type="button"
                className="w-full sm:flex-1 rounded-2xl border-2 border-[#e5e7eb] bg-white px-8 py-5 text-lg font-bold text-[#111827] transition-all flex items-center justify-center gap-2"
                onClick={() => {
                  trackFbq('InitiateCheckout')
                  window.location.assign(CHECKOUT_URL)
                }}
              >
                <span>Go to Checkout</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                </svg>
              </motion.button>
            </div>
          </div>

          {/* Transformation Timeline */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-20 w-full"
          >
            <h4 className="text-[10px] font-black tracking-[0.4em] text-[#111827] uppercase mb-12 text-center opacity-40">Transformation Timeline</h4>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { label: 'Stage 1', title: 'Replenish', desc: 'Starting the NAD+ pool replenishment at the cellular level.' },
                { label: 'Stage 2', title: 'Boost', desc: 'Noticeable shifts in energy levels and mental focus.' },
                { label: 'Stage 3', title: 'Repair', desc: 'Enhanced skin resilience and cellular repair pathways.' },
                { label: 'Stage 4', title: 'Maintain', desc: 'Long-term metabolic stability and DNA maintenance.' }
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="mb-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">{item.label}</div>
                  <div className="text-lg font-bold text-[#111827] mb-2">{item.title}</div>
                  <p className="text-sm text-gray-500 leading-relaxed">{item.desc}</p>
                  {i < 3 && <div className="hidden md:block absolute top-[1.3rem] -right-4 w-8 h-[2px] bg-gray-100" />}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.section>
      )}

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <Link
          className="text-xs font-black text-gray-400 underline-offset-8 transition-all hover:text-[#111827] hover:underline decoration-gray-300"
          to="/"
        >
          RESET ANALYSIS
        </Link>
      </motion.div>
    </main>
  )
}
