import { useState, useRef } from 'react'
import { sendChat, verifySecret, type LevelInfo, type Message, type ChatMetadata } from '../api'
import { GameLayout } from '../../../components/layout/GameLayout'
import { ChatMessage } from './ChatMessage'
import { TrustMeter } from './TrustMeter'
import { RoleBadge } from './RoleBadge'
import { HintsPanel } from './HintsPanel'
import { VictoryModal } from './VictoryModal'
import { SecretInput } from './SecretInput'

interface GameScreenProps {
  level: LevelInfo
  onBack: () => void
}

export function GameScreen({ level, onBack }: GameScreenProps) {
  const [conversation, setConversation] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [metadata, setMetadata] = useState<ChatMetadata | null>(null)
  const [showVictory, setShowVictory] = useState(false)
  const [verifyLoading, setVerifyLoading] = useState(false)
  const [verifyError, setVerifyError] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const maxTurns = level.settings?.max_conversation_turns ?? 1
  const maxMessageLength = level.settings?.max_message_length ?? 500

  const userMessageCount = conversation.filter((m) => m.role === 'user').length
  const turnsRemaining = maxTurns - userMessageCount
  const canSendMessage = turnsRemaining > 0

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

  const headerContent = (
    <div className="flex items-center gap-4 max-w-4xl mx-auto w-full">
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
  )

  const statusBar = (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-surface-800/50 rounded-xl border border-border-default max-w-4xl mx-auto w-full">
      <div className="w-full md:flex-1">
        <TrustMeter level={metadata?.trust_level ?? 0} />
      </div>
      <div className="flex items-center gap-4 w-full md:w-auto">
        <div className="flex-1 md:flex-initial">
          <RoleBadge role={metadata?.detected_role ?? ''} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-text-secondary uppercase tracking-wide">Turns</span>
          <span className={`text-sm font-mono ${turnsRemaining === 0 ? 'text-red-400' : 'text-text-secondary'}`}>
            {turnsRemaining}/{maxTurns}
          </span>
        </div>
      </div>
    </div>
  )

  const chatArea = (
    <div className="flex flex-col bg-surface-800/30 rounded-xl border border-border-default overflow-hidden min-h-0 lg:h-full max-w-4xl mx-auto w-full">
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
      <form onSubmit={handleSubmit} className="shrink-0 p-4 border-t border-border-default">
        {error && (
          <p className="text-red-400 text-sm mb-2">{error}</p>
        )}
        {canSendMessage ? (
          <>
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => setInput(e.target.value.slice(0, maxMessageLength))}
              placeholder="Type your message..."
              disabled={loading}
              rows={4}
              className="w-full px-4 py-3 bg-surface-700 border border-border-default rounded-xl focus:outline-none focus:border-primary-500 transition-colors disabled:opacity-50 resize-none min-h-[44px] max-h-[200px]"
            />
            <div className="flex items-center justify-between mt-2">
              <span className={`text-xs ${input.length >= maxMessageLength ? 'text-red-400' : 'text-text-muted'}`}>
                {input.length}/{maxMessageLength}
              </span>
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-5 py-2 bg-primary-600 hover:bg-primary-500 disabled:opacity-50 disabled:hover:bg-primary-600 rounded-lg transition-colors text-sm font-medium"
              >
                Send
              </button>
            </div>
          </>
        ) : (
          <div className="text-center py-2">
            <p className="text-text-muted mb-3">
              No turns remaining. Submit the secret to win!
            </p>
            <button
              type="button"
              onClick={handlePlayAgain}
              className="px-4 py-2 bg-surface-600 hover:bg-surface-500 rounded-lg transition-colors text-sm"
            >
              Reset Level
            </button>
          </div>
        )}
      </form>
    </div>
  )

  const sidebar = (
    <div className="flex flex-col gap-4">
      <SecretInput
        onSubmit={handleVerifySecret}
        loading={verifyLoading}
        error={verifyError}
      />
      <HintsPanel hints={level.hints} />
    </div>
  )

  return (
    <>
      <GameLayout
        header={headerContent}
        statusBar={statusBar}
        mainContent={chatArea}
        sidebar={sidebar}
      />

      {/* Victory modal */}
      {showVictory && (
        <VictoryModal
          levelTitle={level.title}
          onPlayAgain={handlePlayAgain}
          onSelectLevel={onBack}
        />
      )}
    </>
  )
}
