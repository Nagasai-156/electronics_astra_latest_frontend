'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Save, Eye, Plus, Trash2, Upload, X } from 'lucide-react'
import MetadataSection from './form/MetadataSection'
import DescriptionSection from './form/DescriptionSection'
import SignalsSection from './form/SignalsSection'
import ExamplesSection from './form/ExamplesSection'
import TestcasesSection from './form/TestcasesSection'
import SolutionSection from './form/SolutionSection'
import HintsSection from './form/HintsSection'

interface ProblemFormProps {
  onSave: (data: any, publish: boolean) => void
  saving: boolean
  initialData?: any
}

export default function ProblemForm({ onSave, saving, initialData }: ProblemFormProps) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    slug: '',
    difficulty: 'easy',
    tags: [],
    description: '',
    diagram_url: '',
    input_description: '',
    output_description: '',
    input_signals: [],
    output_signals: [],
    constraints: '',
    examples: [],
    sample_testcases: [],
    all_testcases: [],
    solution: '',
    hints: ['', '', '']
  })

  const updateField = (field: string, value: any) => {
    setFormData({ ...formData, [field]: value })
  }

  const generateSlug = (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    updateField('title', title)
    if (!initialData) {
      updateField('slug', generateSlug(title))
    }
  }

  return (
    <div className="space-y-6">
      <MetadataSection 
        data={formData}
        onTitleChange={handleTitleChange}
        onUpdate={updateField}
      />

      <DescriptionSection 
        data={formData}
        onUpdate={updateField}
      />

      <SignalsSection 
        data={formData}
        onUpdate={updateField}
      />

      <ExamplesSection 
        data={formData}
        onUpdate={updateField}
      />

      <TestcasesSection 
        data={formData}
        onUpdate={updateField}
      />

      <SolutionSection 
        data={formData}
        onUpdate={updateField}
      />

      <HintsSection 
        data={formData}
        onUpdate={updateField}
      />

      {/* Action Buttons */}
      <div className="sticky bottom-4 bg-white rounded-2xl border-3 border-black shadow-sticker p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSave(formData, false)}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-500 text-white rounded-xl font-black border-3 border-black shadow-button hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-50"
          >
            <Save className="w-5 h-5" />
            Save as Draft
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSave(formData, true)}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-secondary-500 text-white rounded-xl font-black border-3 border-black shadow-button hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all disabled:opacity-50"
          >
            {saving ? (
              <>
                <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                Saving...
              </>
            ) : (
              <>
                <Eye className="w-5 h-5" />
                Save & Publish
              </>
            )}
          </motion.button>
        </div>
      </div>
    </div>
  )
}
