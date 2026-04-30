import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import skinTransformation from '../assets/skin-transformation.png'
import chronoNadIsolated from '../assets/chrono-nad-isolated.png'
import cortisolTransformation from '../assets/cortisol-transformation.png'
import womenAllAgesResult from '../assets/women-all-ages-result.png'



export default function Harmony() {
  const navigate = useNavigate()
  const [activeFaq, setActiveFaq] = useState(null)
  const [isMobile, setIsMobile] = useState(false)

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
      <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden pt-28 pb-12 lg:pt-32 lg:pb-16 px-6">
         {/* Subtle Background Clinical Grid - Deep Blue */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0D47A1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         
         <div className="max-w-7xl mx-auto relative z-10 w-full">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
                {/* Left Column: Text Content */}
                <div className="text-center lg:text-left space-y-5 relative">
                   <div className="space-y-4 relative z-10">
                      <motion.div 
                         initial={{ opacity: 0, x: -20 }}
                         animate={{ opacity: 1, x: 0 }}
                         transition={{ delay: 0.2 }}
                         className="inline-flex items-center gap-3 bg-white border border-gray-100 text-[#0D47A1] px-3 py-1 rounded-full shadow-sm"
                      >
                         <div className="w-1.5 h-1.5 rounded-full bg-[#0D47A1] animate-pulse"></div>
                         <span className="text-[8px] font-black uppercase tracking-[0.4em] italic font-accent">Protocol Access Enabled</span>
                      </motion.div>

                      <motion.h1 
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.3 }}
                         className="text-3xl md:text-5xl font-semibold text-[#111827] leading-[1.05] tracking-tighter font-heading"
                      >
                         The Future of <br />
                         <span className="italic text-[#0D47A1] font-medium">Cellular Vitality.</span>
                      </motion.h1>

                      <motion.div 
                         initial={{ opacity: 0 }}
                         animate={{ opacity: 1 }}
                         transition={{ delay: 0.4 }}
                         className="space-y-2 max-w-xl mx-auto lg:mx-0 border-l-2 border-gray-100 pl-4"
                      >
                         <p className="text-sm text-[#283593]/80 font-medium leading-relaxed">
                            Groundbreaking research identifies declining NAD+ as the <span className="text-[#0D47A1] font-black underline decoration-2 underline-offset-4 decoration-[#0D47A1]/10">"hidden driver"</span> of visible aging. Restore your cellular battery from within.
                         </p>
                         <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em] font-accent">
                            Metabolic Baseline Shift // Established Mid-20s
                         </p>
                      </motion.div>
                   </div>

                   {/* Modern Benefits Spec-Sheet */}
                   <div className="space-y-3 relative z-10">
                      <div className="flex items-center gap-4 mb-2">
                         <div className="h-px flex-1 bg-gray-100"></div>
                         <p className="text-[9px] font-black text-gray-300 uppercase tracking-[0.5em] font-accent">Systemic Benefits</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                         {[
                            { text: "Deep Cellular Activation", color: "bg-blue-50/50 border-blue-100/50" },
                            { text: "Luminous Skin Complexion", color: "bg-blue-50/50 border-blue-100/50" },
                            { text: "Peak Biological Energy", color: "bg-blue-50/50 border-blue-100/50" },
                            { text: "Metabolic Rhythm Support", color: "bg-blue-50/50 border-blue-100/50" },
                            { text: "Mental Clarity & Focus", color: "bg-blue-50/50 border-blue-100/50" }
                         ].map((benefit, i) => (
                            <motion.div 
                               key={i}
                               initial={{ opacity: 0, y: 10 }}
                               animate={{ opacity: 1, y: 0 }}
                               transition={{ delay: 0.5 + (i * 0.1) }}
                               className={`flex items-center gap-2 p-2 rounded-lg border ${benefit.color} shadow-[0_2px_10px_rgba(0,0,0,0.02)] hover:shadow-lg transition-all duration-500 cursor-default group`}
                            >
                               <div className="w-6 h-6 rounded-md bg-blue-50 text-[#0D47A1] flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] group-hover:text-white transition-colors duration-500">
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"/></svg>
                               </div>
                               <span className="text-[11px] text-[#111827] font-black tracking-tight">{benefit.text}</span>
                            </motion.div>
                         ))}
                      </div>
                   </div>

                   <div className="flex flex-col items-center lg:items-start gap-3 pt-1">
                      <motion.button 
                         whileHover={{ scale: 1.02 }}
                         whileTap={{ scale: 0.98 }}
                         onClick={scrollToProducts}
                         className="min-w-[240px] bg-[#0D47A1] text-white font-black text-sm px-7 py-4 rounded-xl uppercase tracking-widest hover:bg-[#111827] transition-all duration-300 shadow-xl flex items-center justify-center group relative overflow-hidden"
                      >
                         <span className="relative z-10">Start My Protocol</span>
                         <svg className="w-4 h-4 ml-3 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                      </motion.button>
                      <div className="flex items-center gap-2 text-[#0D47A1]/40 text-[10px] font-black uppercase tracking-widest font-accent">
                         <div className="w-4 h-4 bg-[#0D47A1] rounded flex items-center justify-center">
                            <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                         </div>
                         <span>30 Day Money Back Guarantee</span>
                      </div>
                   </div>
                </div>

               {/* Right Column: Transformation Graphic - No Card */}
               <div className="relative flex flex-col items-center justify-center">
                  <img 
                     src={skinTransformation} 
                     alt="Cellular Transformation Progress" 
                     className="w-full h-auto max-h-[480px] object-contain mix-blend-multiply"
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

      {/* FEATURED IN SECTION */}
      <section id="featured" className="py-24 bg-white border-b border-gray-50">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block font-accent">Clinical Recognition</span>
               <h2 className="text-3xl md:text-5xl font-bold text-[#111827] leading-tight tracking-tight font-heading">
                  Recognized by the <br />
                  <span className="italic text-[#0D47A1] font-medium">Industry Leaders</span>
               </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-12 lg:gap-8">
               {[
                  { name: "COSMOPOLITAN", quote: "It made me so calm and centred, my husband instantly noticed the change.", style: "font-black tracking-tighter" },
                  { name: "Women's Health", quote: "My confidence is back. My belly feels flat. And I feel like myself again!", style: "font-heading font-black" },
                  { name: "VOGUE", quote: "Most effective dietary supplements I've discovered recently, and a real game-changer for me.", style: "font-heading tracking-[0.2em] font-medium" },
                  { name: "marie claire", quote: "Marie Claire's Picks for Perimenopause", style: "font-heading font-black lowercase" },
                  { name: "USA TODAY", quote: "My happiness is returning and my body is stronger. I'm absolutely blown away by how fast it works!", style: "font-black tracking-tight" },
                  { name: "BODY+SOUL", quote: "My tummy is definitely better than it was, which is nothing less than a freaking miracle.", style: "font-heading font-bold italic tracking-tighter" }
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
      <section id="testimonials" className="py-24 bg-[#F8FAFC] overflow-hidden relative">
         <div className="max-w-4xl mx-auto px-6 relative z-10">
            
            {/* Header Area */}
            <div className="text-center mb-16 space-y-6">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block font-accent">Clinical Trust</span>
               <h2 className="text-4xl md:text-6xl font-bold text-[#111827] leading-[1.05] tracking-tight font-heading">
                  Beat Hormonal Weight, <br className="hidden md:block" />
                  <span className="italic text-[#0D47A1] font-medium">Cortisol Belly, Moon Face,</span> <br className="hidden md:block" />
                  and Double Chin
               </h2>
               <div className="max-w-2xl mx-auto space-y-4">
                  <p className="text-xl text-gray-500 font-medium italic leading-relaxed">
                     Our ingredients are proven in thousands of scientific papers to help optimize hormones for women of all ages... So they can finally end <span className="text-[#111827] font-black not-italic">bloating, puffiness, mood swings and poor sleep.</span>
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
                           <div className="flex items-center gap-1 text-[#0D47A1] mt-0.5">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              <span className="text-[8px] font-black uppercase tracking-widest">Verified Buyer</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex text-[#FFC107] gap-0.5">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                     </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#111827] mb-3 uppercase tracking-tight font-subheading">LIFE-CHANGING!!!</h4>
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
                              <div className="flex items-center gap-1 text-[#0D47A1] mt-0.5">
                                 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                 <span className="text-[8px] font-black uppercase tracking-widest">Verified Buyer</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex text-[#FFC107] gap-0.5">
                           {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                        </div>
                     </div>
                     <h4 className="text-base font-bold text-[#111827] mb-3 tracking-tight">It’s like I’m aging backwards!</h4>
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
                              <div className="flex items-center gap-1 text-[#0D47A1] mt-0.5">
                                 <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                 <span className="text-[8px] font-black uppercase tracking-widest">Verified Buyer</span>
                              </div>
                           </div>
                        </div>
                        <div className="flex text-[#FFC107] gap-0.5">
                           {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                        </div>
                     </div>
                     <h4 className="text-base font-bold text-[#111827] mb-3 tracking-tight">I’ll never be without this</h4>
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
                           <div className="flex items-center gap-1 text-[#0D47A1] mt-0.5">
                              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                              <span className="text-[8px] font-black uppercase tracking-widest">Verified Buyer</span>
                           </div>
                        </div>
                     </div>
                     <div className="flex text-[#FFC107] gap-0.5">
                        {[...Array(5)].map((_, i) => <span key={i} className="text-sm">★</span>)}
                     </div>
                  </div>
                  <h4 className="text-lg font-bold text-[#111827] mb-3 tracking-tight">I finally feel like ME again.</h4>
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
                  className="w-full md:w-auto min-w-[380px] bg-[#0D47A1] text-white font-black text-xl px-12 py-7 rounded-2xl uppercase tracking-widest shadow-xl hover:bg-[#111827] transition-all duration-300"
               >
                  Try Our Protocols
               </motion.button>
               <div className="flex items-center gap-2 text-gray-400 font-bold uppercase tracking-widest text-[9px]">
                  <div className="w-5 h-5 bg-[#0D47A1] rounded flex items-center justify-center">
                     <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span>30 Day Money Back Guarantee</span>
               </div>
            </div>

         </div>
      </section>
      
      {/* CORTISOL IMPACT & TRANSFORMATION SECTION - NEW */}
      <section id="cortisol" className="py-32 bg-[#F9FAFB]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-16 space-y-6">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block font-accent">Cellular Reality</span>
             <h2 className="text-4xl md:text-5xl font-bold text-[#111827] leading-tight tracking-tight font-heading">
                As women age, their <br className="hidden md:block" />
                <span className="text-[#0D47A1]">NAD+ levels drop by 30%</span> by Age 30.
             </h2>
             <p className="text-xl text-gray-500 font-medium italic">
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
                <div className="space-y-4 text-left bg-white p-8 md:p-12 rounded-[3rem] shadow-sm border border-gray-50">
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
                <div className="bg-[#111827] text-white p-12 rounded-[3rem] shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-[#0D47A1]/10 rounded-full blur-[100px] -mr-32 -mt-32"></div>
                   <p className="text-lg md:text-xl opacity-90 font-medium max-w-2xl mx-auto mb-8">
                      If that ever happened to you, it’s not your fault. These are symptoms of a <span className="text-[#0D47A1] font-black italic">'biological lag'</span> caused by crashing NAD+ levels…
                   </p>
                   <p className="text-sm opacity-60 font-bold uppercase tracking-[0.3em] mb-8">And unfortunately, it doesn’t stop here.</p>
                   <div className="h-[1px] w-24 bg-[#0D47A1] mx-auto mb-8"></div>
                   <p className="text-2xl md:text-4xl font-black uppercase tracking-tighter leading-tight mb-8">
                      By the time you reach your 40s, your NAD+ levels, which is the fuel for every single cell, <span className="text-[#0D47A1]">plummet by a whopping 50%...</span>
                   </p>
                   <p className="text-base md:text-lg opacity-80 font-medium max-w-2xl mx-auto italic">
                      This is the molecule that keeps your skin tight and luminous, your DNA shielded, your metabolism firing, and your cellular recovery on autopilot…
                      <br />
                      Just like in your 20s and 30s.
                   </p>
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
             <div className="bg-white border-2 border-gray-100 p-12 rounded-[3rem] shadow-sm text-left max-w-3xl mx-auto space-y-8">
                <h3 className="text-2xl font-bold text-[#111827] font-heading underline decoration-[#0D47A1]/10 underline-offset-8">Here’s why that happens:</h3>
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
             <div className="py-12 bg-[#F8FAFC] rounded-[3rem] border border-gray-100">
                <h3 className="text-2xl font-bold text-[#111827] mb-10 font-heading">So if you’ve ever witnessed…</h3>
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
                   <p className="text-2xl font-black text-[#0D47A1] uppercase tracking-tighter">➡️ You’re not alone… ⬅️</p>
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

                <div className="flex flex-col items-center gap-6">
                   <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={scrollToProducts}
                      className="w-full md:w-auto min-w-[400px] bg-[#0D47A1] text-white font-black text-2xl px-12 py-8 rounded-3xl uppercase tracking-[0.2em] shadow-2xl hover:bg-[#111827] transition-all duration-500"
                   >
                      TRY CHRONONAD+
                   </motion.button>
                   <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">
                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                      </div>
                      <span className="text-sm font-black text-[#111827] uppercase tracking-widest">✅ 30 Day Money Back Guarantee</span>
                   </div>
                </div>
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
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 mb-8 block font-accent">The Silent Driver</span>
               <h2 className="text-4xl md:text-7xl font-bold text-[#111827] leading-[1] tracking-tighter mb-10 font-heading">
                  As You Age, Your Body’s <br />
                  <span className="italic text-[#0D47A1] font-medium">NAD+ Levels Plummet...</span>
               </h2>
               <p className="text-xl md:text-2xl text-gray-500 font-medium italic leading-relaxed">
                  And that’s when <span className="text-[#111827] font-black not-italic">everything changes</span> in your cells.
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
                     accent: "#0D47A1"
                  },
                  { 
                     from: "Unexplained Fatigue & Physical \"Heavy\" Feeling", 
                     to: "Systemic Vitality & Effortless Movement",
                     label: "Physical Resilience",
                     bgColor: "bg-[#E3F2FD]/30",
                     accent: "#0D47A1"
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
                           <div className="flex items-start gap-4 text-[#111827]">
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
               <div className="absolute -top-16 -right-16 text-[18rem] font-heading font-black italic text-[#E3F2FD]/40 pointer-events-none">“</div>
               <p className="text-3xl md:text-4xl font-heading-alt italic text-[#111827] leading-relaxed relative z-10">
                  "It's not just a lack of sleep—it's a hormonal and cellular storm. You feel <span className="text-[#0D47A1] font-black not-italic underline decoration-[#E3F2FD] decoration-8 underline-offset-4">wired but tired</span>, unable to recover no matter how much you rest, and your skin begins to lose the 'bounce' it had in your 20s."
               </p>
            </motion.div>
         </div>
      </section>


      {/* SOLUTION REVEAL SECTION - OPTIMIZED FOR VISIBILITY */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-white border-y border-gray-50 overflow-hidden py-16 lg:py-20 px-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-block mb-6">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Finally, a breakthrough for every body and every age</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#111827] leading-[1.1] mb-8 tracking-tighter font-heading max-w-5xl mx-auto">
               It’s Now Possible To <span className="italic text-[#0D47A1] font-medium">Reverse Cellular Bankruptcy</span>, <br className="hidden md:block" />
               and Restore Your ‘Youth’ Molecules…
            </h2>
            <p className="text-xl md:text-2xl text-gray-500 font-medium italic leading-relaxed">
               And Stay <span className="text-[#111827] font-black not-italic">Naturally Sharp, Luminous, and Revitalized</span> with ChronoNAD+.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16 lg:mb-20">
             {/* Product Visual Area - Compact Luxury */}
              <div className="w-full lg:w-[45%]">
                  <div className="relative w-full aspect-square flex items-center justify-center group bg-white rounded-[4rem] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.05)] border border-gray-50 overflow-hidden">
                     <img 
                       src={chronoNadIsolated} 
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
                <div className="space-y-6">
                   <h3 className="text-xl md:text-2xl font-bold text-[#111827] leading-tight font-heading">We have spent years at the cutting-edge of longevity and molecular biology…</h3>
                   <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium">
                      And after searching far and wide for the most groundbreaking, up-to-date clinical research on the planet…
                   </p>
                </div>
                
                <div className="bg-[#111827] p-8 md:p-12 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-32 h-32 bg-[#0D47A1]/20 rounded-full blur-3xl"></div>
                   <h4 className="text-2xl font-black uppercase tracking-tighter mb-6">We have finally done it:</h4>
                   <p className="text-lg md:text-xl opacity-90 leading-relaxed font-medium mb-8">
                      We’ve created the world’s most advanced <span className="text-[#0D47A1] font-black">NAD+ precursor formula</span> that packs high-purity, bioavailable longevity activators into a single formula.
                   </p>
                   <div className="flex items-start gap-4 p-6 bg-white/5 rounded-2xl border border-white/10">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#0D47A1] mt-2.5 shrink-0"></div>
                      <p className="text-base opacity-80 leading-relaxed italic">
                         To target the real, root cause of biological rust, skin aging, and metabolic stalling as quickly, effectively, and safely as possible.
                      </p>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={scrollToProducts}
              className="min-w-[340px] bg-[#0D47A1] text-white font-black text-lg px-10 py-6 rounded-2xl uppercase tracking-widest hover:bg-[#0D47A1] transition-all duration-300 shadow-2xl flex items-center justify-center group"
            >
              START YOUR PROTOCOL
              <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <div className="flex items-center gap-2 text-gray-400">
               <div className="w-4 h-4 rounded-full bg-[#0D47A1] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
               </div>
               <span className="text-[10px] font-bold text-[#111827] italic uppercase tracking-widest">30 Day Clinical Efficacy Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* BREAKTHROUGHS SECTION */}
      {/* id added for nav */}
      <section id="breakthroughs" className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-[#111827] mb-6 leading-tight tracking-tight font-heading">
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
               className={`flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-16 p-8 md:p-12 rounded-[2.5rem] transition-all duration-500 hover:shadow-lg border border-white/50 ${
                 [
                   'bg-[#E3F2FD]/40', // Soft Blue
                   'bg-[#FFF3E0]/40', // Soft Peach
                   'bg-[#E3F2FD]/40', // Soft Blue
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
                       'text-[#0D47A1]',
                       'text-[#43A047]',
                       'text-[#8E24AA]',
                       'text-[#039BE5]'
                     ][i % 6]
                   }`}>Breakthrough</span>
                   <span className={`text-8xl md:text-9xl font-heading font-black leading-none ${
                     [
                       'text-[#0288D1]', 
                       'text-[#E65100]', 
                       'text-[#0D47A1]',
                       'text-[#43A047]',
                       'text-[#8E24AA]',
                       'text-[#039BE5]'
                     ][i % 6]
                   }`}>{item.num}</span>
                </div>

                
                {/* Content Section */}
                <div className="flex-grow pt-4 md:pt-10 text-center md:text-left">
                   <h3 className="text-xl md:text-2xl font-bold text-[#111827] uppercase tracking-widest mb-4 font-heading-alt italic hidden">{item.label}</h3>
                   <p className="text-xl md:text-2xl text-[#111827] leading-relaxed font-medium">
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
                   <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight font-heading">UNDENIABLE RESULTS</h4>
                    <p className="text-lg md:text-xl leading-relaxed text-gray-400 italic font-medium max-w-2xl">
                       In landmark research spanning the last two decades, scientists have confirmed that NAD+ is not just a participant, but the master regulator of cellular metabolism, DNA repair, and vitality in human cells. Declining NAD+ is now recognized as a primary driver of the aging process itself.
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
              className="w-full md:w-auto min-w-[400px] bg-[#0D47A1] text-white font-black text-xl md:text-2xl px-12 py-8 rounded-2xl uppercase tracking-widest hover:bg-[#0D47A1] transition-all duration-300 shadow-2xl flex items-center justify-center group"
            >
              Start Your Protocol
              <svg className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded bg-[#0D47A1] flex items-center justify-center">
                 <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-lg font-bold text-[#111827] italic">30 Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2 CAPSULES A DAY SECTION - REFINED BLUE & BLACK */}
      <section id="science" className="py-32 bg-white overflow-hidden border-y border-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16 space-y-6">
             <h2 className="text-3xl md:text-5xl font-bold text-[#111827] leading-tight tracking-tight font-heading">
                All It Takes Is <span className="text-[#0D47A1]">2 Capsules A Day</span> To Beat <br className="hidden md:block" />
                New Fine Wrinkles, Feeling Drained, and Looking Dull…
             </h2>
             <p className="text-xl md:text-2xl text-gray-400 font-medium italic">
                While Revitalizing Your DNA Repair, Skin Glow, and Energy
             </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8 mb-24">
             {[
               { 
                 icon: "🍀", 
                 text: "Contains 2 powerful nutrients- longevity-support compounds carefully selected by our leading longevity experts." 
               },
               { 
                 icon: "🔬", 
                 text: "Backed by decades of research and thousands of clinical studies supporting NAD+ restoration, cellular repair, and healthy aging." 
               },
               { 
                 icon: "🥛", 
                 text: "Precisely dosed to help replenish declining NAD+ levels and target the root cause of low energy and visible aging." 
               },
               { 
                 icon: "✨", 
                 text: "Supports sustained energy, radiant skin, mental clarity, and overall cellular vitality from within." 
               }
             ].map((item, i) => (
               <div key={i} className="flex items-start gap-5 group">
                  <span className="text-2xl pt-1 group-hover:scale-125 transition-transform">{item.icon}</span>
                  <p className="text-base md:text-lg text-[#111827] font-medium leading-relaxed">
                     {item.text.split(' ').map((word, index) => {
                        const boldWords = ["2", "powerful", "nutrients-", "longevity-support", "compounds", "decades", "research", "thousands", "clinical", "studies", "NAD+", "restoration,", "cellular", "repair,", "healthy", "aging.", "replenish", "declining", "root", "cause", "sustained", "energy,", "radiant", "skin,", "mental", "clarity,", "overall", "cellular", "vitality"];
                        return boldWords.includes(word.replace(/[.,]/g, '')) ? <span key={index} className="font-black text-[#0D47A1]">{word} </span> : word + " ";
                     })}
                  </p>
               </div>
             ))}
          </div>

          {/* Ingredient Circle Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
             {[
               {
                 name: "NMN / NR Protocol",
                 img: "https://images.unsplash.com/photo-1512069772995-ec65ed45afd6?auto=format&fit=crop&q=80&w=600&h=600",
                 desc: "The gold-standard precursors that bypass digestion to replenish your cellular NAD+ levels and fuel deep DNA repair."
               },
               {
                 name: "Pure Resveratrol",
                 img: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&q=80&w=600&h=600",
                 desc: "A potent Sirtuin activator that signals your 'longevity genes' to start repairing and rejuvenating every cell in your body."
               },
               {
                 name: "99%+ Purity Seal",
                 img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=600&h=600",
                 desc: "Third-party tested for clinical-grade precision. No fillers, no synthetic additives—just raw cellular fuel."
               }
             ].map((ing, i) => (
               <div key={i} className="flex flex-col items-center group">
                  <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden mb-8 border-4 border-gray-50 shadow-xl transition-transform duration-700 group-hover:scale-105">
                     <img src={ing.img} alt={ing.name} className="w-full h-full object-cover" />
                  </div>
                  <h4 className="text-xl font-bold text-[#0D47A1] mb-4 font-heading">{ing.name}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-xs font-medium">
                     {ing.desc}
                  </p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* PROTOCOL & INGREDIENTS SECTION */}
      <section id="ingredients" className="py-24 bg-white border-y border-gray-50 overflow-hidden">
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
            
            <h2 className="text-4xl md:text-6xl font-bold text-[#111827] leading-[1.05] mb-8 tracking-tight font-heading max-w-4xl mx-auto">
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
                      <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/90 via-[#111827]/40 to-transparent"></div>
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
              <h2 className="text-4xl md:text-6xl font-bold text-[#111827] leading-tight tracking-tight font-heading">
                 Two Pillars of <br />
                 <span className="italic text-[#0D47A1] font-medium">Human Longevity</span>
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
                         <span className="text-[9px] font-black uppercase tracking-widest text-[#111827] italic">High Potency</span>
                      </div>
                   </div>
                   <div className="p-10 space-y-5">
                      <div className="flex justify-between items-center">
                         <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ingredient {i+1}</span>
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#0D47A1] font-bold border-b-2 border-[#E3F2FD] pb-1">{ing.focus}</span>
                      </div>
                      <h4 className="text-xl md:text-2xl font-bold text-[#111827] font-heading-alt italic leading-[1.1]">{ing.name}</h4>
                      <p className="text-gray-500 leading-relaxed font-medium text-lg">{ing.desc}</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </section>

       {/* CHRONONAD+ TRANSFORMATION TIMELINE SECTION - REDESIGNED HORIZONTAL */}
       {/* id="timeline" injected below */}
       <section id="timeline" className="py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
           <div className="text-center mb-24 max-w-4xl mx-auto">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 mb-6 block">The Transformation</span>
               <h2 className="text-4xl md:text-6xl font-bold text-[#111827] leading-[1.05] tracking-tight font-heading mb-8">
                  What To Expect <br />
                  <span className="italic text-[#0D47A1] font-medium">On Your Journey</span>
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
                  textColor: "text-[#111827]",
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
                  textColor: "text-[#111827]",
                  tagColor: "text-[#F57C00]",
                  subTextColor: "text-gray-600",
                  borderColor: "border-orange-100"
                },
                { 
                  phase: "04",
                  time: "Week 4+", 
                  label: "PEAK VITALITY",
                  text: "Experience the full transformation. You feel a profound sense of \"cellular youth\"—balanced, sharp, and physically revitalized.",
                  bgColor: "bg-gradient-to-br from-[#111827] to-[#0D47A1]",
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
                      <span className={`text-[10px] font-black uppercase tracking-widest ${milestone.tagColor} border-b-2 border-[#0D47A1] pb-1`}>{milestone.time}</span>
                      <span className={`text-3xl font-heading font-black italic ${i % 2 === 0 ? 'text-white/20' : 'text-[#111827]/10'} group-hover:scale-110 transition-transform`}>{milestone.phase}</span>
                   </div>

                   <div className="flex-grow">
                      <h4 className={`text-xl font-black ${milestone.textColor} font-heading-alt italic leading-tight mb-4`}>{milestone.label}</h4>
                      <p className={`text-base ${milestone.subTextColor} leading-relaxed font-medium`}>
                         {milestone.text}
                      </p>
                   </div>

                   <div className={`mt-8 pt-8 border-t ${i % 2 === 0 ? 'border-white/10' : 'border-black/5'} flex items-center gap-4 text-[9px] font-black uppercase tracking-widest ${milestone.tagColor} opacity-0 group-hover:opacity-100 transition-opacity`}>
                      <span>Milestone Reached</span>
                      <div className="h-[1px] flex-grow bg-[#0D47A1]/30"></div>
                   </div>
                </motion.div>
              ))}
           </div>

          <div className="flex flex-col items-center gap-6 mt-32">
            <button 
              onClick={scrollToProducts}
              className="w-full md:w-auto min-w-[340px] bg-[#0D47A1] text-white font-black text-xl px-12 py-7 rounded-2xl uppercase tracking-widest hover:bg-[#0D47A1] transition-all duration-300 shadow-2xl flex items-center justify-center group"
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
             <h2 className="text-4xl md:text-6xl font-bold text-[#111827] leading-[1.05] tracking-tight font-heading mb-8">
                Designed For Every Body. <br />
                <span className="italic text-[#0D47A1] font-medium">No Matter The Age.</span>
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
                       'bg-[#FCE4EC]/40 border-[#FCE4EC] hover:border-[#0D47A1]/30',
                       'bg-[#E8F5E9]/40 border-[#E8F5E9] hover:border-[#43A047]/30',
                       'bg-[#F3E5F5]/40 border-[#F3E5F5] hover:border-[#8E24AA]/30'
                     ][i % 5]
                   }`}
                >
                      <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shrink-0 transition-colors shadow-sm group-hover:text-white ${
                        [
                          'text-[#0D47A1] group-hover:bg-[#0D47A1]', 
                          'text-[#E65100] group-hover:bg-[#E65100]', 
                          'text-[#0D47A1] group-hover:bg-[#0D47A1]',
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
                             'text-[#0D47A1]',
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
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/80 via-transparent to-transparent z-10"></div>
                    <img 
                       src="/sarah_m_testimonial.png" 
                       alt="Sarah M. Success Story" 
                       className="w-full h-full object-cover transition-all duration-1000 transform group-hover:scale-105"
                    />
                    <div className="absolute top-8 left-8 z-20 flex flex-col gap-1">
                       <span className="bg-[#0D47A1] text-white px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg self-start">Verified Customer</span>
                       <span className="bg-white/90 backdrop-blur-md text-[#111827] px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg self-start">Sarah M. • Age 47</span>
                    </div>
                    <div className="absolute bottom-12 left-12 right-12 z-20">
                       <p className="text-white text-xl md:text-2xl font-heading-alt italic font-black leading-tight">
                          “I finally feel like I have my spark back. My energy is steady all day, and I'm sleeping better than I have in years.”
                       </p>
                       <div className="mt-6 h-[3px] w-16 bg-[#0D47A1] shadow-glow"></div>
                    </div>
                 </div>
                {/* Decorative Background Elements */}
                <div className="absolute -top-10 -right-10 w-64 h-64 border border-[#E3F2FD] rounded-full -z-10 animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#FCE4EC]/30 rounded-full -z-10"></div>
             </div>
          </div>
        </div>
      </section>

      {/* WHAT HAPPENS WHEN YOU START TAKING CHRONONAD+ SECTION */}
      <section className="py-32 bg-white overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">
               
               {/* Left Column: Timeline Content */}
               <div className="space-y-12">
                  <div className="space-y-4">
                     <h2 className="text-4xl md:text-5xl font-bold text-[#111827] leading-[1.1] font-heading">
                        What Happens When <br />
                        <span className="italic text-[#0D47A1] font-medium">You Start Taking CHRONONAD+?</span>
                     </h2>
                  </div>

                  {/* Timeline */}
                  <div className="relative pl-12 space-y-10">
                     {/* Vertical Line */}
                     <div className="absolute left-[18px] top-4 bottom-4 w-0.5 bg-gray-100"></div>

                     {[
                        { 
                           time: "1 Week", 
                           text: "Your cells begin replenishing their NAD+ levels — the essential coenzyme responsible for energy production and repair. You may notice a subtle lift in mental clarity, a calmer, more focused mind, and the first signs of steady, clean energy without the usual dips. Sleep may feel deeper, more restorative." 
                        },
                        { 
                           time: "3-5 Weeks", 
                           text: "Energy starts to feel more consistent throughout the day — no more heavy crashes or dragging afternoons. Your skin may begin to look more refreshed and hydrated, with a softer, healthier glow. Brain fog lifts, focus sharpens, and your body starts to feel more “in sync.”" 
                        },
                        { 
                           time: "6-8 Weeks", 
                           text: "Now it’s visible. Skin looks brighter, smoother, and more radiant — the kind of glow that doesn’t come from a bottle. Fine lines may appear softer, and your overall appearance more rested and youthful. Energy, mood, and mental clarity feel steady and reliable from morning to night." 
                        },
                        { 
                           time: "A few months from now…", 
                           text: "Don’t be surprised when people start asking what you’ve changed — your skin looks fresher, your energy feels different, and there’s a noticeable vibrancy about you. You feel sharper, lighter, and more like yourself again… And the best part? You didn’t need extreme routines, endless products, or complicated protocols to get here." 
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
                              <h4 className="text-xl font-bold text-[#111827] mb-3 font-subheading">{item.time}</h4>
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
                        alt="ChronoNAD+ Results" 
                        className="w-full h-auto object-cover"
                     />
                  </div>
               </motion.div>

            </div>
         </div>
      </section>

      {/* WORKS FOR ALL AGES SECTION - REFINED */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4">
             <h2 className="text-2xl md:text-3xl font-bold text-[#0D47A1] uppercase tracking-tight font-heading">
                Works For Women Of All Ages & Body Types
             </h2>
             <p className="text-3xl md:text-5xl font-black text-[#111827] leading-tight max-w-5xl mx-auto">
                No Matter How Long You’ve Been Feeling Low Energy, Dull, or “Not Yourself”
             </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-16">
             <div className="lg:w-1/2 space-y-10">
                {[
                  {
                    title: "Reveal a more sculpted, refreshed look as your skin appears firmer and less puffy",
                    desc: "Bring back that naturally toned, vibrant appearance as your glow returns from within"
                  },
                  {
                    title: "Sleep deeply and wake up restored",
                    desc: "Enjoy more restful, uninterrupted sleep so your body can fully recharge overnight"
                  },
                  {
                    title: "Feel like yourself again",
                    desc: "Support balanced mood, clearer thinking, and steady energy throughout the day"
                  },
                  {
                    title: "Stay energized without the crashes",
                    desc: "No more dragging afternoons, brain fog, or relying on constant caffeine just to function"
                  },
                  {
                    title: "Support graceful aging from within",
                    desc: "Help your skin look smoother, brighter, and more youthful without relying on endless products"
                  },
                  {
                    title: "Enjoy life without overthinking your energy",
                    desc: "Say yes to long days, late nights, and busy schedules without feeling completely drained after"
                  }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 group">
                     <div className="shrink-0 w-8 h-8 rounded-full bg-[#0D47A1] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                     </div>
                     <div className="space-y-1">
                        <h4 className="text-lg md:text-xl font-black text-[#111827]">{item.title}</h4>
                        <p className="text-gray-600 font-medium">{item.desc}</p>
                     </div>
                  </div>
                ))}
             </div>

             <div className="lg:w-1/2">
                <div className="relative rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white transition-all duration-700">
                   <img 
                      src="https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?auto=format&fit=crop&q=80&w=800&h=1000" 
                      alt="Radiant Transformation Result" 
                      className="w-full h-auto object-cover"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* TRUST ICONS SECTION */}
      <section id="trust" className="py-24 bg-white border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16 space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Quality Assurance</span>
             <h2 className="text-3xl md:text-5xl font-bold text-[#111827] leading-tight font-heading">
               Diet Friendly <br />
               <span className="italic text-[#0D47A1] font-medium">Clinical Supplement</span>
             </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-12 md:gap-8 lg:gap-16">
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
              <div key={i} className="flex flex-col items-center text-center group">
                <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center mb-8 shadow-sm group-hover:border-[#0D47A1] group-hover:bg-white group-hover:shadow-xl transition-all duration-500 overflow-hidden p-6">
                   <img 
                      src={item.img} 
                      alt={item.label} 
                      className="w-full h-full object-contain transition-all duration-500"
                      onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=Icon'; }}
                   />
                </div>
                <p className="text-[11px] md:text-xs font-bold text-[#111827] leading-relaxed uppercase tracking-[0.2em] max-w-[160px]">
                  {item.label}
                </p>
                <div className="mt-4 h-[1px] w-0 bg-[#0D47A1] group-hover:w-8 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CHECKOUT BUNDLE SECTION - SIMPLIFIED MODERN CLASSIC */}
      <section id="pricing-grid" className="py-32 bg-white scroll-mt-20 border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Clinical Protocol Bundle</span>
             <h2 className="text-4xl md:text-6xl font-bold text-[#111827] leading-tight tracking-tight font-heading">
                Choose Your <br />
                <span className="italic text-[#0D47A1] font-medium">Transformation Path</span>
             </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto items-center">
            {[
              {
                bottleCount: 1,
                name: "One Product",
                tag: "Sustained Trial",
                pricePerJar: "$69",
                cents: ".99",
                total: "$69.99",
                isBestValue: false,
                savings: null
              },
              {
                bottleCount: 2,
                name: "Two Products",
                tag: "Optimal Protocol",
                pricePerJar: "$59",
                cents: ".99",
                total: "$119.99",
                originalTotal: "$139.99",
                isBestValue: true,
                savings: "14% OFF"
              },
              {
                bottleCount: 3,
                name: "Three Products",
                tag: "Resilience Pack",
                pricePerJar: "$52",
                cents: ".99",
                total: "$158.97",
                originalTotal: "$209.97",
                isBestValue: false,
                savings: "24% OFF"
              }
            ].map((pkg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`flex flex-col items-center text-center p-8 rounded-[2.5rem] border transition-all duration-700 group relative ${pkg.isBestValue ? 'border-[#0D47A1] bg-white shadow-[0_30px_70px_-20px_rgba(13,71,161,0.12)] z-10 scale-105 py-10' : 'border-gray-100 hover:border-gray-200 hover:shadow-lg'}`}
              >
                {pkg.isBestValue && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D47A1] text-white px-6 py-1.5 rounded-full whitespace-nowrap shadow-xl z-20">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em]">Most Popular</span>
                  </div>
                )}
                
                <div className="mb-6 relative">
                  {pkg.savings && (
                    <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-[#0D47A1] text-white flex flex-col items-center justify-center font-black text-[9px] leading-none shadow-lg z-20 group-hover:rotate-12 transition-transform">
                      <span className="text-[6px] uppercase tracking-tighter mb-0.5">Save</span>
                      <span>{pkg.savings.split(' ')[0]}</span>
                    </div>
                  )}
                  <img 
                    src={chronoNadIsolated} 
                    alt={pkg.name} 
                    className="w-32 h-32 object-contain transition-transform duration-1000 group-hover:scale-110 drop-shadow-[0_20px_40px_rgba(0,0,0,0.08)]" 
                  />
                </div>
                
                <div className="space-y-1 mb-6">
                  <h3 className="text-lg font-bold text-[#111827] font-heading">{pkg.name}</h3>
                  <p className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.2em]">{pkg.tag}</p>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-start justify-center gap-0.5">
                    <span className="text-4xl font-heading italic font-bold text-[#111827]">{pkg.pricePerJar}</span>
                    <span className="text-base font-bold text-[#111827] mt-1">{pkg.cents}</span>
                  </div>
                  <p className="text-[8px] text-[#0D47A1]/60 font-black uppercase tracking-[0.2em] mt-1">Price Per Jar</p>
                </div>
                
                <div className="mb-8 w-full pt-6 border-t border-gray-50">
                  <p className="text-xs font-bold text-[#111827]">Total {pkg.total}</p>
                  {pkg.originalTotal && <p className="text-[9px] text-gray-300 line-through mt-1">{pkg.originalTotal}</p>}
                </div>
                
                <button className={`w-full py-4 rounded-xl font-bold uppercase tracking-[0.2em] text-[9px] transition-all duration-500 shadow-md ${pkg.isBestValue ? 'bg-[#0D47A1] text-white hover:bg-[#111827]' : 'bg-white text-[#111827] border-2 border-[#111827] hover:bg-[#111827] hover:text-white'}`}>
                  Start Protocol
                </button>
                
                <div className="mt-5 flex items-center justify-center gap-2 opacity-40">
                  <div className="w-3 h-3 rounded-full bg-[#0D47A1] flex items-center justify-center shrink-0">
                    <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7"/></svg>
                  </div>
                  <span className="text-[7px] font-bold text-[#111827] uppercase tracking-widest">60-Day Guarantee</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PURCHASE PROTECTION & GUARANTEE SECTION - CELLSTART REFINED */}
      {/* id injected on section below */}
      <section id="guarantee" className="py-32 bg-white overflow-hidden border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 max-w-5xl mx-auto space-y-6">
             <h2 className="text-4xl md:text-5xl font-black text-[#111827] leading-tight tracking-tight">
                Your Purchase Is Protected By Our <br />
                <span className="text-[#0D47A1]">30 Day 100% Money Back Guarantee</span>
             </h2>
             <p className="text-lg md:text-xl text-gray-600 font-medium max-w-4xl mx-auto leading-relaxed">
                At CellStart, we believe in making sure our customers love our products, or you shouldn’t have 
                to pay for it. We’ll refund 100% of your investment on your first bottle. We’re so confident 
                in the science of NAD+ that we’ll bear all the risk.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
             {/* Free Shipping Card */}
             <div className="bg-[#F8FAFC] p-12 rounded-[3rem] text-center space-y-8 border border-[#E2E8F0]">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm">
                   <span className="text-5xl">🚚</span>
                </div>
                <div className="space-y-4">
                   <h4 className="text-2xl font-black text-[#111827]">Free Shipping On All Monthly or 2 or more bottle orders.</h4>
                   <p className="text-gray-600 font-medium leading-relaxed">
                      No one likes paying for shipping. That’s why when you purchase either our monthly delivery or 
                      two bottles or more, we take care of the shipping for you. You save more when you buy more!
                   </p>
                </div>
             </div>

             {/* 30 Day Guarantee Card */}
             <div className="bg-[#F0F7FF] p-12 rounded-[3rem] text-center space-y-8 border border-[#0D47A1]/20">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm">
                   <span className="text-5xl">🛡️</span>
                </div>
                <div className="space-y-4">
                   <h4 className="text-2xl font-black text-[#111827]">30 Day Money Back Guarantee</h4>
                   <p className="text-gray-600 font-medium leading-relaxed">
                      True cellular restoration is a journey, not an overnight fix. While some notice a "brain fog lift" early on, 
                      deep DNA repair typically happens on a 90 to 120-day cycle. If you don’t feel confident...
                   </p>
                </div>
             </div>

             {/* Instant Refunds Card */}
             <div className="bg-[#F8FAFC] p-12 rounded-[3rem] text-center space-y-8 border border-[#E2E8F0]">
                <div className="w-24 h-24 mx-auto bg-white rounded-full flex items-center justify-center shadow-sm">
                   <span className="text-5xl">💸</span>
                </div>
                <div className="space-y-4">
                   <h4 className="text-2xl font-black text-[#111827]">Instant Refunds</h4>
                   <p className="text-gray-600 font-medium leading-relaxed">
                      We want you to feel the transformative effects of youthful NAD+ levels. If you aren’t happy with how 
                      ChronoNAD works for you, we’ll give you a hassle-free, no-questions-asked refund on your first bottle.
                   </p>
                </div>
             </div>
          </div>

          <div className="flex flex-col items-center gap-8">
             <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={scrollToProducts}
                className="bg-[#0D47A1] text-white font-black text-xl px-16 py-7 rounded-2xl uppercase tracking-widest shadow-2xl shadow-[#0D47A1]/20"
             >
                TRY CHRONONAD+ NOW
             </motion.button>
             <div className="flex items-center gap-3 text-gray-500 font-black uppercase tracking-widest text-xs">
                <div className="w-5 h-5 bg-[#0D47A1] rounded flex items-center justify-center">
                   <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                </div>
                <span>30 Day Money Back Guarantee</span>
             </div>
          </div>
        </div>
      </section>


      {/* COMPREHENSIVE REVIEWS SECTION */}
      {/* THE PROOF IS IN THE RESULTS - JUDGE.ME STYLE REDESIGN */}
      <section id="results" className="py-24 bg-white border-y border-gray-50 overflow-hidden">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16 space-y-6 max-w-4xl mx-auto">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Customer Intelligence</span>
               <h2 className="text-3xl md:text-5xl font-bold text-[#111827] leading-tight tracking-tight font-heading">
                  The Proof is in <br />
                  <span className="italic text-[#0D47A1] font-medium">The Results.</span>
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
            <div className="grid grid-cols-1 gap-8 mb-16 max-w-4xl mx-auto">
               {[
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
                  }
               ].map((review, i) => (
                  <div key={i} className={`${review.bg} p-8 md:p-12 rounded-[2.5rem] border border-white flex flex-col group hover:shadow-xl transition-all duration-500`}>
                     <div className="flex justify-between items-start mb-8">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-[#0D47A1] text-white flex items-center justify-center font-black text-sm shadow-inner">{review.initial}</div>
                           <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                 <span className="font-bold text-sm text-[#111827] tracking-tight">{review.name}</span>
                                 <div className="w-4 h-4 bg-[#0D47A1] rounded-full flex items-center justify-center">
                                    <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                 </div>
                              </div>
                              <span className="text-[10px] text-gray-400 font-medium mt-0.5">Verified Buyer</span>
                           </div>
                        </div>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{review.date}</span>
                     </div>
                     
                     <div className="flex text-[#FFC107] text-[11px] mb-6">
                        {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                     </div>

                     <h4 className="text-2xl font-black text-[#0D47A1] mb-6 font-heading-alt italic tracking-tight leading-tight">{review.title}</h4>
                     <p className="text-base md:text-lg text-gray-600 leading-relaxed font-medium mb-10">"{review.body}"</p>

                     <div className="mt-auto pt-8 border-t border-white/50 flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center p-1.5 border border-white shadow-sm">
                           <img src={chronoNadIsolated} alt="product" className="w-full h-full object-contain mix-blend-multiply" />
                        </div>
                        <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400">
                           <p className="mb-1 opacity-60">Authenticated Protocol Review</p>
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
      <section id="formula" className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 max-w-4xl mx-auto">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6 block">Formula Transparency</span>
             <h2 className="text-4xl md:text-6xl font-bold text-[#111827] leading-[1.05] tracking-tight font-heading italic mb-8">
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
                      <h4 className="text-5xl font-black italic leading-none font-heading tracking-tighter">Supplement Facts</h4>
                      <div className="mt-4 flex justify-between text-xs font-black uppercase tracking-widest">
                         <span>Serving Size: 2 Capsules</span>
                         <span>Servings Per Container: 30</span>
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
                         <span className="font-bold">NAD+ Vitality Complex™</span>
                         <div className="flex gap-16 font-black">
                            <span>1000 mg</span>
                            <span>**</span>
                         </div>
                      </div>
                      <p className="text-[10px] italic py-2 leading-relaxed text-gray-500 font-medium">
                         NMN (Nicotinamide Mononucleotide), Trans-Resveratrol (99% Purity), NR (Nicotinamide Riboside).
                      </p>

                      <div className="flex justify-between items-end border-b border-gray-100 pb-2 pt-4">
                         <span className="font-bold">Bioavailability & Absorption Factor</span>
                         <div className="flex gap-16 font-black">
                            <span>50 mg</span>
                            <span>**</span>
                         </div>
                      </div>
                      <p className="text-[10px] italic py-2 leading-relaxed text-gray-500 font-medium">
                         Bioperine® (Black Pepper Extract), Quercetin Dihydrate.
                      </p>
                      
                      <div className="pt-6 border-t-[10px] border-[#0D47A1] text-[9px] font-bold text-gray-400 leading-relaxed italic">
                         ** Daily Value (DV) not established. Other ingredients: Vegetable Cellulose (Capsule), Microcrystalline Cellulose, Silica.
                      </div>
                   </div>
                </div>
             </div>

             {/* Right: Product Bottle Render */}
             <div className="lg:col-span-6">
                <div className="relative group">
                   <div className="absolute inset-0 bg-[#0D47A1]/5 rounded-[3rem] blur-3xl group-hover:bg-[#0D47A1]/10 transition-colors"></div>
                   <img 
                      src={chronoNadIsolated} 
                      alt="ChronoNAD+ Bottle Render" 
                      className="w-full h-auto object-contain relative z-10 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105 mix-blend-multiply"
                   />
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* MISSION & EXPERT TEAM SECTION - REFINED BLUE & BLACK */}
      <section id="team" className="py-0 overflow-hidden bg-white">
         {/* Mission Header Bar */}
         <div className="bg-white py-20 md:py-24 border-y border-gray-50">
            <div className="max-w-7xl mx-auto px-6 text-center">
               <h2 className="text-xl md:text-2xl font-bold text-[#0D47A1] mb-6 font-heading tracking-tight">
                  We’re On A Mission to Help 100,000,000 Women Naturally,
               </h2>
               <p className="text-4xl md:text-6xl font-black text-[#111827] leading-[1.1] max-w-5xl mx-auto">
                  Safely Lose Weight In 2025... <span className="text-gray-400 font-medium">And Feel Like Themselves Again</span>
               </p>
            </div>
         </div>

         {/* Scientific Leadership - Dr. Anthony Njapa */}
         <div className="py-24 md:py-32 bg-white">
            <div className="max-w-6xl mx-auto px-6">
               <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                  
                  {/* Left Column: Image & Badge */}
                  <div className="relative">
                     {/* Decorative background border */}
                     <div className="absolute -top-6 -left-6 w-full h-full border-t border-l border-[#0D47A1]/20 rounded-tl-[4rem] -z-10"></div>
                     
                     <div className="relative z-10 rounded-[3rem] overflow-hidden bg-gray-100">
                        <img 
                           src="https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800&h=1000" 
                           alt="Dr. Anthony Njapa" 
                           className="w-full h-[500px] lg:h-[600px] object-cover object-top"
                        />
                     </div>

                     {/* Floating Badge */}
                     <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="absolute -bottom-8 right-0 lg:-right-12 bg-[#002855] text-white p-8 rounded-3xl shadow-2xl z-20 min-w-[280px]"
                     >
                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 mb-2 font-accent">Clinical Background</p>
                        <p className="text-xl font-bold tracking-tight">22+ Years in Medicine</p>
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
      <section id="faq" className="py-32 bg-gray-50/30">
         <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-20 space-y-4">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D47A1]/40 block">Common Inquiries</span>
               <h2 className="text-3xl md:text-5xl font-bold text-[#111827] leading-tight tracking-tight font-heading">
                  Expert Protocol <br />
                  <span className="italic text-[#0D47A1] font-medium">Support</span>
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
                  <h3 className="text-3xl font-black mb-6 font-heading italic tracking-tighter">ChronoNAD+™</h3>
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
                  © 2025 ChronoNAD+. Formulated by Happy Koala, LLC. These statements have not been evaluated by the Food and Drug Administration. This product is not intended to diagnose, treat, cure, or prevent any disease.
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
