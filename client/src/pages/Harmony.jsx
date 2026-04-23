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
      q: "Is it safe?", 
      a: "Yes, ChronoNAD+ is formulated with ingredients that have been extensively studied in human trials and manufactured in certified facilities." 
    },
    { 
      q: "How long until I see results?", 
      a: "While some feel an energy boost within days, most users experience significant metabolic and clarity results after 2-4 weeks of consistent use." 
    },
    {
      q: "Can I take it with other supplements?",
      a: "ChronoNAD+ is designed to be compatible with most health regimens. However, we always recommend consulting with your physician before starting any new supplement."
    },
    { 
      q: "What is the best time to take it?", 
      a: "For optimal results, take 2 capsules in the morning on an empty stomach or with a light meal to align with your body's natural baseline metabolism." 
    },
    { 
      q: "Is it suitable for vegans?", 
      a: "Yes, ChronoNAD+ uses 100% plant-based capsules and contains no animal-derived ingredients." 
    },
    { 
      q: "Does it contain artificial fillers?", 
      a: "No. Our formula is free from artificial colors, preservatives, and common allergens like gluten, soy, and dairy." 
    },
    { 
      q: "Do I need to refrigerate it?", 
      a: "Refrigeration is not required. Simply store it in a cool, dry place away from direct sunlight to maintain potency." 
    }
  ]

  const productImg = isMobile ? "/mobilehero.png" : "/Hormony_hero_image.png"

  return (
    <div className="font-sans antialiased text-[#1A237E] bg-white selection:bg-[#0D47A1] selection:text-white">
      
      {/* HERO SECTION - SKY, BLUE & PINK (NO BLACK) */}
      <section className="relative min-h-screen flex flex-col items-center justify-center bg-white overflow-hidden py-16 lg:py-20 px-6">
         {/* Subtle Background Clinical Grid - Deep Blue */}
         <div className="absolute inset-0 pointer-events-none opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(#0D47A1 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
         
         <div className="max-w-6xl mx-auto text-center relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.8, ease: "easeOut" }}
               className="flex flex-col items-center"
            >
               {/* Trust Indicator - Sky Blue & Pink */}
               <div className="inline-flex items-center gap-3 bg-[#E3F2FD] border border-[#BBDEFB] px-5 py-2 rounded-full mb-6 lg:mb-8 shadow-sm">
                  <div className="flex -space-x-2">
                     {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-5 h-5 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                           <img src={`https://i.pravatar.cc/100?u=${i+10}`} alt="user" className="w-full h-full object-cover opacity-90" />
                        </div>
                     ))}
                  </div>
                  <span className="text-[9px] font-black text-[#0D47A1] uppercase tracking-[0.3em]">Trusted by 3M+ Women</span>
                  <div className="w-2 h-2 rounded-full bg-[#F06292] animate-pulse"></div> {/* Pink Accent */}
               </div>

               {/* Master Headline - Deep Blue */}
               <h1 className="text-4xl md:text-6xl lg:text-[5.2rem] font-serif text-[#1A237E] leading-[1.0] mb-8 lg:mb-10 tracking-tight max-w-5xl">
                  Restore Your Body. <br />
                  <span className="italic text-[#F06292] font-medium">Reclaim Your Baseline.</span>
               </h1>

               {/* High-Level Narrative - Deep Blue Muted */}
               <p className="text-lg md:text-xl text-[#283593]/70 font-medium italic leading-relaxed mb-10 lg:mb-12 max-w-3xl mx-auto">
                  Hormone Harmony targets destructive cortisol at the root—restoring your metabolic energy, stabilizing your mood, and refining your natural profile.
               </p>

               {/* Clinical Metrics - Sky & Pink Dashboard */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 w-full mb-12 lg:mb-16 py-8 border-y border-[#E3F2FD]">
                  {[
                     { text: "Cortisol Reduction", val: "44%", accent: "#F06292" }, // Pink
                     { text: "Deep Sleep Optimization", val: "72%", accent: "#03A9F4" }, // Sky Blue
                     { text: "Mood Stabilization", val: "43%", accent: "#BA68C8" }, // Purple-Pink
                     { text: "Weight Loss Accuracy", val: "86%", accent: "#0288D1" }  // Deep Blue
                  ].map((item, i) => (
                     <div key={i} className="flex flex-col items-center">
                        <span className="text-3xl font-black text-[#0D47A1] mb-1">{item.val}</span>
                        <div className="flex items-center gap-2">
                           <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: item.accent }}></div>
                           <span className="text-[9px] font-black text-[#0288D1]/50 uppercase tracking-widest text-center">{item.text}</span>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Primary Protocol CTA - Deep Blue */}
               <div className="flex flex-col items-center gap-5">
                  <button 
                     onClick={scrollToProducts}
                     className="min-w-[320px] bg-[#0D47A1] text-white font-black text-lg px-10 py-6 rounded-[2rem] uppercase tracking-widest hover:bg-[#F06292] transition-all duration-300 shadow-xl flex items-center justify-center group relative overflow-hidden"
                  >
                     <span className="relative z-10">Start My Protocol</span>
                     <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                  </button>
                  <div className="flex items-center gap-2 text-[#0D47A1]">
                     <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                     <span className="text-[10px] font-bold italic">Clinical 60-Day Money Back Guarantee</span>
                  </div>
               </div>
            </motion.div>
         </div>
      </section>

      {/* EDITORIAL PRESS SECTION - PINK & BLUE ACCENTS (NO BLACK) */}
      <section className="py-20 bg-white border-b border-[#E3F2FD] overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center">
             <div className="inline-flex items-center gap-4 mb-16">
                <div className="h-[1px] w-12 bg-[#E3F2FD]"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0D47A1]/40">Editorial Endorsements</span>
                <div className="h-[1px] w-12 bg-[#E3F2FD]"></div>
             </div>

             {/* Interactive Logo Strip */}
             <div className="w-full relative group">
                <div className="flex flex-wrap justify-center items-center gap-x-16 gap-y-12 md:gap-x-24 opacity-50 group-hover:opacity-100 transition-opacity duration-700">
                  {[
                    { brand: "COSMOPOLITAN", quote: "It made me so calm and centred, my husband instantly noticed the change." },
                    { brand: "WOMEN'S HEALTH", quote: "My confidence is back. My belly feels flat. And I feel like myself again!" },
                    { brand: "VOGUE", quote: "Most effective dietary supplements I’ve discovered recently, and a real game-changer." },
                    { brand: "MARIE CLAIRE", quote: "Marie Claire’s top picks for perimenopause and hormonal reset." },
                    { brand: "USA TODAY", quote: "My happiness is returning and my body is stronger. Blown away by how fast it works!" },
                    { brand: "BODY+SOUL", quote: "My tummy is definitely better than it was, which is nothing less than a miracle." }
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="cursor-help relative group/logo"
                    >
                      <span className="font-serif text-xl md:text-2xl font-black tracking-tighter text-[#1A237E] uppercase">{item.brand}</span>
                      
                      {/* Tooltip Quote - Pink & Blue Style */}
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-8 w-64 opacity-0 group-hover/logo:opacity-100 transition-all duration-500 pointer-events-none scale-95 group-hover/logo:scale-100 translate-y-2 group-hover/logo:translate-y-0">
                         <div className="bg-[#0D47A1] text-white p-6 rounded-2xl shadow-2xl relative text-center">
                            <p className="text-[11px] font-medium leading-relaxed italic tracking-wide">"{item.quote}"</p>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-[#0D47A1] rotate-45 -translate-y-2"></div>
                         </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
             </div>

             {/* Mobile Support Narrative */}
             <p className="mt-16 text-[9px] font-black uppercase tracking-[0.2em] text-[#0288D1]/30 md:hidden italic text-center">Tap logos to view editorial insights</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION - PINK & BLUE (NO BLACK) */}
      <section className="py-32 bg-white overflow-hidden relative">
         {/* Decorative Background Accents - Pink & Sky */}
         <div className="absolute top-0 right-0 w-96 h-96 bg-[#FCE4EC] rounded-full blur-[120px] opacity-40 -z-10"></div>
         <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E1F5FE] rounded-full blur-[120px] opacity-40 -z-10"></div>

         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center lg:items-end justify-between mb-24 gap-12">
               <div className="max-w-2xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-3 bg-[#FCE4EC] text-[#EC407A] px-4 py-1.5 rounded-full mb-6 border border-[#F8BBD0]">
                     <span className="text-[10px] font-black uppercase tracking-widest">Verified Success Stories</span>
                  </div>
                  <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-[1.1] font-serif italic">
                     Real Results. <br />
                     <span className="italic text-[#F06292] font-medium">Clinically Measured.</span>
                  </h2>
               </div>
               
               <div className="flex items-center gap-8 py-6 px-10 bg-white border border-[#E3F2FD] rounded-[2.5rem] shadow-sm">
                  <div className="text-center">
                     <span className="block text-3xl font-black text-[#0D47A1]">3M+</span>
                     <span className="text-[9px] font-black uppercase tracking-widest text-[#0288D1]/40">Total Protocols</span>
                  </div>
                  <div className="w-[1px] h-10 bg-[#E3F2FD]"></div>
                  <div className="text-center">
                     <span className="block text-3xl font-black text-[#F06292]">4.9</span>
                     <span className="text-[9px] font-black uppercase tracking-widest text-[#F06292]/40">Average Rating</span>
                  </div>
               </div>
            </div>

          {/* Testimonial Mosaic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
            {[
              {
                name: "Jenna T.",
                headline: "LIFE-CHANGING!!!",
                body: "I feel 20yrs younger, I sleep like a baby, my joints feel oiled... and I’ve lost weight without even trying. These capsules are pure magic.",
                initial: "J",
                colSpan: "lg:col-span-2",
                tag: "Weight & Vitality"
              },
              {
                name: "Karen G.",
                headline: "It's like I’m aging backwards!",
                body: "I feel like I’m glowing from the inside out. My hair’s fuller, my face is tighter, my belly is vanishing... and I feel stronger, sharper.",
                initial: "K",
                tag: "Glow & Profile"
              },
              {
                name: "Tina F.",
                headline: "I’ll never be without this",
                body: "I was sweating through my pajamas every night. Two weeks into this, I’m sleeping better, I feel calm, and I’m not bloated 24/7.",
                initial: "T",
                tag: "Deep Sleep"
              },
              {
                name: "Deb A.",
                headline: "I finally feel like ME again.",
                body: "I didn’t expect much. Just figured I’d try it because I was desperate. But WOW... My pants are looser, my brain fog is gone and my energy is back.",
                initial: "D",
                colSpan: "lg:col-span-2",
                tag: "Hormonal Rebound"
              }
               ].map((review, i) => (
                  <motion.div 
                     key={i} 
                     whileHover={{ y: -10 }}
                     className={`bg-white p-12 rounded-[3rem] border border-[#E3F2FD] shadow-sm relative overflow-hidden group transition-all duration-500 hover:shadow-2xl hover:border-[#F06292]/20 ${review.colSpan || ''}`}
                  >
                     <span className="absolute -top-10 -right-10 text-[15rem] font-serif italic text-[#E3F2FD]/50 pointer-events-none group-hover:text-[#FCE4EC]/50 transition-colors duration-700">{review.initial}</span>
                     
                     <div className="relative z-10">
                        <div className="flex items-center justify-between mb-10">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-[#0D47A1] text-white flex items-center justify-center font-black text-xs shadow-lg">{review.initial}</div>
                              <div className="flex flex-col">
                                 <span className="text-sm font-black text-[#1A237E] uppercase tracking-tight">{review.name}</span>
                                 <div className="flex items-center gap-1.5">
                                    <div className="w-1 h-1 rounded-full bg-[#F06292] animate-pulse"></div>
                                    <span className="text-[8px] font-black text-[#0288D1]/40 uppercase tracking-widest">Verified Buyer</span>
                                 </div>
                              </div>
                           </div>
                           <span className="px-4 py-1.5 rounded-full border border-[#E3F2FD] text-[8px] font-black uppercase tracking-widest text-[#0D47A1]/40 group-hover:bg-[#F06292] group-hover:text-white group-hover:border-[#F06292] transition-all">{review.tag}</span>
                   </div>

                   <div className="flex text-[#1A237E] mb-6 text-xs gap-1">
                      {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                   </div>
                   
                   <h4 className="text-2xl font-black text-[#1A237E] mb-4 font-serif italic leading-tight group-hover:text-gray-600 transition-colors">{review.headline}</h4>
                   <p className="text-lg text-gray-500 font-medium leading-relaxed italic pr-8">"{review.body}"</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Final Section CTA */}
          <div className="flex flex-col items-center gap-8">
            <motion.button 
               whileHover={{ scale: 1.02 }}
               whileTap={{ scale: 0.98 }}
               onClick={scrollToProducts}
               className="min-w-[380px] bg-[#0D47A1] text-white font-black text-xl px-12 py-8 rounded-[2.5rem] uppercase tracking-widest hover:bg-[#F06292] transition-all duration-500 shadow-2xl flex items-center justify-center group relative overflow-hidden"
            >
               <span className="relative z-10">Start My Transformation</span>
               <svg className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </motion.button>
            <div className="flex items-center gap-2 text-gray-400">
               <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
               <span className="text-[10px] font-black italic uppercase tracking-widest">Clinical 60-Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* CORTISOL NARRATIVE SECTION */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-[#1A237E] mb-6 leading-[1.1] tracking-tight font-serif">
              As Women Age, Their Bodies Produce Up <br className="hidden md:block" />
              To 20% MORE Cortisol (Stress Hormone) <br className="hidden md:block" />
              Every Single Year...
            </h2>
            <p className="text-xl text-gray-400 font-medium italic">And that’s when <span className="text-[#1A237E] underline decoration-[#0D47A1] decoration-2 underline-offset-8 font-bold">everything changes</span> in their bodies.</p>
          </div>

          {/* Comparison Block - Redesigned for High Impact */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-20 bg-white border border-gray-100 rounded-[2.5rem] overflow-hidden shadow-2xl">
             {/* Before - The Struggle */}
             <div className="p-10 md:p-14 text-left border-b md:border-b-0 md:border-r border-gray-100 bg-gray-50/50">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400 mb-8 block">The Reality</span>
                <div className="space-y-10">
                   {[
                     { text: "From puffy and double-chinned" },
                     { text: "From the dreaded “cortisol apple shape”" },
                     { text: "From snappy and irritable" }
                   ].map((item, i) => (
                     <div key={i} className="flex items-start gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center shrink-0 mt-1">
                           <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"/></svg>
                        </div>
                        <p className="text-lg font-bold text-gray-400 group-hover:text-gray-500 transition-colors">{item.text}</p>
                     </div>
                   ))}
                </div>
             </div>
             
             {/* After - The Harmony Effect */}
             <div className="p-10 md:p-14 text-left bg-white relative">
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#1A237E] mb-8 block">The Harmony Effect</span>
                <div className="space-y-10">
                   {[
                     { text: "to chiseled and snatched" },
                     { text: "to flat, toned, and hot" },
                     { text: "to calm, uplifted, and balanced" }
                   ].map((item, i) => (
                     <div key={i} className="flex items-start gap-4 group">
                        <div className="w-6 h-6 rounded-full bg-[#0D47A1] flex items-center justify-center shrink-0 mt-1">
                           <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                        </div>
                        <p className="text-lg font-bold text-[#1A237E]">{item.text}</p>
                     </div>
                   ))}
                </div>
             </div>
          </div>

          {/* Narrative Body - Improved Typography & Spacing */}
          <div className="space-y-12 text-lg md:text-xl text-[#1F2937] leading-relaxed mb-20 max-w-3xl mx-auto">
             <div className="space-y-4">
                <p>Are all symptoms of excess cortisol that forces the body to hold onto <span className="font-black text-[#1A237E] underline decoration-[#0D47A1] decoration-2 underline-offset-4">FAT and WATER</span>...</p>
                <p className="text-gray-400 font-medium">And that’s only what women see in the mirror.</p>
             </div>

             <div className="h-[1px] w-20 bg-gray-100 mx-auto"></div>

             <p className="italic">On the <span className="font-bold text-[#1A237E] not-italic underline decoration-[#0D47A1] decoration-1 underline-offset-4">inside</span>? There’s a hormonal storm wreaking havoc on women’s energy and mood.</p>
             
             <div className="bg-gray-50 rounded-3xl p-10 space-y-6 text-left border border-gray-100">
                <div className="flex items-start gap-5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#0D47A1] mt-3 shrink-0"></div>
                   <p>They <span className="font-black text-[#1A237E]">feel exhausted and snappy</span> during the day...</p>
                </div>
                <div className="flex items-start gap-5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#0D47A1] mt-3 shrink-0"></div>
                   <p><span className="font-black text-[#1A237E]">Wired & tired</span> when their body needs to sleep or relax...</p>
                </div>
                <div className="flex items-start gap-5">
                   <div className="w-1.5 h-1.5 rounded-full bg-[#0D47A1] mt-3 shrink-0"></div>
                   <p>And <span className="font-black text-[#1A237E]">unable to lose weight</span>, no matter what they do.</p>
                </div>
             </div>

             <p>If that ever happened to you, it’s not your fault. These are symptoms of too much cortisol in the body...</p>
             <p className="text-gray-400">And unfortunately, it doesn’t stop here.</p>
             <p>By the time you reach menopause, your key hormones plummet by a whopping 60%...</p>
             <div className="bg-[#0D47A1] text-white p-10 rounded-[2rem] shadow-2xl">
                <p className="font-bold leading-relaxed">
                   These are the hormones that keep your skin tight and glowy, your hair luscious, your body weight down, and your water weight out of the system...
                </p>
             </div>
          </div>

          {/* Expert Insights - Highlight Boxes Redesigned */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
             <div className="bg-white border border-gray-100 p-10 rounded-[2rem] text-left relative overflow-hidden group hover:border-[#0D47A1]/10 transition-colors">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0D47A1]/10 group-hover:bg-[#0D47A1] transition-colors"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 block">Bio-Marker 01</span>
                <p className="font-bold text-lg leading-relaxed text-[#1F2937]">
                   Elevated Cortisol levels retain massive amounts of water... Which rounds up and puffs the face, the belly, arms, and legs...
                </p>
             </div>
             <div className="bg-white border border-gray-100 p-10 rounded-[2rem] text-left relative overflow-hidden group hover:border-[#0D47A1]/10 transition-colors">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-[#0D47A1]/10 group-hover:bg-[#0D47A1] transition-colors"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 block">Bio-Marker 02</span>
                <p className="font-bold text-lg leading-relaxed text-[#1F2937]">
                   Other key hormones plummet and start holding onto fat... So the body stubbornly becomes ‘bigger’, especially around the thighs and the midsection.
                </p>
             </div>
          </div>

          <div className="text-lg md:text-xl text-[#1F2937] mb-20 max-w-3xl mx-auto">
             <p className="mb-12 font-medium">So if you’ve ever witnessed...</p>
             
             <div className="space-y-6 mb-16">
                {[
                  { text: "Double-chin appearing overnight and out of nowhere...", icon: "👤" },
                  { text: "A round, swollen face looking like a pillow...", icon: "👤" },
                  { text: "A full belly that spills over your jeans and skirts...", icon: "👗" },
                  { text: "Or a jawline trapped under a layer of fatty soft tissue...", icon: "📐" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-6 p-6 bg-gray-50/50 rounded-2xl border border-transparent hover:border-gray-100 transition-all text-left">
                     <span className="text-2xl grayscale shrink-0">{item.icon}</span>
                     <p className="font-bold text-[#1A237E]">{item.text.replace('➡️ ', '')}</p>
                  </div>
                ))}
             </div>

             <div className="space-y-6 mb-20">
                <p className="text-2xl md:text-3xl font-serif italic text-[#1A237E]">“You’re not alone... It happens to MILLIONS of women just like you.”</p>
             </div>

             <div className="space-y-12">
                <p className="text-2xl font-black underline decoration-[#0D47A1] decoration-4 underline-offset-8">Diet and exercise just won’t cut it anymore.</p>
                <div className="h-[1px] w-20 bg-gray-100 mx-auto"></div>
                
                <div className="space-y-8">
                  <p>Sure, they’ll keep the body strong and healthy... But won’t totally fix cortisol spiking in the body... or the rapid downfall of your ‘slim’ hormones...</p>
                  <p className="font-bold text-2xl text-[#1A237E]">Fortunately — there’s a way to reverse that.</p>
                  <p>And it all starts by going to the root cause...</p>
                  
                  <div className="py-12 border-y border-gray-100 space-y-6">
                    <p className="font-black text-3xl md:text-4xl text-[#1A237E] font-serif">The Snatched Face, <br /> The Toned Body...</p>
                    <p className="text-xl font-medium text-gray-500 italic">So you can LOVE your body once again...</p>
                  </div>

                  <p className="font-black mt-8 text-xs uppercase tracking-[0.4em] text-gray-400">No matter your age, body type, genetics, or unique hormonal profile!</p>
                </div>
             </div>
          </div>

          <div className="flex flex-col items-center gap-4">
            <button 
              onClick={scrollToProducts}
              className="w-full md:w-auto min-w-[400px] bg-[#0D47A1] text-white font-black text-xl md:text-2xl px-12 py-8 rounded-2xl uppercase tracking-widest hover:bg-[#F06292] transition-all duration-300 shadow-2xl flex items-center justify-center group"
            >
              Try Hormone Harmony
              <svg className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <div className="flex items-center gap-3 mt-4">
              <div className="w-5 h-5 rounded bg-[#0D47A1] flex items-center justify-center">
                 <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
              </div>
              <span className="text-lg font-bold text-[#1A237E] italic">60 Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* SOLUTION REVEAL SECTION - OPTIMIZED FOR VISIBILITY */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-white border-y border-gray-50 overflow-hidden py-16 lg:py-20 px-6">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12 lg:mb-16">
            <div className="inline-block mb-6">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 border-x border-gray-200 px-6 py-1">The Breakthrough</span>
            </div>
            
            <h2 className="text-3xl md:text-5xl lg:text-[4.5rem] font-black text-[#1A237E] leading-[1.0] mb-6 tracking-tight font-serif max-w-5xl mx-auto">
               Finally, It’s Possible To Block Excess <br className="hidden md:block" />
               Cortisol & Balance Your <span className="italic text-gray-400 font-medium">‘Slim’ Hormones</span>
            </h2>
            <p className="text-lg text-gray-400 font-medium italic">Stay Naturally Fit & Sculpted with <span className="text-[#1A237E] font-bold not-italic">Hormone Harmony</span></p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 mb-16 lg:mb-20">
             {/* Product Visual Area - Compact Luxury */}
             <div className="w-full lg:w-[40%] relative">
                <div className="relative z-10 aspect-[5/6] bg-white rounded-[3.5rem] shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] overflow-hidden group">
                   <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white"></div>
                   <div className="relative w-full h-full flex items-center justify-center p-12">
                      <img 
                        src="/Hormony_hero_image.png" 
                        alt="Hormone Harmony Clinical Formula" 
                        className="max-h-full object-contain drop-shadow-2xl transform group-hover:scale-105 transition-transform duration-1000"
                      />
                   </div>
                   <div className="absolute top-8 right-8 bg-[#0D47A1] text-white px-4 py-1.5 rounded-full shadow-lg">
                      <span className="text-[8px] font-black uppercase tracking-widest">Clinical Strength</span>
                   </div>
                </div>
             </div>

             {/* Science & Proof Copy - Compact Editorial */}
             <div className="w-full lg:w-[60%] space-y-10 text-left">
                <div className="space-y-4">
                   <h3 className="text-xl md:text-2xl font-bold text-[#1A237E] leading-tight font-serif italic">“We have finally done it.”</h3>
                   <p className="text-base md:text-lg text-gray-500 leading-relaxed font-light">
                      We have spent the last <span className="font-bold text-[#1A237E]">8 years on the cutting-edge</span> of natural hormone-balancing science...
                   </p>
                </div>
                
                <div className="grid grid-cols-1 gap-6">
                   {[
                     { num: "01", text: "After searching for clinical research, we created the world’s first 100% natural formula of its kind." },
                     { num: "02", text: "A synergistic blend of 12 clinically-backed nutrients targeting the root cause of weight gain." },
                     { num: "03", text: "Eliminate bloating and puffiness as quickly, effectively and safely as possible." }
                   ].map((item, i) => (
                      <div key={i} className="flex items-start gap-5 group">
                         <span className="text-3xl font-serif text-[#1A237E]/5 font-black italic group-hover:text-[#1A237E]/10 transition-colors">{item.num}</span>
                         <p className="text-base md:text-lg text-[#1F2937] leading-relaxed py-1">{item.text}</p>
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
              Try Hormone Harmony
              <svg className="w-5 h-5 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
            </button>
            <div className="flex items-center gap-2 text-gray-400">
               <div className="w-4 h-4 rounded-full bg-[#0D47A1] flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
               </div>
               <span className="text-[10px] font-bold text-[#1A237E] italic">60 Day Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </section>

      {/* BREAKTHROUGHS SECTION */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] mb-6 leading-tight tracking-tight font-serif">
              30 Years. 6 Discoveries. <br />
              <span className="italic text-gray-400 font-medium">One Perfect Solution.</span>
            </h2>
            <div className="flex items-center justify-center gap-4">
               <div className="h-[1px] w-12 bg-gray-200"></div>
               <span className="text-xs font-black uppercase tracking-[0.4em] text-[#1A237E]">Locked In A Single Capsule</span>
               <div className="h-[1px] w-12 bg-gray-200"></div>
            </div>
          </div>

          {/* 6 Breakthroughs Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
             {[
               { tag: "Stress Management", num: "1", text: "The adaptogenic herb that drops cortisol levels by 44% for better sleep & mood, and visibly reduced puffiness." },
               { tag: "Hormonal Balance", num: "2", text: "A ancient botanical extract used for centuries to support natural estrogen balance in women." },
               { tag: "Metabolic Support", num: "3", text: "Groundbreaking extract that stabilizes blood sugar and stops fat from accumulating in problem areas." },
               { tag: "Water Flush", num: "4", text: "Eliminate water retention and 'heaviness' while flushing toxins that accumulate in the tissues." },
               { tag: "Toxin Relief", num: "5", text: "Natural herbal support to reduce inflammation-related puffiness and promote systemic detoxification." },
               { tag: "Vitality Boost", num: "6", text: "Mediterranean fruit complex that keeps your cellular energy buzzing at any age, without the crash." }
             ].map((item, i) => (
               <div key={i} className="relative bg-white border border-gray-100 p-10 rounded-[2.5rem] group hover:border-[#0D47A1] transition-all duration-500 hover:shadow-2xl overflow-hidden">
                  {/* Background Number */}
                  <span className="absolute -bottom-10 -right-5 text-[12rem] font-serif font-black italic text-gray-50/50 -z-10 group-hover:text-gray-100/50 transition-colors">{item.num}</span>
                  
                  <span className="inline-block text-[9px] font-black uppercase tracking-widest text-gray-400 mb-6 border-b border-gray-100 pb-2">{item.tag}</span>
                  
                  <p className="text-lg md:text-xl text-[#1F2937] leading-relaxed font-medium relative z-10">{item.text}</p>
                  
                  <div className="mt-8 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                     <span className="text-[10px] font-black uppercase tracking-widest text-[#1A237E] underline decoration-[#0D47A1] underline-offset-4">Learn More</span>
                  </div>
               </div>
             ))}
          </div>

          {/* Undeniable Results Box - Redesigned for High Authority */}
          <div className="bg-[#0D47A1] text-white p-12 md:p-16 rounded-[3rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] relative overflow-hidden mb-20 group">
             {/* Background Pattern */}
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/5 to-transparent opacity-50"></div>
             
             <div className="relative z-10 flex flex-col lg:flex-row items-center gap-16">
                <div className="shrink-0 relative">
                   {/* Graphical Indicator */}
                   <div className="w-40 h-40 md:w-56 md:h-56 rounded-full border-[12px] border-white/10 flex flex-col items-center justify-center relative">
                      <div className="absolute inset-0 rounded-full border-[12px] border-white border-t-transparent border-l-transparent rotate-[45deg]"></div>
                      <span className="text-6xl md:text-8xl font-serif italic font-black leading-none">86%</span>
                      <span className="text-[10px] font-black uppercase tracking-widest mt-2">Verified Success</span>
                   </div>
                </div>
                
                <div className="flex-grow space-y-6 text-center lg:text-left">
                   <div className="inline-block px-4 py-1 bg-white/10 rounded-full mb-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.2em]">Scientific Spotlight</span>
                   </div>
                   <h4 className="text-3xl md:text-5xl font-black uppercase tracking-tighter leading-tight">Undeniable Clinical Results</h4>
                   <p className="text-lg md:text-xl leading-relaxed text-gray-400 italic font-light max-w-2xl">
                      “In a double-blind, placebo-controlled study, researchers observed a dramatic shift in body composition and cortisol markers for women using the Hormone Harmony protocol.”
                   </p>
                   <div className="pt-4 flex flex-wrap justify-center lg:justify-start gap-8 opacity-50">
                      <span className="text-xs font-black uppercase tracking-widest">USA Manufactured</span>
                      <span className="text-xs font-black uppercase tracking-widest">Third-Party Tested</span>
                      <span className="text-xs font-black uppercase tracking-widest">GMP Certified</span>
                   </div>
                </div>
             </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <button 
              onClick={scrollToProducts}
              className="w-full md:w-auto min-w-[400px] bg-[#0D47A1] text-white font-black text-xl md:text-2xl px-12 py-8 rounded-2xl uppercase tracking-widest hover:bg-[#F06292] transition-all duration-300 shadow-2xl flex items-center justify-center group"
            >
              Try Hormone Harmony
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
                  <span className="text-3xl md:text-4xl font-black uppercase tracking-[0.1em]">3 Capsules A Day</span>
               </div>
            </motion.div>
            
            <h2 className="text-3xl md:text-6xl font-black text-[#1A237E] leading-[1.05] mb-6 tracking-tight font-serif max-w-4xl mx-auto">
               The Protocol To Beat Hormonal Weight, <br />
               <span className="italic text-gray-400 font-medium">Puffiness and Bloating...</span>
            </h2>
            <p className="text-xl text-gray-500 font-medium italic">Uplifting Mood, Deep Sleep and Resilient Energy</p>
          </div>

          {/* Protocol Grid - Redesigned as Icon Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24 max-w-5xl mx-auto">
             {[
               { icon: "🌿", title: "12 Natural Extracts", text: "Hand-selected by leading nutrition and hormonal weight loss experts for synergistic efficacy." },
               { icon: "🔬", title: "Clinical Authority", text: "Backed by decades of peer-reviewed research and thousands of successful human trials." },
               { icon: "⚖️", title: "Precise Dosage", text: "Perfectly measured to target the root cause of cortisol-driven hormonal imbalances." },
               { icon: "🎈", title: "Systemic Relief", text: "Addresses puffiness and stubborn fat while actively supporting mood and sleep cycles." }
             ].map((item, i) => (
               <div key={i} className="flex items-start gap-6 p-8 bg-gray-50/50 border border-gray-100 rounded-3xl hover:bg-white hover:border-[#0D47A1] transition-all group">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] group-hover:text-white transition-colors">
                     <span className="text-xl grayscale group-hover:grayscale-0">{item.icon}</span>
                  </div>
                  <div>
                     <h4 className="text-lg font-black text-[#1A237E] uppercase tracking-widest mb-2">{item.title}</h4>
                     <p className="text-gray-500 leading-relaxed">{item.text}</p>
                  </div>
               </div>
             ))}
          </div>

          <div className="h-[1px] w-40 bg-gray-100 mx-auto mb-24"></div>

          {/* Ingredients Showcase - Botanical Lab Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               {
                 name: "Ashwagandha",
                 focus: "Stress Defense",
                 desc: "Drops cortisol levels by up to 44% in minutes by gently blocking the hormone that triggers water retention.",
                 img: "/assets/ashwagandha.png"
               },
               {
                 name: "Gelatinised Maca",
                 focus: "Hormonal Harmony",
                 desc: "Reduces hot flashes by up to 87% while stimulating natural hormone production for steady energy.",
                 img: "/assets/maca.png"
               },
               {
                 name: "Rhodiola Rosea",
                 focus: "Mental Clarity",
                 desc: "Lifts mood and clears brain fog in just 30 minutes, balancing cortisol for sustained focus.",
                 img: "/assets/rhodiola.png"
               }
             ].map((ing, i) => (
               <div key={i} className="flex flex-col bg-white border border-gray-100 rounded-[3rem] overflow-hidden group hover:shadow-2xl transition-all duration-500">
                  <div className="aspect-square bg-gray-50 relative flex items-center justify-center p-12 overflow-hidden">
                     <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                     {/* Placeholder for ingredient visual */}
                     <div className="w-40 h-40 rounded-full border border-gray-200 flex items-center justify-center relative z-10">
                        <svg className="w-16 h-16 text-[#1A237E]/10 group-hover:text-[#1A237E] transition-colors" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                     </div>
                     <div className="absolute bottom-6 right-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1A237E]/20 group-hover:text-[#1A237E] transition-colors italic">High Potency</span>
                     </div>
                  </div>
                  <div className="p-10 space-y-4">
                     <div className="flex justify-between items-center">
                        <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Ingredient {i+1}</span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#1A237E] underline decoration-[#0D47A1] decoration-2 underline-offset-4">{ing.focus}</span>
                     </div>
                     <h4 className="text-2xl font-black text-[#1A237E] font-serif italic">{ing.name}</h4>
                     <p className="text-gray-500 leading-relaxed font-medium">{ing.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* RESULTS TIMELINE SECTION */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row items-start gap-16 lg:gap-24">
             {/* Left: Sticky Headline & Visual */}
             <div className="w-full lg:w-[40%] lg:sticky lg:top-32">
                <div className="space-y-10">
                   <div className="space-y-4">
                      <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">The Transformation</span>
                      <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-[1.05] tracking-tight font-serif">
                         What To Expect <br />
                         <span className="italic text-gray-400 font-medium">On Your Journey</span>
                      </h2>
                   </div>
                   
                   <p className="text-xl text-gray-500 font-medium italic leading-relaxed">
                      Follow the clinical timeline as Hormone Harmony restores balance to your system from the inside out.
                   </p>

                   <div className="rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] bg-gray-50 relative group border border-gray-100">
                      <div className="absolute inset-0 bg-[#0D47A1]/5 group-hover:bg-transparent transition-colors"></div>
                      <img 
                         src="/Harmony_Timeline_Person.png" 
                         alt="Happy Customer Result" 
                         className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                      />
                      <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-xl">
                         <span className="text-[10px] font-black uppercase tracking-widest text-[#1A237E]">Verified Result</span>
                      </div>
                   </div>
                </div>
             </div>

             {/* Right: Narrative Timeline Cards */}
             <div className="w-full lg:w-[60%] relative py-10">
                {/* Vertical Path */}
                <div className="absolute left-[23px] md:left-[31px] top-0 bottom-0 w-[1px] bg-[#E3F2FD]"></div>

                {[
                  { 
                    phase: "01",
                    time: "24 Hours", 
                    label: "The Calm Wave",
                    icon: "🌊",
                    text: "Feel the first wave of calm as cortisol — your body’s main stress hormone — begins to drop. Mood swings feel softer, your head feels clearer, and sleep starts to come easier. Some women even notice the puffiness in their face easing overnight." 
                  },
                  { 
                    phase: "02",
                    time: "Day 7", 
                    label: "Systemic Shift",
                    icon: "👗",
                    text: "Your clothes start to feel looser as stubborn hormonal belly bloat begins to shrink. Hot flashes and night sweats calm down, leaving you sleeping deeper and waking with more energy. Sugar cravings aren’t controlling your every thought anymore." 
                  },
                  { 
                    phase: "03",
                    time: "Day 14", 
                    label: "Visual Clarity",
                    icon: "📐",
                    text: "Catch your reflection and see it — your once puffy face now looks more chiseled, your jawline sharper. Your belly is flatter, your skin more vibrant, and your moods far more stable. Energy is steady all day without the caffeine crashes." 
                  },
                  { 
                    phase: "04",
                    time: "Week 4+", 
                    label: "Full Harmony",
                    icon: "✨",
                    text: "The puffiness, bloating, cranky moods, and stubborn hormonal weight are gone. You feel balanced, confident, and comfortable in your own body again... and the best part? You didn’t have to starve yourself or run a marathon to get here." 
                  }
                ].map((milestone, i) => (
                  <motion.div 
                     key={i} 
                     initial={{ opacity: 0, x: 20 }}
                     whileInView={{ opacity: 1, x: 0 }}
                     transition={{ duration: 0.8, delay: i * 0.1 }}
                     className="relative mb-16 last:mb-0 pl-16 md:pl-24"
                  >
                     {/* Timeline Marker */}
                     <div className="absolute left-[-24px] md:left-[-16px] top-4">
                        <div className="w-12 h-12 rounded-full bg-white border border-gray-100 shadow-xl flex items-center justify-center relative z-10 group cursor-default">
                           <div className="w-3 h-3 rounded-full bg-[#0D47A1] group-hover:scale-150 transition-transform duration-500 animate-pulse"></div>
                        </div>
                     </div>
                     
                     <div className="bg-white p-10 md:p-14 rounded-[3rem] border border-gray-100 shadow-sm hover:shadow-2xl hover:border-[#0D47A1] transition-all duration-500 group relative overflow-hidden">
                        {/* Background Phase Number */}
                        <span className="absolute top-10 right-10 text-6xl font-serif font-black italic text-gray-50/50 -z-10 group-hover:text-gray-100/50 transition-colors">{milestone.phase}</span>
                        
                        <div className="flex flex-col gap-6">
                           <div className="flex items-center gap-4">
                              <span className="text-xs font-black uppercase tracking-widest text-[#1A237E] border-b-2 border-[#0D47A1] pb-1">{milestone.time}</span>
                              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 italic">— {milestone.label}</span>
                           </div>
                           <h4 className="text-2xl md:text-3xl font-black text-[#1A237E] font-serif italic">{milestone.label}</h4>
                           <p className="text-lg md:text-xl text-gray-500 leading-relaxed font-medium">{milestone.text}</p>
                        </div>

                        <div className="mt-8 flex items-center gap-4 text-[10px] font-black uppercase tracking-widest text-[#1A237E] opacity-0 group-hover:opacity-100 transition-opacity">
                           <span>Clinical Milestone Reached</span>
                           <div className="h-[1px] w-12 bg-[#0D47A1]"></div>
                        </div>
                     </div>
                  </motion.div>
                ))}
             </div>
          </div>

          <div className="flex flex-col items-center gap-6 mt-32">
            <button 
              onClick={scrollToProducts}
              className="w-full md:w-auto min-w-[400px] bg-[#0D47A1] text-white font-black text-xl md:text-2xl px-12 py-8 rounded-2xl uppercase tracking-widest hover:bg-[#F06292] transition-all duration-300 shadow-2xl flex items-center justify-center group"
            >
              Try Hormone Harmony
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

      {/* INCLUSIVE BENEFITS SECTION */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center lg:text-left mb-20 max-w-4xl">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6 block">Universal Efficacy</span>
             <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-[1.05] tracking-tight font-serif mb-8">
                Designed For Every Woman. <br />
                <span className="italic text-gray-400 font-medium">No Matter The Struggle.</span>
             </h2>
             <p className="text-xl text-gray-500 font-medium italic max-w-2xl">
                Whether you’ve been battling stubborn weight for weeks or decades, Hormone Harmony is engineered to restore your natural baseline.
             </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
             {/* Benefits List - Redesigned as Premium Cards */}
             <div className="lg:col-span-7 space-y-4">
                {[
                  { 
                    title: "Sculpted Jawline & Flattened Midsection", 
                    desc: "Watch as fat and systemic puffiness leave your face and body, revealing your natural bone structure." 
                  },
                  { 
                    title: "Deep, Restorative Sleep Cycles", 
                    desc: "Transition into effortless sleep without tossing or turning, waking up truly recharged and balanced." 
                  },
                  { 
                    title: "Resilient Mood & Uplifting Vitality", 
                    desc: "Eliminate the 'wired & tired' feeling, replacing it with a steady, calm, and positive energy all day." 
                  },
                  { 
                    title: "Effortless Weight Management", 
                    desc: "Lose stubborn hormonal weight without the need for punishing diets or unsustainable workout routines." 
                  },
                  { 
                    title: "Bloat-Free Nutritional Freedom", 
                    desc: "Enjoy your favorite meals and social dinners without the immediate regret of heaviness and bloating." 
                  }
                ].map((benefit, i) => (
                  <div key={i} className="group flex items-center gap-8 p-8 bg-gray-50/50 border border-gray-100 rounded-3xl hover:bg-white hover:border-[#0D47A1] hover:shadow-2xl transition-all duration-500">
                     <div className="w-10 h-10 rounded-full bg-white border border-gray-100 flex items-center justify-center shrink-0 group-hover:bg-[#0D47A1] group-hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                     </div>
                     <div>
                        <h4 className="text-xl font-black text-[#1A237E] uppercase tracking-tight mb-1">{benefit.title}</h4>
                        <p className="text-gray-500 font-medium">{benefit.desc}</p>
                     </div>
                  </div>
                ))}
             </div>

             {/* Success Image - Dramatic Artistic Frame */}
             <div className="lg:col-span-5 relative">
                <div className="relative z-10 rounded-[4rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.2)] aspect-[4/5] border-8 border-white">
                   <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-10"></div>
                   <img 
                      src="/Harmony_Success_Story.png" 
                      alt="Happy Confident Woman" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000 transform hover:scale-110"
                   />
                   <div className="absolute bottom-10 left-10 z-20">
                      <p className="text-white text-3xl font-serif italic font-black">“I finally feel <br /> like myself again.”</p>
                      <div className="mt-4 h-[2px] w-12 bg-white/50"></div>
                   </div>
                </div>
                {/* Decorative Background Elements */}
                <div className="absolute -top-10 -right-10 w-64 h-64 border border-gray-100 rounded-full -z-10"></div>
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gray-50 rounded-full -z-10"></div>
             </div>
          </div>
        </div>
      </section>

      {/* TRUST ICONS SECTION */}
      <section className="py-24 bg-white border-y border-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-4 block">Quality Assurance</span>
             <h2 className="text-2xl md:text-4xl font-black text-[#1A237E] leading-tight font-serif italic">
               Try Our Diet Friendly Supplement Today!
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

          <div className="text-center mb-20">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6 block">Order Fulfillment</span>
             <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-tight tracking-tight font-serif italic">Choose Your Clinical Protocol</h2>
          </div>

          {/* Pricing Grid - Bento Style Varied Heights */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 items-end max-w-6xl mx-auto">
             {[
               {
                 id: "starter",
                 tag: "Protocol Starter",
                 bottleCount: 1,
                 pricePerJar: "$69",
                 cents: ".99",
                 total: "$69.99",
                 installment: "$17.49",
                 isPopular: false,
                 isBestValue: false,
                 savings: null
               },
               {
                 id: "savings",
                 tag: "Optimal Transformation",
                 bottleCount: 4,
                 pricePerJar: "$52",
                 cents: ".49",
                 total: "$209.99",
                 originalTotal: "$279.99",
                 installment: "$52.49",
                 isPopular: false,
                 isBestValue: true,
                 savings: "25% OFF",
                 bonus: "Free Shipping + Cookbook"
               },
               {
                 id: "popular",
                 tag: "Maintenance Protocol",
                 bottleCount: 2,
                 pricePerJar: "$59",
                 cents: ".99",
                 total: "$119.99",
                 originalTotal: "$139.99",
                 installment: "$29.99",
                 isPopular: true,
                 isBestValue: false,
                 savings: "14% OFF",
                 bonus: "Free Shipping"
               }
             ].map((pkg, i) => (
               <div key={i} className={`relative bg-white flex flex-col items-center text-center transition-all duration-700 group ${pkg.isBestValue ? 'rounded-[2.5rem] border-[3px] border-[#0D47A1] p-1 min-h-[520px] shadow-[0_30px_60px_-15px_rgba(13,71,161,0.15)] z-10' : 'rounded-[2rem] border border-[#E3F2FD] p-0.5 min-h-[460px] hover:border-[#0D47A1]/20'}`}>
                  {pkg.isBestValue && (
                     <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0D47A1] text-white px-8 py-2 rounded-full whitespace-nowrap shadow-xl">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Most Transformative</span>
                     </div>
                  )}
                  
                  <div className={`w-full py-2.5 rounded-[2rem] mb-2 ${pkg.isBestValue ? 'bg-[#0D47A1] text-white' : 'bg-[#E3F2FD] text-[#0D47A1]'}`}>
                     <span className="text-[9px] font-black uppercase tracking-[0.3em]">{pkg.tag}</span>
                  </div>
                  
                  <div className="px-6 py-2 flex flex-col flex-grow w-full">
                     <div className="relative mb-4 mx-auto">
                        {pkg.savings && (
                           <div className="absolute -top-4 -right-4 w-14 h-14 rounded-full bg-white border-2 border-[#F06292] text-[#F06292] flex flex-col items-center justify-center font-black text-xs leading-none shadow-lg z-20 group-hover:bg-[#F06292] group-hover:text-white transition-colors duration-500">
                              <span className="text-[7px] uppercase tracking-tighter mb-0.5">Save</span>
                              <span className="text-base">{pkg.savings.split(' ')[0]}</span>
                           </div>
                        )}
                        <img 
                           src="/Hormony_hero_image.png" 
                           alt={`${pkg.bottleCount} Bottles`} 
                           className={`h-32 md:h-36 object-contain transition-all duration-700 ${pkg.bottleCount > 1 ? 'scale-110' : ''}`}
                        />
                     </div>

                     <div className="mb-4">
                        <div className="flex items-start justify-center gap-1">
                           <span className="text-4xl font-serif italic font-black text-[#1A237E]">{pkg.pricePerJar}</span>
                           <span className="text-base font-bold text-[#1A237E] mt-1">{pkg.cents}</span>
                        </div>
                        <p className="text-[7px] text-[#0288D1]/40 font-black uppercase tracking-[0.2em]">Price Per Protocol Jar</p>
                     </div>

                     <div className="mb-4 space-y-0.5">
                        <p className="text-[10px] font-bold text-[#0D47A1]/60">Total {pkg.originalTotal && <span className="line-through">{pkg.originalTotal}</span>} <span className="text-[#1A237E] font-black text-sm">{pkg.total}</span></p>
                        <p className="text-[7px] text-[#0288D1]/40 uppercase tracking-widest font-black">Or 4 payments of {pkg.installment}</p>
                     </div>

                     <div className="mt-auto space-y-3">
                        <button className="w-full bg-[#0D47A1] hover:bg-[#F06292] text-white font-black py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg uppercase tracking-widest transition-all duration-500 group/btn overflow-hidden relative">
                           <span className="relative z-10 text-xs">Start Protocol</span>
                           <svg className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                        </button>

                        <div className="flex items-center justify-center gap-2 opacity-50">
                           <div className="w-3.5 h-3.5 rounded-full bg-[#0D47A1] flex items-center justify-center shrink-0">
                              <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="5" d="M5 13l4 4L19 7"/></svg>
                           </div>
                           <span className="text-[8px] font-black text-[#1A237E] uppercase tracking-widest">60-Day Guarantee</span>
                        </div>
                     </div>
                  </div>
               </div>
             ))}
          </div>

          {/* Trust Footer - Redesigned as Security Brief */}
          <div className="max-w-5xl mx-auto bg-gray-50/50 backdrop-blur-md p-10 md:p-16 rounded-[3.5rem] flex flex-col lg:flex-row items-center gap-16 border border-gray-100">
             <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Security Encryption</span>
                <div className="flex items-center gap-6">
                   <div className="h-10 px-6 bg-white border border-gray-100 rounded-full flex items-center shadow-sm hover:border-[#0D47A1] transition-colors"><span className="text-[10px] text-[#1A237E] font-black uppercase tracking-widest">PayPal</span></div>
                   <div className="h-10 px-6 bg-[#0D47A1] rounded-full flex items-center shadow-lg"><span className="text-[10px] text-white font-black uppercase tracking-widest italic">VISA</span></div>
                   <div className="flex items-center ml-2">
                      <div className="w-8 h-8 rounded-full bg-[#0D47A1] -mr-4 border-2 border-white shadow-md"></div>
                      <div className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white shadow-md"></div>
                   </div>
                </div>
             </div>
             
             <div className="flex flex-col md:flex-row items-center gap-10 flex-grow lg:border-l lg:pl-16 border-gray-100">
                <div className="w-20 h-20 shrink-0 relative">
                   <div className="absolute inset-0 bg-[#0D47A1]/5 rounded-3xl animate-pulse"></div>
                   <svg className="w-full h-full text-[#1A237E] relative z-10 p-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                </div>
                <div className="space-y-3">
                   <p className="text-xs md:text-sm text-gray-500 leading-relaxed font-medium">
                      We use a <span className="text-[#1A237E] font-black">256-bit secure shopping cart</span> where 100% of your data is encrypted, safe and secure. This is the same data security standard used by most banks, governments and military organizations.
                   </p>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* RISK REVERSAL GUARANTEE SECTION */}
      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="mb-24 max-w-4xl mx-auto">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6 block">Consumer Protection</span>
             <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-tight tracking-tight font-serif mb-8">
                Your Transformation. <br />
                <span className="italic text-gray-400 font-medium">Fully Guaranteed.</span>
             </h2>
             <p className="text-xl text-gray-500 font-medium italic">
                We take all the risk so you can experience the life-changing benefits of Hormone Harmony with absolute peace of mind.
             </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {[
               {
                 title: "Clinical Efficacy Guarantee",
                 desc: "If you don't feel a significant wave of calm, reduced bloating, and a systemic shift in your energy within 60 days, we'll refund your first bottle instantly.",
                 icon: "M12 2L3 7v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-9-5z"
               },
               {
                 title: "Priority Protocol Shipping",
                 desc: "We prioritize 2 and 4 bottle orders with expedited fulfillment and free shipping, ensuring your protocol starts without delay.",
                 icon: "M13 10V3L4 14h7v7l9-11h-7z"
               },
               {
                 title: "Seamless Refund Protocol",
                 desc: "No fine print. No hidden obstacles. If Hormone Harmony isn't the breakthrough you were looking for, our support team handles your refund with medical precision.",
                 icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
               }
             ].map((pill, i) => (
               <div key={i} className="group p-12 rounded-[3.5rem] bg-gray-50/50 border border-gray-100 flex flex-col items-center text-center hover:bg-white hover:border-[#0D47A1] hover:shadow-2xl transition-all duration-700">
                  <div className="w-20 h-20 mb-10 rounded-3xl bg-white border border-gray-100 flex items-center justify-center group-hover:bg-[#0D47A1] group-hover:text-white transition-all duration-500 shadow-sm">
                     <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d={pill.icon} />
                     </svg>
                  </div>
                  <h4 className="text-xl font-black text-[#1A237E] uppercase tracking-tight mb-4">{pill.title}</h4>
                  <p className="text-gray-500 leading-relaxed font-medium">{pill.desc}</p>
               </div>
             ))}
          </div>
        </div>
      </section>

      {/* COMPREHENSIVE REVIEWS SECTION */}
      <section className="py-32 bg-white border-y border-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-24 max-w-4xl mx-auto">
             <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6 block">Customer Intelligence</span>
             <h2 className="text-4xl md:text-6xl font-black text-[#1A237E] leading-tight tracking-tight font-serif italic mb-8">
                The Proof is in <br />
                <span className="text-gray-400 font-medium">The Results.</span>
             </h2>
             <p className="text-xl text-gray-500 font-medium italic">
                Join over 53,814 women who have restored their hormonal baseline and reclaimed their vitality with the Hormone Harmony protocol.
             </p>
          </div>

          {/* Trust Dashboard - Redesigned for Premium Look */}
          <div className="bg-gray-50/50 backdrop-blur-md rounded-[3rem] p-10 md:p-14 mb-20 flex flex-col lg:flex-row items-center justify-between border border-gray-100 gap-12">
             <div className="flex items-center gap-10">
                <div className="flex flex-col items-center lg:items-start">
                   <div className="text-6xl font-serif italic font-black text-[#1A237E]">4.8</div>
                   <div className="flex text-[#1A237E] text-xl mb-1 mt-2">
                      {[...Array(5)].map((_, i) => <span key={i}>★</span>)}
                   </div>
                   <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest">Global Satisfaction Score</span>
                </div>
                <div className="h-20 w-[1px] bg-gray-200 hidden lg:block"></div>
                <div className="flex flex-col">
                   <span className="text-3xl font-black text-[#1A237E]">99%</span>
                   <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mt-1 italic">Would Recommend Protocol</span>
                </div>
             </div>
             
             <div className="flex flex-col items-center lg:items-end gap-6">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center">
                      <svg className="w-5 h-5 text-[#1A237E]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                   </div>
                   <span className="text-sm font-black uppercase tracking-widest text-[#1A237E]">Verified Clinical Trust Score</span>
                </div>
                <div className="flex -space-x-3">
                   {[...Array(5)].map((_, i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center overflow-hidden">
                         <img src={`https://i.pravatar.cc/100?u=${i}`} alt="user" className="w-full h-full object-cover grayscale" />
                      </div>
                   ))}
                   <div className="w-10 h-10 rounded-full border-2 border-white bg-[#0D47A1] text-white flex items-center justify-center text-[10px] font-black">+53k</div>
                </div>
             </div>
          </div>

          {/* Review Feed - Redesigned as 2-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
             {[
               {
                 name: "Tamara A.",
                 title: "No More Searching!!!",
                 body: "I finally found my help and my getting back to normal! I tried over 5 plus different types of supplements to help me with my Hot Flashes & Night Sweats !!!! Lord I was breaking out in sweats anywhere... I still have a little warmth at night but not Drenched & Soaking like a River anymore !!!!!! Harmony Hormone you are the Sh*t!!!!",
                 date: "4 months ago",
                 initials: "TA"
               },
               {
                 name: "Arjeet R.",
                 title: "Worth every penny!",
                 body: "I have been taking hormone harmony for almost a month and have just ordered more. Since having children my hormones have been all over the place. Since taking this i have never felt calmer and I don’t have the dreaded water weight anymore. If you have been struggling, this could just be what you need.",
                 date: "4 months ago",
                 initials: "AR"
               },
               {
                 name: "M.W.",
                 title: "Lasting effects!",
                 body: "I’ve been using hormone harmony for 2 years and it continues to benefit me. I recognize decreased puffiness on my waist within the first two weeks and it just keeps getting better.",
                 date: "3 months ago",
                 initials: "MW"
               },
               {
                 name: "Alyssa V.",
                 title: "I feel amazing",
                 body: "I don't typically feel the benefits of supplements, but this one has made me feel energized and I recognize decreased water retention on my waist within the first two weeks.",
                 date: "4 months ago",
                 initials: "AV"
               }
             ].map((review, i) => (
               <div key={i} className="group bg-white p-10 md:p-14 rounded-[3.5rem] border border-gray-100 hover:border-[#0D47A1] hover:shadow-2xl transition-all duration-700 relative overflow-hidden flex flex-col">
                  {/* Background Initial */}
                  <span className="absolute top-10 right-10 text-6xl font-serif font-black italic text-gray-50/50 -z-10 group-hover:text-gray-100/50 transition-colors">{review.initials}</span>
                  
                  <div className="flex items-start gap-4 mb-8">
                     <div className="w-12 h-12 rounded-full bg-[#0D47A1] text-white flex items-center justify-center font-black text-xs uppercase tracking-widest">{review.initials}</div>
                     <div>
                        <div className="flex items-center gap-2">
                           <p className="font-black text-[#1A237E] uppercase tracking-tight">{review.name}</p>
                           <svg className="w-4 h-4 text-[#1A237E]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        </div>
                        <p className="text-[10px] font-black text-gray-300 uppercase tracking-widest">Verified Protocol User</p>
                     </div>
                  </div>

                  <div className="flex-grow">
                     <div className="flex justify-between items-start mb-6">
                        <div className="flex text-[#1A237E] text-lg">
                           {[...Array(5)].map((_, j) => <span key={j}>★</span>)}
                        </div>
                        <span className="text-[10px] font-black text-gray-300 uppercase tracking-widest">{review.date}</span>
                     </div>
                     <h4 className="text-2xl font-black text-[#1A237E] font-serif italic mb-6 leading-tight">{review.title}</h4>
                     <p className="text-lg text-gray-500 leading-relaxed font-medium mb-8">"{review.body}"</p>
                  </div>

                  <div className="mt-auto flex items-center gap-3 py-4 border-t border-gray-50">
                     <div className="w-10 h-14 bg-gray-50 rounded-xl overflow-hidden shrink-0 border border-gray-100">
                        <img src="/Hormony_hero_image.png" alt="Reviewing Product" className="w-full h-full object-contain p-2 grayscale group-hover:grayscale-0 transition-all duration-700" />
                     </div>
                     <div className="text-[9px] leading-tight font-black uppercase tracking-widest text-gray-400">
                        <p className="mb-1">Authenticated Protocol Review</p>
                        <p className="text-[#1A237E]">Hormone Harmony™</p>
                     </div>
                  </div>
               </div>
             ))}
          </div>

          <div className="flex flex-col items-center gap-12">
             <button className="text-xs font-black uppercase tracking-[0.4em] text-[#1A237E] border-b-2 border-[#0D47A1] pb-2 hover:text-gray-400 hover:border-gray-400 transition-all">
                Access All 53,814 Reviews
             </button>

             <div className="flex flex-col items-center gap-6 w-full">
               <button 
                 onClick={scrollToProducts}
                 className="w-full md:w-auto min-w-[400px] bg-[#0D47A1] text-white font-black text-xl md:text-2xl px-12 py-8 rounded-[2rem] uppercase tracking-widest hover:bg-[#F06292] transition-all duration-300 shadow-2xl flex items-center justify-center group"
               >
                 Start My Transformation
                 <svg className="w-6 h-6 ml-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
               </button>
               <div className="flex items-center gap-3">
                 <div className="w-5 h-5 rounded bg-[#0D47A1] flex items-center justify-center">
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"/></svg>
                 </div>
                 <span className="text-lg font-bold text-[#1A237E] italic">60-Day Clinical Guarantee</span>
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
                      src="/Hormony_hero_image.png" 
                      alt="Hormone Harmony Bottle Render" 
                      className="w-full h-auto object-contain relative z-10 drop-shadow-2xl transition-transform duration-700 group-hover:scale-105"
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
            <div className="text-center mb-20">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400 mb-6 block">Common Inquiries</span>
               <h2 className="text-4xl md:text-5xl font-black text-[#1A237E] font-serif italic mb-6">Expert Protocol Support</h2>
               <p className="text-lg text-gray-500 font-medium italic">Everything you need to know about the Hormone Harmony system.</p>
            </div>
            
            <div className="space-y-4">
              {[
                { q: "How quickly will I notice the systemic shift?", a: "Most women report a distinct wave of calm and reduced bloating within the first 9-14 days of the protocol. Clinical effects stabilize around day 60." },
                { q: "Is the Hormone Harmony protocol safe with other medications?", a: "While our botanicals are 100% natural, we always recommend consulting with your clinical provider before beginning any new protocol if you are on prescribed medication." },
                { q: "What happens if I miss a daily dosage?", a: "Simply resume your protocol the following day. Consistency is key for hormonal baseline restoration, but a single missed day will not disrupt long-term progress." },
                { q: "Why the 4-bottle protocol for optimal transformation?", a: "Hormonal baseline restoration is a systemic process. Clinical data shows that the most profound and lasting metabolic shifts occur between months 3 and 4." }
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
               <div className="flex items-center gap-6 grayscale opacity-30 hover:opacity-100 transition-all">
                  <div className="h-6 w-12 bg-white/10 rounded"></div>
                  <div className="h-6 w-12 bg-white/10 rounded"></div>
                  <div className="h-6 w-12 bg-white/10 rounded"></div>
               </div>
            </div>
         </div>
      </footer>

    </div>
  )
}
