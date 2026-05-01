import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import skinTransformation from '../assets/skin-transformation.png'
import chronoNadIsolated from '../assets/chrono-nad-isolated.png'
import cortisolTransformation from '../assets/cortisol-transformation.png'
import womenAllAgesResult from '../assets/women-all-ages-result.png'
import supplementFacts from '../assets/supplement_facts.png'


export default function Harmony() {
   const navigate = useNavigate()
   const [activeFaq, setActiveFaq] = useState(null)
   const [isMobile, setIsMobile] = useState(false)
   const [expandedReviews, setExpandedReviews] = useState({})
   const [currentPage, setCurrentPage] = useState(1)
   const reviewsPerPage = 5

   const toggleReview = (index) => {
      setExpandedReviews(prev => ({
         ...prev,
         [index]: !prev[index]
      }))
   }

   const toggleFaq = (index) => {
      setActiveFaq(activeFaq === index ? null : index)
   }

   useEffect(() => {
      const checkMobile = () => {
         setIsMobile(window.innerWidth < 1024)
      }
      checkMobile()
      window.addEventListener('resize', checkMobile)
      return () => window.removeEventListener('resize', checkMobile)
   }, [])

   // Refs for scroll sections
   const impactRef = useRef(null)

   const { scrollYProgress: impactScroll } = useScroll({
      target: impactRef,
      offset: ["start start", "end end"]
   })

   // Animation variants
   const fadeInUp = {
      hidden: { opacity: 0, y: 40 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
   }

   const staggerContainer = {
      hidden: { opacity: 0 },
      visible: {
         opacity: 1,
         transition: { staggerChildren: 0.15 }
      }
   }

   const scrollToProducts = () => {
      document.getElementById('pricing-grid')?.scrollIntoView({ behavior: 'smooth' })
   }

   // Scroll animations for "How it works"
   const fuelOpacity = useTransform(impactScroll, [0, 0.2], [0, 1])
   const fuelX = useTransform(impactScroll, [0, 0.2], [-50, 0])

   const geneOpacity = useTransform(impactScroll, [0.25, 0.45], [0, 1])
   const geneX = useTransform(impactScroll, [0.25, 0.45], [50, 0])

   const recoveryOpacity = useTransform(impactScroll, [0.5, 0.7], [0, 1])
   const recoveryX = useTransform(impactScroll, [0.5, 0.7], [-50, 0])

   const vitalityOpacity = useTransform(impactScroll, [0.75, 0.95], [0, 1])
   const vitalityX = useTransform(impactScroll, [0.75, 0.95], [50, 0])

   const faqs = [
      {
         q: "HOW QUICKLY WILL I NOTICE THE SYSTEMIC SHIFT?",
         a: "Most users report a noticeable increase in mental clarity and steady, all-day energy within the first 7-14 days. For deep cellular repair and metabolic optimization, we recommend consistent use for at least 60-90 days to allow coenzyme levels to fully stabilize."
      },
      {
         q: "IS THE CHRONONAD+ PROTOCOL SAFE WITH OTHER MEDICATIONS?",
         a: "ChronoNAD+ is formulated with ultra-pure, clinical-grade ingredients. However, as with any advanced supplementation, we recommend consulting your physician before beginning the protocol, especially if you are currently taking prescription medication."
      },
      {
         q: "WHAT HAPPENS IF I MISS A DAILY DOSAGE?",
         a: "Consistency is the foundation of cellular health. If you miss a day, simply resume your protocol the following morning. There is no need to double the dose; your body responds best to a steady, daily rhythm of replenishment."
      },
      {
         q: "WHY THE 4-BOTTLE PROTOCOL FOR OPTIMAL TRANSFORMATION?",
         a: "True biological transformation takes time. While early benefits are felt quickly, the 4-bottle protocol (120 days) is designed to facilitate complete cellular turnover and lock in your new baseline of vitality, ensuring long-term systemic resilience."
      }
   ]

   const productImg = isMobile ? "/mobilehero.png" : chronoNadIsolated

   return (
      <div className="font-sans antialiased text-[#111827] bg-white selection:bg-[#0D47A1] selection:text-white relative">

         {/* ===== LOGO ===== */}
         <div className="absolute top-8 left-16 z-[999]">
            <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
         </div>


         {/* HERO SECTION - BLACK & BLUE THEME */}
         <section id="hero" className="relative min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center bg-white overflow-hidden pt-16 pb-10 md:pt-20 lg:pt-24 lg:pb-12 px-4 md:px-6">
            {/* Subtle Background Clinical Grid - Deep Blue */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0D47A1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center"
               >
                  {/* Left Column: Text Content */}
                  <div className="text-center lg:text-left space-y-5 relative">
                     <div className="space-y-4 relative z-10">


                        <motion.h1
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                           className="text-2xl md:text-3xl lg:text-4xl font-black text-[#111827] leading-tight tracking-tight font-heading"
                        >
                           <span className="whitespace-nowrap">How 3 Million Women Over 30 Are</span><br />
                           <span className="text-[#0D47A1] font-black">Reclaiming Their Youthful Glow,</span><br />
                           <span className="text-[#0D47A1] font-black">Energy, and Metabolism</span>
                        </motion.h1>

                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.4 }}
                           className="max-w-xl mx-auto lg:mx-0"
                        >
                           <p className="text-sm md:text-base text-gray-500 font-medium leading-relaxed">
                              Declining NAD+ levels are a hidden driver of dull skin and low energy.
                              <span className="text-[#111827] font-bold"> ChronoNad+</span> restores these levels at the source to reclaim your natural vitality and glow.
                           </p>
                        </motion.div>
                     </div>

                     <div className="space-y-3 relative z-10 pt-2">
                        <div className="grid grid-cols-1 gap-y-4">
                           {[
                              { text: "Restore NAD+ At The Source", color: "text-[#0D47A1]" },
                              { text: "Brighter, More Even Skin", color: "text-[#0D47A1]" },
                              { text: "Boost Energy & Vitality", color: "text-[#0D47A1]" },
                              { text: "Weight Management Support", color: "text-[#0D47A1]" },
                              { text: "Emotional Wellbeing Boost", color: "text-[#0D47A1]" }
                           ].map((benefit, i) => (
                              <motion.div
                                 key={i}
                                 initial={{ opacity: 0, x: -10 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 transition={{ delay: 0.5 + (i * 0.05) }}
                                 className="flex items-center gap-4 py-1 group"
                              >
                                 <div className="w-8 h-8 rounded-full bg-blue-50 text-[#0D47A1] flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] group-hover:text-white transition-all">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7" /></svg>
                                 </div>
                                 <span className="text-xl md:text-2xl text-[#111827] font-black tracking-tight">{benefit.text}</span>
                              </motion.div>
                           ))}
                        </div>
                     </div>

                     <div className="flex flex-col items-center lg:items-start gap-3 pt-1">
                        <motion.button
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           onClick={scrollToProducts}
                           className="w-full md:w-auto md:min-w-[220px] bg-[#0D47A1] text-white font-black text-sm px-6 py-3.5 rounded-xl uppercase tracking-widest hover:bg-[#111827] transition-all duration-300 shadow-xl flex items-center justify-center group relative overflow-hidden"
                        >
                           <span className="relative z-10">Start My Protocol</span>
                           <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </motion.button>
                        <div className="text-[#0D47A1]/40 text-[10px] font-black uppercase tracking-widest font-accent"><span>30 Day Money Back Guarantee</span></div>
                     </div>
                  </div>

                  {/* Right Column: Transformation Graphic - No Card */}
                  <div className="relative flex flex-col items-center justify-center">
                     <img
                        src={skinTransformation}
                        alt="Cellular Transformation Progress"
                        className="w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain mix-blend-multiply scale-110 lg:scale-125 transition-transform duration-700"
                     />
                     {/* Labels below each face */}
                     <div className="flex items-center justify-center w-full px-4 mt-2 gap-8">
                        <div className="flex flex-col items-center gap-1">
                           <div className="h-px w-12 bg-gray-300"></div>
                           <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Without NAD+</span>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                           <div className="h-px w-12 bg-[#0D47A1]/40"></div>
                           <span className="text-[11px] font-black text-[#0D47A1] uppercase tracking-[0.2em]">With NAD+</span>
                        </div>
                     </div>
                  </div>
               </motion.div>
            </div>
         </section>

         {/* FEATURED IN SECTION - ARCHITECTURAL PRESS MASTERPIECE */}
         <section id="featured" className="relative py-24 md:py-32 bg-white overflow-hidden">
            {/* Massive Spherical Background Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[#F9FAFB] rounded-full z-0 opacity-50"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="text-center mb-24 space-y-6">
                  <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-[#0D47A1]/5 border border-[#0D47A1]/10">
                     <span className="w-2 h-2 rounded-full bg-[#0D47A1] animate-pulse"></span>
                     <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">Clinical Recognition</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111827] leading-[1.1] tracking-tight">
                     Research Backed <br />
                     <span className="italic text-[#0D47A1] font-medium">Ingredients Featured In…</span>
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {[
                     {
                        name: "ALLURE",
                        date: "Apr 2, 2025",
                        quote: "“I feel like the NAD has helped me regain a little more mental clarity and my overall energy level has definitely improved...”",
                        link: "https://www.allure.com/story/what-is-nad-review",
                        style: "font-black tracking-tighter"
                     },
                     {
                        name: "WIRED",
                        date: "Jan 30, 2026",
                        quote: "“Improvements in energy, mental clarity, migraines, and circadian disruption after using NAD-related therapies...”",
                        link: "https://www.wired.com/story/nad-supplement-101/",
                        style: "font-heading font-black"
                     },
                     {
                        name: "VOGUE",
                        date: "Jun 13, 2024",
                        quote: "“The most popular—and desired—effect of resveratrol are its anti-aging benefits; it’s been shown to prevent photoaging...”",
                        link: "https://www.vogue.com/article/resveratrol-benefits-for-skin",
                        style: "font-heading tracking-[0.2em] font-medium"
                     },
                     {
                        name: "VOGUE",
                        date: "Jun 13, 2024",
                        quote: "“Resveratrol … ‘increases collagen production and decreases reactive oxygen species, which improve elasticity and make the skin thicker...”",
                        link: "https://www.vogue.com/article/resveratrol-benefits-for-skin",
                        style: "font-heading tracking-[0.2em] font-medium"
                     }
                  ].map((item, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.8 }}
                        className="relative group h-full"
                     >
                        {/* The 'Cut' Card Layout */}
                        <div className="relative h-full bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2">
                           {/* Architectural Cut Accent */}
                           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/50 rounded-bl-[4rem] z-0 transform translate-x-12 -translate-y-12 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-700"></div>
                           
                           <div className="relative z-10 flex flex-col h-full space-y-6">
                              <div className="space-y-1">
                                 <div className={`text-2xl uppercase ${item.style} text-[#111827] border-b-2 border-[#0D47A1]/10 pb-2 inline-block`}>
                                    {item.name}
                                 </div>
                                 <p className="text-[9px] font-black text-gray-300 uppercase tracking-widest pt-2">{item.date}</p>
                              </div>
                              
                              <p className="text-base text-gray-500 leading-relaxed font-medium italic flex-grow">
                                 {item.quote}
                              </p>
                              
                              <div className="pt-6">
                                 <a
                                    href={item.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-[10px] font-black text-[#0D47A1] uppercase tracking-[0.2em] group/link"
                                 >
                                    Read Article
                                    <svg className="w-3 h-3 group-hover/link:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                 </a>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* TESTIMONIALS SECTION - VITALITY VOICE MASTERPIECE */}
         <section id="testimonials" className="relative py-24 md:py-32 lg:py-48 bg-white overflow-hidden">
            {/* Background Orbital Spheres */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F9FAFB] rounded-full z-0 opacity-80 -translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               {/* Header Area Area */}
               <div className="text-center mb-24 space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0D47A1]/5 border border-[#0D47A1]/10">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#0D47A1]"></span>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">Community Authority</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#111827] leading-[1.1] tracking-tight max-w-5xl mx-auto">
                     Reclaim Your Energy, <br />
                     <span className="text-[#0D47A1]">Mental Clarity, and Youthful Vitality</span>
                  </h2>
                  <p className="text-lg text-gray-500 font-medium italic leading-relaxed max-w-2xl mx-auto">
                     Clinically formulated to restore cellular energy for women of all ages... finally ending <span className="text-[#111827] font-black not-italic">sluggishness and brain fog.</span>
                  </p>
               </div>

               {/* Testimonials Architectural Bento Grid */}
               <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8">
                  {[
                     {
                        name: "HappyFamily",
                        initial: "H",
                        title: "NAD+ Boost for Feeling Younger!",
                        body: "CellStart is a solid pick for anyone wanting to support healthy aging and cellular energy! After a month of one capsule daily with breakfast, I've noticed steadier energy, better focus, and recovery.",
                        className: "md:col-span-3 lg:col-span-4 bg-white"
                     },
                     {
                        name: "Brenda",
                        initial: "B",
                        title: "Great quality supplements",
                        body: "60 capsules in a bottle. Pills are pretty easy to swallow. I had good results with taking this supplement. More energy and I have better sleep now.",
                        className: "md:col-span-3 lg:col-span-4 bg-[#F9FAFB]"
                     },
                     {
                        name: "James",
                        initial: "J",
                        title: "Easy to swallow capsules.",
                        body: "The CellStart Nad+ Resveratrol capsules come a well-sealed bottle. I like the fact that they are made in the USA and are also Non-GMO. I feel they give me more energy.",
                        className: "md:col-span-3 lg:col-span-4 bg-white"
                     },
                     {
                        name: "Danielle",
                        initial: "D",
                        title: "Energy Boost for Moms!",
                        body: "As a 32-year-old mom juggling kids.. within the first week, I noticed a real difference. I wasn’t crashing halfway through the day, and I felt more clear-headed and focused.",
                        className: "md:col-span-3 lg:col-span-5 bg-white"
                     },
                     {
                        name: "Stephanie Jackson",
                        initial: "S",
                        title: "Worth the Buy",
                        body: "I’ve noticed I don’t feel as sluggish during the day, and my recovery after workouts seems quicker. Definitely worth trying if you want extra support for energy, focus, and healthy aging.",
                        className: "md:col-span-6 lg:col-span-7 bg-[#111827] text-white"
                     }
                  ].map((review, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative group ${review.className}`}
                     >
                        {/* Architectural Card Shell */}
                        <div className={`relative h-full p-10 md:p-12 rounded-[3.5rem] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 ${review.className.includes('bg-[#111827]') ? 'border-transparent' : ''}`}>
                           
                           {/* Surgical Cut Corner Accent */}
                           <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[4rem] z-0 transform translate-x-12 -translate-y-12 transition-all duration-700 group-hover:translate-x-0 group-hover:translate-y-0 ${review.className.includes('text-white') ? 'bg-white/5' : 'bg-[#0D47A1]/5'}`}></div>

                           <div className="relative z-10 flex flex-col h-full">
                              <div className="flex text-[#FFB400] gap-0.5 mb-8">
                                 {[...Array(5)].map((_, j) => (
                                    <svg key={j} className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                 ))}
                              </div>
                              
                              <h4 className={`text-2xl font-black mb-6 tracking-tight leading-[1.2] ${review.className.includes('text-white') ? 'text-white' : 'text-[#111827]'}`}>
                                 {review.title}
                              </h4>
                              
                              <p className={`text-base leading-relaxed italic mb-10 flex-grow ${review.className.includes('text-white') ? 'text-gray-300' : 'text-gray-500 font-medium'}`}>
                                 "{review.body}"
                              </p>

                              <div className="pt-8 border-t border-gray-100/10 flex items-center gap-5">
                                 <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-lg shadow-xl transform rotate-3 group-hover:rotate-0 transition-transform ${review.className.includes('text-white') ? 'bg-white text-[#111827]' : 'bg-[#0D47A1] text-white'}`}>
                                    {review.initial}
                                 </div>
                                 <div className="space-y-0.5">
                                    <p className={`text-base font-black ${review.className.includes('text-white') ? 'text-white' : 'text-[#111827]'}`}>{review.name}</p>
                                    <div className="flex items-center gap-2">
                                       <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                                       <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">Verified Buyer</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>

               {/* CTA Area */}
               <div className="mt-24 text-center">
                  <motion.button
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={scrollToProducts}
                     className="bg-[#0D47A1] text-white font-black text-sm px-12 py-6 rounded-2xl uppercase tracking-[0.2em] hover:bg-[#111827] transition-all duration-300 shadow-2xl flex items-center justify-center mx-auto group"
                  >
                     Try Our Protocols
                     <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>
                  <div className="mt-6 flex items-center justify-center gap-3">
                     <div className="w-5 h-5 rounded bg-[#0D47A1] flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#0D47A1]">30 Day Money Back Guarantee</span>
                  </div>
               </div>
            </div>
         </section>

         {/* CORTISOL IMPACT & TRANSFORMATION SECTION - NEW */}
         <section id="cortisol" className="py-16 md:py-24 lg:py-32 bg-[#F9FAFB]">
            <div className="max-w-4xl mx-auto px-6">
               <div className="text-center mb-16 space-y-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block font-accent">Cellular Reality</span>
                  <h2 className="text-2xl md:text-3xl font-black text-[#111827] leading-tight tracking-tight font-heading">
                     As women age, their <br className="hidden md:block" />
                     <span className="text-[#0D47A1]">NAD+ levels drop by 30%</span> by Age 30.
                  </h2>
                  <p className="text-base text-gray-500 font-medium italic">
                     And that’s when <span className="text-[#111827] font-black underline decoration-[#0D47A1]/20 underline-offset-8">everything changes in your body.</span>
                  </p>
               </div>

               {/* Transformation Graphic */}
               <div className="bg-white p-4 md:p-8 rounded-[3rem] shadow-2xl border border-gray-100 mb-20 overflow-hidden group">
                  <img
                     src={cortisolTransformation}
                     alt="Cortisol Transformation Clinical Overview"
                     className="w-full h-auto rounded-[2rem] transition-transform duration-1000 group-hover:scale-[1.02]"
                  />
               </div>

               <div className="space-y-16 text-center">
                  <div className="max-w-2xl mx-auto space-y-10">
                     <div className="space-y-4 text-left bg-white p-4 md:p-8 lg:p-12 rounded-2xl md:rounded-[3rem] shadow-sm border border-gray-50">
                        {[
                           "The dull, weathered complexion...",
                           "The heavy, persistent brain fog...",
                           "The slow, ‘biological rust’ recovery..."
                        ].map((item, i) => (
                           <div key={i} className="flex items-center gap-4 text-lg text-gray-600 font-medium">
                              <span className="text-xl">❌</span>
                              <span>{item}</span>
                           </div>
                        ))}
                     </div>

                     <p className="text-lg md:text-xl text-gray-600 leading-relaxed font-medium">
                        Are all symptoms of <span className="text-[#111827] font-black">cellular decay</span> that forces the body to stay <span className="text-[#0D47A1] font-black">DRAINED and WEATHERED…</span> And that’s only what you see in the mirror.
                        <br /><br />
                        <span className="text-xl md:text-2xl text-[#111827] font-black italic">On the inside?</span> <br />
                        There’s a biological brownout wreaking havoc on your youthfulness and energy.
                     </p>

                     <div className="grid grid-cols-1 gap-6">
                        {[
                           "You feel mentally gray and lagging during the day…",
                           "Drained yet restless when your body needs to recover or sleep…",
                           "And unable to reclaim your glow, no matter what serums you use."
                        ].map((text, i) => (
                           <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                              <p className="text-gray-500 italic font-medium leading-relaxed">"{text}"</p>
                           </div>
                        ))}
                     </div>
                  </div>

                  <div className="space-y-8">
                     <div className="bg-[#111827] text-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] shadow-2xl relative overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-[#0D47A1]/20 rounded-full blur-[120px] -mr-48 -mt-48"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#0D47A1]/10 rounded-full blur-[100px] -ml-32 -mb-32"></div>

                        <div className="relative z-10 space-y-10">
                           <p className="text-xl md:text-2xl font-medium max-w-3xl mx-auto leading-relaxed text-gray-100">
                              If that ever happened to you, it’s not your fault. These are symptoms of a <span className="text-blue-400 font-black italic underline decoration-blue-400/30 underline-offset-8">'biological lag'</span> caused by crashing NAD+ levels…
                           </p>

                           <div className="flex flex-col items-center space-y-4">
                              <p className="text-xs font-black uppercase tracking-[0.4em] text-blue-400/80">And unfortunately, it doesn’t stop here.</p>
                              <div className="h-[1px] w-32 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
                           </div>

                           <p className="text-2xl md:text-3xl font-black uppercase tracking-tight leading-tight max-w-4xl mx-auto">
                              By the time you reach your 40s, your NAD+ levels, which is the fuel for every single cell, <span className="text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.3)]">plummet by a whopping 50%...</span>
                           </p>

                           <p className="text-lg md:text-xl font-medium max-w-3xl mx-auto italic text-gray-300 leading-relaxed">
                              This is the molecule that keeps your skin tight and luminous, your DNA shielded, your metabolism firing, and your cellular recovery on autopilot…
                              <br /><br />
                              <span className="text-white font-bold not-italic text-2xl">Just like in your 20s and 30s.</span>
                           </p>
                        </div>
                     </div>

                     <div className="max-w-2xl mx-auto pt-8 space-y-4">
                        <p className="text-xl text-[#0D47A1] font-bold italic">
                           This means that, as you age…
                        </p>
                        <p className="text-lg text-gray-600 font-medium">
                           Not only do you accumulate visible <span className="text-[#111827] font-black">'biological rust'</span> against your will… <br />
                           But your cells actually lose the ability to repair themselves.
                        </p>
                        <p className="text-lg text-gray-500 font-medium italic">
                           And as if that weren’t enough… <br />
                           Your focus goes out the window, and your youthfulness becomes a memory of the past.
                        </p>
                     </div>
                  </div>

                  {/* The Root Cause Section */}
                  <div className="bg-white border-2 border-gray-100 p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] shadow-sm text-left max-w-3xl mx-auto space-y-8">
                     <h3 className="text-xl md:text-2xl font-bold text-[#111827] leading-snug tracking-tight font-heading underline decoration-[#0D47A1]/10 underline-offset-8">Here’s why that happens:</h3>
                     <div className="space-y-6">
                        <div className="flex items-start gap-4">
                           <div className="w-2 h-2 rounded-full bg-[#0D47A1] mt-2 shrink-0"></div>
                           <p className="text-gray-600 leading-relaxed font-medium">
                              <span className="text-[#111827] font-black">Crashing NAD+ levels stall your cellular engines…</span> Which dulls the skin and creates that 'perpetually tired' look…
                           </p>
                        </div>
                        <div className="flex items-start gap-4">
                           <div className="w-2 h-2 rounded-full bg-[#0D47A1] mt-2 shrink-0"></div>
                           <p className="text-gray-600 leading-relaxed font-medium">
                              Other NAD+ dependent 'youth' processes fail, and DNA damage accumulates… <br />
                              So the body stubbornly feels <span className="text-[#111827] font-black">older, heavier, and slower</span> than you actually are.
                           </p>
                        </div>
                     </div>
                  </div>

                  {/* Symptom Checklist */}
                  <div className="py-8 md:py-12 bg-[#F8FAFC] rounded-2xl md:rounded-[3rem] border border-gray-100">
                     <h3 className="text-xl md:text-2xl font-bold text-[#111827] mb-10 leading-snug tracking-tight font-heading">So if you’ve ever witnessed…</h3>
                     <div className="flex flex-col items-center gap-6 px-6">
                        {[
                           "New fine-lines appearing where a glow used to be…",
                           "A 'brain fog' that makes simple tasks feel like a climb…",
                           "Slow recovery that keeps you sore and tired for days…",
                           "Or Dull wrinkled skin losing its firm, youthful definition…"
                        ].map((symptom, i) => (
                           <div key={i} className="flex items-center gap-4 text-left w-full max-w-lg group">
                              <span className="text-2xl group-hover:translate-x-1 transition-transform">➡️</span>
                              <span className="text-base md:text-lg text-[#1F2937] font-medium italic border-b border-gray-100 pb-2 flex-grow">{symptom}</span>
                           </div>
                        ))}
                     </div>

                     <div className="mt-12 space-y-4">
                        <p className="text-xl font-black text-[#0D47A1] uppercase tracking-tighter">➡️ You’re not alone… ⬅️</p>
                        <p className="text-lg text-gray-500 font-medium">It happens to <span className="text-[#111827] font-black">MILLIONS of women 🙋♀️</span> just like you.</p>
                     </div>
                  </div>

                  <div className="space-y-8 pt-8 max-w-2xl mx-auto">
                     <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        If you’ve experienced some of these symptoms… then you probably noticed that… <br />
                        <span className="text-[#111827] font-black underline decoration-[#0D47A1]/20 underline-offset-8">Standard vitamins and 'skincare only' routines just won’t cut it anymore.</span>
                     </p>
                     <p className="text-gray-500 italic font-medium">
                        Sure, they’ll help on the surface… <br />
                        But they won’t fix the <span className="text-[#111827] font-black">cellular bankruptcy</span> happening at the root… or the rapid downfall of your longevity molecules.
                     </p>
                  </div>

                  <div className="pt-12 space-y-12">
                     <div className="max-w-2xl mx-auto text-gray-600 font-medium leading-relaxed space-y-6">
                        <p className="text-xl font-bold text-[#111827]">Fortunately – there’s a way to reverse that.</p>
                        <p>And it all starts by going to the root cause…</p>
                        <p className="text-[#0D47A1] font-black text-xl italic">
                           Because once you restore your NAD+ levels… <br />
                           And activate the cellular repair your body is now missing…
                        </p>
                        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100">
                           <p className="text-[#111827] font-black text-2xl tracking-tight leading-tight">
                              You can get back that <span className="italic text-[#0D47A1]">sexy confidence…</span> <br />
                              The beautiful complexion, the sharp mind, the revitalized body…
                           </p>
                           <p className="text-[#111827] font-bold mt-4 text-lg">
                              So you can LOVE your life once again…
                           </p>
                           <p className="text-sm text-gray-400 mt-2 font-black uppercase tracking-widest">
                              No matter your age, genetics, or unique biological profile!
                           </p>
                        </div>
                     </div>
                      
                     <div className="flex flex-col items-center gap-6 mt-12">
                        <motion.button
                           whileHover={{ scale: 1.02 }}
                           whileTap={{ scale: 0.98 }}
                           onClick={scrollToProducts}
                           className="w-full md:w-auto min-w-[400px] bg-[#0D47A1] text-white font-black text-sm px-10 py-5 rounded-2xl uppercase tracking-[0.2em] shadow-2xl hover:bg-[#111827] transition-all duration-500"
                        >
                           TRY CHRONONAD+
                        </motion.button>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* DYNAMIC LAYERED SOLUTION SECTION - ULTRA-WIDE ARCHITECTURAL */}
         <section id="solution" className="py-12 md:py-20 bg-white px-4 md:px-10 overflow-hidden">
            <div className="max-w-[1600px] mx-auto relative">
               {/* 1. Background Architecture: Deep Blue Card - MAX WIDTH */}
               <div className="absolute top-0 right-0 w-full lg:w-[95%] h-full bg-[#0D47A1] rounded-[4.5rem] shadow-[0_40px_100px_-20px_rgba(13,71,161,0.2)] overflow-hidden hidden lg:block">
                  <div className="absolute top-0 left-0 w-full h-full opacity-[0.03]">
                     <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                        <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
                        <circle cx="0" cy="0" r="80" fill="white" />
                     </svg>
                  </div>
               </div>

               <div className="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-20 px-4 md:px-12">
                  {/* 2. Image Component: Massive Circular Porthole */}
                  <div className="w-full lg:w-[40%] relative py-8 lg:py-12">
                     <div className="relative aspect-square rounded-full overflow-hidden border-[16px] border-white shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] z-30 transform hover:scale-[1.02] transition-transform duration-700">
                        <img 
                           src="/Result.jpg" 
                           alt="ChronoNAD+ Protocol Results" 
                           className="w-full h-full object-cover"
                        />
                     </div>
                     {/* Decorative Floating Rings */}
                     <div className="absolute -inset-10 border border-blue-100 rounded-full animate-[spin_25s_linear_infinite] opacity-40 z-10"></div>
                     <div className="absolute -inset-20 border border-blue-50 rounded-full animate-[spin_35s_linear_infinite_reverse] opacity-20 z-0"></div>
                  </div>

                  {/* 3. Content Area: Ultra-Wide Layout */}
                  <div className="w-full lg:w-[60%] py-8 lg:py-12 space-y-10 z-40 lg:pl-10">
                     <div className="space-y-6">
                        <div className="inline-flex items-center gap-4 px-5 py-2 rounded-full bg-blue-50 lg:bg-white/10 border border-blue-100 lg:border-white/20 backdrop-blur-xl">
                           <span className="w-2 h-2 rounded-full bg-blue-500 lg:bg-blue-300 animate-pulse"></span>
                           <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1] lg:text-white">Clinical Discovery</span>
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black leading-[1.1] tracking-tight text-[#111827] lg:text-white">
                           It’s Now Possible To <br />
                           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 lg:from-blue-200 lg:to-white">Reverse Cellular Bankruptcy</span>
                        </h2>
                        
                        <p className="text-lg md:text-xl text-gray-500 lg:text-white/80 font-medium italic leading-relaxed max-w-3xl">
                           Restore Your ‘Youth’ Molecules and stay naturally sharp, luminous, and revitalized with ChronoNAD+.
                        </p>
                     </div>

                     {/* 4. Feature Grid: Compact Glass Cards */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-7 rounded-[2.5rem] bg-white lg:bg-white/5 border border-gray-100 lg:border-white/10 shadow-sm backdrop-blur-xl group hover:shadow-xl transition-all">
                           <div className="w-12 h-12 rounded-xl bg-blue-50 lg:bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                              <svg className="w-6 h-6 text-[#0D47A1] lg:text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M12 2c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3z"/>
                                 <path d="M10.2 11.5a5 5 0 0 1 3.6 0"/>
                                 <path d="M10.2 16.5a5 5 0 0 1 3.6 0"/>
                                 <path d="M12 8v14"/>
                                 <path d="m9 15 3 1 3-1"/>
                                 <path d="m9 20 3 1 3-1"/>
                              </svg>
                           </div>
                           <h4 className="font-black uppercase tracking-[0.4em] text-[11px] text-[#0D47A1] lg:text-blue-200 mb-3">DNA Protection</h4>
                           <p className="text-base text-gray-500 lg:text-white/80 leading-relaxed font-medium">Advanced support for PARP enzymes that repair DNA damage daily.</p>
                        </div>

                        <div className="p-7 rounded-[2.5rem] bg-white lg:bg-white/5 border border-gray-100 lg:border-white/10 shadow-sm backdrop-blur-xl group hover:shadow-xl transition-all">
                           <div className="w-12 h-12 rounded-xl bg-blue-50 lg:bg-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                              <svg className="w-6 h-6 text-[#0D47A1] lg:text-blue-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2 Z"/>
                              </svg>
                           </div>
                           <h4 className="font-black uppercase tracking-[0.4em] text-[11px] text-[#0D47A1] lg:text-blue-200 mb-3">Energy Rebound</h4>
                           <p className="text-base text-gray-500 lg:text-white/80 leading-relaxed font-medium">Replenishes mitochondrial fuel for sustained focus and zero brain-fog.</p>
                        </div>
                     </div>

                     <div className="pt-6">
                        <motion.button 
                           whileHover={{ scale: 1.05, y: -5 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={scrollToProducts}
                           className="bg-[#0D47A1] lg:bg-white text-white lg:text-[#0D47A1] px-14 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.35em] shadow-[0_20px_60px_rgba(13,71,161,0.25)] lg:shadow-[0_20px_70px_rgba(255,255,255,0.25)]"
                        >
                           Start your protocol
                        </motion.button>
                     </div>
                  </div>
               </div>
            </div>

         </section>

         {/* BREAKTHROUGHS SECTION */}
         {/* id added for nav */}
         <section id="breakthroughs" className="py-12 md:py-16 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-20">
                  <h2 className="text-2xl md:text-3xl font-black text-[#111827] mb-6 leading-tight tracking-tight font-heading">
                     20+ Years. 6 Discoveries. <br />
                     <span className="italic text-gray-400 font-medium">One Perfect Solution.</span>
                  </h2>
                  <div className="flex items-center justify-center gap-4">
                     <div className="h-[1px] w-12 bg-gray-200"></div>
                     <span className="text-xs font-black uppercase tracking-[0.4em] text-[#111827]">LOCKED IN A SINGLE CAPSULE</span>
                     <div className="h-[1px] w-12 bg-gray-200"></div>
                  </div>
               </div>

               {/* 6 Discoveries List - Inspired by Reference UI */}
               <div className="max-w-5xl mx-auto space-y-4 mb-32">
                  {[
                     {
                        num: "1",
                        label: "Cellular Breakthrough 1",
                        text: "The discovery that NAD+ is the essential fuel for longevity genes that regulate aging, metabolism, and stress resistance."
                     },
                     {
                        num: "2",
                        label: "Cellular Breakthrough 2",
                        text: "Research confirms replenishing NAD+ can reverse mitochondrial decay, giving \"old\" cells the energy production capacity of \"young\" cells."
                     },
                     {
                        num: "3",
                        label: "Cellular Breakthrough 3",
                        text: "The master clock synchronizer that regulates your circadian rhythm at a microscopic level for deep sleep and zero brain fog."
                     },
                     {
                        num: "4",
                        label: "Cellular Breakthrough 4",
                        text: "The DNA-defense fuel that powers \"paramedic\" enzymes to detect and fix daily cellular damage caused by toxins, stress, and time."
                     },
                     {
                        num: "5",
                        label: "Cellular Breakthrough 5",
                        text: "The age-defying molecule that rejuvenates deteriorating stem cells, supporting tissue vitality, faster recovery, and lean muscle mass maintenance."
                     },
                     {
                        num: "6",
                        label: "Cellular Breakthrough 6",
                        text: "The metabolic master-key that optimizes how cells convert food into pure ATP energy, helping to stop age-related metabolic slowdown."
                     }
                  ].map((item, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 hover:shadow-lg border border-blue-100 bg-[#F0F7FF]/50`}
                     >
                        {/* Number Section */}
                        <div className="flex flex-col items-center md:items-start shrink-0">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 text-[#0D47A1]">Breakthrough</span>
                           <span className="text-6xl md:text-8xl lg:text-9xl font-heading font-black leading-none text-[#0D47A1]">{item.num}</span>
                        </div>


                        {/* Content Section */}
                        <div className="flex-grow pt-4 md:pt-10 text-center md:text-left">
                           <h3 className="text-xl md:text-2xl font-bold text-[#111827] uppercase tracking-widest mb-4 font-heading-alt italic hidden">{item.label}</h3>
                           <p className="text-base md:text-lg text-[#111827] leading-relaxed font-medium">
                              {item.text}
                           </p>
                        </div>
                     </motion.div>
                  ))}
               </div>

               {/* Undeniable Results Box - Redesigned for High Authority */}
               <div className="bg-[#0D47A1] text-white p-6 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden mb-20 group">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50"></div>

                  <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                     <div className="shrink-0 relative">
                        {/* Graphical Indicator */}
                        <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[8px] border-white/10 flex flex-col items-center justify-center relative">
                           <div className="absolute inset-0 rounded-full border-[8px] border-white border-t-transparent border-l-transparent rotate-[45deg]"></div>
                           <span className="text-5xl md:text-7xl font-heading italic font-black leading-tight mb-1">94%</span>
                           <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] text-center px-4 leading-tight max-w-[120px] opacity-80">
                              Verified <br /> Recommendation
                           </span>
                        </div>
                     </div>

                     <div className="flex-grow space-y-6 text-center lg:text-left">
                        <div className="inline-block px-4 py-1 bg-white/10 rounded-full mb-2">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em]">SCIENTIFIC SPOTLIGHT</span>
                        </div>
                        <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight font-heading text-white">UNDENIABLE RESULTS</h4>
                        <p className="text-lg md:text-xl leading-relaxed text-white/90 italic font-medium max-w-2xl">
                           In landmark research spanning the last two decades, scientists have confirmed that NAD+ is not just a participant, but the master regulator of cellular metabolism, DNA repair, and vitality in human cells. Declining NAD+ is now recognized as a primary driver of the aging process itself.
                        </p>
                        <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-8">
                           <span className="text-xs font-black uppercase tracking-widest text-white">USA MANUFACTURED</span>
                           <span className="text-xs font-black uppercase tracking-widest text-white">THIRD-PARTY TESTED</span>
                           <span className="text-xs font-black uppercase tracking-widest text-white">GMP CERTIFIED</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col items-center gap-6">
                  <button
                     onClick={scrollToProducts}
                     className="w-full md:w-auto min-w-[400px] bg-[#0D47A1] text-white font-black text-sm px-10 py-5 rounded-2xl uppercase tracking-widest hover:bg-[#111827] transition-all duration-300 shadow-2xl flex items-center justify-center group"
                  >
                     Start Your Protocol
                     <svg className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                  <div className="flex items-center gap-3">
                     <div className="w-5 h-5 rounded bg-[#0D47A1] flex items-center justify-center">
                        <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                     </div>
                     <span className="text-lg font-bold text-[#111827] italic">30 Day Money Back Guarantee</span>
                  </div>
               </div>
            </div>
         </section>

         {/* 2 CAPSULES A DAY SECTION - SURGICAL CUTS & EDITORIAL LAYOUT */}
         <section id="science" className="relative py-24 md:py-32 lg:py-48 bg-white overflow-hidden">
            {/* Background Architectural Cuts */}
            <div className="absolute top-0 right-0 w-full lg:w-1/2 h-full bg-[#F9FAFB] transform -skew-x-12 translate-x-24 z-0"></div>
            <div className="absolute top-0 right-0 w-1/3 h-full bg-[#0D47A1]/[0.02] transform -skew-x-12 translate-x-48 z-0"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
                  
                  {/* Left: Staggered Spherical Imagery with Surgical Frames */}
                  <div className="lg:col-span-5 relative">
                     <div className="flex flex-col gap-8 md:gap-12">
                        {/* 1. NMN / NR Protocol - Offset Top */}
                        <div className="flex items-center gap-6 group">
                           <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-[10px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden shrink-0 transform group-hover:scale-105 transition-transform duration-700">
                              <img src="https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=400&h=400" className="w-full h-full object-cover" alt="NMN" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#0D47A1]">Pillar 01</h4>
                              <p className="text-sm font-bold text-[#111827]">NMN / NR Protocol</p>
                           </div>
                        </div>

                        {/* 2. Pure Resveratrol - Offset Middle Right */}
                        <div className="flex items-center gap-6 self-end md:mr-[-40px] group">
                           <div className="space-y-1 text-right">
                              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#0D47A1]">Pillar 02</h4>
                              <p className="text-sm font-bold text-[#111827]">Pure Resveratrol</p>
                           </div>
                           <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-[10px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden shrink-0 transform group-hover:scale-105 transition-transform duration-700">
                              <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=400&h=400" className="w-full h-full object-cover" alt="Resveratrol" />
                           </div>
                        </div>

                        {/* 3. 99%+ Purity Seal - Offset Bottom */}
                        <div className="flex items-center gap-6 group">
                           <div className="w-32 h-32 md:w-44 md:h-44 rounded-full border-[10px] border-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] overflow-hidden shrink-0 transform group-hover:scale-105 transition-transform duration-700">
                              <img src="https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400&h=400" className="w-full h-full object-cover" alt="Purity" />
                           </div>
                           <div className="space-y-1">
                              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-[#0D47A1]">Pillar 03</h4>
                              <p className="text-sm font-bold text-[#111827]">99%+ Purity Seal</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Right: Architectural Content Area */}
                  <div className="lg:col-span-7 space-y-16">
                     <div className="space-y-8">
                        <div className="w-20 h-1.5 bg-[#0D47A1] rounded-full"></div>
                        <h2 className="text-4xl md:text-6xl font-black text-[#111827] leading-[1.05] tracking-tighter">
                           Precision Dosing. <br />
                           <span className="text-[#0D47A1]">Maximum Bioavailability.</span>
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-500 font-medium italic leading-relaxed max-w-2xl">
                           "All it takes is 2 capsules a day to reverse cellular decline and reclaim your natural vitality."
                        </p>
                     </div>

                     <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-t border-gray-100 pt-16">
                        <div className="space-y-4">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">The Core Formula</h4>
                           <p className="text-base text-[#111827] font-medium leading-relaxed">
                              Contains 2 powerful nutrients carefully selected by our leading longevity experts for <span className="font-black">maximum cellular impact.</span>
                           </p>
                        </div>
                        <div className="space-y-4">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">Clinical Validation</h4>
                           <p className="text-base text-[#111827] font-medium leading-relaxed">
                              Backed by decades of research and <span className="font-black">thousands of studies</span> supporting NAD+ restoration.
                           </p>
                        </div>
                        <div className="space-y-4">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">Cellular Repair</h4>
                           <p className="text-base text-[#111827] font-medium leading-relaxed">
                              Precisely dosed to target the <span className="font-black">root cause</span> of low energy and visible aging.
                           </p>
                        </div>
                        <div className="space-y-4">
                           <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">Holistic Glow</h4>
                           <p className="text-base text-[#111827] font-medium leading-relaxed">
                              Supports radiant skin, mental clarity, and <span className="font-black">overall cellular vitality</span> from within.
                           </p>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>




         {/* WHAT HAPPENS WHEN YOU START TAKING CHRONONAD+ SECTION - VITALITY GENESIS PATH */}
         <section id="journey" className="relative py-24 md:py-32 lg:py-48 bg-white overflow-hidden">
            {/* Background Geometric Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0">
               <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 0 L 100 100" stroke="#0D47A1" strokeWidth="0.1" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="#0D47A1" strokeWidth="0.05" fill="none" />
               </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                  {/* Left Column: Genesis Journey Content */}
                  <div className="lg:col-span-7 space-y-16">
                     <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0D47A1]/5 border border-[#0D47A1]/10">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#0D47A1]"></span>
                           <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">Biological Timeline</span>
                        </div>
                        <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#111827] leading-[1.05] tracking-tight font-heading">
                           The Journey to <br />
                           <span className="text-[#0D47A1]">Total Cellular Recovery</span>
                        </h2>
                        <p className="text-xl text-gray-400 font-medium italic max-w-2xl">
                           What unfolds when you restore your body's essential energy molecules? <br />
                           <span className="text-[#111827] font-bold">Experience the Renaissance of your vitality.</span>
                        </p>
                     </div>

                     {/* The Genesis Path - Vertical Architectural Timeline */}
                     <div className="relative pl-16 md:pl-20 space-y-16">
                        {/* Clinical Gradient Beam */}
                        <div className="absolute left-[23px] md:left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#0D47A1] via-blue-200 to-gray-50"></div>

                        {[
                           {
                              phase: "Phase 01",
                              title: "The Activation",
                              time: "1 Week",
                              text: "Your cells begin replenishing their NAD+ levels. You may notice a subtle lift in mental clarity, a calmer, more focused mind, and the first signs of steady, clean energy. Sleep feels deeper and more restorative."
                           },
                           {
                              phase: "Phase 02",
                              title: "The Alignment",
                              time: "3-5 Weeks",
                              text: "Energy becomes consistent throughout the day — no more heavy crashes. Your skin begins to look more refreshed and hydrated, with a softer, healthier glow. Brain fog lifts and your body feels 'in sync'."
                           },
                           {
                              phase: "Phase 03",
                              title: "The Luminosity",
                              time: "6-8 Weeks",
                              text: "Now it’s visible. Skin looks brighter, smoother, and more radiant. Fine lines appear softer, and your overall appearance is more rested and youthful. Mood and mental clarity feel steady and reliable."
                           },
                           {
                              phase: "Phase 04",
                              title: "The Renaissance",
                              time: "Months later",
                              text: "Your energy feels transformed. There is a noticeable vibrancy about you. You feel sharper, lighter, and more like yourself again... having achieved total cellular resonance."
                           }
                        ].map((item, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              whileInView={{ opacity: 1, x: 0 }}
                              viewport={{ once: true, margin: "-100px" }}
                              transition={{ duration: 0.8, delay: i * 0.15 }}
                              className="relative group"
                           >
                              {/* Glass Phase Node */}
                              <div className="absolute -left-[64px] md:-left-[72px] top-1 flex flex-col items-center gap-3">
                                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-white border border-gray-100 shadow-xl flex items-center justify-center group-hover:scale-110 group-hover:border-[#0D47A1]/20 transition-all duration-500 z-20 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0D47A1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="text-[10px] font-black text-[#0D47A1] relative z-10">{item.phase}</span>
                                 </div>
                              </div>

                              {/* Story Card */}
                              <div className="space-y-3">
                                 <div className="flex items-center gap-4">
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0D47A1]/50">{item.time}</span>
                                    <div className="h-[1px] w-8 bg-blue-50"></div>
                                 </div>
                                 <h4 className="text-2xl md:text-3xl font-black text-[#111827] tracking-tight group-hover:text-[#0D47A1] transition-colors duration-300">
                                    {item.title}
                                 </h4>
                                 <p className="text-gray-500 leading-relaxed font-medium text-base md:text-lg max-w-2xl">
                                    {item.text}
                                 </p>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>

                  {/* Right Column: Inspirational Cinematic Visual */}
                  <div className="lg:col-span-5 relative">
                     <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="relative"
                     >
                        {/* Architectural Frame Accents */}
                        <div className="absolute -inset-8 border border-blue-50 rounded-[5rem] z-0 opacity-50 translate-x-4 translate-y-4"></div>
                        
                        {/* Main Image Container */}
                        <div className="relative aspect-[4/5] rounded-[4.5rem] overflow-hidden shadow-[0_50px_100px_-30px_rgba(0,0,0,0.2)] border-[12px] border-white z-10">
                           <img
                              src="/hormone_harmony_results_woman.png"
                              alt="The Vitality Renaissance"
                              className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-[2000ms]"
                           />

                        </div>

                        {/* Floating Metric Spheres */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white rounded-full shadow-2xl flex flex-col items-center justify-center border border-gray-50 z-20 animate-bounce-slow">
                           <span className="text-2xl font-black text-[#0D47A1]">100%</span>
                           <span className="text-[8px] font-black uppercase text-gray-400 tracking-tighter">Bio-Available</span>
                        </div>
                     </motion.div>
                  </div>

               </div>
            </div>
         </section>

         {/* WORKS FOR ALL AGES SECTION - REFINED PROPER LAYOUT */}
         <section id="transformation" className="py-24 md:py-32 bg-white overflow-hidden relative">
            {/* Soft Architectural Background Scoop */}
            <div className="absolute bottom-0 right-0 w-full lg:w-[45%] h-full bg-[#F9FAFB] lg:rounded-l-[10rem] z-0 hidden lg:block"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
                  
                  {/* Left Column: Benefits & Header */}
                  <div className="w-full lg:w-[60%] space-y-12">
                     <div className="space-y-6">
                        <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0D47A1]/5 border border-[#0D47A1]/10">
                           <span className="w-1.5 h-1.5 rounded-full bg-[#0D47A1]"></span>
                           <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">Vitality Transformation</span>
                        </div>
                        <h2 className="text-3xl md:text-5xl font-black text-[#111827] leading-[1.1] tracking-tight">
                           No Matter How Long You’ve Been Feeling <br />
                           <span className="text-[#0D47A1]">Low Energy, Dull, or “Not Yourself”</span>
                        </h2>
                     </div>

                     {/* Clean Benefit Grid - Compact & Proper */}
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-8">
                        {[
                           { 
                              title: "Sculpted Glow", 
                              desc: "Reveal a more refreshed look as skin appears firmer.", 
                              icon: (
                                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                                 </svg>
                              )
                           },
                           { 
                              title: "Restorative Sleep", 
                              desc: "Deep sleep so your body can fully recharge.", 
                              icon: (
                                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
                                 </svg>
                              )
                           },
                           { 
                              title: "Mental Clarity", 
                              desc: "Balanced mood and clearer thinking daily.", 
                              icon: (
                                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.54Z"/>
                                    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.54Z"/>
                                 </svg>
                              )
                           },
                           { 
                              title: "Steady Vigor", 
                              desc: "Stay energized without the crashes or fog.", 
                              icon: (
                                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M13 2 L3 14 L12 14 L11 22 L21 10 L12 10 L13 2 Z"/>
                                 </svg>
                              )
                           },
                           { 
                              title: "Graceful Aging", 
                              desc: "Support smoother, brighter, youthful skin.", 
                              icon: (
                                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M6 3h12l4 5-10 13L2 8z"/>
                                    <path d="M11 21 2 8h20L13 21z"/>
                                    <path d="M2 8h20"/>
                                 </svg>
                              )
                           },
                           { 
                              title: "Total Freedom", 
                              desc: "Enjoy long days without feeling drained.", 
                              icon: (
                                 <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="12" cy="12" r="4"/>
                                    <path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/>
                                 </svg>
                              )
                           }
                        ].map((item, i) => (
                           <div key={i} className="flex gap-5 group">
                              <div className="shrink-0 w-10 h-10 rounded-xl bg-[#F9FAFB] flex items-center justify-center text-[#0D47A1] shadow-sm border border-gray-100 group-hover:bg-[#0D47A1] group-hover:text-white transition-all">
                                 {item.icon}
                              </div>
                              <div className="space-y-1">
                                 <h4 className="text-base font-bold text-[#111827]">{item.title}</h4>
                                 <p className="text-sm text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Right Column: Premium Image Showcase */}
                  <div className="w-full lg:w-[40%]">
                     <div className="relative">
                        {/* Decorative Rings */}
                        <div className="absolute -inset-10 border border-blue-50 rounded-full opacity-50 z-0"></div>
                        
                        <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-2xl border-[16px] border-white ring-1 ring-gray-100">
                           <img
                              src={womenAllAgesResult}
                              alt="Radiant Transformation Result"
                              className="w-full h-auto object-cover"
                           />
                        </div>

                        {/* Integrated Metric Tag */}
                        <div className="absolute -bottom-6 right-10 bg-white px-8 py-4 rounded-3xl shadow-xl z-20 border border-gray-100">
                           <div className="flex items-center gap-3">
                              <span className="text-3xl font-black text-[#0D47A1]">98%</span>
                              <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 leading-tight">Satisfaction <br /> Rate</span>
                           </div>
                        </div>
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* TRUST ICONS SECTION - ORBITAL CLINICAL CERTIFICATION */}
         <section id="trust" className="relative py-24 md:py-32 lg:py-48 bg-white overflow-hidden">
            {/* Background Architectural Capsule */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] h-[300px] md:h-[400px] bg-gray-50/50 rounded-[10rem] border border-gray-100/50 pointer-events-none z-0 hidden lg:block">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white transform rotate-45 translate-x-16 -translate-y-16 border-b border-l border-gray-100"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="text-center mb-24 space-y-6">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0D47A1]/5 border border-[#0D47A1]/10">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#0D47A1]"></span>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">Purity Standard</span>
                  </div>
                  <h2 className="text-4xl md:text-5xl lg:text-7xl font-black text-[#111827] leading-[1.05] tracking-tight font-heading">
                     Clinical Purity. <br />
                     <span className="text-[#0D47A1]">Zero Compromise.</span>
                  </h2>
               </div>

               <div className="relative">
                  {/* Orbital Beam Path */}
                  <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#0D47A1]/10 to-transparent hidden md:block"></div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 relative">
                     {[
                        {
                           label: "Keto, Paleo & Vegan Friendly",
                           img: "/Sugar_Free.png",
                           y: "md:-translate-y-4"
                        },
                        {
                           label: "Non-GMO & Caffeine Free",
                           img: "/Non-GMO.png",
                           y: "md:translate-y-4"
                        },
                        {
                           label: "cGMP Certified Facility",
                           img: "/cGMP.png",
                           y: "md:-translate-y-8"
                        },
                        {
                           label: "Clinically Tested Formula",
                           img: "/Clinically_Tested.png",
                           y: "md:translate-y-4"
                        },
                        {
                           label: "Made In The USA",
                           img: "/Made_In_USA-removebg-preview_1.png",
                           y: "md:-translate-y-4"
                        }
                     ].map((item, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.8, delay: i * 0.1 }}
                           className={`flex flex-col items-center text-center group ${item.y}`}
                        >
                           <div className="relative">
                              {/* Pulsing Aura */}
                              <div className="absolute inset-0 rounded-full bg-[#0D47A1]/5 group-hover:bg-[#0D47A1]/10 transition-all duration-700 blur-2xl opacity-0 group-hover:opacity-100 scale-150"></div>
                              
                              {/* The Spherical Node */}
                              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] group-hover:shadow-[0_30px_70px_rgba(13,71,161,0.12)] group-hover:border-[#0D47A1]/20 group-hover:-translate-y-2 transition-all duration-700 relative z-10 p-6 md:p-8">
                                 <img
                                    src={item.img}
                                    alt={item.label}
                                    className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 transform group-hover:scale-110"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Icon'; }}
                                 />
                              </div>
                           </div>

                           <div className="space-y-3 relative z-10">
                              <p className="text-[10px] md:text-[11px] font-black text-[#111827] leading-relaxed uppercase tracking-[0.25em] max-w-[140px] transition-colors group-hover:text-[#0D47A1]">
                                 {item.label}
                              </p>
                              <div className="mx-auto h-[2px] w-0 bg-[#0D47A1] group-hover:w-8 transition-all duration-700"></div>
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* CHECKOUT BUNDLE SECTION - MATCHING REFERENCE UI */}
         <section id="pricing-grid" className="py-12 md:py-16 lg:py-24 bg-gray-50/50 scroll-mt-20 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">

               {/* Checkout Progress Stepper */}
               <div className="max-w-4xl mx-auto mb-20">
                  <div className="relative flex justify-between items-center">
                     <div className="absolute top-1/2 left-0 w-full h-[3px] bg-gray-200 -z-10" />
                     <div className="absolute top-1/2 left-0 w-[33%] h-[3px] bg-black -z-10" />

                     {[
                        { step: 1, label: "Select Your Package", active: true },
                        { step: 2, label: "Billing Information", active: false },
                        { step: 3, label: "Thank You", active: false }
                     ].map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center gap-3 bg-transparent">
                           <span className="text-xs md:text-sm font-bold text-black mb-1">{s.label}</span>
                           <div className={`w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] flex items-center justify-center text-lg md:text-xl font-black bg-white transition-all ${s.active ? 'border-black text-black scale-110 shadow-md' : 'border-gray-200 text-gray-300'}`}>
                              {s.step}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="text-center mb-16">
                  <h2 className="text-2xl md:text-3xl font-black text-black font-heading uppercase">
                     Choose Your Package Below
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
                  {[
                     {
                        title: "STARTER ORDER",
                        headerBg: "bg-black",
                        headerText: "text-white",
                        price: "$15.99",
                        total: "$15.99",
                        image: "/Product1.png",
                        isPopular: false,
                        savings: null,
                        installments: "$4.00"
                     },
                     {
                        title: "MOST POPULAR",
                        headerBg: "bg-black",
                        headerText: "text-white",
                        borderColor: "ring-4 ring-black/5",
                        price: "$12.79",
                        total: "$25.58",
                        originalTotal: "$31.98",
                        image: "/Product2.png",
                        isPopular: true,
                        savings: "20% OFF",
                        installments: "$6.40"
                     }
                  ].map((pkg, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative flex flex-col bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 ${pkg.borderColor || ''}`}
                     >
                        {/* Header */}
                        <div className={`${pkg.headerBg} py-4 text-center`}>
                           <span className={`text-lg font-black tracking-[0.2em] uppercase ${pkg.headerText}`}>{pkg.title}</span>
                        </div>

                        {/* Savings Circle Badge */}
                        {pkg.savings && (
                           <div className="absolute top-28 right-6 w-20 h-20 rounded-full bg-[#0D47A1] text-white flex flex-col items-center justify-center z-20 shadow-xl border-4 border-white">
                              <span className="text-xl font-black leading-none">{pkg.savings.split(' ')[0]}</span>
                              <span className="text-[10px] font-bold uppercase tracking-tighter">OFF</span>
                           </div>
                        )}

                        <div className="flex-grow flex flex-col items-center pt-8 md:pt-12 lg:pt-16 px-4 md:px-8 pb-6 md:pb-8 text-center">
                           {/* Product Image */}
                           <div className="h-[220px] md:h-[300px] lg:h-[340px] w-full mb-0 relative flex items-center justify-center">
                              <img
                                 src={pkg.image}
                                 alt={pkg.title}
                                 className="w-full h-full object-contain mix-blend-multiply scale-100 md:scale-110 lg:scale-125 transition-transform duration-500"
                              />
                           </div>

                           {/* Price Highlight */}
                           <div className="mb-4 space-y-1">
                              <div className="text-4xl font-black text-[#0D47A1] tracking-tighter">{pkg.price}</div>
                              <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Per Jar</div>
                           </div>

                           {/* Total & Installments */}
                           <div className="mb-6 w-full">
                              <div className="text-base font-bold text-black mb-1">
                                 Total {pkg.originalTotal && <span className="line-through text-gray-300 font-medium mr-2">{pkg.originalTotal}</span>}
                                 {pkg.total}
                              </div>
                              <div className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-gray-400">
                                 <span>or 4 installments of {pkg.installments} by</span>
                                 <img src="https://cdn.shopify.com/s/files/1/0550/1121/3382/files/Shop_Pay_Logo.png?v=1646244670" className="h-3.5 grayscale opacity-50" alt="Shop Pay" />
                              </div>
                           </div>

                           {/* BUY NOW Button */}
                           <button className="w-full py-5 rounded-2xl bg-black text-white font-black text-sm tracking-widest shadow-xl hover:bg-[#0D47A1] transition-all duration-300 flex items-center justify-center gap-3 mb-8 group">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                              <span>BUY NOW</span>
                           </button>

                           {/* Feature Icons Footer */}
                           <div className="w-full pt-6 border-t border-gray-100 flex flex-wrap items-center justify-center gap-6">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#0D47A1] border border-gray-100 shadow-sm">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                                 </div>
                                 <div className="text-left">
                                    <p className="text-[11px] font-black text-black leading-tight uppercase">60 DAYS</p>
                                    <p className="text-[11px] font-bold text-gray-400 uppercase leading-tight">Guarantee</p>
                                 </div>
                              </div>

                              {pkg.isPopular && (
                                 <>
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#0D47A1] border border-gray-100 shadow-sm">
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                       </div>
                                       <div className="text-left">
                                          <p className="text-[11px] font-black text-black leading-tight uppercase">Free</p>
                                          <p className="text-[11px] font-bold text-gray-400 uppercase leading-tight">Shipping</p>
                                       </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                       <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-[#0D47A1] border border-gray-100 shadow-sm">
                                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                                       </div>
                                       <div className="text-left">
                                          <p className="text-[11px] font-black text-black leading-tight uppercase">Free</p>
                                          <p className="text-[11px] font-bold text-gray-400 uppercase leading-tight">Cookbook</p>
                                       </div>
                                    </div>
                                 </>
                              )}
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* PURCHASE PROTECTION & GUARANTEE SECTION - ARCHITECTURAL ASSURANCE SUITE */}
         <section id="guarantee" className="relative py-24 md:py-32 lg:py-48 bg-white overflow-hidden">
            {/* Background Orbital Accents */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] z-0">
               <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="90" cy="10" r="40" stroke="#0D47A1" strokeWidth="0.1" fill="none" />
                  <path d="M0 100 L 100 0" stroke="#0D47A1" strokeWidth="0.05" fill="none" />
               </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="text-center mb-24 max-w-5xl mx-auto space-y-8">
                  <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-[#0D47A1]/5 border border-[#0D47A1]/10">
                     <span className="w-1.5 h-1.5 rounded-full bg-[#0D47A1]"></span>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">The CellStart Promise</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl lg:text-7xl font-black text-[#111827] leading-[1.05] tracking-tight font-heading">
                     Clinical Integrity, <br />
                     <span className="text-[#0D47A1]">Total Assurance.</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-gray-400 font-medium italic max-w-3xl mx-auto leading-relaxed">
                     At CellStart, we believe in the surgical precision of our science. If our protocol doesn't redefine your vitality, <span className="text-[#111827] font-bold">we bear 100% of the risk.</span>
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
                  {[
                     {
                        title: "Global Fulfillment",
                        subtitle: "Free Expedited Shipping",
                        desc: "Enjoy free shipping on all monthly protocols or orders of 2+ bottles. We handle the logistics so you can focus on your cellular recovery.",
                        icon: (
                           <svg className="w-8 h-8 text-[#0D47A1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="1" y="3" width="15" height="13" />
                              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                              <circle cx="5.5" cy="18.5" r="2.5" />
                              <circle cx="18.5" cy="18.5" r="2.5" />
                           </svg>
                        )
                     },
                     {
                        title: "Clinical Integrity",
                        subtitle: "30-Day Money Back",
                        desc: "True cellular restoration is a journey. If you don't feel a measurable shift in your energy and clarity within 30 days, we'll refund your first bottle in full.",
                        icon: (
                           <svg className="w-8 h-8 text-[#0D47A1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                              <path d="m9 12 2 2 4-4" />
                           </svg>
                        ),
                        featured: true
                     },
                     {
                        title: "Instant Resolution",
                        subtitle: "Hassle-Free Refunds",
                        desc: "Our 'No-Questions-Asked' policy means your refund is processed immediately. We prioritize your satisfaction over our bottom line, always.",
                        icon: (
                           <svg className="w-8 h-8 text-[#0D47A1]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M12 2v20M5 5h14M5 19h14M17 9l-5-5-5 5M7 15l5 5 5-5" />
                           </svg>
                        )
                     }
                  ].map((item, i) => (
                     <motion.div
                        key={i}
                        whileHover={{ y: -10 }}
                        className={`relative group h-full flex flex-col`}
                     >
                        {/* THE ARCHITECTURAL CUT-OUT CARD */}
                        <div className={`relative flex-grow bg-[#F8FAFC] p-10 md:p-12 rounded-b-[4rem] rounded-tl-[4rem] border border-gray-100 shadow-[0_20px_50px_rgba(0,0,0,0.03)] group-hover:shadow-2xl transition-all duration-500 overflow-hidden ${item.featured ? 'bg-[#F0F7FF] border-[#0D47A1]/10' : ''}`}>
                           
                           {/* The Diagonal Architectural Cut */}
                           <div className="absolute top-0 right-0 w-24 h-24 bg-white transform translate-x-12 -translate-y-12 rotate-45 group-hover:translate-x-10 group-hover:-translate-y-10 transition-transform duration-700 border-b border-l border-gray-100 z-20"></div>

                           {/* Content */}
                           <div className="relative z-10 space-y-8 h-full flex flex-col">
                              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                 {item.icon}
                              </div>
                              <div className="space-y-4 flex-grow">
                                 <div className="space-y-1">
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D47A1]/40">{item.title}</span>
                                    <h4 className="text-2xl font-black text-[#111827] tracking-tight">{item.subtitle}</h4>
                                 </div>
                                 <p className="text-base text-gray-500 font-medium leading-relaxed">
                                    {item.desc}
                                 </p>
                              </div>
                              <div className="pt-4">
                                 <div className="h-[2px] w-12 bg-[#0D47A1]/10 group-hover:w-full transition-all duration-700"></div>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>

               <div className="flex flex-col items-center gap-10">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToProducts}
                     className="bg-[#0D47A1] text-white font-black text-xs md:text-sm px-16 py-7 rounded-full uppercase tracking-[0.3em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500"
                  >
                     Secure Your Protocol
                  </motion.button>
                  <div className="flex items-center gap-4 text-gray-400 font-black uppercase tracking-[0.3em] text-[10px]">
                     <div className="w-5 h-5 bg-[#0D47A1]/5 rounded-full flex items-center justify-center border border-[#0D47A1]/10">
                        <svg className="w-2.5 h-2.5 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="4"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                     </div>
                     <span>Verified Clinical Satisfaction Guarantee</span>
                  </div>
               </div>
            </div>
         </section>


         {/* COMPREHENSIVE REVIEWS SECTION */}
         {/* THE PROOF IS IN THE RESULTS - JUDGE.ME STYLE REDESIGN */}
         <section id="results" className="py-12 md:py-16 lg:py-24 bg-white border-y border-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-16 space-y-6 max-w-6xl mx-auto">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Customer Intelligence</span>
                  <h2 className="text-2xl md:text-3xl font-black text-[#111827] leading-tight tracking-tight font-heading">
                     The Proof is in <br />
                     <span className="italic text-[#0D47A1] font-medium">The Results.</span>
                  </h2>
                  <p className="text-lg text-gray-500 font-medium italic max-w-3xl mx-auto leading-relaxed">
                     Join thousands of women who have restored their cellular vitality and reclaimed their spark with the ChronoNAD+ cellular protocol.
                  </p>
               </div>

               {/* Trust Dashboard Bar */}
               <div className="bg-white rounded-[2rem] p-8 md:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between border border-gray-100 gap-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
                  <div className="flex items-center gap-12">
                     <div className="flex flex-col items-center lg:items-start">
                        <div className="flex items-center gap-3">
                           <span className="text-4xl font-bold text-[#111827]">4.8</span>
                           <div className="flex text-[#FFC107] text-sm">
                              {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                           </div>
                        </div>
                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">Global Satisfaction Score</span>
                     </div>
                     <div className="h-12 w-[1px] bg-gray-100 hidden lg:block"></div>
                     <div className="flex flex-col items-center lg:items-start">
                        <span className="text-2xl font-bold text-[#111827]">99%</span>
                        <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">Would Recommend Protocol</span>
                     </div>
                  </div>

                  <div className="flex flex-col items-center lg:items-end gap-3">
                     <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-[#0D47A1] rounded-full flex items-center justify-center">
                           <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#111827]">Verified Clinical Trust Score</span>
                     </div>
                     <div className="flex -space-x-2">
                        {[...Array(5)].map((_, i) => (
                           <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden shadow-sm">
                              <img src={`https://i.pravatar.cc/100?u=stats-${i}`} alt="user" className="w-full h-full object-cover" />
                           </div>
                        ))}
                        <div className="w-8 h-8 rounded-full border-2 border-white bg-[#0D47A1] text-white flex items-center justify-center text-[8px] font-black shadow-sm">+53k</div>
                     </div>
                  </div>
               </div>

               {/* Review Cards List - Single Column Horizontal Style */}
               <div className="grid grid-cols-1 gap-12 mb-16 max-w-6xl mx-auto">
                  {(() => {
                     const allReviews = [
                        {
                           name: "Brenda",
                           title: "Great quality supplements",
                           body: "60 capsules in a bottle. Directions say to take two a day. Pills are pretty easy to swallow. I had good results with taking this supplement. More energy and I have better sleep now. My digestion improved also.",
                           date: "2 MONTHS AGO",
                           bg: "bg-[#E3F2FD]/30",
                           initial: "B"
                        },
                        {
                           name: "HappyFamily",
                           title: "NAD+ Boost for Feeling Younger!",
                           body: "CellStart is a solid pick for anyone wanting to support healthy aging and cellular energy! After a month of one capsule daily with breakfast, I've noticed steadier energy, better focus, and recovery after workouts.",
                           date: "1 MONTH AGO",
                           bg: "bg-[#FFF3E0]/30",
                           initial: "HF"
                        },
                        {
                           name: "Stephanie Jackson",
                           title: "Worth the Buy",
                           body: "I’ve noticed I don’t feel as sluggish during the day, and my recovery after workouts seems quicker. Definitely worth trying if you want extra support for energy, focus, and healthy aging.",
                           date: "3 MONTHS AGO",
                           bg: "bg-[#FCE4EC]/30",
                           initial: "S"
                        },
                        {
                           name: "James",
                           title: "Easy to swallow capsules.",
                           body: "The CellStart Nad+ Resveratrol capsules come a well-sealed bottle. I like the fact that they are made in the USA and are also Non-GMO. I feel they give me more energy and a better start to my mornings.",
                           date: "1 MONTH AGO",
                           bg: "bg-[#E8F5E9]/30",
                           initial: "J"
                        },
                        {
                           name: "Danielle",
                           title: "A Much Needed Energy Boost for Moms!",
                           body: "As a 32-year-old mom juggling kids.. within the first week, I noticed a real difference. I wasn’t crashing halfway through the day, and I felt more clear-headed and focused.",
                           date: "2 MONTHS AGO",
                           bg: "bg-[#FFFDE7]/40",
                           initial: "D"
                        },
                        {
                           name: "Chris",
                           title: "Made in the USA",
                           body: "Easy to swallow with water, and it comes with a big supply. I can't tell if it does anything, like most supplements. So I'm just hoping my future self will appreciate this.",
                           date: "04/18/2026",
                           bg: "bg-[#E3F2FD]/30",
                           initial: "C"
                        },
                        {
                           name: "J. Winnie",
                           title: "Good option if you are looking for this type of supplement. Very good value.",
                           body: "Like many people getting close to 60, I started looking for answers to the issues I'm having with my body and well-being. I find it very difficult to write a clear and definitive review for supplements because each person responds differently and while some may see benefits in days, others may take weeks or months to see them, if at all. So, what I would say about these are that they are tasteless, easy to swallow, and the package is well marked with ingredients, directions, disclosures, etc. In looking for this type of supplement, the ingredients listed were what I wanted and in the strength and quality I wanted them in. I'm satisfied with my response to the supplement. It's not going to be a fountain of youth where you go to bed tired and old and then wake up young, energetic and vibrant, but I do notice small improvements. My joints aren't as stiff, my energy levels are a bit better, the circles under my eyes seem not as dark... baby steps! I think this supplement has been effective for me in a realistic way and without any unwanted side-effects. I think this is a very good value.",
                           date: "04/14/2026",
                           bg: "bg-[#FFF3E0]/30",
                           initial: "JW"
                        },
                        {
                           name: "Two Cents",
                           title: "Reasonable price, straight forward ingredients",
                           body: "This is a fairly straight forward NAD+ supplement that provides actual nicotinamide adenine dinucleotide, as opposed to a precursor. I say it's straight forward because it combines the NAD+ with resveratrol, and nothing else. Since it is actual NAD, which isn't easily absorbed into the body, it would have been nice if they formulated it with liposomes to help get it into your system more efficiently. The capsules are pretty standard and easy to take. One serving (500mg NAD+, and 100mg resveratrol) is two capsules, so this bottle of 90 capsules will last 45 days. Taking NAD+ supplements has seemed to have a positive effect for me for overall energy and wellbeing. This \"Cellstart\" supplement seems like a good quality, and has been just as effective as others I've tried. This \"Chrono NAD+\" supplement is the only product on the website for the brand \"CellStart\", so it appears to be the only thing they make. It is made in the U.S., which is nice, and their website states that it's made in a \"Eurofins-accredited cGMP-certified, and FDA-inspected facility\". The $19.99 price is reasonable for a 45 day supply, so I would recommend giving it a try.",
                           date: "04/13/2026",
                           bg: "bg-[#FCE4EC]/30",
                           initial: "TC"
                        },
                        {
                           name: "Mustang827",
                           title: "It takes a while to feel the difference",
                           body: "I feel great, but it takes awhile. My wife after the first week asked if I felt any different? I answered, \"nope.\" She asked again after the second week. I said, \"maybe.\" I wasn't sure if there was real improvement, or just wishful thinking. Yesterday I came home after playing golf, and I experienced an epiphany; I felt great! Same thing today. It's a feeling of overall wellness. Folks, buy this and be patient. Also take advantage of any multi-bottle discounts.",
                           date: "04/12/2026",
                           bg: "bg-[#E8F5E9]/30",
                           initial: "M"
                        },
                        {
                           name: "Mike B.",
                           title: "Simple Formula, Easy to Take, and a Solid Value for Daily NAD Support",
                           body: "I've been trying this NAD+ supplement and the first thing that stood out is how clean and straightforward the formula is. Just NAD+ and resveratrol — no fillers, no weird aftertaste, and the capsules are small enough to swallow without thinking about it. It’s gentle on the stomach, and I didn’t notice any side effects, which is a big deal with supplements like this. The bottle gives you a 1.5-month supply, and the fact that it’s made in the USA adds a little more confidence in the quality. This feels like a good option if you're looking for a simple, no-nonsense way to support energy and cellular health without overpaying. At this price point, it's a strong value for a daily routine, especially if you prefer supplements that keep the ingredient list minimal. Bottom line: easy to take, clean formula, and a practical addition if you're trying to support long-term wellness.",
                           date: "04/11/2026",
                           bg: "bg-[#FFFDE7]/40",
                           initial: "MB"
                        }
                     ]

                     const totalPages = Math.ceil(allReviews.length / reviewsPerPage)
                     const startIndex = (currentPage - 1) * reviewsPerPage
                     const currentReviews = allReviews.slice(startIndex, startIndex + reviewsPerPage)

                     return (
                        <>
                           {currentReviews.map((review, i) => {
                              const actualIndex = startIndex + i;
                              return (
                                 <motion.div
                                    key={actualIndex}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className={`${review.bg} p-6 md:p-10 rounded-[2.5rem] border border-white flex flex-col group hover:shadow-xl transition-all duration-500`}
                                 >
                                    <div className="flex justify-between items-start mb-6">
                                       <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-full bg-[#0D47A1] text-white flex items-center justify-center font-black text-xs shadow-inner">{review.initial}</div>
                                          <div className="flex flex-col">
                                             <div className="flex items-center gap-2">
                                                <span className="font-bold text-xs text-[#111827] tracking-tight">{review.name}</span>
                                                <div className="w-3.5 h-3.5 bg-[#0D47A1] rounded-full flex items-center justify-center">
                                                   <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                                </div>
                                             </div>
                                             <span className="text-[9px] text-gray-400 font-medium mt-0.5">Verified Buyer</span>
                                          </div>
                                       </div>
                                       <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{review.date}</span>
                                    </div>

                                    <div className="flex text-[#FFC107] text-[10px] mb-4">
                                       {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                                    </div>

                                    <h4 className="text-xl font-black text-[#0D47A1] mb-4 font-heading-alt italic tracking-tight leading-tight">{review.title}</h4>
                                    <div className="relative group/text">
                                       <p className={`text-sm md:text-base text-gray-600 leading-relaxed font-medium mb-8 transition-all duration-500 ${expandedReviews[actualIndex] ? '' : 'line-clamp-3'}`}>
                                          "{review.body}"
                                       </p>
                                       {review.body.length > 120 && (
                                          <button
                                             onClick={() => toggleReview(actualIndex)}
                                             className="absolute -bottom-5 left-0 text-[9px] font-black uppercase tracking-[0.2em] text-[#0D47A1] hover:text-[#111827] transition-colors"
                                          >
                                             {expandedReviews[actualIndex] ? 'Show Less [-]' : 'Read Full Story [+]'}
                                          </button>
                                       )}
                                    </div>

                                    <div className="mt-auto pt-6 border-t border-white/50 flex items-center justify-between">
                                       <div className="flex items-center gap-3">
                                          <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1 border border-white shadow-sm">
                                             <img src={chronoNadIsolated} alt="product" className="w-full h-full object-contain mix-blend-multiply" />
                                          </div>
                                          <div className="text-[8px] font-black uppercase tracking-[0.1em] text-gray-400">
                                             <p className="text-[#0D47A1]">Authenticated Protocol Review</p>
                                          </div>
                                       </div>
                                       <div className="flex items-center gap-1.5 text-[8px] font-black text-gray-300 uppercase tracking-widest">
                                          <span>Helpful?</span>
                                          <button className="hover:text-[#0D47A1] transition-colors">Yes</button>
                                          <button className="hover:text-[#0D47A1] transition-colors">No</button>
                                       </div>
                                    </div>
                                 </motion.div>
                              )
                           })}

                           {/* Pagination Controls */}
                           <div className="flex items-center justify-center gap-4 mt-12">
                              <button
                                 onClick={() => {
                                    setCurrentPage(prev => Math.max(1, prev - 1));
                                    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
                                 }}
                                 disabled={currentPage === 1}
                                 className={`p-2 rounded-full border border-gray-200 transition-all ${currentPage === 1 ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50 text-[#0D47A1]'}`}
                              >
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                              </button>

                              <div className="flex items-center gap-2">
                                 {[...Array(totalPages)].map((_, i) => (
                                    <button
                                       key={i}
                                       onClick={() => {
                                          setCurrentPage(i + 1);
                                          document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
                                       }}
                                       className={`w-8 h-8 rounded-full text-[10px] font-black transition-all ${currentPage === i + 1 ? 'bg-[#0D47A1] text-white' : 'text-gray-400 hover:text-[#0D47A1] hover:bg-gray-50'}`}
                                    >
                                       {i + 1}
                                    </button>
                                 ))}
                              </div>

                              <button
                                 onClick={() => {
                                    setCurrentPage(prev => Math.min(totalPages, prev + 1));
                                    document.getElementById('results')?.scrollIntoView({ behavior: 'smooth' });
                                 }}
                                 disabled={currentPage === totalPages}
                                 className={`p-2 rounded-full border border-gray-200 transition-all ${currentPage === totalPages ? 'opacity-30 cursor-not-allowed' : 'hover:bg-gray-50 text-[#0D47A1]'}`}
                              >
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                              </button>
                           </div>
                        </>
                     )
                  })()}
               </div>

               {/* Bottom Actions */}
               <div className="flex flex-col items-center gap-12">

                  <div className="flex flex-col items-center gap-6 w-full max-w-xl">
                     <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={scrollToProducts}
                        className="w-full bg-[#0D47A1] text-white font-black text-lg px-12 py-7 rounded-2xl uppercase tracking-widest shadow-2xl flex items-center justify-center group"
                     >
                        Start My Transformation
                        <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </motion.button>
                     <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-widest text-[9px]">
                        <div className="w-5 h-5 bg-[#0D47A1] rounded flex items-center justify-center">
                           <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <span>60-Day Clinical Guarantee</span>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* SUPPLEMENT FACTS TRANSPARENCY SECTION - MINIMALIST MODERN */}
         <section id="formula" className="py-20 md:py-28 lg:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-6">
               {/* Clean Header */}
               <div className="mb-20 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D47A1]">The Protocol</span>
                  <h2 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tight">
                     Formula Transparency
                  </h2>
                  <p className="text-lg text-gray-400 font-medium max-w-2xl">
                     Clinical grade ingredients. Fully transparent disclosure. <br className="hidden md:block" />
                     Exactly what’s inside every ChronoNAD+ protocol.
                  </p>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
                  {/* Left: Supplement Facts Card */}
                  <div className="group">
                     <div className="bg-[#F8FAFC] rounded-[2.5rem] p-8 md:p-12 lg:p-16 h-full flex flex-col justify-center items-center border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:bg-white">
                        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
                           <img
                              src={supplementFacts}
                              alt="ChronoNAD+ Supplement Facts"
                              className="w-full h-auto"
                           />
                        </div>
                        <div className="mt-10 text-center space-y-2">
                           <h4 className="text-sm font-black uppercase tracking-widest text-[#111827]">Supplement Facts</h4>
                           <p className="text-xs text-gray-400 font-medium italic">High-Purity Precursor Blend</p>
                        </div>
                     </div>
                  </div>

                  {/* Right: Product Bottle Card */}
                  <div className="group">
                     <div className="bg-[#F8FAFC] rounded-[2.5rem] p-8 md:p-12 lg:p-16 h-full flex flex-col justify-center items-center border border-gray-100 transition-all duration-500 hover:shadow-2xl hover:bg-white">
                        <div className="relative w-full max-w-xs flex items-center justify-center">
                           <img
                              src="/Product1.png"
                              alt="ChronoNAD+ Bottle"
                              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] transform group-hover:scale-105 transition-transform duration-700 mix-blend-multiply"
                           />
                        </div>
                        <div className="mt-10 text-center space-y-2">
                           <h4 className="text-sm font-black uppercase tracking-widest text-[#111827]">Clinical Protocol</h4>
                           <p className="text-xs text-gray-400 font-medium italic">90 Capsules | 45 Servings</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Simple Trust Footer */}
               <div className="mt-16 flex flex-wrap justify-center gap-8 md:gap-16 opacity-30 grayscale hover:opacity-60 transition-opacity duration-500">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Non-GMO</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">GMP Certified</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Third-Party Tested</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em]">Made in the USA</span>
               </div>
            </div>
         </section>

         {/* MISSION & EXPERT TEAM SECTION - REFINED CLINICAL PREMIUM */}
         <section id="team" className="py-0 overflow-hidden bg-white">
            {/* Mission Header Bar */}
            <div className="bg-white py-12 md:py-16 border-y border-gray-50">
               <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
                  <h2 className="text-sm md:text-base font-black text-[#0D47A1] uppercase tracking-[0.4em] font-heading">
                     The CellStart Mission
                  </h2>
                  <p className="text-4xl md:text-6xl lg:text-7xl font-black text-[#111827] leading-[1.1] max-w-5xl mx-auto tracking-tight">
                     Helping 100,000 Women <br className="hidden md:block" />
                     Restore Their <span className="italic text-[#0D47A1] font-medium">Cellular Vitality.</span>
                  </p>
                  <p className="text-lg md:text-xl text-gray-400 font-medium italic">
                     And Feel Like Themselves Again.
                  </p>
               </div>
            </div>

            {/* Scientific Leadership - Dr. Anthony Njapa */}
            <div className="py-16 md:py-20 bg-white">
               <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                     {/* Left Column: Image & Badge */}
                     <div className="relative">
                        {/* Decorative background border */}
                        <div className="absolute -top-6 -left-6 w-full h-full border-t border-l border-[#0D47A1]/20 rounded-tl-[4rem] -z-10"></div>

                        <div className="relative z-10 rounded-[3rem] overflow-hidden bg-gray-100">
                           <img
                              src="/Dr-Njapa-photo.jpg"
                              alt="Dr. Anthony Njapa"
                              className="w-full h-[500px] lg:h-[600px] object-cover object-top"
                           />
                        </div>

                         {/* Floating Badge - IMPROVED CONTRAST */}
                         <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="absolute -bottom-8 right-0 lg:-right-8 bg-[#001B3D] text-white p-6 md:p-10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] z-20 min-w-[240px] md:min-w-[320px] border border-white/10 backdrop-blur-sm"
                         >
                            <div className="flex flex-col gap-3">
                               <div className="flex items-center gap-3">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse"></div>
                                  <p className="text-[10px] font-black uppercase tracking-[0.3em] text-blue-400/80 font-accent">Clinical Background</p>
                               </div>
                               <p className="text-2xl md:text-3xl font-black tracking-tight text-white">22+ Years <span className="block text-blue-400 font-medium italic text-lg">in Medicine</span></p>
                            </div>
                         </motion.div>
                     </div>

                     {/* Right Column: Text Content */}
                     <div className="mt-12 lg:mt-0 lg:pl-10">
                        <div className="inline-block bg-[#F0F7FF] text-[#0D47A1] text-[10px] font-black uppercase tracking-[0.2em] px-5 py-2.5 rounded-full mb-8 font-accent">
                           Scientific Leadership
                        </div>

                        <h3 className="text-4xl md:text-5xl font-black text-[#002855] mb-8 font-heading tracking-tight">
                           Dr. Anthony Njapa
                        </h3>

                        <p className="text-lg text-gray-600 font-medium leading-relaxed mb-12">
                           With more than 22 years of clinical medical experience, Dr. Anthony Njapa leads the ChronoNAD+ Clinical Advisory Board with an unwavering commitment to patient care and wellness. Dr. Njapa's clinical expertise and leadership ensures that ChronoNAD+ products are guided by medical insight and grounded in proven science.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-12 sm:gap-20">
                           <div>
                              <p className="text-4xl font-black text-[#002855] tracking-tighter mb-2">22+</p>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] font-accent">Years Experience</p>
                           </div>
                           <div>
                              <p className="text-4xl font-black text-[#002855] tracking-tighter mb-2 flex items-center gap-2">
                                 5/5
                                 <span className="text-2xl tracking-widest mt-1">★★★★★</span>
                              </p>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] font-accent">Patient Rating</p>
                           </div>
                        </div>
                     </div>

                  </div>
               </div>
            </div>
         </section>


         {/* FAQ */}
         {/* FAQ SECTION - Redesigned for Premium Minimalist Look */}
         <section id="faq" className="py-16 md:py-24 lg:py-32 bg-gray-50/30">
            <div className="max-w-4xl mx-auto px-6">
               <div className="text-center mb-20 space-y-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Common Inquiries</span>
                  <h2 className="text-2xl md:text-3xl font-black text-[#111827] leading-tight tracking-tight font-heading">
                     Expert Protocol <br />
                     <span className="italic text-[#0D47A1] font-medium">Support</span>
                  </h2>
                  <p className="text-base text-gray-500 font-medium italic max-w-2xl mx-auto leading-relaxed">
                     Everything you need to know about the ChronoNAD+ cellular system.
                  </p>
               </div>

               <div className="space-y-4">
                  {[
                     { q: "HOW QUICKLY WILL I NOTICE THE SYSTEMIC SHIFT?", a: "Most users report a noticeable increase in mental clarity and steady, all-day energy within the first 7-14 days. For deep cellular repair and metabolic optimization, we recommend consistent use for at least 60-90 days to allow coenzyme levels to fully stabilize." },
                     { q: "IS THE CHRONONAD+ PROTOCOL SAFE WITH OTHER MEDICATIONS?", a: "ChronoNAD+ is formulated with ultra-pure, clinical-grade ingredients. However, as with any advanced supplementation, we recommend consulting your physician before beginning the protocol, especially if you are currently taking prescription medication." },
                     { q: "WHAT HAPPENS IF I MISS A DAILY DOSAGE?", a: "Consistency is the foundation of cellular health. If you miss a day, simply resume your protocol the following morning. There is no need to double the dose; your body responds best to a steady, daily rhythm of replenishment." },
                     { q: "WHY THE 4-BOTTLE PROTOCOL FOR OPTIMAL TRANSFORMATION?", a: "True biological transformation takes time. While early benefits are felt quickly, the 4-bottle protocol (120 days) is designed to facilitate complete cellular turnover and lock in your new baseline of vitality, ensuring long-term systemic resilience." }
                  ].map((faq, index) => (
                     <div key={index} className="bg-white rounded-[2rem] border border-gray-100 overflow-hidden hover:border-[#0D47A1] transition-colors duration-500">
                        <button
                           onClick={() => toggleFaq(index)}
                           className="w-full flex justify-between items-center p-8 text-left group"
                        >
                           <span className="text-lg font-bold text-[#111827] uppercase tracking-tight">{faq.q}</span>
                           <div className={`w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center transition-transform duration-500 ${activeFaq === index ? 'rotate-45 bg-[#0D47A1] text-white' : 'bg-white text-[#111827]'}`}>
                              <span className="text-xl">+</span>
                           </div>
                        </button>
                        <AnimatePresence>
                           {activeFaq === index && (
                              <motion.div
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className="overflow-hidden"
                              >
                                 <div className="px-8 pb-8 pt-0">
                                    <div className="h-[1px] w-full bg-gray-50 mb-6"></div>
                                    <p className="text-base text-gray-500 font-medium italic leading-relaxed">{faq.a}</p>
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  ))}
               </div>
            </div>
         </section>

         {/* FINAL CLINICAL PREMIUM FOOTER */}
         <footer className="py-20 md:py-28 bg-[#111827] text-white overflow-hidden relative">
            {/* Subtle background glow */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#0D47A1]/5 rounded-full blur-[120px] -z-10 pointer-events-none"></div>
            
            <div className="max-w-7xl mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 mb-24">
                  
                  {/* Brand & Mission Column */}
                  <div className="lg:col-span-5 space-y-10">
                     <div className="space-y-8">
                        <img src="/logo.png" alt="CellStart Logo" className="h-10 w-auto brightness-0 invert" />
                        <p className="text-gray-400 text-lg leading-relaxed max-w-sm">
                           The definitive protocol for cellular restoration and metabolic vitality. Part of the <span className="text-white">CellStart</span> health collective.
                        </p>
                     </div>
                     
                     <div className="flex gap-4">
                        {/* Social Links Placeholders */}
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0D47A1] transition-all duration-300 cursor-pointer">
                           <span className="text-[10px] font-black">IG</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0D47A1] transition-all duration-300 cursor-pointer">
                           <span className="text-[10px] font-black">FB</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#0D47A1] transition-all duration-300 cursor-pointer">
                           <span className="text-[10px] font-black">TW</span>
                        </div>
                     </div>
                  </div>

                  {/* Navigation Columns */}
                  <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
                     <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]">The Protocol</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-400">
                           <li><a href="#hero" className="hover:text-white transition-colors duration-300">How It Works</a></li>
                           <li><a href="#formula" className="hover:text-white transition-colors duration-300">Clinical Formula</a></li>
                           <li><a href="#results" className="hover:text-white transition-colors duration-300">Success Stories</a></li>
                        </ul>
                     </div>
                     <div className="space-y-8">
                        <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]">Expertise</h4>
                        <ul className="space-y-4 text-sm font-medium text-gray-400">
                           <li><a href="#team" className="hover:text-white transition-colors duration-300">Scientific Leadership</a></li>
                           <li><a href="#faq" className="hover:text-white transition-colors duration-300">Common Questions</a></li>
                        </ul>
                     </div>
                  </div>
               </div>

               {/* Bottom Bar */}
               <div className="pt-12 border-t border-white/5 flex flex-col xl:flex-row justify-between items-center gap-12">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-widest max-w-3xl text-center xl:text-left leading-loose">
                     © 2025 CHRONONAD+™. ALL RIGHTS RESERVED. THESE STATEMENTS HAVE NOT BEEN EVALUATED BY THE FOOD AND DRUG ADMINISTRATION. THIS PRODUCT IS NOT INTENDED TO DIAGNOSE, TREAT, CURE, OR PREVENT ANY DISEASE.
                  </div>
                  
                  <div className="flex flex-wrap items-center justify-center gap-8 opacity-40 hover:opacity-100 transition-opacity duration-700">
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-5 rounded bg-gray-400"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest">Mastercard</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-5 rounded bg-gray-300"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest italic">Visa</span>
                     </div>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-5 rounded bg-gray-200"></div>
                        <span className="text-[9px] font-black uppercase tracking-widest">Amex</span>
                     </div>
                     <div className="h-4 w-[1px] bg-white/20 hidden md:block"></div>
                     <div className="flex items-center gap-2">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" /></svg>
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">256-Bit Encrypted</span>
                     </div>
                  </div>
               </div>
            </div>
         </footer>

      </div>
   )
}
