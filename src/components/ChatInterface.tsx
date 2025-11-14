'use client'

import { useState, useRef, useEffect } from 'react'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'

interface Message {
  role: 'user' | 'assistant'
  content: string
}

interface ChatSession {
  id: string
  title: string
  messages: Message[]
  timestamp: string
}

interface ChatHistory {
  userId: string
  sessions: ChatSession[]
  currentSessionId: string
}

const examples = [
  "🔧 Create a FastAPI endpoint with JWT authentication",
  "🎨 Connect React to FastAPI backend with CORS",
  "💾 Design a database schema for an e-commerce app",
  "🚀 Deploy Flask app to Heroku with PostgreSQL",
  "🐛 Debug CORS error when calling API from React",
  "🧪 Write pytest tests for my API endpoints",
  "🔒 Implement secure password hashing with bcrypt",
  "⚡ Optimize slow database query with 3 joins",
  "🐳 Create Docker Compose for Django + PostgreSQL + Redis",
  "📊 Integrate scikit-learn model with FastAPI endpoint",
  "☸️ Set up Kubernetes deployment for my app",
  "🔄 Create GitHub Actions CI/CD pipeline",
]

export default function ChatInterface() {
  const { user } = useUser()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [sessions, setSessions] = useState<ChatSession[]>([])
  const [currentSessionId, setCurrentSessionId] = useState<string>('')
  const [showHistory, setShowHistory] = useState(false)
  const [renamingSessionId, setRenamingSessionId] = useState<string | null>(null)
  const [renameValue, setRenameValue] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Load chat history from localStorage when component mounts
  useEffect(() => {
    if (user?.id) {
      const storedHistory = localStorage.getItem(`chat_history_${user.id}`)
      if (storedHistory) {
        try {
          const parsed: ChatHistory = JSON.parse(storedHistory)
          setSessions(parsed.sessions || [])
          setCurrentSessionId(parsed.currentSessionId || '')
          
          // Load current session messages
          const currentSession = parsed.sessions?.find(s => s.id === parsed.currentSessionId)
          if (currentSession) {
            setMessages(currentSession.messages)
          }
        } catch (error) {
          console.error('Error loading chat history:', error)
          // Initialize with new session if error
          createNewChat()
        }
      } else {
        // Create initial session
        createNewChat()
      }
    }
  }, [user?.id])

  // Save chat history to localStorage whenever sessions change
  useEffect(() => {
    if (user?.id && sessions.length > 0) {
      const history: ChatHistory = {
        userId: user.id,
        sessions,
        currentSessionId
      }
      localStorage.setItem(`chat_history_${user.id}`, JSON.stringify(history))
    }
  }, [sessions, currentSessionId, user?.id])

  // Update current session messages whenever messages change
  useEffect(() => {
    if (currentSessionId && messages.length >= 0) {
      setSessions(prev => prev.map(session => 
        session.id === currentSessionId 
          ? { 
              ...session, 
              messages: [...messages], // Create new array
              timestamp: new Date().toISOString(),
              title: session.title === 'New Chat' && messages.length > 0 
                ? messages[0].content.substring(0, 50) + (messages[0].content.length > 50 ? '...' : '')
                : session.title
            }
          : session
      ))
    }
  }, [messages])

  const createNewChat = () => {
    const newSession: ChatSession = {
      id: `session_${Date.now()}`,
      title: 'New Chat',
      messages: [],
      timestamp: new Date().toISOString()
    }
    setSessions(prev => [newSession, ...prev])
    setCurrentSessionId(newSession.id)
    setMessages([])
    setShowHistory(false)
  }

  const loadSession = (sessionId: string) => {
    const session = sessions.find(s => s.id === sessionId)
    if (session) {
      setCurrentSessionId(sessionId)
      setMessages([...session.messages]) // Create a new array to force re-render
      setShowHistory(false)
    }
  }

  const deleteSession = (sessionId: string) => {
    if (confirm('Delete this chat?')) {
      setSessions(prev => prev.filter(s => s.id !== sessionId))
      if (currentSessionId === sessionId) {
        createNewChat()
      }
    }
  }

  const renameSession = (sessionId: string, newTitle: string) => {
    if (newTitle.trim()) {
      setSessions(prev => prev.map(s => 
        s.id === sessionId ? { ...s, title: newTitle.trim() } : s
      ))
    }
    setRenamingSessionId(null)
    setRenameValue('')
  }

  const startRename = (sessionId: string, currentTitle: string) => {
    setRenamingSessionId(sessionId)
    setRenameValue(currentTitle)
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const sendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return

    const userMessage: Message = { role: 'user', content }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      // Call your Python backend API
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:7860'
      
      const response = await axios.post(`${API_URL}/api/chat`, {
        message: content,
        userId: user?.id,
        history: messages
      })

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response
      }
      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      const errorMessage: Message = {
        role: 'assistant',
        content: '❌ Sorry, there was an error connecting to the AI agent. Please make sure the backend is running on port 7860.'
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const clearHistory = () => {
    if (user?.id && confirm('Are you sure you want to clear ALL chat history?')) {
      localStorage.removeItem(`chat_history_${user.id}`)
      setSessions([])
      createNewChat()
    }
  }

  return (
    <div className="flex h-[calc(100vh-5rem)] bg-gray-50 dark:bg-gray-900">
      {/* History Sidebar */}
      {showHistory && (
        <div className="fixed inset-0 z-50 lg:hidden" onClick={() => setShowHistory(false)}>
          <div className="absolute inset-0 bg-black/50" />
        </div>
      )}
      
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform transition-transform duration-300 ${
        showHistory ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } lg:block overflow-y-auto h-full`}>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold text-gray-900 dark:text-gray-100">Chat History</h3>
              <button
                onClick={() => setShowHistory(false)}
                className="lg:hidden p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            <button
              onClick={createNewChat}
              className="w-full flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Chat
            </button>

            <div className="space-y-2">
              {sessions.map((session) => (
                <div
                  key={session.id}
                  className={`group flex items-center gap-2 p-3 rounded-lg transition-all ${
                    currentSessionId === session.id
                      ? 'bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-200 dark:border-indigo-700'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <div onClick={() => loadSession(session.id)} className="flex-1 min-w-0 cursor-pointer">
                    {renamingSessionId === session.id ? (
                      <input
                        type="text"
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => renameSession(session.id, renameValue)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') renameSession(session.id, renameValue)
                          if (e.key === 'Escape') { setRenamingSessionId(null); setRenameValue('') }
                        }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full text-sm font-medium bg-white dark:bg-gray-700 border border-indigo-300 dark:border-indigo-500 rounded px-2 py-1 text-gray-900 dark:text-gray-100"
                        autoFocus
                      />
                    ) : (
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {session.title}
                      </p>
                    )}
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(session.timestamp).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        startRename(session.id, session.title)
                      }}
                      className="p-1 hover:bg-blue-100 dark:hover:bg-blue-900/30 rounded transition-opacity"
                      title="Rename"
                    >
                      <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        deleteSession(session.id)
                      }}
                      className="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded transition-opacity"
                      title="Delete"
                    >
                      <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {sessions.length > 1 && (
              <button
                onClick={clearHistory}
                className="w-full text-sm text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 py-2"
              >
                Clear All History
              </button>
            )}
          </div>
        </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Container */}
        <div className="flex-1 flex flex-col bg-white dark:bg-gray-800 m-4 rounded-2xl shadow-xl overflow-hidden">
          {/* Chat Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setShowHistory(!showHistory)}
                  className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-all"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
                <div>
                  <h2 className="text-2xl font-bold mb-2">💬 Chat with AI Agents</h2>
                  <p className="text-indigo-100">
                    Welcome, {user?.firstName || 'User'}! Ask anything about full-stack development.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={createNewChat}
                  className="hidden lg:flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-all border border-white/20 hover:border-white/40"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  New Chat
                </button>
                {messages.length > 0 && (
                  <button
                    onClick={() => {
                      if (confirm('Clear this chat?')) {
                        setMessages([])
                        if (currentSessionId) {
                          setSessions(prev => prev.map(s => 
                            s.id === currentSessionId ? { ...s, messages: [] } : s
                          ))
                        }
                      }
                    }}
                    className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg text-sm font-medium transition-all border border-white/20 hover:border-white/40"
                  >
                    🗑️ Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4 dark:bg-gray-800" style={{ overflowY: 'scroll' }}>
            {messages.length === 0 ? (
              <div className="text-center text-gray-500 dark:text-gray-400 mt-20">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-xl font-semibold mb-2">Start a conversation</p>
                <p className="text-sm">Choose an example below or type your own question</p>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-6 py-4 ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200'
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                  </div>
                </div>
              ))
            )}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 dark:bg-gray-700 rounded-2xl px-6 py-4">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Examples */}
          {messages.length === 0 && (
            <div className="px-6 pb-4 dark:bg-gray-800">
              <p className="text-sm font-semibold text-gray-600 dark:text-gray-300 mb-3">💡 Try these examples:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {examples.slice(0, 6).map((example, index) => (
                  <button
                    key={index}
                    onClick={() => sendMessage(example)}
                    className="text-left px-4 py-2 bg-gray-50 dark:bg-gray-700 hover:bg-indigo-50 dark:hover:bg-indigo-900 border border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-500 rounded-lg text-sm transition-all dark:text-gray-200"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-6 bg-gray-50 dark:bg-gray-800 border-t dark:border-gray-700 flex-shrink-0">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..."
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white dark:placeholder-gray-400"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
