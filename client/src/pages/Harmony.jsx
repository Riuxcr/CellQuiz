import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import skinTransformation from '../assets/skin-transformation.png'
import chronoNadIsolated from '../assets/chrono-nad-isolated.png'
import cortisolTransformation from '../assets/cortisol-transformation.png'
import womenAllAgesResult from '../assets/women-all-ages-result.png'
import supplementFacts from '../assets/supplement_facts.png'
import chrononadProduct from '../assets/chrononad/chrononad_product_render_1776860430492.png'


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
                  <div className="flex flex-col items-center lg:items-start space-y-8 relative text-center lg:text-left">
                     <div className="space-y-6 relative z-10">
                        <motion.h1
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0 }}
                           transition={{ delay: 0.3 }}
                           className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] tracking-tight font-heading"
                        >
                           How 3 Million Women Over 30 Are <br />
                           <span className="text-[#0D47A1]">Reclaiming Their Youthful Glow,</span><br />
                           <span className="text-[#0D47A1]">Energy, and Metabolism</span>
                        </motion.h1>

                        <motion.div
                           initial={{ opacity: 0 }}
                           animate={{ opacity: 1 }}
                           transition={{ delay: 0.4 }}
                           className="max-w-xl"
                        >
                           <p className="text-lg md:text-xl text-[#111827] font-medium leading-relaxed">
                              Declining NAD+ levels are a hidden driver of dull skin and low energy.
                              <span className="font-bold"> ChronoNAD+</span> restores these levels at the source to reclaim your natural vitality and glow.
                           </p>
                        </motion.div>
                     </div>
 
                     <div className="space-y-4 relative z-10 w-full flex flex-col items-center lg:items-start">
                        {[
                           { text: "Restore NAD+ At The Source" },
                           { text: "Brighter, More Even Skin" },
                           { text: "Boost Energy & Vitality" },
                           { text: "Weight Management Support" },
                           { text: "Emotional Wellbeing Boost" }
                        ].map((benefit, i) => (
                           <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: 0.5 + (i * 0.05) }}
                              className="flex items-center gap-4 group"
                           >
                              <div className="w-8 h-8 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7" /></svg>
                              </div>
                              <span className="text-xl md:text-2xl text-[#111827] font-black tracking-tight">{benefit.text}</span>
                           </motion.div>
                        ))}
                     </div>
 
                     <div className="pt-2">
                        <motion.button
                           whileHover={{ scale: 1.05 }}
                           whileTap={{ scale: 0.95 }}
                           onClick={scrollToProducts}
                           className="bg-[#0D47A1] text-white font-black text-xs md:text-sm px-16 py-7 rounded-full uppercase tracking-[0.3em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center group relative overflow-hidden"
                        >
                           <span className="relative z-10">Try ChronoNAD+</span>
                           <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                        </motion.button>
                     </div>
                  </div>

                  {/* Right Column: Transformation Graphic - No Card */}
                  <div className="relative flex flex-col items-center justify-center">
                     <img
                        src={skinTransformation}
                        alt="Cellular Transformation Progress"
                        className="w-full h-auto max-h-[400px] lg:max-h-[500px] object-contain mix-blend-multiply scale-95 lg:scale-105 transition-transform duration-700"
                     />

                  </div>
               </motion.div>
            </div>
         </section>

         {/* FEATURED IN SECTION - ARCHITECTURAL PRESS MASTERPIECE */}
         <section id="featured" className="relative py-24 md:py-32 bg-white overflow-hidden">
            {/* Massive Spherical Background Backdrop */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square bg-[#F9FAFB] rounded-full z-0 opacity-50"></div>
            
            <div className="w-full px-10 md:px-24 relative z-10">
               <div className="text-center mb-16 space-y-6">

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] tracking-tight">
                     Research Backed <br />
                     <span className="text-[#0D47A1] font-semibold">Ingredients Featured In…</span>
                  </h2>
               </div>

               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {[
                     {
                        name: "ALLURE",
                        quote: "“I feel like the NAD has helped me regain a little more mental clarity and my overall energy level has definitely improved.”",
                        style: "font-black tracking-tighter"
                     },
                     {
                        name: "WIRED",
                        quote: "“Improvements in energy, mental clarity, migraines, and circadian disruption after using NAD-related therapies.”",
                        style: "font-serif font-black"
                     },
                     {
                        name: "ELLE",
                        quote: "“We’re learning about replacing compounds—like NAD+—that degrade as you age.”",
                        style: "font-black tracking-widest"
                     },
                     {
                        name: "TIME",
                        quote: "“NAD+ is the closest we’ve gotten to a fountain of youth. It’s one of the most important molecules for life to exist.”",
                        style: "font-black tracking-tight"
                     },
                     {
                        name: "Women’sHealth",
                        quote: "“I felt like I’d been given a boost of energy. My eyes felt brighter, and I had more of a spring in my step.”",
                        style: "font-black tracking-tight"
                     },
                     {
                        name: "CNET",
                        quote: "“NAD+ can help with skin health by promoting DNA repair and fighting oxidative stress and giving you more energy.”",
                        style: "font-black italic"
                     }
                  ].map((item, i) => (
                     <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-[#F9FAFB] p-6 md:p-8 flex flex-col items-center text-center space-y-6"
                     >
                        <h4 className={`text-xl md:text-2xl text-[#111827] uppercase leading-none ${item.style}`}>
                           {item.name}
                        </h4>
                        <p className="text-xs md:text-sm text-[#111827] italic font-medium leading-relaxed">
                           {item.quote}
                        </p>
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

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] tracking-tight max-w-5xl mx-auto">
                     See Why Thousands Of Women Are Turning To <span className="text-[#0D47A1] font-semibold">CHRONONAD+ To:</span>
                  </h2>
                  <p className="text-xl md:text-2xl text-[#111827] font-bold leading-tight max-w-4xl mx-auto">
                     Beat “Creepy” Skin, Premature Aging, Dark Under-Eye Bags, and Sluggish Metabolism.
                  </p>
                  <p className="text-base md:text-lg text-[#111827] font-medium leading-relaxed max-w-3xl mx-auto">
                     NAD+ Ingredients have been proven and tested by thousands of studies and users to help restore declining NAD+ levels for women of all ages, so they can finally <span className="text-[#111827] font-black">END the dull skin, constant tiredness, and visible signs of aging.</span>
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
                        <div className={`relative h-full p-8 md:p-10 rounded-3xl border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] overflow-hidden transition-all duration-500 group-hover:shadow-2xl group-hover:-translate-y-2 ${review.className.includes('bg-[#111827]') ? 'border-transparent' : ''}`}>
                           
                           {/* Surgical Cut Corner Accent */}
                           <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[4rem] z-0 transform translate-x-12 -translate-y-12 transition-all duration-700 group-hover:translate-x-0 group-hover:translate-y-0 ${review.className.includes('text-white') ? 'bg-white/5' : 'bg-[#0D47A1]/5'}`}></div>

                           <div className="relative z-10 flex flex-col h-full">
                              <div className="flex text-[#FFB400] gap-0.5 mb-6">
                                 {[...Array(5)].map((_, j) => (
                                    <svg key={j} className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                                 ))}
                              </div>
                              
                              <h4 className={`text-xl font-black mb-4 tracking-tight leading-[1.2] ${review.className.includes('text-white') ? 'text-white' : 'text-[#111827]'}`}>
                                 {review.title}
                              </h4>
                              
                              <p className="text-xl leading-relaxed mb-8 flex-grow text-[#111827] font-medium">
                                 {review.body}
                              </p>

                              <div className="pt-8 border-t border-gray-100/10 flex items-center gap-5">
                                 <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-black text-base shadow-xl ${review.className.includes('text-white') ? 'bg-white text-[#111827]' : 'bg-[#0D47A1] text-white'}`}>
                                    {review.initial}
                                 </div>
                                 <div className="space-y-0.5">
                                    <p className={`text-base font-black ${review.className.includes('text-white') ? 'text-white' : 'text-[#111827]'}`}>{review.name}</p>
                                    <div className="flex items-center gap-2">
                                       
                                       
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
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToProducts}
                     className="bg-[#0D47A1] text-white font-black text-xs md:text-sm px-16 py-7 rounded-full uppercase tracking-[0.3em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center mx-auto group"
                  >
                     Try ChronoNAD+
                     <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>

               </div>
            </div>
         </section>

         {/* CORTISOL IMPACT & TRANSFORMATION SECTION - NEW */}
          <section id="story" className="py-24 md:py-32 lg:py-40 bg-white">
             <div className="max-w-3xl mx-auto px-6 text-center">
                <div className="mb-10">

                   <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] tracking-tight">
                      As women age, their <br />
                      <span className="font-semibold">NAD+ levels drop by 30%</span> by Age 30.
                   </h2>
                </div>

                <div className="space-y-2 text-base md:text-lg font-medium text-[#111827] leading-relaxed">
                   <p className="text-base md:text-lg font-black text-[#E53935] leading-tight">
                      And that’s when everything changes in your body.
                   </p>

                   <div className="space-y-1">
                      <p className="font-bold text-[#111827]">The dull, weathered complexion...</p>
                      <p className="font-bold text-[#111827]">The heavy, persistent brain fog...</p>
                      <p className="font-bold text-[#111827]">The slow, ‘biological rust’ recovery...</p>
                   </div>

                   <p className="max-w-2xl mx-auto text-[#111827]">
                      Are all symptoms of <span className="font-black underline decoration-gray-200 underline-offset-8">cellular decay</span> that forces the body to stay <span className="font-black">DRAINED and WEATHERED…</span> And that’s only what you see in the mirror.
                   </p>

                   <p className="text-base md:text-lg font-bold text-[#111827]">
                      On the inside? There’s a biological brownout wreaking havoc on your youthfulness and energy.
                   </p>

                   <div className="space-y-4 border-y-2 border-gray-50 py-6 text-[#111827] max-w-2xl mx-auto px-4">
                      <p>You feel mentally gray and lagging during the day…</p>
                      <p>Drained yet restless when your body needs to recover or sleep…</p>
                      <p>And unable to reclaim your glow, no matter what serums you use.</p>
                   </div>

                   <p className="text-base md:text-lg font-medium text-[#111827]">
                      If that ever happened to you, <span className="font-black">it’s not your fault.</span> These are symptoms of a 'biological lag' caused by crashing NAD+ levels…
                   </p>

                   <div className="flex flex-col items-center py-4">
                      <p className="text-xs font-black uppercase tracking-[0.5em] text-[#111827] mb-4">And unfortunately, it doesn’t stop here.</p>
                      <div className="h-[2px] w-24 bg-gray-100"></div>
                   </div>

                   <p className="text-base md:text-lg font-black text-[#E53935] leading-tight tracking-tighter">
                      By the time you reach your 40s, your NAD+ levels, which is the fuel for every single cell, <br />
                      <span className="font-black">plummet by a whopping 50%...</span>
                   </p>

                   <p className="max-w-2xl mx-auto text-[#111827]">
                      This is the molecule that keeps your skin tight and luminous, your DNA shielded, your metabolism firing, and your cellular recovery on autopilot…
                   </p>

                   <p className="text-base md:text-lg font-bold text-[#111827]">
                      Just like in your 20s and 30s.
                   </p>

                   <p className="font-bold text-[#111827] text-base md:text-lg pt-2">
                      This means that, as you age…
                   </p>

                   <p className="max-w-2xl mx-auto text-[#111827]">
                      Not only do you accumulate visible <span className="font-black">'biological rust'</span> against your will… But your cells actually <span className="font-bold underline decoration-gray-200">lose the ability to repair themselves.</span>
                   </p>

                   <p className="text-[#111827] max-w-2xl mx-auto">
                      And as if that weren’t enough… Your focus goes out the window, and your youthfulness becomes a memory of the past.
                   </p>

                   <h3 className="text-base md:text-lg font-bold text-[#111827] pt-4">Here’s why that happens:</h3>

                   <div className="space-y-4 max-w-2xl mx-auto text-[#111827]">
                      <p>
                         <span className="font-black text-[#111827]">Crashing NAD+ levels stall your cellular engines…</span> <br />
                         Which dulls the skin and creates that 'perpetually tired' look…
                      </p>
                      <p>
                         Other NAD+ dependent 'youth' processes fail, and DNA damage accumulates… <br />
                         So the body stubbornly feels <span className="font-bold text-[#111827]">older, heavier, and slower</span> than you actually are.
                      </p>
                   </div>

                   <h3 className="text-base md:text-lg font-bold text-[#111827] pt-4">So if you’ve ever witnessed…</h3>

                   <div className="space-y-4 max-w-xl mx-auto text-[#111827]">
                      {[
                         "New fine-lines appearing where a glow used to be…",
                         "A 'brain fog' that makes simple tasks feel like a climb…",
                         "Slow recovery that keeps you sore and tired for days…",
                         "Or Dull wrinkled skin losing its firm, youthful definition…"
                      ].map((item, i) => (
                         <div key={i} className="text-center group">
                            <p className="font-medium border-b border-gray-100 pb-4 text-[#111827]">{item}</p>
                         </div>
                      ))}
                   </div>

                   <div className="text-center py-4 space-y-2">
                      <p className="text-base md:text-lg font-black text-[#E53935] tracking-tighter">"You’re not alone…"</p>
                      <p className="text-base md:text-lg text-[#E53935]">It happens to <span className="font-black text-[#E53935]">MILLIONS of women</span> just like you.</p>
                   </div>

                   <p className="font-bold text-[#111827] text-base md:text-lg pt-2 max-w-2xl mx-auto">
                      If you’ve experienced some of these symptoms… <br />
                      then you probably noticed that…
                   </p>

                   <p className="text-base md:text-lg font-black leading-tight text-[#111827] underline decoration-gray-100 underline-offset-8">
                      Standard vitamins and 'skincare only' routines just won’t cut it anymore.
                   </p>

                   <p className="text-[#111827] max-w-2xl mx-auto">
                      Sure, they’ll help on the surface… <br />
                      But they won’t fix the <span className="font-black text-[#111827]">cellular bankruptcy</span> happening at the root… or the rapid downfall of your longevity molecules.
                   </p>

                   <div className="py-6 space-y-4">
                      <p className="text-base md:text-lg font-black text-[#111827] leading-tight tracking-tighter">
                         Fortunately – there’s a way to <br />
                         <span className="font-black">reverse</span> that.
                      </p>
                      <p className="text-base md:text-lg font-medium text-[#111827]">And it all starts by going to the <span className="font-black">root cause…</span></p>

                      <div className="space-y-6 text-base md:text-lg font-bold text-[#111827] leading-tight">
                         <p>Because once you <span className="font-black">restore your NAD+ levels…</span></p>
                         <p>And activate the cellular repair your body is now missing…</p>
                      </div>

                      <div className="space-y-4 pt-4">
                         <p className="text-base md:text-lg font-black text-[#E53935]">You can get back that <br /><span className="font-black">sexy confidence…</span></p>
                         <p className="text-base md:text-lg text-[#111827]">The beautiful complexion, the sharp mind, the revitalized body…</p>
                         <p className="text-base md:text-lg font-bold pt-4 text-[#111827]">So you can LOVE your life once again…</p>
                         <p className="text-base font-black uppercase tracking-[0.3em] text-[#111827]">No matter your age, genetics, or unique biological profile!</p>
                      </div>

                      <div className="pt-20 flex flex-col items-center">
                          <motion.button
                             whileHover={{ scale: 1.05 }}
                             whileTap={{ scale: 0.95 }}
                             onClick={scrollToProducts}
                             className="bg-[#0D47A1] text-white font-black text-xs md:text-sm px-16 py-7 rounded-full uppercase tracking-[0.3em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center mx-auto"
                          >
                             Try ChronoNAD+
                          </motion.button>

                       </div>
                    </div>
                 </div>
              </div>
           </section>
 
           {/* SOLUTION SECTION - BLACK & BLUE COMBINATION */}
           <section id="solution" className="py-16 md:py-20 bg-[#F8FAFC]">
              <div className="max-w-7xl mx-auto px-6">
                 {/* Top Label */}
                 <div className="text-center mb-6 flex items-center justify-center gap-6">
                    <span className="text-[#0D47A1] text-2xl font-black">↓</span>
                    <span className="text-black font-bold text-lg md:text-2xl tracking-tight uppercase">Finally, a breakthrough for women of every age</span>
                    <span className="text-[#0D47A1] text-2xl font-black">↓</span>
                 </div>
 
                 {/* Headline */}
                 <h2 className="text-2xl md:text-3xl lg:text-4xl text-black text-center leading-tight mb-12 max-w-5xl mx-auto tracking-tighter">
                    <span className="font-bold block mb-4">It’s Now Possible To Block Cellular Bankruptcy, and Restore Your ‘Youth’ Molecules...</span>
                    <span className="font-semibold block mb-4 text-black">And Stay Naturally Sharp, Luminous, and Revitalized with</span>
                    <span className="text-[#0D47A1] font-black block underline decoration-blue-100 underline-offset-8">ChronoNAD+</span>
                 </h2>
 
                 {/* Two Column Grid */}
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left Product Image */}
                    <div className="relative flex items-center justify-center p-8 bg-gradient-to-br from-white via-[#F0F7FF] to-white rounded-[3rem] shadow-[0_40px_100px_-20px_rgba(13,71,161,0.15)] min-h-[500px] border border-blue-50/50">
                       {/* Grounded Surface Shadow - Intensified */}
                       <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-[70%] h-12 bg-black/15 blur-2xl rounded-[100%] z-0"></div>
                       
                       <motion.img 
                          initial={{ opacity: 0, scale: 0.9 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 1 }}
                          src="/Product1.png" 
                          alt="ChronoNAD+ Bottle"
                          className="relative z-10 w-full max-w-sm h-auto object-contain drop-shadow-[0_30px_60px_rgba(0,0,0,0.12)]"
                       />
                    </div>
 
                    {/* Right Content */}
                    <div className="space-y-4 text-lg md:text-xl text-black leading-snug font-medium">
                       <p>We have spent years at the <strong>cutting-edge</strong> of longevity and molecular biology...</p>
                       
                       <p>And after searching far and wide for the most groundbreaking, up-to-date clinical research on the planet...</p>
                       
                       <p className="uppercase tracking-tighter text-black font-black">We have finally done it:</p>
                       
                       <p>We’ve created a <strong>next-generation cellular renewal formula</strong> that packs high-purity, bioavailable longevity activators into a single formula</p>
                       
                       <p>To target the real, root cause of biological rust, skin aging, and metabolic stalling as quickly, effectively, and safely as possible.</p>
                    </div>
                 </div>
 
                 {/* CTA */}
                 <div className="mt-12 text-center space-y-8">
                    <motion.button
                       whileHover={{ scale: 1.05 }}
                       whileTap={{ scale: 0.95 }}
                       onClick={scrollToProducts}
                       className="bg-[#0D47A1] text-white font-black text-xs md:text-sm px-16 py-7 rounded-full uppercase tracking-[0.3em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center mx-auto"
                    >
                       Try ChronoNAD+
                    </motion.button>

                 </div>
              </div>
           </section>

         {/* BREAKTHROUGHS SECTION */}
         {/* id added for nav */}
         <section id="breakthroughs" className="py-12 md:py-16 lg:py-24 bg-white overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-20">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black mb-6 leading-tight tracking-tight">
                     The 6 Biggest Scientific Cellular Energy Breakthroughs <br />
                     Of The Past 20 Years…
                  </h2>
                  <div className="flex items-center justify-center gap-4">
                     <div className="h-[1px] w-12 bg-gray-200"></div>
                     <span className="text-xs font-black uppercase tracking-[0.4em] text-black">Locked Into One Daily Protocol</span>
                     <div className="h-[1px] w-12 bg-gray-200"></div>
                  </div>
               </div>

               {/* 6 Discoveries List - Inspired by Reference UI */}
               <div className="max-w-7xl mx-auto space-y-4 mb-32">
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
                        className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 hover:shadow-lg border border-blue-100 bg-[#F0F7FF]/50`}
                     >
                        {/* Number Section */}
                        <div className="flex flex-col items-center md:items-start shrink-0">
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
               <div className="bg-[#0D47A1] text-white p-6 md:p-12 lg:p-16 rounded-[2rem] md:rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden mb-20 group">
                  {/* Background Pattern */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50"></div>

                  <div className="relative z-10 flex flex-col items-center text-center">


                     <div className="space-y-6">

                        <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight font-heading text-white">UNDENIABLE RESULTS</h4>
                        <p className="text-lg md:text-xl leading-relaxed text-white/90 font-medium max-w-4xl mx-auto">
                           In landmark research spanning the last two decades, scientists have confirmed that NAD+ is not just a participant, but the master regulator of cellular metabolism, DNA repair, and vitality in human cells. Declining NAD+ is now recognized as a primary driver of the aging process itself.
                        </p>

                     </div>
                  </div>
               </div>

               <div className="flex flex-col items-center gap-6">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToProducts}
                     className="bg-[#0D47A1] text-white font-black text-xs md:text-sm px-16 py-7 rounded-full uppercase tracking-[0.3em] shadow-[0_25px_60px_rgba(13,71,161,0.25)] hover:bg-[#111827] transition-all duration-500 flex items-center justify-center mx-auto group"
                  >
                     Try ChronoNAD+
                     <svg className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </motion.button>

               </div>
            </div>
         </section>

         {/* 2 CAPSULES A DAY SECTION - SCREENSHOT STYLE */}
         <section id="science" className="relative py-24 md:py-32 bg-[#F0F7FF] overflow-hidden">
            <div className="max-w-5xl mx-auto px-6 relative z-10 text-center">
               
               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] tracking-tight mb-6">
                  All It Takes Is <span className="text-[#0D47A1] font-black">2 Capsules A Day</span> To Beat <br className="hidden md:block" />
                  New Fine Wrinkles, Feeling Drained, and Looking Dull…
               </h2>

               <p className="text-lg md:text-xl font-bold text-[#111827] mb-16 tracking-tight">
                  While Revitalizing Your DNA Repair, Skin Glow, and Energy
               </p>

               <div className="space-y-4 text-left max-w-4xl mx-auto mb-24 px-4">
                  <div className="flex items-start gap-8 group">
                     <div className="w-16 h-16 rounded-full bg-[#0D47A1]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] transition-colors duration-300">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D47A1] group-hover:text-white transition-colors duration-300"><path d="M16.12 15.11C18.605 15.861 20 17.55 20 19a2 2 0 0 1-2 2c-1.45 0-3.139-1.395-3.89-3.88"/><path d="M12 21v-9"/><path d="M7.88 15.11C5.395 15.861 4 17.55 4 19a2 2 0 0 0 2 2c1.45 0 3.139-1.395 3.89-3.88"/><path d="M16.12 8.89C18.605 8.139 20 6.45 20 5a2 2 0 0 0-2-2c-1.45 0-3.139 1.395-3.89 3.88"/><path d="M7.88 8.89C5.395 8.139 4 6.45 4 5a2 2 0 0 1 2-2c1.45 0 3.139 1.395 3.89 3.88"/></svg>
                     </div>
                     <p className="text-xl md:text-2xl text-[#111827] leading-relaxed">
                        <span className="font-bold">Contains 2 powerful nutrients- longevity-support compounds</span> <span className="text-lg md:text-xl text-gray-600 font-normal">carefully selected by our leading longevity experts.</span>
                     </p>
                  </div>
                  <div className="flex items-start gap-8 group">
                     <div className="w-16 h-16 rounded-full bg-[#0D47A1]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] transition-colors duration-300">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D47A1] group-hover:text-white transition-colors duration-300"><path d="M6 18h8"/><path d="M3 22h18"/><path d="M14 22a7 7 0 1 0 0-14h-1"/><path d="M9 14h2"/><path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z"/><path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3"/></svg>
                     </div>
                     <p className="text-xl md:text-2xl text-[#111827] leading-relaxed">
                        <span className="font-bold">Backed by decades of research and thousands of clinical studies</span> <span className="text-lg md:text-xl text-gray-600 font-normal">supporting NAD+ restoration, cellular repair, and healthy aging.</span>
                     </p>
                  </div>
                  <div className="flex items-start gap-8 group">
                     <div className="w-16 h-16 rounded-full bg-[#0D47A1]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] transition-colors duration-300">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D47A1] group-hover:text-white transition-colors duration-300"><path d="M4.5 3h15"/><path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3"/><path d="M6 14h12"/></svg>
                     </div>
                     <p className="text-xl md:text-2xl text-[#111827] leading-relaxed">
                        <span className="font-bold">Precisely dosed to help replenish declining NAD+ levels</span> <span className="text-lg md:text-xl text-gray-600 font-normal">and target the root cause of low energy and visible aging.</span>
                     </p>
                  </div>
                  <div className="flex items-start gap-8 group">
                     <div className="w-16 h-16 rounded-full bg-[#0D47A1]/5 flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] transition-colors duration-300">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#0D47A1] group-hover:text-white transition-colors duration-300"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                     </div>
                     <p className="text-xl md:text-2xl text-[#111827] leading-relaxed">
                        <span className="font-bold">Supports sustained energy, radiant skin, mental clarity, and overall cellular vitality</span> <span className="text-lg md:text-xl text-gray-600 font-normal">from within.</span>
                     </p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 max-w-5xl mx-auto">
                  <div className="flex flex-col items-center text-center space-y-8 group">
                     <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white transform transition-transform duration-500 group-hover:scale-105">
                        <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600&h=600" className="w-full h-full object-cover" alt="CryoNAD+" />
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-2xl font-black text-[#111827] tracking-tight">CryoNAD+™ — <br /><span className="text-[#0D47A1]">Nicotinamide Adenine Dinucleotide</span></h3>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-md mx-auto">
                           Known as "The Cellular Fuel" that powers your energy from the inside out, sharpens your focus, speeds up recovery, and gives your body the raw material it needs to repair and renew every single day.
                        </p>
                     </div>
                  </div>
                  <div className="flex flex-col items-center text-center space-y-8 group">
                     <div className="w-56 h-56 md:w-64 md:h-64 rounded-full overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-8 border-white transform transition-transform duration-500 group-hover:scale-105">
                        <img src="https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=600" className="w-full h-full object-cover" alt="SIRT-R Resveratrol" />
                     </div>
                     <div className="space-y-4">
                        <h3 className="text-2xl font-black text-[#111827] tracking-tight">SIRT-R™ Resveratrol — <br /><span className="text-[#0D47A1]">Japanese Knotweed Extract</span></h3>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-md mx-auto">
                           Activates your body's longevity enzymes, protects your cells from daily damage, and works hand in hand with NAD+ to slow down how your body ages from the inside out.
                        </p>
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
               {/* Centered Header */}
               <div className="flex flex-col items-center text-center space-y-6 mb-20">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-[1.1] tracking-tight">
                     What Happens When <br />
                     <span className="text-[#0D47A1] font-semibold">You Start Taking CHRONONAD+?</span>
                  </h2>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">

                  {/* Left Column: Genesis Journey Content */}
                  <div className="lg:col-span-7 space-y-16">


                     {/* The Genesis Path - Vertical Architectural Timeline */}
                     <div className="relative pl-16 md:pl-20 space-y-8">
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
                                 <div className="w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-[#0D47A1] border border-[#0D47A1] shadow-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 z-20 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-tr from-[#0D47A1]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <span className="text-[10px] font-black text-[#0D47A1] relative z-10"></span>
                                 </div>
                              </div>

                              {/* Story Card */}
                              <div className="space-y-3">
                                 <div className="flex items-center gap-4">
                                    <span className="text-2xl md:text-3xl font-black uppercase tracking-tight text-[#0D47A1]">{item.time}</span>
                                    <div className="h-[1px] w-8 bg-blue-50"></div>
                                 </div>

                                 <p className="text-black leading-relaxed font-medium text-base md:text-lg max-w-2xl">
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


                     </motion.div>
                  </div>

               </div>
            </div>
         </section>

         {/* WORKS FOR ALL AGES SECTION - REFINED PROPER LAYOUT */}
         <section id="transformation" className="py-24 md:py-32 bg-white overflow-hidden relative">
            {/* Soft Architectural Background Scoop */}
            <div className="absolute top-0 right-0 w-full lg:w-[55%] h-full bg-[#F9FAFB] lg:rounded-bl-[40rem] z-0 hidden lg:block"></div>
            
            <div className="max-w-7xl mx-auto px-6 relative z-10">
               {/* Centered Header */}
               <div className="flex flex-col items-center text-center space-y-6 mb-20">

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] tracking-tight max-w-5xl">
                     Works For Women Of All Ages & Body Types <br />
                     <span className="text-[#0D47A1] font-semibold">No Matter How Long You’ve Been Struggling With New Lines, Dull Skin , or “Not Yourself”</span>
                  </h2>
               </div>

               <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-20">
                  
                  {/* Left Column: Benefits & Header */}
                  <div className="w-full lg:w-1/2 space-y-12">



                     {/* Clean Benefit Grid - Compact & Proper */}
                     <div className="grid grid-cols-1 gap-y-6">
                        {[
                           { title: "Sculpted Glow", desc: "Reveal a more refreshed look as skin appears firmer." },
                           { title: "Restorative Sleep", desc: "Deep sleep so your body can fully recharge." },
                           { title: "Mental Clarity", desc: "Balanced mood and clearer thinking daily." },
                           { title: "Steady Vigor", desc: "Stay energized without the crashes or fog." },
                           { title: "Graceful Aging", desc: "Support smoother, brighter, youthful skin." },
                           { title: "Total Freedom", desc: "Enjoy long days without feeling drained." }
                        ].map((item, i) => (
                           <div key={i} className="flex gap-7 group">
                              <div className="shrink-0 w-12 h-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                                 <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7" /></svg>
                              </div>
                              <div className="space-y-0.5">
                                 <h4 className="text-xl md:text-2xl font-bold text-[#111827]">{item.title}</h4>
                                 <p className="text-base md:text-lg text-black font-medium leading-relaxed">{item.desc}</p>
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


                     </div>
                  </div>

               </div>
            </div>
         </section>

         {/* TRUST ICONS SECTION - ORBITAL CLINICAL CERTIFICATION */}
         <section id="trust" className="relative py-24 md:py-32 lg:py-48 bg-white overflow-hidden">
            {/* Background Architectural Capsule */}
            <div className="absolute inset-x-4 md:inset-x-8 top-32 bottom-32 md:top-40 md:bottom-40 bg-[#F0F7FF] rounded-[3rem] md:rounded-[10rem] border border-blue-50 pointer-events-none z-0"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
               <div className="text-center mb-24 space-y-6">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] tracking-tight">
                     Clinical Purity. <br />
                     <span className="text-[#0D47A1] font-semibold">Zero Compromise.</span>
                  </h2>
               </div>

               <div className="relative">


                  <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-20 relative">
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
                           className="flex flex-col items-center text-center group"
                        >
                           <div className="relative">
                              {/* Pulsing Aura */}
                                                            
                              <div className="w-28 h-28 md:w-44 lg:w-52 md:h-44 lg:h-52 rounded-full bg-white border border-gray-100 flex items-center justify-center mb-8 shadow-[0_15px_40px_rgba(0,0,0,0.03)] relative z-10 p-6 md:p-8">
                                 <img
                                    src={item.img}
                                    alt={item.label}
                                    className="w-full h-full object-contain"
                                    onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Icon'; }}
                                  />
                              </div>
                           </div>
 
                           <div className="space-y-4 relative z-10">
                                                             <p className="text-[10px] md:text-[11px] font-black text-[#111827] leading-relaxed uppercase tracking-[0.2em] max-w-[140px]">
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
         <section id="pricing-grid" className="py-12 md:py-16 lg:py-24 bg-gray-50/50 scroll-mt-20 border-y border-gray-100">
            <div className="max-w-7xl mx-auto px-6">
               {/* Checkout Progress Stepper */}
               <div className="max-w-4xl mx-auto mb-20 px-4 md:px-10">
                  <div className="relative flex justify-between items-center">
                     {/* Base Progress Line */}
                     <div className="absolute top-[68px] left-0 w-full h-1 bg-gray-100 -z-0" />
                     {/* Active Progress Line Segment */}
                     <div className="absolute top-[68px] left-0 w-[20%] md:w-[25%] h-1 bg-black -z-0" />
 
                     {[
                        { step: 1, label: "Select Your Package", active: true },
                        { step: 2, label: "Billing Information", active: false },
                        { step: 3, label: "Thank You", active: false }
                     ].map((s, idx) => (
                        <div key={idx} className="flex flex-col items-center relative z-10">
                           <span className={`text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-4 text-center transition-colors ${s.active ? 'text-black' : 'text-gray-300'}`}>
                              {s.label}
                           </span>
                           <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full border-[4px] flex items-center justify-center text-xl md:text-2xl font-black bg-white transition-all ${s.active ? 'border-black text-black' : 'border-gray-100 text-gray-300'}`}>
                              {s.step}
                           </div>
                        </div>
                     ))}
                  </div>
               </div>

               <div className="text-center mb-8">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-black leading-[1.1] tracking-tight uppercase">
                     Choose Your Package Below
                  </h2>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 max-w-7xl mx-auto items-stretch">
                  {[
                     {
                        title: "STARTER ORDER",
                        headerBg: "bg-[#0D47A1]",
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
                        headerBg: "bg-[#0D47A1]",
                        headerText: "text-white",
                        borderColor: "ring-4 ring-black/5",
                        price: "$12.79",
                        total: "$25.58",
                        originalTotal: "$31.98",
                        image: "/Product1.png",
                        count: 2,
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
                        className={`relative flex flex-col bg-[#F0F7FF] rounded-3xl overflow-hidden shadow-2xl border border-blue-100/50 ${pkg.borderColor || ''}`}
                     >
                        {/* Header */}
                        <div className={`${pkg.headerBg} py-4 text-center`}>
                           <span className={`text-lg font-black tracking-[0.2em] uppercase ${pkg.headerText}`}>{pkg.title}</span>
                        </div>



                        <div className="flex-grow flex flex-col items-center pt-2 md:pt-4 lg:pt-6 px-4 md:px-8 pb-4 md:pb-6 text-center">
                           <div className="h-[300px] md:h-[400px] lg:h-[440px] w-full mb-0 relative flex items-center justify-center overflow-visible">
                              {pkg.count === 2 ? (
                                 <div className="relative w-full h-full flex items-center justify-center translate-y-4 md:translate-y-6">
                                    {/* Back Bottle */}
                                    <img
                                       src={pkg.image}
                                       alt={pkg.title}
                                       className="w-[85%] h-[85%] object-contain scale-115 md:scale-130 lg:scale-140 absolute -translate-x-12 md:-translate-x-16 z-0 brightness-[0.98] blur-[0.5px]"
                                    />
                                    {/* Front Bottle */}
                                    <img
                                       src={pkg.image}
                                       alt={pkg.title}
                                       className="w-[85%] h-[85%] object-contain scale-115 md:scale-130 lg:scale-140 absolute translate-x-12 md:translate-x-16 z-10 drop-shadow-[20px_0_30px_rgba(0,0,0,0.15)]"
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
                              <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">Per Jar</div>
                           </div>

                           {/* Total & Installments */}
                           <div className="mb-4 w-full">
                              <div className="text-base font-bold text-black mb-1">
                                 Total {pkg.originalTotal && <span className="line-through text-gray-300 font-medium mr-2">{pkg.originalTotal}</span>}
                                 {pkg.total}
                              </div>

                           </div>

                           {/* BUY NOW Button */}
                           <button className="w-full py-6 rounded-full bg-[#0D47A1] text-white font-black text-sm tracking-[0.3em] shadow-xl hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-3 mb-6 group">
                              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" /></svg>
                              <span>BUY NOW</span>
                           </button>
                        </div>
                     </motion.div>
                  ))}
               </div>
 
               {/* Payment Security Assurance Card */}
               <div className="max-w-5xl mx-auto mt-16 bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-gray-100 flex flex-col lg:flex-row items-center gap-10">
                  <div className="flex flex-col items-center lg:items-start gap-6 lg:w-1/3">
                     <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em]">Our trusted payment processors:</p>
                     <div className="flex items-center gap-4">
                        {/* PayPal Logo */}
                        <div className="h-8 md:h-10 px-4 bg-[#F2F5F7] rounded flex items-center">
                           <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 md:h-5" />
                        </div>

                     </div>
                  </div>
 
                  <div className="hidden lg:block w-[1px] h-20 bg-gray-100"></div>
 
                  <div className="flex flex-col md:flex-row items-center gap-8 lg:w-2/3">
                     <div className="flex-shrink-0">
                        <div className="w-16 h-16 md:w-20 md:h-20 bg-[#F0F7FF] rounded-full flex items-center justify-center relative">
                           <svg className="w-10 h-10 md:w-12 md:h-12 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                           </svg>
                           <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
                              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                           </div>
                        </div>
                     </div>
                     <div className="text-center md:text-left space-y-2">
                        <p className="text-sm md:text-base text-gray-600 leading-relaxed">
                           We use a <span className="font-bold text-black">256-bit secure shopping cart</span> where 100% of your data is encrypted, safe and secure. This is the same data security standard used by most banks, governments and military organizations.
                        </p>
                     </div>
                  </div>
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
               <div className="text-center mb-12 max-w-5xl mx-auto space-y-1">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] tracking-tight">
                     Your Purchase Is Protected By Our
                  </h2>
                  <p className="text-4xl md:text-5xl font-black text-[#0D47A1] uppercase tracking-tighter italic">
                     30 Day 100% Money Back Guarantee
                  </p>
                  <p className="text-lg md:text-xl text-gray-600 font-medium max-w-3xl mx-auto leading-relaxed">
                     At CellStart, we believe in making sure our customers love our products, or you shouldn’t have to pay for it. We’ll refund 100% of your investment on your first bottle. We’re so confident in the science of NAD+ that we’ll bear all the risk.
                  </p>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                  {[
                     {
                        subtitle: "Free Shipping On All Monthly or 2 or more bottle orders.",
                        desc: "No one likes paying for shipping. That’s why when you purchase either our monthly delivery or two bottles or more, we take care of the shipping for you. You save more when you buy more!",
                        icon: (
                           <div className="w-16 h-16 bg-[#0D47A1]/5 rounded-full flex items-center justify-center mb-6 mx-auto">
                              <svg className="w-6 h-6 text-[#0D47A1]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <rect x="1" y="3" width="15" height="13" />
                                 <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                                 <circle cx="5.5" cy="18.5" r="2.5" />
                                 <circle cx="18.5" cy="18.5" r="2.5" />
                              </svg>
                           </div>
                        )
                     },
                     {
                        subtitle: "30 Day Money Back Guarantee",
                        desc: "True cellular restoration is a journey, not an overnight fix. While some notice a \"brain fog lift\" early on, deep DNA repair typically happens on a 90 to 120-day cycle. If you don’t feel confident that you’re building a stronger cellular foundation, you can claim a full refund on your first bottle.",
                        icon: (
                           <div className="w-16 h-16 bg-[#0D47A1]/5 rounded-full flex items-center justify-center mb-6 mx-auto">
                              <svg className="w-6 h-6 text-[#0D47A1]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                 <path d="m9 12 2 2 4-4" />
                              </svg>
                           </div>
                        )
                     },
                     {
                        subtitle: "Instant Refunds",
                        desc: "We want you to feel the transformative effects of youthful NAD+ levels. If you aren’t happy with how ChronoNAD works for you, we’ll give you a hassle-free, no-questions-asked refund on your first bottle. We’re here to support your longevity, not complicate it.",
                        icon: (
                           <div className="w-16 h-16 bg-[#0D47A1]/5 rounded-full flex items-center justify-center mb-6 mx-auto">
                              <svg className="w-6 h-6 text-[#0D47A1]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                 <path d="M12 2v20M5 5h14M5 19h14M17 9l-5-5-5 5M7 15l5 5 5-5" />
                              </svg>
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
                        <p className="text-lg text-gray-600 font-medium leading-relaxed">
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
                     className="bg-[#0D47A1] text-white font-black text-sm md:text-base px-20 py-6 rounded-full uppercase tracking-[0.2em] shadow-lg hover:bg-[#111827] transition-all duration-300 flex items-center gap-3"
                  >
                     <span>Try ChronoNAD+</span>
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                     </svg>
                  </motion.button>
                  <div className="flex items-center gap-3 text-[#0D47A1] font-black text-[10px] tracking-[0.2em] uppercase">
                     <div className="w-5 h-5 bg-[#0D47A1] rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                     </div>
                     <span>30 Day Money Back Guarantee</span>
                  </div>
               </div>
            </div>
         </section>


         {/* COMPREHENSIVE REVIEWS SECTION */}
         {/* THE PROOF IS IN THE RESULTS - JUDGE.ME STYLE REDESIGN */}
         <section id="results" className="py-12 md:py-16 lg:py-24 bg-white border-y border-gray-50 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6">
               <div className="text-center mb-16 space-y-6 max-w-6xl mx-auto">

                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] tracking-tight">
                     Real People, Real Results: <br />
                     <span className="text-[#0D47A1]">Join Thousands of Women All Over The World that Trust ChronoNAD+</span>
                  </h2>
                  <div className="pt-2">
                     <p className="text-base md:text-lg text-gray-500 font-bold max-w-4xl mx-auto leading-relaxed">
                        <span className="text-[#0D47A1]">Note:</span> All reviews below are from actual paying customers. <br />
                        <span className="text-gray-400 font-medium">They have been authenticated and verified</span>
                     </p>
                  </div>
               </div>



               {/* Review Cards List - Single Column Horizontal Style */}
               <div className="grid grid-cols-1 gap-6 mb-16 max-w-6xl mx-auto">
                  {(() => {
                     const allReviews = [
                        {
                           name: "Brenda",
                           title: "Great quality supplements",
                           body: "60 capsules in a bottle. Directions say to take two a day. Pills are pretty easy to swallow. I had good results with taking this supplement. More energy and I have better sleep now. My digestion improved also.",
                           date: "2 MONTHS AGO",
                           bg: "bg-white",
                           initial: "B"
                        },
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
                                    className={`${review.bg} p-6 md:p-10 rounded-3xl border border-white flex flex-col`}
                                 >
                                    <div className="flex justify-between items-start mb-6">
                                       <div className="flex items-center gap-4">
                                          <div className="w-10 h-10 rounded-full bg-[#0D47A1] text-white flex items-center justify-center font-black text-xs shadow-inner">{review.initial}</div>
                                          <div className="flex flex-col">
                                             <span className="font-bold text-base text-[#111827] tracking-tight">{review.name}</span>
                                          </div>
                                       </div>
                                    </div>

                                    <div className="flex text-[#FFC107] text-xl mb-4 gap-1">
                                       {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                                    </div>

                                    <h4 className="text-xl font-black text-[#0D47A1] mb-4 font-heading-alt italic tracking-tight leading-tight">{review.title}</h4>
                                    <div className="relative group/text">
                                       <p className="text-base md:text-lg text-[#111827] leading-relaxed font-medium mb-8">
                                          {review.body}
                                       </p>
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
               <div className="flex flex-col items-center gap-6 mt-16">
                  <motion.button
                     whileHover={{ scale: 1.05 }}
                     whileTap={{ scale: 0.95 }}
                     onClick={scrollToProducts}
                     className="bg-[#0D47A1] text-white font-black text-sm md:text-base px-20 py-6 rounded-full uppercase tracking-[0.2em] shadow-lg hover:bg-[#111827] transition-all duration-300 flex items-center gap-3"
                  >
                     <span>Try ChronoNAD+</span>
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                     </svg>
                  </motion.button>
                  <div className="flex items-center gap-3 text-[#0D47A1] font-black text-[10px] tracking-[0.2em] uppercase">
                     <div className="w-5 h-5 bg-[#0D47A1] rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                     </div>
                     <span>30 Day Money Back Guarantee</span>
                  </div>
               </div>
            </div>
         </section>

         {/* SUPPLEMENT FACTS TRANSPARENCY SECTION - MINIMALIST MODERN */}
         <section id="formula" className="py-20 md:py-28 lg:py-32 bg-[#F8FBFF]">
            <div className="max-w-7xl mx-auto px-6">
               {/* Centered Header Inspired by Reference */}
               <div className="text-center mb-8 md:mb-12 space-y-6">
                  <span className="text-lg md:text-xl font-black uppercase tracking-[0.3em] text-[#0D47A1]">What’s Inside ChronoNAD+?</span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] tracking-tight leading-[1.1]">
                     Nothing But Natural, Science-Backed Ingredients
                  </h2>
                  <div className="pt-4">
                     <p className="text-base md:text-lg text-gray-500 font-bold max-w-4xl mx-auto leading-relaxed">
                        Each bottle contains 45 servings (90 capsules). <br className="hidden md:block" />
                        Simply take 2 capsules daily and enjoy the cellular benefits.
                     </p>
                  </div>
               </div>

               {/* Open Grid Layout */}
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-20 items-center">
                  {/* Left: Supplement Facts Label */}
                  <div className="flex justify-center lg:justify-end">
                     <div className="w-full max-w-lg">
                        <img
                           src={supplementFacts}
                           alt="ChronoNAD+ Supplement Facts"
                           className="w-full h-auto shadow-md border border-gray-100 rounded-3xl"
                        />
                     </div>
                  </div>

                  {/* Right: Product Bottle */}
                  <div className="flex justify-center lg:justify-start">
                     <div className="relative w-full max-w-md lg:-ml-12 pt-12 md:pt-16">
                        <div className="relative">
                           {/* Grounded Surface Shadow */}
                           <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[85%] h-12 bg-black/5 blur-2xl rounded-[100%] -z-10"></div>
                           
                           <img
                              src="/Product1.png"
                              alt="ChronoNAD+ Bottle"
                              className="w-full h-auto object-contain drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)] relative z-10"
                           />
                        </div>
                     </div>
                  </div>
               </div>


            </div>
         </section>

         {/* MISSION & EXPERT TEAM SECTION - REFINED CLINICAL PREMIUM */}
         <section id="team" className="py-0 overflow-hidden bg-white">
            {/* Mission Header Bar */}
            <div className="bg-white pt-12 pb-6 md:pt-16 md:pb-8 border-y border-gray-50">
               <div className="max-w-7xl mx-auto px-6 text-center space-y-8">
                  <h2 className="text-lg md:text-xl font-black text-[#0D47A1] uppercase tracking-[0.4em] font-heading">
                     Our Core Mission
                  </h2>
                  <p className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] max-w-5xl mx-auto tracking-tight">
                     Helping 50,000,000 Women <br className="hidden md:block" />
                     Restore Their <span className="italic text-[#0D47A1] font-semibold">Cellular Youth.</span>
                  </p>
                  <p className="text-lg md:text-xl text-gray-400 font-medium">
                     And Reclaim Their Peak.
                  </p>
               </div>
            </div>

            {/* Scientific Leadership - Dr. Anthony Njapa */}
            <div className="pt-8 pb-16 md:pt-12 md:pb-20 bg-white">
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
                                  <p className="text-sm font-black uppercase tracking-[0.3em] text-blue-400/80 font-accent">Clinical Background</p>
                               </div>
                               <p className="text-2xl md:text-3xl font-black tracking-tight text-white">22+ Years <span className="block text-blue-400 font-medium italic text-xl">in Medicine</span></p>
                            </div>
                         </motion.div>
                     </div>

                     {/* Right Column: Text Content */}
                     <div className="mt-12 lg:mt-0 lg:pl-10">


                        <h3 className="text-4xl md:text-5xl font-black text-[#002855] mb-8 font-heading tracking-tight">
                           Dr. Anthony Njapa
                        </h3>

                        <p className="text-xl md:text-2xl text-gray-600 font-medium leading-relaxed mb-12">
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
                  <span className="text-lg md:text-xl font-black uppercase tracking-[0.4em] text-[#0D47A1] block">Still Not Sure?</span>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#111827] leading-[1.1] tracking-tight max-w-2xl mx-auto">
                     Here Are The Top 10 Questions We Get <br className="hidden md:block" />
                     About ChronoNAD+
                  </h2>
               </div>

               <div className="space-y-4">
                  {[
                     { q: "HOW QUICKLY WILL I NOTICE THE SYSTEMIC SHIFT?", a: "Most users report a noticeable increase in mental clarity and steady, all-day energy within the first 7-14 days. For deep cellular repair and metabolic optimization, we recommend consistent use for at least 60-90 days to allow coenzyme levels to fully stabilize." },
                     { q: "IS THE CHRONONAD+ PROTOCOL SAFE WITH OTHER MEDICATIONS?", a: "ChronoNAD+ is formulated with ultra-pure, clinical-grade ingredients. However, as with any advanced supplementation, we recommend consulting your physician before beginning the protocol, especially if you are currently taking prescription medication." },
                     { q: "WHAT HAPPENS IF I MISS A DAILY DOSAGE?", a: "Consistency is the foundation of cellular health. If you miss a day, simply resume your protocol the following morning. There is no need to double the dose; your body responds best to a steady, daily rhythm of replenishment." },
                     { q: "WHY THE 4-BOTTLE PROTOCOL FOR OPTIMAL TRANSFORMATION?", a: "True biological transformation takes time. While early benefits are felt quickly, the 4-bottle protocol (120 days) is designed to facilitate complete cellular turnover and lock in your new baseline of vitality, ensuring long-term systemic resilience." },
                     { q: "CAN I TAKE CHRONONAD+ ON AN EMPTY STOMACH?", a: "Yes, our clinical-grade capsules are designed for optimal absorption and are generally well-tolerated on an empty stomach. However, if you have a sensitive digestive system, taking your dosage with a light meal is perfectly acceptable." },
                     { q: "IS THIS PRODUCT SUITABLE FOR VEGANS?", a: "Absolutely. ChronoNAD+ utilizes 100% plant-based, vegan-friendly capsules and is free from any animal-derived ingredients, ensuring it aligns with a clean and conscious lifestyle." },
                     { q: "WHAT IS THE BEST TIME OF DAY TO TAKE THE PROTOCOL?", a: "For optimal results, we recommend taking your capsules in the morning. This aligns with your body's natural circadian rhythm and ensures the NAD+ boost supports your peak energy needs throughout the day." },
                     { q: "WHERE IS CHRONONAD+ MANUFACTURED?", a: "ChronoNAD+ is proudly manufactured in a state-of-the-art, GMP-certified facility right here in the USA. We adhere to the strictest quality control standards to ensure every bottle meets our clinical-grade specifications." },
                     { q: "DOES THIS CONTAIN ANY CAFFEINE OR STIMULANTS?", a: "No. ChronoNAD+ provides a clean, cellular energy boost without the use of caffeine or synthetic stimulants. You will experience steady vitality without the jitters or the 'crash' associated with traditional energy products." },
                     { q: "WHAT IS THE SHELF LIFE OF EACH BOTTLE?", a: "Each bottle of ChronoNAD+ is stamped with an expiration date, typically 2 years from the date of manufacture. To maintain maximum potency, store your bottle in a cool, dry place away from direct sunlight." }
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
