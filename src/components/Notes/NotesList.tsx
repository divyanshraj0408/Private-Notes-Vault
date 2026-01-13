import { Plus, Search } from 'lucide-react'
import { useState } from 'react'
import { Note } from '../../types'
import { NoteItem } from './NoteItem'

interface NotesListProps {
  notes: Note[]
  selectedNote: Note | null
  onSelectNote: (note: Note) => void
  onCreateClick: () => void
}

export const NotesList: React.FC<NotesListProps> = ({
  notes,
  selectedNote,
  onSelectNote,
  onCreateClick,
}) => {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="bg-[var(--background-900)] rounded-xl p-4 sticky top-24 border border-[var(--background-800)] shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-white">Your Notes</h2>
        <button
          onClick={onCreateClick}
          className="p-2 bg-[var(--primary-600)] hover:bg-[var(--primary-700)] rounded-lg transition-all shadow-md hover:shadow-lg shadow-[var(--primary-900)]/50"
          title="Create Note"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {notes.length > 0 && (
        <div className="mb-4">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--background-500)]" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3 py-2 bg-[var(--background-800)] border border-[var(--background-700)] rounded-lg text-sm text-white placeholder-[var(--background-500)] focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[var(--primary-500)]/20 transition-all"
            />
          </div>
        </div>
      )}

      <div className="space-y-2 max-h-[calc(100vh-280px)] overflow-y-auto pr-1">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-8 text-[var(--background-500)]">
            {notes.length === 0 ? 'No notes yet' : 'No matching notes'}
          </div>
        ) : (
          filteredNotes.map((note) => (
            <NoteItem
              key={note.id}
              note={note}
              isSelected={selectedNote?.id === note.id}
              onClick={() => onSelectNote(note)}
            />
          ))
        )}
      </div>
    </div>
  )
}