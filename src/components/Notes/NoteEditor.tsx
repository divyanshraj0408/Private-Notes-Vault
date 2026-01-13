import { Save, X } from 'lucide-react'
import { useState } from 'react'
import { Note } from '../../types'

interface NoteEditorProps {
  note: Note
  onSave: (id: string, title: string, content: string) => Promise<void>
  onCancel: () => void
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note.title)
  const [content, setContent] = useState(note.content)
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) return
    
    setLoading(true)
    await onSave(note.id, title, content)
    setLoading(false)
  }

  return (
    <div className="bg-[var(--background-900)] rounded-xl p-6 border border-[var(--background-800)] shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-white">Edit Note</h2>
        <div className="flex gap-2">
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 bg-[var(--accent-600)] hover:bg-[var(--accent-700)] disabled:bg-[var(--accent-800)] rounded-lg transition-all flex items-center gap-2 text-white shadow-lg shadow-[var(--accent-900)]/50"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="px-4 py-2 hover:bg-[var(--background-800)] rounded-lg transition-colors text-[var(--background-400)] hover:text-white"
          >
            Cancel
          </button>
        </div>
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
    </div>
  )
}