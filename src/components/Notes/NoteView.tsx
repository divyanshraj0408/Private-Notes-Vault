import { Edit2, Trash2, X } from 'lucide-react'
import { Note } from '../../types'

interface NoteViewProps {
  note: Note
  onEdit: () => void
  onDelete: () => void
  onClose: () => void
}

export const NoteView: React.FC<NoteViewProps> = ({ note, onEdit, onDelete, onClose }) => {
  return (
    <div className="bg-[var(--background-900)] rounded-xl p-6 border border-[var(--background-800)] shadow-xl">
      <div className="flex items-start justify-between mb-4">
        <h2 className="text-2xl font-bold text-white">{note.title}</h2>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="p-2 hover:bg-[var(--background-800)] rounded-lg transition-colors text-[var(--accent-400)] hover:text-[var(--accent-300)]"
            title="Edit"
          >
            <Edit2 className="w-5 h-5" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 hover:bg-red-500/20 text-red-400 hover:text-red-300 rounded-lg transition-colors"
            title="Delete"
          >
            <Trash2 className="w-5 h-5" />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[var(--background-800)] rounded-lg transition-colors text-[var(--background-400)] hover:text-white"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      <p className="text-sm text-[var(--background-400)] mb-6">
        {new Date(note.created_at).toLocaleString()}
      </p>
      <div className="prose prose-invert max-w-none">
        <p className="whitespace-pre-wrap text-[var(--background-200)] leading-relaxed">
          {note.content}
        </p>
      </div>
    </div>
  )
}