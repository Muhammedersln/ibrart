'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

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
    <nav 
      className={`fixed w-full z-50 transition-all duration-300
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-cream-dark/10'
          : 'bg-transparent'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link 
            href="/" 
            className="font-serif text-2xl tracking-wide relative group"
          >
            <span className="bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent
              transition-all duration-300 font-bold group-hover:opacity-0">
              İBRAHİM
            </span>
            <span className="absolute top-0 left-0 bg-gradient-to-r from-primary to-secondary bg-clip-text 
              text-transparent font-bold opacity-0 group-hover:opacity-100 transition-all duration-300">
              İBRAHİM
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm text-secondary-dark hover:text-primary tracking-widest transition-all duration-300 
                  relative group font-medium"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary 
                  transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="relative w-6 h-6">
              <span 
                className={`absolute h-0.5 w-full bg-secondary transform transition-all duration-300
                  ${isMenuOpen ? 'rotate-45 top-3' : 'top-1'}`}
              />
              <span 
                className={`absolute h-0.5 w-full bg-primary top-3 transform transition-all duration-300
                  ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span 
                className={`absolute h-0.5 w-full bg-secondary transform transition-all duration-300
                  ${isMenuOpen ? '-rotate-45 top-3' : 'top-5'}`}
              />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        <div 
          className={`md:hidden transition-all duration-300
            ${isMenuOpen 
              ? 'max-h-64 opacity-100 bg-white shadow-md' 
              : 'max-h-0 opacity-0'}`}
        >
          <div className="py-4 space-y-2">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="block px-4 py-2 text-sm text-secondary-dark hover:text-primary tracking-widest 
                  transition-all duration-300 font-medium hover:bg-cream-light"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
}