const API_URL = 'https://api.bobspot.org/socialengine'

export interface LevelInfo {
  id: string
  title: string
  description: string
  hints: string[]
}

export interface Message {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatMetadata {
  injection_blocked: boolean
  unlocked: boolean
  trust_level: number
  detected_role: string
  missing: string[]
}

export interface ChatResponse {
  response: string
  metadata: ChatMetadata
}

export interface GameConfig {
  max_message_length: number
  max_conversation_turns: number
}

export interface VerifySecretResponse {
  correct: boolean
  message: string
}

export async function fetchConfig(): Promise<GameConfig> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'config' }),
  })
  if (!res.ok) throw new Error('Failed to fetch config')
  return res.json()
}

export async function fetchLevels(): Promise<string[]> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'levels' }),
  })
  if (!res.ok) throw new Error('Failed to fetch levels')
  const data = await res.json()
  return data.levels
}

export async function fetchLevelInfo(levelId: string): Promise<LevelInfo> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'level_info', level_id: levelId }),
  })
  if (!res.ok) throw new Error('Failed to fetch level info')
  return res.json()
}

export async function sendChat(
  levelId: string,
  conversation: Message[],
  userMessage: string
): Promise<ChatResponse> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'chat',
      level_id: levelId,
      conversation,
      user_message: userMessage,
    }),
  })
  if (!res.ok) throw new Error('Failed to send message')
  return res.json()
}

export async function verifySecret(
  levelId: string,
  secret: string
): Promise<VerifySecretResponse> {
  const res = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      action: 'verify_secret',
      level_id: levelId,
      secret,
    }),
  })
  if (!res.ok) throw new Error('Failed to verify secret')
  return res.json()
}
