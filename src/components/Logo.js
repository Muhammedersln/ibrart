'use client'

import { motion } from 'framer-motion'

export default function Logo() {
  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <motion.span 
        className="font-serif text-2xl tracking-wide bg-gradient-to-r from-secondary via-primary to-secondary 
          bg-clip-text text-transparent bg-[length:200%_100%] font-bold"
        animate={{ backgroundPosition: ['0%', '200%'] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
      >
        İBRAHİM
      </motion.span>
    </motion.div>
  )
} 