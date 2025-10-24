'use client'

import { motion } from 'framer-motion'
import { useState, useRef, useEffect } from 'react'
import { Play, Send, ChevronLeft, ChevronDown, GripVertical, GripHorizontal, Unlock, MessageSquare, Clock, ThumbsUp, User, Lightbulb, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import DiscussionModal from '@/components/DiscussionModal'

const LANGUAGES = ['Verilog', 'VHDL', 'SystemVerilog']

const HINTS = [
  { id: 1, cost: 10, unlocked: false, text: 'Consider using the modulo operator to find the remainder.' },
  { id: 2, cost: 20, unlocked: false, text: 'Remember to handle the rounding logic: remainders >= 0.5 should round up.' },
  { id: 3, cost: 30, unlocked: false, text: 'Check for overflow conditions and saturate the output if needed.' },
]

const PREVIOUS_SOLUTIONS = [
  { id: 1, date: '2 hours ago', status: 'Accepted', language: 'Verilog', runtime: '45ms' },
  { id: 2, date: '1 day ago', status: 'Wrong Answer', language: 'VHDL', runtime: '52ms' },
  { id: 3, date: '3 days ago', status: 'Accepted', language: 'Verilog', runtime: '48ms' },
]

const DISCUSSIONS = [
  {
    id: 1,
    author: 'John Doe',
    title: 'Efficient approach using bit shifting',
    content: 'I found that using bit shifting operations can significantly improve performance. Here\'s my approach...',
    likes: 24,
    replies: [
      { id: 1, author: 'Alice Chen', content: 'Great approach! This reduced my runtime by 30%.', time: '1 hour ago', likes: 5 },
      { id: 2, author: 'Bob Smith', content: 'Can you explain the edge case handling?', time: '30 mins ago', likes: 2 }
    ],
    time: '2 hours ago'
  },
  {
    id: 2,
    author: 'Jane Smith',
    title: 'How to handle edge cases?',
    content: 'I\'m struggling with overflow conditions. What\'s the best way to saturate the output?',
    likes: 15,
    replies: [
      { id: 1, author: 'Mike Johnson', content: 'Check if the result exceeds the maximum value before assignment.', time: '3 hours ago', likes: 8 }
    ],
    time: '5 hours ago'
  },
  {
    id: 3,
    author: 'Bob Wilson',
    title: 'My solution explained step by step',
    content: 'Here\'s a detailed breakdown of my approach with code examples and explanations...',
    likes: 42,
    replies: [],
    time: '1 day ago'
  },
]

const SAMPLE_TESTCASES = [
  { id: 1, input: 'din=34, DIV_LOG2=2', expected: 'dout=9', passed: null as boolean | null },
  { id: 2, input: 'din=31, DIV_LOG2=2', expected: 'dout=8', passed: null as boolean | null },
]

const ALL_TESTCASES = [
  { id: 1, input: 'din=34, DIV_LOG2=2', expected: 'dout=9', passed: null as boolean | null },
  { id: 2, input: 'din=31, DIV_LOG2=2', expected: 'dout=8', passed: null as boolean | null },
  { id: 3, input: 'din=100, DIV_LOG2=3', expected: 'dout=13', passed: null as boolean | null },
  { id: 4, input: 'din=255, DIV_LOG2=4', expected: 'dout=16', passed: null as boolean | null },
  { id: 5, input: 'din=0, DIV_LOG2=1', expected: 'dout=0', passed: null as boolean | null },
  { id: 6, input: 'din=1023, DIV_LOG2=5', expected: 'dout=32', passed: null as boolean | null },
]

export default function ProblemSolvingPage() {
  const [activeTab, setActiveTab] = useState('Description')
  const [timer, setTimer] = useState(0)
  const [showDiscussionModal, setShowDiscussionModal] = useState(false)
  const [showDiscussionThread, setShowDiscussionThread] = useState<number | null>(null)
  const [discussions, setDiscussions] = useState(DISCUSSIONS)
  const [newReply, setNewReply] = useState('')
  const [selectedSubmission, setSelectedSubmission] = useState<number | null>(null)
  const [activeBottomTab, setActiveBottomTab] = useState('Test Results')
  const [selectedLanguage, setSelectedLanguage] = useState('Verilog')
  const [leftWidth, setLeftWidth] = useState(50)
  const [bottomHeight, setBottomHeight] = useState(35)
  const [isDraggingVertical, setIsDraggingVertical] = useState(false)
  const [isDraggingHorizontal, setIsDraggingHorizontal] = useState(false)
  const [hints, setHints] = useState(HINTS)
  const [points, setPoints] = useState(100)
  const [testCases, setTestCases] = useState(SAMPLE_TESTCASES)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Timer effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const [code, setCode] = useState(`module logic_gates(
  input a,
  input b,
  output and_out,
  output or_out,
  output not_out
);

  // Your implementation here

endmodule`)

  const [output, setOutput] = useState('')
  const [isRunning, setIsRunning] = useState(false)

  // Handle vertical resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingVertical && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const newWidth = ((e.clientX - containerRect.left) / containerRect.width) * 100
        setLeftWidth(Math.min(Math.max(newWidth, 30), 70))
      }
    }

    const handleMouseUp = () => setIsDraggingVertical(false)

    if (isDraggingVertical) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingVertical])

  // Handle horizontal resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingHorizontal && containerRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect()
        const editorSection = containerRect.height
        const mouseY = e.clientY - containerRect.top
        const newHeight = ((editorSection - mouseY) / editorSection) * 100
        setBottomHeight(Math.min(Math.max(newHeight, 20), 60))
      }
    }

    const handleMouseUp = () => setIsDraggingHorizontal(false)

    if (isDraggingHorizontal) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [isDraggingHorizontal])

  const handleRun = () => {
    setIsRunning(true)
    setOutput('Running sample test cases...')

    setTimeout(() => {
      const updatedTests = SAMPLE_TESTCASES.map(tc => ({
        ...tc,
        passed: Math.random() > 0.2 // 80% pass rate for demo
      }))
      setTestCases(updatedTests)
      const passedCount = updatedTests.filter(tc => tc.passed).length
      setOutput(`Sample Tests: ${passedCount}/${updatedTests.length} passed`)
      setIsRunning(false)
    }, 1500)
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    setOutput('Running all test cases...')

    setTimeout(() => {
      const updatedTests = ALL_TESTCASES.map(tc => ({
        ...tc,
        passed: Math.random() > 0.15 // 85% pass rate for demo
      }))
      setTestCases(updatedTests)
      const passedCount = updatedTests.filter(tc => tc.passed).length
      const allPassed = passedCount === updatedTests.length
      setOutput(allPassed
        ? `✓ Success! All ${updatedTests.length} test cases passed!`
        : `${passedCount}/${updatedTests.length} test cases passed`)
      setIsSubmitting(false)
    }, 2500)
  }

  const unlockHint = (hintId: number, cost: number) => {
    if (points >= cost) {
      setPoints(points - cost)
      setHints(hints.map(h => h.id === hintId ? { ...h, unlocked: true } : h))
    }
  }

  const handleNewDiscussion = (title: string, content: string) => {
    const newDiscussion = {
      id: discussions.length + 1,
      author: 'You',
      title,
      content,
      likes: 0,
      replies: [],
      time: 'Just now'
    }
    setDiscussions([newDiscussion, ...discussions])
  }

  const handleNewReply = (discussionId: number) => {
    if (newReply.trim()) {
      setDiscussions(discussions.map(d => {
        if (d.id === discussionId) {
          return {
            ...d,
            replies: [...d.replies, {
              id: d.replies.length + 1,
              author: 'You',
              content: newReply,
              time: 'Just now',
              likes: 0
            }]
          }
        }
        return d
      }))
      setNewReply('')
    }
  }

  const handleLikeDiscussion = (discussionId: number) => {
    setDiscussions(discussions.map(d =>
      d.id === discussionId ? { ...d, likes: d.likes + 1 } : d
    ))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 transition-colors">
      <Navbar />

      <DiscussionModal
        isOpen={showDiscussionModal}
        onClose={() => setShowDiscussionModal(false)}
        onSubmit={handleNewDiscussion}
      />

      <div className="pt-28 px-6">
        <div ref={containerRef} className="flex h-[calc(100vh-112px)] relative rounded-2xl overflow-hidden border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          {/* Left Panel */}
          <div style={{ width: `${leftWidth}%` }} className="flex flex-col bg-white border-r-4 border-black transition-colors">
            {/* Header */}
            <div className="px-6 py-4 border-b-4 border-black bg-white transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Link href="/problems" className="p-2 hover:bg-neutral-100 rounded-xl transition-colors">
                    <ChevronLeft className="w-5 h-5 text-black" />
                  </Link>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <h1 className="text-2xl font-display font-black text-black">3. Rounding Division</h1>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-secondary-100 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <Clock className="w-5 h-5 text-secondary-700" />
                    <span className="font-black text-black">{formatTime(timer)}</span>
                  </div>
                  <div className="h-8 w-px bg-gray-300"></div>
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-accent-100 rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                    <Lightbulb className="w-5 h-5 text-accent-700" />
                    <span className="font-black text-black">{points} Points</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 px-6 py-3 border-b-2 border-gray-200 bg-neutral-50 overflow-x-auto">
              {['Description', 'Submissions', 'Hints', 'Discussions'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2.5 font-black transition-all whitespace-nowrap rounded-xl ${activeTab === tab
                    ? 'bg-accent-500 text-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]'
                    : 'text-gray-700 hover:text-black hover:bg-white border-2 border-transparent hover:border-gray-300'
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 overflow-y-auto p-6 bg-white transition-colors">
              {activeTab === 'Description' && (
                <div className="max-w-3xl space-y-6">
                  {/* Difficulty Badge */}
                  <div>
                    <span className="inline-block px-5 py-2 bg-yellow-100 text-yellow-800 rounded-xl text-sm font-black border-3 border-yellow-400 shadow-[3px_3px_0px_0px_rgba(234,179,8,0.3)]">
                      Medium
                    </span>
                  </div>

                  {/* Prompt Card */}
                  <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-black text-primary-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      Prompt
                    </h3>
                    <p className="text-gray-900 leading-relaxed font-semibold">
                      Divide an input number by a power of two and round the result to the nearest integer. The power
                      of two is calculated using 2^DIV_LOG2 where DIV_LOG2 is a module parameter. Remainders of 0.5 or
                      greater should be rounded up to the nearest integer. If the output were to overflow, then the result
                      should be saturated instead.
                    </p>
                  </div>

                  {/* Input/Output Signals Card */}
                  <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-black text-secondary-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-secondary-500 rounded-full"></span>
                      Input and Output Signals
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 bg-white rounded-xl p-4 border-2 border-secondary-200">
                        <span className="text-secondary-600 font-black text-lg">→</span>
                        <div>
                          <code className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-lg font-mono text-sm font-bold border-2 border-secondary-300">din</code>
                          <span className="text-gray-900 font-semibold ml-2">- Input number</span>
                        </div>
                      </div>
                      <div className="flex items-start gap-3 bg-white rounded-xl p-4 border-2 border-secondary-200">
                        <span className="text-secondary-600 font-black text-lg">←</span>
                        <div>
                          <code className="px-3 py-1 bg-secondary-100 text-secondary-800 rounded-lg font-mono text-sm font-bold border-2 border-secondary-300">dout</code>
                          <span className="text-gray-900 font-semibold ml-2">- Rounded result</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Circuit Diagram Card */}
                  <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-black text-accent-800 mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-accent-500 rounded-full"></span>
                      Circuit Diagram
                    </h3>
                    <div className="bg-white rounded-xl p-8 border-2 border-accent-200">
                      <div className="text-center space-y-4">
                        <ImageIcon className="w-16 h-16 text-accent-400 mx-auto" />
                        <div className="space-y-2">
                          <p className="text-gray-900 font-bold">Circuit Diagram Placeholder</p>
                          <p className="text-sm text-gray-700">Rounding Division Circuit</p>
                        </div>
                        {/* ASCII Circuit */}
                        <div className="bg-neutral-50 p-6 rounded-xl border-2 border-gray-200 font-mono text-sm text-left">
                          <pre className="text-gray-900 font-semibold">{`
    din[34:0] ──┐
                │
                ├──► [Divider] ──► [Rounder] ──► dout[31:0]
                │      ÷2^n          ±0.5
    DIV_LOG2 ───┘
                          `}</pre>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Example 1 Card */}
                  <div className="bg-white rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                      <span className="px-3 py-1 bg-primary-500 text-white rounded-lg text-sm">1</span>
                      Example 1
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-primary-50 rounded-xl p-4 border-2 border-primary-200">
                        <span className="font-black text-primary-700 text-sm uppercase tracking-wide">Input:</span>
                        <pre className="text-base text-gray-900 font-mono mt-2 font-bold">din = 34, DIV_LOG2 = 2</pre>
                      </div>
                      <div className="bg-secondary-50 rounded-xl p-4 border-2 border-secondary-200">
                        <span className="font-black text-secondary-700 text-sm uppercase tracking-wide">Output:</span>
                        <pre className="text-base text-gray-900 font-mono mt-2 font-bold">dout = 9</pre>
                      </div>
                      <div className="bg-accent-50 rounded-xl p-4 border-2 border-accent-200">
                        <span className="font-black text-accent-700 text-sm uppercase tracking-wide">Explanation:</span>
                        <p className="text-gray-900 mt-2 font-semibold">34 ÷ 2² = 34 ÷ 4 = 8.5, rounded up to 9</p>
                      </div>
                    </div>
                  </div>

                  {/* Example 2 Card */}
                  <div className="bg-white rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                      <span className="px-3 py-1 bg-primary-500 text-white rounded-lg text-sm">2</span>
                      Example 2
                    </h3>
                    <div className="space-y-4">
                      <div className="bg-primary-50 rounded-xl p-4 border-2 border-primary-200">
                        <span className="font-black text-primary-700 text-sm uppercase tracking-wide">Input:</span>
                        <pre className="text-base text-gray-900 font-mono mt-2 font-bold">din = 31, DIV_LOG2 = 2</pre>
                      </div>
                      <div className="bg-secondary-50 rounded-xl p-4 border-2 border-secondary-200">
                        <span className="font-black text-secondary-700 text-sm uppercase tracking-wide">Output:</span>
                        <pre className="text-base text-gray-900 font-mono mt-2 font-bold">dout = 8</pre>
                      </div>
                      <div className="bg-accent-50 rounded-xl p-4 border-2 border-accent-200">
                        <span className="font-black text-accent-700 text-sm uppercase tracking-wide">Explanation:</span>
                        <p className="text-gray-900 mt-2 font-semibold">31 ÷ 2² = 31 ÷ 4 = 7.75, rounded up to 8</p>
                      </div>
                    </div>
                  </div>

                  {/* Constraints Card */}
                  <div className="bg-white rounded-2xl p-6 border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="text-xl font-black text-black mb-4 flex items-center gap-2">
                      <span className="w-2 h-2 bg-primary-500 rounded-full"></span>
                      Constraints
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3 bg-neutral-50 rounded-xl p-4 border-2 border-gray-200">
                        <span className="text-primary-600 font-black">✓</span>
                        <span className="text-gray-900 font-semibold">0 ≤ din ≤ 2³⁵ - 1</span>
                      </div>
                      <div className="flex items-start gap-3 bg-neutral-50 rounded-xl p-4 border-2 border-gray-200">
                        <span className="text-primary-600 font-black">✓</span>
                        <span className="text-gray-900 font-semibold">0 ≤ DIV_LOG2 ≤ 5</span>
                      </div>
                      <div className="flex items-start gap-3 bg-neutral-50 rounded-xl p-4 border-2 border-gray-200">
                        <span className="text-primary-600 font-black">✓</span>
                        <span className="text-gray-900 font-semibold">Output should be saturated if overflow occurs</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'Submissions' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-black mb-6">Previous Submissions</h3>
                  {PREVIOUS_SOLUTIONS.map((solution) => (
                    <div key={solution.id}>
                      <div
                        onClick={() => setSelectedSubmission(selectedSubmission === solution.id ? null : solution.id)}
                        className="bg-white p-5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <span className={`px-4 py-2 rounded-xl text-sm font-black border-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)] ${solution.status === 'Accepted'
                              ? 'bg-green-100 text-green-800 border-green-400'
                              : 'bg-red-100 text-red-800 border-red-400'
                              }`}>
                              {solution.status}
                            </span>
                            <span className="font-black text-gray-900 px-3 py-1 bg-secondary-100 rounded-lg border-2 border-secondary-300">{solution.language}</span>
                            <span className="text-gray-700 text-sm font-semibold px-3 py-1 bg-neutral-100 rounded-lg">{solution.runtime}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-gray-700 text-sm font-semibold">{solution.date}</span>
                            <ChevronDown className={`w-5 h-5 text-black transition-transform ${selectedSubmission === solution.id ? 'rotate-180' : ''}`} />
                          </div>
                        </div>
                      </div>

                      {selectedSubmission === solution.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          className="mt-3 bg-neutral-50 p-6 rounded-2xl border-3 border-black overflow-hidden"
                        >
                          <div className="mb-3 flex items-center gap-2">
                            <span className="px-3 py-1 bg-primary-500 text-white rounded-lg text-xs font-black">CODE</span>
                            <span className="text-gray-700 text-sm font-semibold">{solution.language}</span>
                          </div>
                          <pre className="text-gray-900 font-mono text-sm bg-white p-4 rounded-xl border-2 border-gray-300 overflow-x-auto">
                            {`module logic_gates(
  input a,
  input b,
  output and_out,
  output or_out,
  output not_out
);
  assign and_out = a & b;
  assign or_out = a | b;
  assign not_out = ~a;
endmodule`}
                          </pre>
                        </motion.div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Hints' && (
                <div className="space-y-4">
                  <h3 className="text-2xl font-black text-black mb-6">Hints</h3>
                  {hints.map((hint) => (
                    <div key={hint.id} className="bg-gradient-to-br from-accent-50 to-accent-100 p-6 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-accent-500 text-white rounded-lg text-sm font-black">Hint {hint.id}</span>
                            {!hint.unlocked && (
                              <span className="px-3 py-1.5 bg-white text-accent-700 text-xs font-black rounded-lg border-2 border-accent-400 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.2)]">
                                {hint.cost} points
                              </span>
                            )}
                          </div>
                          {hint.unlocked ? (
                            <p className="text-gray-900 font-semibold leading-relaxed">{hint.text}</p>
                          ) : (
                            <p className="text-gray-600 italic font-semibold">Unlock this hint to reveal</p>
                          )}
                        </div>
                        {!hint.unlocked && (
                          <button
                            onClick={() => unlockHint(hint.id, hint.cost)}
                            disabled={points < hint.cost}
                            className="px-5 py-2.5 bg-accent-500 text-white rounded-xl font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                          >
                            <Unlock className="w-4 h-4" />
                            Unlock
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'Discussions' && (
                <div className="space-y-4">
                  {showDiscussionThread === null ? (
                    <>
                      <div className="flex items-center justify-between mb-6">
                        <h3 className="text-2xl font-black text-black">Discussions</h3>
                        <button
                          onClick={() => setShowDiscussionModal(true)}
                          className="px-5 py-2.5 bg-accent-500 text-white rounded-xl font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all"
                        >
                          New Discussion
                        </button>
                      </div>
                      {discussions.map((discussion) => (
                        <div
                          key={discussion.id}
                          onClick={() => setShowDiscussionThread(discussion.id)}
                          className="bg-gradient-to-br from-primary-50 to-white p-5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 transition-all cursor-pointer"
                        >
                          <h4 className="font-black text-black mb-3 text-lg">{discussion.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-gray-700">
                            <div className="flex items-center gap-1.5 font-semibold">
                              <User className="w-4 h-4" />
                              <span>{discussion.author}</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-semibold">
                              <ThumbsUp className="w-4 h-4" />
                              <span>{discussion.likes}</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-semibold">
                              <MessageSquare className="w-4 h-4" />
                              <span>{discussion.replies.length} replies</span>
                            </div>
                            <div className="flex items-center gap-1.5 font-semibold">
                              <Clock className="w-4 h-4" />
                              <span>{discussion.time}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  ) : (
                    <>
                      {(() => {
                        const discussion = discussions.find(d => d.id === showDiscussionThread)
                        if (!discussion) return null

                        return (
                          <div className="space-y-4">
                            <button
                              onClick={() => setShowDiscussionThread(null)}
                              className="flex items-center gap-2 text-gray-700 hover:text-black transition-colors font-bold"
                            >
                              <ChevronLeft className="w-5 h-5" />
                              Back to Discussions
                            </button>

                            {/* Main Discussion Post */}
                            <div className="bg-gradient-to-br from-secondary-50 to-white p-6 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                              <h2 className="text-2xl font-black text-black mb-4">{discussion.title}</h2>
                              <div className="flex items-center gap-3 mb-4 text-sm text-gray-700">
                                <div className="flex items-center gap-1.5 font-semibold">
                                  <User className="w-4 h-4" />
                                  <span className="font-bold">{discussion.author}</span>
                                </div>
                                <div className="flex items-center gap-1.5 font-semibold">
                                  <Clock className="w-4 h-4" />
                                  <span>{discussion.time}</span>
                                </div>
                              </div>
                              <p className="text-gray-900 mb-4 leading-relaxed font-semibold">{discussion.content}</p>
                              <button
                                onClick={() => handleLikeDiscussion(discussion.id)}
                                className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all font-bold"
                              >
                                <ThumbsUp className="w-4 h-4" />
                                <span>{discussion.likes} Likes</span>
                              </button>
                            </div>

                            {/* Replies */}
                            <div className="space-y-3">
                              <h3 className="text-lg font-black text-black">{discussion.replies.length} Replies</h3>
                              {discussion.replies.map((reply) => (
                                <div key={reply.id} className="bg-white p-5 rounded-2xl border-2 border-gray-300 ml-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                                  <div className="flex items-center gap-3 mb-2 text-sm text-gray-700">
                                    <div className="flex items-center gap-1.5 font-semibold">
                                      <User className="w-4 h-4" />
                                      <span className="font-bold">{reply.author}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 font-semibold">
                                      <Clock className="w-4 h-4" />
                                      <span>{reply.time}</span>
                                    </div>
                                  </div>
                                  <p className="text-gray-900 mb-2 font-semibold">{reply.content}</p>
                                  <div className="flex items-center gap-2 text-sm text-gray-600 font-semibold">
                                    <ThumbsUp className="w-4 h-4" />
                                    <span>{reply.likes}</span>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Reply Input */}
                            <div className="bg-gradient-to-br from-accent-50 to-white p-5 rounded-2xl border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                              <h4 className="font-black text-black mb-3">Add a Reply</h4>
                              <textarea
                                value={newReply}
                                onChange={(e) => setNewReply(e.target.value)}
                                placeholder="Share your thoughts..."
                                rows={4}
                                className="w-full px-4 py-3 bg-white text-black rounded-xl border-2 border-gray-300 focus:outline-none focus:border-secondary-500 font-semibold resize-none mb-3 placeholder:text-gray-500"
                              />
                              <button
                                onClick={() => handleNewReply(discussion.id)}
                                disabled={!newReply.trim()}
                                className="px-6 py-2.5 bg-accent-500 text-white rounded-xl font-black border-3 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                              >
                                Post Reply
                              </button>
                            </div>
                          </div>
                        )
                      })()}
                    </>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Vertical Resize Handle */}
          <div
            onMouseDown={() => setIsDraggingVertical(true)}
            className={`w-2 bg-black hover:bg-secondary-500 cursor-col-resize flex items-center justify-center group transition-colors ${isDraggingVertical ? 'bg-secondary-500' : ''
              }`}
          >
            <GripVertical className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>

          {/* Right Panel */}
          <div style={{ width: `${100 - leftWidth}%` }} className="flex flex-col bg-white">
            {/* Editor Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-neutral-100 border-b-4 border-black">
              <div className="flex items-center gap-4">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="px-5 py-2.5 bg-white text-black rounded-lg font-bold border-2 border-gray-300 focus:outline-none focus:border-secondary-500 cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,0.3)]"
                >
                  {LANGUAGES.map((lang) => (
                    <option key={lang} value={lang}>{lang}</option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleRun}
                  disabled={isRunning}
                  className="px-6 py-2.5 bg-secondary-500 text-white rounded-xl font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Play className="w-4 h-4" />
                  {isRunning ? 'Running...' : 'Run'}
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="px-6 py-2.5 bg-accent-500 text-black rounded-xl font-black border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all disabled:opacity-50 flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </div>

            {/* Code Editor */}
            <div style={{ height: `${100 - bottomHeight}%` }} className="overflow-hidden">
              <div className="h-full flex">
                <div className="bg-gray-900 px-4 py-4 text-right border-r border-gray-700">
                  {code.split('\n').map((_, i) => (
                    <div key={i} className="text-gray-500 font-mono text-sm leading-6">
                      {i + 1}
                    </div>
                  ))}
                </div>

                <textarea
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="flex-1 p-4 bg-gray-900 text-gray-100 font-mono text-sm resize-none focus:outline-none leading-6 caret-white selection:bg-blue-500/30"
                  spellCheck={false}
                  style={{ tabSize: 2 }}
                />
              </div>
            </div>

            {/* Horizontal Resize Handle */}
            <div
              onMouseDown={() => setIsDraggingHorizontal(true)}
              className={`h-2 bg-black hover:bg-secondary-500 cursor-row-resize flex items-center justify-center group transition-colors ${isDraggingHorizontal ? 'bg-secondary-500' : ''
                }`}
            >
              <GripHorizontal className="w-4 h-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* Bottom Panel */}
            <div style={{ height: `${bottomHeight}%` }} className="border-t-4 border-black bg-white flex flex-col">
              {/* Tabs */}
              <div className="flex gap-3 px-6 py-4 border-b-2 border-gray-200 bg-neutral-50">
                {['Test Results', 'Console', 'Waveform'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveBottomTab(tab)}
                    className={`px-6 py-2.5 font-black transition-all rounded-xl whitespace-nowrap ${activeBottomTab === tab
                      ? 'bg-accent-500 text-black border-3 border-black shadow-button'
                      : 'bg-white text-gray-700 border-2 border-gray-300 hover:border-gray-400'
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Content */}
              <div className="flex-1 p-6 overflow-y-auto">
                {activeBottomTab === 'Testcase' && (
                  <div className="space-y-4">
                    <div className="bg-neutral-100 p-4 rounded-xl border-2 border-black">
                      <h4 className="font-black text-black mb-2">Sample Input</h4>
                      <pre className="text-sm text-gray-900 font-mono">din = 34, DIV_LOG2 = 2</pre>
                    </div>
                    <div className="bg-neutral-100 p-4 rounded-xl border-2 border-black">
                      <h4 className="font-black text-black mb-2">Expected Output</h4>
                      <pre className="text-sm text-gray-900 font-mono">dout = 9</pre>
                    </div>
                  </div>
                )}

                {activeBottomTab === 'Test Results' && (
                  <div className="space-y-3">
                    {output && (
                      <div className={`p-4 rounded-xl border-2 border-black font-black ${output.includes('Success') || output.includes('passed')
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                        }`}>
                        {output}
                      </div>
                    )}

                    {testCases.length > 0 && (
                      <div className="space-y-2">
                        {testCases.map((tc) => (
                          <div key={tc.id} className={`p-4 rounded-xl border-2 transition-all ${tc.passed === null ? 'bg-gray-50 border-gray-300' :
                            tc.passed ? 'bg-green-50 border-green-400' : 'bg-red-50 border-red-400'
                            }`}>
                            <div className="flex items-center justify-between gap-4">
                              <div className="flex-1">
                                <div className="font-black text-black mb-2">Test Case {tc.id}</div>
                                <div className="font-mono text-sm text-gray-900 mb-1">
                                  <span className="font-black">Input:</span> {tc.input}
                                </div>
                                <div className="font-mono text-sm text-gray-900">
                                  <span className="font-black">Expected:</span> {tc.expected}
                                </div>
                              </div>
                              {tc.passed !== null && (
                                <span className={`px-4 py-2 rounded-full text-sm font-black border-2 ${tc.passed
                                  ? 'bg-green-200 text-green-800 border-green-400'
                                  : 'bg-red-200 text-red-800 border-red-400'
                                  }`}>
                                  {tc.passed ? '✓ Passed' : '✗ Failed'}
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeBottomTab === 'Console' && (
                  <div className="bg-neutral-50 rounded-xl border-2 border-black p-4 font-mono text-sm h-full">
                    <div className="text-green-600 mb-2 font-bold">$ Compilation Output</div>
                    {output ? (
                      <div className="space-y-1">
                        <div className="text-gray-900">Compiling Verilog module...</div>
                        <div className="text-gray-900">Module: logic_gates</div>
                        <div className="text-gray-900">Status: {output.includes('Success') ? 'Success' : 'Running'}</div>
                        {output.includes('Success') && (
                          <>
                            <div className="text-green-600 mt-2 font-bold">✓ Compilation successful</div>
                            <div className="text-gray-900">Runtime: 45ms</div>
                            <div className="text-gray-900">Memory: 2.4 MB</div>
                          </>
                        )}
                      </div>
                    ) : (
                      <div className="text-gray-600">No output yet. Run your code to see results.</div>
                    )}
                  </div>
                )}

                {activeBottomTab === 'Waveform' && (
                  <div className="space-y-4">
                    <div className="bg-neutral-100 p-4 rounded-xl border-2 border-black">
                      <h4 className="font-black text-black mb-3">Signal Waveform Viewer</h4>
                      {output ? (
                        <div className="space-y-3">
                          {/* Waveform visualization */}
                          <div className="bg-white p-3 rounded-lg border-2 border-gray-300">
                            <div className="font-mono text-xs mb-2 font-black">din[34:0]</div>
                            <div className="flex items-center gap-1 h-8 bg-gray-50 rounded">
                              <div className="w-1/4 h-full bg-secondary-300 border-r-2 border-black flex items-center justify-center text-xs font-bold">34</div>
                              <div className="w-1/4 h-full bg-secondary-200 border-r-2 border-black flex items-center justify-center text-xs font-bold">31</div>
                              <div className="w-1/4 h-full bg-secondary-300 border-r-2 border-black flex items-center justify-center text-xs font-bold">100</div>
                              <div className="w-1/4 h-full bg-secondary-200 flex items-center justify-center text-xs font-bold">255</div>
                            </div>
                          </div>

                          <div className="bg-white p-3 rounded-lg border-2 border-gray-300">
                            <div className="font-mono text-xs mb-2 font-black">dout[31:0]</div>
                            <div className="flex items-center gap-1 h-8 bg-gray-50 rounded">
                              <div className="w-1/4 h-full bg-accent-300 border-r-2 border-black flex items-center justify-center text-xs font-bold">9</div>
                              <div className="w-1/4 h-full bg-accent-200 border-r-2 border-black flex items-center justify-center text-xs font-bold">8</div>
                              <div className="w-1/4 h-full bg-accent-300 border-r-2 border-black flex items-center justify-center text-xs font-bold">13</div>
                              <div className="w-1/4 h-full bg-accent-200 flex items-center justify-center text-xs font-bold">16</div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 text-xs text-gray-700 mt-3">
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-secondary-300 border border-black rounded"></div>
                              <span>Input Signal</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <div className="w-3 h-3 bg-accent-300 border border-black rounded"></div>
                              <span>Output Signal</span>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-600 text-center py-8">
                          Run your code to generate waveform visualization
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
