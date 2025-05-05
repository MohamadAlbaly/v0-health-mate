"use client"

import type React from "react"

import { useRef, useEffect } from "react"
import { X, Send, User, Bot } from "lucide-react"
import { useSearch } from "./search-context"

export default function ChatInterface() {
  const {
    chatMessages,
    addUserMessage,
    isChatOpen,
    setIsChatOpen,
    clearChat,
    searchQuery,
    setSearchQuery,
    suggestedQuestions,
  } = useSearch()

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Scroll to bottom of messages when new messages are added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" })
    }
  }, [chatMessages])

  // Focus input when chat is opened
  useEffect(() => {
    if (isChatOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isChatOpen])

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim() === "") return

    addUserMessage(searchQuery)
    setSearchQuery("")
  }

  // Handle suggested question click
  const handleSuggestedQuestionClick = (question: string) => {
    addUserMessage(question)
  }

  if (!isChatOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl w-full max-w-lg h-[80vh] flex flex-col shadow-xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-[#29B6F6] to-[#26D0B2] text-white">
          <h2 className="font-bold text-lg">HealthMate Assistant</h2>
          <div className="flex gap-2">
            <button
              onClick={clearChat}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Clear chat"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 6h18"></path>
                <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              </svg>
            </button>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-2 hover:bg-white/10 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatMessages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <div className="w-16 h-16 rounded-full bg-[#E8EAFF] flex items-center justify-center mb-4">
                <Bot className="h-8 w-8 text-[#5B6AD0]" />
              </div>
              <h3 className="text-lg font-medium text-gray-800 mb-2">HealthMate Assistant</h3>
              <p className="text-gray-600 mb-6">
                I can help answer your questions about healthcare in Hungary for international students.
              </p>
              <div className="grid grid-cols-1 gap-2 w-full max-w-sm">
                {suggestedQuestions.slice(0, 3).map((question, index) => (
                  <button
                    key={index}
                    className="p-3 bg-[#E8F7F5] text-[#26D0B2] rounded-lg text-sm font-medium text-left hover:bg-[#D0F0EC] transition-colors"
                    onClick={() => handleSuggestedQuestionClick(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {chatMessages.map((message) => (
                <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      message.isUser ? "bg-[#5B6AD0] text-white" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    <div className="flex items-start">
                      {!message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-[#E8EAFF] flex items-center justify-center mr-2 flex-shrink-0">
                          <Bot className="h-4 w-4 text-[#5B6AD0]" />
                        </div>
                      )}
                      <div className="flex-1">
                        <div className="text-sm whitespace-pre-line">{message.content}</div>
                        <div className="text-xs opacity-70 mt-1">
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                      {message.isUser && (
                        <div className="w-8 h-8 rounded-full bg-[#5B6AD0] flex items-center justify-center ml-2 flex-shrink-0 border-2 border-white">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100">
          <div className="flex items-center bg-gray-100 rounded-full overflow-hidden">
            <input
              ref={inputRef}
              type="text"
              className="flex-1 px-4 py-3 bg-transparent focus:outline-none"
              placeholder="Type your question..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              type="submit"
              className="p-3 bg-[#5B6AD0] text-white rounded-full mr-1"
              disabled={searchQuery.trim() === ""}
            >
              <Send className="h-5 w-5" />
            </button>
          </div>

          {/* Suggested Questions */}
          {suggestedQuestions.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {suggestedQuestions.slice(0, 3).map((question, index) => (
                <button
                  key={index}
                  type="button"
                  className="px-3 py-1.5 bg-[#E8EAFF] text-[#5B6AD0] rounded-full text-xs font-medium hover:bg-[#D8DCFF] transition-colors"
                  onClick={() => handleSuggestedQuestionClick(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
