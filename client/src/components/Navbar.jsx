import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

export default function Navbar() {
  const navigate = useNavigate()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [isAccountModalOpen, setIsAccountModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: 'Home', href: '/harmony' },
    { name: 'Shop', href: '#pricing-grid' },
    { name: 'Learn', href: '#science' },
    { name: 'About Us', href: '#story' },
    { name: 'Contact', href: '#faq' },
  ]

  const scrollToSection = (e, href) => {
    if (href.startsWith('#')) {
      e.preventDefault()
      const element = document.querySelector(href)
      if (element) {
        const offset = 100 // Adjust for rounded navbar height
        const bodyRect = document.body.getBoundingClientRect().top
        const elementRect = element.getBoundingClientRect().top
        const elementPosition = elementRect - bodyRect
        const offsetPosition = elementPosition - offset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    } else {
      navigate(href)
    }
    setIsMobileMenuOpen(false)
  }

  const handleSearch = (query) => {
    setSearchQuery(query)
    if (query.length > 1) {
      const allItems = [
        { id: 1, name: 'ChronoNAD+ Recovery Formula', type: 'Product', href: '#pricing-grid', description: 'Our signature cellular rejuvenation formula.' },
        { id: 2, name: 'Understanding NAD+ Bioavailability', type: 'Science', href: '#science', description: 'Deep dive into how our formula works.' },
        { id: 3, name: 'The Genesis Path', type: 'Article', href: '#story', description: 'Your journey to cellular renewal.' },
        { id: 4, name: 'Customer Success Stories', type: 'Reviews', href: '#testimonials', description: 'Real results from real women over 30.' },
      ]
      const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.type.toLowerCase().includes(query.toLowerCase())
      )
      setSearchResults(filtered)
    } else {
      setSearchResults([])
    }
  }

  return (
    <header className="fixed top-0 left-0 w-full z-[10000] flex justify-center p-4 transition-all duration-500 pointer-events-none">
      <motion.nav
        layout
        initial={false}
        animate={{
          y: isScrolled ? -120 : 0,
          opacity: isScrolled ? 0 : 1,
          pointerEvents: isScrolled ? 'none' : 'auto',
          backgroundColor: 'rgba(255, 255, 255, 1)',
          width: 'min(1200px, 92%)'
        }}
        transition={{ 
          duration: 0.4,
          ease: "easeInOut"
        }}
        className="pointer-events-auto flex items-center justify-between h-16 lg:h-20 overflow-hidden px-6 md:px-24 rounded-full shadow-sm border border-gray-100"
      >
        {/* Logo */}
        <div className="flex items-center shrink-0 cursor-pointer" onClick={() => navigate('/harmony')}>
          <img src="/logo.png" alt="CellStart" className="h-9 md:h-11 w-auto" />
        </div>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-10 mx-6">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="text-[14px] font-bold text-[#111827] hover:text-[#0D47A1] transition-colors whitespace-nowrap"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Icons & Button */}
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => navigate('/quiz')}
              className="bg-[#0D47A1] text-white px-7 py-3 rounded-full text-[13px] font-black uppercase tracking-widest hover:bg-[#111827] transition-all shadow-lg hover:shadow-xl active:scale-95"
            >
              Take the Quiz
            </button>
            <div className="h-6 w-[1px] bg-gray-200 mx-2"></div>
            <button 
              onClick={() => setIsSearchOpen(true)}
              className="text-[#111827] hover:text-[#0D47A1] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
            </button>
            <button 
              onClick={() => setIsAccountModalOpen(true)}
              className="text-[#111827] hover:text-[#0D47A1] transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            </button>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="text-[#111827] hover:text-[#0D47A1] transition-colors relative"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" /></svg>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 text-[#111827] focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </motion.nav>
 
       {/* Mobile Menu Overlay */}
       <AnimatePresence>
         {isMobileMenuOpen && (
           <>
             <motion.div
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               onClick={() => setIsMobileMenuOpen(false)}
               className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9000] pointer-events-auto lg:hidden"
             />
             <motion.div
               initial={{ x: '100%' }}
               animate={{ x: 0 }}
               exit={{ x: '100%' }}
               transition={{ type: 'spring', damping: 25, stiffness: 200 }}
               className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white z-[9001] shadow-2xl p-8 flex flex-col pointer-events-auto lg:hidden"
             >
               <div className="flex items-center justify-between mb-12">
                 <img src="/logo.png" alt="CellStart" className="h-7 w-auto" />
                 <button 
                   onClick={() => setIsMobileMenuOpen(false)}
                   className="p-2 text-[#111827]"
                 >
                   <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                 </button>
               </div>
 
               <div className="flex flex-col gap-8">
                 {navLinks.map((link) => (
                   <a
                     key={link.name}
                     href={link.href}
                     onClick={(e) => scrollToSection(e, link.href)}
                     className="text-2xl font-black text-[#111827] hover:text-[#0D47A1] transition-colors"
                   >
                     {link.name}
                   </a>
                 ))}
               </div>
 
               <div className="mt-auto space-y-6">
                 <button 
                   onClick={() => {
                     navigate('/quiz')
                     setIsMobileMenuOpen(false)
                   }}
                   className="w-full bg-[#0D47A1] text-white py-5 rounded-2xl font-black uppercase tracking-widest shadow-xl"
                 >
                   Take the Quiz
                 </button>
                 
                 <div className="flex items-center justify-center gap-8 text-[#111827]">
                   <button onClick={() => { setIsSearchOpen(true); setIsMobileMenuOpen(false); }}>
                     <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                   </button>
                   <button onClick={() => { setIsAccountModalOpen(true); setIsMobileMenuOpen(false); }}>
                     <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                   </button>
                   <button onClick={() => { setIsCartOpen(true); setIsMobileMenuOpen(false); }}>
                     <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 0a2 2 0 100 4 2 2 0 000-4z" /></svg>
                   </button>
                 </div>
               </div>
             </motion.div>
           </>
         )}
       </AnimatePresence>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/95 backdrop-blur-md z-[20000] flex flex-col items-center justify-center p-6 pointer-events-auto overflow-y-auto"
          >
            <button 
              onClick={() => {
                setIsSearchOpen(false)
                setSearchQuery('')
                setSearchResults([])
              }}
              className="absolute top-10 right-10 text-[#111827] p-2 hover:bg-gray-100 rounded-full transition-all"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
            <div className="w-full max-w-2xl space-y-12 py-20">
              <div className="space-y-4 text-center">
                <h3 className="text-3xl md:text-5xl font-black text-[#111827] tracking-tighter">What are you looking for?</h3>
                <p className="text-gray-400 font-medium">Search for "NAD+", "Chrono", or "Science" to see results.</p>
              </div>
              <div className="relative">
                <input 
                  autoFocus
                  type="text" 
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="Search products, articles..." 
                  className="w-full text-2xl md:text-4xl bg-transparent border-b-4 border-[#0D47A1] py-4 focus:outline-none font-bold text-[#111827] placeholder:text-gray-300 transition-all"
                />
                <button className="absolute right-0 bottom-4 text-[#0D47A1]">
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </button>
              </div>

              {/* Results Section */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="grid grid-cols-1 gap-4 pt-4"
                  >
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        onClick={(e) => {
                          scrollToSection(e, result.href)
                          setIsSearchOpen(false)
                          setSearchQuery('')
                          setSearchResults([])
                        }}
                        className="flex flex-col items-start p-6 rounded-3xl bg-gray-50 hover:bg-blue-50 transition-all text-left group"
                      >
                        <div className="flex items-center gap-3 mb-1">
                          <span className="text-[10px] font-black uppercase tracking-widest text-[#0D47A1] bg-blue-100/50 px-2 py-1 rounded-md">{result.type}</span>
                          <h4 className="text-xl font-bold text-[#111827] group-hover:text-[#0D47A1] transition-colors">{result.name}</h4>
                        </div>
                        <p className="text-gray-500 text-sm font-medium">{result.description}</p>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cart Side Drawer */}
      <AnimatePresence>
        {isCartOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[20000] pointer-events-auto"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full md:w-[450px] bg-white z-[20001] shadow-2xl flex flex-col pointer-events-auto"
            >
              <div className="p-8 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-2xl font-black text-[#111827] tracking-tight">Your Cart</h3>
                <button onClick={() => setIsCartOpen(false)} className="text-[#111827] hover:rotate-90 transition-transform duration-300">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex-grow flex flex-col items-center justify-center p-8 space-y-6">
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                </div>
                <p className="text-xl font-bold text-[#111827]">Your cart is empty</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="bg-[#0D47A1] text-white px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-[#111827] transition-all"
                >
                  Start Shopping
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Account Modal Placeholder */}
      <AnimatePresence>
        {isAccountModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAccountModalOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[20000] pointer-events-auto"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white rounded-[2.5rem] z-[20001] shadow-2xl p-10 flex flex-col items-center text-center space-y-8 pointer-events-auto"
            >
              <div className="w-20 h-20 bg-[#0D47A1]/5 rounded-full flex items-center justify-center">
                <svg className="w-10 h-10 text-[#0D47A1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-3xl font-black text-[#111827] tracking-tight">Welcome Back</h3>
                <p className="text-gray-500 font-medium">Log in to manage your orders and subscription.</p>
              </div>
              <div className="w-full space-y-4">
                <input type="email" placeholder="Email Address" className="w-full px-6 py-4 bg-gray-50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#0D47A1]/20 font-medium" />
                <button className="w-full bg-[#0D47A1] text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#111827] transition-all shadow-lg">Continue</button>
              </div>
              <button onClick={() => setIsAccountModalOpen(false)} className="text-sm font-bold text-gray-400 hover:text-[#0D47A1] transition-colors">Close</button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
