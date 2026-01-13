import { useState, useEffect } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '../lib/supabase'
import { Note } from '../types'

interface UseNotesReturn {
  notes: Note[]
  loading: boolean
  createNote: (title: string, content: string) => Promise<{ data: Note | null; error: any }>
  updateNote: (id: string, title: string, content: string) => Promise<{ data: Note | null; error: any }>
  deleteNote: (id: string) => Promise<{ error: any }>
  refetch: () => Promise<void>
}

export const useNotes = (user: User | null): UseNotesReturn => {
  const [notes, setNotes] = useState<Note[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchNotes()
    } else {
      setNotes([])
      setLoading(false)
    }
  }, [user])

  const fetchNotes = async () => {
    if (!user) return
    
    setLoading(true)
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })

    if (!error && data) {
      setNotes(data)
    }
    setLoading(false)
  }

  const createNote = async (title: string, content: string) => {
    if (!user) return { data: null, error: new Error('No user') }

    const { data, error } = await supabase
      .from('notes')
      .insert([
        {
          user_id: user.id,
          title,
          content,
        },
      ])
      .select()
      .single()

    if (!error && data) {
      setNotes([data, ...notes])
    }
    return { data, error }
  }

  const updateNote = async (id: string, title: string, content: string) => {
    const { data, error } = await supabase
      .from('notes')
      .update({ title, content })
      .eq('id', id)
      .select()
      .single()

    if (!error && data) {
      setNotes(notes.map((n) => (n.id === id ? data : n)))
    }
    return { data, error }
  }

  const deleteNote = async (id: string) => {
    const { error } = await supabase.from('notes').delete().eq('id', id)

    if (!error) {
      setNotes(notes.filter((n) => n.id !== id))
    }
    return { error }
  }

  return { notes, loading, createNote, updateNote, deleteNote, refetch: fetchNotes }
}