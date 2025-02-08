"use client"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { useState } from "react"

export default function FeedbackSection() {
  const [feedback, setFeedback] = useState<'up' | 'down' | null>(null)

  return (
    <div className="space-y-4 mt-12 mb-8">
      <p className="text-[#111111] text-sm">Was this answer helpful?</p>
      
      <div className="flex gap-4">
        <button
          onClick={() => setFeedback('up')}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            feedback === 'up' ? 'bg-gray-100' : ''
          }`}
          aria-label="Yes, this was helpful"
        >
          <ThumbsUp 
            className="w-5 h-5" 
            fill={feedback === 'up' ? '#111111' : 'none'}
            stroke={feedback === 'up' ? 'none' : '#111111'}
          />
        </button>

        <button
          onClick={() => setFeedback('down')}
          className={`p-2 rounded-full hover:bg-gray-100 transition-colors ${
            feedback === 'down' ? 'bg-gray-100' : ''
          }`}
          aria-label="No, this wasn't helpful"
        >
          <ThumbsDown 
            className="w-5 h-5" 
            fill={feedback === 'down' ? '#111111' : 'none'}
            stroke={feedback === 'down' ? 'none' : '#111111'}
          />
        </button>
      </div>
    </div>
  )
} 