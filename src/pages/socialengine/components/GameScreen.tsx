import { useState, useRef, useEffect } from 'react'
import type { LevelInfo, Message, ChatMetadata, GameConfig } from '../api'
import { sendChat, verifySecret } from '../api'
import { ChatMessage } from './ChatMessage'
import { TrustMeter } from './TrustMeter'
import { RoleBadge } from './RoleBadge'
import { HintsPanel } from './HintsPanel'
import { VictoryModal } from './VictoryModal'
import { SecretInput } from './SecretInput'

interface GameScreenProps {
  level: LevelInfo
  config: GameConfig
  onBack: () => void
}

export function GameScreen({ level, config, onBack }: GameScreenProps) {
  const [conversation, setConversation] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<ChatMetadata | null>(null)
  const [showVictory, setShowVictory] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const userMessageCount = conversation.filter((m) => m.role === 'user').length
  const turnsRemaining = config.max_conversation_turns - userMessageCount
  const canSendMessage = turnsRemaining > 0

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || loading || !canSendMessage) return

    const userMessage = input.trim()
    setInput('')
    setError(null)
    setLoading(true)

    try {
      const response = await sendChat(level.id, conversation, userMessage)
      
      setConversation((prev) => [
        ...prev,
        { role: 'user', content: userMessage },
        { role: 'assistant', content: response.response },
      ])
      setMetadata(response.metadata)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to send message')
      setInput(userMessage)
    } finally {
      setLoading(false)
    }
  }

  const handleVerifySecret = async (secret: string) => {
    setVerifyLoading(true)
    setVerifyError(null)

    try {
      const result = await verifySecret(level.id, secret)
      if (result.correct) {
        setShowVictory(true)
      } else {
        setVerifyError(result.message)
      }
    } catch (err) {
      setVerifyError(err instanceof Error ? err.message : 'Failed to verify secret')
    } finally {
      setVerifyLoading(false)
    }
  }

  const handlePlayAgain = () => {
    setConversation([])
    setMetadata(null)
    setShowVictory(false)
    setVerifyError(null)
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      {/* Header */}
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onBack}
          className="p-2 hover:bg-surface-700 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h2 className="text-xl font-bold">{level.title}</h2>
      </div>

      {/* Status bar */}
      <div className="flex flex-col sm:flex-row gap-4 mb-4 p-4 bg-surface-800/50 rounded-xl border border-border-default">
        <div className="flex-1">
          <TrustMeter level={metadata?.trust_level ?? 0} />
        </div>
        <div className="flex-1">
          <RoleBadge role={metadata?.detected_role ?? ''} />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-text-secondary uppercase tracking-wide">Turns</span>
          <span className={`text-sm font-mono ${turnsRemaining === 0 ? 'text-red-400' : 'text-text-secondary'}`}>
            {turnsRemaining}/{config.max_conversation_turns}
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex gap-4 min-h-0">
        {/* Chat area */}
        <div className="flex-1 flex flex-col bg-surface-800/30 rounded-xl border border-border-default overflow-hidden">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {conversation.length === 0 && (
              <div className="text-center py-8 text-text-muted">
                <p className="mb-2">Start the conversation to convince the Guardian.</p>
                <p className="text-sm">{level.description}</p>
              </div>
            )}
            {conversation.map((msg, i) => (
              <ChatMessage key={i} message={msg} />
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-surface-700 px-4 py-3 rounded-2xl rounded-bl-md">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-text-muted rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-border-default">
            {error && (
              <p className="text-red-400 text-sm mb-2">{error}</p>
            )}
            {canSendMessage ? (
              <>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value.slice(0, config.max_message_length))}
                    placeholder="Type your message..."
                    disabled={loading}
                    className="flex-1 px-4 py-3 bg-surface-700 border border-border-default rounded-xl focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="px-6 py-3 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 rounded-xl transition-colors"
                  >
                    Send
                  </button>
                </div>
                <div className="flex justify-end mt-1">
                  <span className={`text-xs ${input.length >= config.max_message_length ? 'text-red-400' : 'text-text-muted'}`}>
                    {input.length}/{config.max_message_length}
                  </span>
                </div>
              </>
            ) : (
              <p className="text-center text-text-muted py-2">
                No turns remaining. Submit the secret to win!
              </p>
            )}
          </form>
        </div>

        {/* Sidebar (hidden on mobile) */}
        <div className="hidden lg:flex flex-col gap-4 w-72">
          <SecretInput
            onSubmit={handleVerifySecret}
            loading={verifyLoading}
            error={verifyError}
          />
          <HintsPanel hints={level.hints} />
        </div>
      </div>

      {/* Mobile sidebar */}
      <div className="lg:hidden mt-4 space-y-4">
        <SecretInput
          onSubmit={handleVerifySecret}
          loading={verifyLoading}
          error={verifyError}
        />
        <HintsPanel hints={level.hints} />
      </div>

      {/* Victory modal */}
      {showVictory && (
        <VictoryModal
          levelTitle={level.title}
          onPlayAgain={handlePlayAgain}
          onSelectLevel={onBack}
        />
      )}
    </div>
  )
}
