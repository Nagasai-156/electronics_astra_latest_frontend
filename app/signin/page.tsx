'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Link from 'next/link'
import { Mail, Lock, Github, Chrome, ArrowRight, Sparkles, Eye, EyeOff } from 'lucide-react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SignInPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-100 via-neutral-200 to-neutral-100 transition-colors">
      <Navbar />
      
      <div className="pt-32 pb-20 relative overflow-hidden">
        {/* Floating Shapes */}
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
          className="absolute top-20 left-20 w-32 h-32 bg-primary-500 rounded-full border-4 border-black opacity-20"
        />
        <motion.div
          animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-accent-300 rounded-3xl border-4 border-black opacity-20 transform rotate-12"
        />
        <motion.div
          animate={{ y: [0, -20, 0], x: [0, 20, 0] }}
          transition={{ duration: 7, repeat: Infinity }}
          className="absolute top-1/3 right-1/4 w-24 h-24 bg-secondary-500 border-4 border-black opacity-20 blob"
        />

        <div className="container mx-auto px-6 flex items-center justify-center">
          <div className="w-full max-w-lg">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-200 rounded-full border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-6">
                <Sparkles className="w-4 h-4 text-black" />
                <span className="text-sm font-black text-black">Welcome Back! 👋</span>
              </div>
              <h1 className="text-4xl font-display font-black text-black mb-2">Sign In</h1>
              <p className="text-gray-600 font-semibold">Continue your electronics engineering journey</p>
            </motion.div>

            {/* Sign In Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-colors"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-black text-black mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="you@example.com"
                      className="w-full pl-12 pr-4 py-4 bg-gray-50 text-black rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300 border-4 border-black font-semibold transition-all placeholder:text-gray-500"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-black text-black mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-12 py-4 bg-gray-50 text-black rounded-xl focus:outline-none focus:ring-4 focus:ring-primary-300 border-4 border-black font-semibold transition-all placeholder:text-gray-500"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-5 h-5 accent-primary cursor-pointer border-2 border-black rounded"
                    />
                    <span className="text-sm text-gray-700 group-hover:text-black transition-colors font-semibold">
                      Remember me
                    </span>
                  </label>
                  <Link 
                    href="/forgot-password" 
                    className="text-sm text-primary hover:text-secondary font-black transition-colors"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="group w-full py-4 bg-secondary-500 text-white font-black rounded-xl border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0"
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-8">
                <div className="flex-1 h-1 bg-black rounded-full" />
                <span className="text-sm text-gray-600 font-bold">or continue with</span>
                <div className="flex-1 h-1 bg-black rounded-full" />
              </div>

              {/* Social Login */}
              <div className="grid grid-cols-2 gap-4">
                <motion.button
                  whileHover={{ scale: 1.02, rotate: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 py-4 bg-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Github className="w-5 h-5 text-black" />
                  <span className="font-black text-black">GitHub</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02, rotate: 2 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center justify-center gap-2 py-4 bg-white rounded-xl border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 transition-all"
                >
                  <Chrome className="w-5 h-5 text-black" />
                  <span className="font-black text-black">Google</span>
                </motion.button>
              </div>

              {/* Sign Up Link */}
              <div className="text-center mt-8">
                <p className="text-gray-600 font-semibold">
                  Don't have an account?{' '}
                  <Link href="/signup" className="text-primary hover:text-secondary font-black transition-colors inline-flex items-center gap-1 group">
                    Sign Up
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </p>
              </div>

              {/* Guest Link */}
              <div className="text-center mt-4">
                <Link href="/" className="text-sm text-gray-500 hover:text-primary transition-colors inline-flex items-center gap-1 group font-semibold">
                  Continue as Guest
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
