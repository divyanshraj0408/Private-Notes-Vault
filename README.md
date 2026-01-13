# 🔐 Private Notes Vault Demo - [[Link](https://notesvaultprivate.netlify.app/#)]

A minimal, private notes web application where each user can securely create and manage their own notes.
The app is intentionally simple, focused, and distraction-free — designed as a personal scratchpad, not a productivity tool.

# ✨ Features

## 🔑 Authentication

Email & Password login

Google OAuth

Powered by Supabase Authentication

## 📝 Private Notes

Create notes

View a list of your notes

View a single note

Delete notes

Notes are private by default and strictly tied to the authenticated user

editing notes also implemented

searching for notes

## 🔒 Strong Data Ownership

Row Level Security (RLS) enforced at the database level

Users can only access their own notes — even at the query level

## 🎨 Minimal UI

Clean, distraction-free interface

Focused on writing and reading

No unnecessary features or visual noise

# 🛠 Tech Stack

## Frontend

React (Vite)

TypeScript

Tailwind CSS

## Backend / Database / Auth

Supabase

Authentication (Email & Google OAuth)

PostgreSQL Database

Row Level Security (RLS)

## Deployment

Netlify

# 🗄 Database Schema
### `notes` table

| Column     | Type      | Description                         |
|------------|-----------|-------------------------------------|
| id         | UUID      | Primary key                          |
| user_id    | UUID      | References authenticated user       |
| title      | Text      | Note title                           |
| content    | Text      | Note content                         |
| created_at | Timestamp | Auto-generated timestamp            |

# 📄 License

MIT License