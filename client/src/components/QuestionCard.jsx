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
    <div className="flex flex-col md:flex-row w-full max-w-[1200px] mx-auto min-h-[100dvh] md:min-h-0 md:h-[680px] bg-white md:rounded-[2.5rem] md:shadow-ios overflow-hidden relative">
      
      {/* Mobile Background Image (Immersive) */}
      <div className="md:hidden absolute inset-0 z-0">
        {image && (
          <>
            <motion.img
              key={image}
              src={image}
              alt=""
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="w-full h-full object-cover"
            />
            {/* Dark Overlay for Readability */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
          </>
        )}
      </div>

      {/* Visual Side (Desktop Only) */}
      <div className="hidden md:flex md:w-[45%] bg-[#111827] relative overflow-hidden">
        {image && (
          <motion.img
            key={image}
            src={image}
            alt=""
            onLoad={() => setImageLoaded(true)}
            initial={{ scale: 1.05 }}
            animate={{ scale: imageLoaded ? 1 : 1.05 }}
            className="h-full w-full object-cover opacity-80"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-r from-[#111827]/40 via-transparent to-transparent" />
      </div>

      {/* Content Side */}
      <div className="flex-1 flex flex-col p-5 sm:p-10 md:p-12 pb-40 md:pb-12 bg-transparent md:bg-white relative z-10">
        {/* Back Button (Mobile & Desktop) */}
        {onBack && (
          <button
            onClick={onBack}
            className="absolute left-4 top-5 md:left-6 md:top-10 p-2 text-white md:text-gray-400 hover:text-white md:hover:text-[#111827] transition-colors z-20"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
        )}

        <div className="flex-1 max-w-xl mx-auto md:mx-0 w-full flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="md:pl-8">
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#007AFF] uppercase block mb-3 drop-shadow-sm">Quiz Progress</span>
              <h2 className="text-xl md:text-4xl font-extrabold tracking-tight text-white md:text-gray-900 leading-[1.15] mb-2 drop-shadow-md">
                {question}
              </h2>
              {helperText && (
                <p className="text-xs md:text-base text-gray-200 md:text-gray-500 mb-6 md:mb-8 font-medium">
                  {helperText}
                </p>
              )}
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-3">
            {type === 'scale' ? (
              <div className="grid grid-cols-5 gap-2 md:gap-3">
                {Array.from({ length: max - min + 1 }, (_, i) => min + i).map((num) => (
                  <button
                    key={num}
                    onClick={() => handleOptionClick(num)}
                    className={`aspect-square flex items-center justify-center rounded-2xl border-2 text-lg font-bold transition-all ${
                      selectedLocal === num 
                      ? 'border-[#007AFF] bg-[#007AFF] text-white shadow-lg' 
                      : 'border-white/20 md:border-gray-100 bg-white/10 md:bg-gray-50 text-white md:text-gray-600 hover:border-white/40'
                    }`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            ) : (
              options && options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className={`group relative w-full text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 ${
                    selectedLocal === option 
                    ? 'border-[#007AFF] bg-[#007AFF]/20 md:bg-[#007AFF]/5' 
                    : 'border-white/20 md:border-gray-100 bg-white/5 md:bg-white hover:border-white/40 md:hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[15px] md:text-lg font-semibold ${selectedLocal === option ? 'text-white md:text-[#007AFF]' : 'text-white/70 md:text-gray-700'}`}>
                      {option}
                    </span>
                    <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      selectedLocal === option ? 'bg-[#007AFF] border-[#007AFF]' : 'border-white/30 md:border-gray-200'
                    }`}>
                      {selectedLocal === option && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>

        {/* Sticky Action Area / Info */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="fixed bottom-0 left-0 right-0 p-4 md:p-0 md:relative md:mt-10 glass md:bg-transparent border-t md:border-0 border-white/10 md:border-gray-200/50 z-50 md:z-auto"
            >
              <div className="flex flex-col md:flex-row gap-4 md:gap-5 items-center max-w-xl mx-auto md:mx-0">
                <div className="flex-1 p-4 md:p-5 rounded-2xl bg-white/80 md:bg-gray-50 border border-white/20 md:border-gray-100 backdrop-blur-md md:backdrop-blur-none">
                   <p className="text-[11px] md:text-xs font-bold md:font-semibold text-black/90 leading-relaxed italic">
                    “{info}”
                  </p>
                </div>
                <button
                  onClick={() => onSelect(selectedLocal)}
                  className="w-full md:w-auto bg-[#007AFF] text-white px-10 py-4 md:py-5 rounded-full font-bold text-lg md:text-lg shadow-xl shadow-blue-500/20 active:scale-95 transition-all"
                >
                  Next Step
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

