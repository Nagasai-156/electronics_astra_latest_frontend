'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Zap, Menu, X } from 'lucide-react'
import { useState } from 'react'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="container mx-auto bg-white rounded-full border-4 border-black shadow-sticker px-6 py-3"
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="p-2 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl border-2 border-black"
            >
              <Zap className="w-5 h-5 text-white" />
            </motion.div>
            <span className="text-xl font-display font-black text-black">
              Electronics<span className="text-secondary-500">Astra</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-secondary-500 transition-colors font-bold text-base">
              Home
            </Link>
            <Link href="/problems" className="text-gray-700 hover:text-secondary-500 transition-colors font-bold text-base">
              Problems
            </Link>
            <Link href="/profile" className="text-gray-700 hover:text-secondary-500 transition-colors font-bold text-base">
              Profile
            </Link>
            <Link href="#" className="text-gray-700 hover:text-secondary-500 transition-colors font-bold text-base">
              About
            </Link>
            <Link href="#" className="text-gray-700 hover:text-secondary-500 transition-colors font-bold text-base">
              Contact
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link 
              href="/signin" 
              className="px-5 py-2.5 text-gray-700 hover:text-secondary-500 font-bold border-2 border-gray-300 rounded-full hover:border-secondary-500 transition-all text-base"
            >
              Sign In
            </Link>
            <Link 
              href="/signup" 
              className="px-5 py-2.5 bg-secondary-500 text-white rounded-full font-black border-3 border-black shadow-button hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all text-base"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-black hover:bg-neutral-100 rounded-full transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden mt-4 pb-4 space-y-3 border-t-2 border-black pt-4"
          >
            <Link href="/" className="block text-gray-700 hover:text-secondary-500 transition-colors font-bold py-2">
              Home
            </Link>
            <Link href="/problems" className="block text-gray-700 hover:text-secondary-500 transition-colors font-bold py-2">
              Problems
            </Link>
            <Link href="/profile" className="block text-gray-700 hover:text-secondary-500 transition-colors font-bold py-2">
              Profile
            </Link>
            <Link href="#" className="block text-gray-700 hover:text-secondary-500 transition-colors font-bold py-2">
              About
            </Link>
            <Link href="#" className="block text-gray-700 hover:text-secondary-500 transition-colors font-bold py-2">
              Contact
            </Link>
            <div className="flex gap-3 mt-4">
              <Link 
                href="/signin" 
                className="flex-1 text-center px-4 py-2.5 text-gray-700 font-bold border-2 border-gray-300 rounded-full hover:border-secondary-500 transition-all"
              >
                Sign In
              </Link>
              <Link 
                href="/signup" 
                className="flex-1 text-center px-4 py-2.5 bg-secondary-500 text-white rounded-full font-black border-3 border-black shadow-button"
              >
                Sign Up
              </Link>
            </div>
          </motion.div>
        )}
      </motion.nav>
    </div>
  )
}
