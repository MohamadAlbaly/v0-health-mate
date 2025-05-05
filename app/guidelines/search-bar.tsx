"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Search, X, MessageSquare, Sparkles } from "lucide-react"
import { useSearch } from "./search-context"

export default function SearchBar() {
  const {
    searchQuery,
    setSearchQuery,
    searchMode,
    setSearchMode,
    searchResults,
    isSearching,
    showResults,
    setShowResults,
    addUserMessage,
    suggestedQuestions,
  } = useSearch()

  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const resultsRef = useRef<HTMLDivElement>(null)

  // Handle clicks outside the search results to close them
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current &&
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowResults(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [setShowResults])

  // Handle search submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (searchQuery.trim() === "") return

    if (searchQuery.trim().endsWith("?") || searchMode === "chat") {
      // If the query ends with a question mark or we're in chat mode, treat it as a question
      addUserMessage(searchQuery)
      setSearchQuery("")
      setShowResults(false)
    } else {
      // Otherwise, just perform a search
      setShowResults(true)
    }
  }

  // Handle suggested question click
  const handleSuggestedQuestionClick = (question: string) => {
    addUserMessage(question)
    setSearchQuery("")
    setShowResults(false)
  }

  // Handle search result click
  const handleResultClick = (sectionId: string) => {
    setShowResults(false)

    // Scroll to the section
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })

      // Highlight the section briefly
      section.classList.add("bg-yellow-100")
      setTimeout(() => {
        section.classList.remove("bg-yellow-100")
      }, 2000)
    }
  }

  // Toggle between search and chat modes
  const toggleSearchMode = () => {
    setSearchMode(searchMode === "search" ? "chat" : "search")
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  return (
    <div className="relative w-full">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`flex items-center bg-white rounded-full shadow-sm overflow-hidden border transition-all duration-200 ${
            isFocused ? "border-[#26D0B2] shadow-md" : "border-gray-200"
          }`}
        >
          <div className="pl-4 py-3 flex items-center">
            <Search className={`h-5 w-5 ${isFocused ? "text-[#26D0B2]" : "text-gray-400"}`} />
          </div>

          <input
            ref={inputRef}
            type="text"
            className="block w-full pl-3 pr-4 py-3 bg-transparent placeholder-gray-500 focus:outline-none"
            placeholder={searchMode === "search" ? "Search guidelines..." : "Ask a question..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => {
              setIsFocused(true)
              if (searchQuery.trim() !== "") {
                setShowResults(true)
              }
            }}
            onBlur={() => setIsFocused(false)}
          />

          {searchQuery && (
            <button
              type="button"
              className="p-2 text-gray-400 hover:text-gray-600"
              onClick={() => {
                setSearchQuery("")
                if (inputRef.current) inputRef.current.focus()
              }}
            >
              <X className="h-5 w-5" />
            </button>
          )}

          <div className="h-10 w-px bg-gray-200 mx-1"></div>

          <button
            type="button"
            className={`px-4 py-3 flex items-center ${
              searchMode === "chat" ? "text-[#5B6AD0]" : "text-gray-500 hover:text-gray-700"
            } transition-colors`}
            onClick={toggleSearchMode}
            aria-label={searchMode === "search" ? "Switch to chat mode" : "Switch to search mode"}
          >
            {searchMode === "search" ? <MessageSquare className="h-5 w-5" /> : <Sparkles className="h-5 w-5" />}
            <span className="ml-2 text-sm font-medium">{searchMode === "search" ? "Ask" : "Chat"}</span>
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && (searchResults.length > 0 || suggestedQuestions.length > 0 || isSearching) && (
        <div
          ref={resultsRef}
          className="absolute z-50 mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden max-h-[70vh] overflow-y-auto"
        >
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">
              <div className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-[#26D0B2] border-t-transparent mr-2"></div>
              Searching...
            </div>
          ) : (
            <>
              {searchMode === "chat" && suggestedQuestions.length > 0 && (
                <div className="p-3 border-b border-gray-100">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">
                    Suggested Questions
                  </h3>
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-sm transition-colors"
                        onClick={() => handleSuggestedQuestionClick(question)}
                      >
                        <div className="flex items-start">
                          <MessageSquare className="h-4 w-4 text-[#5B6AD0] mt-0.5 mr-2 flex-shrink-0" />
                          <span>{question}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.length > 0 && (
                <div className="p-3">
                  <h3 className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2">Search Results</h3>
                  <div className="space-y-2">
                    {searchResults.map((result) => (
                      <button
                        key={result.id}
                        className="w-full text-left p-2 hover:bg-gray-50 rounded-lg text-sm transition-colors"
                        onClick={() => handleResultClick(result.sectionId)}
                      >
                        <div className="font-medium text-gray-800">{result.title}</div>
                        <div className="text-gray-600 text-xs mt-1 line-clamp-2">{result.content}</div>
                        <div className="text-[#26D0B2] text-xs mt-1">{result.section}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.length === 0 && searchQuery.trim() !== "" && (
                <div className="p-4 text-center text-gray-500">
                  No results found. Try asking a question instead?
                  <button
                    className="mt-2 px-4 py-2 bg-[#E8EAFF] text-[#5B6AD0] rounded-full text-sm font-medium block w-full"
                    onClick={() => {
                      setSearchMode("chat")
                      addUserMessage(searchQuery)
                      setSearchQuery("")
                      setShowResults(false)
                    }}
                  >
                    Ask: "{searchQuery}"
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}
