import { User } from '@supabase/supabase-js'
import { Database } from './database.types'

export type Note = Database['public']['Tables']['notes']['Row']
export type NoteInsert = Database['public']['Tables']['notes']['Insert']
export type NoteUpdate = Database['public']['Tables']['notes']['Update']

export interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  signUp: (email: string, password: string) => Promise<{ data: any; error: any }>
  signOut: () => Promise<{ error: any }>
}

export interface NotesContextType {
  notes: Note[]
  loading: boolean
  createNote: (title: string, content: string) => Promise<{ data: Note | null; error: any }>
  updateNote: (id: string, title: string, content: string) => Promise<{ data: Note | null; error: any }>
  deleteNote: (id: string) => Promise<{ error: any }>
  refetch: () => Promise<void>
}