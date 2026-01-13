import { Eye } from 'lucide-react'

interface EmptyStateProps {
  notesCount: number
}

export const EmptyState: React.FC<EmptyStateProps> = ({ notesCount }) => {
  return (
    <div className="bg-[var(--background-900)] rounded-xl p-12 flex flex-col items-center justify-center text-center min-h-[500px] border border-[var(--background-800)]">
      <div className="w-24 h-24 bg-[var(--primary-500)]/5 rounded-full flex items-center justify-center mb-6 border border-[var(--primary-500)]/10">
        <Eye className="w-12 h-12 text-[var(--primary-500)]/40" />
      </div>
      <h3 className="text-xl font-semibold text-[var(--background-300)] mb-2">
        {notesCount === 0 ? 'Start Writing' : 'Select a Note'}
      </h3>
      <p className="text-[var(--background-500)] max-w-sm">
        {notesCount === 0
          ? 'Create your first private note and keep your thoughts secure'
          : 'Choose a note from the sidebar to view it'}
      </p>
    </div>
  )
}