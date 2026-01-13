import { useState } from 'react'
import { useAuth } from './hooks/useAuth'
import { useNotes } from './hooks/useNotes'
import { AuthForm } from './components/Auth/AuthForm'
import { Header } from './components/Layout/Header'
import { EmptyState } from './components/Layout/EmptyState'
import { NotesList } from './components/Notes/NotesList'
import { CreateNote } from './components/Notes/CreateNote'
import { NoteView } from './components/Notes/NoteView'
import { NoteEditor } from './components/Notes/NoteEditor'
import { Note } from './types'
import './App.css'
function App() {
  const { user, loading: authLoading, signIn, signUp, signInWithGoogle, signOut } = useAuth()
  const { notes, loading: notesLoading, createNote, updateNote, deleteNote } = useNotes(user)
  
  const [showAuth, setShowAuth] = useState(false)
  const [showCreateNote, setShowCreateNote] = useState(false)
  const [selectedNote, setSelectedNote] = useState<Note | null>(null)
  const [editingNote, setEditingNote] = useState<Note | null>(null)

  const handleCreateNote = async (title: string, content: string) => {
    await createNote(title, content)
    setShowCreateNote(false)
  }

  const handleUpdateNote = async (id: string, title: string, content: string) => {
    await updateNote(id, title, content)
    if (selectedNote) {
      setSelectedNote({ ...selectedNote, title, content })
    }
    setEditingNote(null)
  }

  const handleDeleteNote = async (id: string) => {
    if (confirm('Delete this note?')) {
      await deleteNote(id)
      setSelectedNote(null)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-[var(--background-950)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-[var(--primary-500)] border-t-transparent rounded-full animate-spin"></div>
          <div className="text-[var(--background-400)] text-lg">Loading...</div>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[var(--background-950)] flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[var(--primary-500)]/10 rounded-2xl mb-4 border border-[var(--primary-500)]/20">
              <svg className="w-8 h-8 text-[var(--primary-500)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-white mb-2">Private Notes</h1>
            <p className="text-[var(--background-400)]">Your personal, secure scratchpad</p>
          </div>

          {!showAuth ? (
            <button
              onClick={() => setShowAuth(true)}
              className="w-full py-3 px-4 bg-[var(--primary-600)] hover:bg-[var(--primary-700)] text-white rounded-lg font-medium transition-all shadow-lg shadow-[var(--primary-900)]/50 hover:shadow-xl"
            >
              Get Started
            </button>
          ) : (
            <AuthForm
              onSignIn={signIn}
              onSignUp={signUp}
              onSignInWithGoogle={signInWithGoogle}
              onCancel={() => setShowAuth(false)}
            />
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--background-950)] text-white">
      <Header user={user} onSignOut={signOut} />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <NotesList
              notes={notes}
              selectedNote={selectedNote}
              onSelectNote={setSelectedNote}
              onCreateClick={() => setShowCreateNote(true)}
            />
          </div>

          <div className="lg:col-span-2">
            {showCreateNote ? (
              <CreateNote
                onClose={() => setShowCreateNote(false)}
                onCreate={handleCreateNote}
              />
            ) : editingNote ? (
              <NoteEditor
                note={editingNote}
                onSave={handleUpdateNote}
                onCancel={() => setEditingNote(null)}
              />
            ) : selectedNote ? (
              <NoteView
                note={selectedNote}
                onEdit={() => setEditingNote(selectedNote)}
                onDelete={() => handleDeleteNote(selectedNote.id)}
                onClose={() => setSelectedNote(null)}
              />
            ) : (
              <EmptyState notesCount={notes.length} />
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App