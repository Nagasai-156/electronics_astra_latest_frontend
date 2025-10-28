'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import AdminLayout from '@/components/AdminLayout'
import ProblemForm from '@/components/ProblemForm'

export default function CreateProblemPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)

  const handleSave = async (problemData: any, publish: boolean) => {
    setSaving(true)
    
    // Mock save - replace with actual API call
    setTimeout(() => {
      console.log('Saving problem:', problemData)
      console.log('Publish:', publish)
      
      // Store in localStorage for demo
      const problems = JSON.parse(localStorage.getItem('problems') || '[]')
      const newProblem = {
        ...problemData,
        id: Date.now().toString(),
        is_published: publish,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      problems.push(newProblem)
      localStorage.setItem('problems', JSON.stringify(problems))
      
      setSaving(false)
      router.push('/dashboard')
    }, 1500)
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-display font-black text-black">Create New Problem</h1>
          <p className="text-gray-600 font-semibold mt-1">Fill in the details to create a new problem</p>
        </div>

        <ProblemForm onSave={handleSave} saving={saving} />
      </div>
    </AdminLayout>
  )
}
