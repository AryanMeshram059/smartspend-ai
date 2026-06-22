import { motion } from "framer-motion"

export default function AuthLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#09090b] flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="flex items-center gap-3 justify-center mb-8">
            <div className="w-9 h-9 rounded-lg bg-[#E0D206] flex items-center justify-center font-bold text-xl text-black">S</div>
            <div>
              <h1 className="font-bold text-lg tracking-tight text-white">SmartSpend</h1>
              <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase">AI OS v1.0</span>
            </div>
          </div>
          {children}
        </motion.div>
      </div>
    </div>
  )
}
