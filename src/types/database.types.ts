export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      notes: {
        Row: {
          id: string
          user_id: string
          title: string
          content: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          content: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          content?: string
          created_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}