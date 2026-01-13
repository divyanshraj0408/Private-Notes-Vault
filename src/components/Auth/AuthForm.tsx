import { useState } from 'react'

interface AuthFormProps {
  onSignIn: (email: string, password: string) => Promise<{ data: any; error: any }>
  onSignUp: (email: string, password: string) => Promise<{ data: any; error: any }>
  onSignInWithGoogle: () => Promise<{ data: any; error: any }>
  onCancel: () => void
}

export const AuthForm: React.FC<AuthFormProps> = ({ 
  onSignIn, 
  onSignUp, 
  onSignInWithGoogle,
  onCancel 
}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setError('')
    setLoading(true)

    const { error } = mode === 'login'
      ? await onSignIn(email, password)
      : await onSignUp(email, password)

    if (error) {
      setError(error.message)
    }
    setLoading(false)
  }

  const handleGoogleSignIn = async () => {
    setError('')
    setLoading(true)
    const { error } = await onSignInWithGoogle()
    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  return (
    <div className="bg-[var(--background-900)] rounded-xl p-6 space-y-4 border border-[var(--background-700)] shadow-2xl">
      {error && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Google Sign In Button */}
      <button
        onClick={handleGoogleSignIn}
        disabled={loading}
        className="w-full py-3 px-4 bg-white hover:bg-gray-50 disabled:bg-gray-200 text-gray-700 rounded-lg font-medium transition-all flex items-center justify-center gap-3 shadow-md hover:shadow-lg"
      >
        <svg className="w-5 h-5" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        {loading ? 'Signing in...' : 'Continue with Google'}
      </button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--background-700)]"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-[var(--background-900)] text-[var(--background-400)]">Or continue with email</span>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-[var(--background-300)] mb-2">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 bg-[var(--background-800)] border border-[var(--background-700)] rounded-lg text-white focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[var(--primary-500)]/20 transition-all"
          disabled={loading}
          placeholder="you@example.com"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-[var(--background-300)] mb-2">
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 bg-[var(--background-800)] border border-[var(--background-700)] rounded-lg text-white focus:outline-none focus:border-[var(--primary-500)] focus:ring-2 focus:ring-[var(--primary-500)]/20 transition-all"
          disabled={loading}
          placeholder="••••••••"
        />
      </div>

      <button
        onClick={handleSubmit}
        disabled={loading}
        className="w-full py-3 px-4 bg-[var(--primary-600)] hover:bg-[var(--primary-700)] disabled:bg-[var(--primary-800)] text-white rounded-lg font-medium transition-all shadow-lg shadow-[var(--primary-900)]/50 hover:shadow-xl hover:shadow-[var(--primary-900)]/60"
      >
        {loading ? 'Loading...' : mode === 'login' ? 'Sign In' : 'Sign Up'}
      </button>

      <button
        onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        className="w-full py-2 text-[var(--background-400)] hover:text-[var(--accent-400)] transition-colors text-sm"
        disabled={loading}
      >
        {mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
      </button>

      <button
        onClick={onCancel}
        className="w-full py-2 text-[var(--background-400)] hover:text-white transition-colors"
        disabled={loading}
      >
        Cancel
      </button>
    </div>
  )
}