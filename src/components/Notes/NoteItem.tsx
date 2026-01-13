import { Note } from '../../types'

interface NoteItemProps {
  note: Note
  isSelected: boolean
  onClick: () => void
}

export const NoteItem: React.FC<NoteItemProps> = ({ note, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-3 rounded-lg cursor-pointer transition-all ${
        isSelected
          ? 'bg-[var(--primary-600)] shadow-lg shadow-[var(--primary-900)]/50'
          : 'bg-[var(--background-800)] hover:bg-[var(--background-700)] border border-[var(--background-700)] hover:border-[var(--background-600)]'
      }`}
    >
      <h3 className="font-medium truncate text-white">{note.title}</h3>
      <p className={`text-sm truncate mt-1 ${isSelected ? 'text-[var(--primary-100)]' : 'text-[var(--background-400)]'}`}>
        {note.content}
      </p>
      <p className={`text-xs mt-2 ${isSelected ? 'text-[var(--primary-200)]' : 'text-[var(--background-500)]'}`}>
        {new Date(note.created_at).toLocaleDateString()}
      </p>
    </div>
  )
}