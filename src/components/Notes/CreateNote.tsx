import { X } from 'lucide-react'
import { useState } from 'react'

interface CreateNoteProps {
  onClose: () => void
  onCreate: (title: string, content: string) => Promise<void>
}

export const CreateNote: React.FC<CreateNoteProps> = ({ onClose, onCreate }) => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleCreate = async () => {
    if (!title.trim() || !content.trim()) return
    
    setLoading(true)
    await onCreate(title, content)
    setLoading(false)
    onClose()
  }

  return (
    <div className="bg-[var(--background-900)] rounded-xl p-6 border border-[var(--background-800)] shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">New Note</h2>
        <button
          onClick={onClose}
          className="p-2 hover:bg-[var(--background-800)] rounded-lg transition-colors text-[var(--background-400)] hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        className="w-full px-4 py-3 bg-[var(--background-800)] border border-[var(--background-700)] rounded-lg text-white text-xl font-semibold mb-4 focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[var(--primary-500)]/20 transition-all placeholder-[var(--background-500)]"
        disabled={loading}
      />

      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your note..."
        className="w-full px-4 py-3 bg-[var(--background-800)] border border-[var(--background-700)] rounded-lg text-white h-96 resize-none focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[var(--primary-500)]/20 transition-all placeholder-[var(--background-500)]"
        disabled={loading}
      />

      <button
        onClick={handleCreate}
        disabled={loading || !title.trim() || !content.trim()}
        className="mt-4 w-full py-3 bg-[var(--primary-600)] hover:bg-[var(--primary-700)] disabled:bg-[var(--primary-800)] rounded-lg font-medium transition-all text-white shadow-lg shadow-[var(--primary-900)]/50 hover:shadow-xl"
      >
        {loading ? 'Creating...' : 'Create Note'}
      </button>
    </div>
  )
}