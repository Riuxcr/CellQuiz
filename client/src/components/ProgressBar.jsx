import { motion } from 'framer-motion'

export default function ProgressBar({ currentStep = 0, totalSteps = 1 }) {
  const stepNumber = currentStep + 1
  const pct =
    totalSteps > 0 ? Math.min(100, Math.round((stepNumber / totalSteps) * 100)) : 0

  return (
    <div className="flex flex-col gap-3 mb-10 w-full">
      <div className="flex justify-between items-center text-[10px] font-black tracking-[0.2em] text-gray-400 uppercase">
        <span>Progress</span>
        <span>{pct}%</span>
      </div>
      <div
        className="h-1 w-full overflow-hidden rounded-full bg-gray-100"
        role="progressbar"
        aria-valuenow={stepNumber}
        aria-valuemin={1}
        aria-valuemax={totalSteps}
        aria-label={`Step ${stepNumber} of ${totalSteps}`}
      >
        <motion.div
          className="h-full rounded-full bg-[#111827]"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  )
}
