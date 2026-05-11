import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import skinTransformation from '../assets/skin-transformation.png'
import chronoNadIsolated from '../assets/chrono-nad-isolated.png'
import cortisolTransformation from '../assets/cortisol-transformation.png'
import womenAllAgesResult from '../assets/women-all-ages-result.png'
import supplementFacts from '../assets/supplement_facts.png'
import chrononadProduct from '../assets/chrononad/chrononad_product_render_1776860430492.png'
import Navbar from '../components/Navbar.jsx'


export default function FeelYoung() {
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
         q: "What is NAD+?",
         a: "Think of NAD+ (Nicotinamide Adenine Dinucleotide) as your body's 'cellular fuel.' It's an essential coenzyme found in every cell and it's involved in hundreds of important biological processes. Two of its primary jobs include helping to convert food into energy (metabolism) and powering your body's natural DNA repair and cellular defense functions."
      },
      {
         q: "What is Resveratrol?",
         a: "Resveratrol is a powerful, plant-based compound (a polyphenol) found in sources like grapes or plants like Japanese Knotweed. It's known for its strong antioxidant properties and its ability to activate specific 'longevity genes' in your body, particularly Sirtuins."
      },
      {
         q: "What are Sirtuins and why are they important to Longevity?",
         a: "Sirtuins are a family of enzymes that play a critical role in cellular processes such as aging, metabolism, and DNA repair. However, sirtuins can only function in the presence of NAD+ (nicotinamide adenine dinucleotide)."
      },
      {
         q: "What is NAD+ decline?",
         a: "NAD+ decline is a natural part of the aging process. As we get older, our bodies produce less and consume more of this vital molecule. Studies suggest our NAD+ levels can decline by over 50% by middle age. This decline means our cells have less 'fuel' for repair and energy, which is why we may start to feel the effects of aging, like fatigue and mental fog."
      },
      {
         q: "Why combine an NAD precursor with Resveratrol? What's the synergy?",
         a: "This is our key differentiator. Think of it this way:\n\nNAD+: The essential 'cellular fuel' for your cells.\nResveratrol: The 'accelerator pedal' that helps activate important cellular pathways.\n\nResveratrol helps activate the very same 'longevity genes' (Sirtuins) that use NAD+ as their fuel. By providing both, you are giving your cells the fuel and the boost to use that fuel for enhanced cellular defense and renewal."
      },
      {
         q: "When can I expect to feel a difference?",
         a: "Taking ChronoNAD+ is an investment in your long-term health, while the most meaningful changes aren't always immediately 'felt', results can very by individual. Many users notice steadier energy, better endurance, and clearer focus within 4-6 weeks of consistent use. Even if you don’t feel a dramatic shift right away, your cells are still benefiting from the ongoing NAD⁺ and Resveratrol support."
      },
      {
         q: "What are the benefits of subscribing to ChronoNAD+?",
         a: "Subscribing is the most cost-effective way to stay consistent with your NAD⁺ and Resveratrol routine. CellStart subscribers receive 20%+ off every monthly bottle or 30%+ off with an annual plan, plus free shipping on every subscription order You also get automatic deliveries on your schedule. You can pause, skip, or adjust your subscription at any time. It’s a simple, flexible way to support better aging while keeping more savings in your pocket—better aging, more saving."
      },
      {
         q: "Is this supplement safe?",
         a: "ChronoNAD+ is formulated with safety, quality, and transparency as top priorities. Every bottle is manufactured in a Eurofins-accredited cGMP-certified, and FDA-inspected facility here in the United States, following strict industry standards for purity and quality. Each batch undergoes multiple levels of quality control and laboratory testing to verify identity, potency, and safety—tests we make publicly available so you know exactly what you’re taking.\n\nThe core ingredients in ChronoNAD+ are supported by hundreds of peer-reviewed scientific studies exploring their roles in cellular energy, repair, and overall metabolic function. ChronoNAD+ is generally well-tolerated when taken as directed, but as with any supplement, we recommend consulting your healthcare provider if you have underlying health conditions, are pregnant or nursing, or are taking medications."
      },
      {
         q: "Where is it made?",
         a: "ChronoNAD+ is made in the USA with globally sourced components."
      }
   ]

   const productImg = isMobile ? "/mobilehero.png" : chronoNadIsolated

   return (
      <div className="font-sans antialiased text-[#111827] bg-white selection:bg-[#0D47A1] selection:text-white relative overflow-x-hidden">

         <Navbar />


         {/* HERO SECTION - BLACK & BLUE THEME */}
         <section id="hero" className="relative flex flex-col items-center justify-center bg-white overflow-hidden pt-24 pb-8 md:pt-32 md:pb-20 lg:pt-36 lg:pb-10 px-4 md:px-6">
            {/* Subtle Background Clinical Grid - Deep Blue */}
            <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0D47A1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

            <div className="max-w-7xl mx-auto relative z-10 w-full">
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="grid grid-cols-1 lg:grid-cols-2 gap-2 lg:gap-8 items-center"
               >
                  {/* Left Column: Text Content */}
                  <div className="flex flex-col items-start lg:items-start space-y-4 relative text-left lg:text-left order-2 lg:order-1">
                     <div className="space-y-3 relative z-10">
                        <motion.h1
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                           className="text-2xl lg:text-[32px] font-bold text-[#0D47A1] leading-snug tracking-tight font-heading text-center lg:text-left w-full max-w-2xl mx-auto lg:mx-0"
                        >
                           How 3 Million Women Over 30 Save <span className="underline decoration-2 underline-offset-8">Their Youthful Glow, Energy, and Metabolism</span> From Declining NAD levels
                        </motion.h1>

                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.4 }}
                           className="max-w-xl"
                        >
                           <p className="text-base md:text-xl text-[#111827] font-medium leading-relaxed">
                              New research shows declining NAD+ levels are one of the biggest hidden drivers of dull skin, low energy, and visible aging. <br />
                              And for many women, this drop starts as early as 30. <br />
                              Experience the clinical-grade difference today.
                           </p>
                        </motion.div>
                     </div>
 
                     <div className="space-y-1.5 md:space-y-2 relative z-10 w-full flex flex-col items-start lg:items-start">
                        <p className="text-base md:text-lg text-black font-bold">With ingredients designed to:</p>
                        <div className="space-y-1.5 md:space-y-2.5">
                        {[
                           { text: "Restore NAD+ by up to 100%*" },
                           { text: "Promote brighter, more even-looking skin" },
                           { text: "Boost energy so you feel less run down" },
                           { text: "Support Healthy Weight Management" },
                           { text: "Boost Emotional Wellbeing" }
                        ].map((benefit, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + (i * 0.05) }}
                              className="flex items-start gap-4 group text-left"
                           >
                              <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 mt-1">
                                 <svg className="w-3 h-3 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7" /></svg>
                              </div>
                              <span className="text-base md:text-lg text-[#111827] font-bold tracking-tight">{benefit.text}</span>
                           </motion.div>
                        ))}
                        </div>
                     </div>
 
                     <div className="pt-0 w-full flex flex-col items-start space-y-3">
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={scrollToProducts}
                           className="bg-[#0D47A1] text-white font-bold md:font-black text-[12px] md:text-lg px-10 md:px-16 py-4 md:py-5 rounded-full uppercase tracking-[0.1em] md:tracking-[0.1em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center group relative overflow-hidden w-full md:w-auto"
                        >
                           <span className="relative z-10">Try ChronoNAD+</span>
                           <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </motion.button>
                        <div className="flex items-center justify-center lg:justify-start gap-2 text-xs md:text-sm font-bold text-[#0D47A1] uppercase tracking-[0.05em] w-full lg:w-auto lg:pl-4">
                           <span className="text-lg">✅</span> 30 Day Money Back Guarantee
                        </div>
                     </div>
                  </div>

                  {/* Right Column: Transformation Graphic - No Card */}
                  <div className="relative flex flex-col items-center justify-center order-1 lg:order-2">
                     <img
                        src="/module_hero.png"
                        alt="Cellular Transformation Progress"
                        className="w-full h-auto max-h-[500px] lg:max-h-[600px] object-contain mix-blend-multiply scale-100 lg:scale-110 transition-transform duration-700"
                     />

                  </div>
               </motion.div>
            </div>
         </section>

         {/* FEATURED IN SECTION - ARCHITECTURAL PRESS MASTERPIECE */}
         <section id="featured" className="relative py-6 md:pt-2 md:pb-6 bg-white overflow-hidden">
            {/* Massive Spherical Background Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[#F9FAFB] rounded-full z-0 opacity-50"></div>
            
            <div className="w-full px-4 md:px-24 relative z-10">
               <div className="text-center mb-4 md:mb-8 space-y-6">

                  <h2 className="text-2xl lg:text-[32px] font-bold text-[#111827] leading-snug tracking-tight">
                     Research Backed <br />
                     <span className="text-[#0D47A1] font-semibold">Ingredients Featured In…</span>
                  </h2>
               </div>
               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4 lg:gap-2 pb-2 md:pb-0 px-1 md:px-0">
                  {[
                     {
                        logo: "/allure png logo.png",
                        quote: "“I feel like the NAD has helped me regain a little more mental clarity and my overall energy level has definitely improved.”"
                     },
                     {
                        logo: "/womens-health-magazine-logo-vector.png",
                        quote: "“I felt like I’d been given a boost of energy. My eyes felt brighter, and I had more of a spring in my step.”"
                     },
                     {
                        logo: "/Elle.jpeg",
                        quote: "“We’re learning about replacing compounds—like NAD+—that degrade as you age.”"
                     },
                     {
                        logo: "/Time.png",
                        quote: "“NAD+ is the closest we’ve gotten to a fountain of youth. It’s one of the most important molecules for life to exist.”"
                     },
                     {
                        logo: "/Wired.jpeg",
                        quote: "“Improvements in energy, mental clarity, migraines, and circadian disruption after using NAD-related therapies.”"
                     },
                     {
                        logo: "/Cnet.png",
                        quote: "“NAD+ can help with skin health by promoting DNA repair and fighting oxidative stress and giving you more energy.”"
                     }
                  ].map((item, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white px-3 py-6 md:p-8 flex flex-col items-center text-center space-y-4 md:space-y-6 w-full shadow-sm lg:shadow-none rounded-2xl md:rounded-[2rem] lg:rounded-none"
                     >
                        <img 
                           src={item.logo} 
                           alt="Featured Press Logo" 
                           className="h-14 md:h-16 w-auto object-contain" 
                        />
                        <p className="text-sm md:text-base text-[#111827] italic font-medium leading-relaxed">
                           {item.quote}
                        </p>
                     </motion.div>
                  ))}
               </div>
            </div>
         </section>

         {/* TESTIMONIALS SECTION - VITALITY VOICE MASTERPIECE */}
         <section id="testimonials" className="relative py-6 md:py-4 bg-white overflow-hidden">
            {/* Background Orbital Spheres */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-50/50 rounded-full blur-3xl opacity-40 -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#F9FAFB] rounded-full z-0 opacity-80 -translate-x-1/3 translate-y-1/3"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               {/* Header Area Area */}
               <div className="text-center mb-4 md:mb-8 space-y-2 md:space-y-4">

                  <h2 className="text-2xl lg:text-[32px] font-bold text-[#111827] leading-snug tracking-tight max-w-5xl mx-auto">
                     See Why Thousands Of Women Are Turning To CHRONONAD+ To:
                  </h2>
                  <p className="text-xl md:text-2xl text-[#0D47A1] font-bold leading-tight max-w-4xl mx-auto">
                     Beat “Creepy” Skin, Premature Aging, Dark Under-Eye Bags, and Sluggish Metabolism.
                  </p>
                  <p className="text-base md:text-lg text-[#111827] font-medium leading-relaxed max-w-3xl mx-auto">
                     NAD+ Ingredients have been proven and tested by thousands of studies and users to help restore declining NAD+ levels for women of all ages, so they can finally <span className="text-[#0D47A1] font-black">END the dull skin, constant tiredness, and visible signs of aging.</span>
                  </p>
               </div>

               {/* Testimonials Architectural Bento Grid */}
               <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-4 md:gap-6">
                  {[
                     {
                        name: "HappyFamily",
                        initial: "H",
                        title: "NAD+ Boost for Feeling Younger!",
                        body: "CellStart is a solid pick for anyone wanting to support healthy aging and cellular energy! After a month of one capsule daily with breakfast, I've noticed steadier energy, better focus, and recovery.",
                        className: "md:col-span-3 lg:col-span-6 bg-white"
                     },

                     {
                        name: "James",
                        initial: "J",
                        title: "Easy to swallow capsules.",
                        body: "The CellStart Nad+ Resveratrol capsules come a well-sealed bottle. I like the fact that they are made in the USA and are also Non-GMO. I feel they give me more energy.",
                        className: "md:col-span-3 lg:col-span-6 bg-white"
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
                        className: "md:col-span-6 lg:col-span-7 bg-white"
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
                        <div className={`relative h-full p-6 md:p-6 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 ${review.className.includes('bg-[#111827]') ? 'border-transparent' : ''}`}>
                           
                           {/* Surgical Cut Corner Accent */}
                           <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[4rem] z-0 transform translate-x-12 -translate-y-12 transition-all duration-700 group-hover:translate-x-0 group-hover:translate-y-0 ${review.className.includes('text-white') ? 'bg-white/5' : 'bg-[#0D47A1]/5'}`}></div>

                           <div className="relative z-10 flex flex-col h-full">
                              <div className="flex text-[#FFB400] gap-0.5 mb-4 md:mb-2">
                                 {[...Array(5)].map((_, j) => (
                                    <svg key={j} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                 ))}
                              </div>
                              
                              <h4 className={`text-lg md:text-xl font-bold mb-2 md:mb-1 tracking-tight leading-[1.2] ${review.className.includes('text-white') ? 'text-white' : 'text-[#111827]'}`}>
                                 {review.title}
                              </h4>
                              
                              <p className="text-base md:text-lg leading-relaxed mb-4 md:mb-3 flex-grow text-[#111827] font-medium">
                                 {review.body}
                              </p>

                              <div className="pt-4 md:pt-4 border-t border-gray-100/10 flex items-center gap-5">
                                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-base shadow-xl ${review.className.includes('text-white') ? 'bg-white text-[#111827]' : 'bg-[#0D47A1] text-white'}`}>
                                    {review.initial}
                                 </div>
                                 <div className="space-y-0.5">
                                    <p className={`text-base font-black ${review.className.includes('text-white') ? 'text-white' : 'text-[#111827]'}`}>{review.name}</p>
                                    <div className="flex items-center gap-1.5 text-[10px] font-black text-emerald-600 uppercase tracking-widest">
                                       <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                       <span>Verified Buyer</span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </motion.div>
                  ))}
               </div>

               {/* CTA Area */}
               <div className="mt-6 md:mt-12 text-center">
                  <div className="flex flex-col items-center space-y-3">
                     <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={scrollToProducts}
                        className="bg-[#0D47A1] text-white font-bold md:font-black text-[12px] md:text-lg px-10 md:px-16 py-4 md:py-5 rounded-full uppercase tracking-[0.1em] md:tracking-[0.1em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center mx-auto group"
                     >
                        Try ChronoNAD+
                        <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                     </motion.button>
                     <div className="flex items-center gap-2 text-xs md:text-sm font-black text-[#0D47A1] uppercase tracking-[0.05em]">
                        <span className="text-lg">✅</span> 30 Day Money Back Guarantee
                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* CORTISOL IMPACT & TRANSFORMATION SECTION - NEW */}
          <section id="story" className="py-6 md:py-4 bg-white">
             <div className="max-w-5xl mx-auto px-6 text-center">
                <div className="mb-12 space-y-8 md:space-y-12">
                   <h2 className="text-2xl lg:text-[32px] font-bold text-[#0D47A1] leading-snug tracking-tight">
                       As women age, their <br />
                       <span className="font-semibold">NAD+ levels drop by 30%</span> by Age 30.
                   </h2>

                   <div className="relative group max-w-4xl md:max-w-6xl mx-auto">
                       <div className="relative overflow-hidden rounded-3xl">
                         <img src="/image45.png" alt="NAD+ Decline Impact" className="w-full h-auto object-cover" />
                      </div>
                   </div>
                </div>

                <div className="space-y-4 text-lg md:text-xl font-medium text-[#111827] leading-relaxed">
                    <p className="text-lg md:text-xl leading-tight mb-4">
                       And that’s when <span className="underline decoration-gray-200 underline-offset-8">everything changes</span> in your body.
                    </p>

                    <div className="space-y-1">
                       <p className="text-[#111827] flex items-center justify-center gap-2">
                          <span className="text-red-600">❌</span> The dull, weathered complexion...
                       </p>
                       <p className="text-[#111827] flex items-center justify-center gap-2">
                          <span className="text-red-600">❌</span> The heavy, persistent brain fog...
                       </p>
                       <p className="text-[#111827] flex items-center justify-center gap-2">
                          <span className="text-red-600">❌</span> The slow, ‘biological rust’ recovery...
                       </p>
                    </div>

                   <p className="max-w-2xl mx-auto text-black">
                      Are all symptoms of cellular decay that forces the body to stay <span className="font-bold">DRAINED</span> and <span className="font-bold">WEATHERED</span>… And that’s only what you see in the mirror.
                   </p>

                   <p className="text-lg md:text-xl text-[#111827]">
                      On the inside? There’s a biological brownout wreaking havoc on your youthfulness and energy.
                   </p>

                   <div className="space-y-4 border-y-2 border-gray-50 py-6 text-black max-w-2xl mx-auto px-4">
                      <p className="text-black">You <span className="font-bold">feel mentally gray and lagging</span> during the day…</p>
                      <p className="text-black"><span className="font-bold">Drained yet restless</span> when your body needs to recover or sleep…</p>
                      <p className="text-black">And <span className="font-bold">unable to reclaim your glow</span>, no matter what serums you use.</p>
                   </div>

                   <p className="text-lg md:text-xl font-medium text-[#111827]">
                      If that ever happened to you, it’s not your fault. These are symptoms of a 'biological lag' caused by crashing NAD+ levels…
                   </p>

                   <div className="flex flex-col items-center py-4">
                      <p className="text-xl md:text-2xl font-medium text-[#111827] mb-4">And unfortunately, it doesn’t stop here.</p>
                      <div className="h-[2px] w-24 bg-gray-100"></div>
                   </div>

                    <p className="text-lg md:text-xl leading-tight tracking-tight mb-4 text-[#111827]">
                       By the time you reach your 40s, your NAD+ levels, which is the fuel for every single cell, <br />
                       plummet by a whopping 50%...
                    </p>

                   <p className="max-w-2xl mx-auto text-[#111827]">
                      This is the molecule that keeps your skin tight and luminous, your DNA shielded, your metabolism firing, and your cellular recovery on autopilot…
                   </p>

                   <p className="text-lg md:text-xl text-[#111827]">
                      Just like in your 20s and 30s.
                   </p>

                   <p className="font-medium text-[#111827] text-lg md:text-xl pt-2">
                      This means that, as you age…
                   </p>

                   <p className="max-w-2xl mx-auto text-[#111827]">
                      Not only do you accumulate visible 'biological rust' against your will… But your cells actually lose the ability to repair themselves.
                   </p>

                   <p className="text-[#111827] max-w-2xl mx-auto">
                      And as if that weren’t enough… Your focus goes out the window, and your youthfulness becomes a memory of the past.
                   </p>

                   <h3 className="text-lg md:text-xl font-medium text-[#111827] pt-4">Here’s why that happens:</h3>

                   <div className="space-y-4 max-w-2xl mx-auto text-[#111827]">
                    <div className="flex flex-col items-center py-6">
                       <p className="inline-block px-8 py-4 bg-[#E53935] text-white font-medium text-lg md:text-xl leading-tight rounded-sm text-center max-w-3xl">
                          Crashing NAD+ levels stall your cellular engines… <br />
                          Which dulls the skin and creates that 'perpetually tired' look…
                       </p>
                    </div>
                    <div className="py-6">
                       <p className="text-lg md:text-xl font-bold text-black text-center leading-relaxed">
                          Other NAD+ dependent 'youth' processes fail, and DNA damage accumulates…
                       </p>
                       <p className="text-[#111827] text-center mt-2">
                          So the body stubbornly feels older, heavier, and slower than you actually are.
                       </p>
                    </div>
                   </div>

                   <h3 className="text-lg md:text-xl font-medium text-[#111827] pt-4">So if you’ve ever witnessed…</h3>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 py-8">
                       <div className="text-8xl md:text-9xl animate-pulse">😩</div>
                       <div className="space-y-1.5 text-left max-w-xl">
                          <div className="flex items-start gap-3 group">
                             <span className="text-2xl mt-0.5 text-blue-500">➡️</span>
                             <p className="text-base md:text-xl text-[#111827] leading-relaxed">
                                <strong>New fine-lines</strong> appearing where a glow used to be…
                             </p>
                          </div>
                          <div className="flex items-start gap-3 group">
                             <span className="text-2xl mt-0.5 text-blue-500">➡️</span>
                             <p className="text-base md:text-xl text-[#111827] leading-relaxed">
                                <strong>A 'brain fog'</strong> that makes simple tasks feel like a climb…
                             </p>
                          </div>
                          <div className="flex items-start gap-3 group">
                             <span className="text-2xl mt-0.5 text-blue-500">➡️</span>
                             <p className="text-base md:text-xl text-[#111827] leading-relaxed">
                                <strong>Slow recovery</strong> that keeps you sore and tired for days…
                             </p>
                          </div>
                          <div className="flex items-start gap-3 group">
                             <span className="text-2xl mt-0.5 text-blue-500">➡️</span>
                             <p className="text-base md:text-xl text-[#111827] leading-relaxed">
                                Or <strong>dull wrinkled skin</strong> losing its firm, youthful definition…
                             </p>
                          </div>
                       </div>
                    </div>

                    <div className="flex flex-col items-center py-10 space-y-2">
                        <p className="text-xl md:text-3xl font-bold text-rose-500 flex items-center gap-3">
                           <span>➡️</span> You’re not alone… <span>⬅️</span>
                        </p>
                        <p className="text-xl md:text-3xl font-bold text-rose-500">
                           It happens to MILLIONS <span className="inline-block animate-bounce">🙋‍♀️</span> of women just like you.
                        </p>
                     </div>

                   <p className="text-[#111827] text-lg md:text-xl pt-2 max-w-2xl mx-auto">
                      If you’ve experienced some of these symptoms… <br />
                      then you probably noticed that…
                   </p>

                   <p className="text-lg md:text-xl font-bold leading-snug text-[#111827] underline decoration-2 decoration-gray-300 underline-offset-8">
                      Standard vitamins and 'skincare only' routines just won’t cut it anymore.
                   </p>

                   <p className="text-[#111827] max-w-2xl mx-auto">
                      Sure, they’ll help on the surface… <br />
                      But they won’t fix the cellular bankruptcy happening at the root… or the rapid downfall of your longevity molecules.
                   </p>

                   <div className="py-6 space-y-4">
                      <p className="text-lg md:text-xl font-heading font-bold leading-tight mb-2 text-black">
                         Fortunately – there’s a way to <br />
                         reverse that.
                      </p>
                      <p className="text-lg md:text-xl font-medium text-[#111827]">And it all starts by going to the root cause…</p>

                      <div className="space-y-6 text-lg md:text-xl text-[#111827] leading-tight">
                         <p>Because once you restore your NAD+ levels…</p>
                         <p>And activate the cellular repair your body is now missing…</p>
                      </div>

                      <div className="space-y-4 pt-4">
                          <p className="text-lg md:text-xl mb-2 text-[#111827]">You can get back that <br />sexy confidence…</p>
                         <p className="text-lg md:text-xl text-[#111827]">The beautiful complexion, the sharp mind, the revitalized body…</p>
                         <p className="text-lg md:text-xl pt-4 text-[#111827]">So you can LOVE your life once again…</p>
                         <p className="text-xl md:text-2xl text-[#111827]">No matter <span className="font-bold text-black">your age, genetics, or unique biological profile!</span></p>
                      </div>

                      <div className="pt-8 md:pt-12 flex flex-col items-center space-y-3">
                          <motion.button
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                             onClick={scrollToProducts}
                             className="bg-[#0D47A1] text-white font-bold md:font-black text-xs md:text-lg px-16 py-5 rounded-full uppercase tracking-[0.1em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center mx-auto group"
                          >
                             Try ChronoNAD+
                             <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                          </motion.button>
                          <div className="flex items-center gap-2 text-xs md:text-sm font-black text-[#0D47A1] uppercase tracking-[0.05em]">
                              <span className="text-lg">✅</span> 30 Day Money Back Guarantee
                           </div>
                       </div>
                    </div>
                 </div>
              </div>
           </section>
 
           {/* SOLUTION SECTION - BLACK & BLUE COMBINATION */}
           <section id="solution" className="py-6 md:py-2 bg-[#F8FAFC]">
              <div className="max-w-7xl mx-auto px-6">
                 {/* Top Label */}
                 <div className="text-center mb-6 flex items-center justify-center gap-8">
                    <span className="text-[#0D47A1] text-4xl md:text-5xl font-black">↓</span>
                    <span className="text-[#0D47A1] font-bold text-lg md:text-2xl tracking-tight">Finally, A Breakthrough For Women Of Every Age</span>
                    <span className="text-[#0D47A1] text-4xl md:text-5xl font-black">↓</span>
                 </div>
 
                 {/* Headline */}
                 <h2 className="text-2xl lg:text-[32px] text-black text-center leading-snug mb-6 md:mb-12 max-w-5xl mx-auto tracking-tighter">
                    <span className="font-bold block mb-2 md:mb-1">It’s Now Possible To Block Cellular Bankruptcy, and Restore Your ‘Youth’ Molecules...</span>
                    <span className="font-semibold block mb-2 md:mb-1 text-black">And Stay Naturally Sharp, Luminous, and Revitalized with</span>
                    <span className="text-[#0D47A1] font-black block underline decoration-blue-100 underline-offset-8">ChronoNAD+</span>
                 </h2>
 
                 {/* Two Column Grid */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Left Product Image */}
                    <div className="relative flex items-center justify-center">
                       <motion.img 
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1 }}
                          src="/Product Image.png" 
                          alt="ChronoNAD+ Bottle"
                          className="relative z-10 w-full max-w-4xl h-[450px] object-cover object-center rounded-3xl"
                       />
                    </div>
 
                    {/* Right Content */}
                    <div className="space-y-2 text-lg md:text-xl text-[#111827] leading-relaxed font-medium">
                       <p>We have spent years at the <strong>cutting-edge</strong> of longevity and molecular biology...</p>
                       
                       <p>And after searching far and wide for the most groundbreaking, up-to-date clinical research on the planet...</p>
                       
                       <p className="uppercase tracking-wide text-[#111827] font-black">We have finally done it:</p>
                       
                       <p>We’ve created a <strong>next-generation cellular renewal formula</strong> that packs high-purity, bioavailable longevity activators into a single formula</p>
                       
                       <p>To target the real, root cause of biological rust, skin aging, and metabolic stalling as quickly, effectively, and safely as possible.</p>
                    </div>
                 </div>
 
                 {/* CTA */}
                  <div className="mt-12 text-center space-y-4">
                    <motion.button
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       onClick={scrollToProducts}
                       className="bg-[#0D47A1] text-white font-bold md:font-black text-xs md:text-lg px-10 md:px-16 py-4 md:py-5 rounded-full uppercase tracking-[0.1em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center mx-auto group"
                    >
                       Try ChronoNAD+
                       <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </motion.button>
                    <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-black text-[#0D47A1] uppercase tracking-[0.05em]">
                       <span className="text-lg">✅</span> 30 Day Money Back Guarantee
                    </div>

                 </div>
              </div>
           </section>

         {/* BREAKTHROUGHS SECTION */}
         {/* id added for nav */}
         <section id="breakthroughs" className="py-4 md:py-4 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-8 md:mb-10">
                  <h2 className="text-2xl lg:text-[32px] font-bold text-black mb-4 md:mb-2 leading-snug tracking-tight">
                     The 6 Biggest Scientific Cellular Energy Breakthroughs <br />
                     Of The Past 20 Years…
                  </h2>
                  <div className="flex items-center justify-center gap-12">
                     <div className="h-[2px] w-24 md:w-48 bg-gray-200"></div>
                     <span className="text-[#0D47A1] font-black text-xl md:text-3xl tracking-tight">Locked Into One Daily Protocol</span>
                     <div className="h-[2px] w-24 md:w-48 bg-gray-200"></div>
                  </div>
               </div>

               {/* 6 Discoveries List - Inspired by Reference UI */}
               <div className="max-w-7xl mx-auto space-y-2 md:space-y-4 mb-10 md:mb-12">
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
                        className={`flex flex-col md:flex-row items-center gap-4 md:gap-16 p-6 md:p-12 rounded-[2.5rem] transition-all duration-500 hover:shadow-lg border border-blue-100 bg-[#F0F7FF]/50`}
                     >
                        {/* Number Section */}
                        <div className="flex flex-col items-center md:items-center shrink-0">
                           <span className="text-[10px] font-black uppercase tracking-[0.2em] mb-1 text-[#0D47A1]">Breakthrough</span>
                           <span className="text-5xl md:text-6xl lg:text-7xl font-heading font-black leading-none text-[#0D47A1]">{item.num}</span>
                        </div>


                        {/* Content Section */}
                        <div className="flex-grow text-center md:text-left">
                           <h3 className="text-xl md:text-2xl font-bold text-[#111827] uppercase tracking-widest mb-4 font-heading-alt italic hidden">{item.label}</h3>
                           <p className="text-xl md:text-2xl text-black leading-relaxed font-medium">
                              {item.text}
                           </p>
                        </div>
                     </motion.div>
                  ))}
               </div>

               {/* Undeniable Results Box - Redesigned for High Authority */}
               <div className="bg-[#0D47A1] text-white p-6 md:p-8 lg:p-10 rounded-[2rem] md:rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(0,0,0,0.2)] relative overflow-hidden mb-8 md:mb-12 group">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50"></div>

                  <div className="relative z-10 flex flex-col items-center text-center">


                     <div className="space-y-6">

                        <h4 className="text-3xl md:text-4xl font-black uppercase tracking-tighter leading-tight font-heading text-white">UNDENIABLE RESULTS</h4>
                        <p className="text-lg md:text-lg leading-relaxed text-white/90 font-medium max-w-4xl mx-auto">
                           In landmark research spanning the last two decades, scientists have confirmed that NAD+ is not just a participant, but the master regulator of cellular metabolism, DNA repair, and vitality in human cells. Declining NAD+ is now recognized as a primary driver of the aging process itself.
                        </p>
                     </div>
                  </div>
               </div>

               <div className="flex flex-col items-center gap-3">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToProducts}
                     className="bg-[#0D47A1] text-white font-bold md:font-black text-[12px] md:text-lg px-10 md:px-16 py-4 md:py-5 rounded-full uppercase tracking-[0.1em] md:tracking-[0.1em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center mx-auto group"
                  >
                     Try ChronoNAD+
                     <svg className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>
                  <div className="flex items-center justify-center gap-2 text-xs md:text-sm font-black text-[#0D47A1] uppercase tracking-[0.05em]">
                     <span className="text-lg">✅</span> 30 Day Money Back Guarantee
                  </div>
               </div>
            </div>
         </section>

         {/* 2 CAPSULES A DAY SECTION - SCREENSHOT STYLE */}
         <section id="science" className="relative py-6 md:py-4 bg-[#F0F7FF] overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
               
               <h2 className="text-2xl lg:text-[32px] font-bold text-[#111827] leading-snug tracking-tight mb-6">
                  All It Takes Is <span className="text-[#0D47A1] font-black">2 Capsules A Day</span> To Beat <br className="hidden md:block" />
                  New Fine Wrinkles, Feeling Drained, and Looking Dull…
               </h2>

               <p className="text-lg md:text-xl font-bold text-[#111827] mb-8 md:mb-16 tracking-tight">
                  While Revitalizing Your DNA Repair, Skin Glow, and Energy
               </p>

               <div className="space-y-4 text-left max-w-4xl mx-auto mb-12 md:mb-12 px-4">
                  <div className="flex items-start gap-8 group">
                     <div className="w-12 h-12 rounded-xl rounded-tr-3xl bg-[#0D47A1]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] transition-colors duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D47A1] group-hover:text-white transition-colors duration-300"><path d="M16.12 15.11C18.605 15.861 20 17.55 20 19a2 2 0 0 1-2 2c-1.45 0-3.139-1.395-3.89-3.88"/><path d="M12 21v-9"/><path d="M7.88 15.11C5.395 15.861 4 17.55 4 19a2 2 0 0 0 2 2c1.45 0 3.139-1.395 3.89-3.88"/><path d="M16.12 8.89C18.605 8.139 20 6.45 20 5a2 2 0 0 0-2-2c-1.45 0-3.139 1.395-3.89 3.88"/><path d="M7.88 8.89C5.395 8.139 4 6.45 4 5a2 2 0 0 1 2-2c1.45 0 3.139 1.395 3.89 3.88"/></svg>
                     </div>
                     <p className="text-lg md:text-xl text-[#111827] leading-relaxed">
                        <span className="font-bold">Contains 2 powerful nutrients- longevity-support compounds</span> <span className="text-base md:text-lg text-gray-600 font-medium">carefully selected by our leading longevity experts.</span>
                     </p>
                  </div>
                  <div className="flex items-start gap-8 group">
                     <div className="w-12 h-12 rounded-xl rounded-tr-3xl bg-[#0D47A1]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] transition-colors duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D47A1] group-hover:text-white transition-colors duration-300"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>
                     </div>
                     <p className="text-lg md:text-xl text-[#111827] leading-relaxed">
                        <span className="font-bold">Backed by decades of research and thousands of clinical studies</span> <span className="text-base md:text-lg text-gray-600 font-medium">supporting NAD+ restoration, cellular repair, and healthy aging.</span>
                     </p>
                  </div>
                  <div className="flex items-start gap-8 group">
                     <div className="w-12 h-12 rounded-xl rounded-tr-3xl bg-[#0D47A1]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] transition-colors duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D47A1] group-hover:text-white transition-colors duration-300"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>
                     </div>
                     <p className="text-lg md:text-xl text-[#111827] leading-relaxed">
                        <span className="font-bold">Precisely dosed to help replenish declining NAD+ levels</span> <span className="text-base md:text-lg text-gray-600 font-medium">and target the root cause of low energy and visible aging.</span>
                     </p>
                  </div>
                  <div className="flex items-start gap-8 group">
                     <div className="w-12 h-12 rounded-xl rounded-tr-3xl bg-[#0D47A1]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] transition-colors duration-300">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D47A1] group-hover:text-white transition-colors duration-300"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                     </div>
                     <p className="text-lg md:text-xl text-[#111827] leading-relaxed">
                        <span className="font-bold">Supports sustained energy, radiant skin, mental clarity, and overall cellular vitality</span> <span className="text-base md:text-lg text-gray-600 font-medium">from within.</span>
                     </p>
                  </div>
               </div>

                <div className="space-y-12 md:space-y-12 max-w-6xl mx-auto px-6">
                   {/* Ingredient 1 */}
                   <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-16 lg:gap-24 group">
                      <div className="w-full lg:w-1/2 flex justify-center lg:justify-end order-1 lg:order-1">
                         <div className="w-64 h-64 md:w-64 md:h-64 lg:w-[320px] lg:h-[320px] rounded-[3rem] rounded-tr-[10rem] rounded-bl-[10rem] overflow-hidden shadow-2xl border-4 border-white transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]">
                            <img src="/image2.png" className="w-full h-full object-cover" alt="CryoNAD+" />
                         </div>
                      </div>
                      <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 order-2 lg:order-2">
                         <h3 className="text-lg md:text-xl lg:text-2xl font-black text-[#111827] tracking-tighter leading-[1.1]">
                            CryoNAD+™ — <br />
                            <span className="text-[#0D47A1]">Nicotinamide Adenine Dinucleotide</span>
                         </h3>
                         <p className="text-lg md:text-xl lg:text-2xl text-[#111827] font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                            Known as "The Cellular Fuel" that powers your energy from the inside out, sharpens your focus, speeds up recovery, and gives your body the raw material it needs to repair and renew every single day.
                         </p>
                      </div>
                   </div>

                   {/* Ingredient 2 */}
                   <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24 group">
                      <div className="w-full lg:w-1/2 text-center lg:text-right space-y-6 order-2 lg:order-1">
                         <h3 className="text-lg md:text-xl lg:text-2xl font-black text-[#111827] tracking-tighter leading-[1.1]">
                            SIRT-R™ Resveratrol — <br />
                            <span className="text-[#0D47A1]">Japanese Knotweed Extract</span>
                         </h3>
                         <p className="text-lg md:text-xl lg:text-2xl text-[#111827] font-medium leading-relaxed max-w-2xl mx-auto lg:ml-auto lg:mr-0">
                            Activates your body's longevity enzymes, protects your cells from daily damage, and works hand in hand with NAD+ to slow down how your body ages from the inside out.
                         </p>
                      </div>
                      <div className="w-full lg:w-1/2 flex justify-center lg:justify-start order-1 lg:order-2">
                         <div className="w-64 h-64 md:w-64 md:h-64 lg:w-[320px] lg:h-[320px] rounded-[3rem] rounded-tl-[10rem] rounded-br-[10rem] overflow-hidden shadow-2xl border-4 border-white transform transition-all duration-700 group-hover:scale-105 group-hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)]">
                            <img src="/image1.jpg" className="w-full h-full object-cover" alt="SIRT-R Resveratrol" />
                         </div>
                      </div>
                   </div>
                </div>

                {/* Science CTA */}
                <div className="mt-8 md:mt-12 flex flex-col items-center gap-6">
                   <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={scrollToProducts}
                      className="bg-[#0D47A1] text-white font-black text-sm md:text-lg px-16 py-5 rounded-full uppercase tracking-[0.1em] shadow-lg hover:bg-[#111827] transition-all duration-500 flex items-center gap-3 group"
                   >
                      <span>Try ChronoNAD+</span>
                      <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                   </motion.button>
                   <div className="flex items-center gap-2 text-xs md:text-sm font-black text-[#0D47A1] uppercase tracking-[0.2em] mt-2">
                      <span className="text-lg">✅</span> 30 Day Money Back Guarantee
                   </div>
                </div>
             </div>
          </section>




         {/* WHAT HAPPENS WHEN YOU START TAKING CHRONONAD+ SECTION - VITALITY GENESIS PATH */}
         <section id="journey" className="relative py-6 md:py-4 bg-white overflow-hidden">
            {/* Background Geometric Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0">
               <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <path d="M0 0 L 100 100" stroke="#0D47A1" strokeWidth="0.1" fill="none" />
                  <circle cx="50" cy="50" r="40" stroke="#0D47A1" strokeWidth="0.05" fill="none" />
               </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               {/* Centered Header */}
               <div className="flex flex-col items-center text-center space-y-4 md:space-y-2 mb-8 md:mb-12">
                  <h2 className="text-2xl lg:text-[32px] font-bold text-black leading-snug tracking-tight">
                     What Happens When <br />
                     <span className="text-[#0D47A1] font-semibold">You Start Taking CHRONONAD+?</span>
                  </h2>
               </div>

               {/* Mobile Only Image - Positioned after header */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="block lg:hidden w-full mb-10"
               >
                  <img
                     src="/landing page images (1).png"
                     alt="The Vitality Renaissance"
                     className="w-full h-auto object-cover rounded-[2rem] shadow-lg"
                  />
               </motion.div>

               <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">

                  {/* Left Column: Genesis Journey Content */}
                  <div className="lg:col-span-7 space-y-16">


                     {/* The Genesis Path - Vertical Architectural Timeline */}
                     <div className="relative pl-16 md:pl-20 space-y-4">
                        {/* Clinical Gradient Beam */}
                        <div className="absolute left-[23px] md:left-[27px] top-6 bottom-6 w-0.5 bg-gradient-to-b from-[#0D47A1] via-blue-200 to-gray-50"></div>

                        {[
                           {
                              phase: "Phase 01",
                              title: "The Activation",
                              time: "1 Week",
                              text: "Your cells begin replenishing their NAD+ levels — the essential coenzyme responsible for energy production and repair. You may notice a subtle lift in mental clarity, a calmer, more focused mind, and the first signs of steady, clean energy without the usual dips. Sleep may feel deeper, more restorative."
                           },
                           {
                              phase: "Phase 02",
                              title: "The Alignment",
                              time: "3-5 Weeks",
                              text: "Energy starts to feel more consistent throughout the day — no more heavy crashes or dragging afternoons. Your skin may begin to look more refreshed and hydrated, with a softer, healthier glow. Brain fog lifts, focus sharpens, and your body starts to feel more “in sync.”"
                           },
                           {
                              phase: "Phase 03",
                              title: "The Luminosity",
                              time: "6-8 Weeks",
                              text: "Now it’s visible. Skin looks brighter, smoother, and more radiant — the kind of glow that doesn’t come from a bottle. Fine lines may appear softer, and your overall appearance more rested and youthful. Energy, mood, and mental clarity feel steady and reliable from morning to night."
                           },
                           {
                              phase: "Phase 04",
                              title: "The Renaissance",
                              time: "A few months from now…",
                              text: "Don’t be surprised when people start asking what you’ve changed — your skin looks fresher, your energy feels different, and there’s a noticeable vibrancy about you. You feel sharper, lighter, and more like yourself again…\nAnd the best part? You didn’t need extreme routines, endless products, or complicated protocols to get here."
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
                                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#0D47A1] border border-[#0D47A1] shadow-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 z-20 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0D47A1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="text-[10px] font-black text-[#0D47A1] relative z-10"></span>
                                 </div>
                              </div>

                              {/* Story Card */}
                              <div className="space-y-1">
                                 <div className="flex items-center gap-4">
                                    <span className="text-xl md:text-2xl font-black uppercase tracking-tight text-[#0D47A1]">{item.time}</span>
                     <div className="h-[1px] w-8 bg-blue-50"></div>
                                 </div>

                                 <p className="text-[#111827] leading-relaxed font-medium text-base md:text-lg max-w-2xl">
                                    {item.text}
                                 </p>
                              </div>
                           </motion.div>
                        ))}
                     </div>
                  </div>

                  {/* Right Column: Inspirational Cinematic Visual */}
                  <div className="hidden lg:flex lg:col-span-5 relative items-center justify-center">
                     <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2 }}
                        className="w-full"
                     >
                        {/* Main Image Container */}
                        <div className="relative w-full h-full">
                           <img
                              src="/landing page images (1).png"
                              alt="The Vitality Renaissance"
                              className="w-full h-auto max-h-[650px] object-cover rounded-3xl"
                           />
                        </div>
                     </motion.div>
                  </div>

               </div>

               {/* Section CTA */}
               <div className="mt-10 md:mt-12 flex flex-col items-center space-y-6">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={scrollToProducts}
                     className="bg-[#0D47A1] text-white font-bold md:font-black text-[12px] md:text-lg px-10 md:px-16 py-4 md:py-5 rounded-full uppercase tracking-[0.1em] md:tracking-[0.1em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center group relative overflow-hidden w-full md:w-auto"
                  >
                     <span className="relative z-10 tracking-widest uppercase">Try ChronoNAD+</span>
                     <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#0D47A1] uppercase tracking-[0.2em]">
                     <span className="text-lg">✅</span> 30 Day Money Back Guarantee
                  </div>
               </div>
            </div>
         </section>

         {/* WORKS FOR ALL AGES SECTION - CLEAN SIMPLIFIED VERSION */}
         <section id="transformation" className="py-12 md:py-20 bg-[#F0F7FF]">
            <div className="max-w-7xl mx-auto px-6">
               {/* Centered Header */}
               <div className="flex flex-col items-center text-center space-y-6 mb-8 md:mb-12">
                  <h2 className="text-2xl lg:text-[32px] font-bold text-[#111827] leading-snug tracking-tight max-w-4xl">
                     Works For Women Of All Ages & Body Types <br />
                     <span className="text-[#0D47A1] font-semibold">No Matter How Long You’ve Been Struggling With New Lines, Dull Skin , or “Not Yourself”</span>
                  </h2>
               </div>

               {/* Mobile Only Image - Positioned after header */}
               <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="block lg:hidden w-full mb-10"
               >
                  <img
                     src="/landing page images (2).png"
                     alt="Transformation Results"
                     className="w-full aspect-[4/5] object-cover object-bottom rounded-[2rem] shadow-lg"
                  />
               </motion.div>

               <div className="flex flex-col lg:flex-row items-center justify-center gap-4 lg:gap-16">
                  {/* Left Column: Benefits */}
                  <div className="w-full lg:w-[50%] space-y-4 md:space-y-6">
                     <div className="grid grid-cols-1 gap-y-2 md:gap-y-4">
                        {[
                           { title: "Reveal a more sculpted, refreshed look", desc: "As your skin appears firmer and less puffy. Bring back that naturally toned, vibrant appearance as your glow returns from within" },
                           { title: "Sleep Deeply and Wake Up Restored", desc: "Experience a sharp, focused mind upon waking as your cells undergo deep repair and DNA shielding overnight." },
                           { title: "Reignite Your Peak Physical Vitality", desc: "Bring back your original spark by clearing 'biological rust' and fueling the cellular engines that keep you energized and thriving." },
                           { title: "Optimize Your Metabolism Without Rigid Restrictions", desc: "Support an efficient, high-functioning body that processes fuel cleanly, allowing you to stay revitalized without punishing routines." },
                           { title: "Protect Your DNA While Enjoying Your Lifestyle", desc: "Say yes to high-performance living knowing your internal 'repair crew' is fully fueled to handle whatever the day brings." }
                        ].map((item, i) => (
                           <div key={i} className="flex gap-4 md:gap-6 items-start">
                              <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 border border-emerald-100">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                              </div>
                              <div className="space-y-1">
                                 <h4 className="text-xl md:text-2xl font-bold text-[#111827] tracking-tight leading-tight">{item.title}</h4>
                                 <p className="text-base md:text-lg text-gray-500 font-medium leading-relaxed">{item.desc}</p>
                              </div>
                           </div>
                        ))}
                     </div>
                  </div>

                  {/* Right Column: Image */}
                  <div className="hidden lg:flex lg:w-[40%] relative items-center justify-center">
                     <div className="relative w-full h-auto">
                        <img
                           src="/landing page images (2).png"
                           alt="Transformation Results"
                           className="w-full aspect-[4/5] object-cover object-bottom rounded-3xl"
                        />
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* TRUST ICONS SECTION - ORBITAL CLINICAL CERTIFICATION */}
         <section id="trust" className="relative py-6 md:py-4 bg-white overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="text-center mb-10 md:mb-10 space-y-6">
                  <h2 className="text-2xl lg:text-[32px] font-bold text-[#111827] leading-snug tracking-tight">
                     Clinical Purity. <br />
                     <span className="text-[#0D47A1] font-semibold">Zero Compromise.</span>
                  </h2>
               </div>

               <div className="relative">


                  <div className="grid grid-cols-2 md:grid-cols-5 gap-y-12 gap-x-4 md:gap-10 lg:gap-20 relative pb-12 md:pb-0 px-4 md:px-0">
                     {[
                        {
                           label: "Keto, Paleo & Vegan Friendly",
                           img: "/Sugar_Free.png"
                        },
                        {
                           label: "Non-GMO & Caffeine Free",
                           img: "/Non-GMO.png"
                        },
                        {
                           label: "cGMP Certified Facility",
                           img: "/cGMP.png"
                        },
                        {
                           label: "Clinically Tested Formula",
                           img: "/Clinically_Tested.png"
                        },
                        {
                           label: "Made In The USA",
                           img: "/Made_In_USA-removebg-preview_1.png"
                        }
                     ].map((item, i) => (
                        <motion.div
                           key={i}
                           initial={{ opacity: 0, y: 20 }}
                           whileInView={{ opacity: 1, y: 0 }}
                           viewport={{ once: true }}
                           transition={{ duration: 0.8, delay: i * 0.1 }}
                           className={`flex flex-col items-center text-center group w-full ${i === 4 ? 'col-span-2 md:col-span-1' : ''}`}
                        >
                           <div className="relative">
                              {/* Pulsing Aura */}
                                                            
                              <div className="w-32 h-32 md:w-32 lg:w-36 md:h-32 lg:h-36 flex items-center justify-center mb-6 relative z-10">
                                 <img
                                    src={item.img}
                                    alt={item.label}
                                    className="w-full h-full object-contain"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Icon'; }}
                                  />
                              </div>
                           </div>
 
                           <div className="space-y-4 relative z-10">
                                                             <p className="text-sm md:text-sm font-black text-[#111827] leading-relaxed uppercase tracking-[0.2em] max-w-[180px]">
                                 {item.label}
                              </p>
                              
                           </div>
                        </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </section>

         {/* CHECKOUT BUNDLE SECTION - MATCHING REFERENCE UI */}
         <section id="pricing-grid" className="py-8 md:py-10 bg-gray-50/50 scroll-mt-20 border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
               {/* Checkout Progress Stepper */}
               <div className="max-w-4xl mx-auto mb-20 px-4 md:px-10">
                  <div className="relative flex justify-between items-center">
                     {/* Base Progress Line */}
                     <div className="absolute top-[48px] md:top-[69px] left-0 w-full h-[2px] bg-gray-300 -z-0" />
                     {/* Active Progress Line Segment */}
                     <div className="absolute top-[48px] md:top-[69px] left-0 w-[20%] md:w-[25%] h-[2px] bg-black -z-0" />
 
                     {[
                        { step: 1, label: "Select Your Package", active: true },
                        { step: 2, label: "Billing Information", active: false },
                        { step: 3, label: "Thank You", active: false }
                     ].map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center relative z-10 w-1/3">
                           <span className={`text-[8px] md:text-[10px] font-black uppercase tracking-[0.1em] md:tracking-[0.2em] mb-2 md:mb-4 text-center transition-colors leading-tight min-h-[2.5em] flex items-end justify-center ${s.active ? 'text-black' : 'text-gray-400'}`}>
                              {s.label}
                           </span>
                           <div className={`w-10 h-10 md:w-14 md:h-14 rounded-full border-[3px] md:border-[4px] flex items-center justify-center text-lg md:text-2xl font-black bg-white transition-all ${s.active ? 'border-black text-black' : 'border-gray-300 text-gray-400'}`}>
                              {s.step}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="text-center mb-8">
                  <h2 className="text-2xl lg:text-[32px] font-bold text-black leading-[1.1] tracking-tight uppercase">
                     Choose Your Package Below
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto items-stretch">
                  {[
                     {
                        title: "STARTER ORDER",
                        headerBg: "bg-gray-500",
                        borderColor: "ring-2 ring-gray-400 border-gray-400",
                        headerText: "text-white",
                        price: "$19.99",
                        total: "$19.99",
                        image: "/Product1.png",
                        isPopular: false,
                        savings: null,
                        installments: "$5.00",
                        countLabel: "Per Bottle",
                        checkoutUrl: "https://cellstart.com/checkouts/cn/hWNBaorSoCRatPj9jS4QLFzA/en-us?_r=AQABTv0jFO67m-G2jkKLZEdcvBT5LPTt82b-gHfVaGpA8Y8"
                     },
                     {
                        title: "BIGGEST SAVINGS",
                        headerBg: "bg-[#0D47A1]",
                        headerText: "text-white",
                        borderColor: "ring-2 ring-[#0D47A1]",
                        price: "$14.99",
                        total: "$29.99",
                        originalTotal: "$39.98",
                        image: "/Product1.png",
                        count: 2,
                        isPopular: true,
                        savings: "25% OFF",
                        installments: "$7.50",
                        countLabel: "Per Bottle",
                        checkoutUrl: "https://cellstart.com/cart/48746063003905:1?selling_plan=3903586561&discount=Free_Shipping"
                     }
                  ].map((pkg, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative flex flex-col bg-[#F0F7FF] rounded-3xl shadow-2xl border border-blue-100/50 ${pkg.borderColor || ''}`}
                     >
                        {/* Header */}
                        <div className={`${pkg.headerBg} py-4 text-center relative rounded-t-3xl`}>
                           <span className={`text-lg font-black tracking-[0.2em] uppercase ${pkg.headerText}`}>{pkg.title}</span>
                        </div>



                        <div className="flex-grow flex flex-col items-center pt-2 md:pt-4 lg:pt-6 px-4 md:px-8 pb-4 md:pb-6 text-center">
                           <div className="h-[300px] md:h-[400px] lg:h-[440px] w-full mb-0 relative flex items-center justify-center overflow-visible">
                              {pkg.savings && (
                                 <motion.div 
                                    initial={{ scale: 0, rotate: -20 }}
                                    animate={{ scale: 1, rotate: -12 }}
                                    className="absolute top-0 right-0 md:-right-10 z-20 bg-[#0D47A1] text-white text-lg md:text-2xl font-black w-24 h-24 md:w-32 md:h-32 flex items-center justify-center rounded-full shadow-2xl uppercase tracking-tighter leading-tight text-center border-4 border-white"
                                 >
                                    {pkg.savings}
                                 </motion.div>
                              )}
                              {pkg.count === 2 ? (
                                 <div className="relative w-full h-full flex items-center justify-center translate-y-4 md:translate-y-6">
                                    {/* Back Bottle */}
                                    <img
                                       src={pkg.image}
                                       alt={pkg.title}
                                       className="w-full h-full object-contain scale-110 md:scale-120 lg:scale-130 absolute -translate-x-12 md:-translate-x-16 z-0 brightness-[0.98] blur-[0.5px]"
                                    />
                                    {/* Front Bottle */}
                                    <img
                                       src={pkg.image}
                                       alt={pkg.title}
                                       className="w-full h-full object-contain scale-110 md:scale-120 lg:scale-130 absolute translate-x-12 md:translate-x-16 z-10 drop-shadow-[20px_0_30px_rgba(0,0,0,0.15)]"
                                    />
                                 </div>
                              ) : (
                                 <img
                                    src={pkg.image}
                                    alt={pkg.title}
                                    className="w-full h-full object-contain mix-blend-multiply scale-110 md:scale-120 lg:scale-130 transition-transform duration-500 translate-y-2 md:translate-y-4"
                                 />
                              )}
                           </div>

                           {/* Price Highlight */}
                           <div className="mb-2 space-y-0">
                              <div className="text-4xl font-black text-[#0D47A1] tracking-tighter">{pkg.price}</div>
                              <div className="text-xs md:text-sm font-black text-[#0D47A1] uppercase tracking-[0.3em] mb-2">{pkg.countLabel || "Per Jar"}</div>
                           </div>

                           {/* Total & Installments */}
                           <div className="mb-4 w-full">
                              <div className="text-xl font-black text-black mb-1">
                                 Total {pkg.originalTotal && <span className="line-through text-gray-400 font-bold mr-2">{pkg.originalTotal}</span>}
                                 {pkg.total}
                              </div>

                           </div>

                           {/* BUY NOW Button */}
                           <button 
                               onClick={() => window.open(pkg.checkoutUrl, '_blank')}
                               className="w-full py-6 rounded-full bg-[#0D47A1] text-white font-black text-sm tracking-[0.1em] shadow-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 mb-6 group"
                            >
                               <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                               <span>BUY NOW</span>
                            </button>
                        </div>
                     </motion.div>
                  ))}
               </div>
 
               {/* Payment Security Assurance Card */}
               <div className="max-w-5xl mx-auto mt-6 md:mt-12 bg-[#0D47A1] rounded-3xl md:rounded-[2rem] p-6 md:p-10 shadow-2xl md:shadow-[0_30px_60px_rgba(13,71,161,0.2)] border border-transparent flex flex-col lg:flex-row items-center gap-6 lg:gap-10">
                  <div className="flex flex-col items-center lg:items-start gap-4 lg:gap-6 lg:w-1/3">
                     <p className="text-[12px] md:text-[11px] font-black text-white/70 uppercase tracking-[0.2em]">Our trusted payment processors:</p>
                     <div className="flex items-center gap-3 md:gap-4">
                        {/* PayPal Logo */}
                        <div className="h-7 md:h-10 px-3 md:px-4 bg-white rounded flex items-center">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-3 md:h-5" />
                        </div>
                        {/* Visa Logo */}
                        <div className="h-7 md:h-10 px-3 md:px-4 bg-white rounded flex items-center">
                           <img src="/Visa.jpeg" alt="Visa" className="h-2.5 md:h-4" />
                        </div>
                        {/* Mastercard Logo */}
                        <div className="h-7 md:h-10 px-3 md:px-4 bg-white rounded flex items-center">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-4 md:h-6" />
                        </div>
                     </div>
                  </div>
 
                  <div className="hidden lg:block w-[1px] h-20 bg-white/10"></div>
 
                  <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8 lg:w-2/3">
                     <div className="flex-shrink-0">
                        <div className="w-24 h-24 md:w-28 md:h-28 flex items-center justify-center p-4 bg-white rounded-3xl md:rounded-2xl shadow-xl">
                           <img src="/SSL.jpeg" alt="SSL Secure" className="w-full h-full object-contain" />
                        </div>
                     </div>
                     <div className="text-center md:text-left space-y-1 md:space-y-2">
                        <p className="text-sm md:text-base text-white/95 leading-relaxed">
                           We use a <span className="font-bold text-white">256-bit secure shopping cart</span> where 100% of your data is encrypted, safe and secure. This is the same data security standard used by most banks, governments and military organizations.
                        </p>
                     </div>
                  </div>
               </div>
            </div>
         </section>

         {/* PURCHASE PROTECTION & GUARANTEE SECTION - ARCHITECTURAL ASSURANCE SUITE */}
         <section id="guarantee" className="relative py-12 md:py-4 bg-white overflow-hidden">
            {/* Background Orbital Accents */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none opacity-[0.02] z-0">
               <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <circle cx="90" cy="10" r="40" stroke="#0D47A1" strokeWidth="0.1" fill="none" />
                  <path d="M0 100 L 100 0" stroke="#0D47A1" strokeWidth="0.05" fill="none" />
               </svg>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="text-center mb-12 max-w-5xl mx-auto space-y-1">
                  <h2 className="text-2xl lg:text-[32px] font-bold text-[#111827] leading-[1.1] tracking-tight">
                     Your Purchase Is Protected By Our
                  </h2>
                  <p className="text-lg md:text-xl lg:text-2xl font-black text-[#0D47A1] uppercase tracking-tight">
                     30 Day 100% Money Back Guarantee
                  </p>
                  <p className="text-base md:text-lg text-[#111827] font-medium max-w-3xl mx-auto leading-relaxed">
                     At CellStart, we believe in making sure our customers love our products, or you shouldn’t have to pay for it. We’ll refund 100% of your investment on your first bottle. We’re so confident in the science of NAD+ that we’ll bear all the risk.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {[
                     {
                        subtitle: "Free Shipping On All Monthly or 2 or more bottle orders.",
                        desc: "No one likes paying for shipping. That’s why when you purchase either our monthly delivery or two bottles or more, we take care of the shipping for you. You save more when you buy more!",
                        icon: (
                           <div className="w-20 h-20 bg-[#0D47A1]/5 rounded-full flex items-center justify-center mb-6 mx-auto">
                              <img src="/free-shipping.png" alt="Free Shipping" className="w-12 h-12 object-contain" />
                           </div>
                        )
                     },
                     {
                        subtitle: "30 Day Money Back Guarantee",
                        desc: "True cellular restoration is a journey, not an overnight fix. While some notice a \"brain fog lift\" early on, deep DNA repair typically happens on a 90 to 120-day cycle. If you don’t feel confident that you’re building a stronger cellular foundation, you can claim a full refund on your first bottle.",
                        icon: (
                           <div className="w-20 h-20 bg-[#0D47A1]/5 rounded-full flex items-center justify-center mb-6 mx-auto">
                              <img src="/check.png" alt="30 Day Guarantee" className="w-12 h-12 object-contain" />
                           </div>
                        )
                     },
                     {
                        subtitle: "Instant Refunds",
                        desc: "We want you to feel the transformative effects of youthful NAD+ levels. If you aren’t happy with how ChronoNAD works for you, we’ll give you a hassle-free, no-questions-asked refund on your first bottle. We’re here to support your longevity, not complicate it.",
                        icon: (
                           <div className="w-20 h-20 bg-[#0D47A1]/5 rounded-full flex items-center justify-center mb-6 mx-auto">
                              <img src="/cashback.png" alt="Instant Refunds" className="w-12 h-12 object-contain" />
                           </div>
                        )
                     }
                  ].map((item, i) => (
                     <div
                        key={i}
                        className="bg-[#F0F7FF] p-10 rounded-[2.5rem] flex flex-col items-center text-center shadow-sm border border-[#0D47A1]/10"
                     >
                        {item.icon}
                        <h4 className="text-xl md:text-2xl font-black text-[#111827] mb-4 leading-tight uppercase tracking-tight">
                           {item.subtitle}
                        </h4>
                        <p className="text-base md:text-lg text-[#111827] font-medium leading-relaxed">
                           {item.desc}
                        </p>
                     </div>
                  ))}
               </div>

               <div className="flex flex-col items-center gap-4">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToProducts}
                     className="bg-[#0D47A1] text-white font-bold md:font-black text-[12px] md:text-lg px-10 md:px-16 py-4 md:py-5 rounded-full uppercase tracking-[0.1em] md:tracking-[0.1em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center mx-auto group"
                  >
                     <span>Try ChronoNAD+</span>
                     <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-[#0D47A1] uppercase tracking-[0.2em] mt-4">
                     <span className="text-lg">✅</span> 30 Day Money Back Guarantee
                  </div>
               </div>
            </div>
         </section>


         {/* COMPREHENSIVE REVIEWS SECTION */}
         {/* THE PROOF IS IN THE RESULTS - JUDGE.ME STYLE REDESIGN */}
         <section id="results" className="py-8 md:py-4 bg-gray-50 border-y border-gray-100 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-8 md:mb-12 space-y-6 max-w-6xl mx-auto">

                  <h2 className="text-2xl lg:text-[32px] font-bold text-[#111827] leading-snug tracking-tight">
                     Real People, Real Results: <br />
                     <span className="text-[#0D47A1]">Join Thousands of Women All Over The World that Trust ChronoNAD+</span>
                  </h2>
                  <div className="pt-2">
                     <p className="text-lg md:text-xl text-[#111827] font-semibold max-w-4xl mx-auto leading-relaxed">
                        <span className="text-[#0D47A1]">Note:</span> All reviews below are from actual paying customers. <br />
                        <span className="text-gray-500 font-medium text-base md:text-lg">They have been authenticated and verified</span>
                     </p>
                  </div>
               </div>



               {/* Review Cards List - Single Column Horizontal Style */}
               <div className="grid grid-cols-1 gap-4 mb-8 md:mb-12 max-w-7xl mx-auto">
                  {(() => {
                     const allReviews = [

                        {
                           name: "HappyFamily",
                           title: "NAD+ Boost for Feeling Younger!",
                           body: "CellStart is a solid pick for anyone wanting to support healthy aging and cellular energy! After a month of one capsule daily with breakfast, I've noticed steadier energy, better focus, and recovery after workouts.",
                           date: "1 MONTH AGO",
                           bg: "bg-white",
                           initial: "HF"
                        },
                        {
                           name: "Stephanie Jackson",
                           title: "Worth the Buy",
                           body: "I’ve noticed I don’t feel as sluggish during the day, and my recovery after workouts seems quicker. Definitely worth trying if you want extra support for energy, focus, and healthy aging.",
                           date: "3 MONTHS AGO",
                           bg: "bg-white",
                           initial: "S"
                        },
                        {
                           name: "James",
                           title: "Easy to swallow capsules.",
                           body: "The CellStart Nad+ Resveratrol capsules come a well-sealed bottle. I like the fact that they are made in the USA and are also Non-GMO. I feel they give me more energy and a better start to my mornings.",
                           date: "1 MONTH AGO",
                           bg: "bg-white",
                           initial: "J"
                        },
                        {
                           name: "Danielle",
                           title: "A Much Needed Energy Boost for Moms!",
                           body: "As a 32-year-old mom juggling kids.. within the first week, I noticed a real difference. I wasn’t crashing halfway through the day, and I felt more clear-headed and focused.",
                           date: "2 MONTHS AGO",
                           bg: "bg-white",
                           initial: "D"
                        },
                        {
                           name: "Chris",
                           title: "Made in the USA",
                           body: "Easy to swallow with water, and it comes with a big supply. I can't tell if it does anything, like most supplements. So I'm just hoping my future self will appreciate this.",
                           date: "04/18/2026",
                           bg: "bg-white",
                           initial: "C"
                        },
                        {
                           name: "J. Winnie",
                           title: "Good option if you are looking for this type of supplement. Very good value.",
                           body: "Like many people getting close to 60, I started looking for answers to the issues I'm having with my body and well-being. I find it very difficult to write a clear and definitive review for supplements because each person responds differently and while some may see benefits in days, others may take weeks or months to see them, if at all. So, what I would say about these are that they are tasteless, easy to swallow, and the package is well marked with ingredients, directions, disclosures, etc. In looking for this type of supplement, the ingredients listed were what I wanted and in the strength and quality I wanted them in. I'm satisfied with my response to the supplement. It's not going to be a fountain of youth where you go to bed tired and old and then wake up young, energetic and vibrant, but I do notice small improvements. My joints aren't as stiff, my energy levels are a bit better, the circles under my eyes seem not as dark... baby steps! I think this supplement has been effective for me in a realistic way and without any unwanted side-effects. I think this is a very good value.",
                           date: "04/14/2026",
                           bg: "bg-white",
                           initial: "JW"
                        },
                        {
                           name: "Two Cents",
                           title: "Reasonable price, straight forward ingredients",
                           body: "This is a fairly straight forward NAD+ supplement that provides actual nicotinamide adenine dinucleotide, as opposed to a precursor. I say it's straight forward because it combines the NAD+ with resveratrol, and nothing else. Since it is actual NAD, which isn't easily absorbed into the body, it would have been nice if they formulated it with liposomes to help get it into your system more efficiently. The capsules are pretty standard and easy to take. One serving (500mg NAD+, and 100mg resveratrol) is two capsules, so this bottle of 90 capsules will last 45 days. Taking NAD+ supplements has seemed to have a positive effect for me for overall energy and wellbeing. This \"Cellstart\" supplement seems like a good quality, and has been just as effective as others I've tried. This \"Chrono NAD+\" supplement is the only product on the website for the brand \"CellStart\", so it appears to be the only thing they make. It is made in the U.S., which is nice, and their website states that it's made in a \"Eurofins-accredited cGMP-certified, and FDA-inspected facility\". The $19.99 price is reasonable for a 45 day supply, so I would recommend giving it a try.",
                           date: "04/13/2026",
                           bg: "bg-white",
                           initial: "TC"
                        },
                        {
                           name: "Mustang827",
                           title: "It takes a while to feel the difference",
                           body: "I feel great, but it takes awhile. My wife after the first week asked if I felt any different? I answered, \"nope.\" She asked again after the second week. I said, \"maybe.\" I wasn't sure if there was real improvement, or just wishful thinking. Yesterday I came home after playing golf, and I experienced an epiphany; I felt great! Same thing today. It's a feeling of overall wellness. Folks, buy this and be patient. Also take advantage of any multi-bottle discounts.",
                           date: "04/12/2026",
                           bg: "bg-white",
                           initial: "M"
                        },
                        {
                           name: "Mike B.",
                           title: "Simple Formula, Easy to Take, and a Solid Value for Daily NAD Support",
                           body: "I've been trying this NAD+ supplement and the first thing that stood out is how clean and straightforward the formula is. Just NAD+ and resveratrol — no fillers, no weird aftertaste, and the capsules are small enough to swallow without thinking about it. It’s gentle on the stomach, and I didn’t notice any side effects, which is a big deal with supplements like this. The bottle gives you a 1.5-month supply, and the fact that it’s made in the USA adds a little more confidence in the quality. This feels like a good option if you're looking for a simple, no-nonsense way to support energy and cellular health without overpaying. At this price point, it's a strong value for a daily routine, especially if you prefer supplements that keep the ingredient list minimal. Bottom line: easy to take, clean formula, and a practical addition if you're trying to support long-term wellness.",
                           date: "04/11/2026",
                           bg: "bg-white",
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
                                    className="bg-white px-8 py-6 md:px-10 md:py-5 rounded-[2.5rem] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] transition-all duration-500 flex flex-col group"
                                 >
                                    <div className="flex justify-between items-start mb-4 md:mb-3">
                                       <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-full bg-[#0D47A1] text-white flex items-center justify-center font-black text-xs shadow-inner">{review.initial}</div>
                                          <div className="flex flex-col">
                                             <span className="font-bold text-base text-[#111827] tracking-tight">{review.name}</span>
                                             <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600 uppercase tracking-widest mt-0.5">
                                                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7" /></svg>
                                                <span>Verified Buyer</span>
                                             </div>
                                          </div>
                                       </div>
                                    </div>

                                    <div className="flex text-[#FFC107] text-xl mb-2 md:mb-1 gap-1">
                                       {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                                    </div>

                                    <h4 className="text-xl font-black text-[#0D47A1] mb-2 md:mb-1 font-heading-alt italic tracking-tight leading-tight">{review.title}</h4>
                                    <div className="relative group/text">
                                       <p className="text-base md:text-lg text-[#111827] leading-relaxed font-medium mb-4 md:mb-2">
                                          {review.body}
                                       </p>
                                    </div>
                                 </motion.div>
                              )
                           })}

                           {/* Pagination Controls */}
                           <div className="flex items-center justify-center gap-4 mt-8 md:mt-10">
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
               <div className="flex flex-col items-center gap-6 mt-8 md:mt-12">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToProducts}
                     className="bg-[#0D47A1] text-white font-black text-sm md:text-lg px-16 py-5 rounded-full uppercase tracking-[0.1em] shadow-lg hover:bg-[#111827] transition-all duration-300 flex items-center gap-3 group"
                  >
                     <span>Try ChronoNAD+</span>
                     <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-black text-[#0D47A1] uppercase tracking-[0.2em] mt-4">
                     <span className="text-lg">✅</span> 30 Day Money Back Guarantee
                  </div>
               </div>
            </div>
         </section>

         {/* SUPPLEMENT FACTS TRANSPARENCY SECTION - MINIMALIST MODERN */}
         <section id="formula" className="py-6 md:py-4 bg-white">
            <div className="max-w-7xl mx-auto px-6">
               {/* Centered Header Inspired by Reference */}
               <div className="text-center mb-4 md:mb-10 space-y-4 md:space-y-2">
                  <span className="text-xl md:text-2xl font-black text-[#0D47A1] tracking-tight">What’s Inside ChronoNAD+?</span>
                  <h2 className="text-2xl lg:text-[32px] font-bold text-[#111827] tracking-tight leading-[1.1]">
                     Nothing But Natural, Science-Backed Ingredients
                  </h2>
                  <div className="pt-2 md:pt-0">
                     <p className="text-lg md:text-xl text-[#111827] font-medium max-w-4xl mx-auto leading-relaxed">
                        Each bottle contains 45 servings (90 capsules). <br className="hidden md:block" />
                        Simply take 2 capsules daily and enjoy the cellular benefits.
                     </p>
                  </div>
               </div>

                {/* Centered Image Only */}
                <div className="flex justify-center mt-0 mb-2 md:mt-12 md:mb-20">
                   <div className="w-full max-w-4xl">
                      <img
                         src="/126281.png"
                         alt="ChronoNAD+ Ingredients and Facts"
                         className="w-full h-auto shadow-sm rounded-3xl"
                      />
                   </div>
               </div>
            </div>
         </section>


         {/* MISSION & EXPERT TEAM SECTION - REFINED CLINICAL PREMIUM */}
         <section id="team" className="py-0 overflow-hidden bg-white">
            {/* Mission Header Bar */}
            <div className="bg-white pt-0 pb-2 md:pt-10 md:pb-4 border-y border-gray-50">
               <div className="max-w-7xl mx-auto px-6 text-center space-y-4 md:space-y-2">

                  <p className="text-xl md:text-2xl lg:text-[32px] font-bold text-[#111827] leading-tight max-w-5xl mx-auto tracking-tight">
                     We’ve Set Out To Help <span className="text-[#0D47A1]">50,000,000 Women</span> <br className="hidden md:block" />
                     Naturally, Safely <span className="underline decoration-[#0D47A1] decoration-2 underline-offset-4">Fight Father Time</span> In 2026… <br className="hidden md:block" />
                     And Step Back Into Their <span className="italic text-[#0D47A1] font-semibold">Prime</span>
                  </p>
               </div>
            </div>

            {/* Scientific Leadership - Dr. Anthony Njapa */}
            <div className="pt-4 pb-8 md:pt-4 md:pb-20 bg-white overflow-hidden">
               <div className="max-w-7xl mx-auto px-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                     {/* Left Column: Image & Badge */}
                     <div className="relative">
                        {/* Decorative background border */}
                        <div className="absolute -top-6 -left-6 w-full h-full border-t border-l border-[#0D47A1]/20 rounded-tl-[4rem] -z-10"></div>

                     <div className="relative z-10 rounded-[3rem] overflow-hidden bg-gray-100 group">
                        {/* Clinical Leadership Tag - Overlayed on Image */}
                        <div className="absolute top-6 left-6 z-20">
                           <span className="px-6 py-2 bg-white/90 backdrop-blur-md text-[#0D47A1] text-[10px] md:text-xs font-black uppercase tracking-[0.3em] rounded-full border border-white/20 shadow-lg">
                              Clinical Leadership
                           </span>
                        </div>
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
                                  <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-400/80 font-accent">Clinical Background</p>
                               </div>
                               <p className="text-2xl md:text-3xl font-black tracking-tight text-white">22+ Years <span className="block text-blue-400 font-medium italic text-xl">in Medicine</span></p>
                            </div>
                         </motion.div>
                     </div>

                     {/* Right Column: Text Content */}
                     <div className="mt-12 lg:mt-0 lg:pl-10 text-center lg:text-left flex flex-col items-center lg:items-start">



                        <h3 className="text-lg md:text-xl lg:text-2xl font-black text-[#002855] mb-8 font-heading tracking-tight">
                           Dr. Anthony Njapa
                        </h3>

                        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed mb-12">
                           With more than 22 years of clinical medical experience, Dr. Anthony Njapa leads the ChronoNAD+ Clinical Advisory Board with an unwavering commitment to patient care and wellness. Dr. Njapa's clinical expertise and leadership ensures that ChronoNAD+ products are guided by medical insight and grounded in proven science.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center lg:items-start gap-12 sm:gap-20">
                           <div className="flex flex-col items-center lg:items-start">
                              <p className="text-4xl font-black text-[#002855] tracking-tighter mb-2">22+</p>
                              <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] font-accent">Years Experience</p>
                           </div>
                           <div className="flex flex-col items-center lg:items-start">
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


         {/* FAQ SECTION - Redesigned for Premium Minimalist Look */}
         <section id="faq" className="py-12 md:py-20 bg-[#0D47A1]">
            <div className="max-w-4xl mx-auto px-6">
               <div className="text-center mb-12 md:mb-16 space-y-4">
                  <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
                     Frequently Asked Questions
                  </h2>
               </div>

               <div className="border-t border-white/10">
                  {[
                     { q: "What is NAD+?", a: "Think of NAD+ (Nicotinamide Adenine Dinucleotide) as your body's \"cellular fuel.\" It's an essential coenzyme found in every cell and it's involved in hundreds of important biological processes. Two of its primary jobs include helping to convert food into energy (metabolism) and powering your body's natural DNA repair and cellular defense functions." },
                     { q: "What is Resveratrol?", a: "Resveratrol is a powerful, plant-based compound (a polyphenol) found in sources like grapes or plants like Japanese Knotweed. It's known for its strong antioxidant properties and its ability to activate specific \"longevity genes\" in your body, particularly Sirtuins." },
                     { q: "What are Sirtuins and why are they important to Longevity?", a: "Sirtuins are a family of enzymes that play a critical role in cellular processes such as aging, metabolism, and DNA repair. However, sirtuins can only function in the presence of NAD+ (nicotinamide adenine dinucleotide)." },
                     { q: "What is NAD+ decline?", a: "NAD+ decline is a natural part of the aging process. As we get older, our bodies produce less and consume more of this vital molecule. Studies suggest our NAD+ levels can decline by over 50% by middle age. This decline means our cells have less \"fuel\" for repair and energy, which is why we may start to feel the effects of aging, like fatigue and mental fog." },
                     { q: "Why combine an NAD precursor with Resveratrol? What's the synergy?", a: "This is our key differentiator. Think of it this way:\n\nNAD+: The essential \"cellular fuel\" for your cells.\nResveratrol: The \"accelerator pedal\" that helps activate important cellular pathways.\n\nResveratrol helps activate the very same \"longevity genes\" (Sirtuins) that use NAD+ as their fuel. By providing both, you are giving your cells the fuel and the boost to use that fuel for enhanced cellular defense and renewal." },
                     { q: "When can I expect to feel a difference?", a: "Taking ChronoNAD+ is an investment in your long-term health, while the most meaningful changes aren't always immediately \"felt\", results can very by individual. Many users notice steadier energy, better endurance, and clearer focus within 4-6 weeks of consistent use. Even if you don’t feel a dramatic shift right away, your cells are still benefiting from the ongoing NAD⁺ and Resveratrol support." },
                     { q: "What are the benefits of subscribing to ChronoNAD+?", a: "Subscribing is the most cost-effective way to stay consistent with your NAD⁺ and Resveratrol routine. CellStart subscribers receive 20%+ off every monthly bottle or 30%+ off with an annual plan, plus free shipping on every subscription order You also get automatic deliveries on your schedule. You can pause, skip, or adjust your subscription at any time. It’s a simple, flexible way to support better aging while keeping more savings in your pocket—better aging, more saving." },
                     { q: "Is this supplement safe?", a: "ChronoNAD+ is formulated with safety, quality, and transparency as top priorities. Every bottle is manufactured in a Eurofins-accredited cGMP-certified, and FDA-inspected facility here in the United States, following strict industry standards for purity and quality. Each batch undergoes multiple levels of quality control and laboratory testing to verify identity, potency, and safety—tests we make publicly available so you know exactly what you’re taking. \n\nThe core ingredients in ChronoNAD+ are supported by hundreds of peer-reviewed scientific studies exploring their roles in cellular energy, repair, and overall metabolic function. ChronoNAD+ is generally well-tolerated when taken as directed, but as with any supplement, we recommend consulting your healthcare provider if you have underlying health conditions, are pregnant or nursing, or are taking medications." },
                     { q: "Where is it made?", a: "ChronoNAD+ is made in the USA with globally sourced components." }
                  ].map((faq, index) => (
                     <div key={index} className="border-b border-white/10 transition-colors duration-300">
                        <button
                           onClick={() => toggleFaq(index)}
                           className="w-full flex items-center py-6 md:py-8 text-left group gap-4 md:gap-6"
                        >
                           {/* Checkbox Icon */}
                           <div className="shrink-0 w-6 h-6 border-2 border-white flex items-center justify-center rounded-sm">
                              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                           </div>
                           
                           <span className="flex-grow text-lg md:text-xl font-bold text-white tracking-tight">{faq.q}</span>
                           
                           {/* Chevron Icon */}
                           <div className={`shrink-0 transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                              <svg className="w-5 h-5 text-blue-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                              </svg>
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
                                 <div className="pl-10 md:pl-12 pb-8 pr-8">
                                    <p className="text-base md:text-lg text-blue-50 font-medium leading-relaxed whitespace-pre-line">{faq.a}</p>
                                 </div>
                              </motion.div>
                           )}
                        </AnimatePresence>
                     </div>
                  ))}
               </div>

               {/* FAQ CTA */}
               <div className="mt-8 md:mt-12 flex flex-col items-center gap-6">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToProducts}
                     className="bg-white text-[#0D47A1] font-black text-sm md:text-lg px-16 py-5 rounded-full uppercase tracking-[0.1em] shadow-lg hover:bg-blue-50 transition-all duration-500 flex items-center gap-3 group"
                  >
                     <span>Try ChronoNAD+</span>
                     <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>
                  <div className="flex items-center gap-2 text-xs md:text-sm font-black text-blue-200 uppercase tracking-[0.2em] mt-2">
                     <span className="text-lg">✅</span> 30 Day Money Back Guarantee
                  </div>
               </div>
            </div>
         </section>

           <footer className="bg-[#0d1b2e] text-white">
              {/* Main Footer Grid */}
              <div className="max-w-7xl mx-auto px-6 py-16">
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-10">

                    {/* PRODUCTS */}
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Products</h4>
                       <ul className="space-y-3 text-sm text-gray-300">
                          <li>
                             <a href="https://cellstart.com/products/nad?selling_plan=3903586561&amp;variant=46896557195521" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ChronoNAD+</a>
                          </li>
                       </ul>
                    </div>

                    {/* POLICIES */}
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Policies</h4>
                       <ul className="space-y-3 text-sm text-gray-300">
                          <li><a href="https://cellstart.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Privacy Policy</a></li>
                          <li><a href="https://cellstart.com/policies/refund-policy" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Refund Policy</a></li>
                          <li><a href="https://cellstart.com/pages/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact Information</a></li>
                          <li><a href="https://cellstart.com/policies/terms-of-service" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Terms of Service</a></li>
                       </ul>
                    </div>

                    {/* SUPPORT */}
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Support</h4>
                       <ul className="space-y-3 text-sm text-gray-300">
                          <li><a href="tel:+13053060766" className="hover:text-white transition-colors">(305) 306-0766 – Call Us</a></li>
                          <li><a href="mailto:support@cellstart.com" className="hover:text-white transition-colors whitespace-nowrap">support@cellstart.com – Email us</a></li>
                          <li><a href="https://cellstart.com/account" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">My Account</a></li>
                       </ul>
                    </div>

                    {/* QUICK LINKS */}
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Quick Links</h4>
                       <ul className="space-y-3 text-sm text-gray-300">
                          <li><a href="https://cellstart.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Home</a></li>
                          <li><a href="https://cellstart.com/pages/about" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">About Us</a></li>
                          <li><a href="https://cellstart.com/pages/contact" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Contact</a></li>
                       </ul>
                    </div>

                    {/* SOCIALS */}
                    <div className="space-y-4">
                       <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">Socials</h4>
                       <ul className="space-y-3 text-sm text-gray-300">
                          <li><a href="https://www.tiktok.com/@cellstart" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a></li>
                          <li><a href="https://www.instagram.com/cellstart_/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                       </ul>
                    </div>
                 </div>

              </div>

              {/* FDA Disclaimer */}
              <div className="border-t border-white/10 px-6 py-6">
                 <div className="max-w-7xl mx-auto">
                    <p className="text-xs md:text-sm text-gray-400 leading-relaxed border border-white/10 rounded-xl px-6 py-4 text-center">
                       *These statements have not been evaluated by the Food and Drug Administration. These products are not intended to diagnose, treat, cure, or prevent any disease.
                    </p>
                 </div>
              </div>

              {/* Payment Icons + Copyright Bar */}
              <div className="border-t border-white/10 px-6 py-6">
                 <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
                    {/* Payment Icons - using text badges as fallback */}
                    <div className="flex items-center gap-2 flex-wrap justify-center">
                       {['AMEX', 'Apple Pay', 'Diners', 'Discover', 'G Pay', 'Mastercard', 'PayPal', 'Shop Pay', 'VISA'].map((method) => (
                          <span key={method} className="px-2 py-1 border border-white/20 rounded text-[10px] font-bold text-gray-400 bg-white/5">{method}</span>
                       ))}
                    </div>

                 </div>
              </div>
           </footer>

      </div>
   )
}
