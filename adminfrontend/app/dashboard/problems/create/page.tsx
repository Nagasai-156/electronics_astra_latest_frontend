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
    
    try {
      // Step 1: Create problem
      const problemPayload = {
        title: problemData.title,
        slug: problemData.slug,
        category: problemData.category,
        difficulty: problemData.difficulty,
        languages: problemData.languages,
        points: problemData.points,
        tags: problemData.tags,
        description: problemData.description,
        diagram_url: problemData.diagram_url,
        examples: problemData.examples,
        explanation: problemData.explanation,
        hints: problemData.hints.filter((h: string) => h.trim() !== ''),
        settings: problemData.settings,
        isActive: publish
      }

      console.log('Step 1 - Creating problem:', problemPayload)
      
      // TODO: Replace with actual API call
      // const response = await fetch('/api/problems', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(problemPayload)
      // })
      // const { problemId } = await response.json()
      
      const problemId = Date.now().toString()

      // Step 2: Upload code files for each language
      const codeFiles = []

      // Verilog files
      if (problemData.languages.includes('VERILOG')) {
        codeFiles.push(
          {
            type: 'STUDENT_TEMPLATE',
            language: 'VERILOG',
            content: problemData.verilog.studentTemplate
          },
          {
            type: 'TESTBENCH',
            language: 'VERILOG',
            content: problemData.verilog.testbench
          }
        )
        if (problemData.verilog.referenceSolution) {
          codeFiles.push({
            type: 'REFERENCE_SOLUTION',
            language: 'VERILOG',
            content: problemData.verilog.referenceSolution
          })
        }
      }

      // VHDL files
      if (problemData.languages.includes('VHDL')) {
        codeFiles.push(
          {
            type: 'STUDENT_TEMPLATE',
            language: 'VHDL',
            content: problemData.vhdl.studentTemplate
          },
          {
            type: 'TESTBENCH',
            language: 'VHDL',
            content: problemData.vhdl.testbench
          }
        )
        if (problemData.vhdl.referenceSolution) {
          codeFiles.push({
            type: 'REFERENCE_SOLUTION',
            language: 'VHDL',
            content: problemData.vhdl.referenceSolution
          })
        }
      }

      console.log('Step 2 - Uploading code files:', codeFiles)
      
      // TODO: Replace with actual API calls
      // for (const file of codeFiles) {
      //   await fetch(`/api/problems/${problemId}/files`, {
      //     method: 'POST',
      //     headers: { 'Content-Type': 'application/json' },
      //     body: JSON.stringify(file)
      //   })
      // }

      // Store in localStorage for demo
      const problems = JSON.parse(localStorage.getItem('problems') || '[]')
      const newProblem = {
        ...problemPayload,
        id: problemId,
        codeFiles,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      }
      problems.push(newProblem)
      localStorage.setItem('problems', JSON.stringify(problems))
      
      setSaving(false)
      alert(`Problem ${publish ? 'published' : 'saved as draft'} successfully!`)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving problem:', error)
      alert('Failed to save problem. Please try again.')
      setSaving(false)
    }
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
