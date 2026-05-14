import { useState } from 'react'

interface SecretInputProps {
  onSubmit: (secret: string) => void
  loading: boolean
  error: string | null
}

export function SecretInput({ onSubmit, loading, error }: SecretInputProps) {
  const [secret, setSecret] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!secret.trim() || loading) return
    onSubmit(secret.trim())
  }

  return (
    <div className="bg-surface-800/50 border border-border-default rounded-xl p-4">
      <h4 className="text-sm font-medium text-text-secondary mb-3">Submit Secret</h4>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={secret}
          onChange={(e) => setSecret(e.target.value)}
          placeholder="Enter the secret..."
          disabled={loading}
          className="w-full px-3 py-2 bg-surface-700 border border-border-default rounded-lg text-sm focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50"
        />
        <div className="flex justify-end mt-2">
          <button
            type="submit"
            disabled={loading || !secret.trim()}
            className="px-4 py-2 bg-green-600 hover:bg-green-500 disabled:opacity-50 disabled:hover:bg-green-600 rounded-lg text-sm font-medium transition-colors"
          >
            {loading ? '...' : 'Verify'}
          </button>
        </div>
      </form>
      {error && (
        <p className="text-red-400 text-sm mt-2">{error}</p>
      )}
    </div>
  )
}
