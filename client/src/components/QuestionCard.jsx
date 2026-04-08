import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function QuestionCard({ question, questionNumber, options, type, min, max, helperText, info, image, onSelect, onBack }) {
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
    <div className="flex flex-col md:flex-row w-full min-h-[100dvh] md:h-screen bg-[#111827] md:bg-white md:overflow-hidden relative">
      
      {/* Back Button (Mobile & Desktop) */}
      {onBack && (
        <button
          onClick={onBack}
          className="absolute left-4 top-5 md:left-8 md:top-8 p-3 text-white/80 hover:text-white bg-black/20 hover:bg-black/40 backdrop-blur-md rounded-full transition-all z-30"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
      )}

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
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px]" />
          </>
        )}
      </div>

      {/* Visual Side (Desktop Only) */}
      <div className="hidden md:flex md:w-[45%] bg-[#111827] relative overflow-hidden md:rounded-tr-[4rem] md:rounded-br-[4rem]">
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
      <div className="flex-1 flex flex-col p-5 sm:p-10 md:p-12 pb-10 md:pb-12 bg-transparent md:bg-white relative z-10">

        <div className="flex-1 max-w-2xl mx-auto md:mx-0 w-full flex flex-col justify-start pt-28 md:pt-12">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div>
              <span className="text-[12px] font-black tracking-[0.2em] text-white uppercase block mb-3 drop-shadow-sm">
                QUESTION {questionNumber}
              </span>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-white md:text-gray-900 leading-[1.15] mb-2 drop-shadow-md">
                {question}
              </h2>
              {helperText && (
                <p className="text-[13px] md:text-base text-gray-200 md:text-gray-500 mb-6 md:mb-8 font-medium">
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
                  className={`group relative w-full text-left p-4 md:py-3.5 md:px-5 rounded-2xl border-2 transition-all duration-300 ${
                    selectedLocal === option 
                    ? 'border-[#007AFF] bg-[#007AFF]/10 shadow-[0_0_20px_rgba(0,122,255,0.1)]' 
                    : 'border-white/20 md:border-gray-100 bg-black/20 md:bg-white hover:border-white/40 md:hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-[15px] md:text-base font-semibold ${selectedLocal === option ? 'text-white md:text-[#007AFF]' : 'text-white/80 md:text-gray-700'}`}>
                      {option}
                    </span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all duration-300 ${
                      selectedLocal === option ? 'bg-[#007AFF] border-[#007AFF]' : 'border-white/30 md:border-gray-200'
                    }`}>
                      {selectedLocal === option ? (
                        <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={4}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-transparent" />
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
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="mt-8 md:mt-10 w-full max-w-2xl mx-auto md:mx-0 z-20"
            >
              <div className="flex flex-col gap-6 items-center">
                <div className="w-full py-2 px-4 md:py-3 md:px-6 rounded-2xl bg-white md:bg-white border md:border-gray-100 shadow-sm">
                   <p className="text-[11px] md:text-[13px] font-bold text-gray-900 md:text-gray-700 leading-relaxed text-center">
                    {info}
                  </p>
                </div>
                <button
                  onClick={() => onSelect(selectedLocal)}
                  className="w-full bg-[#007AFF] text-white py-5 rounded-full font-bold text-lg md:text-xl shadow-xl shadow-blue-500/30 active:scale-[0.98] transition-all"
                >
                  Next
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  )
}

