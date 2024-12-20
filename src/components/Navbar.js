'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeItem, setActiveItem] = useState(pathname)

  useEffect(() => {
    setActiveItem(pathname)
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const menuItems = [
    { href: '/', label: 'ANA SAYFA' },
    { href: '/about', label: 'HAKKIMDA' },
    { href: '/gallery', label: 'GALERİ' },
    { href: '/contact', label: 'İLETİŞİM' },
    { href: '/workshop', label: 'ATÖLYE' },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-500
        ${isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-cream-dark/10'
          : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-serif text-2xl tracking-wide relative overflow-hidden"
            >
              <motion.span 
                className="bg-gradient-to-r from-secondary via-primary to-secondary bg-clip-text text-transparent
                bg-[length:200%_100%] font-bold"
                animate={{ backgroundPosition: ['0%', '200%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              >
                İBRAHİM
              </motion.span>
            </motion.div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className="relative"
                  onHoverStart={() => setActiveItem(item.href)}
                  whileHover={{ y: -2 }}
                >
                  <span className="text-sm text-secondary-dark hover:text-primary tracking-widest 
                    transition-all duration-300 font-medium">
                    {item.label}
                  </span>
                  <motion.div
                    className="absolute -bottom-1 left-0 w-full h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    animate={{ 
                      scaleX: activeItem === item.href ? 1 : 0,
                      opacity: activeItem === item.href ? 1 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <motion.span 
                animate={{ 
                  rotate: isMenuOpen ? 45 : 0,
                  y: isMenuOpen ? 10 : 0
                }}
                className="absolute h-0.5 w-full bg-secondary transform transition-all duration-300 top-0"
              />
              <motion.span 
                animate={{ 
                  opacity: isMenuOpen ? 0 : 1
                }}
                className="absolute h-0.5 w-full bg-primary top-[10px] transition-all duration-300"
              />
              <motion.span 
                animate={{ 
                  rotate: isMenuOpen ? -45 : 0,
                  y: isMenuOpen ? -10 : 0
                }}
                className="absolute h-0.5 w-full bg-secondary transform transition-all duration-300 bottom-0"
              />
            </div>
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <motion.div 
          initial={false}
          animate={{ 
            height: isMenuOpen ? 'auto' : 0,
            opacity: isMenuOpen ? 1 : 0
          }}
          className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md"
        >
          <div className="py-4 space-y-2">
            {menuItems.map((item) => (
              <motion.div
                key={item.href}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link
                  href={item.href}
                  className="block px-4 py-2 text-sm text-secondary-dark hover:text-primary 
                    tracking-widest transition-all duration-300 font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}