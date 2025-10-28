'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  Plus, FileText, CheckCircle, Clock, TrendingUp,
  Search, Filter, MoreVertical, Edit, Trash2, Eye
} from 'lucide-react'
import AdminLayout from '@/components/AdminLayout'

interface Problem {
  id: string
  title: string
  slug: string
  difficulty: 'easy' | 'medium' | 'hard'
  tags: string[]
  is_published: boolean
  created_at: string
  updated_at: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [problems, setProblems] = useState<Problem[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [filterDifficulty, setFilterDifficulty] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')

  useEffect(() => {
    // Check authentication
    const token = localStorage.getItem('adminToken')
    if (!token) {
      router.push('/login')
      return
    }

    // Load mock problems
    const mockProblems: Problem[] = [
      {
        id: '1',
        title: 'Divide by 2^DIV_LOG2 and Round Up with Saturation',
        slug: 'divide-roundup-saturate',
        difficulty: 'easy',
        tags: ['verilog', 'bit-manipulation', 'math'],
        is_published: true,
        created_at: '2024-10-20T10:00:00Z',
        updated_at: '2024-10-25T15:30:00Z'
      },
      {
        id: '2',
        title: 'Binary Counter with Reset',
        slug: 'binary-counter-reset',
        difficulty: 'medium',
        tags: ['verilog', 'sequential', 'counter'],
        is_published: false,
        created_at: '2024-10-22T14:00:00Z',
        updated_at: '2024-10-22T14:00:00Z'
      }
    ]
    setProblems(mockProblems)
  }, [router])

  const stats = [
    { label: 'Total Problems', value: problems.length, icon: FileText, color: 'bg-blue-500' },
    { label: 'Published', value: problems.filter(p => p.is_published).length, icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Drafts', value: problems.filter(p => !p.is_published).length, icon: Clock, color: 'bg-yellow-500' },
    { label: 'This Week', value: 2, icon: TrendingUp, color: 'bg-purple-500' }
  ]

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.slug.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesDifficulty = filterDifficulty === 'all' || problem.difficulty === filterDifficulty
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'published' && problem.is_published) ||
                         (filterStatus === 'draft' && !problem.is_published)
    return matchesSearch && matchesDifficulty && matchesStatus
  })

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700 border-green-300'
      case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300'
      case 'hard': return 'bg-red-100 text-red-700 border-red-300'
      default: return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-black text-black">Dashboard</h1>
            <p className="text-gray-600 font-semibold mt-1">Manage your problems and content</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => router.push('/dashboard/problems/create')}
            className="flex items-center gap-2 px-6 py-3 bg-secondary-500 text-white rounded-xl font-black border-3 border-black shadow-button hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            <Plus className="w-5 h-5" />
            Create Problem
          </motion.button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl border-3 border-black shadow-card p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-black text-black">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-xl border-2 border-black`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl border-3 border-black shadow-card p-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search problems..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 rounded-xl focus:border-secondary-500 focus:outline-none font-semibold"
              />
            </div>

            {/* Difficulty Filter */}
            <select
              value={filterDifficulty}
              onChange={(e) => setFilterDifficulty(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-secondary-500 focus:outline-none font-bold bg-white"
            >
              <option value="all">All Difficulties</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-secondary-500 focus:outline-none font-bold bg-white"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>

        {/* Problems List */}
        <div className="bg-white rounded-2xl border-3 border-black shadow-card overflow-hidden">
          <div className="p-6 border-b-3 border-black">
            <h2 className="text-xl font-display font-black text-black">Problems</h2>
          </div>
          
          <div className="divide-y-2 divide-gray-200">
            {filteredProblems.length === 0 ? (
              <div className="p-12 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 font-semibold">No problems found</p>
              </div>
            ) : (
              filteredProblems.map((problem, index) => (
                <motion.div
                  key={problem.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-6 hover:bg-neutral-50 transition-colors"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-bold text-black truncate">{problem.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 ${getDifficultyColor(problem.difficulty)}`}>
                          {problem.difficulty.toUpperCase()}
                        </span>
                        {problem.is_published ? (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-100 text-green-700 border-2 border-green-300">
                            PUBLISHED
                          </span>
                        ) : (
                          <span className="px-3 py-1 rounded-full text-xs font-bold bg-gray-100 text-gray-700 border-2 border-gray-300">
                            DRAFT
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 font-semibold mb-3">/{problem.slug}</p>
                      <div className="flex flex-wrap gap-2">
                        {problem.tags.map(tag => (
                          <span key={tag} className="px-2 py-1 bg-primary-50 text-primary-700 rounded-lg text-xs font-bold border border-primary-200">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(`/dashboard/problems/${problem.id}/preview`)}
                        className="p-2 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Preview"
                      >
                        <Eye className="w-5 h-5 text-blue-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => router.push(`/dashboard/problems/${problem.id}/edit`)}
                        className="p-2 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit"
                      >
                        <Edit className="w-5 h-5 text-green-600" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
