import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Harmony() {
  const navigate = useNavigate()
  const [activeFaq, setActiveFaq] = useState(null)

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }
  
  const [isMobile, setIsMobile] = useState(false)

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

  const productImg = isMobile ? "/mobilehero.png" : "/60_Capsules.jpg"

  return (
    <div className="font-sans antialiased text-[#1A237E] bg-white selection:bg-[#0D47A1] selection:text-white">
      
      {/* HERO SECTION - SKY, BLUE & PINK (NO BLACK) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden py-16 lg:py-20 px-6">
         {/* Subtle Background Clinical Grid - Deep Blue */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0D47A1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         
         <div className="max-w-7xl mx-auto relative z-10 w-full">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
            >
                {/* Left Column: Text Content */}
                <div className="text-center lg:text-left space-y-8 relative">
                   <div className="space-y-6 relative z-10">
                      <motion.div 
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.2 }}
                         className="inline-flex items-center gap-3 bg-white border border-gray-100 text-[#0D47A1] px-4 py-1.5 rounded-full shadow-sm"
                      >
                         <div className="w-1.5 h-1.5 rounded-full bg-[#F06292] animate-pulse"></div>
                         <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] italic">Protocol Access Enabled</span>
                      </motion.div>

                      <motion.h1 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.3 }}
                         className="text-4xl md:text-7xl font-black text-[#1A237E] leading-[1.05] mb-10 tracking-tighter font-serif"
                      >
                         The Future of <br />
                         <span className="italic text-[#F06292] font-medium">Cellular Vitality.</span>
                      </motion.h1>

                      <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.4 }}
                         className="space-y-3 max-w-2xl mx-auto lg:mx-0 border-l-2 border-gray-100 pl-6"
                      >
                         <p className="text-sm md:text-lg text-[#283593]/80 font-medium leading-relaxed">
                            Groundbreaking research identifies declining NAD+ as the <span className="text-[#F06292] font-black underline decoration-2 underline-offset-4 decoration-[#F06292]/10">"hidden driver"</span> of visible aging. Restore your cellular battery from within.
                         </p>
                         <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">
                            Metabolic Baseline Shift // Established Mid-20s
                         </p>
                      </motion.div>
                   </div>

                   {/* Modern Benefits Spec-Sheet - Constant Colors */}
                   <div className="space-y-4 pt-2 relative z-10">
                      <div className="flex items-center gap-4 mb-4">
                         <div className="h-px flex-1 bg-gray-100"></div>
                         <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.5em]">Systemic Benefits</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                         {[
                            { text: "Deep Cellular Activation", color: "bg-blue-50/50 border-blue-100/50" },
                            { text: "Luminous Skin Complexion", color: "bg-pink-50/50 border-pink-100/50" },
                            { text: "Peak Biological Energy", color: "bg-orange-50/50 border-orange-100/50" },
                            { text: "Metabolic Rhythm Support", color: "bg-indigo-50/50 border-indigo-100/50" },
                            { text: "Mental Clarity & Focus", color: "bg-teal-50/50 border-teal-100/50" }
                         ].map((benefit, i) => (
                            <motion.div 
                               key={i}
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 0.5 + (i * 0.1) }}
                               className={`flex items-center gap-2.5 p-2.5 rounded-lg border ${benefit.color} shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-500 cursor-default group`}
                            >
                               <div className="w-7 h-7 rounded-md bg-[#E8F5E9] text-[#43A047] flex items-center justify-center shrink-0 group-hover:bg-[#43A047] group-hover:text-white transition-colors duration-500">
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                               </div>
                               <span className="text-[12px] md:text-[13px] text-[#1A237E] font-black tracking-tight">{benefit.text}</span>
                            </motion.div>
                         ))}
                      </div>
                   </div>

                   <div className="flex flex-col items-center lg:items-start gap-5 pt-2">
                      <motion.button 
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                         onClick={scrollToProducts}
                         className="min-w-[280px] bg-[#0D47A1] text-white font-black text-base px-8 py-5 rounded-xl uppercase tracking-widest hover:bg-[#1A237E] transition-all duration-300 shadow-xl flex items-center justify-center group relative overflow-hidden"
                      >
                         <span className="relative z-10">Start My Protocol</span>
                         <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      </motion.button>
                      <div className="flex items-center gap-2 text-[#0D47A1]/40 text-[10px] font-black uppercase tracking-widest">
                         <div className="w-4 h-4 bg-[#4CAF50] rounded flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                         </div>
                         <span>60 Day Money Back Guarantee</span>
                      </div>
                   </div>
                </div>

               {/* Right Column: Transformation Graphic */}
               <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#E3F2FD] to-[#FCE4EC] rounded-[4rem] blur-[80px] opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-white rounded-[4rem] p-4 shadow-2xl border border-white overflow-hidden transform hover:scale-[1.02] transition-transform duration-700">
                     <div className="absolute top-6 left-6 z-20">
                        <span className="bg-[#0D47A1] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg">Clinical Observation</span>
                     </div>
                     <img 
                        src="/transformation_hero.png" 
                        alt="Cellular Transformation Progress" 
                        className="w-full h-auto object-contain mix-blend-multiply"
                     />
                     {/* Floating Labels */}
                     <div className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-gray-100 flex flex-col">
                        <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1">Baseline</span>
                        <span className="text-sm font-black text-[#1A237E]">Without NAD+</span>
                     </div>
                     <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl border border-[#F06292]/20 flex flex-col">
                        <span className="text-[9px] font-black text-[#F06292] uppercase tracking-widest mb-1">Optimal</span>
                        <span className="text-sm font-black text-[#1A237E]">With NAD+</span>
                     </div>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* FEATURED IN SECTION */}
      <section className="py-24 bg-white border-b border-gray-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Clinical Recognition</span>
               <h2 className="text-3xl md:text-5xl font-black text-[#1A237E] leading-tight tracking-tight font-serif">
                  Recognized by the <br />
                  <span className="italic text-[#F06292] font-medium">Industry Leaders</span>
               </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
               {[
                  { name: "COSMOPOLITAN", quote: "It made me so calm and centred, my husband instantly noticed the change.", style: "font-black tracking-tighter" },
                  { name: "Women's Health", quote: "My confidence is back. My belly feels flat. And I feel like myself again!", style: "font-serif font-black" },
                  { name: "VOGUE", quote: "Most effective dietary supplements I've discovered recently, and a real game-changer for me.", style: "font-serif tracking-[0.2em] font-medium" },
                  { name: "marie claire", quote: "Marie Claire's Picks for Perimenopause", style: "font-serif font-black lowercase" },
                  { name: "USA TODAY", quote: "My happiness is returning and my body is stronger. I'm absolutely blown away by how fast it works!", style: "font-black tracking-tight" },
                  { name: "BODY+SOUL", quote: "My tummy is definitely better than it was, which is nothing less than a freaking miracle.", style: "font-serif font-bold italic tracking-tighter" }
               ].map((item, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     className="flex flex-col items-center text-center space-y-6 group px-4 py-8 rounded-3xl hover:bg-gray-50/50 transition-all duration-500"
                  >
                     <div className={`text-xl md:text-2xl uppercase ${item.style} text-[#111827] group-hover:scale-105 transition-transform duration-500`}>
                        {item.name}
                     </div>
                     <p className="text-[11px] md:text-xs text-gray-500 font-medium leading-relaxed italic group-hover:text-gray-900 transition-colors duration-500">
                        "{item.quote}"
                     </p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>


      {/* TESTIMONIALS SECTION - PIXEL PERFECT TO SCREENSHOT */}
      <section className="py-24 bg-[#F9FBFA] overflow-hidden relative">
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            
            {/* Header Area */}
            <div className="text-center mb-16 space-y-6">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Clinical Trust</span>
               <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-[1.05] tracking-tight font-serif">
                  Beat Hormonal Weight, <br className="hidden md:block" />
                  <span className="italic text-[#F06292] font-medium">Cortisol Belly, Moon Face,</span> <br className="hidden md:block" />
                  and Double Chin
               </h2>
               <div className="max-w-2xl mx-auto space-y-4">
                  <p className="text-xl text-gray-500 font-medium italic leading-relaxed">
                     Our ingredients are proven in thousands of scientific papers to help optimize hormones for women of all ages... So they can finally end <span className="text-[#1A237E] font-black not-italic">bloating, puffiness, mood swings and poor sleep.</span>
                  </p>
               </div>
            </div>

            {/* Testimonials Grid */}
            <div className="space-y-6">
               
               {/* 1. Jenna T. - Full Width */}
               <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-100 transition-all duration-500">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center font-black text-gray-300 text-xs">J</div>
                        <div className="flex flex-col">
                           <span className="font-black text-sm text-[#111827]">Jenna T.</span>
                           <div className="flex items-center gap-1 text-[#4CAF50] mt-0.5">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              <span className="text-[8px] font-black uppercase tracking-widest">Verified Buyer</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex text-[#FFC107] gap-0.5">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                     </div>
                  </div>
                  <h4 className="text-lg font-black text-[#111827] mb-3 uppercase tracking-tight">LIFE-CHANGING!!!</h4>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed italic font-medium">
                     "I feel 20yrs younger, I sleep like a baby, my joints feel oiled... and I’ve lost weight without even trying. These capsules are pure magic. 🙌🔥"
                  </p>
               </div>

               {/* 2 & 3. Row of Two */}
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Karen G. */}
                  <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-100 transition-all duration-500">
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center font-black text-gray-300 text-xs">K</div>
                           <div className="flex flex-col">
                              <span className="font-black text-sm text-[#111827]">Karen G.</span>
                              <div className="flex items-center gap-1 text-[#4CAF50] mt-0.5">
                                 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                 <span className="text-[8px] font-black uppercase tracking-widest">Verified Buyer</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex text-[#FFC107] gap-0.5">
                           {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                        </div>
                     </div>
                     <h4 className="text-base font-black text-[#111827] mb-3 tracking-tight">It’s like I’m aging backwards!</h4>
                     <p className="text-[13px] text-gray-500 leading-relaxed italic font-medium">
                        "I feel like I’m glowing from the inside out. My hair’s fuller, my face is tighter, my belly is vanishing...and I feel stronger, sharper, and more alive than I have in YEARS"
                     </p>
                  </div>

                  {/* Tina F. */}
                  <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-100 transition-all duration-500">
                     <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                           <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center font-black text-gray-300 text-xs">T</div>
                           <div className="flex flex-col">
                              <span className="font-black text-sm text-[#111827]">Tina F.</span>
                              <div className="flex items-center gap-1 text-[#4CAF50] mt-0.5">
                                 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                 <span className="text-[8px] font-black uppercase tracking-widest">Verified Buyer</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex text-[#FFC107] gap-0.5">
                           {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                        </div>
                     </div>
                     <h4 className="text-base font-black text-[#111827] mb-3 tracking-tight">I’ll never be without this</h4>
                     <p className="text-[13px] text-gray-500 leading-relaxed italic font-medium">
                        "I was sweating through my pajamas every night and then I’d be exhausted all day, snapping at everyone. Two weeks into this, I’m sleeping better, I feel calm..."
                     </p>
                  </div>
               </div>

               {/* 4. Deb A. - Full Width */}
               <div className="bg-white p-8 md:p-10 rounded-[2rem] shadow-[0_10px_30px_rgba(0,0,0,0.02)] border border-gray-100 transition-all duration-500">
                  <div className="flex items-center justify-between mb-8">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center font-black text-gray-300 text-xs">D</div>
                        <div className="flex flex-col">
                           <span className="font-black text-sm text-[#111827]">Deb A.</span>
                           <div className="flex items-center gap-1 text-[#4CAF50] mt-0.5">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              <span className="text-[8px] font-black uppercase tracking-widest">Verified Buyer</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex text-[#FFC107] gap-0.5">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                     </div>
                  </div>
                  <h4 className="text-lg font-black text-[#111827] mb-3 tracking-tight">I finally feel like ME again.</h4>
                  <p className="text-sm md:text-base text-gray-500 leading-relaxed italic font-medium">
                     "I didn’t expect much. Just figured I’d try it because I was desperate. But WOW... My pants are looser, my brain fog is gone and my energy is back. Reordering now."
                  </p>
               </div>

            </div>

            {/* CTA Area */}
            <div className="mt-20 flex flex-col items-center gap-6">
               <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={scrollToProducts}
                  className="w-full md:w-auto min-w-[380px] bg-[#1A237E] text-white font-black text-xl px-12 py-7 rounded-2xl uppercase tracking-widest shadow-xl"
               >
                  Try Our Protocols
               </motion.button>
               <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                  <div className="w-5 h-5 bg-[#4CAF50] rounded flex items-center justify-center">
                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span>60 Day Money Back Guarantee</span>
               </div>
            </div>

         </div>
      </section>



      {/* THE SILENT DRIVER - PREMIUM REDESIGN */}
      <section className="py-32 bg-white overflow-hidden relative">
         <div className="max-w-7xl mx-auto px-6 relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="text-center mb-24 max-w-4xl mx-auto"
            >
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 mb-8 block">The Silent Driver</span>
               <h2 className="text-4xl md:text-7xl font-black text-[#1A237E] leading-[1] tracking-tighter mb-10 font-serif">
                  As You Age, Your Body’s <br />
                  <span className="italic text-[#F06292] font-medium">NAD+ Levels Plummet...</span>
               </h2>
               <p className="text-xl md:text-2xl text-gray-500 font-medium italic leading-relaxed">
                  And that’s when <span className="text-[#1A237E] font-black not-italic">everything changes</span> in your cells.
               </p>
            </motion.div>

            {/* Before & After Cellular Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-24">
               {[
                  { 
                     from: "Persistent Brain Fog & Midday Crashes", 
                     to: "Sharp Focus & Resilient Energy",
                     label: "Cognitive Baseline",
                     bgColor: "bg-[#E3F2FD]/30",
                     accent: "#0D47A1"
                  },
                  { 
                     from: "Slow Recovery & Dull, Aging Skin", 
                     to: "Rapid Cellular Renewal & Youthful Glow",
                     label: "Cellular Renewal",
                     bgColor: "bg-[#FFF3E0]/30",
                     accent: "#F06292"
                  },
                  { 
                     from: "Unexplained Fatigue & Physical \"Heavy\" Feeling", 
                     to: "Systemic Vitality & Effortless Movement",
                     label: "Physical Resilience",
                     bgColor: "bg-[#FCE4EC]/30",
                     accent: "#BA68C8"
                  }
               ].map((item, i) => (
                  <motion.div 
                     key={i} 
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: i * 0.1 }}
                     whileHover={{ y: -10 }}
                     className={`group ${item.bgColor} rounded-[4rem] p-12 border border-gray-50 shadow-sm hover:shadow-[0_40px_80px_rgba(0,0,0,0.04)] transition-all duration-700 relative overflow-hidden`}
                  >
                     <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <span className="text-6xl font-black italic">0{i+1}</span>
                     </div>
                     <div className="space-y-8 relative z-10">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 border-b border-gray-100 pb-2 inline-block">{item.label}</span>
                        <div className="space-y-6">
                           <div className="flex items-start gap-4 opacity-30 group-hover:opacity-20 transition-opacity">
                              <div className="w-6 h-6 rounded-full border border-gray-400 flex items-center justify-center shrink-0 mt-0.5">
                                 <span className="text-[10px]">✕</span>
                              </div>
                              <p className="text-base font-medium line-through decoration-gray-300 text-gray-600">{item.from}</p>
                           </div>
                           <div className="flex items-start gap-4 text-[#1A237E]">
                              <div className="w-6 h-6 rounded-full bg-[#66CDAA] flex items-center justify-center shrink-0 mt-1 shadow-lg shadow-[#66CDAA]/20">
                                 <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                              </div>
                              <p className="text-2xl font-black leading-tight tracking-tight">{item.to}</p>
                           </div>
                        </div>
                     </div>
                  </motion.div>
               ))}
            </div>

            <motion.div 
               initial={{ opacity: 0, scale: 0.95 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               className="max-w-4xl mx-auto bg-[#E3F2FD]/30 p-16 rounded-[5rem] border border-[#E3F2FD] shadow-xl relative overflow-hidden group"
            >
               <div className="absolute -top-16 -right-16 text-[18rem] font-serif font-black italic text-[#E3F2FD]/40 pointer-events-none">“</div>
               <p className="text-3xl md:text-4xl font-serif italic text-[#1A237E] leading-relaxed relative z-10">
                  "It's not just a lack of sleep—it's a hormonal and cellular storm. You feel <span className="text-[#0D47A1] font-black not-italic underline decoration-[#E3F2FD] decoration-8 underline-offset-4">wired but tired</span>, unable to recover no matter how much you rest, and your skin begins to lose the 'bounce' it had in your 20s."
               </p>
            </motion.div>
         </div>
      </section>


      {/* THE INTERNAL STRUGGLE - WHY SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32">
             <div className="space-y-12">
                <div className="space-y-6">
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">The Internal Struggle</span>
                   <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-tight tracking-tight font-serif mb-6">
                      Why Clean Eating <br />
                      <span className="italic text-[#F06292] font-medium">Is No Longer Enough.</span>
                   </h2>
                </div>

                <div className="space-y-10">
                   <div className="group">
                      <p className="text-sm font-black text-[#0D47A1] uppercase tracking-widest mb-4">Problem Block 1: The Energy Drain</p>
                      <p className="text-xl md:text-2xl text-gray-500 font-medium italic leading-relaxed">
                         <span className="text-[#1A237E] font-black not-italic">Depleted NAD+ levels</span> leave your mitochondrial "batteries" empty. This is why you feel exhausted even after a full night's sleep.
                      </p>
                   </div>

                   <div className="group">
                      <p className="text-sm font-black text-[#0D47A1] uppercase tracking-widest mb-4">Problem Block 2: The Repair Stall</p>
                      <p className="text-xl md:text-2xl text-gray-500 font-medium italic leading-relaxed">
                         <span className="text-[#1A237E] font-black not-italic">Longevity genes (Sirtuins)</span> go dormant without fuel, meaning your body stops repairing DNA damage effectively, accelerating the visible signs of aging.
                      </p>
                   </div>
                </div>
             </div>

             <div className="bg-gray-50/50 p-12 md:p-16 rounded-[4rem] border border-gray-100">
                <h4 className="text-xl font-black text-[#1A237E] uppercase tracking-widest mb-10 text-center">IF YOU’VE WITNESSED...</h4>
                <div className="space-y-8">
                   {[
                     "The \"Afternoon Slump\" hitting harder than ever...",
                     "Recovery times doubling after a simple workout...",
                     "Skin texture changing and losing its natural luminosity...",
                     "A mind that feels like it's operating through a thick fog..."
                   ].map((item, i) => (
                      <div key={i} className="flex items-center gap-6 group">
                         <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center shrink-0 group-hover:border-[#0D47A1] transition-colors">
                            <span className="text-sm">➡️</span>
                         </div>
                         <p className="text-lg font-bold text-[#1A237E]">{item}</p>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="max-w-4xl mx-auto text-center space-y-16">
             <div className="space-y-6">
                <p className="text-2xl md:text-3xl font-serif italic text-[#1A237E] leading-tight">
                   “Caffeine and clean eating just won't cut it anymore. <span className="text-[#F06292]">They provide temporary sparks, but they don't fix the empty fuel tank at the root of your cells.”</span>
                </p>
             </div>

             <div className="space-y-8">
                <p className="text-3xl md:text-4xl font-black text-[#1A237E] leading-tight">
                   Fortunately—there’s a way to reverse that.
                </p>
                <p className="text-xl text-gray-500 font-medium italic max-w-2xl mx-auto">
                   It starts by going to the root cause: <span className="text-[#0D47A1] font-black not-italic underline decoration-[#E3F2FD] decoration-8 underline-offset-4">Restoring your cellular NAD+ battery</span> and <span className="text-[#0D47A1] font-black not-italic underline decoration-[#E3F2FD] decoration-8 underline-offset-4">Re-activating the genes</span> your body is now missing.
                </p>
             </div>

             <div className="flex flex-col items-center gap-6">
                <button 
                  onClick={scrollToProducts}
                  className="w-full md:w-auto min-w-[380px] bg-[#0D47A1] text-white font-black text-xl px-12 py-8 rounded-[2.5rem] uppercase tracking-widest hover:bg-[#F06292] transition-all duration-300 shadow-2xl flex items-center justify-center group"
                >
                  LOVE YOUR VITALITY AGAIN
                  <svg className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
                <div className="flex items-center gap-3">
                   <div className="w-5 h-5 rounded-full bg-[#0D47A1] flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                   </div>
                   <span className="text-[10px] font-bold text-[#1A237E] italic uppercase tracking-widest">60 Day Clinical Efficacy Guarantee</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* SOLUTION REVEAL SECTION - OPTIMIZED FOR VISIBILITY */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-white border-y border-gray-50 overflow-hidden py-16 lg:py-20 px-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-block mb-6">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">The Breakthrough</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl lg:text-[4.5rem] font-black text-[#1A237E] leading-[1.0] mb-8 tracking-tight font-serif max-w-5xl mx-auto">
               Restore Your <span className="italic text-[#F06292] font-medium">Cellular Battery</span> <br className="hidden md:block" />
               & Activate Vitality
            </h2>
            <p className="text-xl text-gray-500 font-medium italic leading-relaxed">Stay Systemically Vibrant & Resilient with <span className="text-[#1A237E] font-black not-italic">ChronoNAD+</span></p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16 lg:mb-20">
             {/* Product Visual Area - Compact Luxury */}
              <div className="w-full lg:w-[45%]">
                  <div className="relative w-full aspect-square flex items-center justify-center group bg-white rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
                     <img 
                       src="/60_Capsules.jpg" 
                       alt="ChronoNAD+ Advanced Protocol" 
                       className="w-[85%] h-[85%] object-contain transform group-hover:scale-105 transition-all duration-[3000ms] mix-blend-multiply"
                     />
                     {/* Optional: Add a subtle glow behind the image instead of a card */}
                     <div className="absolute inset-0 bg-[#0D47A1]/5 rounded-full blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
                     
                     <div className="absolute top-6 right-6 bg-[#0D47A1] text-white px-6 py-2 rounded-full shadow-xl z-20">
                        <span className="text-[10px] font-black uppercase tracking-widest">Clinical Strength</span>
                     </div>
                  </div>
              </div>

             {/* Science & Proof Copy - Compact Editorial */}
             <div className="w-full lg:w-[60%] space-y-10 text-left">
                <div className="space-y-4">
                   <h3 className="text-xl md:text-2xl font-bold text-[#1A237E] leading-tight font-serif italic">“We have finally done it.”</h3>
                   <p className="text-base md:text-lg text-gray-500 leading-relaxed font-light">
                      We have spent the last <span className="font-bold text-[#1A237E]">20+ years on the cutting-edge</span> of NAD+ and cellular longevity science to develop a protocol that doesn't just mask aging, but addresses it at the source.
                   </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                   {[
                     { title: "The First of Its Kind:", text: "After decades of clinical research, we created the world’s first dual-action cellular protocol that combines pure NAD+ fuel with a Sirtuin activator." },
                     { title: "Clinical Synergy:", text: "A synergistic blend of clinically-backed nutrients targeting the root cause of biological decline—mitochondrial efficiency." },
                     { title: "Total Vitality:", text: "Eliminate mental fog and persistent physical fatigue as quickly, effectively, and safely as possible." }
                   ].map((item, i) => (
                      <div key={i} className="flex items-start gap-5 group">
                         <span className="text-3xl font-serif text-[#1A237E]/5 font-black italic group-hover:text-[#1A237E]/10 transition-colors">0{i+1}</span>
                         <div className="space-y-1">
                            <p className="text-sm font-black text-[#1A237E] uppercase tracking-widest">{item.title}</p>
                            <p className="text-base md:text-lg text-[#1F2937] leading-relaxed">{item.text}</p>
                         </div>
                      </div>
                   ))}
                </div>
             </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={scrollToProducts}
              className="min-w-[340px] bg-[#0D47A1] text-white font-black text-lg px-10 py-6 rounded-2xl uppercase tracking-widest hover:bg-[#F06292] transition-all duration-300 shadow-2xl flex items-center justify-center group"
            >
              START YOUR PROTOCOL
              <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <div className="flex items-center gap-2 text-gray-400">
               <div className="w-4 h-4 rounded-full bg-[#0D47A1] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
               </div>
               <span className="text-[10px] font-bold text-[#1A237E] italic uppercase tracking-widest">60 Day Clinical Efficacy Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* BREAKTHROUGHS SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] mb-6 leading-tight tracking-tight font-serif">
            20+ Years. 6 Discoveries. <br />
            <span className="italic text-gray-400 font-medium">One Perfect Solution.</span>
          </h2>
          <div className="flex items-center justify-center gap-4">
             <div className="h-[1px] w-12 bg-gray-200"></div>
             <span className="text-xs font-black uppercase tracking-[0.4em] text-[#1A237E]">LOCKED IN A SINGLE CAPSULE</span>
             <div className="h-[1px] w-12 bg-gray-200"></div>
          </div>
        </div>

        {/* 6 Discoveries List - Inspired by Reference UI */}
        <div className="max-w-5xl mx-auto space-y-4 mb-32">
           {[
             { 
               num: "1", 
               label: "Genomic Stability",
               text: "NAD+ is required for enzymes called PARPs, which identify and repair routine DNA strand breaks, helping maintain your body’s natural genomic integrity."
             },
             { 
               num: "2", 
               label: "Cellular Energy",
               text: "Mitochondria rely on NAD+ to convert nutrients into ATP. Our formula supports the mitochondrial enzymes responsible for consistent, all-day power generation."
             },
             { 
               num: "3", 
               label: "Cellular Repair",
               text: "Activates the sirtuin \"longevity genes\" that regulate protein quality-control, helping cells clean up and recycle damaged proteins for deep renewal."
             },
             { 
               num: "4", 
               label: "Healthy Communication",
               text: "Helps coordinate chemical messengers between cells to maintain tissue balance and support balanced cellular signaling across the entire body."
             },
             { 
               num: "5", 
               label: "Nutrient Sensing",
               text: "Supports the pathways that regulate metabolism and stress resistance, ensuring your cells respond efficiently to energy availability and metabolic needs."
             },
             { 
               num: "6", 
               label: "Cellular Senescence",
               text: "Plays a critical role in regulating healthy cell turnover and renewal, supporting balanced cellular aging and long-term systemic vitality."
             }
           ].map((item, i) => (
             <motion.div 
               key={i} 
               initial={{ opacity: 0, x: -20 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               className={`flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 hover:shadow-lg border border-white/50 ${
                 [
                   'bg-[#E3F2FD]/40', // Soft Blue
                   'bg-[#FFF3E0]/40', // Soft Peach
                   'bg-[#FCE4EC]/40', // Soft Pink
                   'bg-[#E8F5E9]/40', // Soft Green
                   'bg-[#F3E5F5]/40', // Soft Purple
                   'bg-[#E1F5FE]/40'  // Soft Sky
                 ][i % 6]
               }`}
             >
                {/* Number Section */}
                <div className="flex flex-col items-center md:items-start shrink-0">
                   <span className={`text-[10px] font-black uppercase tracking-[0.2em] mb-1 ${
                     [
                       'text-[#0288D1]', 
                       'text-[#E65100]', 
                       'text-[#F06292]',
                       'text-[#43A047]',
                       'text-[#8E24AA]',
                       'text-[#039BE5]'
                     ][i % 6]
                   }`}>Breakthrough</span>
                   <span className={`text-8xl md:text-9xl font-serif font-black leading-none ${
                     [
                       'text-[#0288D1]', 
                       'text-[#E65100]', 
                       'text-[#F06292]',
                       'text-[#43A047]',
                       'text-[#8E24AA]',
                       'text-[#039BE5]'
                     ][i % 6]
                   }`}>{item.num}</span>
                </div>

                
                {/* Content Section */}
                <div className="flex-grow pt-4 md:pt-10 text-center md:text-left">
                   <h3 className="text-xl md:text-2xl font-black text-[#1A237E] uppercase tracking-widest mb-4 font-serif italic hidden">{item.label}</h3>
                   <p className="text-xl md:text-2xl text-[#1A237E] leading-relaxed font-medium">
                      {item.text}
                   </p>
                </div>
             </motion.div>
           ))}
        </div>

          {/* Undeniable Results Box - Redesigned for High Authority */}
          <div className="bg-[#0D47A1] text-white p-12 md:p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden mb-20 group">
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50"></div>
             
             <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                <div className="shrink-0 relative">
                   {/* Graphical Indicator */}
                   <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[8px] border-white/10 flex flex-col items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-[8px] border-white border-t-transparent border-l-transparent rotate-[45deg]"></div>
                      <span className="text-5xl md:text-7xl font-serif italic font-black leading-tight mb-1">94%</span>
                       <span className="text-[7px] md:text-[9px] font-black uppercase tracking-[0.2em] text-center px-4 leading-tight max-w-[120px] opacity-80">
                          Verified <br /> Recommendation
                       </span>
                   </div>
                </div>
                
                <div className="flex-grow space-y-6 text-center lg:text-left">
                   <div className="inline-block px-4 py-1 bg-white/10 rounded-full mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">SCIENTIFIC SPOTLIGHT</span>
                   </div>
                   <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">UNDENIABLE CLINICAL RESULTS</h4>
                   <p className="text-lg md:text-xl leading-relaxed text-gray-400 italic font-light max-w-2xl">
                      “In clinical observations, 94% of users reported a dramatic shift in cellular energy, mental clarity, and metabolic resilience while following the ChronoNAD+ protocol.”
                   </p>
                   <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-8 opacity-50">
                      <span className="text-xs font-black uppercase tracking-widest">USA MANUFACTURED</span>
                      <span className="text-xs font-black uppercase tracking-widest">THIRD-PARTY TESTED</span>
                      <span className="text-xs font-black uppercase tracking-widest">GMP CERTIFIED</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={scrollToProducts}
              className="w-full md:w-auto min-w-[400px] bg-[#0D47A1] text-white font-black text-xl md:text-2xl px-12 py-8 rounded-2xl uppercase tracking-widest hover:bg-[#F06292] transition-all duration-300 shadow-2xl flex items-center justify-center group"
            >
              Start Your Protocol
              <svg className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded bg-[#0D47A1] flex items-center justify-center">
                 <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-lg font-bold text-[#1A237E] italic">60 Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* PROTOCOL & INGREDIENTS SECTION */}
      <section className="py-24 bg-white border-y border-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24">
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               className="inline-block mb-10"
            >
               <div className="bg-[#0D47A1] text-white px-10 py-4 rounded-full shadow-2xl">
                  <span className="text-3xl md:text-4xl font-black uppercase tracking-[0.1em]">2 Capsules A Day</span>
               </div>
            </motion.div>
            
            <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-[1.05] mb-8 tracking-tight font-serif max-w-4xl mx-auto">
               Revitalize Your <br />
               <span className="italic text-gray-400 font-medium">Cellular Battery...</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium italic max-w-2xl mx-auto leading-relaxed">
               Sustained Energy, Mental Clarity, and Deep Cellular Repair. Addressing the root cause of biological decline.
            </p>
          </div>

           {/* Protocol Grid - Optimized with Authentic Imagery Overlays */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 max-w-6xl mx-auto px-4">
              {[
                { 
                  icon: "🧬", 
                  title: "DUAL-ACTION FORMULA", 
                  text: "Combining pure NAD+ fuel with a Sirtuin activator for maximum systemic efficacy.",
                  img: "/protocol_dual_action_1777055664316.png"
                },
                { 
                  icon: "🔬", 
                  title: "CLINICAL AUTHORITY", 
                  text: "Backed by 20+ years of peer-reviewed research and globally recognized longevity science.",
                  img: "/protocol_clinical_authority_1777055686381.png"
                },
                { 
                  icon: "⚡", 
                  title: "PRECISE BIOAVAILABILITY", 
                  text: "Formulated at doses clinically proven to bypass the digestive tract and enter the cell directly.",
                  img: "/protocol_bioavailability_1777055701538.png"
                },
                { 
                  icon: "🌟", 
                  title: "SYSTEMIC VITALITY", 
                  text: "Addresses the root cause of aging while actively supporting cognitive function and metabolic health.",
                  img: "/protocol_vitality_1777055714038.png"
                }
              ].map((item, i) => (
                <div key={i} className="relative aspect-[16/9] md:aspect-[4/3] lg:aspect-[16/10] rounded-[3rem] overflow-hidden shadow-2xl group border border-white/10">
                   {/* Background Image Layer */}
                   <div className="absolute inset-0">
                      <img 
                        src={item.img} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-[3000ms] group-hover:scale-110" 
                      />
                      {/* Deep Clinical Overlay for Legibility */}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#1A237E]/90 via-[#1A237E]/40 to-transparent"></div>
                   </div>

                   {/* Content Overlay */}
                   <div className="relative z-10 h-full flex flex-col justify-end p-10 md:p-12">
                      <h4 className="text-sm font-black text-white uppercase tracking-widest mb-3">{item.title}</h4>
                      <p className="text-blue-50/80 leading-relaxed font-medium text-lg md:text-xl max-w-md">{item.text}</p>
                   </div>
                </div>
              ))}
           </div>

          <div className="h-[1px] w-40 bg-gray-100 mx-auto mb-24"></div>

          <div className="text-center mb-20">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 mb-6 block">The Cellular System</span>
              <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-tight tracking-tight font-serif">
                 Two Pillars of <br />
                 <span className="italic text-[#F06292] font-medium">Human Longevity</span>
              </h2>
          </div>

           {/* Ingredients Showcase - Optimized with Realistic Clinical Imagery */}
           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 px-4">
              {[
                {
                  name: "NMN / NR (The Cellular Fuel)",
                  focus: "ACTIVATE REPAIR",
                  desc: "Acts as the direct precursor to NAD+, entering the cell and refilling your \"cellular battery\" to power DNA repair and metabolic function.",
                  img: "/ingredient_nmn_powder_1777056026246.png"
                },
                {
                  name: "RESVERATROL (The Accelerator)",
                  focus: "OPTIMIZE PERFORMANCE",
                  desc: "A potent activator of Sirtuins—your body's longevity genes—that signal your cells to use NAD+ fuel for deep maintenance and renewal.",
                  img: "/ingredient_resveratrol_powder_1777056040092.png"
                },
                {
                  name: "99%+ PURITY GUARANTEE",
                  focus: "CLINICAL PRECISION",
                  desc: "Third-party tested for maximum purity. No proprietary blends, no fillers, and no artificial ingredients. Just what your cells need.",
                  img: "/ingredient_purity_seal_1777056058938.png"
                }
              ].map((ing, i) => (
                <div key={i} className="flex flex-col bg-white border border-gray-100 rounded-[3rem] overflow-hidden group hover:shadow-2xl transition-all duration-500">
                   <div className="aspect-square relative overflow-hidden">
                      <img 
                        src={ing.img} 
                        alt={ing.name} 
                        className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                      />
                      {/* Subtle Glassmorphic Overlay for "High Potency" */}
                      <div className="absolute top-6 left-6 bg-white/80 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/40 shadow-sm opacity-0 group-hover:opacity-100 transition-opacity">
                         <span className="text-[9px] font-black uppercase tracking-widest text-[#1A237E] italic">High Potency</span>
                      </div>
                   </div>
                   <div className="p-10 space-y-5">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ingredient {i+1}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#0D47A1] font-bold border-b-2 border-[#E3F2FD] pb-1">{ing.focus}</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-black text-[#1A237E] font-serif italic leading-[1.1]">{ing.name}</h4>
                      <p className="text-gray-500 leading-relaxed font-medium text-lg">{ing.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

       {/* CHRONONAD+ TRANSFORMATION TIMELINE SECTION - REDESIGNED HORIZONTAL */}
       <section className="py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-24 max-w-4xl mx-auto">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 mb-6 block">The Transformation</span>
               <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-[1.05] tracking-tight font-serif mb-8">
                  What To Expect <br />
                  <span className="italic text-[#F06292] font-medium">On Your Journey</span>
               </h2>
              <p className="text-xl text-gray-500 font-medium italic leading-relaxed">
                 Follow the clinical timeline as ChronoNAD+ restores your cellular vitality and resets your biological clock from the inside out.
              </p>
           </div>

           {/* Horizontal Timeline Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
              {[
                { 
                  phase: "01",
                  time: "24 Hours", 
                  label: "THE CELLULAR SPARK",
                  text: "Feel the first wave of mental clarity as your 37.2 trillion cells begin to replenish their vital coenzyme levels. Brain fog starts to lift, and you'll notice a better start to your mornings.",
                  bgColor: "bg-[#0D47A1]",
                  textColor: "text-white",
                  tagColor: "text-blue-200",
                  subTextColor: "text-blue-100/80",
                  borderColor: "border-white/10"
                },
                { 
                  phase: "02",
                  time: "Day 7", 
                  label: "REGENERATIVE FLOW",
                  text: "Consistency is starting to pay off. You’ll notice you aren’t crashing halfway through the day anymore. Energy becomes sustained and stable.",
                  bgColor: "bg-[#E3F2FD]",
                  textColor: "text-[#1A237E]",
                  tagColor: "text-[#0D47A1]",
                  subTextColor: "text-gray-600",
                  borderColor: "border-blue-100"
                },
                { 
                  phase: "03",
                  time: "Day 14", 
                  label: "METABOLIC RESILIENCE",
                  text: "The \"Better Skin From Within\" effect becomes visible. Cellular inflammation subsides, and your skin appears more vibrant and resilient.",
                  bgColor: "bg-[#FFF3E0]",
                  textColor: "text-[#1A237E]",
                  tagColor: "text-[#F57C00]",
                  subTextColor: "text-gray-600",
                  borderColor: "border-orange-100"
                },
                { 
                  phase: "04",
                  time: "Week 4+", 
                  label: "PEAK VITALITY",
                  text: "Experience the full transformation. You feel a profound sense of \"cellular youth\"—balanced, sharp, and physically revitalized.",
                  bgColor: "bg-gradient-to-br from-[#1A237E] to-[#0D47A1]",
                  textColor: "text-white",
                  tagColor: "text-blue-200",
                  subTextColor: "text-blue-100/80",
                  borderColor: "border-white/10"
                }
              ].map((milestone, i) => (
                <motion.div 
                   key={i} 
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   transition={{ duration: 0.8, delay: i * 0.1 }}
                   viewport={{ once: true }}
                   className={`${milestone.bgColor} p-8 rounded-[3rem] border ${milestone.borderColor} shadow-sm hover:shadow-2xl hover:scale-[1.02] transition-all duration-500 group relative overflow-hidden flex flex-col h-full`}
                >
                   {/* Phase Header */}
                   <div className="flex items-center justify-between mb-8">
                      <span className={`text-[10px] font-black uppercase tracking-widest ${milestone.tagColor} border-b-2 border-[#F06292] pb-1`}>{milestone.time}</span>
                      <span className={`text-3xl font-serif font-black italic ${i % 2 === 0 ? 'text-white/20' : 'text-[#1A237E]/10'} group-hover:scale-110 transition-transform`}>{milestone.phase}</span>
                   </div>

                   <div className="flex-grow">
                      <h4 className={`text-xl font-black ${milestone.textColor} font-serif italic leading-tight mb-4`}>{milestone.label}</h4>
                      <p className={`text-base ${milestone.subTextColor} leading-relaxed font-medium`}>
                         {milestone.text}
                      </p>
                   </div>

                   <div className={`mt-8 pt-8 border-t ${i % 2 === 0 ? 'border-white/10' : 'border-black/5'} flex items-center gap-4 text-[9px] font-black uppercase tracking-widest ${milestone.tagColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <span>Milestone Reached</span>
                      <div className="h-[1px] flex-grow bg-[#F06292]/30"></div>
                   </div>
                </motion.div>
              ))}
           </div>

          <div className="flex flex-col items-center gap-6 mt-32">
            <button 
              onClick={scrollToProducts}
              className="w-full md:w-auto min-w-[340px] bg-[#0D47A1] text-white font-black text-xl px-12 py-7 rounded-2xl uppercase tracking-widest hover:bg-[#F06292] transition-all duration-300 shadow-2xl flex items-center justify-center group"
            >
              Try CHRONONAD+
              <svg className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <div className="flex items-center gap-2 text-[#0D47A1]">
               <div className="w-4 h-4 rounded-full bg-[#0D47A1] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
               </div>
               <span className="text-[10px] font-bold uppercase tracking-widest italic">60-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* DESIGNED FOR EVERY BODY SECTION */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center lg:text-left mb-20 max-w-4xl">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Clinically Backed Vitality</span>
             <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-[1.05] tracking-tight font-serif mb-8">
                Designed For Every Body. <br />
                <span className="italic text-[#F06292] font-medium">No Matter The Age.</span>
             </h2>
             <p className="text-xl text-gray-500 font-medium italic max-w-2xl leading-relaxed">
                Whether you’re navigating the daily grind or looking to optimize your long-term health, ChronoNAD+ is engineered to replenish your cellular battery.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
             {/* Benefits List - Redesigned as Premium Cards */}
             <div className="lg:col-span-7 space-y-4">
                {[
                  { 
                    title: "SUSTAINED ENERGY & MENTAL CLARITY", 
                    desc: "Say goodbye to the afternoon slump and persistent brain fog. Replenish your vital coenzyme levels to power your 37.2 trillion cells for consistent, all-day focus and mental sharpness." 
                  },
                  { 
                    title: "DEEP, REGENERATIVE SLEEP CYCLES", 
                    desc: "Harmonize your internal biological rhythms and wake up feeling genuinely refreshed. Support your body’s natural ability to repair and recharge overnight without the need for heavy stimulants." 
                  },
                  { 
                    title: "METABOLIC RESILIENCE & EFFICIENCY", 
                    desc: "Support your body’s natural ability to process nutrients and burn energy efficiently. Maintain a steady, healthy baseline and recover faster from daily lifestyle stressors." 
                  },
                  { 
                    title: "AGE-DEFYING CELLULAR REPAIR", 
                    desc: "Target the root cause of aging by activating Sirtuin \"longevity genes.\" Protect your DNA integrity and maintain your peak performance as you successfully Age Better, Longer." 
                  },
                  { 
                    title: "RADIANT SKIN FROM WITHIN", 
                    desc: "Support your skin’s natural resilience and healthy cell turnover at the source. Fuel the dermal cells responsible for a vibrant, healthy-looking complexion and a natural glow." 
                  }
                ].map((benefit, i) => (
                <div 
                   key={i} 
                   className={`group flex items-center gap-8 p-8 border transition-all duration-500 rounded-3xl hover:shadow-2xl hover:scale-[1.01] ${
                     [
                       'bg-[#E3F2FD]/40 border-[#E3F2FD] hover:border-[#0D47A1]/30', 
                       'bg-[#FFF3E0]/40 border-[#FFF3E0] hover:border-[#E65100]/30', 
                       'bg-[#FCE4EC]/40 border-[#FCE4EC] hover:border-[#F06292]/30',
                       'bg-[#E8F5E9]/40 border-[#E8F5E9] hover:border-[#43A047]/30',
                       'bg-[#F3E5F5]/40 border-[#F3E5F5] hover:border-[#8E24AA]/30'
                     ][i % 5]
                   }`}
                >
                      <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 transition-colors shadow-sm group-hover:text-white ${
                        [
                          'text-[#0D47A1] group-hover:bg-[#0D47A1]', 
                          'text-[#E65100] group-hover:bg-[#E65100]', 
                          'text-[#F06292] group-hover:bg-[#F06292]',
                          'text-[#43A047] group-hover:bg-[#43A047]',
                          'text-[#8E24AA] group-hover:bg-[#8E24AA]'
                        ][i % 5]
                      }`}>
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <div>
                         <h4 className={`text-sm font-black uppercase tracking-widest mb-1 transition-colors ${
                           [
                             'text-[#0D47A1]', 
                             'text-[#E65100]', 
                             'text-[#F06292]',
                             'text-[#43A047]',
                             'text-[#8E24AA]'
                           ][i % 5]
                         }`}>{benefit.title}</h4>
                         <p className="text-gray-500 font-medium leading-relaxed">{benefit.desc}</p>
                      </div>
                   </div>
                 ))}

              </div>

              {/* Success Image - Dramatic Artistic Frame */}
              <div className="lg:col-span-5 relative">
                <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] aspect-[4/5] border-8 border-white bg-gray-50 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-[#1A237E]/80 via-transparent to-transparent z-10"></div>
                    <img 
                       src="/sarah_m_testimonial.png" 
                       alt="Sarah M. Success Story" 
                       className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-105"
                    />
                    <div className="absolute top-8 left-8 z-20 flex flex-col gap-1">
                       <span className="bg-[#F06292] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg self-start">Verified Customer</span>
                       <span className="bg-white/90 backdrop-blur-md text-[#1A237E] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg self-start">Sarah M. • Age 47</span>
                    </div>
                    <div className="absolute bottom-12 left-12 right-12 z-20">
                       <p className="text-white text-xl md:text-2xl font-serif italic font-black leading-tight">
                          “I finally feel like I have my spark back. My energy is steady all day, and I'm sleeping better than I have in years.”
                       </p>
                       <div className="mt-6 h-[3px] w-16 bg-[#F06292] shadow-glow"></div>
                    </div>
                 </div>
                {/* Decorative Background Elements */}
                <div className="absolute -top-10 -right-10 w-64 h-64 border border-[#E3F2FD] rounded-full -z-10 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FCE4EC]/30 rounded-full -z-10"></div>
             </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS WHEN YOU START TAKING HORMONE HARMONY SECTION */}
      <section className="py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
               
               {/* Left Column: Timeline Content */}
               <div className="space-y-12">
                  <div className="space-y-4">
                     <h2 className="text-4xl md:text-5xl font-black text-[#1A237E] leading-[1.1] font-serif">
                        What Happens When <br />
                        <span className="italic text-[#F06292] font-medium">You Start Taking...</span>
                     </h2>
                  </div>

                  {/* Timeline */}
                  <div className="relative pl-12 space-y-10">
                     {/* Vertical Line */}
                     <div className="absolute left-[18px] top-4 bottom-4 w-0.5 bg-gray-100"></div>

                     {[
                        { 
                           time: "24 Hours", 
                           text: "Feel the first wave of calm as cortisol — your body’s main stress hormone — begins to drop. Mood swings feel softer, your head feels clearer, and sleep starts to come easier. Some women even notice the puffiness in their face easing overnight." 
                        },
                        { 
                           time: "Day 7", 
                           text: "Your clothes start to feel looser as stubborn hormonal belly bloat begins to shrink. Hot flashes and night sweats calm down, leaving you sleeping deeper and waking with more energy. Sugar cravings aren’t controlling your every thought anymore." 
                        },
                        { 
                           time: "Day 14", 
                           text: "Catch your reflection and see it — your once puffy face now looks more chiseled, your jawline sharper. Your belly is flatter, your skin more vibrant, and your moods far more stable. Energy is steady all day without the caffeine crashes." 
                        },
                        { 
                           time: "A few short weeks from now...", 
                           text: "Don’t be surprised when your friends and family do a double take — the puffiness, bloating, cranky moods, and stubborn hormonal weight are gone. You feel balanced, confident, and comfortable in your own body again... and the best part? You didn’t have to starve yourself, run a marathon, or give up the foods you love to get here." 
                        }
                     ].map((item, i) => (
                        <motion.div 
                           key={i}
                           initial={{ opacity: 0, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: i * 0.1 }}
                           className="relative"
                        >
                           {/* Timeline Dot */}
                           <div className="absolute -left-[12px] top-2 w-6 h-6 rounded-full bg-[#0D47A1] border-4 border-white shadow-sm z-10"></div>
                           
                           <div className="bg-white p-8 md:p-10 rounded-[2rem] border border-gray-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-xl transition-all duration-500">
                              <h4 className="text-xl font-black text-[#111827] mb-3">{item.time}</h4>
                              <p className="text-gray-500 leading-relaxed font-medium text-sm md:text-base">
                                 {item.text}
                              </p>
                           </div>
                        </motion.div>
                     ))}
                  </div>

               </div>

               {/* Right Column: Results Image */}
               <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative lg:sticky lg:top-24"
               >
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#FCE4EC] to-transparent rounded-[4rem] blur-[100px] opacity-30"></div>
                  <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border border-white">
                     <img 
                        src="/hormone_harmony_results_woman.png" 
                        alt="Hormone Harmony Results" 
                        className="w-full h-auto object-cover"
                     />
                  </div>
               </motion.div>

            </div>
         </div>
      </section>


      {/* TRUST ICONS SECTION */}
      <section className="py-24 bg-white border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Quality Assurance</span>
             <h2 className="text-3xl md:text-5xl font-black text-[#1A237E] leading-tight font-serif">
               Diet Friendly <br />
               <span className="italic text-[#F06292] font-medium">Clinical Supplement</span>
             </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 lg:gap-16">
            {[
              { 
                label: "Keto, Paleo & Vegan Friendly", 
                id: "1"
              },
              { 
                label: "Non-GMO & Caffeine Free", 
                id: "2"
              },
              { 
                label: "FDA-Registered GMP Facility", 
                id: "3"
              },
              { 
                label: "1000s Of Clinical Studies", 
                id: "4"
              },
              { 
                label: "Triple-Tested For Purity", 
                id: "5"
              }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:border-[#0D47A1] group-hover:bg-white group-hover:shadow-xl transition-all duration-500 overflow-hidden p-6">
                   <img 
                      src={`/trust-icon-${item.id}.png`} 
                      alt={item.label} 
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Icon'; }}
                   />
                </div>
                <p className="text-[11px] md:text-xs font-black text-[#1A237E] leading-relaxed uppercase tracking-[0.2em] max-w-[160px]">
                  {item.label}
                </p>
                <div className="mt-4 h-[1px] w-0 bg-[#0D47A1] group-hover:w-8 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKOUT BUNDLE SECTION */}
      <section id="pricing-grid" className="py-32 bg-white border-y border-gray-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Progress Indicator - Redesigned for Premium Look */}
          <div className="mb-24 max-w-4xl mx-auto">
             <div className="flex justify-between items-center relative">
                <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-gray-100 -z-10"></div>
                <div className="absolute left-0 w-[33%] top-1/2 h-[2px] bg-[#0D47A1] -z-10"></div>
                {[
                  { num: "01", label: "Select Protocol" },
                  { num: "02", label: "Identity & Billing" },
                  { num: "03", label: "Confirmation" }
                ].map((step, i) => (
                  <div key={i} className="flex flex-col items-center gap-4 bg-white px-6">
                     <span className={`text-[10px] font-black uppercase tracking-[0.3em] ${i === 0 ? 'text-[#1A237E]' : 'text-gray-300'}`}>{step.label}</span>
                     <div className={`w-14 h-14 rounded-full border flex items-center justify-center font-black text-lg transition-all duration-500 ${i === 0 ? 'border-[#0D47A1] bg-[#0D47A1] text-white shadow-xl scale-110' : 'border-gray-100 bg-white text-gray-300'}`}>
                        {step.num}
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="text-center mb-20 space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Order Fulfillment</span>
             <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-tight tracking-tight font-serif">
                Choose Your <br />
                <span className="italic text-[#F06292] font-medium">Clinical Protocol</span>
             </h2>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 px-4 items-end">
              {[
                {
                  bottleCount: 1,
                  tag: "Sustained Trial",
                  pricePerJar: "$69",
                  cents: ".99",
                  total: "$69.99",
                  installment: "$17.49",
                  isPopular: false,
                  isBestValue: false,
                  bonus: "One-Time Purchase"
                },
                {
                  bottleCount: 4,
                  tag: "Optimal Protocol",
                  pricePerJar: "$52",
                  cents: ".49",
                  total: "$209.99",
                  originalTotal: "$279.99",
                  installment: "$52.49",
                  isPopular: true,
                  isBestValue: true,
                  savings: "25% OFF",
                  bonus: "Free Global Shipping"
                },
                {
                  bottleCount: 2,
                  tag: "Resilience Pack",
                  pricePerJar: "$59",
                  cents: ".99",
                  total: "$119.99",
                  originalTotal: "$139.99",
                  installment: "$29.99",
                  isPopular: false,
                  isBestValue: false,
                  savings: "14% OFF",
                  bonus: "Free Shipping"
                }
              ].map((pkg, i) => (
                <div key={i} className={`relative bg-white flex flex-col transition-all duration-700 group ${pkg.isBestValue ? 'rounded-[3rem] border-[3px] border-[#0D47A1] p-1.5 min-h-[580px] shadow-[0_40px_80px_-20px_rgba(13,71,161,0.2)] z-10 scale-105' : 'rounded-[2.5rem] border border-gray-100 p-1 min-h-[520px] hover:shadow-2xl'}`}>
                   {pkg.isBestValue && (
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D47A1] text-white px-8 py-2.5 rounded-full whitespace-nowrap shadow-xl z-20">
                         <span className="text-[10px] font-black uppercase tracking-[0.3em]">Most Transformative</span>
                      </div>
                   )}
                   
                   <div className={`w-full py-3 rounded-[2.2rem] mb-4 text-center ${pkg.isBestValue ? 'bg-[#0D47A1] text-white' : 'bg-gray-50 text-gray-400'}`}>
                      <span className="text-[10px] font-black uppercase tracking-[0.3em]">{pkg.tag}</span>
                   </div>
                   
                   <div className="px-8 py-4 flex flex-col flex-grow w-full text-center">
                      <div className="relative mb-8 aspect-square w-full max-w-[200px] mx-auto flex items-center justify-center">
                         {pkg.savings && (
                            <div className="absolute top-0 right-0 w-16 h-16 rounded-full bg-white border-2 border-[#F06292] text-[#F06292] flex flex-col items-center justify-center font-black text-sm leading-none shadow-lg z-20 group-hover:bg-[#F06292] group-hover:text-white transition-all duration-500 transform group-hover:rotate-12">
                               <span className="text-[8px] uppercase tracking-tighter mb-0.5">Save</span>
                               <span className="text-lg">{pkg.savings.split(' ')[0]}</span>
                            </div>
                         )}
                         <img 
                            src="/60_Capsules.jpg" 
                            alt={`${pkg.bottleCount} Bottle Protocol`} 
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105 drop-shadow-[0_20px_40px_rgba(0,0,0,0.1)] mix-blend-multiply"
                         />
                      </div>

                      <div className="mb-6">
                         <div className="flex items-start justify-center gap-1">
                            <span className="text-5xl font-serif italic font-black text-[#1A237E]">{pkg.pricePerJar}</span>
                            <span className="text-lg font-bold text-[#1A237E] mt-1">{pkg.cents}</span>
                         </div>
                         <p className="text-[9px] text-[#0288D1]/60 font-black uppercase tracking-[0.25em] mt-1">Price Per Protocol Jar</p>
                      </div>

                      <div className="mb-8 space-y-1">
                         <p className="text-xs font-bold text-gray-400">Total {pkg.originalTotal && <span className="line-through">{pkg.originalTotal}</span>} <span className="text-[#1A237E] font-black text-base ml-1">{pkg.total}</span></p>
                         <p className="text-[9px] text-gray-400 uppercase tracking-widest font-black">Or 4 interest-free payments of {pkg.installment}</p>
                      </div>

                      <div className="mt-auto space-y-4 pb-4">
                         <button className={`w-full font-black py-5 rounded-2xl flex items-center justify-center gap-3 shadow-lg uppercase tracking-widest transition-all duration-500 group/btn relative overflow-hidden ${pkg.isBestValue ? 'bg-[#0D47A1] text-white hover:bg-[#F06292]' : 'bg-white text-[#0D47A1] border-2 border-[#0D47A1] hover:bg-[#0D47A1] hover:text-white'}`}>
                            <span className="relative z-10 text-xs">Start Protocol</span>
                            <svg className="w-5 h-5 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                         </button>

                         <div className="flex items-center justify-center gap-3 opacity-60">
                            <div className="w-4 h-4 rounded-full bg-[#0D47A1] flex items-center justify-center shrink-0">
                               <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7"/></svg>
                            </div>
                            <span className="text-[10px] font-black text-[#1A237E] uppercase tracking-widest">60-Day Risk-Free Guarantee</span>
                         </div>
                      </div>
                   </div>
                </div>
              ))}
           </div>

          {/* Security & Trust Section - Refined Clinical Aesthetic */}
          <div className="max-w-6xl mx-auto bg-[#E3F2FD]/40 p-12 md:p-16 rounded-[4rem] flex flex-col lg:flex-row items-center gap-12 lg:gap-24 shadow-[0_20px_50px_rgba(0,0,0,0.02)] border border-[#E3F2FD] mb-20 relative overflow-hidden group">
             {/* Subtle Background Glow */}
             <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E3F2FD]/20 rounded-full blur-3xl pointer-events-none group-hover:bg-[#E3F2FD]/30 transition-colors duration-1000"></div>
             
             {/* Left Column: Security Eyebrow & Trust Badges */}
             <div className="flex flex-col items-center lg:items-start gap-10 relative z-10">
                <span className="text-[11px] font-black uppercase tracking-[0.5em] text-[#0D47A1]/40">SECURITY ENCRYPTION</span>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6">
                   {/* PayPal Verified */}
                   <div className="h-14 px-8 bg-white border border-gray-100 rounded-full flex items-center shadow-sm hover:border-[#0D47A1]/20 transition-all duration-300">
                      <span className="text-[11px] text-[#1A237E] font-black uppercase tracking-[0.2em]">PAYPAL VERIFIED</span>
                   </div>
                   
                   {/* Visa Secure */}
                   <div className="h-14 px-8 bg-[#0D47A1] rounded-full flex items-center shadow-lg transform hover:scale-105 transition-transform duration-300">
                      <span className="text-[11px] text-white font-black uppercase tracking-[0.2em] italic">VISA SECURE</span>
                   </div>
                   
                   {/* Mastercard Identity Check (Circles) */}
                   <div className="flex items-center hover:translate-x-2 transition-transform duration-300 cursor-help" title="Mastercard Identity Check">
                      <div className="w-11 h-11 rounded-full bg-[#0D47A1] -mr-4 border-2 border-white shadow-md relative z-20"></div>
                      <div className="w-11 h-11 rounded-full bg-gray-200 border-2 border-white shadow-md relative z-10"></div>
                   </div>
                </div>
             </div>

             {/* Middle Column: Large Security Shield */}
             <div className="relative group/shield shrink-0">
                <div className="absolute inset-0 bg-[#0D47A1]/5 rounded-[3rem] blur-2xl group-hover/shield:bg-[#0D47A1]/10 transition-colors duration-700"></div>
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-50/50 backdrop-blur-sm border border-white rounded-[3rem] flex items-center justify-center relative z-10 shadow-sm group-hover/shield:shadow-xl transition-all duration-700">
                   <svg className="w-16 h-16 text-[#1A237E] drop-shadow-sm" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/>
                   </svg>
                   {/* 256-bit SSL Tag */}
                   <div className="absolute -bottom-2 bg-white px-4 py-1 rounded-full shadow-md border border-gray-100">
                      <span className="text-[8px] font-black uppercase tracking-widest text-[#0D47A1]">256-BIT SSL</span>
                   </div>
                </div>
             </div>

             {/* Right Column: Headline & Body Text */}
             <div className="flex-grow space-y-6 text-center lg:text-left max-w-xl relative z-10">
                <div className="space-y-4">
                   <h4 className="text-2xl md:text-3xl font-black text-[#1A237E] font-serif italic leading-tight">Your Data is Protected.</h4>
                   <p className="text-base md:text-lg text-gray-500 leading-relaxed font-medium">
                      We use a <span className="text-[#0D47A1] font-black">256-bit secure shopping cart</span> where 100% of your data is encrypted, safe, and secure. This is the same data security standard used by most banks, governments, and military organizations.
                   </p>
                </div>
                <div className="flex items-center justify-center lg:justify-start gap-4 pt-2">
                   <div className="h-[1px] w-12 bg-[#E3F2FD]"></div>
                   <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D47A1]/30 italic">Military Grade Security Standard</span>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* RISK REVERSAL GUARANTEE SECTION */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-24 max-w-4xl mx-auto space-y-6">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Consumer Protection</span>
             <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-tight tracking-tight font-serif">
                Your Transformation. <br />
                <span className="italic text-[#F06292] font-medium">Fully Guaranteed.</span>
             </h2>
             <p className="text-xl text-gray-500 font-medium italic max-w-2xl mx-auto leading-relaxed">
                We take all the risk so you can experience the life-changing benefits of ChronoNAD+ with absolute peace of mind.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               {
                 title: "CLINICAL EFFICACY GUARANTEE",
                 desc: "If you don't feel a significant surge in cellular energy, enhanced mental clarity, and a systemic shift in your metabolic resilience within 60 days, we'll refund your first bottle instantly.",
                 icon: "M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z",
                 bgColor: "bg-[#E3F2FD]/80",
                 hoverColor: "hover:bg-[#E3F2FD]"
               },
               {
                 title: "PRIORITY PROTOCOL SHIPPING",
                 desc: "We prioritize 2 and 4 bottle orders with expedited fulfillment and free shipping, ensuring your cellular protocol starts without delay.",
                 icon: "M13 10V3L4 14h7v7l9-11h-7z",
                 bgColor: "bg-[#FFF3E0]/80",
                 hoverColor: "hover:bg-[#FFF3E0]"
               },
               {
                 title: "SEAMLESS REFUND PROTOCOL",
                 desc: "No fine print. No hidden obstacles. If ChronoNAD+ isn't the cellular breakthrough you were looking for, our support team handles your refund with medical precision.",
                 icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z",
                 bgColor: "bg-[#FCE4EC]/80",
                 hoverColor: "hover:bg-[#FCE4EC]"
               }
             ].map((pill, i) => (
               <div key={i} className={`group p-12 rounded-[3.5rem] border border-gray-100 flex flex-col items-center text-center transition-all duration-700 ${pill.bgColor} ${pill.hoverColor} hover:shadow-xl hover:border-white/50`}>
                  <div className="w-20 h-20 mb-10 rounded-3xl bg-white/60 border border-white flex items-center justify-center group-hover:bg-[#0D47A1] group-hover:text-white transition-all duration-500 shadow-sm backdrop-blur-sm">
                     <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={pill.icon} />
                     </svg>
                  </div>
                  <h4 className="text-sm font-black text-[#1A237E] uppercase tracking-widest mb-6 px-4">{pill.title}</h4>
                  <p className="text-gray-600 leading-relaxed font-semibold px-2 italic">{pill.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE REVIEWS SECTION */}
      {/* THE PROOF IS IN THE RESULTS - JUDGE.ME STYLE REDESIGN */}
      <section className="py-24 bg-white border-y border-gray-50 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-6 max-w-4xl mx-auto">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Customer Intelligence</span>
               <h2 className="text-3xl md:text-5xl font-black text-[#1A237E] leading-tight tracking-tight font-serif">
                  The Proof is in <br />
                  <span className="italic text-[#F06292] font-medium">The Results.</span>
               </h2>
               <p className="text-xl text-gray-500 font-medium italic max-w-2xl mx-auto leading-relaxed">
                  Join over 53,814 women who have restored their cellular vitality and reclaimed their spark with the ChronoNAD+ cellular protocol.
               </p>
            </div>

            {/* Trust Dashboard Bar */}
            <div className="bg-white rounded-[2rem] p-8 md:p-10 mb-16 flex flex-col lg:flex-row items-center justify-between border border-gray-100 gap-10 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
               <div className="flex items-center gap-12">
                  <div className="flex flex-col items-center lg:items-start">
                     <div className="flex items-center gap-3">
                        <span className="text-4xl font-black text-[#111827]">4.8</span>
                        <div className="flex text-[#FFC107] text-sm">
                           {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                        </div>
                     </div>
                     <span className="text-[9px] text-gray-400 font-black uppercase tracking-widest mt-1">Global Satisfaction Score</span>
                  </div>
                  <div className="h-12 w-[1px] bg-gray-100 hidden lg:block"></div>
                  <div className="flex flex-col items-center lg:items-start">
                     <span className="text-2xl font-black text-[#111827]">99%</span>
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

            {/* Review Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
               {[
                  {
                     name: "BRENDA",
                     title: "Great quality supplements",
                     body: "60 capsules in a bottle. Directions say to take two a day. Pills are pretty easy to swallow. I had good results with taking this supplement. More energy and I have better sleep now. My digestion improved also.",
                     date: "2 MONTHS AGO",
                     bg: "bg-[#E3F2FD]/30",
                     initial: "B"
                  },
                  {
                     name: "HAPPYFAMILY",
                     title: "NAD+ Boost for Feeling Younger!",
                     body: "CellStart is a solid pick for anyone wanting to support healthy aging and cellular energy! After a month of one capsule daily with breakfast, I've noticed steadier energy, better focus, and recovery after workouts.",
                     date: "1 MONTH AGO",
                     bg: "bg-[#FFF3E0]/30",
                     initial: "HF"
                  },
                  {
                     name: "STEPHANIE JACKSON",
                     title: "Worth the Buy",
                     body: "I’ve noticed I don’t feel as sluggish during the day, and my recovery after workouts seems quicker. Definitely worth trying if you want extra support for energy, focus, and healthy aging.",
                     date: "3 MONTHS AGO",
                     bg: "bg-[#FCE4EC]/30",
                     initial: "SJ"
                  },
                  {
                     name: "JAMES",
                     title: "Easy to swallow capsules.",
                     body: "The CellStart Nad+ Resveratrol capsules come a well-sealed bottle. I like the fact that they are made in the USA and are also Non-GMO. I feel they give me more energy and a better start to my mornings.",
                     date: "1 MONTH AGO",
                     bg: "bg-[#E8F5E9]/30",
                     initial: "J"
                  },
                  {
                     name: "DANIELLE",
                     title: "A Much Needed Energy Boost for Moms!",
                     body: "As a 32-year-old mom juggling kids.. within the first week, I noticed a real difference. I wasn’t crashing halfway through the day, and I felt more clear-headed and focused.",
                     date: "2 MONTHS AGO",
                     bg: "bg-[#FFFDE7]/40",
                     initial: "D"
                  }
               ].map((review, i) => (
                  <div key={i} className={`${review.bg} p-8 md:p-10 rounded-[2rem] border border-white flex flex-col group hover:shadow-xl transition-all duration-500`}>
                     <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-[#0D47A1] text-white flex items-center justify-center font-black text-xs">{review.initial}</div>
                           <div className="flex flex-col">
                              <div className="flex items-center gap-1.5">
                                 <span className="font-black text-[11px] text-[#111827] uppercase tracking-tight">{review.name}</span>
                                 <div className="w-3.5 h-3.5 bg-[#0D47A1] rounded-full flex items-center justify-center">
                                    <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                 </div>
                              </div>
                              <span className="text-[8px] font-black text-gray-400 uppercase tracking-widest mt-0.5">Verified Protocol User</span>
                           </div>
                        </div>
                        <span className="text-[9px] font-black text-gray-300 uppercase tracking-widest">{review.date}</span>
                     </div>
                     
                     <div className="flex text-[#FFC107] text-[10px] mb-4">
                        {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                     </div>

                     <h4 className="text-xl font-black text-[#0D47A1] mb-4 font-serif italic tracking-tight">{review.title}</h4>
                     <p className="text-[13px] md:text-sm text-gray-500 leading-relaxed font-medium mb-8">"{review.body}"</p>

                     <div className="mt-auto pt-6 border-t border-white/50 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/50 flex items-center justify-center p-1 border border-white">
                           <img src="/60_Capsules.jpg" alt="product" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-gray-400">
                           <p className="mb-0.5 opacity-60">Authenticated Protocol Review</p>
                           <p className="text-[#0D47A1]">ChronoNAD+ Cellular Protocol™</p>
                        </div>
                     </div>
                  </div>
               ))}
            </div>

            {/* Bottom Actions */}
            <div className="flex flex-col items-center gap-12">
               <button className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0D47A1] border-b-2 border-[#0D47A1]/20 pb-1.5 hover:border-[#0D47A1] transition-all">
                  Access All 53,814 Reviews
               </button>

               <div className="flex flex-col items-center gap-6 w-full max-w-xl">
                  <motion.button 
                     whileHover={{ scale: 1.02 }}
                     whileTap={{ scale: 0.98 }}
                     onClick={scrollToProducts}
                     className="w-full bg-[#0D47A1] text-white font-black text-lg px-12 py-7 rounded-2xl uppercase tracking-widest shadow-2xl flex items-center justify-center group"
                  >
                     Start My Transformation
                     <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </motion.button>
                  <div className="flex items-center gap-2 text-gray-500 font-bold uppercase tracking-widest text-[9px]">
                     <div className="w-5 h-5 bg-[#0D47A1] rounded flex items-center justify-center">
                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                     </div>
                     <span>60-Day Clinical Guarantee</span>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* SUPPLEMENT FACTS TRANSPARENCY SECTION */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 max-w-4xl mx-auto">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6 block">Formula Transparency</span>
             <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-[1.05] tracking-tight font-serif italic mb-8">
                Nothing Hidden. <br />
                <span className="text-gray-400 font-medium">Just Pure Science.</span>
             </h2>
             <p className="text-xl text-gray-500 font-medium italic">
                Our proprietary complexes are formulated with 100% natural, pharmaceutical-grade botanicals—fully transparent and clinically validated.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
             {/* Left: Facts Label and Info */}
             <div className="lg:col-span-6 space-y-12">
                <div className="bg-white border-[3px] border-[#0D47A1] p-10 md:p-14 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] rounded-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D47A1] text-white flex items-center justify-center font-black text-xl translate-x-12 -translate-y-12 rotate-45">FACTS</div>
                   
                   <div className="border-b-[10px] border-[#0D47A1] pb-4 mb-8">
                      <h4 className="text-5xl font-black italic leading-none font-serif tracking-tighter">Supplement Facts</h4>
                      <div className="mt-4 flex justify-between text-xs font-black uppercase tracking-widest">
                         <span>Serving Size: 3 Capsules</span>
                         <span>Servings Per Container: 24</span>
                      </div>
                   </div>
                   
                   <div className="border-b-4 border-[#0D47A1] mb-2 flex justify-between font-black text-[10px] uppercase tracking-widest pb-1">
                      <span>Ingredient Focus</span>
                      <div className="flex gap-12">
                         <span>Per Serving</span>
                         <span>%DV</span>
                      </div>
                   </div>

                   <div className="space-y-4 text-xs md:text-sm">
                      <div className="flex justify-between items-end border-b border-gray-100 pb-2">
                         <span className="font-bold">Vitamin B6 (as Pyridoxine HCl)</span>
                         <div className="flex gap-16 font-black">
                            <span>1.70 mg</span>
                            <span>100%</span>
                         </div>
                      </div>

                      <div className="pt-4">
                         <div className="flex justify-between items-end font-black border-b-2 border-[#0D47A1] pb-2">
                            <span className="text-lg">HM5 MenoBalance Complex™</span>
                            <div className="flex gap-16">
                               <span>1135 mg</span>
                               <span>**</span>
                            </div>
                         </div>
                         <p className="text-[10px] italic py-3 leading-relaxed text-gray-500 font-medium">
                            KSM-66® Ashwagandha (Root), Maca 10:1 (Root), Chaste Tree 20:1 (Berry), Wild Yam 8:1 (Dioscorea), Broccoli 20:1 (Sprout).
                         </p>
                      </div>

                      <div className="pt-4">
                         <div className="flex justify-between items-end font-black border-b-2 border-[#0D47A1] pb-2">
                            <span className="text-lg">HM4 MenoShred Complex™</span>
                            <div className="flex gap-16">
                               <span>642 mg</span>
                               <span>**</span>
                            </div>
                         </div>
                         <p className="text-[10px] italic py-3 leading-relaxed text-gray-500 font-medium">
                            American Ginseng 4:1 (Root), Gymnema Sylvestre (Leaf), Coleus Forskohlii (Root), Rosemary (Leaf).
                         </p>
                      </div>

                      <div className="pt-4">
                         <div className="flex justify-between items-end font-black border-b-2 border-[#0D47A1] pb-2">
                            <span className="text-lg">HM2 MenoMood Complex™</span>
                            <div className="flex gap-16">
                               <span>300 mg</span>
                               <span>**</span>
                            </div>
                         </div>
                         <p className="text-[10px] italic py-3 leading-relaxed text-gray-500 font-medium">
                            Chamomile 10:1 (Flower), Rhodiola 10:1 (Root).
                         </p>
                      </div>
                      
                      <div className="pt-6 border-t-[10px] border-[#0D47A1] text-[9px] font-bold text-gray-400 leading-relaxed italic">
                         ** Daily Value (DV) not established. Other ingredients: Vegetable Cellulose (Capsule), Rice Flour, Magnesium Stearate.
                      </div>
                   </div>
                </div>
             </div>

             {/* Right: Product Bottle Render */}
             <div className="lg:col-span-6">
                <div className="relative group">
                   <div className="absolute inset-0 bg-[#0D47A1]/5 rounded-[3rem] blur-3xl group-hover:bg-[#0D47A1]/10 transition-colors"></div>
                   <img 
                      src="/60_Capsules.jpg" 
                      alt="ChronoNAD+ Bottle Render" 
                      className="w-full h-auto object-contain relative z-10 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                   />
                </div>
             </div>
          </div>
        </div>
      </section>



      {/* FAQ */}
      {/* FAQ SECTION - Redesigned for Premium Minimalist Look */}
      <section className="py-32 bg-gray-50/30">
         <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Common Inquiries</span>
               <h2 className="text-3xl md:text-5xl font-black text-[#1A237E] leading-tight tracking-tight font-serif">
                  Expert Protocol <br />
                  <span className="italic text-[#F06292] font-medium">Support</span>
               </h2>
               <p className="text-xl text-gray-500 font-medium italic max-w-2xl mx-auto leading-relaxed">
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
                    <span className="text-lg font-black text-[#1A237E] uppercase tracking-tight">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full border border-gray-100 flex items-center justify-center transition-transform duration-500 ${activeFaq === index ? 'rotate-45 bg-[#0D47A1] text-white' : 'bg-white text-[#1A237E]'}`}>
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
                           <p className="text-lg text-gray-500 font-medium italic leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* FINAL EDITORIAL FOOTER */}
      <footer className="py-24 bg-[#0D47A1] text-white">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row justify-between items-start gap-20 mb-20">
               <div className="max-w-md">
                  <h3 className="text-3xl font-black mb-6 font-serif italic tracking-tighter">Hormone Harmony™</h3>
                  <p className="text-white/50 leading-relaxed font-medium">
                     A clinical-potency botanical protocol designed for systemic hormonal restoration and metabolic vitality. Part of the Happy Mammoth ecosystem.
                  </p>
               </div>
               
               <div className="grid grid-cols-2 md:grid-cols-3 gap-12 text-[10px] font-black uppercase tracking-[0.3em]">
                  <div className="space-y-4">
                     <p className="text-white/20 mb-6">Protocol</p>
                     <a href="#" className="block hover:text-gray-400 transition-colors">Safety Data</a>
                     <a href="#" className="block hover:text-gray-400 transition-colors">Shipping</a>
                     <a href="#" className="block hover:text-gray-400 transition-colors">Guarantee</a>
                  </div>
                  <div className="space-y-4">
                     <p className="text-white/20 mb-6">Support</p>
                     <a href="#" className="block hover:text-gray-400 transition-colors">Contact Expert</a>
                     <a href="#" className="block hover:text-gray-400 transition-colors">Track Order</a>
                     <a href="#" className="block hover:text-gray-400 transition-colors">FAQ</a>
                  </div>
                  <div className="space-y-4">
                     <p className="text-white/20 mb-6">Legal</p>
                     <a href="#" className="block hover:text-gray-400 transition-colors">Privacy</a>
                     <a href="#" className="block hover:text-gray-400 transition-colors">Terms</a>
                  </div>
               </div>
            </div>
            
            <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
               <div className="text-[9px] text-white/30 font-bold uppercase tracking-widest max-w-2xl text-center md:text-left leading-relaxed">
                  © 2025 Hormone Harmony. Formulated by Happy Koala, LLC. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
               </div>
               <div className="flex items-center gap-8 opacity-40 hover:opacity-100 transition-all duration-500">
                  {/* PayPal */}
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">PayPal</span>
                  {/* Visa */}
                  <span className="text-[10px] font-black uppercase tracking-widest text-white italic">VISA</span>
                  {/* Mastercard Circles */}
                  <div className="flex items-center">
                     <div className="w-5 h-5 rounded-full bg-white/20 -mr-2 border border-white/10"></div>
                     <div className="w-5 h-5 rounded-full bg-white/10 border border-white/10"></div>
                  </div>
                  {/* SSL Indicator */}
                  <div className="flex items-center gap-2">
                     <svg className="w-3 h-3 text-white/50" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm0 10c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                     <span className="text-[8px] font-black uppercase tracking-widest text-white/50">256-BIT SSL</span>
                  </div>
               </div>
            </div>
         </div>
      </footer>

    </div>
  )
}
