'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaBars, FaTimes } from 'react-icons/fa'
import Logo from './Logo'

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
    { href: '/order', label: 'SİPARİŞ', isOrder: true },
  ]

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full z-50 transition-all duration-500
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/">
            <Logo />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <motion.div
                  className="relative px-4 py-2"
                  onHoverStart={() => setActiveItem(item.href)}
                  whileHover={{ y: -2 }}
                >
                  <span className={`text-sm tracking-widest transition-all duration-300 font-medium
                    ${item.isOrder 
                      ? 'text-primary hover:text-secondary-dark' 
                      : 'text-secondary-dark hover:text-primary'}`}
                  >
                    {item.label}
                  </span>
                  {activeItem === item.href && (
                    <motion.div
                      layoutId="navbar-underline"
                      className={`absolute bottom-0 left-0 right-0 h-0.5 mx-4
                        ${item.isOrder ? 'bg-primary' : 'bg-secondary'}`}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden text-secondary-dark hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FaTimes className="w-6 h-6" />
            ) : (
              <FaBars className="w-6 h-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden bg-white/95 backdrop-blur-md rounded-b-2xl shadow-lg"
            >
              <div className="p-4 space-y-1">
                {menuItems.map((item) => (
                  <motion.div
                    key={item.href}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <motion.div
                        className={`block px-4 py-3 rounded-xl transition-all duration-300
                          ${activeItem === item.href 
                            ? 'bg-cream text-primary' 
                            : 'hover:bg-cream/50'}`}
                        whileHover={{ x: 10 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className={`text-sm tracking-widest font-medium
                          ${item.isOrder 
                            ? 'text-primary' 
                            : activeItem === item.href 
                              ? 'text-primary'
                              : 'text-secondary-dark'}`}
                        >
                          {item.label}
                        </span>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}