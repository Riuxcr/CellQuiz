import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuestionCard({ question, options, type, min, max, helperText, info, image, onSelect, onBack }) {

  const [selectedLocal, setSelectedLocal] = useState(null)
  const [showInfo, setShowInfo] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  // Reset local state when question changes
  useEffect(() => {
    setSelectedLocal(null)
    setShowInfo(false)
  }, [question])

  useEffect(() => {
    setImageLoaded(false)
  }, [image])

  const handleOptionClick = (option) => {
    setSelectedLocal(option)
    setShowInfo(true)
  }

  return (
    <div className="flex flex-col md:flex-row w-full max-w-[1360px] mx-auto min-h-0 md:h-[720px] items-stretch overflow-hidden rounded-[2.5rem] md:rounded-[3rem] border border-[#e5e7eb] bg-white shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-500 mb-20 md:mb-0">
      {/* Visual Side (Desktop Only) */}
      <div className="hidden md:flex md:w-[42%] bg-[#111827] relative overflow-hidden">
        {image && (
          <div className="absolute inset-0 z-0">
            {/* Placeholder while the (large) asset decodes — avoids a harsh empty flash */}
            <div
              className={`absolute inset-0 bg-gradient-to-br from-gray-800 via-[#1e293b] to-[#111827] transition-opacity duration-500 ${
                imageLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
              aria-hidden
            >
              <div className="absolute inset-0 animate-pulse bg-[radial-gradient(ellipse_at_30%_20%,rgba(59,130,246,0.12),transparent_50%)]" />
            </div>
            <motion.img
              key={image}
              src={image}
              alt=""
              decoding="async"
              fetchPriority="high"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(true)}
              initial={{ scale: 1.04 }}
              animate={{ scale: imageLoaded ? 1 : 1.04 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`h-full w-full object-cover transition-opacity duration-500 ease-out ${
                imageLoaded ? 'opacity-80' : 'opacity-0'
              }`}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111827] via-[#111827]/20 to-transparent opacity-60 pointer-events-none" />
          </div>
        )}
      </div>

      {/* Content Side */}
      <div className="w-full md:w-[58%] p-6 sm:p-10 md:p-12 flex flex-col bg-white relative">
        {onBack && (
          <motion.button
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={onBack}
            className="absolute left-6 top-6 md:left-10 md:top-10 p-2 text-gray-300 hover:text-[#111827] hover:bg-gray-50 rounded-full transition-all z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </motion.button>
        )}

        <div className="flex-1 flex flex-col">

          <motion.div
             initial={{ opacity: 0, x: 20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
             className="w-full flex-1 flex flex-col justify-center"
          >

            <span className="text-[9px] md:text-[10px] font-black tracking-[0.5em] text-gray-300 uppercase block mb-2">Inquiry</span>
            <h2 className={`text-[clamp(1.3rem,2.5vw,1.9rem)] font-black tracking-tighter text-[#111827] leading-[1.05] ${helperText ? 'mb-2' : 'mb-6'}`}>


              {question}
            </h2>
          
          {helperText && (
            <p className="text-sm md:text-base font-medium text-gray-400 mb-4 md:mb-6 max-w-lg">
              {helperText}
            </p>
          )}


          
          <div className="grid grid-cols-1 gap-4">
            {type === 'scale' ? (
              <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
                {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num, idx) => (
                  <motion.button
                    key={num}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + (idx * 0.05) }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`flex aspect-square items-center justify-center rounded-xl border-2 transition-all ${selectedLocal === num ? 'border-[#111827] bg-[#111827] text-white' : 'border-[#f3f4f6] text-[#111827]' } text-xl font-black`}
                    onClick={() => handleOptionClick(num)}
                  >
                    {num}
                  </motion.button>
                ))}
              </div>
            ) : (
              options && options.map((option, idx) => (
                <motion.button
                  key={option}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (idx * 0.1), duration: 0.8 }}
                  whileHover={{ x: selectedLocal === option ? 0 : 5 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  className={`group w-full rounded-[1.25rem] border-2 px-5 py-4 text-left transition-all duration-300 ${selectedLocal === option ? 'border-[#111827] ring-4 ring-gray-100 shadow-lg' : 'border-[#f3f4f6] bg-white' }`}
                  onClick={() => handleOptionClick(option)}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg font-bold tracking-tight text-[#111827]">{option}</span>
                    <div className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${selectedLocal === option ? 'bg-[#111827] text-white' : 'bg-gray-50 text-[#111827]'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-3 h-3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                      </svg>
                    </div>
                  </div>
                </motion.button>

              ))
            )}
          </div>
        </motion.div>
      </div>

        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="mt-4 md:mt-8 flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-6"
            >
              <div className="flex-1 bg-[#f8f9fa] rounded-2xl p-4 md:p-5 border-l-4 border-[#111827]">
                <span className="text-[8px] md:text-[9px] font-black tracking-[0.2em] text-[#111827] uppercase mb-1 block opacity-40">Info</span>
                <p className="text-xs md:text-sm font-medium text-gray-600 leading-relaxed">
                  {info}
                </p>
              </div>
              
              <div className="flex-shrink-0">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSelect(selectedLocal)}
                  className="w-full md:w-auto bg-[#111827] text-white px-8 md:px-12 py-4 md:py-5 rounded-xl font-black text-base md:text-lg shadow-xl hover:shadow-2xl transition-all whitespace-nowrap"
                >
                  Next Step
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>


  )
}
