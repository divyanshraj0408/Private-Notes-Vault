import { LogOut } from 'lucide-react'
import { User } from '@supabase/supabase-js'

interface HeaderProps {
  user: User
  onSignOut: () => void
}

export const Header: React.FC<HeaderProps> = ({ user, onSignOut }) => {
  return (
    <header className="border-b border-[var(--background-800)] bg-[var(--background-900)]/80 backdrop-blur-sm sticky top-0 z-10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-[var(--primary-500)]/10 rounded-lg flex items-center justify-center border border-[var(--primary-500)]/20">
            <svg className="w-5 h-5 text-[var(--primary-500)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-white">Private Notes</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--background-400)] hidden sm:block">
            {user.email}
          </span>
          <button
            onClick={onSignOut}
            className="p-2 hover:bg-[var(--background-800)] rounded-lg transition-colors text-[var(--background-400)] hover:text-white"
            title="Sign Out"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}