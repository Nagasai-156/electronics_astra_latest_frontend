'use client'

import React from 'react'
import { X } from 'lucide-react'

interface MetadataSectionProps {
  data: any
  onTitleChange: (title: string) => void
  onUpdate: (field: string, value: any) => void
}

export default function MetadataSection({ data, onTitleChange, onUpdate }: MetadataSectionProps) {
  const [tagInput, setTagInput] = React.useState('')

  const addTag = () => {
    if (tagInput.trim() && !data.tags.includes(tagInput.trim())) {
      onUpdate('tags', [...data.tags, tagInput.trim()])
      setTagInput('')
    }
  }

  const removeTag = (tag: string) => {
    onUpdate('tags', data.tags.filter((t: string) => t !== tag))
  }

  return (
    <div className="bg-white rounded-2xl border-3 border-black shadow-card p-6">
      <h2 className="text-xl font-display font-black text-black mb-6">Problem Metadata</h2>
      
      <div className="space-y-4">
        {/* Title */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Title <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.title}
            onChange={(e) => onTitleChange(e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-secondary-500 focus:outline-none font-semibold"
            placeholder="e.g., Divide by 2^DIV_LOG2 and Round Up"
            required
          />
        </div>

        {/* Slug */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Slug <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={data.slug}
            onChange={(e) => onUpdate('slug', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-secondary-500 focus:outline-none font-mono text-sm"
            placeholder="divide-roundup-saturate"
            required
          />
        </div>

        {/* Difficulty */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Difficulty <span className="text-red-500">*</span>
          </label>
          <select
            value={data.difficulty}
            onChange={(e) => onUpdate('difficulty', e.target.value)}
            className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:border-secondary-500 focus:outline-none font-bold bg-white"
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Tags */}
        <div>
          <label className="block text-sm font-bold text-gray-700 mb-2">Tags</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
              className="flex-1 px-4 py-2 border-2 border-gray-300 rounded-xl focus:border-secondary-500 focus:outline-none font-semibold"
              placeholder="Add tag (press Enter)"
            />
            <button
              type="button"
              onClick={addTag}
              className="px-4 py-2 bg-primary-500 text-white rounded-xl font-bold border-2 border-black hover:bg-primary-600"
            >
              Add
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.tags.map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center gap-2 px-3 py-1 bg-primary-100 text-primary-700 rounded-lg font-bold border-2 border-primary-300"
              >
                {tag}
                <button onClick={() => removeTag(tag)} className="hover:text-primary-900">
                  <X className="w-4 h-4" />
                </button>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
